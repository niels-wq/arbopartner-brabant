/**
 * Twee praktijkvoorbeelden, anoniem, op feiten van Niels Alderding.
 * Geen bedrijfsnaam, geen extra cijfer, geen extra naam.
 * De publicatiedatum is de datum van deze tekst, niet de datum van de opdracht.
 */
export const praktijkDatum = "2026-10-25";
export const praktijkDatumLabel = "25 oktober 2026";

export const ervaring =
  "Meer dan tien jaar ervaring in HR, verzuim, arbeidsdeskundige expertise en bezwaar. We zien welke knoppen gedraaid moeten worden. Snel handelen bij acuut verzuim levert veel verzuimreductie op.";

export type PraktijkCase = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  teaser: string;
  situatie: string;
  stappen: { title: string; text: string }[];
  resultaat: string;
  grens: string;
  related: { href: string; label: string }[];
  faq: { q: string; a: string }[];
};

export const praktijkCases: PraktijkCase[] = [
  {
    slug: "fietsfabrikant-reorganisatie",
    title: "Grote Brabantse fietsfabrikant – reorganisatie",
    h1: "Grote Brabantse fietsfabrikant: verzuim bij reorganisatie",
    description:
      "Anoniem praktijkvoorbeeld. Bij een grote fietsfabrikant in Brabant liep het verzuim door een reorganisatie extreem op. Dossiers en termijnen bleven liggen. Door snel handelen en op de bal zitten hebben we zeer veel loonsancties voorkomen.",
    teaser:
      "Door een reorganisatie liep het verzuim extreem op. Dossiers en termijnen bleven liggen. Snel handelen en op de bal zitten voorkwam zeer veel loonsancties.",
    situatie:
      "Bij een grote fietsfabrikant in Brabant liep het verzuim door een reorganisatie extreem op. Er bleef van alles liggen: dossiers en termijnen. De bedrijfsnaam publiceren we niet.",
    stappen: [
      {
        title: "Wat er lag",
        text: "We zetten op een rij wat was blijven liggen: de dossiers en de termijnen.",
      },
      {
        title: "Snel handelen",
        text: "Wat acuut was, pakten we eerst op. De reorganisatie liep intussen door.",
      },
      {
        title: "Op de bal",
        text: "We bleven op de bal zitten bij de lopende trajecten, zodat die termijnen niet opnieuw bleven liggen.",
      },
    ],
    resultaat:
      "Door snel te handelen en op de bal te blijven zitten, hebben we zeer veel loonsancties voorkomen.",
    grens:
      "Dit is de uitkomst van dit praktijkvoorbeeld. Voor een andere werkgever beloven we die uitkomst niet. UWV beslist over een loonsanctie. Het ontslag en een vaststellingsovereenkomst doet uw jurist.",
    related: [
      { href: "/diensten/reorganisatie-verzuim", label: "Reorganisatie en verzuim" },
      { href: "/spoedhulp", label: "Spoedhulp verzuim" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/diensten/functiehuis-opstellen", label: "Functiehuis opstellen" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    faq: [
      {
        q: "Welke fietsfabrikant was dit?",
        a: "De bedrijfsnaam publiceren we niet. Het gaat om een grote fietsfabrikant in Brabant.",
      },
      {
        q: "Hoeveel loonsancties zijn voorkomen?",
        a: "Zeer veel. Een aantal zetten we er niet bij. Dat cijfer hebben we hier niet gepubliceerd.",
      },
      {
        q: "Is dit een review?",
        a: "Nee. Dit is een anoniem praktijkvoorbeeld uit ons eigen werk. Er staat geen citaat van een opdrachtgever bij.",
      },
      {
        q: "Voorkomen jullie bij mij ook een loonsanctie?",
        a: "Dat beloven we niet. In dit voorbeeld hebben we zeer veel loonsancties voorkomen. Bij een ander dossier beslist UWV. Een loonsanctie nemen we niet weg.",
      },
    ],
  },
  {
    slug: "totaalanalyse-verzuim-erd",
    title: "Totaalanalyse verzuim en ERD",
    h1: "Totaalanalyse van verzuim en eigenrisicodragerschap",
    description:
      "Anoniem praktijkvoorbeeld. Totaalanalyse van het verzuim, de infrastructuur (systemen en processen) en alle kosten op ERD-vlak: WGA, Ziektewet en interventies. Besparing van meer dan €400.000, meer dan 4 ton.",
    teaser:
      "Totaalanalyse van verzuim, systemen, processen en alle kosten op ERD-vlak (WGA, Ziektewet en interventies). Besparing van meer dan 4 ton.",
    situatie:
      "Het verzuimstuk, de infrastructuur en de kosten van eigenrisicodragerschap vroegen om één totaalanalyse. De werkgever blijft anoniem. Een bedrijfsnaam publiceren we niet.",
    stappen: [
      {
        title: "Het verzuim",
        text: "We analyseerden het verzuimstuk als geheel.",
      },
      {
        title: "De infrastructuur",
        text: "We keken naar de systemen en de processen.",
      },
      {
        title: "ERD, WGA, Ziektewet en interventies",
        text: "We zetten alle kosten op ERD-vlak op een rij: de WGA, de Ziektewet en de interventies.",
      },
    ],
    resultaat: "De besparing was meer dan €400.000. Meer dan 4 ton.",
    grens:
      "Meer dan 4 ton hoort bij deze totaalanalyse. We rekenen dat bedrag niet om naar een belofte voor een andere organisatie. Een uitsplitsing publiceren we niet.",
    related: [
      { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    faq: [
      {
        q: "Waar komt meer dan 4 ton vandaan?",
        a: "Uit deze totaalanalyse: het verzuimstuk, de infrastructuur van systemen en processen, en alle kosten op ERD-vlak, de WGA, de Ziektewet en de interventies. De besparing was meer dan €400.000. Een uitsplitsing publiceren we niet.",
      },
      {
        q: "Welke werkgever was dit?",
        a: "De bedrijfsnaam publiceren we niet. Dit voorbeeld blijft anoniem.",
      },
      {
        q: "Is dit een review?",
        a: "Nee. Dit is een anoniem praktijkvoorbeeld uit ons eigen werk, geen citaat van een opdrachtgever.",
      },
      {
        q: "Krijgt mijn organisatie ook meer dan €400.000 terug?",
        a: "Dat beloven we niet. Meer dan 4 ton is de besparing in dit voorbeeld. Een andere organisatie krijgt een eigen analyse.",
      },
    ],
  },
];

export function praktijkBySlug(slug: string) {
  return praktijkCases.find((item) => item.slug === slug);
}

export function praktijkEerst(slug: string) {
  const first = praktijkCases.find((item) => item.slug === slug);
  if (!first) return praktijkCases;
  return [first, ...praktijkCases.filter((item) => item.slug !== slug)];
}
