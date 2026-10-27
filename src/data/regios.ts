import { places } from "./places.ts";

export const uwvBesluitUrl = "https://wetten.overheid.nl/BWBR0049194/";
export const uwvRegios2026Url =
  "https://www.samenvoordeklant.nl/sites/default/files/bestandsbijlage/Arbeidsmarktregios_van_Nederland_per_01-01-2026_0.pdf";

export const dienstLinks = [
  { href: "/diensten/casemanager-detachering", label: "Casemanagement" },
  { href: "/diensten/eerste-spoor", label: "Eerste spoor" },
  { href: "/diensten/tweede-spoor", label: "Spoor 2" },
  { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
  { href: "/diensten/reorganisatie-verzuim", label: "Reorganisatie en verzuim" },
] as const;

export const toetsLinks = [
  { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór WIA" },
  { href: "/diensten/eerstejaarsevaluatie", label: "Eerstejaarsevaluatie" },
  { href: "/diensten/bezwaar-beroep", label: "Bezwaar en beroep" },
  { href: "/diensten/second-opinion-verzuim", label: "Second opinion" },
  { href: "/diensten/arbeidsdeskundig-onderzoek", label: "Arbeidsdeskundig onderzoek" },
  { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap" },
] as const;

export const projectLinks = [
  { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
  { href: "/diensten/verzuimbeleid-protocol", label: "Verzuimprotocol" },
  { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
  { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
  { href: "/diensten/functiehuis-opstellen", label: "Functiehuis opstellen" },
  { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
  { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
  { href: "/diensten/verzuimsysteem-implementatie", label: "Verzuimsysteem implementatie" },
  { href: "/diensten/re-integratiebeleid-opstellen", label: "Re-integratiebeleid opstellen" },
  { href: "/diensten/tender-arbodiensten", label: "Arbodienst-tender" },
  { href: "/diensten/verzuimverzekeringen", label: "Verzuimverzekeringen" },
  { href: "/diensten/verzuimreductie", label: "Verzuimreductie" },
  { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
] as const;

export const interimLinks = [
  { href: "/diensten/interim-casemanager", label: "Interim casemanager" },
  { href: "/spoedhulp", label: "Spoedhulp verzuim" },
] as const;

export const footerDiensten = [
  { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
  { href: "/spoedhulp", label: "Spoedhulp verzuim" },
  { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
  { href: "/diensten/tweede-spoor", label: "Spoor 2 in Brabant" },
  { href: "/diensten/reorganisatie-verzuim", label: "Reorganisatie en verzuim" },
  { href: "/diensten/verzuimsysteem-implementatie", label: "Verzuimsysteem implementatie" },
  { href: "/diensten/verzuimverzekeringen", label: "Verzuimverzekeringen" },
  { href: "/diensten/verzuimreductie", label: "Verzuimreductie" },
  { href: "/diensten/interim-casemanager", label: "Interim casemanager in Brabant" },
  { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
  { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
  { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór WIA" },
  { href: "/diensten/eerstejaarsevaluatie", label: "Eerstejaarsevaluatie" },
  { href: "/diensten/bezwaar-beroep", label: "Bezwaar en beroep" },
  { href: "/diensten/second-opinion-verzuim", label: "Second opinion verzuim" },
  { href: "/diensten/arbeidsdeskundig-onderzoek", label: "Arbeidsdeskundig onderzoek in Brabant" },
  { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap WGA" },
  { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
  { href: "/diensten/verzuimbeleid-protocol", label: "Verzuimprotocol opstellen" },
  { href: "/diensten/functiehuis-opstellen", label: "Functiehuis opstellen" },
  { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
  { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
  { href: "/diensten/re-integratiebeleid-opstellen", label: "Re-integratiebeleid" },
  { href: "/diensten/tender-arbodiensten", label: "Tender arbodiensten" },
] as const;

export type Regio = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  card: string;
  intro: string[];
  werken: string[];
  /** Gemeenten volgens het Besluit werkgebieden UWV 2024, niet de CBS-COROP als die afwijkt. */
  gemeenten: string[];
  gemeenteNoot: string;
  citySlugs: string[];
  faq: { q: string; a: string }[];
};

export const regios: Regio[] = [
  {
    slug: "west-brabant",
    name: "West-Brabant",
    seoTitle: "Verzuimbegeleiding in West-Brabant",
    seoDescription:
      "Verzuimbegeleiding in West-Brabant voor werkgevers met 35–500 medewerkers. Breda, Roosendaal, Bergen op Zoom en Oosterhout. UWV-vestiging Breda. Op locatie of online.",
    h1: "Verzuimbegeleiding in West-Brabant",
    card: "Breda, de grens en de haven van Moerdijk. UWV-vestiging Breda.",
    intro: [
      "West-Brabant is bij UWV de arbeidsmarktregio met vestiging Breda. De regio loopt van de Belgische grens en de Zeeuwse rand tot Altena, en van de haven van Moerdijk tot de binnenstad van Breda. REWIN is de ontwikkelingsmaatschappij die hier ondernemers, onderwijs en overheid bij elkaar brengt.",
      "De economie hangt aan de weg en het water. De A16, de A58 en de A4 verbinden distributiecentra, de industrie rond Moerdijk en de steden. In Breda zit daar een laag kantoren, zorg, horeca en de hogeschool naast. In Roosendaal telt het spoor. In Bergen op Zoom zit industrie naast de binnenstad. Verzuim in een ploeg is ander werk dan verzuim op een hoofdkantoor. De casemanager stemt het plan daarop af. De bedrijfsarts en de arbodienst blijven bij u.",
    ],
    werken: [
      "We werken op locatie bij u en online. De thuisbasis blijft het kantoor aan de Losplaats 16d in Uden. West-Brabant ligt verder dan de ring van ongeveer 45 minuten waarin de reistijd in het tarief zit. De rit staat daarom in de offerte, op basis van het adres. We komen met een dagdeel, zodat de reis de begeleiding niet opsoupeert.",
      "Breda, Oosterhout, Roosendaal en Bergen op Zoom hebben een eigen pagina. Etten-Leur, Moerdijk en de andere gemeenten in de lijst hieronder doen we ook, binnen 35–500 medewerkers, zonder dat elke kern een aparte pagina krijgt.",
    ],
    gemeenten: [
      "Altena",
      "Bergen op Zoom",
      "Breda",
      "Drimmelen",
      "Etten-Leur",
      "Geertruidenberg",
      "Halderberge",
      "Moerdijk",
      "Oosterhout",
      "Roosendaal",
      "Rucphen",
      "Steenbergen",
      "Woensdrecht",
      "Zundert",
    ],
    gemeenteNoot:
      "Het CBS telt Altena bij Midden-Noord-Brabant. UWV zet Altena bij West-Brabant, vestiging Breda. Op deze pagina volgen we de UWV-indeling, omdat die bepaalt welke vestiging een werkgever treft. Bron: Besluit werkgebieden UWV 2024. Het overzicht van arbeidsmarktregio’s per 1 januari 2026 noemt West-Brabant nog steeds met vestiging Breda.",
    citySlugs: ["breda", "oosterhout", "roosendaal", "bergen-op-zoom"],
    faq: [
      {
        q: "Zit de reistijd naar Breda in het uurtarief?",
        a: "Nee, niet vanzelf. Breda ligt ongeveer 75 minuten buiten de spits van Uden, verder dan de ring van ongeveer 45 minuten. De rit staat in de offerte.",
      },
      {
        q: "Welke UWV-vestiging hoort bij West-Brabant?",
        a: "Vestiging Breda. Het werkgebied staat in het Besluit werkgebieden UWV 2024 en loopt van Bergen op Zoom en Roosendaal tot Oosterhout, Moerdijk en Altena. De actuele vestiging bij een postcode staat op uwv.nl.",
      },
      {
        q: "Doen jullie ook Moerdijk en Etten-Leur?",
        a: "Ja, voor organisaties met 35–500 medewerkers. Het zijn andere gemeenten dan Breda, wel dezelfde UWV-regio. Een eigen pagina hebben ze niet. De rit toetsen we op het adres.",
      },
    ],
  },
  {
    slug: "midden-brabant",
    name: "Midden-Brabant",
    seoTitle: "Verzuimbegeleiding in Midden-Brabant",
    seoDescription:
      "Verzuimbegeleiding in Midden-Brabant en Hart van Brabant. Tilburg en Waalwijk, UWV-vestiging Tilburg. Logistiek, zorg en maak. Op locatie of online, voor 35–500 medewerkers.",
    h1: "Verzuimbegeleiding in Midden-Brabant",
    card: "Tilburg en de Langstraat. UWV-vestiging Tilburg. Ook Hart van Brabant genoemd.",
    intro: [
      "Midden-Brabant is bij UWV de arbeidsmarktregio met vestiging Tilburg. In de wandeling heet het gebied ook Hart van Brabant. Midpoint Brabant is er de schakel tussen ondernemers, onderwijs en overheid. Tilburg is de kern: een voormalige textielstad, nu logistiek, zorg, onderwijs en maakbedrijven langs de A58.",
      "Waalwijk en de Langstraat hebben een ander profiel. Leer, schoenen en distributie geven fysiek werk naast een kantoorlaag. Dongen, Goirle, Oisterwijk, Hilvarenbeek, Loon op Zand en Gilze en Rijen horen bij dezelfde UWV-regio, net als Alphen-Chaam, Baarle-Nassau en Heusden. Een magazijn en een zorgafdeling vragen niet hetzelfde plan van aanpak. De casemanager komt kijken welk werk er echt ligt.",
    ],
    werken: [
      "Gesprekken doen we bij u op het bedrijf, online, of op het kantoor in Uden. De rit naar Tilburg is ongeveer 55 minuten buiten de spits. Naar Waalwijk is de indicatie ongeveer 40 minuten. Binnen ongeveer 45 minuten van Uden zit de reistijd in het tarief. Daarbuiten staat de rit in de offerte. We gokken dat niet vanaf de plaatsnaam, maar toetsen het adres.",
      "Tilburg en Waalwijk hebben een eigen pagina. De andere gemeenten in deze regio plannen we mee op een dagdeel, zodat de casemanager niet voor één gesprek de stad doorrijdt.",
    ],
    gemeenten: [
      "Alphen-Chaam",
      "Baarle-Nassau",
      "Dongen",
      "Gilze en Rijen",
      "Goirle",
      "Heusden",
      "Hilvarenbeek",
      "Loon op Zand",
      "Oisterwijk",
      "Tilburg",
      "Waalwijk",
    ],
    gemeenteNoot:
      "Heusden hoort bij het CBS bij Noordoost-Noord-Brabant en bij UWV bij Midden-Brabant, vestiging Tilburg. Altena is bij het CBS Midden-Noord-Brabant en bij UWV West-Brabant. Bron: Besluit werkgebieden UWV 2024 en de COROP-indeling van het CBS.",
    citySlugs: ["tilburg", "waalwijk"],
    faq: [
      {
        q: "Valt Waalwijk binnen 45 minuten van Uden?",
        a: "De indicatie is ongeveer 40 minuten buiten de spits. Of de reistijd in het tarief zit, zeggen we op het adres. Tilburg ligt met ongeveer 55 minuten duidelijk buiten die ring. Daar staat de rit in de offerte.",
      },
      {
        q: "Welke plaatsen hebben een eigen pagina?",
        a: "Tilburg en Waalwijk. Goirle, Oisterwijk, Dongen, Hilvarenbeek, Loon op Zand, Gilze en Rijen, Heusden, Alphen-Chaam en Baarle-Nassau vallen onder deze regiopagina.",
      },
      {
        q: "Hoort Heusden bij Tilburg of bij Den Bosch?",
        a: "Voor UWV bij de vestiging Tilburg, arbeidsmarktregio Midden-Brabant. Het CBS telt Heusden bij Noordoost-Noord-Brabant. Een werkgever in Heusden zoekt de UWV-vestiging dus in Tilburg, niet in Den Bosch.",
      },
    ],
  },
  {
    slug: "noordoost-brabant",
    name: "Noordoost-Brabant",
    seoTitle: "Verzuimbegeleiding in Noordoost-Brabant",
    seoDescription:
      "Verzuimbegeleiding in Noordoost-Brabant. Den Bosch, Oss, Uden, Veghel en Land van Cuijk. UWV-vestiging Den Bosch. Kantoor in Uden, op locatie of online.",
    h1: "Verzuimbegeleiding in Noordoost-Brabant",
    card: "Den Bosch, Oss, de Meierij en Land van Cuijk. Het kantoor staat in Uden.",
    intro: [
      "Noordoost-Brabant is de UWV-arbeidsmarktregio met vestiging Den Bosch. ’s-Hertogenbosch is de provinciehoofdstad: bestuur, zakelijke diensten, zorg en logistiek aan de A2. Daaromheen ligt een andere economie. Agrifood Capital verbindt de gemeenten rond voedsel en agro. Die productie is zichtbaar in Meierijstad, Oss en Land van Cuijk. Oss heeft daar life sciences naast, rond Pivot Park. We noemen het type werk, geen opdrachtgevers.",
      "Ons kantoor staat in Uden, gemeente Maashorst, midden in deze regio. Uden, Veghel, Schijndel, Oss, Boxtel, Cuijk, Boxmeer en Grave hebben een eigen pagina, net als Den Bosch. Boekel, Bernheze, Sint-Michielsgestel en Vught vallen onder deze regio zonder aparte pagina.",
    ],
    werken: [
      "Een groot deel van Noordoost-Brabant ligt binnen ongeveer 45 minuten van Uden. Daar zit de reistijd in het tarief. We werken op locatie, online en op de Losplaats 16d. Wie voor een gesprek naar dat kantoor komt, blijft in beweging. Wie niet kan reizen, spreken we op het bedrijf of online.",
      "Nijmegen ligt net over de provinciegrens. Die stad hoort bij de UWV-regio Rijk van Nijmegen, niet bij Noordoost-Brabant. We behandelen Nijmegen als rand van ons werkgebied, niet als onderdeel van deze regio.",
    ],
    gemeenten: [
      "Bernheze",
      "Boekel",
      "Boxtel",
      "'s-Hertogenbosch",
      "Land van Cuijk",
      "Maashorst",
      "Meierijstad",
      "Oss",
      "Sint-Michielsgestel",
      "Vught",
    ],
    gemeenteNoot:
      "Heusden hoort bij het CBS bij Noordoost-Noord-Brabant, maar bij UWV bij Midden-Brabant, vestiging Tilburg. Die gemeente staat daarom op de pagina van Midden-Brabant. Uden valt onder Maashorst, Veghel en Schijndel onder Meierijstad, Cuijk, Boxmeer en Grave onder Land van Cuijk. Bron: Besluit werkgebieden UWV 2024.",
    citySlugs: ["den-bosch", "oss", "uden", "veghel", "schijndel", "boxtel", "cuijk", "boxmeer", "grave"],
    faq: [
      {
        q: "Valt Uden onder dezelfde UWV-regio als Den Bosch?",
        a: "Ja. Uden hoort bij de gemeente Maashorst. Maashorst zit in de arbeidsmarktregio Noordoost-Brabant, vestiging Den Bosch, samen met Meierijstad, Oss en Land van Cuijk.",
      },
      {
        q: "Werken jullie in heel Land van Cuijk?",
        a: "Ja, binnen 35–500 medewerkers. Cuijk, Boxmeer en Grave hebben een eigen pagina. De andere kernen plannen we vanaf die plaatsen, zolang de rit binnen het gebied past.",
      },
      {
        q: "Is Nijmegen Noordoost-Brabant?",
        a: "Nee. Nijmegen ligt in Gelderland en hoort bij de UWV-regio Rijk van Nijmegen. Voor Arbopartner Brabant is het randgebied, geen onderdeel van Noordoost-Brabant.",
      },
    ],
  },
  {
    slug: "zuidoost-brabant",
    name: "Zuidoost-Brabant en De Kempen",
    seoTitle: "Verzuimbegeleiding in Zuidoost-Brabant en De Kempen",
    seoDescription:
      "Verzuimbegeleiding in Zuidoost-Brabant en De Kempen. Eindhoven en Helmond zijn twee UWV-regio’s: vestiging Eindhoven en Helmond-De Peel. Op locatie of online.",
    h1: "Verzuimbegeleiding in Zuidoost-Brabant en De Kempen",
    card: "Brainport, Helmond-De Peel en De Kempen. Twee UWV-vestigingen: Eindhoven en Helmond.",
    intro: [
      "Zuidoost-Brabant is in de wandeling één gebied, en bij UWV twee. De arbeidsmarktregio Zuidoost-Brabant heeft vestiging Eindhoven. Helmond-De Peel heeft vestiging Helmond. Brainport omvat de 21 gemeenten van het CBS-gebied Zuidoost-Noord-Brabant, inclusief Helmond, de Kempen en Cranendonck. Hightech en kenniswerk zitten rond Eindhoven, de High Tech Campus en de TU/e. De keten loopt door naar Veldhoven, Best en Son en Breugel. Automotive en maak zitten sterker in Helmond, met de Automotive Campus als publiek gezicht.",
      "De Kempen ligt ten zuidwesten van Eindhoven, tussen de stad en de Belgische grens. De Samenwerking Kempengemeenten bestaat uit Bergeijk, Bladel, Eersel, Oirschot en Reusel-De Mierden. Valkenswaard en Waalre liggen in hetzelfde landschap en in dezelfde UWV-regio als Eindhoven. Ze horen niet bij die gemeenschappelijke regeling. Het werk is er kleinschaliger dan op de campus: maak, logistiek en familiebedrijven.",
      "UWV beschrijft de arbeidsmarkt in Zuidoost-Brabant als zeer krap. Een uitgevallen specialist is daar niet de volgende dag vervangen. We hangen geen eigen percentage aan die krapte. In Helmond is het verzuim vaker fysiek, op de vloer. De casemanager leest de functie voordat er een plan komt. De bedrijfsarts blijft van u.",
    ],
    werken: [
      "Eindhoven, Helmond, Veldhoven, Best, Gemert en Deurne liggen binnen ongeveer 45 minuten van het kantoor in Uden. Die reistijd zit in het tarief. We plannen dagdelen op locatie, niet een los uur. Online kan, en gesprekken kunnen ook aan de Losplaats 16d.",
      "Cranendonck hoort bij het CBS en bij Brainport bij Zuidoost-Brabant. In het Besluit werkgebieden UWV 2024 staat de gemeente bij de arbeidsmarktregio Midden-Limburg. Welke vestiging een postcode nu bedient, staat op uwv.nl. Die indeling kan wijzigen. Wij toetsen de rit op het adres, los van de UWV-grens.",
    ],
    gemeenten: [
      "Eindhoven-regio: Bergeijk, Best, Bladel, Eersel, Eindhoven, Heeze-Leende, Nuenen, Gerwen en Nederwetten, Oirschot, Reusel-De Mierden, Son en Breugel, Valkenswaard, Veldhoven, Waalre",
      "Helmond-De Peel: Asten, Deurne, Geldrop-Mierlo, Gemert-Bakel, Helmond, Laarbeek, Someren",
    ],
    gemeenteNoot:
      "De twee regels hierboven zijn de werkgebieden van de UWV-vestigingen Eindhoven en Helmond, uit het Besluit werkgebieden UWV 2024. De Samenwerking Kempengemeenten is Bergeijk, Bladel, Eersel, Oirschot en Reusel-De Mierden. Het overzicht per 1 januari 2026 houdt Zuidoost-Brabant en Helmond-De Peel apart.",
    citySlugs: ["eindhoven", "helmond", "veldhoven", "best", "gemert", "deurne"],
    faq: [
      {
        q: "Is Helmond dezelfde UWV-regio als Eindhoven?",
        a: "Nee. Helmond hoort bij Helmond-De Peel, vestiging Helmond, samen met Asten, Deurne, Geldrop-Mierlo, Gemert-Bakel, Laarbeek en Someren. Eindhoven heeft een eigen vestiging. Brainport omvat wel beide gebieden.",
      },
      {
        q: "Welke gemeenten horen bij De Kempen?",
        a: "De Samenwerking Kempengemeenten bestaat uit Bergeijk, Bladel, Eersel, Oirschot en Reusel-De Mierden. Valkenswaard en Waalre liggen in hetzelfde gebied en bij dezelfde UWV-vestiging als Eindhoven, en zitten niet in die regeling.",
      },
      {
        q: "Zit de rit naar Veldhoven en Helmond in het tarief?",
        a: "Ja. Veldhoven is ongeveer 40 minuten vanaf Uden, Helmond ongeveer 25, Eindhoven ongeveer 35. Tot ongeveer 45 minuten zit de reistijd in het uurtarief.",
      },
    ],
  },
];

export function getRegio(slug: string): Regio | undefined {
  return regios.find((regio) => regio.slug === slug);
}

export function stedenInRegio(slug: string) {
  const regio = getRegio(slug);
  if (!regio) return [];
  return regio.citySlugs
    .map((city) => places.find((place) => place.slug === city))
    .filter((place): place is NonNullable<typeof place> => place !== undefined);
}
