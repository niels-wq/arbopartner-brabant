import { site } from "../data/site.ts";
import { MARKET } from "./calc.ts";
import { euro } from "./format.ts";

/**
 * Bovenkant van de modulaire band die calc.ts noemt: €1.250 tot €2.600.
 * Geen apart tarief voor een langer traject. De band loopt daar verder, zonder gepubliceerd bedrag.
 */
export const spoor2BandTot = 2600;

/**
 * Richttarieven uit CALC_CONFIG van de referentie (werkhervattingskas.nl).
 * Te controleren tegen de tarieven 2027. Niet onze eigen prijslijst.
 * De tarievenpagina van de referentie noemt andere bedragen; die gebruiken we niet.
 */
export const marktRichttarieven = {
  psycholoog: 1800,
  coaching: 1500,
  loopbaan: 2000,
  outplacement: 4500,
  consultancyPerUur: 165,
} as const;

/** Vink “bulkafname” in de vergelijking: circa 10% van het richttarief. Indicatief. */
export const bulkVinkPercentage = 10;

/**
 * Staffel uit de rekenlogica van de referentie (bulk_drempel 5 / 10 / 20).
 * De begeleidende tekst daar noemt bij de derde trede soms 25 medewerkers.
 * Percentages zijn indicatief en horen gecontroleerd te worden.
 */
export const staffel = [
  { vanaf: 5, percentage: 10 },
  { vanaf: 10, percentage: 15 },
  { vanaf: 20, percentage: 20 },
] as const;

export const staffelToelichting =
  "Indicatieve staffel: vanaf 5 medewerkers circa 10%, vanaf 10 medewerkers circa 15%, vanaf 20 medewerkers circa 20% ten opzichte van het individuele tarief. Definitieve korting hangt af van de samenstelling van de groep en het type traject.";

export const disclaimer =
  "De richttarieven in deze vergelijking zijn indicatief: voor arbeidsdeskundig onderzoek en tweede spoor gaan we uit van onze eigen vanaf-tarieven, voor coaching, psychologische begeleiding, loopbaancoaching, outplacement en consultancy van gangbare tarieven in de markt. Geen officiële benchmark, en geen garantie voor uw specifieke situatie.";

export type DienstId =
  | "ad"
  | "spoor2-combi"
  | "spoor2-vol"
  | "psycholoog"
  | "coaching"
  | "loopbaan"
  | "outplacement"
  | "consultancy";

export type Prioriteit = "snelheid" | "vast-tarief" | "maatwerk";

export type TariefBron = "eigen-vanaf" | "markt";

export type Dienst = {
  id: DienstId;
  groep: string;
  label: string;
  /** Exclusief btw. Per traject, of per uur bij verzuimconsultancy. */
  bedrag: number;
  perUur: boolean;
  bron: TariefBron;
  bulk: boolean;
};

export const diensten: Dienst[] = [
  {
    id: "ad",
    groep: "Arbeidsdeskundig onderzoek",
    label: "Arbeidsdeskundig onderzoek (RAD)",
    bedrag: MARKET.adPrice,
    perUur: false,
    bron: "eigen-vanaf",
    bulk: true,
  },
  {
    id: "spoor2-combi",
    groep: "Tweede spoor",
    label: "Tweede spoor, combinatraject",
    bedrag: MARKET.spoor2Price,
    perUur: false,
    bron: "eigen-vanaf",
    bulk: true,
  },
  {
    id: "spoor2-vol",
    groep: "Tweede spoor",
    label: "Tweede spoor, volledig traject",
    bedrag: MARKET.spoor2Price,
    perUur: false,
    bron: "eigen-vanaf",
    bulk: true,
  },
  {
    id: "psycholoog",
    groep: "Begeleiding",
    label: "Psychologische begeleiding",
    bedrag: marktRichttarieven.psycholoog,
    perUur: false,
    bron: "markt",
    bulk: true,
  },
  {
    id: "coaching",
    groep: "Begeleiding",
    label: "Coaching",
    bedrag: marktRichttarieven.coaching,
    perUur: false,
    bron: "markt",
    bulk: true,
  },
  {
    id: "loopbaan",
    groep: "Begeleiding",
    label: "Loopbaancoaching",
    bedrag: marktRichttarieven.loopbaan,
    perUur: false,
    bron: "markt",
    bulk: true,
  },
  {
    id: "outplacement",
    groep: "Begeleiding",
    label: "Outplacement",
    bedrag: marktRichttarieven.outplacement,
    perUur: false,
    bron: "markt",
    bulk: true,
  },
  {
    id: "consultancy",
    groep: "Advies",
    label: "Verzuimconsultancy",
    bedrag: marktRichttarieven.consultancyPerUur,
    perUur: true,
    bron: "markt",
    bulk: false,
  },
];

export const prioriteiten: { id: Prioriteit; label: string }[] = [
  { id: "snelheid", label: "Snel resultaat" },
  { id: "vast-tarief", label: "Een vast, voorspelbaar tarief" },
  { id: "maatwerk", label: "Maatwerkbegeleiding" },
];

