import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { calendlyEventFromMessage, calendlyKennismaking } from "../src/data/calendly.ts";

const root = path.resolve("src");

async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else out.push(full);
  }
  return out;
}

describe("calendly", () => {
  it("gebruikt alleen de belafspraak die in de bron van arbeidsdeskundig.com staat", async () => {
    assert.equal(calendlyKennismaking.url, "https://calendly.com/matchvermogen/call-15-min");
    assert.equal(calendlyKennismaking.minutes, 15);
    assert.equal(calendlyKennismaking.label, "Plan direct een gesprek");
    const all = await files(root);
    const urls = new Set<string>();
    for (const file of all) {
      const text = await readFile(file, "utf8");
      for (const match of text.matchAll(/https:\/\/calendly\.com\/[^\s"'`]+/g)) urls.add(match[0]);
    }
    assert.deepEqual([...urls], ["https://calendly.com/matchvermogen/call-15-min"]);
  });

  it("zet de placeholder niet meer op de afspraakpagina", async () => {
    const page = await readFile(path.join(root, "pages/adviesgesprek.astro"), "utf8");
    const contact = await readFile(path.join(root, "pages/contact.astro"), "utf8");
    assert.equal(page.includes("PLACEHOLDER"), false);
    assert.match(page, /CalendlyEmbed/);
    assert.match(contact, /CalendlyEmbed/);
  });

  it("stuurt calendly.event_scheduled zonder genodigde", () => {
    const uri = "https://calendly.com/api/v2/scheduled_events/abc";
    const hit = calendlyEventFromMessage("https://calendly.com", {
      event: "calendly.event_scheduled",
      payload: {
        event: { uri },
        invitee: { uri: "https://calendly.com/api/v2/invitees/geheim" },
      },
    });
    assert.deepEqual(hit, { event: "calendly.event_scheduled", calendly_event: uri });
    assert.equal(JSON.stringify(hit).includes("invitee"), false);
    assert.equal(JSON.stringify(hit).includes("geheim"), false);
    assert.equal(calendlyEventFromMessage("https://evil.example", { event: "calendly.event_scheduled" }), null);
    assert.equal(calendlyEventFromMessage("https://calendly.com", { event: "calendly.profile_page_viewed" }), null);
  });
});
