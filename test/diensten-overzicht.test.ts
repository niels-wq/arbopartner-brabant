import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { extraServices } from "../src/data/dienst-extra.ts";
import { hrServices } from "../src/data/hr-projecten.ts";
import { reviews } from "../src/data/reviews.ts";
import { serviceGroups, serviceLayout } from "../src/data/service-layout.ts";

describe("dienstenoverzicht", () => {
  it("groepeert elke dienst in begeleiding, toetsing, projecten of interim", () => {
    assert.deepEqual(serviceGroups.map((group) => group.title), [
      "Begeleiding",
      "Toetsing en bezwaar",
      "HR-projecten",
      "Interim",
    ]);
    const slugs = [...readFileSync("src/data/services.ts", "utf8").matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
    assert.equal(slugs.length, 11);
    assert.equal(hrServices.length, 5);
    assert.equal(extraServices.length, 12);
    const projectSlugs = new Set([...hrServices, ...extraServices].map((service) => service.slug));
    const allSlugs = [...slugs, ...projectSlugs];
    for (const slug of allSlugs) {
      const layout = serviceLayout[slug];
      assert.ok(layout, slug);
      assert.ok(serviceGroups.some((group) => group.id === layout.group), slug);
      assert.ok(layout.result.length > 10, slug);
      assert.ok(layout.problem.length > 20, slug);
      assert.ok(layout.steps.length >= 3, slug);
      assert.ok(layout.outcome.length > 20, slug);
      if (projectSlugs.has(slug)) {
        assert.equal(layout.reviewName, "", slug);
        assert.equal(layout.priceKind, "project", slug);
        assert.match(layout.outcome, /verzuimsysteem/i, slug);
      } else if (layout.reviewName) {
        assert.ok(reviews.some((review) => review.name === layout.reviewName), layout.reviewName);
      }
    }
    for (const service of [...hrServices, ...extraServices]) {
      assert.match(service.h1 ?? "", /Brabant/, service.slug);
      assert.match(service.seoTitle ?? "", /Brabant/, service.slug);
      assert.ok((serviceLayout[service.slug].deliverables?.length ?? 0) >= 3, service.slug);
    }
    const analyse = serviceLayout.verzuimanalyse;
    assert.equal(analyse.group, "projecten");
    assert.equal(analyse.priceKind, "analyse");
    assert.equal(analyse.reviewName, "Michel Krijne");
    assert.ok((analyse.deliverables?.length ?? 0) >= 3);
    assert.match(analyse.outcome, /verzuimsysteem/i);
    const training = serviceLayout["leidinggevenden-training"];
    assert.equal(training.group, "projecten");
    assert.equal(training.priceKind, "project");
    assert.equal(training.reviewName, "Femke Aarts");
    assert.match(training.steps.map((step) => step.text).join(" "), /Wet verbetering poortwachter/);
    assert.match(training.steps.map((step) => `${step.title} ${step.text}`).join(" "), /vroegsignalering/i);
    assert.match(training.steps.map((step) => `${step.title} ${step.text}`).join(" "), /verzuimgesprek/i);
    const counts = Object.fromEntries(serviceGroups.map((group) => [group.id, allSlugs.filter((slug) => serviceLayout[slug].group === group.id).length]));
    for (const [id, count] of Object.entries(counts)) assert.ok(count >= (id === "interim" ? 1 : 2), `${id} ${count}`);
    assert.equal(serviceLayout["interim-casemanager"].group, "interim");
    assert.equal(serviceLayout["second-opinion-verzuim"].group, "toetsing");
    assert.equal(readFileSync("src/data/dienst-extra.ts", "utf8").includes("€"), false);
    assert.doesNotMatch(readFileSync("src/data/dienst-extra.ts", "utf8"), /poortwachter/i);
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
    assert.match(page, /Afnamevormen/);
    assert.match(page, /href="\/spoedhulp"/);
    assert.match(page, /integrale-verzuimaanpak/);
  });

  it("volgt op elke dienst hetzelfde sjabloon", () => {
    const page = readFileSync("src/pages/diensten/[slug].astro", "utf8");
    for (const heading of ["Probleem", "Aanpak", "Resultaat", "Prijsindicatie in uren", "Review"]) {
      assert.match(page, new RegExp(heading));
    }
    assert.match(page, /fotoVoorDienst/);
    assert.match(page, /FaqList/);
    assert.match(page, /Offerte binnen 24 uur/);
    assert.match(page, /phoneHref/);
    assert.match(page, /whatsappHref/);
    assert.match(page, /Wat u krijgt/);
    assert.match(page, /Voor wie/);
    assert.doesNotMatch(page, /tel:\+316|tel:06/);
    assert.match(page, /id=\{service\.slug === "verzuimanalyse" \? "gratis"/);
    assert.equal(page.includes("HireBenefits"), false);
    const layout = readFileSync("src/data/service-layout.ts", "utf8").replaceAll("Wet verbetering poortwachter", "");
    assert.equal(/poortwachter/i.test(page + layout), false);
    assert.match(readFileSync("src/data/service-layout.ts", "utf8"), /Wet verbetering poortwachter/);
    assert.match(page, /Afnamevormen/);
    const vragen = [
      ["src/pages/spoedhulp.astro", "Wat moet ik doen als mijn HR-medewerker vertrekt en er lopen verzuimdossiers?"],
      ["src/data/dienst-extra.ts", "Is eigenrisicodrager worden voordelig?"],
      ["src/data/dienst-extra.ts", "Mag ik een zieke werknemer ontslaan bij reorganisatie?"],
      ["src/data/hr-projecten.ts", "Welk verzuimsysteem past bij ons?"],
      ["src/data/hr-projecten.ts", "Hoe kies ik een arbodienst?"],
    ] as const;
    for (const [file, vraag] of vragen) assert.match(readFileSync(file, "utf8"), new RegExp(vraag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(readFileSync("src/pages/tarieven.astro", "utf8"), /Afnamevormen/);
    assert.match(readFileSync("src/pages/spoedhulp.astro", "utf8"), /Afnamevormen/);
    assert.match(readFileSync("src/components/Afnamevormen.astro", "utf8"), /levels\.medior\.rates\[10\]/);
    assert.match(readFileSync("src/data/dienst-extra.ts", "utf8"), /geen verzekeraar en geen bemiddelaar/i);
    assert.doesNotMatch(readFileSync("src/data/dienst-extra.ts", "utf8"), /\d+\s*%/);
  });
});
