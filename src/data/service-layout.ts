import { extraLayouts } from "./dienst-extra.ts";
import { hrLayouts } from "./hr-projecten.ts";

export type ServiceGroupId = "begeleiden" | "toetsing" | "projecten" | "interim";
export type PriceKind = "uren" | "analyse" | "spoor2" | "ad" | "offerte" | "project";

export type ServiceLayout = {
  group: ServiceGroupId;
  result: string;
  problem: string;
  steps: { title: string; text: string }[];
  outcome: string;
  /** Concrete oplevering. Alleen gevuld bij projectmatige diensten. */
  deliverables?: string[];
  audience?: string;
  more?: { href: string; label: string }[];
  /** Vragen van werkgevers, zichtbaar als kop en in het FAQ-schema. */
  answers?: { q: string; a: string }[];
  priceKind: PriceKind;
  priceNote: string;
  /** Leeg bij projectpagina’s: daar plaatsen we geen review. */
  reviewName: string;
};

export const serviceGroups: {
  id: ServiceGroupId;
  title: string;
  text: string;
  icon: "calendar" | "route" | "shield" | "chart" | "document" | "clock";
}[] = [
  {
    id: "begeleiden",
    title: "Begeleiding",
    text: "Een vaste casemanager, van de eerste week tot terugkeer of de WIA.",
    icon: "calendar",
  },
  {
    id: "toetsing",
    title: "Toetsing en bezwaar",
    text: "Dossier toetsen, bezwaar begeleiden, of een tweede blik op een lopend traject.",
    icon: "shield",
  },
  {
    id: "projecten",
    title: "HR-projecten",
    text: "Cijfers, beleid, training, preventie, of een arbodienst kiezen.",
    icon: "document",
  },
  {
    id: "interim",
    title: "Interim",
    text: "Een casemanager of verzuimcoördinator tijdelijk op locatie.",
    icon: "clock",
  },
];

