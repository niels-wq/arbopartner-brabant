import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

describe("knop en afstand", () => {
  it("zet padding, tussenruimte en card-inset in tokens", async () => {
    const css = await readFile("src/styles/global.css", "utf8");
    assert.match(css, /--spacing-btn-y:\s*0\.8125rem/);
    assert.match(css, /--spacing-btn-x:\s*1\.5rem/);
    assert.match(css, /--spacing-cta:\s*1\.25rem/);
    assert.match(css, /--spacing-card:\s*1\.5rem/);
    assert.match(css, /padding:\s*var\(--spacing-btn-y\)\s*var\(--spacing-btn-x\)/);
    assert.match(css, /margin-top:\s*var\(--spacing-cta\)/);
    assert.match(css, /gap:\s*var\(--spacing-cta\)/);
    assert.match(css, /padding:\s*var\(--spacing-card\)/);
  });

  it("laat knoppen via één component lopen", async () => {
    const button = await readFile("src/components/Button.astro", "utf8");
    const home = await readFile("src/pages/index.astro", "utf8");
    const band = await readFile("src/components/CtaBand.astro", "utf8");
    assert.match(button, /variant === "ghost" \? "btn btn-ghost"/);
    assert.match(home, /<Button/);
    assert.match(band, /<Button/);
    assert.equal(home.includes("px-5 py-3"), false);
  });
});
