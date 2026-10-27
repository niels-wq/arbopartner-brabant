import { handleWerken } from "./werken.mjs";
import { rateAllows, signStamp, spamSignal } from "./spam.mjs";

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function oneLine(value, max = 180) {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .trim()
    .slice(0, max);
}

function textBlock(value, max = 4000) {
  return String(value ?? "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, max);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const fields = {
  offerte: ["naam", "email", "telefoon", "organisatie", "plaats", "medewerkers", "pakket", "niveau", "situatie"],
  advies: ["naam", "telefoon", "organisatie", "medewerkers"],
  spoed: ["naam", "telefoon", "organisatie", "wat", "medewerkers"],
  chat: ["naam", "organisatie", "telefoon", "vraag", "medewerkers"],
  rapport: ["email", "rapport"],
  scan: ["naam", "telefoon", "medewerkers"],
  terugbel: ["naam", "telefoon", "medewerkers"],
  checklist: ["naam", "email", "medewerkers"],
  magnet: ["naam", "email"],
  risicoscan: ["naam", "email", "rapport"],
  tijdlijn: ["naam", "email", "rapport"],
};

const exitChoices = ["checklist", "terugbel", "gesprek", "besparing"];

export function validate(kind, body) {
  const errors = [];
  if (!fields[kind]) errors.push("Onbekend formulier.");
  if (body?.toestemming !== "ja") errors.push("Vink de toestemming aan om het bericht te versturen.");
  const required = fields[kind] || [];
  for (const key of required) {
    const value = key === "rapport" || key === "vraag" || key === "wat" || key === "checklist" ? textBlock(body?.[key], 4000) : oneLine(body?.[key], 500);
    if (!value) errors.push(`Veld ontbreekt: ${key}.`);
  }
  if ((kind === "rapport" || body?.email) && !validEmail(oneLine(body?.email))) {
    if (kind === "rapport" || oneLine(body?.email)) errors.push("Het e-mailadres klopt niet.");
  }
  const headcount = oneLine(body?.medewerkers, 12);
  if (headcount) {
    const count = Number(headcount);
    if (!Number.isInteger(count) || count < 35 || count > 500) {
      errors.push("Aantal medewerkers hoort tussen 35 en 500 te liggen.");
    }
  }
  if (kind === "magnet") {
    const keuze = oneLine(body?.keuze, 40);
    if (!exitChoices.includes(keuze)) errors.push("Kies wat u wilt doen.");
    if (keuze === "checklist" && !textBlock(body?.checklist, 4000)) errors.push("Veld ontbreekt: checklist.");
    if (keuze === "terugbel" && !oneLine(body?.telefoon, 40)) {
      errors.push("Voor een terugbelverzoek is een telefoonnummer nodig.");
    }
  }
  return errors;
}

function messageText(kind, body) {
  const lines = [`Formulier: ${kind}`, `Tijdstip: ${new Date().toISOString()}`, ""];
  for (const [key, value] of Object.entries(body || {})) {
    if (key === "company_website" || key === "toestemming" || key === "form_ts" || key === "form_sig") continue;
    const long = key === "rapport" || key === "checklist" || key === "vraag" || key === "wat";
    lines.push(`${key}: ${textBlock(value, long ? 8000 : 2000)}`);
  }
  return lines.join("\n").slice(0, 20000);
}

function dropped() {
  return { status: 200, payload: { ok: true, delivered: true } };
}

/** Zelfde SMTP-weg als de formulieren. Zonder host of ontvanger wordt er niets verstuurd. */
export async function sendPlainMail(mail, options = {}) {
  const to = mail.to || process.env.FORM_TO_EMAIL;
  const message = {
    from: mail.from || process.env.SMTP_FROM || to,
    to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  };
  if (typeof options.sendMail === "function") {
    await options.sendMail(message);
    return { delivered: true };
  }
  const host = process.env.SMTP_HOST;
  if (!to || !host) return { delivered: false, reason: "smtp-niet-geconfigureerd" };
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.default.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
      : undefined,
  });
  await transport.sendMail(message);
  return { delivered: true };
}

