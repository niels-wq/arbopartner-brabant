import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { places } from "../src/data/places.ts";
import { regios, stedenInRegio } from "../src/data/regios.ts";
import { focusSteden } from "../src/data/steden.ts";
import { verzuimsysteem } from "../src/data/verzuimsysteem.ts";

const read = (path: string) => readFileSync(path, "utf8");

describe("lokale pagina's", () => {
  it("houdt de vijf steden inhoudelijk uit elkaar", () => {
    assert.deepEqual(
      focusSteden.map((stad) => stad.slug),
      ["eindhoven", "tilburg", "breda", "den-bosch", "helmond"],
    );
    const titles = new Set(focusSteden.map((stad) => stad.seoTitle));
    const descriptions = new Set(focusSteden.map((stad) => stad.seoDescription));
    const h1s = new Set(focusSteden.map((stad) => stad.h1));
    assert.equal(titles.size, 5);
    assert.equal(descriptions.size, 5);
    assert.equal(h1s.size, 5);
    const headings = focusSteden.flatMap((stad) => stad.sections.map((section) => section.heading));
    assert.equal(new Set(headings).size, headings.length);
    for (const stad of focusSteden) {
      assert.ok(stad.h1.includes(places.find((place) => place.slug === stad.slug)!.name) || stad.slug === "den-bosch");
      assert.match(stad.h1, /Casemanager en verzuimbegeleiding in /);
      assert.match(stad.seoTitle, /Verzuimbegeleiding in /);
      assert.match(stad.seoDescription, /Verzuimbegeleiding in /);
      assert.ok(stad.sections.length >= 3);
      const body = stad.sections.flatMap((section) => section.paragraphs).join(" ");
      assert.match(body, /UWV/);
      assert.ok(body.length > 700, stad.slug);
      const place = places.find((item) => item.slug === stad.slug);
      assert.ok(place);
      assert.ok(place.faq.length >= 3 && place.faq.length <= 5, stad.slug);
      assert.ok(regios.some((regio) => regio.slug === stad.regio));
    }
    assert.match(focusSteden.find((stad) => stad.slug === "eindhoven")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /Brainport/);
    assert.match(focusSteden.find((stad) => stad.slug === "tilburg")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /textiel/i);
    assert.match(focusSteden.find((stad) => stad.slug === "breda")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /Moerdijk/);
    assert.match(focusSteden.find((stad) => stad.slug === "den-bosch")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /Agrifood Capital/);
    assert.match(focusSteden.find((stad) => stad.slug === "helmond")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /Automotive Campus/);
    assert.match(focusSteden.find((stad) => stad.slug === "helmond")!.sections.map((section) => section.paragraphs.join(" ")).join(" "), /Helmond-De Peel/);
  });

  it("geeft elke regio eigen plaatsen en links naar steden", () => {
    assert.deepEqual(regios.map((regio) => regio.slug), [
      "west-brabant",
      "midden-brabant",
      "noordoost-brabant",
      "zuidoost-brabant",
    ]);
    for (const regio of regios) {
      assert.ok(regio.intro.join(" ").length > 280, regio.slug);
      assert.ok(regio.faq.length >= 3 && regio.faq.length <= 5);
      assert.ok(stedenInRegio(regio.slug).length >= 2, regio.slug);
      assert.match(regio.gemeenteNoot, /UWV/);
    }
    assert.ok(stedenInRegio("west-brabant").some((place) => place.slug === "breda"));
    assert.ok(stedenInRegio("midden-brabant").some((place) => place.slug === "tilburg"));
    assert.ok(stedenInRegio("noordoost-brabant").some((place) => place.slug === "den-bosch"));
    assert.equal(stedenInRegio("noordoost-brabant").some((place) => place.slug === "nijmegen"), false);
    assert.ok(stedenInRegio("zuidoost-brabant").some((place) => place.slug === "eindhoven"));
    assert.ok(stedenInRegio("zuidoost-brabant").some((place) => place.slug === "helmond"));
  });

  it("zet het verzuimsysteem op homepage, diensten en steden", () => {
    assert.match(verzuimsysteem.text, /Informatie, dossiers en trajecten/);
    assert.match(read("src/pages/index.astro"), /verzuimsysteem/);
    assert.match(read("src/components/HireBenefits.astro"), /verzuimsysteem\.title/);
    assert.match(read("src/pages/diensten/[slug].astro"), /Verzuimsysteem/);
    assert.match(read("src/pages/diensten/[slug].astro"), /WerkgebiedLinks/);
    assert.match(read("src/pages/werkgebied/[slug].astro"), /Verzuimsysteem/);
    assert.match(read("src/pages/werkgebied/[slug].astro"), /LokaleDiensten/);
    assert.match(read("src/pages/werkgebied/regio/[slug].astro"), /LokaleDiensten/);
    assert.match(read("src/data/regios.ts"), /functiehuis-opstellen/);
    assert.match(read("src/data/regios.ts"), /tender-arbodiensten/);
    assert.match(read("src/components/Footer.astro"), /footerDiensten/);
    assert.match(read("src/pages/werkgebied/regio/[slug].astro"), /Verzuimsysteem/);
  });

  it("houdt het vaste nummer in de lokale structured data", () => {
    const schema = read("src/lib/schema.ts");
    assert.match(schema, /export function areaServiceLd/);
    assert.match(schema, /telephone: site\.parent\.phoneTel/);
    assert.doesNotMatch(schema, /whatsappE164|06-50213593/);
    const stad = read("src/pages/werkgebied/[slug].astro");
    assert.match(stad, /areaServiceLd/);
    assert.match(stad, /href="\/offerte"/);
    assert.match(stad, /href="\/contact"/);
    assert.match(read("src/components/Footer.astro"), /werkgebied\/regio/);
    assert.match(read("src/pages/werkgebied/index.astro"), /Vier regio/);
  });

  it("noemt alleen de afgesproken NAP in de vermeldingenlijst", () => {
    const doc = read("docs/lokale-vermeldingen.md");
    assert.match(doc, /Arbopartner Brabant/);
    assert.match(doc, /085-0870307/);
    assert.match(doc, /https:\/\/www\.arbopartnerbrabant\.nl/);
    assert.match(doc, /https:\/\/business\.google\.com\/nl\/business-profile\//);
    assert.match(doc, /https:\/\/www\.vnoncwbrabantzeeland\.nl\//);
    assert.match(doc, /https:\/\/rewin\.nl\//);
    assert.match(doc, /https:\/\/midpointbrabant\.nl\//);
    assert.match(doc, /https:\/\/www\.agrifoodcapital\.nl\//);
    assert.match(doc, /https:\/\/brainporteindhoven\.com\/nl\//);
    assert.doesNotMatch(doc, /tel:\+316|06-50213593 als telefoon/);
    assert.match(doc, /niet als telefoon|alleen WhatsApp/i);
  });
});
