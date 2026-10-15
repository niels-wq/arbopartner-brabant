import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { arbodienstUurtarieven } from "../src/data/arbodienst-tarieven.ts";
import { compareEmployment, costPerNeededHour, defaultCompareInput } from "../src/lib/calc.ts";
import { levels } from "../src/lib/rates.ts";

test("tarievenpagina toont alleen uurtarieven en bronnen", () => {
  const page = readFileSync("src/pages/tarieven.astro", "utf8");
  assert.equal(page.includes("PackageGrid"), false);
  assert.equal(page.includes("CostTeaser"), false);
  assert.equal(page.includes("per maand"), false);
  assert.equal(page.includes("per jaar"), false);
  assert.match(page, /24\+ uur/);
  assert.match(page, /costPerNeededHour/);
  assert.match(page, /arbodienstUurtarieven/);
  assert.match(page, /\/casemanager-inhuren-of-in-dienst#vergelijking/);
  assert.equal(/poortwachter/i.test(page), false);
  assert.equal(arbodienstUurtarieven.length, 4);
  for (const row of arbodienstUurtarieven) {
    assert.match(row.url, /^https:\/\//);
    assert.ok(row.rate >= 100 && row.rate < 200, row.name);
    assert.equal(/poortwachter/i.test(`${row.role} ${row.note}`), false);
  }
  assert.equal(arbodienstUurtarieven[0]?.rate, 133);
  assert.equal(arbodienstUurtarieven[1]?.rate, 145);
  assert.equal(arbodienstUurtarieven[2]?.rate, 159.9);
  assert.equal(arbodienstUurtarieven[3]?.rate, 135);
});

test("koffiefoto blijft klein en contact toont één portret", () => {
  const home = readFileSync("src/pages/index.astro", "utf8");
  const photo = readFileSync("src/components/NielsPhoto.astro", "utf8");
  const engage = readFileSync("src/components/Engagement.astro", "utf8");
  assert.equal(home.includes("aspect-[4/5]"), false);
  assert.match(home, /h-24/);
  assert.match(photo, /niels-koffie-400\.webp/);
  assert.equal(photo.includes("1200"), false);
  assert.match(engage, /<summary>Contact<\/summary>/);
  assert.equal((engage.match(/<img /g) ?? []).length, 1);
  assert.ok(existsSync("public/mensen/niels-koffie-240.webp"));
  assert.ok(existsSync("public/mensen/niels-koffie-400.webp"));
  assert.ok(existsSync("public/mensen/niels-koffie-400.avif"));
});

test("logo is een woordmerk zonder het oude beeld", () => {
  const svg = readFileSync("public/logo.svg", "utf8");
  const light = readFileSync("public/logo-light.svg", "utf8");
  assert.match(svg, /Arbopartner Brabant/);
  assert.equal(svg.includes("M15 33c1-14"), false);
  assert.equal(light.includes("M15 33c1-14"), false);
  for (const file of [
    "public/logo.png",
    "public/logo-light.png",
    "public/favicon.svg",
    "public/favicon.ico",
    "public/apple-touch-icon.png",
    "public/og.png",
  ]) {
    assert.ok(existsSync(file), file);
  }
});

test("uurvergelijking blijft eerlijk, ook als een volle week in dienst lager is", () => {
  const result = compareEmployment(defaultCompareInput());
  const perHour = costPerNeededHour(result);
  assert.equal(result.detachedHourly, levels.medior.rates[10]);
  assert.equal(result.neededHours, 10);
  assert.ok(perHour > result.detachedHourly);
  const senior = compareEmployment(defaultCompareInput({ level: "senior", neededHours: 24 }));
  assert.equal(senior.detachedHourly, levels.senior.rates[24]);
  assert.ok(senior.saving < 0);
});
