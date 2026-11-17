import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

const page = readFileSync("src/pages/arbeid-ai.astro", "utf8");
const header = readFileSync("src/components/Header.astro", "utf8");
const login = readFileSync("src/components/Inloggen.astro", "utf8");
const home = readFileSync("src/pages/index.astro", "utf8");
const diensten = readFileSync("src/pages/diensten/index.astro", "utf8");

describe("arbeid.ai", () => {
  it("noemt SevenLab, ISO 27001 en een compleet verzuimsysteem", () => {
    assert.match(page, /ontwikkeld door SevenLab in samenwerking met Matchvermogen/);
    assert.match(page, /ISO 27001/);
    assert.match(page, /compleet verzuimsysteem: ziekmeldingen, verzuimregistratie, dossiers en trajecten/);
    assert.match(page, /Nee\. arbeid\.ai kan uw verzuimsysteem volledig vervangen/);
    assert.equal(/verzuimadministratie/i.test(page), false);
    assert.equal(/poortwachter/i.test(page), false);
    assert.match(page, /verzuimsysteem/);
    assert.match(page, /Brabant/);
    assert.equal((page.match(/<Photo /g) ?? []).length, 1);
  });

  it("zet inloggen in de header en de pagina in het menu", () => {
    assert.match(header, /<Inloggen/);
    assert.match(login, /https:\/\/app\.arbeid\.ai\/auth\/login/);
    assert.match(login, /aria-label="Inloggen in arbeid\.ai"/);
    assert.match(login, /target="_blank"/);
    assert.match(login, /rel="noopener"/);
    assert.match(header, /href="\/arbeid-ai"/);
    assert.match(home, /href="\/arbeid-ai"/);
    assert.match(diensten, /href="\/arbeid-ai"/);
  });
});
