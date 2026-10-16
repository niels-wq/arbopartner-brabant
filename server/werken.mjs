import werken from "./werken.json" with { type: "json" };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 4;
const MAX_BODY = 11 * 1024 * 1024;
const MAX_CV = 10 * 1024 * 1024;
export const AIRTABLE_CV_LIMIT = 5 * 1024 * 1024;
export const CANDIDATE_EMAIL = "info@matchvermogen.nl";

const hits = new Map();

export function resetUploads() {
  hits.clear();
}

export function uploadLimited(ip, now = Date.now()) {
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

function asList(value) {
  const raw = Array.isArray(value) ? value : value ? [value] : [];
  return raw.map((item) => oneLine(item, 80)).filter(Boolean);
}

function onlyKnown(values, allowed) {
  return values.filter((value) => allowed.includes(value));
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPdf(buffer) {
  return buffer.length > 5 && buffer.subarray(0, 4).toString("latin1") === "%PDF";
}

export function isDocx(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4b) return false;
  const head = buffer.subarray(0, Math.min(buffer.length, 8000)).toString("latin1");
  return head.includes("word/");
}

export function safeFilename(name, ext) {
  const base = String(name || "cv")
    .split(/[/\\]/)
    .pop()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^\.+/, "")
    .slice(0, 80);
  const lower = base.toLowerCase();
  if (lower.endsWith(ext)) return base;
  return `cv${ext}`;
}

export function parseMultipart(buffer, contentType) {
  const found = String(contentType || "").match(/boundary=(?:"([^"]+)"|([^;\s]+))/i);
  if (!found) throw new Error("boundary");
  const boundary = (found[1] || found[2]).trim();
  const marker = `--${boundary}`;
  const fields = {};
  let file = null;
  let cursor = buffer.indexOf(Buffer.from(marker));
  if (cursor < 0) throw new Error("boundary");
  while (cursor >= 0 && cursor < buffer.length) {
    if (buffer.subarray(cursor + marker.length, cursor + marker.length + 2).toString() === "--") break;
    let start = cursor + marker.length;
    if (buffer.subarray(start, start + 2).toString() === "\r\n") start += 2;
    const headerEnd = buffer.indexOf(Buffer.from("\r\n\r\n"), start);
    if (headerEnd < 0) break;
    const headers = buffer.subarray(start, headerEnd).toString("utf8");
    const bodyStart = headerEnd + 4;
    const next = buffer.indexOf(Buffer.from(`\r\n${marker}`), bodyStart);
    const bodyEnd = next < 0 ? buffer.length : next;
    const content = buffer.subarray(bodyStart, bodyEnd);
    const name = headers.match(/name="([^"]+)"/)?.[1];
    const filename = headers.match(/filename="([^"]*)"/)?.[1];
    if (name && filename !== undefined) {
      const mime = headers.match(/Content-Type:\s*([^\r\n]+)/i)?.[1]?.trim() || "";
      file = { field: name, filename, mime, buffer: Buffer.from(content) };
    } else if (name) {
      const value = content.toString("utf8");
      if (fields[name] === undefined) fields[name] = value;
      else if (Array.isArray(fields[name])) fields[name].push(value);
      else fields[name] = [fields[name], value];
    }
    if (next < 0) break;
    cursor = next + 2;
  }
  return { fields, file };
}

