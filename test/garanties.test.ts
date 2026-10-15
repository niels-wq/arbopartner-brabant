import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function read(rel: string) {
  return readFileSync(path.join(root, rel), "utf8");
}

function walk(dir: string, acc: string[] = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name === ".git") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(astro|ts|mjs|js|txt|md)$/.test(name)) acc.push(full);
  }
  return acc;
}

test("garanties staan op homepage, pakketten en vergelijking", () => {
  for (const file of ["src/pages/index.astro", "src/pages/pakketten/index.astro", "src/pages/pakketten/[slug].astro", "src/pages/casemanager-inhuren-of-in-dienst.astro"]) {
    assert.match(read(file), /Guarantees/);
  }
  const block = read("src/components/Guarantees.astro");
  assert.match(block, /Onze garanties/);
  assert.match(block, /Gratis verzuimanalyse/);
  assert.match(block, /Vraag uw persoonlijke kostenvergelijking aan/);
  assert.match(block, /kosteloos bij/);
  assert.doesNotMatch(block, /geld terug|money back|€\s*\d+/i);
});

test("kwaliteitsvoorwaarden hebben een juridische TODO", () => {
  const source = read("src/data/garanties.ts");
  assert.match(source, /TODO\(juridisch\): voorwaarden van de kwaliteitsgarantie laten toetsen door een Wtta\/DBA-advocaat\. ja\/nee 322/);
  assert.match(source, /geen geld-terug-bedrag/);
  assert.match(source, /kosteloos bij/);
});

test("de vergelijking blijft eerlijk rekenen", () => {
  const view = read("src/lib/compare-view.ts");
  assert.match(view, /In dit scenario is een dienstverband circa/);
  const page = read("src/pages/casemanager-inhuren-of-in-dienst.astro");
  assert.match(page, /title=\{compareLeadTitle\}/);
  assert.match(page, /submit=\{compareLeadTitle\}/);
  assert.match(read("src/data/garanties.ts"), /Vraag uw persoonlijke kostenvergelijking aan/);
  assert.match(page, /id="kostenvergelijking"/);
});

test("het 06-nummer is alleen WhatsApp en bellen loopt via het vaste nummer", () => {
  const site = read("src/data/site.ts");
  assert.match(site, /phoneTel: "\+31850870307"/);
  assert.match(site, /whatsappHref = `https:\/\/wa\.me\/\$\{site\.parent\.whatsappE164\}`/);
  const schema = read("src/lib/schema.ts");
  assert.match(schema, /telephone: site\.parent\.phoneTel/);
  assert.doesNotMatch(schema, /whatsappE164|06-50213593/);
  const footer = read("src/components/Footer.astro");
  assert.match(footer, /Bellen \{site\.parent\.phoneDisplay\}/);
  assert.match(footer, /href=\{whatsappHref\}/);
  assert.doesNotMatch(footer, /tel:\$\{site\.parent\.whatsapp/);
  const fab = read("src/components/Engagement.astro");
  assert.match(fab, /Bel \{site\.parent\.phoneDisplay\}/);
  assert.match(fab, /href=\{whatsappHref\}/);
  assert.doesNotMatch(fab, /tel:\$\{site\.parent\.whatsapp/);

  const offenders: string[] = [];
  for (const file of walk(path.join(root, "src"))) {
    const text = readFileSync(file, "utf8");
    if (/tel:\+31650213593|tel:0650213593|tel:\$\{site\.parent\.whatsapp/.test(text)) offenders.push(path.relative(root, file));
  }
  assert.deepEqual(offenders, []);
});
