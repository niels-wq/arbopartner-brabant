import { createHash, randomBytes } from "node:crypto";
import { readJson, sendPlainMail } from "./forms.mjs";
import { systemMessage } from "./chat-prompt.mjs";

export const FALLBACK_TEXT = "Bel 085-0870307 of laat je gegevens achter.";
export const LEAD_SUBJECT = "Nieuwe chatlead arbopartnerbrabant.nl";
export const SESSION_LIMIT = 20;
export const IP_LIMIT = 60;
export const DAY_LIMIT = 1500;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const TIMEOUT_MS = 20_000;
const SALT = randomBytes(16).toString("hex");
const OWN_MOBILES = new Set(["0650213593"]);
const OWN_EMAIL = /@(?:matchvermogen\.nl|arbopartnerbrabant\.nl|arbeidsdeskundig\.com|bestmatchbv\.nl|werkhervattingskas\.nl)$/i;

const sessions = new Map();
const ipHits = new Map();
let day = { key: "", n: 0 };

const TOOLS = [{
  type: "function",
  function: {
    name: "open_lead_form",
    description: "Open het bestaande contactformulier in de chat. Alleen als de bezoeker zelf een terugbelverzoek, offerte of gesprek wil. Niet bij een gewone inhoudelijke vraag.",
    parameters: {
      type: "object",
      properties: {
        reason: { type: "string" },
        reply: { type: "string", description: "Kort bericht boven het formulier, maximaal 40 woorden." },
      },
    },
  },
}];

export function resetChatLimits() {
  sessions.clear();
  ipHits.clear();
  day = { key: "", n: 0 };
}

export function chatConfigured() {
  return String(process.env.CHAT_AI_ENABLED || "").trim().toLowerCase() === "true"
    && String(process.env.XAI_API_KEY || "").trim().length > 0;
}

function hash(value) {
  return createHash("sha256").update(SALT + String(value)).digest("hex").slice(0, 32);
}

export function clipText(text, len) {
  return String(text ?? "").replace(/<[^>]*>/g, " ").replace(/[ \t]+/g, " ").trim().slice(0, len);
}

export function tidy(text) {
  let out = String(text || "").replace(/<[^>]*>/g, "");
  out = out.replace(/\s+[—–]\s+/g, ", ").replace(/[—–]/g, "-");
  return out.replace(/\n{3,}/g, "\n\n").trim().slice(0, 1500);
}

export function cleanHistory(raw) {
  const out = [];
  const list = Array.isArray(raw) ? raw.slice(-20) : [];
  for (const message of list) {
    if (!message || (message.role !== "user" && message.role !== "assistant") || typeof message.content !== "string") continue;
    const content = clipText(message.content, message.role === "assistant" ? 1500 : 500);
    if (content) out.push({ role: message.role, content });
  }
  const last = out.slice(-10);
  while (last.length && last[0].role !== "user") last.shift();
  return last;
}

function siteHost(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const withProto = raw.includes("://") ? raw : `http://${raw}`;
    return new URL(withProto).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

export function sameOrigin(origin, host) {
  if (!origin) return true;
  const left = siteHost(origin);
  const right = siteHost(host);
  return Boolean(left) && left === right;
}

function mobile(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("0031")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("31")) digits = `0${digits.slice(2)}`;
  if (!/^06\d{8}$/.test(digits) || OWN_MOBILES.has(digits)) return "";
  return digits;
}

export function findVisitorContact(history) {
  const found = { email: "", telefoon: "" };
  for (const message of history || []) {
    if (!message || message.role !== "user") continue;
    const text = String(message.content || "");
    if (!found.email) {
      for (const email of text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}/g) || []) {
        const low = email.toLowerCase();
        if (!OWN_EMAIL.test(low)) {
          found.email = low;
          break;
        }
      }
    }
    if (!found.telefoon) {
      for (const phone of text.match(/(?:\+|00)?\s*31[\s().-]*6(?:[\s().-]*\d){8}|\b0[\s().-]*6(?:[\s().-]*\d){8}\b/g) || []) {
        const normalized = mobile(phone);
        if (normalized) {
          found.telefoon = normalized;
          break;
        }
      }
    }
  }
  return found;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function prune(now) {
  for (const [key, state] of sessions) {
    if (now - state.t > DAY_MS) sessions.delete(key);
  }
  for (const [key, stamps] of ipHits) {
    const recent = stamps.filter((stamp) => now - stamp < HOUR_MS);
    if (recent.length) ipHits.set(key, recent);
    else ipHits.delete(key);
  }
}

function rateCheck(sessionKey, ip, now) {
  prune(now);
  const today = new Date(now).toISOString().slice(0, 10);
  if (day.key !== today) day = { key: today, n: 0 };
  const state = sessions.get(sessionKey) || { count: 0, t: now, leadSent: false };
  const stamps = (ipHits.get(ip) || []).filter((stamp) => now - stamp < HOUR_MS);
  if (state.count >= SESSION_LIMIT) return { limited: "session", state };
  if (stamps.length >= IP_LIMIT) return { limited: "ip", state };
  if (day.n >= DAY_LIMIT) return { limited: "day", state };
  state.count += 1;
  state.t = now;
  sessions.set(sessionKey, state);
  stamps.push(now);
  ipHits.set(ip, stamps);
  day.n += 1;
  return { limited: "", state };
}