export function assessWerken(fields, file) {
  const errors = [];
  const traject = oneLine(fields?.traject, 20);
  if (traject !== "zzp" && traject !== "dienst") errors.push("Kies zzp of een baan in dienst.");
  const naam = oneLine(fields?.naam, 120);
  const email = oneLine(fields?.email, 180);
  const telefoon = oneLine(fields?.telefoon, 40);
  const woonplaats = oneLine(fields?.woonplaats, 80);
  const motivatie = textBlock(fields?.motivatie, 4000);
  const opleiding = oneLine(fields?.opleiding, 200);
  const overig = oneLine(fields?.specialisatie_overig, 200);
  if (!naam) errors.push("Vul uw naam in.");
  if (!validEmail(email)) errors.push("Het e-mailadres klopt niet.");
  if (telefoon.replace(/\D/g, "").length < 8) errors.push("Vul een telefoonnummer in.");
  if (!woonplaats) errors.push("Vul uw woonplaats in.");
  if (motivatie.length < 20) errors.push("Schrijf een korte motivatie, minstens een paar zinnen.");
  if (!opleiding) errors.push("Vul uw opleiding in.");
  if (fields?.toestemming !== "ja") errors.push("Vink de toestemming aan om de aanmelding te versturen.");

  const ervaringRaw = oneLine(fields?.ervaring_jaren, 8).replace(",", ".");
  const urenRaw = oneLine(fields?.beschikbaarheid_uren, 8).replace(",", ".");
  const ervaring = Number(ervaringRaw);
  const uren = Number(urenRaw);
  if (!/^\d{1,2}$/.test(ervaringRaw) || ervaring > 60) errors.push("Vul uw ervaring in hele jaren in.");
  if (!/^\d{1,2}(\.\d+)?$/.test(urenRaw) || uren <= 0 || uren > 40) errors.push("Vul uw beschikbaarheid in uren per week in, tot 40.");

  const registraties = onlyKnown(asList(fields?.registraties), werken.registraties);
  const regios = onlyKnown(asList(fields?.regios), werken.regios);
  const specialisaties = onlyKnown(asList(fields?.specialisaties), werken.specialisaties);
  const vog = oneLine(fields?.vog, 20);
  const verzekering = oneLine(fields?.verzekering, 20);
  if (!registraties.length) errors.push("Kies een registratie, of Geen.");
  if (!regios.length) errors.push("Kies minstens één regio in Brabant.");
  if (!werken.vog.includes(vog)) errors.push("Geef aan of u een VOG heeft.");
  if (!werken.verzekering.includes(verzekering)) errors.push("Geef aan of u een beroepsaansprakelijkheidsverzekering heeft.");
  if (!specialisaties.length && !overig) errors.push("Kies minstens één specialisatie, of vul het vrije veld in.");

  let uurtarief = null;
  let kvk = "";
  if (traject === "zzp") {
    uurtarief = Number(oneLine(fields?.uurtarief, 12).replace(",", "."));
    kvk = oneLine(fields?.kvk, 16).replace(/\s/g, "");
    if (!Number.isFinite(uurtarief) || uurtarief <= 0 || uurtarief > 999) errors.push("Vul uw uurtarief in.");
    if (!/^\d{8}$/.test(kvk)) errors.push("Vul uw KvK-nummer van 8 cijfers in.");
  }

  let cv = null;
  if (!file?.buffer?.length) errors.push("Voeg een CV toe als pdf of docx.");
  else if (file.buffer.length > MAX_CV) errors.push("Het CV is groter dan 10 MB.");
  else {
    const lower = String(file.filename || "").toLowerCase();
    const pdf = lower.endsWith(".pdf") && isPdf(file.buffer);
    const docx = lower.endsWith(".docx") && isDocx(file.buffer);
    if (!pdf && !docx) errors.push("Het CV moet een pdf of een docx zijn.");
    else {
      const ext = pdf ? ".pdf" : ".docx";
      cv = {
        filename: safeFilename(file.filename, ext),
        mime: pdf ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        buffer: file.buffer,
      };
    }
  }

  return {
    errors,
    application: errors.length
      ? null
      : {
          traject,
          naam,
          email,
          telefoon,
          woonplaats,
          motivatie,
          opleiding,
          ervaring,
          uren,
          registraties,
          regios,
          vog,
          verzekering,
          specialisaties,
          overig,
          uurtarief,
          kvk,
          cv,
        },
  };
}

export function toAirtableFields(application, extra = {}) {
  const fields = {
    Traject: application.traject === "zzp" ? "Zzp" : "In dienst",
    Naam: application.naam,
    Email: application.email,
    Telefoon: application.telefoon,
    Woonplaats: application.woonplaats,
    Motivatie: application.motivatie,
    ErvaringJaren: application.ervaring,
    Registraties: application.registraties,
    Opleiding: application.opleiding,
    Regios: application.regios,
    BeschikbaarheidUren: application.uren,
    VOG: application.vog,
    Beroepsaansprakelijkheid: application.verzekering,
    Toestemming: true,
    Ingediend: new Date().toISOString().slice(0, 10),
    Bron: "https://www.arbopartnerbrabant.nl/werken-bij",
    ...extra,
  };
  if (application.specialisaties.length) fields.Specialisaties = application.specialisaties;
  if (application.overig) fields.SpecialisatieOverig = application.overig;
  if (application.traject === "zzp") {
    fields.Uurtarief = application.uurtarief;
    fields.KvK = application.kvk;
  }
  return fields;
}

export function applicationText(application, note) {
  const lines = [
    `Traject: ${application.traject === "zzp" ? "Zzp" : "In dienst"}`,
    `Naam: ${application.naam}`,
    `E-mail: ${application.email}`,
    `Telefoon: ${application.telefoon}`,
    `Woonplaats: ${application.woonplaats}`,
    `Ervaring in jaren: ${application.ervaring}`,
    `Registraties: ${application.registraties.join(", ")}`,
    `Opleiding: ${application.opleiding}`,
    `Regio's: ${application.regios.join(", ")}`,
    `Beschikbaarheid in uren per week: ${application.uren}`,
    `VOG: ${application.vog}`,
    `Beroepsaansprakelijkheid: ${application.verzekering}`,
    `Specialisaties: ${application.specialisaties.join(", ") || "—"}`,
    `Specialisatie, vrij veld: ${application.overig || "—"}`,
  ];
  if (application.traject === "zzp") {
    lines.push(`Uurtarief: ${application.uurtarief}`);
    lines.push(`KvK: ${application.kvk}`);
  }
  lines.push("", "Motivatie:", application.motivatie, "", "Toestemming: ja");
  if (note) lines.push("", note);
  return lines.join("\n");
}

