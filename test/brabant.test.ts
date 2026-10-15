import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { brabantFotos } from "../src/data/brabant-fotos.ts";
import { gemeenten } from "../src/data/gemeenten.ts";
import { places } from "../src/data/places.ts";

const vrij = /^(CC0|CC BY|CC BY-SA|Public domain)/;

describe("Brabant centraal", () => {
  it("zet alle gemeenten van Noord-Brabant in areaServed", async () => {
    assert.equal(gemeenten.length, 56);
    assert.ok(gemeenten.includes("'s-Hertogenbosch"));
    assert.ok(gemeenten.includes("Maashorst"));
    assert.equal(gemeenten.includes("Nijmegen" as never), false);
    const schema = await readFile("src/lib/schema.ts", "utf8");
    assert.match(schema, /gemeenten\.map\(\(name\) => \(\{ "@type": "AdministrativeArea", name \}\)\)/);
    assert.doesNotMatch(schema, /places\.map\(\(place\) => \(\{ "@type": "City"/);
    assert.match(schema, /name: "Noord-Brabant"/);
  });

  it("heeft regiopagina's voor de grote steden en eerlijke reistijd", () => {
    for (const slug of ["tilburg", "breda", "roosendaal", "bergen-op-zoom", "waalwijk", "oosterhout"]) {
      const place = places.find((item) => item.slug === slug);
      assert.ok(place, slug);
      assert.equal(place.reistijdInTarief, false);
      assert.equal(place.buitenBrabant, undefined);
    }
    assert.equal(places.find((item) => item.slug === "nijmegen")?.buitenBrabant, true);
  });

  it("toont Brabant in de hero en houdt het kantoor in Uden", async () => {
    const home = await readFile("src/pages/index.astro", "utf8");
    assert.match(home, /Casemanager en arbo in Brabant/);
    assert.match(home, /Nuchter, dichtbij, Brabants/);
    assert.match(home, /Losplaats 16d/);
    assert.match(home, /BrabantMap/);
    assert.match(home, /VerzuimTijdlijn/);
    const site = await readFile("src/data/site.ts", "utf8");
    assert.match(site, /Casemanager en arbo in Noord-Brabant/);
  });

  it("bewaart rechtenvrije foto's met een vrije licentie", async () => {
    for (const [id, foto] of Object.entries(brabantFotos)) {
      assert.match(foto.license, vrij, id);
      assert.ok(foto.author.length > 1, id);
      assert.ok(foto.alt.length > 20, id);
      assert.match(foto.sourceUrl, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      await access(`public/brabant/${id}.webp`);
      await access(`public/brabant/${id}.avif`);
    }
  });
});
