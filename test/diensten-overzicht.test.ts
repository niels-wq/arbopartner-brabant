import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { reviews } from "../src/data/reviews.ts";
import { serviceGroups, serviceLayout } from "../src/data/service-layout.ts";

describe("dienstenoverzicht", () => {
  it("groepeert elke dienst in een van de vier behoeften", () => {
    assert.deepEqual(serviceGroups.map((group) => group.title), [
      "Verzuim begeleiden",
      "Re-integratie en spoor 2",
      "Arbeidsdeskundig en WIA",
      "Verzuim voorkomen en beleid",
    ]);
    const slugs = [...readFileSync("src/data/services.ts", "utf8").matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
    assert.equal(slugs.length, 11);
    for (const slug of slugs) {
      const layout = serviceLayout[slug];
      assert.ok(layout, slug);
      assert.ok(serviceGroups.some((group) => group.id === layout.group), slug);
      assert.ok(layout.result.length > 10, slug);
      assert.ok(layout.problem.length > 20, slug);
      assert.ok(layout.steps.length >= 3, slug);
      assert.ok(layout.outcome.length > 20, slug);
      assert.ok(reviews.some((review) => review.name === layout.reviewName), layout.reviewName);
    }
    const counts = Object.fromEntries(serviceGroups.map((group) => [group.id, slugs.filter((slug) => serviceLayout[slug].group === group.id).length]));
    for (const count of Object.values(counts)) assert.ok(count >= 2);
  });

  it("zet de keuzehulp, de korting en de offertebalk op het overzicht", () => {
    const page = readFileSync("src/pages/diensten/index.astro", "utf8");
    assert.match(page, /Waar heeft u hulp bij nodig/);
    assert.match(page, /ServiceCard/);
    assert.match(page, /OfferBar/);
    assert.match(page, /Guarantees/);
    assert.match(readFileSync("src/components/ServiceCard.astro", "utf8"), /Spoor 2 −/);
    assert.match(readFileSync("src/components/ServiceCard.astro", "utf8"), /AD −/);
    assert.match(readFileSync("src/components/ServiceCard.astro", "utf8"), />Bekijk</);
    assert.match(readFileSync("src/components/OfferBar.astro", "utf8"), /Offerte binnen 24 uur/);
    assert.equal(/poortwachter/i.test(page), false);
  });

  it("volgt op elke dienst hetzelfde sjabloon", () => {
    const page = readFileSync("src/pages/diensten/[slug].astro", "utf8");
    for (const heading of ["Probleem", "Aanpak", "Resultaat", "Prijsindicatie in uren", "Review"]) {
      assert.match(page, new RegExp(heading));
    }
    assert.match(page, /fotoVoorDienst/);
    assert.match(page, /FaqList/);
    assert.match(page, /Offerte binnen 24 uur/);
    assert.match(page, /id=\{service\.slug === "verzuimanalyse" \? "gratis"/);
    assert.equal(page.includes("HireBenefits"), false);
    assert.equal(/poortwachter/i.test(page + readFileSync("src/data/service-layout.ts", "utf8")), false);
  });
});
