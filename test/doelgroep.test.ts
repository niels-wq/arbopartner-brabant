import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { situaties } from "../src/data/situaties.ts";
import { site } from "../src/data/site.ts";
import { headcountDefault } from "../src/lib/calc.ts";

const phrase = "voor organisaties met 35–500 medewerkers";

test("doelgroep 35–500 staat in copy en schema", () => {
  assert.equal(site.audience, phrase);
  assert.equal(site.minEmployees, 35);
  assert.equal(site.maxEmployees, 500);
  assert.match(site.description, /35–500 medewerkers/);
  const home = readFileSync("src/pages/index.astro", "utf8");
  assert.match(home, /Voor organisaties met 35–500 medewerkers/);
  const schema = readFileSync("src/lib/schema.ts", "utf8");
  assert.match(schema, /minValue: site\.minEmployees/);
  assert.match(schema, /maxValue: site\.maxEmployees/);
  assert.match(schema, /BusinessAudience/);
  assert.equal(headcountDefault("35-75"), 50);
  assert.equal(headcountDefault("76-200"), 120);
  assert.equal(headcountDefault("201-500"), 350);
  const offerte = readFileSync("src/pages/offerte.astro", "utf8");
  assert.match(offerte, /name="medewerkers"/);
  assert.match(offerte, /max="500"/);
  assert.match(offerte, /min="35"/);
  const savings = readFileSync("src/components/calculators/SavingsCalc.astro", "utf8");
  assert.match(savings, /max="500"/);
  assert.match(savings, /value="80"/);
  const match = readFileSync("src/components/calculators/MatchCalc.astro", "utf8");
  assert.match(match, /value="201-500"/);
  assert.match(match, /value="50"/);
  assert.equal(match.includes("200+"), false);
});

test("situaties zijn herkenbaar en zonder verzonnen namen", () => {
  const titles = situaties.map((item) => item.title);
  assert.ok(titles.includes("We krijgen geen casemanager gevonden of aangenomen"));
  assert.ok(titles.includes("Iemand speciaal hiervoor aannemen is lastig of te duur"));
  assert.ok(titles.includes("We hebben geen zin of tijd om iemand op dit vlak aan te sturen"));
  assert.ok(titles.includes("Continuïteit in de begeleiding lukt niet"));
  assert.ok(titles.some((title) => /langdurig verzuim/i.test(title)));
  assert.ok(titles.some((title) => /loonsanctie/i.test(title)));
  const verslag = situaties.find((item) => item.slug === "onduidelijk-verslag");
  assert.ok(verslag);
  assert.match(verslag.probleem, /verslagen van de bedrijfsarts zijn onduidelijk/);
  assert.match(verslag.oplossing, /geen medische details/);
  assert.match(verslag.resultaat, /geen medische details/);
  assert.match(verslag.resultaat, /kleiner risico op een loonsanctie/);
  assert.ok(verslag.stappen?.some((stap) => /Poortwachterdossier/.test(stap)));
  assert.equal(verslag.hrefLabel, "Bespreek dit verslag");
  const blob = situaties.map((item) => `${item.title} ${item.probleem} ${item.oplossing} ${(item.stappen ?? []).join(" ")} ${item.resultaat}`).join("\n");
  assert.equal(/\b(Jan|Piet|Klaas|Sander|Ingrid)\b/.test(blob), false);
  assert.equal((blob.match(/poortwachter/gi) ?? []).length, 1);
  for (const item of situaties) {
    assert.ok(item.probleem.length > 40, item.slug);
    assert.ok(item.oplossing.length > 40, item.slug);
    assert.ok(item.resultaat.length > 40, item.slug);
  }
  assert.match(readFileSync("src/pages/situaties.astro", "utf8"), /Herkent u dit/);
  assert.match(readFileSync("src/pages/index.astro", "utf8"), /Situaties/);
});

test("nieuwe diensten komen van een zustermerk en PMO niet", () => {
  const source = readFileSync("src/data/services.ts", "utf8");
  const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  for (const slug of ["eerste-spoor", "leidinggevenden-training", "jobcoaching", "mediation", "wia-begeleiding"]) {
    assert.ok(slugs.includes(slug), slug);
    assert.match(source, new RegExp(`slug: "${slug}"`));
  }
  assert.equal(slugs.includes("pmo"), false);
  assert.equal(source.includes("preventief-medisch-onderzoek"), false);
  assert.match(source, /Wet verbetering poortwachter/);
  assert.equal(/poortwachter/i.test(source.replaceAll("Wet verbetering poortwachter", "")), false);
  assert.match(source, /https:\/\/matchvermogen\.nl\/jobcoaching\//);
  assert.match(source, /https:\/\/matchvermogen\.nl\/arbeidsdeskundige-mediator\//);
  assert.match(source, /https:\/\/werkhervattingskas\.nl/);
  assert.equal(source.includes("€250"), false);
  assert.equal(source.includes("20%"), false);
  assert.match(readFileSync("src/styles/global.css", "utf8"), /prefers-reduced-motion: reduce/);
  assert.match(readFileSync("src/scripts/motion.ts", "utf8"), /prefers-reduced-motion: reduce/);
});
