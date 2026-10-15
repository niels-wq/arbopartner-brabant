import { absenceCost, CBS, dayCost, TNO } from "./calc.ts";

export type ExitVariantId = "kosten" | "fouten";

/**
 * Iedereen ziet de kosten-check tot de test aan gaat.
 * Zet mode op "split" voor een gelijke verdeling, of op "fouten" om alleen de andere kop te tonen.
 * ?exit=kosten of ?exit=fouten dwingt één variant in die sessie.
 */
export const exitAbMode: "kosten" | "fouten" | "split" = "kosten";

export function pickExitVariant(input: {
  mode: "kosten" | "fouten" | "split";
  query: string | null;
  stored: string | null;
  random?: number;
}): ExitVariantId {
  if (input.query === "kosten" || input.query === "fouten") return input.query;
  if (input.stored === "kosten" || input.stored === "fouten") return input.stored;
  if (input.mode === "split") return (input.random ?? Math.random()) < 0.5 ? "kosten" : "fouten";
  return input.mode === "fouten" ? "fouten" : "kosten";
}

function bedrag(value: number): string {
  return new Intl.NumberFormat("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

function wrap(text: string, width = 86): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const voorbeeldMedewerkers = 50;
const voorbeeldLoon = TNO.referenceWage;
const voorbeeldPct = CBS.size10to100;
const voorbeeldDag = dayCost(voorbeeldLoon);
const voorbeeldJaar = absenceCost(voorbeeldMedewerkers, voorbeeldPct, voorbeeldLoon);

const kostenBody = [
  "Voor werkgevers, HR en mkb-eigenaren in Noord-Brabant.",
  "Werkblad, geen advies over een dossier en geen belofte dat verzuim daalt.",
  "",
  ...wrap(
    "De som is: aantal medewerkers, maal het verzuimpercentage, maal 220 werkdagen, maal de dagkosten.",
  ),
  ...wrap(`Bron: ${TNO.sourceLabel}.`),
  ...wrap(
    `Bij een jaarloon van EUR ${bedrag(TNO.referenceWage)} is de puntsschatting ongeveer EUR ${bedrag(TNO.pointEstimate)} per verzuimdag. Dat is loondoorbetaling ${bedrag(TNO.wagePay)}, vervanging ${bedrag(TNO.replacement)}, productieverlies ${bedrag(TNO.productivity)}, arbo ${bedrag(TNO.arbo)} en begeleiding ${bedrag(TNO.guidance)}.`,
  ),
  ...wrap(
    "Alleen het loongerelateerde deel schaalt mee met het jaarloon. Arbo en begeleiding blijven vast. TNO noemt ook een bandbreedte. Dit blad gebruikt de puntsschatting.",
  ),
  "",
  "Vul uw eigen cijfers in:",
  "Medewerkers: ______",
  "Jaarloon per medewerker: ______",
  "Verzuimpercentage: ______",
  "",
  ...wrap(
    `CBS StatLine 80072ned, ter vergelijking, niet als uw cijfer: Nederland ${bedrag(CBS.nl2025)} procent, 10 tot 100 werknemers ${bedrag(CBS.size10to100)} procent, 100 of meer ${bedrag(CBS.size100plus)} procent. Een Brabants gemiddelde publiceren we niet.`,
  ),
  "",
  "Rekenvoorbeeld, niet uw bedrijf:",
  ...wrap(
    `${voorbeeldMedewerkers} medewerkers, jaarloon EUR ${bedrag(voorbeeldLoon)}, verzuim ${bedrag(voorbeeldPct)} procent. Dagkosten EUR ${bedrag(voorbeeldDag)}. Jaarkosten EUR ${bedrag(voorbeeldJaar)}.`,
  ),
  "",
  ...wrap("Uw eigen som staat op arbopartnerbrabant.nl/verzuimkosten-berekenen. U kiest daar zelf een scenario."),
  ...wrap(
    "De verzuimanalyse van EUR 995 blijft een apart rapport. Deze check is dat rapport niet, en maakt die prijs niet gratis.",
  ),
  "",
  "Niels Alderding, Arbopartner Brabant, een label van Matchvermogen B.V.",
  "Losplaats 16d, 5404 NJ Uden. 085-0870307. info@matchvermogen.nl.",
].join("\n");

const foutenBody = [
  "Voor werkgevers, HR en mkb-eigenaren in Noord-Brabant.",
  "Algemene informatie. Geen oordeel over uw map en geen voorspelling van UWV.",
  "",
  ...wrap(
    "Een loonsanctie betekent maximaal 52 weken extra loon aan de medewerker, na de eerste 104 weken ziekte. Het is geen boete die u naar UWV overmaakt. Tijdens de sanctie geldt het opzegverbod. Bron: UWV, beoordeling van het re-integratieverslag, en UWV over ontslag na twee jaar ziekte.",
  ),
  "",
  ...wrap(
    "UWV beschreef dat bij 85 procent van de opgelegde verlengingen de re-integratie niet, te laat of verkeerd was opgepakt. Bron: UWV, toetsing van het re-integratieverslag (2018).",
  ),
  "",
  "[ ] 1. Geen probleemanalyse rond week 6, of een analyse die de leidinggevende niet gebruikt.",
  "[ ] 2. Plan van aanpak rond week 8 te laat of te vaag: zonder activiteiten, eigenaar en twee handtekeningen.",
  "[ ] 3. Eerstejaarsevaluatie rond week 52 overgeslagen, of wel besproken en niet opgeschreven.",
  "[ ] 4. Tweede spoor pas in de laatste maanden, terwijl eigen werk al eerder geen perspectief had.",
  "[ ] 5. De bedrijfsarts te laat of niet ingeschakeld. Een leidinggevende is geen arts.",
  "[ ] 6. Afspraken alleen mondeling. UWV leest wat op papier staat, niet wat u nog weet.",
  "[ ] 7. De medewerker niet echt betrokken, of een vertrek voordat passend werk is geprobeerd.",
  "",
  ...wrap(
    "Week 42 is de ziekmelding bij UWV. Te laat melden geeft administratieve rompslomp. Dat is iets anders dan de loonsanctie hierboven.",
  ),
  ...wrap(
    "Herstelt u de tekorten, dan kunt u een bekortingsverzoek doen. UWV schrijft dat zo'n verzoek binnen drie weken kan worden beoordeeld. Tot die tijd betaalt u door.",
  ),
  "",
  "Niels Alderding, Arbopartner Brabant, een label van Matchvermogen B.V.",
  "Losplaats 16d, 5404 NJ Uden. 085-0870307. info@matchvermogen.nl.",
].join("\n");

export const exitPersonal =
  "Ik ben Niels. Dit blad gebruikt de bronnen, geen mooier verhaal. Een kop koffie om het door te nemen mag daarna, vrijblijvend.";

export const exitMagnets: Record<
  ExitVariantId,
  { id: ExitVariantId; title: string; lede: string; button: string; fileName: string; body: string }
> = {
  kosten: {
    id: "kosten",
    title: "Wat kost uw verzuim u écht?",
    lede: "Ontvang gratis de verzuimkosten-check voor Brabantse werkgevers.",
    button: "Stuur mij de check",
    fileName: "arbopartner-verzuimkosten-check.pdf",
    body: kostenBody,
  },
  fouten: {
    id: "fouten",
    title: "Checklist: 7 fouten die u een loonsanctie kunnen kosten",
    lede: "Gratis PDF voor het re-integratiedossier van Brabantse werkgevers.",
    button: "Stuur mij de checklist",
    fileName: "arbopartner-re-integratie-checklist.pdf",
    body: foutenBody,
  },
};

export const exitAudience = "Voor werkgevers, HR en mkb-eigenaren in Noord-Brabant met verzuim.";

export const exitVoorbeeld = {
  medewerkers: voorbeeldMedewerkers,
  loon: voorbeeldLoon,
  pct: voorbeeldPct,
  dag: voorbeeldDag,
  jaar: voorbeeldJaar,
};