export const serviceLayout: Record<string, ServiceLayout> = {
  "casemanager-detachering": {
    group: "begeleiden",
    result: "Eén vast gezicht, uren die meeschalen.",
    problem: "Dossiers blijven liggen als elke week een ander gezicht belt, of als één medewerker het verzuim erbij doet.",
    steps: [
      { title: "Niveau en uren", text: "We kijken welk niveau en welk uurblok de dossiers vragen." },
      { title: "Eén casemanager", text: "Die plant de gesprekken, bewaakt de termijnen, schrijft het plan bij en stemt af met de leidinggevende." },
      { title: "Achtervang", text: "Bij ziekte of vakantie neemt een collega het dossier over. U schaalt de uren mee. De wijzigingstermijn staat in de offerte." },
    ],
    outcome: "Een vast gezicht dat de namen op de werkvloer kent, zonder vacature en zonder loonlijst voor deze persoon.",
    more: [
      { href: "/diensten/interim-casemanager", label: "Interim casemanager" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
    ],
    priceKind: "uren",
    priceNote: "De bedrijfsarts blijft van u. Een medisch oordeel geven wij niet.",
    reviewName: "Raimonda Kasparaviciute",
  },
  mediation: {
    group: "begeleiden",
    result: "Ziekte en conflict uit elkaar.",
    problem: "Verzuim en een conflict lopen door elkaar. Dan helpt meer overleg niet.",
    steps: [
      { title: "Scheiden", text: "Een arbeidsdeskundige mediator van Matchvermogen haalt ziekte en conflict uit elkaar." },
      { title: "Dossier apart", text: "De casemanager houdt de termijnen bij. De mediator is een andere rol." },
      { title: "Geen druk", text: "Een vaststellingsovereenkomst maakt uw jurist. Druk op een zieke medewerker om te tekenen, doen we niet." },
    ],
    outcome: "Een route die de medewerker en uw jurist allebei begrijpen.",
    priceKind: "uren",
    priceNote: "De uren komen uit het blok, of we offreren een afgebakend aantal uren voor één dossier.",
    reviewName: "Marjolein Menheere",
  },
  "vso-en-ontslagdossier": {
    group: "begeleiden",
    result: "Een dossier zonder gaten voor uw jurist.",
    problem: "Een slordig dossier maakt een vertrek duurder en trager.",
    steps: [
      { title: "Tijdlijn", text: "We zetten ziekmelding, adviezen, plannen, evaluaties en de inzet op ander werk op een rij." },
      { title: "Terugkeer eerst", text: "Eerst moet vaststaan dat terugkeer echt is onderzocht." },
      { title: "Jurist van u", text: "Wij leveren de feiten. De vaststellingsovereenkomst maakt uw jurist of een advocaat." },
    ],
    outcome: "Een feitenoverzicht waarmee een vertrek zorgvuldig kan, tijdens het opzegverbod bij ziekte.",
    priceKind: "uren",
    priceNote: "De uren komen uit het blok, of we offreren een afgebakend aantal uren voor één dossier. De advocaat schakelt u zelf in.",
    reviewName: "Martijn Toussaint",
  },
  "eerste-spoor": {
    group: "begeleiden",
    result: "Terugkeer in eigen werk, op tijd bewaakt.",
    problem: "Terugkeer strandt als niemand de aangepaste taken en de termijnen bewaakt.",
    steps: [
      { title: "Eigen werk", text: "De casemanager brengt in kaart welk eigen werk of ander werk bij u nog past." },
      { title: "Op papier", text: "Aangepaste taken en het plan komen vast te liggen, afgestemd met de leidinggevende." },
      { title: "Op tijd verder", text: "Lukt terugkeer bij u niet, dan zet de casemanager tweede spoor op tafel. Niet in de laatste maand." },
    ],
    outcome: "Re-integratie bij de eigen werkgever, voordat werk buiten de deur de enige route lijkt.",
    priceKind: "uren",
    priceNote: "Geen los tarief. Dit is het werk van de gedetacheerde casemanager. De uren komen uit het blok.",
    reviewName: "Peter Stekelmans",
  },
  "tweede-spoor": {
    group: "begeleiden",
    result: "Ander werk starten vóór de laatste maand.",
    problem: "Ander werk start te laat, vaak pas als de twee jaar bijna om zijn.",
    steps: [
      { title: "De vraag eerder", text: "De casemanager zet tweede spoor op tafel zodra terugkeer bij u niet waarschijnlijk is." },
      { title: "Best Match", text: "Het traject voert Best Match uit. Arbopartner houdt de regie met HR." },
      { title: "Samenhang", text: "De casemanager bewaakt de samenhang met het eerste spoor en de bedrijfsarts." },
    ],
    outcome: "Een tweede spoor op tijd, met één aanspreekpunt.",
    priceKind: "spoor2",
    priceNote: "De prijs van het traject hangt af van duur en vorm. We plakken de band van Matchvermogen hier niet over als onze prijslijst. De offerte van Best Match bevestigt het bedrag.",
    reviewName: "J. Mohabir",
  },
  jobcoaching: {
    group: "begeleiden",
    result: "Een coach naast de medewerker.",
    problem: "Het dossier bestaat alleen nog uit termijnen, terwijl de medewerker een coach nodig heeft.",
    steps: [
      { title: "Werk dat vol te houden is", text: "Een geregistreerde coach van Matchvermogen kijkt naar de eigen functie of naar ander werk." },
      { title: "Ook eerder", text: "Coaching kan vóór een lang dossier. Het is geen tweede spoor." },
      { title: "Geen behandeling", text: "De werkgever is opdrachtgever. Behandelen doen we niet." },
    ],
    outcome: "Coaching naar werk dat iemand kan volhouden, in de eigen functie of daarbuiten. Preventie voor de hele organisatie is een andere opdracht.",
    more: [
      { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
      { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
    ],
    priceKind: "offerte",
    priceNote: "Besparingscijfers van de jobcoachingpagina van Matchvermogen zetten we hier niet neer. Duur en bedrag staan in de offerte.",
    reviewName: "Melisia Telepary",
  },
  "arbeidsdeskundig-onderzoek": {
    group: "toetsing",
    result: "Helder welk werk iemand nog kan.",
    problem: "Het dossier is te zwaar voor begeleiding alleen: onduidelijk welk werk nog kan, of een WIA-aanvraag nadert.",
    steps: [
      { title: "De vraag", text: "Passend werk, aanpassingen, loonwaarde of een verschil van inzicht." },
      { title: "Onafhankelijk", text: "Een register-arbeidsdeskundige van Matchvermogen doet het onderzoek." },
      { title: "Rollen gescheiden", text: "De onderzoeker is niet de begeleider. De casemanager blijft het dossier houden." },
    ],
    outcome: "Een onafhankelijk beeld van wat iemand nog kan.",
    more: [
      { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór de WIA" },
      { href: "/diensten/second-opinion-verzuim", label: "Second opinion verzuim" },
    ],
    priceKind: "ad",
    priceNote: "Matchvermogen publiceert een vaste prijs vanaf dit bedrag. Of dat voor uw vraag geldt, hoort u in de offerte. De onderzoeker is niet dezelfde persoon als de begeleider.",
    reviewName: "Heidi Wichems",
  },
  "wia-begeleiding": {
    group: "begeleiden",
    result: "Het dossier compleet rond week 88.",
    problem: "Rond week 88 is het re-integratiedossier vaak nog niet compleet.",
    steps: [
      { title: "De datum", text: "De casemanager bewaakt het moment waarop de WIA in beeld komt, grofweg week 88 tot 93." },
      { title: "De stukken", text: "Plannen, evaluaties, inzet op eigen werk en, waar nodig, tweede spoor." },
      { title: "Geen aanvraag", text: "De werknemer dient de aanvraag in. UWV beslist. Wij voorspellen de uitkomst niet." },
    ],
    outcome: "Een werkgeversdossier dat de re-integratie kan laten zien.",
    more: [
      { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór de WIA" },
      { href: "/diensten/eerstejaarsevaluatie", label: "Eerstejaarsevaluatie" },
      { href: "/diensten/bezwaar-beroep", label: "Bezwaar en beroep" },
      { href: "/loonsanctie-risicoscan", label: "Loonsanctie-risicoscan" },
    ],
    priceKind: "uren",
    priceNote: "Geen los tarief. De bewaking zit in de uren van de casemanager. Begeleiding bij bezwaar staat op een eigen pagina. Het bezwaar zelf en de premie blijven bij Matchvermogen en werkhervattingskas.nl.",
    reviewName: "Harry Limburg",
  },
  verzuimanalyse: {
    group: "projecten",
    result: "Een rapport over waar de dagen ontstaan.",
    problem: "Uren inkopen zonder te weten waar de verzuimdagen ontstaan, en zonder een rapport dat HR en de directie naast elkaar kunnen leggen.",
    steps: [
      { title: "Lezen", text: "We lezen uw cijfers, een steekproef van dossiers en het protocol als dat er is." },
      { title: "Rapport", text: "U ziet waar de dagen vandaan komen, welke dossiers zonder plan lopen, en hoe uw percentage zich verhoudt tot de CBS-benchmark voor uw grootte." },
      { title: "Borgen", text: "Ontbreekt een verzuimsysteem, dan leveren we er een en leggen we de uitkomsten en de trajecten daarin vast." },
      { title: "Daarna kiest u", text: "De analyse staat op zichzelf. Een blok uren is niet verplicht. Een reductietraject waarbij de betaling van het resultaat afhangt, is een vervolg. Het percentage en de voorwaarden staan niet hier, maar in die offerte." },
    ],
    deliverables: [
      "Rapport over waar de verzuimdagen ontstaan",
      "Steekproef: welke dossiers zonder plan lopen",
      "Plaatsing van uw percentage naast de CBS-benchmark voor uw grootte",
      "Eerste stappen, zonder een verplicht uurblok",
    ],
    audience:
      "Voor organisaties met 35–500 medewerkers in Noord-Brabant die eerst willen zien wat de cijfers en de dossiers zeggen. Het kantoor staat in Uden. Dit is niet de verzuimsysteemanalyse. Kleinere organisaties verwijzen we naar Matchvermogen.",
    outcome: "Zicht op hoe uw verzuimpercentage kan dalen, op basis van uw cijfers. Geen vast percentage vooraf. Ontbreekt een verzuimsysteem, dan leveren we er een en borgen daarin de informatie en de trajecten.",
    more: [
      { href: "/diensten/verzuimreductie", label: "Verzuimreductie" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/diensten/verzuimbeleid-protocol", label: "Verzuimprotocol" },
      { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "analyse",
    priceNote: "De gratis aanvraag is die eerste blik. Het uitgewerkte rapport blijft een aparte opdracht, of zit het eerste jaar in het Premium-blok van twintig uur per week.",
    reviewName: "Michel Krijne",
  },
  "verzuimbeleid-protocol": {
    group: "projecten",
    result: "Afspraken die de afdeling echt gebruikt.",
    problem: "Een protocol in de la verlaagt geen enkele ziektedag.",
    steps: [
      { title: "Samen schrijven", text: "Met HR en twee leidinggevenden, in gewone taal, langs uw cao." },
      { title: "Dag één", text: "Wie belt, wat u wel en niet vraagt, wanneer de bedrijfsarts erbij komt, hoe het plan vastligt." },
      { title: "Uitleg", text: "Leidinggevenden krijgen een korte toelichting. Zonder die toelichting blijft het papier." },
    ],
    outcome: "Een protocol dat de afdeling gebruikt, plus een versie van één pagina.",
    more: [
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/re-integratiebeleid-opstellen", label: "Re-integratiebeleid opstellen" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
    ],
    priceKind: "uren",
    priceNote: "De uren komen uit het pakket of als losse opdracht. Een verzuimregeling kan instemmingsplichtig zijn. Dat toetst u met uw eigen adviseur.",
    reviewName: "Danine Gerritsen",
  },
  "leidinggevenden-training": {
    group: "projecten",
    result: "Leidinggevenden die het gesprek, de momenten en de signalen kennen.",
    problem: "Het protocol werkt pas als de leidinggevende het verzuimgesprek aandurft, de momenten in het dossier kent, en vroeg ziet dat een patroon ontstaat.",
    steps: [
      { title: "Wie meedoet", text: "Meestal de leidinggevenden die de ziekmeldingen doen." },
      { title: "Verzuimgesprek", text: "Wat u vraagt over werk en terugkeer, en wat u niet vraagt over de diagnose." },
      { title: "De wet", text: "De momenten uit de Wet verbetering poortwachter die bij de leidinggevende horen, in gewone taal. Geen juridisch advies." },
      { title: "Vroegsignalering", text: "Patronen vóór een lang dossier, en het moment om de casemanager of een arbeidsdeskundige te bellen." },
    ],
    deliverables: [
      "Programma over het verzuimgesprek, de Wet verbetering poortwachter en vroegsignalering",
      "Oefening met situaties uit uw organisatie",
      "Korte geheugensteun voor na de bijeenkomst",
      "Afspraken wat de leidinggevende zelf doet en wanneer de casemanager erbij komt",
    ],
    audience:
      "Voor leidinggevenden van organisaties met 35–500 medewerkers in Noord-Brabant. Het kantoor staat in Uden. De training vervangt de casemanager niet. Kleinere organisaties verwijzen we naar Matchvermogen.",
    outcome: "Leidinggevenden die het verzuimgesprek voeren, de momenten kennen en signalen eerder zien. Ontbreekt een verzuimsysteem, dan leveren we er een en borgen daarin de informatie en de trajecten.",
    more: [
      { href: "/diensten/verzuimbeleid-protocol", label: "Verzuimprotocol" },
      { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote: "Duur en prijs publiceren we hier niet. De offerte noemt de groep, de dagdelen en het bedrag. Het aanbod bij Matchvermogen blijft de inhoudelijke bron. De training is geen juridisch advies.",
    reviewName: "Femke Aarts",
  },
  ...hrLayouts,
  ...extraLayouts,
};
