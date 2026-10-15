import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { team } from "../src/data/team.ts";
import { reviews, reviewsAboutNiels } from "../src/data/reviews.ts";
import { zzpFaq } from "../src/data/site.ts";

test("team komt overeen met de teampagina van matchvermogen", () => {
  assert.equal(team.length, 21);
  assert.equal(team.filter((person) => person.group === "matchvermogen").length, 9);
  assert.equal(team.filter((person) => person.group === "best-match").length, 12);
  const niels = team.find((person) => person.slug === "niels-alderding");
  assert.ok(niels);
  assert.equal(niels.role, "Directeur, arbeidsdeskundige");
  assert.match(niels.bio ?? "", /erkend rechtshulpverlener UWV/);
  assert.equal(team.filter((person) => person.bio).length, 1);
  for (const person of team) {
    assert.ok(person.name.length > 2);
    assert.ok(person.role.length > 2);
    assert.match(person.alt, /Uden/);
    for (const width of person.widths) {
      assert.ok(existsSync(`public/mensen/${person.slug}-${width}.webp`), person.slug + width);
      assert.ok(existsSync(`public/mensen/${person.slug}-${width}.avif`), person.slug + width);
    }
  }
  assert.equal(team.find((person) => person.name === "Ronald Berens")?.role, "Arbeidsdeskundige");
  assert.equal(team.find((person) => person.name === "Bas Alderding")?.role, "Directeur Sevenlab en Arbeid.AI");
  assert.equal(team.find((person) => person.name === "Coos Balhmann")?.role, "Re-integratiecoach");
});

test("reviews over Niels zijn letterlijk en hebben bron en datum", () => {
  const about = reviewsAboutNiels();
  assert.equal(about.length, 9);
  assert.equal(reviews.length, 25);
  for (const review of reviews) {
    assert.match(review.sourceUrl, /^https:\/\/matchvermogen\.nl\/referenties\/$/);
    assert.match(review.dateIso, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(review.quote.length > 5);
    assert.ok(review.author.length > 1);
  }
  const dimitar = about.find((review) => review.author.startsWith("Dimitar"));
  assert.match(dimitar?.quote ?? "", /Special thanks to Nils/);
  const jolande = about.find((review) => review.author.startsWith("Jolande"));
  assert.match(jolande?.quote ?? "", /WGA- uitkering/);
  assert.equal(reviews.find((review) => review.name === "Wendy de Smit")?.rating, 4);
  const schema = readFileSync("src/lib/schema.ts", "utf8");
  const reviewsPage = readFileSync("src/pages/reviews.astro", "utf8");
  assert.equal(schema.includes("aggregateRating"), false);
  assert.equal(reviewsPage.includes("AggregateRating"), false);
});

test("zzp-tekst noemt kern, netwerk en offerte", () => {
  assert.match(zzpFaq.a, /vaste kern/);
  assert.match(zzpFaq.a, /gecertificeerde zzp-professionals/);
  assert.match(zzpFaq.a, /offerte/);
  assert.equal(zzpFaq.a.includes("%"), false);
});
