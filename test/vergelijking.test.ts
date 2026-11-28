import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validate } from "../server/forms.mjs";
import { euro } from "../src/lib/format.ts";
import { levels } from "../src/lib/rates.ts";
import {
  controleerMarkt,
  disclaimerTekst,
  jaarTotaal,
  leesInvoer,
  renderResultaat,
  standaardInvoer,
  vergelijkFaqs,
  type MarktData,
  type Prijs,
  type VergelijkInvoer,
} from "../src/lib/vergelijking.ts";

const markt = JSON.parse(readFileSync("src/data/vergelijking/markt-2026-11-28.json", "utf8")) as MarktData;

function invoer(extra: Partial<VergelijkInvoer> = {}): VergelijkInvoer {
  return { ...standaardInvoer, ...extra };
}

function zonderVerzuim(html: string): string {
  return html.replace(/<p class="vgl-verzuim[\s\S]*?<\/p>/g, "");
}

function zichtbareTekst(html: string): string {
  return html.replace(/\shref="[^"]*"/g, "");
}

function prijs(label: string, bedrag: number, eenheid: string): Prijs {
  return { label, bedrag, eenheid, btw: "excl. btw", tariefjaar: "2026", bron: "bron" };
}

test("de marktgegevens zijn compleet en zonder eigen groepsprijzen", () => {
  assert.deepEqual(controleerMarkt(markt), []);
  assert.equal(markt.peildatum, "2026-11-28");
  assert.match(markt.bronvermelding, /28 november 2026/);
  assert.equal(JSON.stringify(markt).includes('"bm"'), false);
  for (const iv of markt.interventies) {
    for (const inzet of iv.aanbieders) {
      for (const regel of inzet.prijzen) {
        assert.match(markt.bronnen[regel.bron].url, /^https:\/\//, `${inzet.id} ${regel.label}`);
      }
    }
  }
});

test("het basistarief is 112,50 en telt niet mee in de bandbreedte", () => {
  assert.equal(levels.medior.rates[10], 112.5);
  const html = renderResultaat(markt, standaardInvoer);
  const banden = html.slice(html.indexOf("vgl-banden"), html.indexOf("vgl-ons"));
  assert.match(html, /112,50/);
  assert.equal(banden.includes("112,50"), false);
  assert.match(banden, /105,00/);
  assert.match(banden, /153,95/);
  assert.match(banden, /176,00/);
  assert.match(html, /58\.500,00/);
  assert.match(html, /Indicatie op basis van de tarieven op deze site/);
  assert.match(html, /U vulde 80 medewerkers in/);
  assert.match(html, /niet het aantal medewerkers/);
  assert.doesNotMatch(html, /Best Match|Matchvermogen B\.V\. tarief|5,95/);
});

test("jaartotalen gebruiken alleen een duidelijke eenheid", () => {
  const tachtig = invoer({ medewerkers: 80, uren: 10, dienst: "casemanagement" });
  assert.equal(jaarTotaal(prijs("Flex", 25, "per medewerker per jaar"), tachtig, "arbodienstverlening"), 2000);
  assert.equal(jaarTotaal(prijs("Pro", 5.5, "per medewerker per maand"), tachtig, "verzuimsysteem"), 5280);
  assert.equal(jaarTotaal(prijs("Casemanager", 105, "per uur"), tachtig, "casemanagement"), 54600);
  assert.equal(jaarTotaal(prijs("Uur", 171.5, "per uur"), tachtig, "arbodienstverlening"), null);
  assert.equal(
    jaarTotaal(prijs("NN", 153.45, "per medewerker (periode niet expliciet vermeld)"), tachtig, "arbodienstverlening"),
    null,
  );
  assert.equal(jaarTotaal(prijs("Flex", 25, "per medewerker per jaar"), invoer({ medewerkers: null }), "arbodienstverlening"), null);
});

test("het verzuimpercentage verandert geen bedrag", () => {
  const laag = renderResultaat(markt, invoer({ verzuimPct: 1 }));
  const hoog = renderResultaat(markt, invoer({ verzuimPct: 20 }));
  assert.equal(zonderVerzuim(laag), zonderVerzuim(hoog));
  assert.match(laag, /Verzuimpercentage: 1%/);
  assert.match(hoog, /Verzuimpercentage: 20%/);
  assert.match(laag, /geen eurobedrag/);
});

test("arbodienst toont openbare jaarbedragen en laat onduidelijke periodes met rust", () => {
  const html = renderResultaat(markt, invoer({ dienst: "arbodienstverlening", medewerkers: 80 }));
  assert.match(html, /2\.000,00/);
  assert.match(html, /prijs niet openbaar/);
  assert.match(html, /HumanCapitalCare/);
  assert.match(html, /ArboNed/);
  assert.match(html, /Arbo Unie/);
  assert.match(html, /Zorg van de Zaak/);
  assert.match(html, /Perspectief/);
  assert.match(html, /153,45/);
  assert.equal(html.includes("12.276,00"), false);
  assert.equal(html.includes("24,50"), false);
  assert.equal(html.includes("89.180,00"), false);
  assert.match(html, /vgl-eigen-abo/);
  assert.match(html, /https:\/\/www\.arboned\.nl\/diensten\/verzuimabonnementen/);
  assert.doesNotMatch(html, /wij zijn geen/i);
  assert.doesNotMatch(html, /niet gevonden/i);
  assert.doesNotMatch(zichtbareTekst(html), /\bsoftware\b/i);
});

test("verzuimsysteem noemt arbeid.ai zonder verzonnen prijs", () => {
  const html = renderResultaat(markt, invoer({ dienst: "verzuimsysteem", medewerkers: 80 }));
  assert.match(html, /vgl-arbeid/);
  assert.match(html, /arbeid\.ai/);
  assert.match(html, /prijs niet openbaar/);
  assert.match(html, /betalen naar gebruik/);
  assert.doesNotMatch(html, /pay as you go/i);
  assert.match(html, /VerzuimSignaal/);
  assert.match(html, /Xpert Suite/);
  const jaar = renderResultaat(markt, invoer({ dienst: "verzuimsysteem", contract: "jaar" }));
  const maand = renderResultaat(markt, invoer({ dienst: "verzuimsysteem", contract: "maand" }));
  assert.match(jaar, /jaarabonnement/);
  assert.equal(jaar.includes("maandcontract"), false);
  assert.match(maand, /maandcontract/);
  assert.equal(maand.includes("jaarabonnement"), false);
});

function marktDeel(html: string): string {
  const start = html.indexOf("vgl-markt");
  return start === -1 ? html : html.slice(start);
}

test("filters houden prijs niet openbaar en SBCA uit elkaar", () => {
  const openbaar = renderResultaat(markt, invoer({ alleenOpenbaar: true }));
  assert.equal(marktDeel(openbaar).includes("HumanCapitalCare"), false);
  assert.match(marktDeel(openbaar), /Callo/);
  const sbca = renderResultaat(markt, invoer({ alleenSbca: true }));
  assert.match(marktDeel(sbca), /ArboNed/);
  assert.equal(marktDeel(sbca).includes("Callo"), false);
  const landelijk = renderResultaat(markt, invoer({ dienst: "arbodienstverlening", alleenLandelijk: true }));
  assert.match(marktDeel(landelijk), /ArboNed/);
  assert.equal(marktDeel(landelijk).includes("FIT Verzuimbeheer"), false);
});

test("de offerte gebruikt het bestaande formulier en de pagina blijft in het menu", () => {
  const pagina = readFileSync("src/pages/vergelijken.astro", "utf8");
  const header = readFileSync("src/components/Header.astro", "utf8");
  const footer = readFileSync("src/components/Footer.astro", "utf8");
  const tools = readFileSync("src/pages/tools/index.astro", "utf8");
  const sticky = readFileSync("src/components/Engagement.astro", "utf8");
  assert.equal((pagina.match(/<h1\b/g) ?? []).length, 1);
  assert.match(pagina, /faqLd/);
  assert.match(pagina, /data-endpoint="\/api\/offerte"/);
  assert.match(pagina, /name="company_website"/);
  assert.match(pagina, /name="toestemming"/);
  assert.match(pagina, /href="\/privacy"/);
  assert.match(pagina, /Vraag een vrijblijvende offerte aan/);
  assert.match(pagina, /28 november 2026/);
  assert.match(disclaimerTekst(), /indicatief/);
  assert.match(disclaimerTekst(), /openbare bronnen/);
  assert.match(pagina, /vgl-pagina/);
  assert.match(pagina, /animation: none/);
  assert.equal(pagina.includes("<img"), false);
  assert.equal(pagina.includes("Figure"), false);
  assert.equal(pagina.includes("ap-sticky"), false);
  assert.equal(pagina.includes("—"), false);
  assert.equal(pagina.includes("–"), false);
  assert.doesNotMatch(pagina, /wij zijn geen/i);
  assert.match(header, /\/vergelijken/);
  assert.match(footer, /href="\/vergelijken"/);
  assert.match(tools, /\/vergelijken/);
  assert.match(sticky, /class="ap-sticky"/);
  assert.equal(vergelijkFaqs().length, 6);
  const formulier = new FormData();
  formulier.set("dienst", "verzuimsysteem");
  formulier.set("medewerkers", "80");
  formulier.set("verzuim", "5,4");
  formulier.set("uren", "24");
  formulier.set("niveau", "Senior met specialisatie");
  const gelezen = leesInvoer(formulier);
  assert.equal(gelezen.dienst, "verzuimsysteem");
  assert.equal(gelezen.verzuimPct, 5.4);
  assert.equal(gelezen.uren, 24);
  assert.equal(gelezen.niveau, "senior");
  assert.deepEqual(
    validate("offerte", {
      naam: "An de Vries",
      email: "an@example.com",
      telefoon: "0850870307",
      organisatie: "Voorbeeld B.V.",
      plaats: "Uden",
      medewerkers: "80",
      pakket: "Casemanagement",
      niveau: "Medior",
      situatie: "Structureel regelen",
      toestemming: "ja",
      verzuim: "5,4",
      samenvatting: "Vergelijking, peildatum 28 november 2026.",
      dienst: "casemanagement",
    }),
    [],
  );
  assert.ok(validate("offerte", { naam: "An", email: "an@example.com", toestemming: "ja" }).length > 0);
});

test("elk getoond marktbedrag heeft een https-bron", () => {
  for (const dienst of ["arbodienstverlening", "casemanagement", "verzuimsysteem"] as const) {
    const html = renderResultaat(markt, invoer({ dienst, medewerkers: 80 }));
    const iv = markt.interventies.find((item) => item.id === dienst);
    assert.ok(iv);
    for (const inzet of iv.aanbieders) {
      for (const regel of inzet.prijzen) {
        if (!html.includes(euro(regel.bedrag))) continue;
        assert.ok(html.includes(markt.bronnen[regel.bron].url), `${dienst} ${regel.label}`);
      }
      if (!inzet.prijzen.length) assert.match(html, /prijs niet openbaar/);
    }
    assert.doesNotMatch(html, /wij zijn geen|niet gevonden|te duur/i);
  }
});
