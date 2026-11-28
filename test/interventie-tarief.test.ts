import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { MARKET } from "../src/lib/calc.ts";
import {
  bulkVoordeel,
  disclaimer,
  dienstOpId,
  marktRichttarieven,
  spoor2BandTot,
  staffelPercentage,
  vergelijk,
} from "../src/lib/interventie-tarief.ts";

const lees = (pad: string) => readFileSync(pad, "utf8");

test("arbeidsdeskundig onderzoek en tweede spoor gebruiken de vanaf-tarieven van deze site", () => {
  assert.equal(dienstOpId("ad")?.bedrag, MARKET.adPrice);
  assert.equal(MARKET.adPrice, 999);
  assert.equal(dienstOpId("spoor2-combi")?.bedrag, MARKET.spoor2Price);
  assert.equal(dienstOpId("spoor2-vol")?.bedrag, MARKET.spoor2Price);
  assert.equal(MARKET.spoor2Price, 1250);
  assert.equal(spoor2BandTot, 2600);
  assert.notEqual(dienstOpId("ad")?.bedrag, 1095);
  assert.notEqual(dienstOpId("ad")?.bedrag, 1295);
  assert.notEqual(dienstOpId("spoor2-combi")?.bedrag, 2500);
  assert.notEqual(dienstOpId("spoor2-vol")?.bedrag, 4500);
  assert.match(lees("src/lib/calc.ts"), /€1\.250 tot €2\.600/);
  assert.match(lees("src/lib/calc.ts"), /vanaf €999/);
});

test("overige richttarieven komen uit de referentie en wijken van de tarievenpagina daar af", () => {
  assert.equal(marktRichttarieven.psycholoog, 1800);
  assert.equal(marktRichttarieven.coaching, 1500);
  assert.equal(marktRichttarieven.loopbaan, 2000);
  assert.equal(marktRichttarieven.outplacement, 4500);
  assert.equal(marktRichttarieven.consultancyPerUur, 165);
  assert.equal(dienstOpId("consultancy")?.perUur, true);
  assert.equal(dienstOpId("coaching")?.perUur, false);
});

test("de vergelijking zet het totaalbedrag naast het richttarief", () => {
  const boven = vergelijk({
    dienst: "ad",
    prioriteit: "snelheid",
    bedrag: 1500,
    uwvGarantie: true,
    bulk: false,
  });
  assert.equal(boven.ok, true);
  if (!boven.ok) return;
  assert.equal(boven.uitkomst.richttarief, 999);
  assert.equal(boven.uitkomst.verschil, 501);
  assert.equal(boven.uitkomst.stand, "boven");
  assert.match(boven.uitkomst.tekst, /boven het richttarief/);
  assert.match(boven.uitkomst.tekst, /Snel resultaat staat bij u voorop/);
  assert.match(boven.uitkomst.tekst, /UWV-garantie/);
  assert.match(boven.uitkomst.context, /Matchvermogen/);
  assert.equal(boven.uitkomst.context.includes("Best Match"), false);

  const metBulk = vergelijk({
    dienst: "ad",
    prioriteit: "vast-tarief",
    bedrag: 999,
    uwvGarantie: false,
    bulk: true,
  });
  assert.equal(metBulk.ok, true);
  if (!metBulk.ok) return;
  assert.equal(metBulk.uitkomst.richttarief, 899.1);
  assert.equal(metBulk.uitkomst.stand, "boven");
  assert.match(metBulk.uitkomst.tekst, /10% indicatief bulkvoordeel/);

  const onder = vergelijk({
    dienst: "coaching",
    prioriteit: "maatwerk",
    bedrag: 900,
    uwvGarantie: false,
    bulk: false,
  });
  assert.equal(onder.ok, true);
  if (!onder.ok) return;
  assert.equal(onder.uitkomst.richttarief, 1500);
  assert.equal(onder.uitkomst.stand, "op-of-onder");
  assert.match(onder.uitkomst.context, /gangbare tarieven in de markt/);

  const uren = vergelijk({
    dienst: "consultancy",
    prioriteit: "vast-tarief",
    bedrag: 1000,
    uren: 8,
    uwvGarantie: true,
    bulk: true,
  });
  assert.equal(uren.ok, true);
  if (!uren.ok) return;
  assert.equal(uren.uitkomst.richttarief, 1188);
  assert.match(uren.uitkomst.tekst, /8 adviesuren/);

  const spoor = vergelijk({
    dienst: "spoor2-vol",
    prioriteit: "maatwerk",
    bedrag: 1250,
    uwvGarantie: false,
    bulk: false,
  });
  assert.equal(spoor.ok, true);
  if (!spoor.ok) return;
  assert.equal(spoor.uitkomst.richttarief, 1250);
  assert.equal(spoor.uitkomst.stand, "op-of-onder");
  assert.match(spoor.uitkomst.context, /Best Match/);
  assert.match(spoor.uitkomst.context, /€\s?2\.600|€\s?2600|2\.600/);
  assert.equal(/onderzoek loopt via Matchvermogen/.test(spoor.uitkomst.context), false);
});

