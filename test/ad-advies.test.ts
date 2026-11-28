import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { berekenTraject, elfproef, maakAdvies, resetForTests, vindMedisch, handleAdRoute, DISCLAIMER } from "../server/ad-advies.mjs";
import { resetRateLimit, signStamp } from "../server/spam.mjs";

const SLEUTEL = "xai-test-sleutel-niet-lekken";

function modelJson() {
  return JSON.stringify({
    samenvatting: "Indicatief beeld bij de functie.",
    belastbaarheid: "Tillen en staan passen niet bij de beperkingen.",
    spoor1: "Kijk eerst naar aangepast werk bij de eigen werkgever.",
    spoor2: "Spoor 2 is alleen een indicatie.",
    tijdlijn: "De mijlpalen volgen uit de eerste ziektedag.",
    risicos: "De termijnen in de eerste twee ziektejaren vragen aandacht.",
    vervolgstappen: "Leg de taken naast de belastbaarheid.",
  });
}

function lead(extra: Record<string, unknown> = {}) {
  const now = Date.now();
  return {
    now,
    body: {
      functie: "Magazijnmedewerker",
      taken: "tillen en staan",
      beperkingen: "niet lang staan of tillen",
      rubrieken: { dynamisch: ["tillen"], statisch: ["staan"] },
      eersteZiektedag: "2026-01-06",
      werkpercentage: 40,
      duurzaamheid: "onbekend",
      email: "casus@example.com",
      telefoon: "",
      toestemming: "ja",
      company_website: "",
      ...signStamp(now - 10_000),
      ...extra,
    },
  };
}

async function vraag(extra: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
  resetForTests();
  resetRateLimit();
  const { now, body } = lead(extra);
  const mails: Array<{ subject?: string; to?: string; text?: string }> = [];
  const previous = process.env.XAI_API_KEY;
  process.env.XAI_API_KEY = SLEUTEL;
  try {
    const result = await maakAdvies(body, `198.51.100.${Math.floor(Math.random() * 200) + 1}`, now, {
      sendMail: async (message: { subject?: string; to?: string; text?: string }) => {
        mails.push(message);
      },
      fetchImpl: async () => ({
        ok: true,
        json: async () => ({ choices: [{ message: { content: modelJson() } }] }),
      }),
      ...options,
    });
    return { result, mails };
  } finally {
    if (previous === undefined) delete process.env.XAI_API_KEY;
    else process.env.XAI_API_KEY = previous;
  }
}

