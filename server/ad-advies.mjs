import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { processSubmission, readJson } from "./forms.mjs";
import { publicError } from "./public-error.mjs";
import { rateAllows, spamSignal } from "./spam.mjs";

export const DISCLAIMER =
  "Dit is een automatisch gegenereerd, indicatief advies op basis van uw invoer. Het is geen medisch advies, geen vervanging van een arbeidsdeskundig onderzoek en er kunnen geen rechten aan worden ontleend. De juistheid en adequaatheid voor uw situatie zijn niet gegarandeerd. Voer geen medische informatie in.";

export const MEDISCH_FOUT =
  "We kunnen dit niet verwerken. Haal medische gegevens weg (geen diagnoses, ziektes, medicatie of behandelingen) en haal nummers zoals een BSN weg. Beschrijf alleen wat iemand wel en niet kan.";

const FML = [
  { id: "persoonlijk", label: "Persoonlijk functioneren", items: [["concentreren", "Concentreren van de aandacht"], ["aandacht", "Verdelen van de aandacht"], ["herinneren", "Herinneren"], ["zelfstandig", "Zelfstandig handelen"], ["doelmatig", "Doelmatig handelen"], ["tempo", "Handelingstempo"]] },
  { id: "sociaal", label: "Sociaal functioneren", items: [["zien", "Zien"], ["horen", "Horen"], ["spreken", "Spreken"], ["samenwerken", "Samenwerken"], ["conflicten", "Omgaan met conflicten"], ["gevoelens", "Eigen gevoelens uiten"]] },
  { id: "omgeving", label: "Aanpassing aan fysieke omgeving", items: [["hitte", "Hitte"], ["kou", "Koude"], ["geluid", "Geluid"], ["trillingen", "Trillingen"], ["stof", "Stof, rook, gassen of dampen"], ["bescherming", "Beschermende middelen"]] },
  { id: "dynamisch", label: "Dynamische handelingen", items: [["tillen", "Tillen of dragen"], ["duwen", "Duwen of trekken"], ["lopen", "Lopen"], ["trappen", "Trappenlopen"], ["reiken", "Reiken"], ["handen", "Hand- en vingergebruik"]] },
  { id: "statisch", label: "Statische houdingen", items: [["zitten", "Zitten"], ["staan", "Staan"], ["gebogen", "Gebogen of getordeerd actief zijn"], ["schouder", "Boven schouderhoogte actief zijn"], ["afwisselen", "Afwisseling van houding"]] },
  { id: "werktijden", label: "Werktijden", items: [["uren-dag", "Uren per dag"], ["uren-week", "Uren per week"], ["nacht", "Werken in de nacht"], ["onregelmatig", "Onregelmatige tijden"]] },
];

const MIJLPAAL = [
  [6, "Week 6, probleemanalyse"],
  [8, "Week 8, plan van aanpak"],
  [42, "Week 42, melding bij UWV"],
  [52, "Week 52, eerstejaarsevaluatie"],
  [88, "Week 88, start van de WIA-aanvraag"],
  [91, "Week 91, re-integratieverslag bij de WIA-aanvraag"],
  [104, "Week 104, einde van de wachttijd"],
];

const SECTIE_TITELS = [
  ["samenvatting", "Samenvatting"],
  ["belastbaarheid", "Belastbaarheid versus belasting van de functie"],
  ["spoor1", "Mogelijkheden in spoor 1"],
  ["spoor2", "Indicatie voor spoor 2"],
  ["tijdlijn", "Tijdlijn in de eerste twee ziektejaren"],
  ["risicos", "Risico's"],
  ["vervolgstappen", "Aanbevolen vervolgstappen"],
];

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const MEDISCHE_TERM = new RegExp(
  "\\b(?:" + [
    "gediagnosticeerd", "geneesmiddelen", "geneesmiddel", "antidepressiva", "fysiotherapie", "psychotherapie",
    "angststoornis", "fibromyalgie", "schizofrenie", "aandoeningen", "aandoening", "ziektebeeld", "behandelingen",
    "behandeling", "medicijngebruik", "burgerservicenummer", "long covid", "longcovid", "medicijnen", "medicatie",
    "medicijn", "antibiotica", "antibioticum", "prednisolon", "sertraline", "citalopram", "paracetamol", "ibuprofen",
    "oxycodon", "diagnose", "diagnoses", "burn-out", "burnout", "depressief", "depressie", "epilepsie", "whiplash",
    "parkinson", "artrose", "beroerte", "diabetes", "migraine", "autisme", "therapie", "operatie", "chemokuur",
    "ziekten", "ziekte", "kanker", "hernia", "corona", "griep", "astma", "reuma", "tumor", "morfine", "covid",
    "ptsd", "ptss", "adhd", "bipolair",
  ].sort((a, b) => b.length - a.length).map(escapeRe).join("|") + ")\\b",
  "i",
);