test("ontbrekende invoer krijgt een Nederlandse fout, geen bedrag", () => {
  assert.match(vergelijk({ dienst: "ad", prioriteit: "", bedrag: 100, uwvGarantie: false, bulk: false }).ok ? "" : "prioriteit", /prioriteit|zwaarst/);
  const zonderPrioriteit = vergelijk({ dienst: "ad", prioriteit: "", bedrag: 100, uwvGarantie: false, bulk: false });
  assert.equal(zonderPrioriteit.ok, false);
  if (!zonderPrioriteit.ok) assert.match(zonderPrioriteit.fout, /zwaarst weegt/);
  const zonderBedrag = vergelijk({ dienst: "ad", prioriteit: "snelheid", bedrag: Number.NaN, uwvGarantie: false, bulk: false });
  assert.equal(zonderBedrag.ok, false);
  const negatief = vergelijk({ dienst: "ad", prioriteit: "snelheid", bedrag: -1, uwvGarantie: false, bulk: false });
  assert.equal(negatief.ok, false);
  const zonderUren = vergelijk({ dienst: "consultancy", prioriteit: "snelheid", bedrag: 100, uren: 0, uwvGarantie: false, bulk: false });
  assert.equal(zonderUren.ok, false);
});

test("de staffel volgt de rekenlogica: 5, 10 en 20, indicatief", () => {
  assert.equal(staffelPercentage(1), 0);
  assert.equal(staffelPercentage(4), 0);
  assert.equal(staffelPercentage(5), 10);
  assert.equal(staffelPercentage(9), 10);
  assert.equal(staffelPercentage(10), 15);
  assert.equal(staffelPercentage(19), 15);
  assert.equal(staffelPercentage(20), 20);
  assert.equal(staffelPercentage(25), 20);

  const tien = bulkVoordeel("coaching", 10);
  assert.equal(tien.ok, true);
  if (!tien.ok) return;
  assert.equal(tien.uitkomst.percentage, 15);
  assert.equal(tien.uitkomst.losTotaal, 15000);
  assert.equal(tien.uitkomst.besparing, 2250);
  assert.equal(tien.uitkomst.bulkTotaal, 12750);

  const klein = bulkVoordeel("ad", 4);
  assert.equal(klein.ok, true);
  if (!klein.ok) return;
  assert.equal(klein.uitkomst.percentage, 0);
  assert.equal(klein.uitkomst.losTotaal, 3996);
  assert.equal(bulkVoordeel("consultancy", 10).ok, false);
});

test("de pagina, het menu, de footer, de tarievenpagina en de disclaimer horen bij elkaar", () => {
  const pagina = lees("src/pages/tools/interventie-check.astro");
  const component = lees("src/components/calculators/InterventieCheck.astro");
  const header = lees("src/components/Header.astro");
  const footer = lees("src/components/Footer.astro");
  const tarieven = lees("src/pages/tarieven.astro");
  const overzicht = lees("src/pages/tools/index.astro");
  const script = lees("src/scripts/interventie-check.ts");
  const lead = lees("src/components/InlineLead.astro");

  assert.equal(
    disclaimer,
    "De richttarieven in deze vergelijking zijn indicatief: voor arbeidsdeskundig onderzoek en tweede spoor gaan we uit van onze eigen vanaf-tarieven, voor coaching, psychologische begeleiding, loopbaancoaching, outplacement en consultancy van gangbare tarieven in de markt. Geen officiële benchmark, en geen garantie voor uw specifieke situatie.",
  );
  assert.match(component, /\{disclaimer\}/);
  assert.match(pagina, /InterventieCheck modus="volledig"/);
  assert.match(pagina, /faqLd\(faq\)/);
  assert.match(pagina, /title="Interventietarief checker"/);
  assert.match(pagina, /35 tot 500 medewerkers/);
  assert.match(pagina, /Arbeidsdeskundig onderzoek loopt via Matchvermogen/);
  assert.match(pagina, /Tweede spoor loopt via Best Match/);
  assert.match(component, /Vraag een vrijblijvend gesprek aan/);
  assert.match(component, /InlineLead/);
  assert.match(component, /source="interventie-check"/);
  assert.equal(component.includes('name="naam"'), false);
  assert.equal(component.includes('type="email"'), false);
  assert.equal(component.includes('type="tel"'), false);
  assert.match(lead, /data-endpoint="\/api\/advies"/);
  assert.match(lead, /name="toestemming"/);
  assert.match(lead, /href="\/privacy"/);
  assert.match(lead, /name="company_website"/);
  assert.match(lead, /scripts\/forms\.ts/);
  assert.match(lees("src/scripts/forms.ts"), /form-guard/);
  assert.match(script, /name="vraag"/);
  assert.match(header, /\/tools\/interventie-check/);
  assert.match(footer, /\/tools\/interventie-check/);
  assert.match(overzicht, /\/tools\/interventie-check/);
  assert.match(tarieven, /InterventieCheck modus="compact"/);
  assert.match(lees("astro.config.mjs"), /sitemap/);
  assert.equal(/poortwachter/i.test(pagina + component + script), false);
  assert.equal(/wij zijn geen/i.test(pagina + component), false);
  assert.equal(pagina.includes("Figure"), false);
  assert.equal(pagina.includes("<img"), false);
  assert.match(lees("src/styles/global.css"), /padding-bottom: calc\(4\.6rem \+ env\(safe-area-inset-bottom\)\)/);
});
