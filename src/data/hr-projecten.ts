import type { ServiceLayout } from "./service-layout";
import type { Service } from "./services";

const usp =
  "Ontbreekt een verzuimsysteem, dan leveren we er een en borgen daarin de informatie en de trajecten.";

export const hrServices: Service[] = [
  {
    slug: "functiehuis-opstellen",
    title: "Functiehuis opstellen",
    menu: "Functiehuis",
    seoTitle: "Functiehuis opstellen in Brabant",
    h1: "Functiehuis opstellen in Brabant",
    serviceType: "Functiehuis opstellen",
    description:
      "Functiehuis opstellen in Noord-Brabant voor organisaties met 35–500 medewerkers. Taken, eisen en passend werk op papier, vanuit het kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Zonder functiehuis is passend werk een gok. Met een functiehuis weet de leidinggevende welke taken er echt zijn.",
    sections: [
      {
        heading: "Wat een functiehuis hier is",
        paragraphs: [
          "Een functiehuis is het overzicht van de functies in uw organisatie: wat iemand doet, welk resultaat daarbij hoort en wat iemand daarvoor moet kunnen. Geen salarishuis en geen cao-indeling. Die toetst u met uw eigen adviseur.",
          "We schrijven het voor de praktijk van verzuim en re-integratie. Dan is helder welk werk passend kan zijn, en welke taken u kunt aanpassen als iemand uitvalt.",
        ],
      },
      {
        heading: "Wat we niet doen",
        paragraphs: [
          "We hangen geen loonschaal aan een functie en we vervangen uw jurist niet. Een arbeidsdeskundig onderzoek blijft een aparte opdracht van Matchvermogen, als u wilt weten wat één medewerker nog kan.",
        ],
      },
    ],
    faq: [
      {
        q: "Is een functiehuis verplicht?",
        a: "Nee. Wel heeft u bij re-integratie zicht nodig op werk dat iemand nog kan doen. Een functiehuis maakt dat gesprek concreet, in plaats van een lijst die iemand uit het hoofd opsomt.",
      },
      {
        q: "Doen jullie ook de cao-indeling?",
        a: "Nee. We beschrijven het werk. De indeling in een cao of een salarishuis toetst u zelf, of met uw adviseur.",
      },
      {
        q: "Past dit naast een casemanager?",
        a: "Ja. De uren van de casemanager en dit project zijn twee afspraken. U kunt het functiehuis ook los laten opstellen, zonder een uurblok.",
      },
      {
        q: "Voor welke organisaties is dit?",
        a: "Voor organisaties met 35–500 medewerkers in Noord-Brabant. Het kantoor staat in Uden. Kleinere organisaties verwijzen we naar Matchvermogen. Meer dan 500 medewerkers valt buiten Arbopartner Brabant.",
      },
    ],
  },
  {
    slug: "verzuimbeleid-opstellen",
    title: "Verzuimbeleid opstellen",
    menu: "Verzuimbeleid",
    seoTitle: "Verzuimbeleid opstellen in Brabant",
    h1: "Verzuimbeleid opstellen in Brabant",
    serviceType: "Verzuimbeleid opstellen",
    description:
      "Verzuimbeleid opstellen in Noord-Brabant voor werkgevers met 35–500 medewerkers. Rollen, uitgangspunten en het moment van opschalen. Kantoor in Uden. Het protocol is een aparte pagina.",
    lead: "Beleid is de keuze van de directie. Een protocol is de stappen op de afdeling. Die twee schrijven we niet door elkaar.",
    sections: [
      {
        heading: "Beleid en protocol",
        paragraphs: [
          "Het beleid zegt wat u wilt: terugkeer voorop, geen wantrouwen bij de eerste melding, heldere rollen, en weten wanneer u een casemanager, de bedrijfsarts of een arbeidsdeskundige erbij haalt. Het protocol zegt wie op dag één belt en wat u wel en niet vraagt. Dat protocol heeft een eigen pagina.",
        ],
      },
      {
        heading: "Wat we wel en niet beslissen",
        paragraphs: [
          "We schrijven de keuzes in uw woorden, langs uw cao waar die verzuim raakt. Of de ondernemingsraad moet instemmen, toetst u met uw eigen adviseur. Wij vervangen die toets niet. De bedrijfsarts en de arbodienst blijven bij u.",
        ],
      },
    ],
    faq: [
      {
        q: "Is verzuimbeleid verplicht?",
        a: "Een document met die naam niet altijd. Wel moet u de re-integratie organiseren en weten wie welke rol heeft. Het beleid maakt die keuze expliciet.",
      },
      {
        q: "Is dit hetzelfde als een verzuimprotocol?",
        a: "Nee. Het beleid is de lijn. Het protocol is de werkwijze op de dag van de ziekmelding. Beide kunnen, als twee opdrachten of na elkaar.",
      },
      {
        q: "Moet de ondernemingsraad instemmen?",
        a: "Een regeling over verzuim kan instemmingsplichtig zijn. Dat toetst u met uw eigen adviseur. Wij schrijven de inhoud.",
      },
      {
        q: "Kunnen jullie een bestaand beleid herschrijven?",
        a: "Ja. Meestal is aanscherpen sneller dan opnieuw beginnen. Wat u al heeft, lezen we eerst.",
      },
    ],
  },
  {
    slug: "verzuimsysteemanalyse",
    title: "Verzuimsysteemanalyse",
    menu: "Verzuimsysteemanalyse",
    seoTitle: "Verzuimsysteemanalyse in Brabant",
    h1: "Verzuimsysteemanalyse in Brabant",
    serviceType: "Verzuimsysteemanalyse",
    description:
      "Verzuimsysteemanalyse in Noord-Brabant: rollen, afspraken en waar de informatie staat. Geen verzuimsysteem? Wij leveren er een en borgen daarin dossiers en trajecten. Voor 35–500 medewerkers. Kantoor in Uden.",
    lead: "Eerst zien of uw verzuim een systeem heeft, of een verzameling mails en hoofden.",
    sections: [
      {
        heading: "Niet de analyse van de cijfers",
        paragraphs: [
          "De verzuimanalyse leest cijfers, een steekproef van dossiers en het protocol. Deze opdracht kijkt naar het systeem: wie doet wat, welk moment niemand bewaakt, en waar de informatie staat. Het zijn twee producten.",
          usp,
        ],
      },
    ],
    faq: [
      {
        q: "Is dit de verzuimanalyse van de cijfers?",
        a: "Nee. Die leest cijfers, een steekproef van dossiers en het protocol, en heeft een eigen pagina. Deze analyse kijkt naar rollen, afspraken en waar de informatie staat.",
      },
      {
        q: "Leveren jullie een systeem als we er geen hebben?",
        a: "Ja. Ontbreekt bij u een verzuimsysteem, dan leveren we er een. De inrichting, de migratie, een koppeling en de training staan op de pagina Verzuimsysteem implementatie.",
      },
      {
        q: "Welk verzuimsysteem past bij ons?",
        a: "Dat hangt af van wie de dossiers vasthoudt en waar de informatie nu staat. Deze analyse zet dat op papier. Past ons systeem, dan richten we dat in op de pagina Verzuimsysteem implementatie.",
      },
      {
        q: "Moet ik daarna een casemanager afnemen?",
        a: "Nee. De analyse staat op zichzelf. Veel werkgevers laten daarna wel de begeleiding door een vaste casemanager doen.",
      },
      {
        q: "Delen jullie medische gegevens?",
        a: "Nee. We werken met wat een werkgever mag weten. Diagnoses horen niet in het rapport en niet in het systeem van de werkgever.",
      },
    ],
  },
  {
    slug: "tender-arbodiensten",
    title: "Advies arbodienst-tender",
    menu: "Arbodienst-tender",
    seoTitle: "Advies arbodienst-tender in Brabant",
    h1: "Advies en begeleiding bij een arbodienst-tender in Brabant",
    serviceType: "Selectie arbodienst",
    description:
      "Advies en begeleiding bij een arbodienst-tender in Noord-Brabant: uitvraag, weging en keuze. U houdt uw arbodienst. Wij schrijven ons niet in. Voor organisaties met 35–500 medewerkers. Kantoor in Uden.",
    lead: "Advies en begeleiding bij de keuze van een arbodienst. U houdt de arbodienst. Wij schrijven ons niet in.",
    sections: [
      {
        heading: "Selectie, geen inschrijving",
        paragraphs: [
          "We begeleiden de uitvraag en de vergelijking. We schrijven ons niet in en de arbodienst blijft van u. De bedrijfsarts blijft van u. Valt uw organisatie onder de Aanbestedingswet, dan voert uw inkoper of jurist de procedure. Die rol nemen we niet over.",
        ],
      },
    ],
    faq: [
      {
        q: "Zijn jullie een arbodienst?",
        a: "Nee. Een arbodienst levert de verzuimbegeleiding en de bedrijfsarts. Wij helpen u die partij te kiezen. De bedrijfsarts blijft van u.",
      },
      {
        q: "Schrijven jullie u zelf in op de tender?",
        a: "Nee. We begeleiden de uitvraag. We worden geen contractpartij voor de arbozorg.",
      },
      {
        q: "Doen jullie een aanbesteding onder de Aanbestedingswet?",
        a: "Nee. Valt uw organisatie onder die wet, dan voert uw inkoper of jurist de procedure. Wij leveren de inhoudelijke eisen en de vergelijking.",
      },
      {
        q: "Kan dit naast een casemanager?",
        a: "Ja. De casemanager begeleidt dossiers. De keuze van de arbodienst is een apart project.",
      },
      {
        q: "Hoe kies ik een arbodienst?",
        a: "Zet op papier wat de arbodienst moet doen en wat u zelf houdt: de bedrijfsarts, bereikbaarheid, rapportage en termijnen. Vraag offertes uit en weeg ze naast elkaar. Wij begeleiden die uitvraag en de keuze. U houdt uw arbodienst. Wij schrijven ons niet in. Valt u onder de Aanbestedingswet, dan voert uw inkoper of jurist de procedure.",
      },
    ],
  },
  {
    slug: "re-integratiebeleid-opstellen",
    title: "Re-integratiebeleid opstellen",
    menu: "Re-integratiebeleid",
    seoTitle: "Re-integratiebeleid opstellen in Brabant",
    h1: "Re-integratiebeleid opstellen in Brabant",
    serviceType: "Re-integratiebeleid opstellen",
    description:
      "Re-integratiebeleid opstellen in Noord-Brabant. Eerste spoor, tweede spoor en passend werk, voor organisaties met 35–500 medewerkers. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Terugkeer in eigen werk en de stap naar ander werk horen in één lijn te staan, niet in twee losse gewoontes.",
    sections: [
      {
        heading: "Eén lijn voor twee sporen",
        paragraphs: [
          "Het beleid legt vast wanneer u inzet op eigen werk, op ander werk bij u, en wanneer werk buiten de deur in beeld komt. Het vervangt de begeleiding niet. De casemanager voert de lijn uit. Tweede spoor voert Best Match uit, als u dat afneemt.",
        ],
      },
    ],
    faq: [
      {
        q: "Is re-integratiebeleid hetzelfde als verzuimbeleid?",
        a: "Nee. Verzuimbeleid gaat over de ziekmelding, de rollen en de toon. Re-integratiebeleid gaat over terugkeer in eigen werk en de stap naar ander werk.",
      },
      {
        q: "Start tweede spoor dan vanzelf?",
        a: "Nee. Het beleid legt vast wanneer u die vraag stelt. Het traject zelf voert Best Match uit, als u dat afneemt.",
      },
      {
        q: "Geven jullie een medisch oordeel?",
        a: "Nee. Wat iemand medisch kan, beoordeelt de bedrijfsarts. Wij beschrijven het werk en de route.",
      },
      {
        q: "Moet ik een functiehuis hebben?",
        a: "Het helpt. Zonder overzicht van functies blijft passend werk vaag. Het functiehuis kunnen we in dezelfde periode opstellen, als aparte opdracht.",
      },
    ],
  },
];

