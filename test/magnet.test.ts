import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { checklistText } from "../src/lib/checklist.ts";
import { validate } from "../server/forms.mjs";

test("exit-magnet vraagt alleen e-mail en de verzuim-checklist", () => {
  const ok = validate("magnet", {
    email: "hr@voorbeeld.nl",
    toestemming: "ja",
    checklist: checklistText,
  });
  assert.deepEqual(ok, []);
  const missing = validate("magnet", { email: "hr@voorbeeld.nl", toestemming: "ja", checklist: "" });
  assert.ok(missing.some((error) => error.includes("checklist")));
  const bad = validate("magnet", { email: "geen-adres", toestemming: "ja", checklist: checklistText });
  assert.ok(bad.some((error) => error.includes("e-mail")));
  const page = readFileSync("src/components/Engagement.astro", "utf8");
  const script = readFileSync("src/scripts/engage.ts", "utf8");
  assert.match(script, /\/api\/magnet/);
  assert.match(script, /ap_exit_v2/);
  assert.equal(/poortwachter/i.test(`${page}\n${script}\n${checklistText}`), false);
});
