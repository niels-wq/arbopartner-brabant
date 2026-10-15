import { euro, pct } from "./format";
import { hourlySavingPct, levels, monthlyCost, verzuimanalysePrijs, type Block, type LevelId } from "./rates";

export type PackageSlug = "basis" | "premium" | "pro";

export const packages: {
  slug: PackageSlug;
  name: string;
  concrete: string;
  hours: Block;
  offer: string;
  summary: string;
  outcomes: string[];
  featured: boolean;
  report: string;
  analysis: string;
  people: string;
}[] = [
  {
    slug: "basis",
    name: "Basis",
    concrete: "Vast gezicht",
    hours: 10,
    offer: "Basis, 10 uur",
    summary: "Tien uur per week voor de lopende dossiers, zonder rapportageverplichting.",
    outcomes: [
      "Lopende dossiers hebben één vast gezicht, in plaats van wisselende inhuur.",
      "U houdt tien uur per week voor de begeleiding, zonder een kwartaalrapport erbij.",
      "U kunt later naar twintig uur. Tot die tijd geldt het 10-uurtarief.",
      `Een verzuimanalyse zit er niet bij. Los kost die ${euro(verzuimanalysePrijs, true)}.`,
    ],
    featured: false,
    report: "Nee",
    analysis: `Los, ${euro(verzuimanalysePrijs, true)}`,
    people: "Eén casemanager",
  },
  {
    slug: "premium",
    name: "Premium",
    concrete: "Regie op de dossiers",
    hours: 20,
    offer: "Premium, 20 uur",
    summary: "Twintig uur per week, met elk kwartaal overzicht en in het eerste jaar een verzuimanalyse.",
    outcomes: [
      "Elk kwartaal ziet u instroom, duur en dossiers zonder plan.",
      `In het eerste jaar zit de verzuimanalyse van ${euro(verzuimanalysePrijs, true)} in het blok.`,
      "Er is ruimte om leidinggevenden te coachen, niet alleen dossiers te schrijven.",
      "U kiest zelf medior, medior+ of senior.",
    ],
    featured: true,
    report: "Elk kwartaal",
    analysis: `Inbegrepen in jaar 1 (${euro(verzuimanalysePrijs, true)})`,
    people: "Eén casemanager",
  },
  {
    slug: "pro",
    name: "Pro",
    concrete: "Bezetting bij complexe dossiers",
    hours: 24,
    offer: "Pro, 24+ uur",
    summary: "Vanaf 24 uur per week. Vanaf 30 uur werken twee casemanagers, zodat vakantie of ziekte de dossiers niet stillegt.",
    outcomes: [
      "Vanaf 24 uur per week iemand op grotere of complexere dossiers.",
      "Vanaf 30 uur twee casemanagers op uw dossiers.",
      "Het uurtarief blijft het 24+-tarief, ook als u meer dan 24 uur afneemt.",
      "U krijgt wat Premium biedt: kwartaalrapportage en in jaar 1 de verzuimanalyse.",
    ],
    featured: false,
    report: "Elk kwartaal",
    analysis: "Inbegrepen in jaar 1, omdat Pro Premium overneemt",
    people: "Twee casemanagers vanaf 30 uur",
  },
];

export const riskReversal =
  "Vrijblijvend kennismaken: een adviesgesprek van 30 minuten. U hoeft niets af te nemen. Een maandelijkse opzegtermijn staat niet vast; die hoort in de offerte en beloven we hier niet.";

export const centerStage =
  "Premium staat in het midden omdat we dat blok als eerste voorleggen als de omvang nog niet vaststaat. We noemen het niet het meest gekozen pakket: dit label heeft nog geen eigen klanten, dus dat cijfer bestaat niet.";

export function monthLine(hours: number, hourly: number): string {
  return `${hours} × ${euro(hourly)} × 52 / 12 = ${euro(monthlyCost(hours, hourly))}`;
}

export function savingLine(level: LevelId, block: Block): string | null {
  if (block === 10) return null;
  const base = levels[level].rates[10];
  const rate = levels[level].rates[block];
  return `Bespaar ${pct(hourlySavingPct(level, block))} t.o.v. 10 uur. Dat is het uurtarief: (${euro(base)} − ${euro(rate)}) / ${euro(base)}. Het maandbedrag ligt hoger, omdat u meer uren afneemt.`;
}

export function priceFaq() {
  const medior = levels.medior;
  return [
    {
      q: "Hoe is het maandbedrag berekend?",
      a: `Uren per week × uurtarief × 52 weken / 12. We ronden niet af naar een mooi bedrag. Bij medior en 10 uur is dat ${monthLine(10, medior.rates[10])} per maand, exclusief btw.`,
    },
    {
      q: "Wat betekent de badge over 10 uur?",
      a: `Alleen het uurtarief ligt lager dan het 10-uurtarief van hetzelfde niveau. Bij medior en 20 uur: (${euro(medior.rates[10])} − ${euro(medior.rates[20])}) / ${euro(medior.rates[10])} = ${pct(hourlySavingPct("medior", 20))}. Bij 24 uur of meer: (${euro(medior.rates[10])} − ${euro(medior.rates[24])}) / ${euro(medior.rates[10])} = ${pct(hourlySavingPct("medior", 24))}. Het maandbedrag ligt hoger, omdat u meer uren afneemt. Het is geen korting op de factuur van een kleiner blok.`,
    },
    {
      q: "Waarom staat Premium in het midden?",
      a: centerStage,
    },
    {
      q: "Kan ik maandelijks opzeggen?",
      a: "Dat staat niet vast. De opzegtermijn hoort in de offerte en is nog niet als standaard vastgelegd. Wat wel vaststaat: het adviesgesprek van 30 minuten verplicht u tot niets.",
    },
    {
      q: "Zijn dit vaste prijzen?",
      a: "Nee. Het zijn richtprijzen exclusief btw. De offerte bevestigt het tarief voor uw situatie.",
    },
    {
      q: "Zit reistijd in het tarief?",
      a: "Ja, binnen ongeveer 45 minuten rijden van Uden. We rekenen kilometers niet na.",
    },
    {
      q: "Wat kost een verzuimanalyse los?",
      a: `${euro(verzuimanalysePrijs, true)} exclusief btw. In Premium zit de analyse het eerste jaar inbegrepen. Pro neemt Premium over, dus daar zit zij in jaar 1 ook bij.`,
    },
    {
      q: "Rekenen jullie ook een prijs per casus?",
      a: "Nee. De tabel heeft alleen uurtarieven bij 10, 20 en 24 of meer uur per week. Een bedrag per casus zou een nieuwe prijs zijn, en die verzinnen we niet.",
    },
  ];
}