function fallback(status = 200) {
  return { status, payload: { reply: FALLBACK_TEXT, fallback: true } };
}

function hideKey(text, key) {
  if (!key || !text.includes(key)) return text;
  return text.split(key).join("");
}

async function mailLead(contact, history, pagePath, options) {
  const lines = [
    "Nieuwe chatlead via arbopartnerbrabant.nl",
    contact.email ? `E-mail: ${contact.email}` : "",
    contact.telefoon ? `Telefoon: ${contact.telefoon}` : "",
    pagePath ? `Pagina: ${pagePath}` : "",
    "",
    "Gesprek:",
    ...history.map((message) => `${message.role === "user" ? "bezoeker" : "assistent"}: ${message.content}`),
  ].filter((line, index) => line !== "" || index > 3);
  try {
    await sendPlainMail({
      subject: LEAD_SUBJECT,
      text: lines.join("\n").slice(0, 8000),
      replyTo: contact.email || undefined,
    }, options);
  } catch {
    console.error("[chat] lead doorsturen mislukt");
  }
}

async function complete(history, sessionKey, page, options) {
  const key = String(process.env.XAI_API_KEY || "").trim();
  if (!chatConfigured()) return fallback();
  const base = String(process.env.XAI_API_BASE || "https://api.x.ai/v1").replace(/\/$/, "");
  const body = {
    model: process.env.XAI_MODEL || "grok-4.20-0309-non-reasoning",
    messages: [{ role: "system", content: systemMessage(page) }, ...history],
    max_tokens: 350,
    temperature: 0.3,
    tools: TOOLS,
    tool_choice: "auto",
    stream: false,
  };
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), options.timeoutMs || TIMEOUT_MS);
  let json;
  try {
    const doFetch = options.fetchImpl || globalThis.fetch;
    const response = await doFetch(`${base}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "x-grok-conv-id": sessionKey,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!response.ok) {
      console.error("[chat] xAI HTTP", response.status);
      return fallback();
    }
    json = await response.json();
  } catch {
    console.error("[chat] xAI-verzoek mislukt");
    return fallback();
  } finally {
    clearTimeout(timer);
  }
  const message = json?.choices?.[0]?.message;
  if (!message) return fallback();
  let reply = typeof message.content === "string" ? message.content : "";
  let action = "";
  for (const call of Array.isArray(message.tool_calls) ? message.tool_calls : []) {
    if (call?.function?.name !== "open_lead_form") continue;
    action = "lead_form";
    try {
      const args = JSON.parse(call.function.arguments || "{}");
      if (!reply.trim() && args.reply) reply = String(args.reply);
    } catch {
      /* ongeldige tool-argumenten negeren */
    }
  }
  reply = hideKey(tidy(reply), key);
  if (!reply) {
    reply = action ? "Laat je gegevens hieronder achter, dan nemen we contact op." : FALLBACK_TEXT;
    if (!action) return fallback();
  }
  const payload = { reply };
  if (action) payload.action = action;
  return { status: 200, payload };
}

export async function processChat(input, options = {}) {
  const now = options.now ?? Date.now();
  if (!sameOrigin(input.origin, input.host)) return fallback(403);
  const session = String(input.session || "").replace(/[^A-Za-z0-9_-]/g, "");
  if (session.length < 12 || session.length > 64) return fallback(400);
  const history = cleanHistory(input.messages);
  if (!history.length || history[history.length - 1].role !== "user") return fallback(400);
  const sessionKey = hash(session);
  const ip = String(input.ip || "unknown");
  const { limited, state } = rateCheck(sessionKey, ip, now);
  const contact = findVisitorContact(history);
  const pagePath = clipText(input.page?.path, 200);
  if ((contact.email || contact.telefoon) && !state.leadSent) {
    state.leadSent = true;
    sessions.set(sessionKey, state);
    await mailLead(contact, history, pagePath, options);
  }
  if (limited) return fallback(429);
  return complete(history, sessionKey, {
    pageTitle: input.page?.title,
    pagePath,
  }, options);
}

function write(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

export async function handleChatMessage(req, res, options = {}) {
  if (req.method !== "POST") {
    write(res, 405, { reply: FALLBACK_TEXT, fallback: true });
    return;
  }
  let body = {};
  try {
    body = await readJson(req);
  } catch {
    write(res, 400, { reply: FALLBACK_TEXT, fallback: true });
    return;
  }
  const result = await processChat({
    origin: typeof req.headers.origin === "string" ? req.headers.origin : "",
    host: req.headers.host || "",
    ip: clientIp(req),
    session: body.session,
    messages: body.messages,
    page: body.page,
  }, options);
  write(res, result.status, result.payload);
}