const wensTekst: Record<Prioriteit, string> = {
  snelheid: "Snel resultaat staat bij u voorop. Een lager bedrag helpt alleen als het traject ook snel start.",
  "vast-tarief":
    "Een vast, voorspelbaar tarief staat bij u voorop. Het richttarief is een indicatie. De offerte legt het bedrag vast.",
  maatwerk: "Maatwerkbegeleiding staat bij u voorop. Deze vergelijking gaat over het bedrag, niet over de aandacht per medewerker.",
};

export function dienstOpId(id: string): Dienst | undefined {
  return diensten.find((dienst) => dienst.id === id);
}

export function groepen(): { titel: string; diensten: Dienst[] }[] {
  const volgorde: string[] = [];
  for (const dienst of diensten) {
    if (!volgorde.includes(dienst.groep)) volgorde.push(dienst.groep);
  }
  return volgorde.map((titel) => ({
    titel,
    diensten: diensten.filter((dienst) => dienst.groep === titel),
  }));
}

export function bulkDiensten(): Dienst[] {
  return diensten.filter((dienst) => dienst.bulk);
}

export function staffelPercentage(aantal: number): number {
  const n = Math.floor(aantal);
  if (!Number.isFinite(n)) return 0;
  let percentage = 0;
  for (const trede of staffel) {
    if (n >= trede.vanaf) percentage = trede.percentage;
  }
  return percentage;
}

function rondCent(bedrag: number): number {
  return Math.round(bedrag * 100) / 100;
}

function bedragTekst(bedrag: number): string {
  return euro(bedrag, Number.isInteger(bedrag));
}

export function dienstToelichting(id: DienstId): string {
  if (id === "ad") {
    return `Het richttarief is het vanaf-bedrag van Matchvermogen: ${bedragTekst(MARKET.adPrice)} exclusief btw. Het onderzoek loopt via Matchvermogen. De casemanager doet dit onderzoek niet. Klanten van Arbopartner Brabant kunnen tot ${site.discount.arbeidsdeskundige}% korting krijgen. Die korting zit niet in dit richttarief. De offerte bevestigt het percentage.`;
  }
  if (id === "spoor2-combi" || id === "spoor2-vol") {
    const langer =
      id === "spoor2-vol"
        ? " Voor een volledig traject publiceert deze site geen apart vanaf-bedrag."
        : " Een combinatraject valt onder diezelfde onderkant.";
    return `Tweede spoor loopt via Best Match. Het richttarief is het vanaf-bedrag op deze site: ${bedragTekst(MARKET.spoor2Price)} exclusief btw. De band voor een modulair traject loopt tot ${bedragTekst(spoor2BandTot)}.${langer} Een langer traject kan boven die band liggen. Klanten kunnen tot ${site.discount.tweedeSpoor}% korting krijgen bij Best Match. Die korting zit niet in dit richttarief. De offerte bevestigt het percentage.`;
  }
  const dienst = dienstOpId(id);
  const eenheid = dienst?.perUur ? " per uur" : "";
  return `Dit richttarief${eenheid} komt uit gangbare tarieven in de markt, niet uit onze eigen prijslijst. We toetsen het nog aan de tarieven voor 2027.`;
}

export type Uitkomst = {
  dienst: DienstId;
  label: string;
  uwBedrag: number;
  richttarief: number;
  verschil: number;
  stand: "boven" | "op-of-onder";
  tekst: string;
  context: string;
  samenvatting: string;
};

export type VergelijkInput = {
  dienst: string;
  prioriteit: string;
  bedrag: number;
  uren?: number;
  uwvGarantie: boolean;
  bulk: boolean;
};

