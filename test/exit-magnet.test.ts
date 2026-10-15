import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { absenceCost, dayCost } from "../src/lib/calc.ts";
import { exitAbMode, exitMagnets, exitVoorbeeld, pickExitVariant } from "../src/lib/exit-magnet.ts";
import { processSubmission, validate, visitorLetter } from "../server/forms.mjs";

test("de kosten-check is de live variant en de andere kop staat klaar", () => {
  assert.equal(exitAbMode, "kosten");
  assert.match(exitMagnets.kosten.title, /Wat kost uw verzuim u écht/);
  assert.match(exitMagnets.kosten.lede, /Brabantse werkgevers/);
  assert.match(exitMagnets.fouten.title, /7 fouten/);
  assert.match(exitMagnets.fouten.title, /loonsanctie/);
  assert.equal(pickExitVariant({ mode: "kosten", query: null, stored: null, random: 0.9 }), "kosten");
  assert.equal(pickExitVariant({ mode: "split", query: null, stored: null, random: 0.9 }), "fouten");
  assert.equal(pickExitVariant({ mode: "split", query: "kosten", stored: "fouten", random: 0.9 }), "kosten");
  assert.equal(pickExitVariant({ mode: "kosten", query: null, stored: "fouten", random: 0.1 }), "fouten");
});

test("de check rekent het voorbeeld met TNO en CBS, zonder een Brabants gemiddelde", () => {
  const body = exitMagnets.kosten.body;
  assert.match(body, /TNO, Verzuimkosten \(2026\)/);
  assert.match(body, /80072ned/);
  assert.match(body, /Brabants gemiddelde/);
  assert.match(body, /EUR 995/);
  assert.equal(/poortwachter/i.test(body), false);
  assert.equal(exitVoorbeeld.dag, dayCost(exitVoorbeeld.loon));
  assert.equal(
    exitVoorbeeld.jaar,
    absenceCost(exitVoorbeeld.medewerkers, exitVoorbeeld.pct, exitVoorbeeld.loon),
  );
  assert.match(body, /211\.711,50/);
  assert.ok(`${exitMagnets.kosten.title}\n\n${body}`.split("\n").length <= 54);
  assert.ok(`${exitMagnets.fouten.title}\n\n${exitMagnets.fouten.body}`.split("\n").length <= 54);
  assert.equal(/poortwachter/i.test(exitMagnets.fouten.body), false);
  assert.match(exitMagnets.fouten.body, /85 procent/);
  assert.match(exitMagnets.fouten.body, /52 weken/);
});

test("de popup vraagt één e-mailveld en stuurt de tekst via de lead-flow", async () => {
  const page = readFileSync("src/components/Engagement.astro", "utf8");
  const script = readFileSync("src/scripts/engage.ts", "utf8");
  assert.match(page, /Nee, dank u/);
  assert.match(page, /name="email"[^>]*required/);
  const medewerkers = page.match(/<input name="medewerkers"[^>]*>/)?.[0] ?? "";
  assert.match(medewerkers, /type="number"/);
  assert.equal(medewerkers.includes("required"), false);
  assert.match(page, /ap-exit-photo/);
  assert.match(script, /ap_exit_v2/);
  assert.match(script, /exit_intent_view/);
  assert.match(script, /exit_intent_decline/);
  assert.match(script, /generate_lead/);
  assert.match(script, /\/api\/magnet/);

  const missing = validate("magnet", { toestemming: "ja", checklist: "tekst" });
  assert.ok(missing.some((item: string) => item.includes("email")));
  const ok = validate("magnet", {
    toestemming: "ja",
    email: "hr@voorbeeld.nl",
    checklist: exitMagnets.kosten.body,
    medewerkers: "",
  });
  assert.deepEqual(ok, []);
  assert.equal(visitorLetter("magnet", { variant: "kosten" }).subject, "Uw verzuimkosten-check");
  assert.equal(visitorLetter("magnet", { variant: "fouten" }).subject, "Uw checklist bij een loonsanctie");

  const sent = await processSubmission(
    "magnet",
    { toestemming: "ja", email: "hr@voorbeeld.nl", checklist: exitMagnets.kosten.body, variant: "kosten" },
    "127.0.0.1",
  );
  assert.equal(sent.payload.ok, true);
  assert.equal(sent.payload.delivered, false);
});
