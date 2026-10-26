import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/** Te snel ingevuld. De pagina wacht zelf tot deze drempel voorbij is. */
export const MIN_MS = 3000;
/** Een open tab langer dan dit krijgt bij verzenden een nieuw stempel. */
export const MAX_AGE_MS = 4 * 60 * 60 * 1000;
export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_PER_WINDOW = 5;

const hits = new Map();

/**
 * FORM_HMAC_SECRET in de omgeving. Ontbreekt die, of is hij korter dan 16 tekens,
 * dan een vaste afleiding zodat formulieren werken zonder extra instelling.
 * Die afleiding staat in de bron. Zet het geheim op de server om het te vervangen.
 */
export function spamSecret() {
  const fromEnv = String(process.env.FORM_HMAC_SECRET || "").trim();
  if (fromEnv.length >= 16) return fromEnv;
  return createHash("sha256").update("arbopartner-brabant-formulier-v1").digest("hex");
}

export function signStamp(now = Date.now()) {
  const form_ts = String(now);
  const form_sig = createHmac("sha256", spamSecret()).update(form_ts).digest("hex");
  return { form_ts, form_sig };
}

function honeypotFilled(body) {
  return String(body?.company_website ?? "").replace(/[\r\n\t]+/g, " ").trim().length > 0;
}

/** @returns {"ok" | "fast" | "old" | "invalid"} */
export function stampStatus(body, now = Date.now()) {
  const ts = String(body?.form_ts ?? "");
  const sig = String(body?.form_sig ?? "").toLowerCase();
  if (!/^\d{10,16}$/.test(ts) || !/^[a-f0-9]{64}$/.test(sig)) return "invalid";
  const expected = createHmac("sha256", spamSecret()).update(ts).digest("hex");
  const left = Buffer.from(sig, "hex");
  const right = Buffer.from(expected, "hex");
  if (left.length !== right.length || !timingSafeEqual(left, right)) return "invalid";
  const age = now - Number(ts);
  if (age < MIN_MS) return "fast";
  if (age > MAX_AGE_MS) return "old";
  return "ok";
}

/** @returns {null | "honeypot" | "fast" | "old" | "invalid"} */
export function spamSignal(body, now = Date.now()) {
  if (honeypotFilled(body)) return "honeypot";
  const status = stampStatus(body, now);
  return status === "ok" ? null : status;
}

export function resetRateLimit() {
  hits.clear();
}

function prune(now) {
  if (hits.size < 5000) return;
  for (const [key, stamps] of hits) {
    const recent = stamps.filter((stamp) => now - stamp < WINDOW_MS);
    if (recent.length) hits.set(key, recent);
    else hits.delete(key);
  }
}

/** true = deze inzending mag door. De zesde binnen tien minuten is false. */
export function rateAllows(ip, now = Date.now()) {
  prune(now);
  const key = String(ip || "unknown");
  const recent = (hits.get(key) || []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
