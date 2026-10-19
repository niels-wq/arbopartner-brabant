import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

function walk(dir: string, acc: string[] = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name === ".git") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(astro|ts|mjs|md)$/.test(name)) acc.push(full);
  }
  return acc;
}

const banned = [
  /PLACEHOLDER/i,
  /nog niet ingesteld/i,
  /nog niet live/i,
  /nog niet vastgesteld/i,
  /nog niet vastgelegd/i,
  /nog niet juridisch/i,
  /open punt/i,
  /mailserver staat nog niet/i,
  /mailserver is nog niet/i,
  /conceptvoorwaarden/i,
  /btw-identificatienummer staat niet/i,
];

test("de publieke bron toont geen placeholder", () => {
  const hits: string[] = [];
  for (const file of walk(path.join(root, "src"))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      const visible = line.replace(/\splaceholder="[^"]*"/gi, "");
      for (const pattern of banned) {
        if (pattern.test(visible)) hits.push(`${path.relative(root, file)}:${index + 1} ${line.trim()}`);
      }
    });
  }
  assert.deepEqual(hits, []);
});

test("footer en contact gebruiken de colofongegevens van Matchvermogen", () => {
  const footer = readFileSync(path.join(root, "src/components/Footer.astro"), "utf8");
  const contact = readFileSync(path.join(root, "src/pages/contact.astro"), "utf8");
  const site = readFileSync(path.join(root, "src/data/site.ts"), "utf8");
  for (const file of [footer, contact]) {
    assert.match(file, /site\.parent\.kvk/);
    assert.match(file, /site\.parent\.street/);
    assert.match(file, /site\.parent\.email/);
    assert.doesNotMatch(file, /placeholders/);
  }
  assert.match(site, /kvk: "85849618"/);
  assert.match(site, /email: "info@matchvermogen.nl"/);
  assert.match(site, /phoneDisplay: "085-0870307"/);
  assert.match(site, /street: "Losplaats 16d"/);
  assert.match(site, /btw: "NL863765993B01"/);
  assert.match(readFileSync(path.join(root, "src/lib/schema.ts"), "utf8"), /vatID: site\.parent\.btw/);
  for (const rel of ["src/pages/privacy.astro", "src/pages/voorwaarden.astro"]) {
    const page = readFileSync(path.join(root, rel), "utf8");
    assert.match(page, /KvK \{site\.parent\.kvk\}, btw \{site\.parent\.btw\}/);
  }
  assert.match(site, /maximaal 2 jaar na het laatste contact/);
});
