import { handleWerken } from "./werken.mjs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 8;
const hits = new Map();

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((stamp) => now - stamp < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
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
};

export function validate(kind, body) {
  const errors = [];
  if (!fields[kind]) errors.push("Onbekend formulier.");
  if (body?.toestemming !== "ja") errors.push("Vink de toestemming aan om het bericht te versturen.");
  const required = fields[kind] || [];
  for (const key of required) {
    const value = key === "rapport" || key === "vraag" || key === "wat" ? textBlock(body?.[key], 4000) : oneLine(body?.[key], 500);
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
  return errors;
}

function messageText(kind, body) {
  const lines = [`Formulier: ${kind}`, `Tijdstip: ${new Date().toISOString()}`, ""];
  for (const [key, value] of Object.entries(body || {})) {
    if (key === "company_website" || key === "toestemming") continue;
    lines.push(`${key}: ${textBlock(value, 2000)}`);
  }
  return lines.join("\n").slice(0, 12000);
}

export async function processSubmission(kind, body, ip) {
  if (limited(ip)) {
    return { status: 429, payload: { ok: false, errors: ["Te veel berichten. Bel ons gerust even."] } };
  }
  if (oneLine(body?.company_website, 200)) {
    return { status: 200, payload: { ok: true, delivered: true } };
  }
  const errors = validate(kind, body);
  if (errors.length) return { status: 400, payload: { ok: false, errors } };

  const to = process.env.FORM_TO_EMAIL;
  const host = process.env.SMTP_HOST;
  if (!to || !host) {
    return { status: 200, payload: { ok: true, delivered: false, reason: "smtp-niet-geconfigureerd" } };
  }

  try {
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
    const who = oneLine(body.organisatie || body.naam, 80);
    await transport.sendMail({
      from: process.env.SMTP_FROM || to,
      to,
      replyTo: body.email ? oneLine(body.email) : undefined,
      subject: `[Arbopartner Brabant] ${kind} — ${who || "nieuw bericht"}`,
      text: messageText(kind, body),
    });
    if ((kind === "rapport" || kind === "checklist") && validEmail(oneLine(body.email))) {
      const subject = kind === "checklist" ? "Uw verzuim-checklist" : "Uw berekening";
      const intro = kind === "checklist"
        ? "Hier is de verzuim-checklist die u aanvroeg. Het is een geheugensteun, geen advies over één dossier."
        : "Hier is de berekening die u op de site maakte. Het is een scenario, geen offerte.";
      const content = textBlock(body.checklist || body.rapport, 4000);
      try {
        await transport.sendMail({
          from: process.env.SMTP_FROM || to,
          to: oneLine(body.email),
          replyTo: to,
          subject: `[Arbopartner Brabant] ${subject}`,
          text: `${intro}\n\n${content}\n\nArbopartner Brabant, een label van Matchvermogen B.V.\nLosplaats 16d, 5404 NJ Uden\n085-0870307\ninfo@matchvermogen.nl\n`,
        });
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
