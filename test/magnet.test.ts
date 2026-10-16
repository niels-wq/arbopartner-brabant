import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { checklistText } from "../src/lib/checklist.ts";
import { validate } from "../server/forms.mjs";

const base = { naam: "H. Jansen", email: "hr@voorbeeld.nl", toestemming: "ja" };

test("exit-magnet vraagt naam en e-mail en een keuze", () => {
  const checklist = validate("magnet", { ...base, keuze: "checklist", checklist: checklistText });
  assert.deepEqual(checklist, []);
  const missingName = validate("magnet", { email: base.email, toestemming: "ja", keuze: "checklist", checklist: checklistText });
  assert.ok(missingName.some((error) => error.includes("naam")));
  const missingList = validate("magnet", { ...base, keuze: "checklist", checklist: "" });
  assert.ok(missingList.some((error) => error.includes("checklist")));
  const bad = validate("magnet", { ...base, email: "geen-adres", keuze: "checklist", checklist: checklistText });
  assert.ok(bad.some((error) => error.includes("e-mail")));
  const callback = validate("magnet", { ...base, keuze: "terugbel", telefoon: "0612345678", wanneer: "Ochtend" });
  assert.deepEqual(callback, []);
  const callbackWithoutPhone = validate("magnet", { ...base, keuze: "terugbel" });
  assert.ok(callbackWithoutPhone.some((error) => error.includes("telefoon")));
  const meeting = validate("magnet", { ...base, keuze: "gesprek", organisatie: "Voorbeeld B.V." });
  assert.deepEqual(meeting, []);
  const saving = validate("magnet", { ...base, keuze: "besparing" });
  assert.deepEqual(saving, []);
  const unknown = validate("magnet", { ...base, keuze: "iets-anders" });
  assert.ok(unknown.some((error) => error.includes("Kies")));

  const page = readFileSync("src/components/Engagement.astro", "utf8");
  const script = readFileSync("src/scripts/engage.ts", "utf8");
  assert.match(script, /\/api\/magnet/);
  assert.match(script, /ap_exit_v3/);
  assert.match(script, /exit_intent_choice/);
  assert.match(page, /voor een snelle terugbelafspraak/);
  assert.match(page, /name="naam"/);
  assert.match(page, /name="telefoon"/);
  assert.match(page, /name="organisatie"/);
  assert.match(page, /Stuur mij de gratis verzuimchecklist/);
  assert.match(page, /Bel mij terug/);
  assert.match(page, /Plan direct een gesprek/);
  assert.match(page, /Bereken mijn besparing/);
  assert.match(page, /niels-koffie/);
  assert.equal(/poortwachter/i.test(`${page}\n${script}\n${checklistText}`), false);
});