const ITEM_LABEL = new Map();
const ITEM_RUBRIEK = new Map();
for (const rubriek of FML) {
  for (const [id, label] of rubriek.items) {
    ITEM_LABEL.set(`${rubriek.id}:${id}`, label);
    ITEM_RUBRIEK.set(`${rubriek.id}:${id}`, rubriek.label);
  }
}

const reports = new Map();
const rateHits = new Map();
const REPORT_TTL_MS = 2 * 60 * 60 * 1000;

function num(name, fallback) {
  const value = parseInt(process.env[name], 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function schoon(value, max) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function tidy(text) {
  return String(text || "")
    .replace(/\u2014/g, ", ")
    .replace(/\u2013/g, "-")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ +\n/g, "\n")
    .trim();
}

function redact(text, key) {
  let out = String(text || "");
  if (key) out = out.split(key).join("");
  return out.replace(/Bearer\s+\S+/gi, "").replace(/XAI_API_KEY/g, "");
}

function nlDatum(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!match) return "";
  const maand = MAANDEN[Number(match[2]) - 1];
  if (!maand) return "";
  return `${Number(match[3])} ${maand} ${match[1]}`;
}

export function parseIso(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || "").trim());
  if (!match) return "";
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return "";
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function vandaagIso(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function addDays(iso, days) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function dagenTussen(van, tot) {
  const [y1, m1, d1] = van.split("-").map(Number);
  const [y2, m2, d2] = tot.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

function verzuimTekst(dagen) {
  const weken = Math.floor(dagen / 7);
  const rest = dagen % 7;
  const weekTekst = weken === 1 ? "1 week" : `${weken} weken`;
  const dagTekst = rest === 1 ? "1 dag" : `${rest} dagen`;
  if (weken <= 0) return dagTekst;
  if (rest === 0) return weekTekst;
  return `${weekTekst} en ${dagTekst}`;
}

export function berekenTraject(iso, vandaag) {
  const start = parseIso(iso);
  const peil = parseIso(vandaag) || vandaagIso();
  if (!start) return { ok: false, error: "Vul een geldige eerste ziektedag in." };
  const dagen = dagenTussen(start, peil);
  if (dagen < 0) return { ok: false, error: "De eerste ziektedag kan niet in de toekomst liggen." };
  if (dagen > 3660) return { ok: false, error: "De eerste ziektedag ligt te ver in het verleden. Controleer de datum." };
  const mijlpalen = MIJLPAAL.map(([weken, label]) => {
    const datum = addDays(start, weken * 7);
    return { weken, label, datum, datumNl: nlDatum(datum) };
  });
  return { ok: true, eersteZiektedag: start, eersteZiektedagNl: nlDatum(start), peildatum: peil, peildatumNl: nlDatum(peil), dagen, verzuimduur: verzuimTekst(dagen), mijlpalen };
}

export function elfproef(digits) {
  let value = String(digits || "");
  if (value.length === 8) value = `0${value}`;
  if (!/^\d{9}$/.test(value) || value === "000000000") return false;
  let sum = 0;
  for (let i = 0; i < 8; i += 1) sum += (9 - i) * Number(value[i]);
  sum -= Number(value[8]);
  return sum % 11 === 0;
}

function heeftBsn(tekst) {
  const raw = String(tekst || "").replace(/\d{4}-\d{2}-\d{2}/g, " ");
  if (/\b(?:bsn|burgerservicenummer|sofinummer)\b/i.test(raw)) return true;
  const re = /(?<!\d)(?:\d[\s.]?){8,9}(?!\d)/g;
  let match;
  while ((match = re.exec(raw))) {
    const digits = match[0].replace(/\D/g, "");
    if ((digits.length === 8 || digits.length === 9) && elfproef(digits)) return true;
  }
  return false;
}

export function vindMedisch(tekst) {
  const raw = String(tekst || "");
  if (heeftBsn(raw)) return "bsn";
  if (MEDISCHE_TERM.test(raw)) return "medisch";
  return "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function waarheid(value) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "on" || value === "ja";
}

function leesRubrieken(raw) {
  const gekozen = [];
  const bron = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  for (const rubriek of FML) {
    const lijst = Array.isArray(bron[rubriek.id]) ? bron[rubriek.id] : [];
    for (const item of lijst) {
      const key = `${rubriek.id}:${String(item || "").trim()}`;
      if (ITEM_LABEL.has(key)) gekozen.push(key);
    }
  }
  return [...new Set(gekozen)];
}

function rubriekenTekst(keys) {
  const perRubriek = new Map();
  for (const key of keys) {
    const rubriek = ITEM_RUBRIEK.get(key);
    if (!perRubriek.has(rubriek)) perRubriek.set(rubriek, []);
    perRubriek.get(rubriek).push(ITEM_LABEL.get(key));
  }
  return [...perRubriek.entries()].map(([rubriek, labels]) => `${rubriek}: ${labels.join(", ")}`).join(". ");
}

export function validateAdviesLead(fields, now = new Date()) {
  const src = fields && typeof fields === "object" && !Array.isArray(fields) ? fields : {};
  const email = schoon(src.email, 120);
  const telefoon = schoon(src.telefoon, 30);
  const functie = schoon(src.functie, 120);
  const taken = schoon(src.taken, 1500);
  const beperkingen = schoon(src.beperkingen, 2000);
  const duurzaamheid = schoon(src.duurzaamheid, 20).toLowerCase();
  const rubriekKeys = leesRubrieken(src.rubrieken);
  const errors = [];
  if (!isValidEmail(email) && !isValidPhone(telefoon)) errors.push("Vul een e-mailadres of telefoonnummer in.");
  else {
    if (email && !isValidEmail(email)) errors.push("Vul een geldig e-mailadres in.");
    if (telefoon && !isValidPhone(telefoon)) errors.push("Vul een geldig telefoonnummer in.");
  }
  if (!waarheid(src.toestemming) && !waarheid(src.avg)) errors.push("Vink aan dat u toestemming geeft om uw gegevens te gebruiken voor dit advies en om contact op te nemen.");
  if (functie.length < 2) errors.push("Vul de functienaam in.");
  if (taken.length < 8) errors.push("Vul een korte taakomschrijving in.");
  if (beperkingen.length < 8 && !rubriekKeys.length) errors.push("Beschrijf de functionele beperkingen of vink minstens één rubriek aan.");
  const duurzaamOk = duurzaamheid === "ja" || duurzaamheid === "nee" || duurzaamheid === "onbekend";
  if (!duurzaamOk) errors.push("Geef aan of er duurzaam benutbare mogelijkheden zijn: ja, nee of onbekend.");
  let percentage = NaN;
  const percRaw = src.werkpercentage;
  if (typeof percRaw === "number" && Number.isFinite(percRaw)) percentage = percRaw;
  else if (typeof percRaw === "string" && percRaw.trim() !== "") percentage = Number(percRaw.trim());
  if (!Number.isInteger(percentage) || percentage < 0 || percentage > 100) errors.push("Vul een werkpercentage tussen 0 en 100 in.");
  const traject = berekenTraject(src.eersteZiektedag, vandaagIso(now));
  if (!traject.ok) errors.push(traject.error);
  const lead = {
    naam: "Adviesaanvrager",
    email: isValidEmail(email) ? email : "",
    telefoon: isValidPhone(telefoon) ? telefoon : "",
    functie,
    taken,
    beperkingen,
    rubriekKeys,
    rubriekenTekst: rubriekenTekst(rubriekKeys),
    duurzaamheid: duurzaamOk ? duurzaamheid : "",
    werkpercentage: Number.isInteger(percentage) ? percentage : null,
  };
  if (traject.ok) Object.assign(lead, traject);
  if (errors.length) return { ok: false, errors, lead };
  return { ok: true, lead };
}

function alleVrijeTekst(fields) {
  const src = fields && typeof fields === "object" ? fields : {};
  const skip = new Set(["email", "telefoon", "form_ts", "form_sig", "company_website", "toestemming", "avg", "werkpercentage", "duurzaamheid", "eersteZiektedag"]);
  const parts = [];
  for (const [key, value] of Object.entries(src)) {
    if (skip.has(key)) continue;
    if (typeof value === "string") parts.push(value);
    else if (Array.isArray(value)) parts.push(value.filter((item) => typeof item === "string").join(" "));
    else if (value && typeof value === "object") {
      for (const nested of Object.values(value)) {
        if (typeof nested === "string") parts.push(nested);
        else if (Array.isArray(nested)) parts.push(nested.filter((item) => typeof item === "string").join(" "));
      }
    }
  }
  return parts.join("\n");
}

function mijlpalenTekst(lead) {
  return (lead.mijlpalen || []).map((item) => `${item.label}: ${item.datumNl}`).join("; ");
}

export function adviesMailFields(lead) {
  const duurLabel = lead.duurzaamheid === "ja" ? "Ja" : lead.duurzaamheid === "nee" ? "Nee" : "Onbekend";
  return {
    Aanvraag: "AD-adviesgenerator",
    Functie: lead.functie,
    Taakomschrijving: lead.taken,
    "Functionele beperkingen": lead.beperkingen,
    "Rubrieken": lead.rubriekenTekst,
    "Eerste ziektedag": lead.eersteZiektedagNl,
    Verzuimduur: lead.verzuimduur,
    Werkpercentage: `${lead.werkpercentage} procent`,
    "Duurzaam benutbare mogelijkheden": duurLabel,
    Mijlpalen: mijlpalenTekst(lead),
  };
}

function systeemPrompt() {
  return [
    "U schrijft een vrijblijvend, indicatief advies voor een werkgever. U bent geen arts.",
    "Schrijf uitsluitend in het Nederlands, in de u-vorm. Gebruik geen emdash en geen endash.",
    "Kader: de WIA, spoor 1 en spoor 2, passende arbeid, en de termijnen in de eerste twee ziektejaren.",
    "Een loonwaarde noemt u alleen kwalitatief, bijvoorbeeld beperkt, redelijk of goed. Noem geen percentage als loonwaarde. Het werkpercentage in de invoer is het percentage dat iemand nu werkt.",
    "Gebruik alleen de feiten uit de invoer en de meegestuurde datums. Verzin geen uitspraken, geen bedragen en geen statistieken.",
    "Medische gegevens horen niet in de invoer. Ga er niet op in en noem geen diagnose.",
    "Antwoord alleen met JSON, zonder markdown, in precies deze velden: samenvatting, belastbaarheid, spoor1, spoor2, tijdlijn, risicos, vervolgstappen.",
    "Houd elk veld beknopt.",
  ].join("\n");
}

function gebruikersPrompt(lead) {
  const duur = lead.duurzaamheid === "ja"
    ? "ja, er lijken duurzaam benutbare mogelijkheden te zijn"
    : lead.duurzaamheid === "nee"
      ? "nee, er lijken geen duurzaam benutbare mogelijkheden te zijn"
      : "niet bekend of er duurzaam benutbare mogelijkheden zijn";
  const mijlpalen = (lead.mijlpalen || []).map((item) => `- ${item.label}: ${item.datumNl} (${item.datum})`).join("\n");
  return [
    `Functie: ${lead.functie}`,
    `Taken: ${lead.taken}`,
    `Functionele beperkingen: ${lead.beperkingen || "geen vrije tekst"}`,
    `Aangevinkte beperkingen: ${lead.rubriekenTekst || "geen"}`,
    `Eerste ziektedag: ${lead.eersteZiektedagNl}`,
    `Verzuimduur op ${lead.peildatumNl}: ${lead.verzuimduur}`,
    `Huidig werkpercentage: ${lead.werkpercentage} procent. Dit is geen loonwaarde.`,
    `Duurzaam benutbare mogelijkheden: ${duur}`,
    "Mijlpalen, al berekend. Gebruik deze datums en verzin er geen:",
    mijlpalen,
  ].join("\n");
}

export function fallbackSecties(lead) {
  const duur = lead.duurzaamheid === "ja"
    ? "Volgens de invoer lijken er duurzaam benutbare mogelijkheden te zijn."
    : lead.duurzaamheid === "nee"
      ? "Volgens de invoer lijken er geen duurzaam benutbare mogelijkheden te zijn. Dat is een indicatie, geen vaststelling."
      : "Of er duurzaam benutbare mogelijkheden zijn, is niet ingevuld. Dat vraagt om een oordeel van de bedrijfsarts en een arbeidsdeskundige.";
  return {
    samenvatting: `Indicatief beeld bij de functie ${lead.functie}. De persoon werkt nu ${lead.werkpercentage} procent. De verzuimduur is ${lead.verzuimduur}, gerekend tot ${lead.peildatumNl}. ${duur}`,
    belastbaarheid: `Taken in de functie: ${lead.taken}. Beperkingen volgens de invoer: ${lead.beperkingen || "geen vrije tekst"}. Aangevinkt: ${lead.rubriekenTekst || "geen rubrieken"}. Waar de belasting hoger is dan de belastbaarheid, is aanpassing of ander werk nodig.`,
    spoor1: "Kijk eerst of het eigen werk kan worden aangepast, in taken, uren of tempo, en of er ander passend werk bij de eigen werkgever is.",
    spoor2: "Spoor 2, werk bij een andere werkgever, komt in beeld als passend werk in spoor 1 niet haalbaar lijkt. Dit is alleen een indicatie.",
    tijdlijn: `De mijlpalen zijn berekend als een vast aantal weken na de eerste ziektedag ${lead.eersteZiektedagNl}. Week 6 is de probleemanalyse, week 8 het plan van aanpak, week 42 de melding bij UWV, week 52 de eerstejaarsevaluatie, week 88 en 91 de WIA-aanvraag met het re-integratieverslag, en week 104 het einde van de wachttijd.`,
    risicos: "Een loonsanctie kan volgen als de re-integratie of de termijnen in de eerste twee ziektejaren niet op orde zijn. Deze tekst noemt geen bedrag. UWV stelt dat vast.",
    vervolgstappen: "Leg de beperkingen naast de taken. Werk spoor 1 uit. Bewaak de mijlpalen. Vraag een arbeidsdeskundig onderzoek aan als u een onderbouwd rapport nodig hebt.",
  };
}

function naarSecties(obj, key) {
  return SECTIE_TITELS.map(([id, titel]) => ({ id, titel, tekst: tidy(redact(obj[id], key)).slice(0, 2500) }));
}

function parseModel(text, key) {
  let raw = redact(tidy(text), key).replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  let obj;
  try { obj = JSON.parse(raw.slice(start, end + 1)); } catch { return null; }
  for (const [id] of SECTIE_TITELS) {
    if (typeof obj?.[id] !== "string" || !tidy(obj[id])) return null;
  }
  return naarSecties(obj, key);
}

function rateLimited(ip, now = Date.now()) {
  const max = num("AD_ADVIES_RATE_MAX", 6);
  const windowMs = num("AD_ADVIES_RATE_WINDOW_MS", 60 * 60 * 1000);
  const key = ip || "unknown";
  const list = (rateHits.get(key) || []).filter((stamp) => now - stamp < windowMs);
  if (list.length >= max) {
    rateHits.set(key, list);
    return true;
  }
  list.push(now);
  rateHits.set(key, list);
  return false;
}

async function vraagModel(lead, fetchImpl) {
  const key = String(process.env.XAI_API_KEY || "").trim();
  if (!key) {
    const error = new Error("nokey");
    error.code = "nokey";
    throw error;
  }
  const doFetch = fetchImpl || globalThis.fetch;
  const url = `${(process.env.XAI_API_BASE || "https://api.x.ai/v1").replace(/\/$/, "")}/chat/completions`;
  const timeoutMs = num("AD_ADVIES_TIMEOUT_MS", 25000);
  const response = await doFetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.XAI_MODEL || "grok-4.20-0309-non-reasoning",
      messages: [
        { role: "system", content: systeemPrompt() },
        { role: "user", content: gebruikersPrompt(lead) },
      ],
      max_tokens: num("AD_ADVIES_MAX_TOKENS", 1200),
      temperature: 0.2,
      stream: false,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) {
    console.error("[ad-advies] xAI HTTP", response.status);
    const error = new Error("api");
    error.code = "api";
    throw error;
  }
  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content;
  const secties = parseModel(typeof content === "string" ? content : "", key);
  if (!secties) {
    const error = new Error("parse");
    error.code = "parse";
    throw error;
  }
  return secties;
}

function storeReport(record) {
  const now = Date.now();
  for (const [id, item] of reports) {
    if (now - item.created > REPORT_TTL_MS) reports.delete(id);
  }
  const id = randomBytes(16).toString("hex");
  reports.set(id, { created: now, ...record });
  return id;
}

function getReport(id) {
  if (!/^[a-f0-9]{32}$/.test(String(id || ""))) return null;
  const record = reports.get(String(id));
  if (!record || Date.now() - record.created > REPORT_TTL_MS) return null;
  return record;
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

export async function maakAdvies(body, ip, now = Date.now(), options = {}) {
  if (spamSignal(body, now)) return { status: 200, payload: { ok: true } };
  const parsed = validateAdviesLead(body, new Date(now));
  if (!parsed.ok) return { status: 400, payload: { ok: false, error: parsed.errors[0], errors: parsed.errors } };
  if (vindMedisch(`${parsed.lead.functie}\n${parsed.lead.taken}\n${parsed.lead.beperkingen}\n${alleVrijeTekst(body)}`)) {
    return { status: 400, payload: { ok: false, error: MEDISCH_FOUT } };
  }
  if (rateLimited(ip, now)) {
    return { status: 429, payload: { ok: false, error: "U hebt te vaak een advies aangevraagd. Probeer het over een uur opnieuw, of bel 085-0870307." } };
  }
  if (!rateAllows(ip, now)) return { status: 200, payload: { ok: true } };
  const lead = parsed.lead;
  const mail = adviesMailFields(lead);
  const submission = await processSubmission("ad-advies", {
    ...body,
    toestemming: "ja",
    naam: lead.email || lead.telefoon || "Adviesaanvrager",
    email: lead.email,
    telefoon: lead.telefoon,
    organisatie: lead.functie,
    rapport: Object.entries(mail).map(([key, value]) => `${key}: ${value}`).join("\n"),
  }, ip, now, { ...options, skipGuards: true });
  if (submission.status !== 200 || submission.payload?.ok === false) {
    return { status: submission.status, payload: submission.payload };
  }
  let secties;
  let fallback = false;
  try {
    secties = await vraagModel(lead, options.fetchImpl);
  } catch (error) {
    console.error("[ad-advies] generator niet gelukt", error?.code || "fout");
    fallback = true;
    secties = naarSecties(fallbackSecties(lead), "");
  }
  const id = storeReport({
    secties,
    mijlpalen: lead.mijlpalen,
    verzuimduur: lead.verzuimduur,
    peildatumNl: lead.peildatumNl,
    eersteZiektedagNl: lead.eersteZiektedagNl,
    functie: lead.functie,
    werkpercentage: lead.werkpercentage,
    fallback,
  });
  const duurLabel = lead.duurzaamheid === "ja" ? "Ja" : lead.duurzaamheid === "nee" ? "Nee" : "Onbekend";
  return {
    status: 200,
    payload: {
      ok: true,
      id,
      fallback,
      disclaimer: DISCLAIMER,
      kop: {
        functie: lead.functie,
        verzuimduur: lead.verzuimduur,
        peildatum: lead.peildatumNl,
        eersteZiektedag: lead.eersteZiektedagNl,
        werkpercentage: lead.werkpercentage,
        duurzaamheid: duurLabel,
      },
      mijlpalen: lead.mijlpalen.map((item) => ({ label: item.label, datum: item.datumNl })),
      secties,
    },
  };
}

async function schrijfPdf(record) {
  const PDFDocument = (await import("pdfkit")).default;
  let logo = null;
  try { logo = readFileSync(path.resolve("public/logo.png")); } catch { logo = null; }
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56, compress: false });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.info.Title = "Indicatief arbeidsdeskundig advies";
    doc.info.Author = "Arbopartner Brabant";
    const width = doc.page.width - 112;
    if (logo) doc.image(logo, 56, 40, { height: 36 });
    doc.fillColor("#12382c").fontSize(16).text("Indicatief arbeidsdeskundig advies", 56, logo ? 88 : 48, { width });
    doc.moveDown();
    doc.fontSize(10).fillColor("#3a463f");
    doc.text(`Functie: ${record.functie || ""}`, { width });
    doc.text(`Eerste ziektedag: ${record.eersteZiektedagNl || ""}`, { width });
    doc.text(`Verzuimduur: ${record.verzuimduur || ""} (peildatum ${record.peildatumNl || ""})`, { width });
    doc.text(`Werkpercentage nu: ${record.werkpercentage == null ? "" : `${record.werkpercentage} procent`}`, { width });
    for (const sectie of record.secties || []) {
      doc.moveDown(0.6);
      doc.fillColor("#12382c").fontSize(12).text(sectie.titel, { width });
      doc.moveDown(0.15);
      doc.fillColor("#14261c").fontSize(10).text(sectie.tekst || "", { width });
    }
    doc.moveDown(0.6);
    doc.fillColor("#12382c").fontSize(12).text("Berekende mijlpalen", { width });
    for (const item of record.mijlpalen || []) {
      doc.fontSize(9).fillColor("#3a463f").text(`${item.label}: ${item.datumNl}`, { width });
    }
    doc.moveDown(0.8);
    doc.fontSize(8).fillColor("#3a463f").text(DISCLAIMER, { width });
    doc.moveDown(0.6);
    doc.text("Arbopartner Brabant, van Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden, 085-0870307", { width, align: "center" });
    doc.end();
  });
}

