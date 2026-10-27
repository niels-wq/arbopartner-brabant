import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { brabantFotos, fotoVoorPlaats } from "../src/data/brabant-fotos.ts";
import { blogFoto, dienstFoto, fotos, plaatsWerk, situatieFoto, werkFotoVoorPlaats } from "../src/data/fotos.ts";
import { places } from "../src/data/places.ts";

const vrij = /^(CC0|CC BY|CC BY-SA|Public domain)/;
const stockLicentie = /^(Pexels License|Unsplash License)$/;

describe("echte foto's", () => {
  it("bewaart bron en licentie bij elke foto", async () => {
    for (const [id, foto] of Object.entries(fotos)) {
      assert.ok(foto.alt.length > 40, id);
      assert.ok(foto.author.length > 2, id);
      assert.match(foto.sourceUrl, /^https:\/\//, id);
      if (foto.license === "Foto van Matchvermogen") {
        assert.match(foto.sourceUrl, /^https:\/\/matchvermogen\.nl\/wp-content\/uploads\//, id);
      } else {
        assert.match(foto.license, stockLicentie, id);
        assert.match(foto.sourceUrl, /^https:\/\/(www\.)?(pexels\.com|unsplash\.com)\//, id);
      }
      assert.equal(/poortwachter/i.test(`${foto.alt} ${foto.caption}`), false, id);
      await access(`public/fotos/${id}.webp`);
      await access(`public/fotos/${id}.avif`);
    }
  });

  it("dekt elke dienst, elke situatie, elk artikel en elke plaats", async () => {
    const services = [
      ...(await readFile("src/data/services.ts", "utf8")).matchAll(/slug: "([^"]+)"/g),
      ...(await readFile("src/data/hr-projecten.ts", "utf8")).matchAll(/slug: "([^"]+)"/g),
      ...(await readFile("src/data/dienst-extra.ts", "utf8")).matchAll(/slug: "([^"]+)"/g),
    ].map((match) => match[1]);
    const situaties = [...(await readFile("src/data/situaties.ts", "utf8")).matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
    const posts = (await readdir("src/content/blog")).filter((name) => name.endsWith(".md")).map((name) => name.replace(/\.md$/, ""));
    assert.equal(services.length, 28);
    assert.equal(situaties.length, 7);
    assert.equal(posts.length, 20);
    for (const slug of services) assert.ok(slug in dienstFoto, slug);
    for (const slug of situaties) assert.ok(slug in situatieFoto, slug);
    for (const id of posts) assert.ok(id in blogFoto, id);
    for (const place of places) {
      const foto = fotoVoorPlaats(place.slug);
      assert.ok(foto, place.slug);
      assert.ok(brabantFotos[foto]);
      await access(`public/brabant/${foto}.webp`);
      const werk = werkFotoVoorPlaats(place.slug);
      assert.equal(werk, plaatsWerk[place.slug as keyof typeof plaatsWerk]);
      assert.equal(werk in fotos, true);
      assert.equal(/kerk|skyline|stratumseind|evoluon/i.test(fotos[werk].alt), false, place.slug);
    }
  });

  it("zet foto's op de hero, diensten, situaties, regio's en blogs", async () => {
    const home = await readFile("src/pages/index.astro", "utf8");
    const dienst = await readFile("src/pages/diensten/[slug].astro", "utf8");
    const situaties = await readFile("src/components/Situaties.astro", "utf8");
    const blog = await readFile("src/pages/blog/[slug].astro", "utf8");
    const plaats = await readFile("src/pages/werkgebied/[slug].astro", "utf8");
    assert.match(home, /Photo id="gesprek-bank"/);
    assert.match(home, /Photo id="gesprek-werkgever"/);
    assert.equal(home.includes("BrabantPhoto"), false);
    assert.equal(home.includes("werkFotoVoorPlaats"), false);
    assert.equal((await readFile("src/pages/blog/index.astro", "utf8")).includes("BrabantPhoto"), false);
    assert.equal((await readFile("src/pages/werkgebied/index.astro", "utf8")).includes("unsplash-eindhoven"), false);
    assert.equal(plaats.includes("werkFotoVoorPlaats"), false);
    assert.equal((plaats.match(/<BrabantPhoto/g) ?? []).length, 1);
    assert.match(home, /site\.founder\.avatar/);
    assert.equal(dienst.includes("Figure"), false);
    assert.match(dienst, /fotoVoorDienst/);
    assert.match(situaties, /fotoVoorSituatie/);
    assert.match(blog, /BrabantPhoto|Photo/);
    assert.equal(plaats.includes("Figure"), false);
    assert.match(plaats, /BrabantPhoto/);
    assert.equal(/poortwachter/i.test(await readFile("src/data/fotos.ts", "utf8")), false);
    const photo = await readFile("src/components/Photo.astro", "utf8");
    const brabant = await readFile("src/components/BrabantPhoto.astro", "utf8");
    assert.match(photo, /alt=\{foto\.alt\}/);
    assert.match(brabant, /alt=\{foto\.alt\}/);
    assert.equal(photo.includes("figcaption"), false);
    assert.equal(brabant.includes("figcaption"), false);
    assert.equal(home.includes("Foto:"), false);
  });
});