export async function processSubmission(kind, body, ip, now = Date.now(), options = {}) {
  if (spamSignal(body, now)) return dropped();
  const errors = validate(kind, body);
  if (errors.length) return { status: 400, payload: { ok: false, errors } };
  if (!rateAllows(ip, now)) return dropped();

  const to = process.env.FORM_TO_EMAIL;
  const host = process.env.SMTP_HOST;
  const who = oneLine(body.organisatie || body.naam, 80);
  const subject = `[Arbopartner Brabant] ${kind} — ${who || "nieuw bericht"}`;
  const text = messageText(kind, body);
  const replyTo = body.email ? oneLine(body.email) : undefined;

  if (typeof options.sendMail !== "function" && (!to || !host)) {
    return { status: 200, payload: { ok: true, delivered: false, reason: "smtp-niet-geconfigureerd" } };
  }

  try {
    const sent = await sendPlainMail({
      from: process.env.SMTP_FROM || to,
      to,
      replyTo,
      subject,
      text,
    }, options);
    if (!sent.delivered) {
      return { status: 200, payload: { ok: true, delivered: false, reason: sent.reason || "smtp-niet-geconfigureerd" } };
    }
    const copyByKind = {
      rapport: {
        subject: "Uw berekening",
        intro: "Hier is de berekening die u op de site maakte. Het is een scenario, geen offerte.",
      },
      checklist: {
        subject: "Uw verzuim-checklist",
        intro: "Hier is de verzuim-checklist die u aanvroeg. Het is een geheugensteun, geen advies over één dossier.",
      },
      risicoscan: {
        subject: "Uw loonsanctie-risicoscan",
        intro: "Hier is de risicoscan die u op de site invulde. Het is een indicatie, geen oordeel van UWV en geen offerte.",
      },
      tijdlijn: {
        subject: "Uw verzuim-tijdlijn",
        intro: "Hier is de tijdlijn bij de eerste ziektedag die u invulde. Het is een geheugensteun, geen juridisch advies. Herinneringen zet u in uw agenda met het bestand op de site. Deze mail sturen we één keer.",
      },
    };
    const sendsCopy = Boolean(copyByKind[kind]) || (kind === "magnet" && oneLine(body.keuze, 40) === "checklist");
    if (sendsCopy && validEmail(oneLine(body.email))) {
      const copy = copyByKind[kind] || copyByKind.checklist;
      const subject = copy.subject;
      const intro = copy.intro;
      const content = textBlock(body.checklist || body.rapport, 8000);
      try {
        await sendPlainMail({
          from: process.env.SMTP_FROM || to,
          to: oneLine(body.email),
          replyTo: to,
          subject: `[Arbopartner Brabant] ${subject}`,
          text: `${intro}\n\n${content}\n\nArbopartner Brabant, van Matchvermogen B.V.\nLosplaats 16d, 5404 NJ Uden\n085-0870307\ninfo@matchvermogen.nl\n`,
        }, options);
      } catch {
        /* De interne mail is al weg. Een mislukte kopie naar de bezoeker blokkeert dat niet. */
      }
    }
    return { status: 200, payload: { ok: true, delivered: true } };
  } catch {
    return { status: 200, payload: { ok: true, delivered: false, reason: "verzenden-mislukt" } };
  }
}

export async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 100_000) throw new Error("body te groot");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

export async function handleApi(req, res) {
  const host = req.headers.host || "localhost";
  const url = new URL(req.url || "/", `http://${host}`);
  if (!url.pathname.startsWith("/api/")) return false;

  if (url.pathname === "/api/chat/message") {
    const { handleChatMessage } = await import("./chat-ai.mjs");
    await handleChatMessage(req, res);
    return true;
  }

  if (url.pathname === "/api/form-token") {
    if (req.method !== "GET") {
      res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, errors: ["Alleen GET."] }));
      return true;
    }
    res.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    });
    res.end(JSON.stringify(signStamp()));
    return true;
  }

  if (req.method !== "POST") {
    res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, errors: ["Alleen POST."] }));
    return true;
  }

  const kind = url.pathname.split("/")[2];
  if (kind === "werken") {
    try {
      const result = await handleWerken(req, clientIp(req));
      res.writeHead(result.status, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(result.payload));
    } catch {
      res.writeHead(400, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, errors: ["De aanmelding kon niet worden gelezen."] }));
    }
    return true;
  }
  try {
    const body = await readJson(req);
    const result = await processSubmission(kind, body, clientIp(req));
    res.writeHead(result.status, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(result.payload));
  } catch {
    res.writeHead(400, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, errors: ["Het bericht kon niet worden gelezen."] }));
  }
  return true;
}
