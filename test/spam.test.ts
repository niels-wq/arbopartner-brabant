import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { processSubmission } from "../server/forms.mjs";
import { handleWerken } from "../server/werken.mjs";
import { MAX_AGE_MS, MAX_PER_WINDOW, MIN_MS, resetRateLimit, signStamp, spamSignal } from "../server/spam.mjs";

const now = 1_700_000_000_000;

function lead(age: number, extra: Record<string, string> = {}) {
  return {
    naam: "H. Jansen",
    telefoon: "0612345678",
    medewerkers: "40",
    toestemming: "ja",
    ...signStamp(now - age),
    ...extra,
  };
}

describe("spambescherming", () => {
  it("laat een echte inzending door en gooit honeypot, te snel, te oud en ongeldig stil weg", async () => {
    resetRateLimit();
    const sent: { text?: string }[] = [];
    const sendMail = async (mail: { text?: string }) => {
      sent.push(mail);
    };
    const real = await processSubmission("terugbel", lead(MIN_MS), "203.0.113.10", now, { sendMail });
    assert.equal(real.status, 200);
    assert.equal(real.payload.delivered, true);
    assert.equal(sent.length, 1);
    assert.match(sent[0].text || "", /H\. Jansen/);
    assert.equal((sent[0].text || "").includes("form_sig"), false);

    const honeypot = await processSubmission("terugbel", lead(MIN_MS, { company_website: "https://spam.test" }), "203.0.113.11", now, { sendMail });
    assert.equal(honeypot.status, 200);
    assert.equal(honeypot.payload.ok, true);
    assert.equal(honeypot.payload.delivered, true);
    assert.equal(honeypot.payload.reason, undefined);
    assert.equal(sent.length, 1);
    assert.equal(spamSignal(lead(MIN_MS, { company_website: "x" }), now), "honeypot");

    const fast = await processSubmission("terugbel", lead(MIN_MS - 1), "203.0.113.12", now, { sendMail });
    assert.equal(fast.status, 200);
    assert.equal(fast.payload.delivered, true);
    assert.equal(sent.length, 1);
    assert.equal(spamSignal(lead(MIN_MS - 1), now), "fast");
    assert.equal(spamSignal(lead(MIN_MS), now), null);

    const old = await processSubmission("terugbel", lead(MAX_AGE_MS + 1), "203.0.113.13", now, { sendMail });
    assert.equal(old.payload.delivered, true);
    assert.equal(sent.length, 1);
    assert.equal(spamSignal(lead(MAX_AGE_MS + 1), now), "old");

    const broken = lead(MIN_MS);
    broken.form_sig = "a".repeat(64);
    const invalid = await processSubmission("terugbel", broken, "203.0.113.14", now, { sendMail });
    assert.equal(invalid.status, 200);
    assert.equal(invalid.payload.delivered, true);
    assert.equal(sent.length, 1);
    assert.equal(spamSignal(broken, now), "invalid");

    const missing = await processSubmission("contact", { naam: "H. Jansen", toestemming: "ja", ...signStamp(now - MIN_MS) }, "203.0.113.15", now, { sendMail });
    assert.equal(missing.status, 400);
    assert.equal(sent.length, 1);
  });

  it("stopt de zesde inzending van hetzelfde IP binnen tien minuten", async () => {
    resetRateLimit();
    const sent: unknown[] = [];
    const sendMail = async () => {
      sent.push(1);
    };
    const ip = "198.51.100.40";
    for (let index = 0; index < MAX_PER_WINDOW; index += 1) {
      const result = await processSubmission("spoed", {
        naam: "H. Jansen",
        telefoon: "0612345678",
        organisatie: "Voorbeeld",
        medewerkers: "40",
        wat: "Een dossier loopt vast.",
        toestemming: "ja",
        ...signStamp(now - 10_000),
      }, ip, now + index, { sendMail });
      assert.equal(result.payload.delivered, true, `inzending ${index + 1}`);
    }
    assert.equal(sent.length, MAX_PER_WINDOW);
    const blocked = await processSubmission("spoed", {
      naam: "H. Jansen",
      telefoon: "0612345678",
      organisatie: "Voorbeeld",
      medewerkers: "40",
      wat: "Nog een dossier.",
      toestemming: "ja",
      ...signStamp(now - 10_000),
    }, ip, now + MAX_PER_WINDOW, { sendMail });
    assert.equal(blocked.status, 200);
    assert.equal(blocked.payload.ok, true);
    assert.equal(blocked.payload.delivered, true);
    assert.equal(blocked.payload.errors, undefined);
    assert.equal(sent.length, MAX_PER_WINDOW);

    const other = await processSubmission("terugbel", lead(10_000), "198.51.100.41", now, { sendMail });
    assert.equal(other.payload.delivered, true);
    assert.equal(sent.length, MAX_PER_WINDOW + 1);
  });

  it("gooit een sollicitatie met honeypot weg zonder het bestand te eisen", async () => {
    const boundary = "spamgrens";
    const body = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="company_website"\r\n\r\nhttps://spam.test\r\n` +
        `--${boundary}--\r\n`,
    );
    const result = await handleWerken({
      headers: { "content-type": `multipart/form-data; boundary=${boundary}` },
      async *[Symbol.asyncIterator]() {
        yield body;
      },
      resume() {},
    }, "203.0.113.80");
    assert.equal(result.status, 200);
    assert.equal(result.payload.delivered, true);
    assert.equal(result.payload.ok, true);
  });

  it("zet het honeypotveld en het stempel op elk formulier dat de server bereikt", () => {
    const files = [
      "src/pages/contact.astro",
      "src/pages/offerte.astro",
      "src/pages/spoedhulp.astro",
      "src/pages/adviesgesprek.astro",
      "src/pages/checklist-verzuim.astro",
      "src/pages/loonsanctie-risicoscan.astro",
      "src/pages/verzuim-tijdlijn.astro",
      "src/pages/werken-bij.astro",
      "src/components/InlineLead.astro",
      "src/components/CallbackForm.astro",
      "src/components/Engagement.astro",
      "src/scripts/report.ts",
      "src/scripts/forms.ts",
      "src/scripts/engage.ts",
      "src/scripts/werken.ts",
    ];
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      if (file.endsWith(".astro") || file.endsWith("report.ts")) {
        assert.match(source, /name="company_website"/, file);
        assert.match(source, /aria-hidden="true"/, file);
        assert.match(source, /tabindex="-1"/, file);
        assert.match(source, /autocomplete="off"/, file);
      }
      if (file.endsWith("forms.ts") || file.endsWith("engage.ts") || file.endsWith("werken.ts")) {
        assert.match(source, /prepareSubmission/, file);
        assert.match(source, /armForm/, file);
      }
    }
    assert.match(readFileSync("server/forms.mjs", "utf8"), /\/api\/form-token/);
    assert.equal(readFileSync("server/forms.mjs", "utf8").includes("status: 429"), false);
  });
});
