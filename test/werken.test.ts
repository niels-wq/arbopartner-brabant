import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import werken from "../server/werken.json" with { type: "json" };
import {
  AIRTABLE_CV_LIMIT,
  CANDIDATE_EMAIL,
  assessWerken,
  handleWerken,
  isDocx,
  isPdf,
  parseMultipart,
  resetUploads,
  toAirtableFields,
  uploadLimited,
} from "../server/werken.mjs";

const root = path.resolve(".");

function fields(extra: Record<string, unknown> = {}) {
  return {
    traject: "dienst",
    naam: "A. Kandidaat",
    email: "a@example.com",
    telefoon: "0612345678",
    woonplaats: "Uden",
    motivatie: "Ik wil casemanager worden omdat de dossiers in Brabant mij liggen.",
    ervaring_jaren: "8",
    opleiding: "HBO HRM",
    beschikbaarheid_uren: "24",
    registraties: ["RCM"],
    regios: ["Uden"],
    vog: "Ja",
    verzekering: "Nee",
    specialisaties: ["MKB"],
    toestemming: "ja",
    ...extra,
  };
}

function pdf() {
  return { filename: "cv.pdf", mime: "application/pdf", buffer: Buffer.from("%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF") };
}

function request(buffer: Buffer, type: string) {
  return {
    headers: { "content-type": type },
    async *[Symbol.asyncIterator]() {
      yield buffer;
    },
    resume() {},
  };
}

describe("werken bij", () => {
  it("bewaart een sollicitatie zonder zzp-velden en zonder salaris", () => {
    const { errors, application } = assessWerken(fields(), pdf());
    assert.deepEqual(errors, []);
    const record = toAirtableFields(application);
    assert.equal(record.Traject, "In dienst");
    assert.equal(record.KvK, undefined);
    assert.equal(record.Uurtarief, undefined);
    assert.equal(record.Toestemming, true);
    assert.equal(record.Bron, "https://www.arbopartnerbrabant.nl/werken-bij");
    assert.ok(werken.specialisaties.includes("Psychisch en burn-out"));
    assert.equal(JSON.stringify(record).includes("baseSalary"), false);
  });

  it("eist kvk en uurtarief bij zzp en weigert een nep-cv", () => {
    const missing = assessWerken(fields({ traject: "zzp" }), pdf());
    assert.ok(missing.errors.some((error) => error.includes("KvK")));
    const ok = assessWerken(fields({ traject: "zzp", kvk: "85849618", uurtarief: "95" }), pdf());
    assert.deepEqual(ok.errors, []);
    assert.equal(toAirtableFields(ok.application).KvK, "85849618");
    const fake = assessWerken(fields(), { filename: "cv.pdf", buffer: Buffer.from("geen pdf") });
    assert.ok(fake.errors.some((error) => error.includes("pdf")));
    assert.equal(isPdf(Buffer.from("%PDF-1.4")), true);
    assert.equal(isDocx(Buffer.from("PK\u0003\u0004word/document.xml")), true);
  });

  it("leest multipart en valt zonder env-vars terug op niet opgeslagen", async () => {
    const boundary = "----ap";
    const body = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="traject"\r\n\r\ndienst\r\n` +
        `--${boundary}\r\nContent-Disposition: form-data; name="naam"\r\n\r\nA. Kandidaat\r\n` +
        `--${boundary}\r\nContent-Disposition: form-data; name="cv"; filename="cv.pdf"\r\nContent-Type: application/pdf\r\n\r\n%PDF-1.4 demo\r\n` +
        `--${boundary}--\r\n`,
    );
    const parsed = parseMultipart(body, `multipart/form-data; boundary=${boundary}`);
    assert.equal(parsed.fields.naam, "A. Kandidaat");
    assert.equal(isPdf(parsed.file.buffer), true);
    delete process.env.AIRTABLE_TOKEN;
    delete process.env.AIRTABLE_BASE_ID;
    delete process.env.AIRTABLE_TABLE;
    delete process.env.SMTP_HOST;
    resetUploads();
    const full = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="traject"\r\n\r\ndienst\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="naam"\r\n\r\nA. Kandidaat\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="email"\r\n\r\na@example.com\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="telefoon"\r\n\r\n0612345678\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="woonplaats"\r\n\r\nUden\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="motivatie"\r\n\r\nIk wil casemanager worden omdat de dossiers in Brabant mij liggen.\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="ervaring_jaren"\r\n\r\n8\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="opleiding"\r\n\r\nHBO HRM\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="beschikbaarheid_uren"\r\n\r\n24\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="registraties"\r\n\r\nRCM\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="regios"\r\n\r\nUden\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="vog"\r\n\r\nJa\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="verzekering"\r\n\r\nNee\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="specialisaties"\r\n\r\nMKB\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="toestemming"\r\n\r\nja\r\n` +
          `--${boundary}\r\nContent-Disposition: form-data; name="cv"; filename="cv.pdf"\r\nContent-Type: application/pdf\r\n\r\n%PDF-1.4 demo\r\n` +
          `--${boundary}--\r\n`,
      ),
    ]);
    const result = await handleWerken(request(full, `multipart/form-data; boundary=${boundary}`), "203.0.113.5");
    assert.equal(result.status, 200);
    assert.equal(result.payload.delivered, false);
    assert.equal(result.payload.via, "geen");
    assert.equal(CANDIDATE_EMAIL, "info@matchvermogen.nl");
    assert.equal(AIRTABLE_CV_LIMIT, 5 * 1024 * 1024);
  });

  it("beperkt het aantal uploads", () => {
    resetUploads();
    const now = 1_000_000;
    assert.equal(uploadLimited("198.51.100.4", now), false);
    assert.equal(uploadLimited("198.51.100.4", now + 1), false);
    assert.equal(uploadLimited("198.51.100.4", now + 2), false);
    assert.equal(uploadLimited("198.51.100.4", now + 3), false);
    assert.equal(uploadLimited("198.51.100.4", now + 4), true);
  });

  it("staat in het menu, de footer en het vacatureschema, zonder salaris", async () => {
    const header = await readFile(path.join(root, "src/components/Header.astro"), "utf8");
    const footer = await readFile(path.join(root, "src/components/Footer.astro"), "utf8");
    const schema = await readFile(path.join(root, "src/lib/schema.ts"), "utf8");
    const page = await readFile(path.join(root, "src/pages/werken-bij.astro"), "utf8");
    assert.match(header, /\/werken-bij/);
    assert.match(footer, /\/werken-bij/);
    assert.match(page, /jobPostingLd/);
    assert.match(schema, /"@type": "JobPosting"/);
    assert.equal(schema.includes("baseSalary"), false);
    assert.equal(page.includes("poortwachter"), false);
    assert.match(page, /value="zzp"/);
    assert.match(page, /value="dienst"/);
  });
});
