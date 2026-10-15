export type Review = {
  quote: string;
  name: string;
  organisation: string;
  date: string;
  dateIso: string;
  sourceUrl: string;
  sourceLabel: string;
};

const source = "https://matchvermogen.nl/referenties/";

/** Letterlijke citaten van matchvermogen.nl/referenties/, geraadpleegd op 15 oktober 2026. */
export const reviews: Review[] = [
  {
    quote:
      "Wij werken al langere tijd samen met Matchvermogen, ze zijn zeer deskundig en komen met uitgebreide en prettige adviezen. Ook wordt er heel gericht meegedacht. Ik kan ze alleen maar aanbevelen zowel voor werkgever als werknemer een prettige sparringspartner!",
    name: "Danine Gerritsen",
    organisation: "OneLane (voorheen De Jong & Laan)",
    date: "12 oktober 2026",
    dateIso: "2026-10-12",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Het arbeidsdeskundig onderzoek is vlot doorlopen en de rapportage is helder onderbouwd. Afspraken worden netjes nagekomen, wat zorgt voor een prettige samenwerking",
    name: "Heidi Wichems",
    organisation: "Buurtzorg Nederland",
    date: "29 september 2026",
    dateIso: "2026-09-29",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Zeer goede ervaring met Matchvermogen. Matchvermogen doet er alles aan om samen met jou tot de beste oplossing te komen. Sterk klant gericht",
    name: "Harry Limburg",
    organisation: "Firma Brandwacht",
    date: "1 juli 2026",
    dateIso: "2026-07-01",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Ik heb een zeer fijne ervaring gehad met Match vermogen. Vanaf de eerste mail nemen ze je mee in de stappen die je moet zetten zodat er een helder en compleet gesprek kan volgen. Ze nemen de ruimte om je vragen te beantwoorden en adviseren je op een professionele manier.",
    name: "Femke Aarts",
    organisation: "De Lentemorgen",
    date: "9 september 2026",
    dateIso: "2026-09-09",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Ronald en de backoffice van Matchvermogen reageren altijd snel, zijn professioneel en begrijpen precies wat wij willen. De samenwerking verloopt soepel en prettig.",
    name: "Raimonda Kasparaviciute",
    organisation: "VDP meat",
    date: "3 maart 2026",
    dateIso: "2026-03-03",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Vanaf het eerste contact tot het uiteindelijke AD rapport erg tevreden over de service en inhoud. Professioneel, duidelijk en snelle respons.",
    name: "Wendy de Smit",
    organisation: "Dredging and Contracting Rotterdam BV",
    date: "13 maart 2026",
    dateIso: "2026-03-13",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Dienstverlening was snel, accuraat en professioneel. Er werd goed geluisterd en op basis daarvan werd het arbeidsdeskundig onderzoek opgesteld.",
    name: "Ron van’t Hoog",
    organisation: "Royal Flora Holland",
    date: "29 mei 2025",
    dateIso: "2025-05-29",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Niels en zijn team werken snel, efficient en doelmatig. De lijnen zijn altijd kort, wat ik heel prettig vind. Wij zetten Matchvermogen voornamelijk in voor AD-onderzoeken. De rapportages zijn inhoudelijk op orde. Je kunt zien dat ze hun onderzoek uitgebreid doen. Verder zijn de rapporten ook visueel sterk. Door middel van grafieken en modellen wordt goed inzichtelijk gemaakt wat de kansen en prognose van een arbeidsongeschikte medewerker zijn. Kortom: zeer tevreden!",
    name: "Loes Hoefnagels",
    organisation: "BAM Nederland",
    date: "7 januari 2022",
    dateIso: "2022-01-07",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
  {
    quote:
      "Niels en zijn team verzorgen voor Fieldin de bezwaarprocedures inzake de WGA/WHK. De werkzaamheden worden vakkundig en gestructureerd uitgevoerd. Met regelmaat informeert Niels ons over de voortgang en vervolgacties. Matchvermogen & Best Match Re-integratie zijn fijne partijen om mee samen te werken.",
    name: "Remco Melis",
    organisation: "Fieldin",
    date: "3 januari 2021",
    dateIso: "2021-01-03",
    sourceUrl: source,
    sourceLabel: "matchvermogen.nl/referenties",
  },
];

export const reviewNotice =
  "Review van ons zustermerk Matchvermogen. Deze citaten gaan over de dienstverlening van Matchvermogen, het moederbedrijf. Arbopartner Brabant is een nieuw label en heeft nog geen eigen reviews. De teksten zijn letterlijk overgenomen en niet als beoordeling van dit label gemarkeerd.";
