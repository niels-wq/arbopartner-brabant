import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("beweging blijft uit bij reduced motion en de tijdlijn groeit", () => {
  const motion = readFileSync("src/scripts/motion.ts", "utf8");
  const css = readFileSync("src/styles/global.css", "utf8");
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /data-count/);
  assert.match(css, /@keyframes ap-rise/);
  assert.match(css, /@keyframes ap-grow/);
  assert.match(css, /animation-timeline: view\(\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(readFileSync("src/components/VerzuimTijdlijn.astro", "utf8"), /ap-timeline/);
  assert.match(readFileSync("src/pages/tools/tijdlijn-ziekteverzuim.astro", "utf8"), /ap-timeline-item/);
});

test("de afsluiting heeft één knop, een risicozin en een echt citaat", () => {
  const band = readFileSync("src/components/CtaBand.astro", "utf8");
  assert.match(band, /Melisia Telepary/);
  assert.match(band, /verplicht u tot niets/);
  assert.equal((band.match(/<a /g) ?? []).length, 2);
  assert.match(band, /class="btn"/);
  assert.equal(/poortwachter/i.test(band), false);
});