export function resetForTests() {
  reports.clear();
  rateHits.clear();
}

export async function handleAdRoute(req, res) {
  const url = new URL(req.url || "/", "http://localhost");
  try {
    if (req.method !== "POST") {
      res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "Alleen POST." }));
      return;
    }
    const body = await readJson(req);
    if (url.pathname === "/api/ad-advies-pdf") {
      const record = getReport(body?.id);
      if (!record) {
        res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ ok: false, error: "Dit rapport is verlopen. Genereer het opnieuw." }));
        return;
      }
      const pdf = await schrijfPdf(record);
      res.writeHead(200, {
        "content-type": "application/pdf",
        "content-disposition": "attachment; filename=\"ad-advies.pdf\"",
        "cache-control": "no-store",
      });
      res.end(pdf);
      return;
    }
    const result = await maakAdvies(body, clientIp(req));
    const payload = JSON.stringify(result.payload);
    if (payload.includes(String(process.env.XAI_API_KEY || "___no_key___")) && process.env.XAI_API_KEY) {
      throw new Error("sleutel lekte");
    }
    res.writeHead(result.status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    res.end(payload);
  } catch (error) {
    console.error("[ad-advies]", publicError(error));
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "Er ging iets mis. Probeer het opnieuw of bel 085-0870307." }));
    }
  }
}