export const hrLayouts: Record<string, ServiceLayout> = {
  "functiehuis-opstellen": {
    group: "projecten",
    result: "Functies en taken op papier, bruikbaar bij verzuim.",
    problem:
      "Passend werk blijft vaag als niemand heeft opgeschreven welke taken een functie echt heeft. Een plan noemt dan werk dat op de afdeling niet bestaat, of taken die iemand met een beperking niet kan doen.",
    steps: [
      { title: "Functies op een rij", text: "Met HR en leidinggevenden zetten we de functies en groepen op een rij. We verzinnen geen functies die u niet heeft." },
      { title: "Taken en eisen", text: "Per functie: doel, taken, resultaat en wat iemand moet kunnen. In gewone taal, langs het werk dat er ligt." },
      { title: "Koppeling aan verzuim", text: "We noteren welke taken aanpasbaar zijn en welk ander werk in huis in de buurt komt. Dat is geen oordeel over één medewerker." },
      { title: "Opleveren en borgen", text: "U krijgt het bestand. Ontbreekt een verzuimsysteem, dan leveren we er een en leggen we het functiehuis en de trajecten daarin vast." },
    ],
    deliverables: [
      "Overzicht van functies en functiegroepen",
      "Per functie een beschrijving: doel, taken, resultaat en eisen",
      "Aantekening welke taken aanpasbaar zijn bij uitval",
      "Werkbestand dat u zelf kunt bijwerken",
    ],
    audience:
      "Voor organisaties met 35–500 medewerkers in Noord-Brabant, met name waar functies uit elkaar lopen: productie, logistiek, zorg, techniek en kantoren door elkaar. Het kantoor staat in Uden. Een organisatie kleiner dan 35 medewerkers verwijzen we naar Matchvermogen. Meer dan 500 valt buiten Arbopartner Brabant.",
    outcome: `Een functiehuis dat leidinggevenden gebruiken als iemand uitvalt, in plaats van een map die niemand opent. ${usp}`,
    more: [
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/re-integratiebeleid-opstellen", label: "Re-integratiebeleid opstellen" },
      { href: "/diensten/arbeidsdeskundig-onderzoek", label: "Arbeidsdeskundig onderzoek in Brabant" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "De offerte noemt de omvang, het aantal functies dat we uitwerken en de doorlooptijd. Dit is geen cao-indeling en geen arbeidsdeskundig onderzoek.",
    reviewName: "",
  },
  "verzuimbeleid-opstellen": {
    group: "projecten",
    result: "De lijn van de directie, op één document.",
    problem:
      "Verzuim loopt via gewoontes. De ene leidinggevende belt dezelfde dag, de andere wacht een week, en niemand weet wanneer een dossier te zwaar wordt voor de afdeling alleen.",
    steps: [
      { title: "De lijn", text: "Met directie en HR: doel, toon, en wat u wel en niet van een zieke medewerker vraagt." },
      { title: "Rollen", text: "Wie de ziekmelding doet, wie de termijnen bewaakt, wat de casemanager doet en wat bij de bedrijfsarts blijft." },
      { title: "Opschalen", text: "Wanneer frequent verzuim, een lang dossier, een arbeidsdeskundige of tweede spoor op tafel komt." },
      { title: "Opleveren", text: "Een beleidsdocument en een korte versie voor de directie. Het dagelijkse protocol is een vervolgstap als u dat wilt." },
    ],
    deliverables: [
      "Beleidsdocument met doel, uitgangspunten en rollen",
      "Afspraken over wat u registreert en wat u niet vastlegt",
      "Momenten waarop u opschaalt",
      "Korte versie die de directie kan vaststellen",
    ],
    audience:
      "Voor directie en HR van organisaties met 35–500 medewerkers in Noord-Brabant die verzuim nu per leidinggevende anders laten lopen. Het kantoor staat in Uden. Het protocol voor de afdeling is een andere pagina. Kleinere organisaties verwijzen we naar Matchvermogen.",
    outcome: `Een verzuimbeleid dat de organisatie kan vaststellen, in gewone taal. ${usp}`,
    more: [
      { href: "/diensten/verzuimbeleid-protocol", label: "Verzuimprotocol opstellen" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/diensten/re-integratiebeleid-opstellen", label: "Re-integratiebeleid opstellen" },
      { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
      { href: "/werkgebied/regio/noordoost-brabant", label: "Noordoost-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "De offerte bevestigt of we nieuw schrijven of een bestaand stuk aanscherpen, en of het protocol erbij hoort. Een verzuimregeling kan instemmingsplichtig zijn. Die toets doet u met uw eigen adviseur.",
    reviewName: "",
  },
  verzuimsysteemanalyse: {
    group: "projecten",
    result: "Zicht op rollen, gaten en waar de informatie staat.",
    problem:
      "Cijfers zeggen niet wie het dossier vasthoudt. Informatie zit in een spreadsheet, in de inbox van HR en in het hoofd van één leidinggevende. Gaat die persoon weg, dan staat u opnieuw.",
    steps: [
      { title: "Hoe het nu loopt", text: "We lopen de keten na: ziekmelding, registratie, bedrijfsarts, plan, evaluatie, en waar elk stuk staat." },
      { title: "De gaten", text: "Welke rol ontbreekt, welk moment niemand bewaakt, en welke informatie nergens terug te vinden is." },
      { title: "Het systeem", text: "Is er een bruikbaar systeem, dan zeggen we wat erin moet. Ontbreekt het, dan leveren we een verzuimsysteem. Inrichting, migratie, koppeling en training zijn de vervolgopdracht." },
      { title: "Advies op papier", text: "U krijgt een kort rapport met de gaten en de eerstvolgende stappen. Geen medisch oordeel." },
    ],
    deliverables: [
      "Beschrijving van hoe verzuim bij u nu loopt",
      "Overzicht van gaten in rollen, momenten en informatie",
      "Advies welk systeem daarbij past, of ingebruikname van het onze",
      "Dossiers en trajecten op één plek, als u daarvoor kiest",
    ],
    audience:
      "Voor werkgevers met 35–500 medewerkers in Noord-Brabant die het gevoel hebben dat verzuim erbij wordt gedaan. Los van de verzuimanalyse van cijfers en dossiers. Die blijft een aparte opdracht. Het kantoor staat in Uden.",
    outcome: `U weet of uw verzuimaanpak een systeem is. ${usp}`,
    answers: [
      {
        q: "Welk verzuimsysteem past bij ons?",
        a: "Dat hangt af van wie de dossiers vasthoudt en waar de informatie nu staat. Deze analyse zet dat op papier. Past ons systeem, dan richten we dat in. De inrichting, de migratie, een koppeling en de training staan op de pagina Verzuimsysteem implementatie.",
      },
    ],
    more: [
      { href: "/diensten/verzuimsysteem-implementatie", label: "Verzuimsysteem implementatie" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse" },
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/diensten/tender-arbodiensten", label: "Arbodienst-tender" },
      { href: "/werkgebied/uden", label: "Verzuimbegeleiding in Uden" },
    ],
    priceKind: "project",
    priceNote:
      "Dit is de analyse van rollen en systemen, niet de analyse van cijfers en dossiers. De offerte noemt de opdracht. De analyse van cijfers blijft los te koop, of zit het eerste jaar in het Premium-blok.",
    reviewName: "",
  },
  "tender-arbodiensten": {
    group: "projecten",
    result: "Eisen, vragen en een keuze die u kunt uitleggen.",
    problem:
      "Het contract met de arbodienst loopt af, of de begeleiding stelt teleur, en niemand in huis heeft een programma van eisen. Een overstap wordt dan een gevoel, geen vergelijking.",
    steps: [
      { title: "Wat u nu heeft", text: "Contract, bereikbaarheid, wat de arbodienst doet en wat u zelf doet. De pijnpunten in gewone taal." },
      { title: "Eisen", text: "Verzuimbegeleiding, de bedrijfsarts, rapportage, termijnen en wat u per se zelf wilt houden. U houdt uw arbodienst. Wij schrijven ons niet in." },
      { title: "Uitvraag", text: "U vraagt offertes uit bij arbodiensten. Wij helpen de vragen en de weging, zodat de antwoorden naast elkaar kunnen." },
      { title: "Keuze", text: "Een beslisnotitie met aandachtspunten voor het gesprek en het contract. De jurist en de inkoper blijven van u." },
    ],
    deliverables: [
      "Programma van eisen voor uw arbodienst",
      "Vragenlijst voor de uitvraag",
      "Weging waarmee u offertes vergelijkt",
      "Beslisnotitie, zonder dat wij de arbodienst worden",
    ],
    audience:
      "Voor werkgevers met 35–500 medewerkers in Noord-Brabant die een arbodienst kiezen, verlengen of vervangen. Het kantoor staat in Uden. Organisaties die onder de Aanbestedingswet vallen, houden hun eigen inkoper of jurist voor de procedure. Wij begeleiden de inhoudelijke selectie.",
    outcome: `Een keuze die u kunt uitleggen, met eisen op papier. ${usp} Dat staat los van welk arbocontract u tekent.`,
    answers: [
      {
        q: "Hoe kies ik een arbodienst?",
        a: "Zet op papier wat de arbodienst moet doen en wat u zelf houdt: de bedrijfsarts, bereikbaarheid, rapportage en termijnen. Vraag offertes uit en weeg ze naast elkaar. Wij geven advies en begeleiding bij die uitvraag en de keuze. U houdt uw arbodienst. Wij schrijven ons niet in. Valt u onder de Aanbestedingswet, dan voert uw inkoper of jurist de procedure.",
      },
    ],
    more: [
      { href: "/arbodienst-of-arbopartner", label: "Anders dan een arbodienst" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "De offerte noemt de uren of de afgebakende opdracht. De arbodienst blijft de partij die de aanbesteding ingaat.",
    reviewName: "",
  },
  "re-integratiebeleid-opstellen": {
    group: "projecten",
    result: "Eerste spoor en tweede spoor in één lijn.",
    problem:
      "Eerste spoor blijft liggen tot iemand eraan toe is, en tweede spoor start pas als de twee jaar bijna om zijn. Zonder beleid beslist elke leidinggevende dat zelf.",
    steps: [
      { title: "De lijn", text: "Wanneer u inzet op eigen werk, op ander werk bij u, en wanneer werk buiten de deur in beeld komt." },
      { title: "Passend werk", text: "Hoe u het functiehuis gebruikt, wie voorstelt welk werk kan, en dat de bedrijfsarts de belasting beoordeelt. Wij niet." },
      { title: "Rollen", text: "Casemanager, HR, leidinggevende, en wanneer Matchvermogen of Best Match erbij komt. De rollen blijven gescheiden." },
      { title: "Document", text: "Een beleid dat u kunt vaststellen, plus de momenten waarop het dossier moet laten zien wat u heeft geprobeerd." },
    ],
    deliverables: [
      "Re-integratiebeleid: eerste spoor, ander werk bij u, tweede spoor",
      "Afspraken over passend werk en wie daarover spreekt",
      "Momenten waarop u opschaalt naar een arbeidsdeskundige of Best Match",
      "Korte versie voor leidinggevenden",
    ],
    audience:
      "Voor organisaties met 35–500 medewerkers in Noord-Brabant waar langere dossiers ontstaan: productie, zorg, logistiek, techniek en kenniswerk. Het kantoor staat in Uden. Het beleid vervangt de begeleiding niet. De casemanager voert het uit. Tweede spoor voert Best Match uit.",
    outcome: `Eén lijn voor terugkeer en voor de stap naar ander werk, op papier. ${usp}`,
    more: [
      { href: "/diensten/eerste-spoor", label: "Eerste spoor" },
      { href: "/diensten/tweede-spoor", label: "Tweede spoor in Brabant" },
      { href: "/diensten/functiehuis-opstellen", label: "Functiehuis opstellen" },
      { href: "/diensten/arbeidsdeskundig-onderzoek", label: "Arbeidsdeskundig onderzoek in Brabant" },
      { href: "/werkgebied/eindhoven", label: "Verzuimbegeleiding in Eindhoven" },
      { href: "/werkgebied/tilburg", label: "Verzuimbegeleiding in Tilburg" },
    ],
    priceKind: "project",
    priceNote:
      "Geen vaste prijs. De offerte zegt of we alleen het beleid schrijven of ook het verzuimprotocol en het functiehuis meenemen. Tweede spoor en een arbeidsdeskundig onderzoek offerteert het zustermerk apart.",
    reviewName: "",
  },
};
