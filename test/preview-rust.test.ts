import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { arbodienstUurtarieven } from "../src/data/arbodienst-tarieven.ts";
import { compareEmployment, costPerNeededHour, costPerProductiveHour, defaultCompareInput } from "../src/lib/calc.ts";
import { levels } from "../src/lib/rates.ts";

test("tarievenpagina toont alleen de tabel, de vergelijking, drie vragen en één afsluitende CTA", () => {
  const page = readFileSync("src/pages/tarieven.astro", "utf8");
  assert.equal(page.includes("PackageGrid"), false);
  assert.equal(page.includes("CostTeaser"), false);
  assert.equal(page.includes("CallbackForm"), false);
  assert.equal(page.includes("ClusterNav"), false);
  assert.equal(page.includes("Figure"), false);
  assert.equal(page.includes("arbodienst"), false);
  assert.equal(page.includes("per maand"), false);
  assert.equal(page.includes("per jaar"), false);
  assert.match(page, /24\+ uur/);
  assert.match(page, /costPerNeededHour/);
  assert.match(page, /costPerProductiveHour/);
  assert.match(page, /Wat kost een casemanager in dienst écht per productief uur/);
  assert.match(page, /Bereken het voor uw organisatie/);
  assert.match(page, /In dienst, per productief uur/);
  assert.match(page, /Zzp-casemanager/);
  assert.match(page, /U bespaart circa/);
  assert.match(page, /korting op spoor 2/);
  assert.match(readFileSync("src/components/HireBenefits.astro", "utf8"), /Tot 10% korting op spoor 2 en tot 8% op arbeidsdeskundig onderzoek/);
  assert.match(readFileSync("src/components/Guarantees.astro", "utf8"), /responsePromise/);
  assert.match(readFileSync("src/data/site.ts", "utf8"), /Reactie en offerte binnen 24 uur/);
  assert.match(page, /\/casemanager-inhuren-of-in-dienst#vergelijking/);
  assert.equal((page.match(/<h2 /g) ?? []).length, 2);
  assert.equal((page.match(/q: /g) ?? []).length, 3);
  assert.match(page, /proof=\{false\}/);
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
  assert.match(home, /site\.founder\.avatar/);
  assert.match(home, /rounded-full/);
  assert.match(readFileSync("src/data/site.ts", "utf8"), /niels-alderding-avatar/);
  assert.match(readFileSync("src/components/Header.astro", "utf8"), /logo-light\.png/);
  assert.match(photo, /niels-koffie-400\.webp/);
  assert.equal(photo.includes("1200"), false);
  assert.match(engage, /<summary>Contact<\/summary>/);
  assert.match(engage, /Bereken uw besparing/);
  assert.match(engage, /\/casemanager-inhuren-of-in-dienst#vergelijking/);
  assert.match(engage, /fab-whatsapp/);
  assert.match(engage, /fab-bel/);
  assert.match(engage, /fab-mail/);
  assert.match(engage, /fab-calendly/);
  assert.match(readFileSync("src/styles/global.css", "utf8"), /\.ap-contact:not\(\[open\]\) > \.ap-contact-menu/);
  assert.equal((engage.match(/<img /g) ?? []).length, 2);
  assert.match(engage, /ap-exit-photo/);
  assert.match(engage, /niels-koffie/);
  assert.match(engage, /niels-face/);
  assert.match(engage, /data-magnet/);
  assert.match(engage, /verzuim-checklist/);
  assert.match(engage, /voor een snelle terugbelafspraak/);
  assert.match(engage, /Stuur mij de gratis verzuimchecklist/);
  assert.match(engage, /Bel mij terug/);
  assert.match(engage, /Plan direct een gesprek/);
  assert.match(engage, /Bereken mijn besparing/);
  assert.equal(engage.includes("Gratis verzuimscan"), false);
  assert.equal(/poortwachter/i.test(engage), false);
  assert.ok(existsSync("public/mensen/niels-koffie-240.webp"));
  assert.ok(existsSync("public/mensen/niels-koffie-400.webp"));
  assert.ok(existsSync("public/mensen/niels-koffie-400.avif"));
});

test("logo is een woordmerk zonder het oude beeld", () => {
  const svg = readFileSync("public/logo.svg", "utf8");
  const light = readFileSync("public/logo-light.svg", "utf8");
  const fav = readFileSync("public/favicon.svg", "utf8");
  for (const file of [svg, light]) {
    assert.match(file, /Arbopartner Brabant/);
    assert.match(file, /viewBox="0 0 [\d.]+ 64"/);
    assert.equal(file.includes("M15 33c1-14"), false);
    assert.equal(file.includes("1490"), false);
    const paths = [...file.matchAll(/d="([^"]+)"/g)].map((match) => match[1]);
    assert.ok(new Set(paths).size >= 8, "woordmerk moet verschillende letters bevatten");
  }
  assert.match(fav, /Arbopartner Brabant/);
  assert.equal(fav.includes("M32 15"), false);
  assert.equal(fav.includes("M15 33c1-14"), false);
  assert.match(readFileSync("src/components/Header.astro", "utf8"), /logo-light\.png\?v=20261016b/);
  assert.match(readFileSync("public/favicon.svg", "utf8"), /M11 7\.5 V20/);
  assert.match(readFileSync("src/components/Footer.astro", "utf8"), /width="223" height="64"/);
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
  const perNeeded = costPerNeededHour(result);
  const perProductive = costPerProductiveHour(result);
  assert.equal(result.detachedHourly, levels.medior.rates[10]);
  assert.equal(result.neededHours, 10);
  assert.ok(perNeeded > result.detachedHourly);
  assert.ok(perProductive < result.detachedHourly);
  assert.ok(perProductive > 50);
  const senior = compareEmployment(
    defaultCompareInput({
      level: "senior",
      neededHours: 24,
      sanctionChance: 0,
      overnameWeeks: 0,
      continuiteitDaysPerGapWeek: 0,
      loonwaardeExtraDays: 0,
      loonwaardeSanctionExtra: 0,
    }),
  );
  assert.equal(senior.detachedHourly, levels.senior.rates[24]);
  assert.ok(senior.saving < 0);
});