describe("AD-adviesgenerator", { concurrency: 1 }, () => {
  it("rekent de mijlpalen vanaf de eerste ziektedag", () => {
    const traject = berekenTraject("2026-01-06", "2026-03-03");
    assert.equal(traject.ok, true);
    if (!traject.ok) return;
    assert.equal(traject.dagen, 56);
    assert.equal(traject.mijlpalen.find((item) => item.weken === 6)?.datum, "2026-02-17");
    assert.equal(traject.mijlpalen.find((item) => item.weken === 8)?.datum, "2026-03-03");
    assert.equal(traject.mijlpalen.find((item) => item.weken === 104)?.datum, "2028-01-04");
  });

  it("herkent een BSN en een medische term", () => {
    assert.equal(elfproef("123456782"), true);
    assert.equal(vindMedisch("bsn 123456782"), "bsn");
    assert.equal(vindMedisch("de medewerker heeft een burn-out"), "medisch");
  });

  it("geeft geen advies zonder contact en roept het model niet aan", async () => {
    let called = false;
    const { result } = await vraag(
      { email: "", telefoon: "" },
      { fetchImpl: async () => { called = true; return { ok: false, json: async () => ({}) }; } },
    );
    assert.equal(result.status, 400);
    assert.equal(called, false);
    assert.equal("secties" in result.payload, false);
  });

  it("werkt met alleen een telefoonnummer", async () => {
    const { result, mails } = await vraag({ email: "", telefoon: "0850870307" });
    assert.equal(result.status, 200);
    assert.equal(result.payload.secties.length, 7);
    assert.ok(mails.some((mail) => String(mail.text).includes("0850870307")));
    assert.equal(mails.some((mail) => String(mail.to) === "0850870307"), false);
  });

  it("geeft geen advies bij een honeypot", async () => {
    let called = false;
    const { result, mails } = await vraag(
      { company_website: "https://spam.example" },
      { fetchImpl: async () => { called = true; return { ok: false, json: async () => ({}) }; } },
    );
    assert.equal(result.status, 200);
    assert.equal("secties" in result.payload, false);
    assert.equal(called, false);
    assert.equal(mails.length, 0);
  });

  it("weigert zonder toestemming", async () => {
    const { result } = await vraag({ toestemming: "" });
    assert.equal(result.status, 400);
    assert.match(String(result.payload.error), /toestemming/);
  });

  it("verwerkt geen medische tekst of BSN en echoot die niet", async () => {
    const medisch = await vraag({ beperkingen: "de diagnose is een burn-out" });
    assert.equal(medisch.result.status, 400);
    assert.equal(medisch.mails.length, 0);
    const ruw = JSON.stringify(medisch.result.payload);
    assert.equal(ruw.includes("burn-out"), false);
    assert.match(String(medisch.result.payload.error), /medische gegevens/);

    const bsn = await vraag({ beperkingen: "nummer 123456782 en kan niet tillen" });
    assert.equal(bsn.result.status, 400);
    assert.equal(JSON.stringify(bsn.result.payload).includes("123456782"), false);
  });

  it("toont het advies pas na contact en toestemming", async () => {
    const { result, mails } = await vraag();
    assert.equal(result.status, 200);
    assert.equal(result.payload.secties.length, 7);
    assert.equal(result.payload.disclaimer, DISCLAIMER);
    assert.equal(JSON.stringify(result.payload).includes(SLEUTEL), false);
    assert.equal(JSON.stringify(result.payload).includes("\u2014"), false);
    assert.ok(mails.some((mail) => String(mail.to).includes("casus@example.com")));
    assert.ok(mails.every((mail) => !/onbekend/i.test(String(mail.subject))));
  });

  it("bewaart de lead als de generator uitvalt", async () => {
    const { result, mails } = await vraag({}, {
      fetchImpl: async () => {
        throw new Error("weg");
      },
    });
    assert.equal(result.status, 200);
    assert.equal(result.payload.fallback, true);
    assert.equal(result.payload.secties.length, 7);
    assert.ok(mails.length >= 1);
  });

  it("maakt een pdf zonder sleutel of e-mailadres", async () => {
    const { result } = await vraag();
    const chunks: Buffer[] = [];
    const res = {
      headersSent: false,
      writeHead() { this.headersSent = true; },
      end(body?: Buffer | string) { if (body) chunks.push(Buffer.isBuffer(body) ? body : Buffer.from(body)); },
    };
    await handleAdRoute(
      { method: "POST", url: "/api/ad-advies-pdf", headers: {}, socket: {}, async *[Symbol.asyncIterator]() { yield Buffer.from(JSON.stringify({ id: result.payload.id })); } },
      res,
    );
    const pdf = Buffer.concat(chunks);
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    const tekst = pdf.toString("latin1").replace(/<([0-9A-Fa-f]+)>/g, (_, hex) => Buffer.from(hex, "hex").toString("latin1"));
    assert.match(tekst, /geen medisch advies/);
    assert.match(tekst, /adequaatheid/);
    assert.equal(tekst.includes(SLEUTEL), false);
    assert.equal(tekst.includes("casus@example.com"), false);
  });
});

describe("pagina en verwijzingen", () => {
  it("zet de generator in de pagina, de navigatie, de hero, de footer en de balk", async () => {
    const pagina = await readFile("src/pages/ad-advies-generator.astro", "utf8");
    const header = await readFile("src/components/Header.astro", "utf8");
    const footer = await readFile("src/components/Footer.astro", "utf8");
    const home = await readFile("src/pages/index.astro", "utf8");
    const balk = await readFile("src/components/Engagement.astro", "utf8");
    assert.equal((pagina.match(/<h1\b/g) || []).length, 1);
    assert.match(pagina, /geen medisch advies/);
    assert.match(pagina, /adequaatheid/);
    assert.match(pagina, /Vul geen medische gegevens in/);
    assert.equal(pagina.includes("XAI_API_KEY"), false);
    assert.equal(/poortwachter/i.test(pagina), false);
    for (const bron of [header, footer, home, balk]) {
      assert.match(bron, /Genereer vrijblijvend een AD-advies/);
      assert.match(bron, /\/ad-advies-generator/);
    }
  });
});
