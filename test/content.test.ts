import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";

const root = path.resolve("src");

async function files(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else out.push(full);
  }
  return out;
}

describe("artikelen", () => {
  it("telt twintig stukken van minstens 900 woorden", async () => {
    const dir = path.join(root, "content/blog");
    const names = (await readdir(dir)).filter((name) => name.endsWith(".md"));
    assert.equal(names.length, 20);
    for (const name of names) {
      const raw = await readFile(path.join(dir, name), "utf8");
      const body = raw.replace(/^---[\s\S]*?---/, "");
      const words = body.match(/[A-Za-zÀ-ÿ0-9’']+/g) ?? [];
      assert.ok(words.length >= 900, `${name} heeft ${words.length} woorden`);
    }
  });
});

describe("wet in de merklaag", () => {
  it("noemt de wet niet buiten de artikelen", async () => {
    const all = await files(root);
    const offenders: string[] = [];
    for (const file of all) {
      if (file.includes(`${path.sep}content${path.sep}blog${path.sep}`)) continue;
      if (file.endsWith(`${path.sep}data${path.sep}situaties.ts`)) continue;
      if (file.endsWith(`${path.sep}loonsanctie-risicoscan.astro`)) continue;
      if (file.endsWith(`${path.sep}verzuim-tijdlijn.astro`)) continue;
      const text = await readFile(file, "utf8");
      if (/poortwachter/i.test(text)) offenders.push(path.relative(root, file));
    }
    assert.deepEqual(offenders, []);
  });
});