function airtableOn() {
  return Boolean(process.env.AIRTABLE_TOKEN && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE);
}

function smtpOn() {
  return Boolean(process.env.SMTP_HOST);
}

async function createRecord(fields) {
  const table = encodeURIComponent(process.env.AIRTABLE_TABLE);
  const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${table}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error("airtable");
    error.detail = payload?.error?.type || response.status;
    throw error;
  }
  const id = payload.records?.[0]?.id;
  if (!id) throw new Error("airtable");
  return id;
}

async function uploadAttachment(recordId, cv) {
  const field = encodeURIComponent(process.env.AIRTABLE_CV_FIELD || "CV");
  const response = await fetch(
    `https://content.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${recordId}/${field}/uploadAttachment`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        contentType: cv.mime,
        filename: cv.filename,
        file: cv.buffer.toString("base64"),
      }),
    },
  );
  if (!response.ok) throw new Error("upload");
}

async function sendCandidateMail(application, note) {
  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || "" }
      : undefined,
  });
  const who = application.traject === "zzp" ? "zzp" : "in dienst";
  await transport.sendMail({
    from: process.env.SMTP_FROM || CANDIDATE_EMAIL,
    to: CANDIDATE_EMAIL,
    replyTo: application.email,
    subject: `[Arbopartner Brabant] werken ${who} — ${application.naam}`,
    text: applicationText(application, note),
    attachments: [
      {
        filename: application.cv.filename,
        content: application.cv.buffer,
        contentType: application.cv.mime,
      },
    ],
  });
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) {
      const error = new Error("te groot");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function handleWerken(req, ip) {
  if (uploadLimited(ip)) {
    req.resume();
    return {
      status: 429,
      payload: { ok: false, errors: [`Te veel aanmeldingen. Mail uw CV naar ${CANDIDATE_EMAIL}.`] },
    };
  }
  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return {
      status: error.status || 400,
      payload: { ok: false, errors: [error.status === 413 ? "Het bestand is groter dan 10 MB." : "De aanmelding kon niet worden gelezen."] },
    };
  }
  let parsed;
  try {
    parsed = parseMultipart(body, req.headers["content-type"]);
  } catch {
    return { status: 400, payload: { ok: false, errors: ["De aanmelding kon niet worden gelezen."] } };
  }
  if (oneLine(parsed.fields.company_website, 200)) {
    return { status: 200, payload: { ok: true, delivered: true, via: "email", cv: "email" } };
  }
  const { errors, application } = assessWerken(parsed.fields, parsed.file);
  if (errors.length) return { status: 400, payload: { ok: false, errors } };

  const cvFitsAirtable = application.cv.buffer.length <= AIRTABLE_CV_LIMIT;
  if (airtableOn()) {
    try {
      const extra = cvFitsAirtable
        ? {}
        : { CvNotitie: "CV is groter dan 5 MB. De Airtable-upload stopt bij 5 MB. Het bestand gaat per mail mee als SMTP aanstaat." };
      const recordId = await createRecord(toAirtableFields(application, extra));
      if (cvFitsAirtable) {
        try {
          await uploadAttachment(recordId, application.cv);
          return { status: 200, payload: { ok: true, delivered: true, via: "airtable", cv: "attachment" } };
        } catch {
          /* Het record staat. Het bestand gaat alsnog per mail als dat kan. */
        }
      }
      if (smtpOn()) {
        try {
          await sendCandidateMail(application, `Airtable-record: ${recordId}. Het CV zit bij deze mail.`);
          return { status: 200, payload: { ok: true, delivered: true, via: "airtable+email", cv: "email" } };
        } catch {
          return { status: 200, payload: { ok: true, delivered: true, via: "airtable-zonder-cv", cv: "niet-opgeslagen" } };
        }
      }
      return {
        status: 200,
        payload: {
          ok: true,
          delivered: true,
          via: "airtable-zonder-cv",
          cv: "niet-opgeslagen",
        },
      };
    } catch {
      /* Val terug op mail, zodat de aanmelding niet verdwijnt. */
    }
  }

  if (smtpOn()) {
    try {
      await sendCandidateMail(application, "Airtable is niet gebruikt. Deze mail is de inzending.");
      return { status: 200, payload: { ok: true, delivered: true, via: "email", cv: "email" } };
    } catch {
      return { status: 200, payload: { ok: true, delivered: false, via: "geen", cv: "niet-opgeslagen" } };
    }
  }
  return { status: 200, payload: { ok: true, delivered: false, via: "geen", cv: "niet-opgeslagen" } };
}
