import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { arbodienstFaq, arbodienstGevallen, arbodienstPath, arbodienstRows } from "../src/data/arbodienst.ts";

test("de pagina onderscheidt een arbodienst zonder het woord uit de artikelen en zonder garantie", () => {
  const page = readFileSync("src/pages/arbodienst-of-arbopartner.astro", "utf8");
  const home = readFileSync("src/pages/index.astro", "utf8");
  const blok = readFileSync("src/components/AndersDanArbodienst.astro", "utf8");
  const header = readFileSync("src/components/Header.astro", "utf8");
  const footer = readFileSync("src/components/Footer.astro", "utf8");
  const diensten = readFileSync("src/pages/diensten/index.astro", "utf8");
  const situaties = readFileSync("src/pages/situaties.astro", "utf8");
  const data = readFileSync("src/data/arbodienst.ts", "utf8");
  assert.equal(/poortwachter/i.test(page + data), false);
  assert.match(page, /faqLd/);
  assert.match(page, /Plan een gratis kennismaking/);
  assert.match(page, /call-15-min|CalendlyButton/);
  assert.match(page, /35 tot 500/);
  assert.equal(arbodienstGevallen.length >= 5 && arbodienstGevallen.length <= 6, true);
  assert.equal(arbodienstRows.length >= 4, true);
  assert.match(data, /enkel met senior casemanagers/i);
  assert.match(data, /Weinig tot geen overhead/);
  assert.match(data, /Arbeidsdeskundige expertise in huis/);
  assert.match(data, /bezwaar en beroep/);
  assert.match(data, /12 jaar WGA/);
  assert.match(data, /Ziektewet/);
  assert.match(data, /tien jaar ervaring/i);
  assert.match(data, /ongeveer 95 procent/);
  assert.match(data, /geen onderzoek/);
  assert.equal(/garanderen niet|beloven we niet|beloven geen|UWV beoordeelt/.test(data), true);
  assert.equal(arbodienstFaq.length >= 4, true);
  assert.match(home, /AndersDanArbodienst/);
  assert.match(blok, /arbodienstPath/);
  for (const file of [header, footer, diensten, situaties]) {
    assert.match(file, new RegExp(arbodienstPath.replaceAll("/", "\\/")));
  }
});
