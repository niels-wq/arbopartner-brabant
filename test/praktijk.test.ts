import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { ervaring, praktijkCases } from "../src/data/praktijk.ts";

const read = (file: string) => readFileSync(file, "utf8");

describe("praktijkvoorbeelden", () => {
  it("houdt het bij twee anonieme feiten, zonder extra cijfer of review", () => {
    assert.equal(praktijkCases.length, 2);
    assert.equal(praktijkCases[0].slug, "fietsfabrikant-reorganisatie");
    assert.equal(praktijkCases[1].slug, "totaalanalyse-verzuim-erd");
    const blob = read("src/data/praktijk.ts");
    assert.match(blob, /Grote Brabantse fietsfabrikant/);
    assert.match(blob, /zeer veel loonsancties/);
    assert.match(blob, /meer dan €400\.000/);
    assert.match(blob, /meer dan 4 ton/i);
    assert.match(blob, /Meer dan tien jaar/);
    assert.equal(/poortwachter/i.test(blob), false);
    assert.equal(/sterren|ratingValue|reviewBody/.test(blob), false);
    assert.equal(/\d+\s*%/.test(blob), false);
    assert.equal(/\bB\.V\./.test(blob), false);
    for (const item of praktijkCases) {
      assert.ok(item.situatie.length > 40, item.slug);
      assert.ok(item.stappen.length >= 3, item.slug);
      assert.ok(item.resultaat.length > 20, item.slug);
      assert.equal(item.faq.some((faq) => /review/i.test(faq.q + faq.a)), true, item.slug);
    }
    assert.match(ervaring, /knoppen/);
  });

  it("zet het overzicht, de cases, de teasers en de spoedscan op de afgesproken plekken", () => {
    const home = read("src/pages/index.astro");
    const spoed = read("src/pages/spoedhulp.astro");
    const dienst = read("src/pages/diensten/[slug].astro");
    const band = read("src/components/SpoedBand.astro");
    assert.match(home, /SpoedBand/);
    assert.match(home, /PraktijkTeasers/);
    assert.equal(home.includes("px-5 py-3"), false);
    assert.match(band, /Acuut verzuimprobleem\? Bel of app vandaag/);
    assert.match(band, /Gratis spoedscan van 30 minuten/);
    assert.match(band, /phoneHref/);
    assert.match(band, /whatsappHref/);
    assert.doesNotMatch(band, /tel:\+316|tel:06/);
    assert.match(spoed, /id="spoedscan"/);
    assert.match(spoed, /Gratis spoedscan van 30 minuten/);
    assert.match(spoed, /PraktijkTeasers/);
    assert.match(spoed, /\/loonsanctie-risicoscan/);
    assert.match(dienst, /reorganisatie-verzuim/);
    assert.match(dienst, /integrale-verzuimaanpak/);
    assert.match(dienst, /eigenrisicodragerschap/);
    assert.match(dienst, /PraktijkTeasers/);
    assert.match(read("src/pages/praktijkvoorbeelden/index.astro"), /Situatie/);
    assert.match(read("src/pages/praktijkvoorbeelden/[slug].astro"), /Wat we deden/);
    assert.match(read("src/pages/praktijkvoorbeelden/[slug].astro"), /Resultaat/);
    assert.match(read("src/pages/praktijkvoorbeelden/[slug].astro"), /articleLd/);
    assert.match(read("src/pages/praktijkvoorbeelden/[slug].astro"), /section: "Praktijkvoorbeeld"/);
    assert.doesNotMatch(read("src/pages/praktijkvoorbeelden/[slug].astro"), /"@type": "Review"|ReviewCard/);
    assert.match(read("src/components/Header.astro"), /\/praktijkvoorbeelden/);
    assert.match(read("src/components/Footer.astro"), /\/praktijkvoorbeelden/);
    assert.match(read("src/components/LokaleDiensten.astro"), /\/praktijkvoorbeelden/);
  });
});