export function vergelijk(input: VergelijkInput): { ok: true; uitkomst: Uitkomst } | { ok: false; fout: string } {
  const dienst = dienstOpId(input.dienst);
  if (!dienst) return { ok: false, fout: "Kies een dienst." };
  if (input.prioriteit !== "snelheid" && input.prioriteit !== "vast-tarief" && input.prioriteit !== "maatwerk") {
    return { ok: false, fout: "Kies wat voor u het zwaarst weegt." };
  }
  if (!Number.isFinite(input.bedrag)) {
    return { ok: false, fout: "Vul het bedrag in dat u nu betaalt of aangeboden krijgt." };
  }
  if (input.bedrag < 0) return { ok: false, fout: "Vul een bedrag van nul of hoger in." };

  let uren = 1;
  if (dienst.perUur) {
    uren = input.uren ?? NaN;
    if (!Number.isFinite(uren) || uren < 1) {
      return { ok: false, fout: "Vul het aantal adviesuren in, minstens één." };
    }
  }

  let richttarief = dienst.bedrag * uren;
  if (input.bulk) richttarief *= 1 - bulkVinkPercentage / 100;
  richttarief = rondCent(richttarief);
  const uwBedrag = rondCent(input.bedrag);
  const verschil = rondCent(uwBedrag - richttarief);
  const stand = verschil > 0 ? "boven" : "op-of-onder";
  const urenDeel = dienst.perUur ? ` bij ${uren} adviesuren` : "";
  const bulkDeel = input.bulk ? " (met 10% indicatief bulkvoordeel op het richttarief)" : "";
  const kern =
    stand === "boven"
      ? `Uw bedrag van ${bedragTekst(uwBedrag)} ligt boven het richttarief van ${bedragTekst(richttarief)} voor ${dienst.label}${urenDeel}${bulkDeel}. Het verschil is ${bedragTekst(verschil)}.`
      : `Uw bedrag van ${bedragTekst(uwBedrag)} ligt op of onder het richttarief van ${bedragTekst(richttarief)} voor ${dienst.label}${urenDeel}${bulkDeel}. Een vrijblijvend gesprek kan zinvol zijn.`;

  let vinken: string;
  if (input.uwvGarantie && input.bulk) {
    vinken =
      "U geeft aan dat een UWV-garantie in het tarief zit en dat u in bulk afneemt. De vergelijking rekent daarom 10% van het richttarief af. Dat percentage is indicatief.";
  } else if (input.uwvGarantie) {
    vinken =
      "U geeft aan dat een UWV-garantie in het tarief zit. Bulkafname is niet aangevinkt. Bij meerdere medewerkers tegelijk kan een tarief lager liggen. Dat ziet u in de staffel hieronder.";
  } else if (input.bulk) {
    vinken =
      "Bulkafname is meegenomen als 10% op het richttarief. Dat percentage is indicatief. Een UWV-garantie is niet aangevinkt. Vraag uw aanbieder of de re-integratie bij een WIA-beoordeling is afgedekt.";
  } else {
    vinken = "UWV-garantie en bulkafname zijn niet aangevinkt. Beide zijn het waard om in de offerte na te vragen.";
  }

  const tekst = `${kern} ${wensTekst[input.prioriteit]} ${vinken}`;
  const context = dienstToelichting(dienst.id);
  return {
    ok: true,
    uitkomst: {
      dienst: dienst.id,
      label: dienst.label,
      uwBedrag,
      richttarief,
      verschil,
      stand,
      tekst,
      context,
      samenvatting: `${dienst.label}: uw bedrag ${bedragTekst(uwBedrag)}, richttarief ${bedragTekst(richttarief)}, verschil ${bedragTekst(verschil)}.`,
    },
  };
}

export type BulkUitkomst = {
  dienst: DienstId;
  label: string;
  aantal: number;
  percentage: number;
  stukprijs: number;
  losTotaal: number;
  bulkTotaal: number;
  besparing: number;
  tekst: string;
  samenvatting: string;
};

export function bulkVoordeel(dienstId: string, aantal: number): { ok: true; uitkomst: BulkUitkomst } | { ok: false; fout: string } {
  const dienst = dienstOpId(dienstId);
  if (!dienst || !dienst.bulk) return { ok: false, fout: "Kies een traject voor de staffel." };
  if (!Number.isFinite(aantal) || aantal < 1) return { ok: false, fout: "Vul het aantal medewerkers in." };
  const n = Math.floor(aantal);
  if (n > 9999) return { ok: false, fout: "Vul een aantal tot 9999 in." };
  const percentage = staffelPercentage(n);
  const stukprijs = dienst.bedrag;
  const losTotaal = rondCent(stukprijs * n);
  const bulkTotaal = rondCent(stukprijs * (1 - percentage / 100) * n);
  const besparing = rondCent(losTotaal - bulkTotaal);
  const persoon = n === 1 ? "medewerker" : "medewerkers";
  const kern =
    percentage === 0
      ? `Nog geen staffelkorting. Deze indicatie geldt vanaf 5 medewerkers tegelijk. Bij ${n} ${persoon} komt het totaal op ${bedragTekst(losTotaal)} uit, tegen het individuele tarief van ${bedragTekst(stukprijs)}.`
      : `Bij ${n} medewerkers tegelijk geldt een indicatieve staffelkorting van ${percentage}%. In plaats van ${bedragTekst(losTotaal)} bij individuele inkoop komt het totaal op ongeveer ${bedragTekst(bulkTotaal)} uit. Het verschil is ${bedragTekst(besparing)}. De begeleiding zelf verandert daardoor niet.`;
  const extra =
    dienst.id === "spoor2-vol" || dienst.id === "spoor2-combi"
      ? ` ${dienstToelichting(dienst.id)}`
      : "";
  const tekst = `${kern}${extra}`;
  return {
    ok: true,
    uitkomst: {
      dienst: dienst.id,
      label: dienst.label,
      aantal: n,
      percentage,
      stukprijs,
      losTotaal,
      bulkTotaal,
      besparing,
      tekst,
      samenvatting: `${dienst.label}, ${n} medewerkers: los ${bedragTekst(losTotaal)}, met indicatieve staffel ${bedragTekst(bulkTotaal)}.`,
    },
  };
}
