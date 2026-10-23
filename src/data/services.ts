import { extraServices } from "./dienst-extra.ts";
import { hrServices } from "./hr-projecten.ts";
import { site } from "./site";

export type Service = {
  slug: string;
  title: string;
  menu: string;
  /** Titel-tag, zonder de sitenaam. Zoekterm plus Brabant op converterende pagina’s. */
  seoTitle?: string;
  /** H1 met zoekintentie en regio. */
  h1?: string;
  serviceType?: string;
  description: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faq: { q: string; a: string }[];
  sister?: { name: string; url: string; text: string };
};

export const services: Service[] = [
  {
    slug: "casemanager-detachering",
    title: "Casemanager detacheren",
    menu: "Casemanager detacheren",
    seoTitle: "Casemanagement in Brabant",
    h1: "Casemanagement en verzuimbegeleiding in Brabant",
    serviceType: "Casemanagement",
    description:
      `Casemanagement en verzuimbegeleiding in Noord-Brabant. Een vaste gedetacheerde casemanager ${site.audience}. Nuchter en dichtbij. Reistijd binnen 45 minuten van het kantoor in Uden zit in het tarief.`,
    lead: "U krijgt één casemanager die de namen op de werkvloer kent. Geen loket, geen andere stem bij elk telefoontje.",
    sections: [
      {
        heading: "Wat de casemanager doet",
        paragraphs: [
          "De casemanager begeleidt zieke medewerkers van de eerste week tot terugkeer of een nette afronding. Hij of zij plant de gesprekken, houdt de termijnen bij, schrijft het plan van aanpak bij en stemt af met de leidinggevende. De bedrijfsarts blijft van u. Wij zijn geen arbodienst en geven geen medisch oordeel.",
          "U kiest het niveau: medior, medior+ of senior met een specialisatie, bijvoorbeeld psychisch verzuim of een arbeidsrechtelijke component. Het niveau hangt af van uw dossiers, niet van een standaardpakket. De matchcalculator helpt daar een eerste richting in te kiezen.",
        ],
      },
      {
        heading: "Waarom detacheren in plaats van een loket",
        paragraphs: [
          "Een vast gezicht betekent dat een medewerker niet telkens opnieuw zijn verhaal doet. De casemanager weet welk werk er op de afdeling ligt en welke leidinggevende terughoudend is met aangepaste taken. Dat scheelt weken in een dossier dat anders blijft liggen.",
          "Detacheren geeft u zekerheid die een dienstverband niet vanzelf heeft. Wordt de casemanager ziek of gaat die met vakantie, dan neemt een collega het dossier over. U werft niet, u bouwt geen transitievergoeding op, en u schaalt de uren mee met het aantal dossiers. De wijzigingstermijn staat in de offerte. We garanderen dat inhuren goedkoper is dan een fulltime kracht in dienst: u betaalt de afgenomen uren. De vergelijking onderbouwt dat met bronnen. Bij een bijna volle werkweek kan een dienstverband in euro's lager zijn. Dan zegt de tool dat, en blijven continuïteit en onafhankelijkheid staan.",
        ],
      },
      {
        heading: "Achtervang",
        paragraphs: [
          `Loopt een dossier vast, dan staat een arbeidsdeskundige van Matchvermogen klaar. Klanten van dit label krijgen ${site.discount.arbeidsdeskundige}% korting op dat onderzoek. Tweede spoor loopt via Best Match, met ${site.discount.tweedeSpoor}% korting. U houdt één opdrachtgever, twee specialismen.`,
        ],
      },
    ],
    faq: [
      {
        q: "Vanaf hoeveel medewerkers kan ik detacheren?",
        a: `We werken ${site.audience} in Noord-Brabant. Het kantoor staat in Uden. Kleinere organisaties verwijzen we naar een gerichte opdracht bij Matchvermogen. Meer dan ${site.maxEmployees} medewerkers valt buiten dit label.`,
      },
      {
        q: "Zit reistijd in het tarief?",
        a: "Ja, binnen dat gebied. We schrijven kilometers niet na.",
      },
      {
        q: "Kunnen we maandelijks op- of afschalen?",
        a: "Dat is de bedoeling van een blokuren-afspraak. De precieze wijzigingstermijn bevestigen we in de offerte.",
      },
    ],
  },
  {
    slug: "verzuimanalyse",
    title: "Verzuimanalyse",
    menu: "Verzuimanalyse",
    seoTitle: "Verzuimanalyse en rapportage in Brabant",
    h1: "Verzuimanalyse en rapportage in Brabant",
    serviceType: "Verzuimanalyse",
    description:
      "Verzuimanalyse en rapportage in Noord-Brabant. We lezen cijfers, een steekproef van dossiers en het protocol. Het uitgewerkte rapport kost €995 exclusief btw. In het Premium-pakket zit de analyse het eerste jaar inbegrepen. Kantoor in Uden.",
    lead: "Eerst een rapport over waar de dagen ontstaan. Dan pas uren inkopen.",
    sections: [
      {
        heading: "Wat u krijgt",
        paragraphs: [
          "We lezen uw verzuimcijfers, een steekproef van dossiers en het protocol als dat er is. U krijgt een kort rapport: waar de dagen ontstaan, welke dossiers te lang zonder plan lopen, en of uw percentage boven of onder de CBS-benchmark voor uw grootte zit.",
          "De analyse kost €995 exclusief btw. In het Premium-pakket van twintig uur per week zit deze analyse het eerste jaar inbegrepen. Los kopen kan ook, zonder dat u meteen een casemanager detacheert.",
        ],
      },
      {
        heading: "Wat de analyse belooft",
        paragraphs: [
          "Na een concrete verzuimanalyse laten we zien hoe uw verzuimpercentage kan dalen. Die belofte rust op uw cijfers, dossiers en protocol. We garanderen geen vast percentage vooraf. De besparingscalculator op deze site blijft een scenario dat u zelf kiest.",
        ],
      },
    ],
    faq: [
      {
        q: "Garanderen jullie dat het verzuim daalt?",
        a: "We garanderen geen vast percentage. Na de analyse laten we zien hoe uw percentage kan dalen, op basis van wat we in uw cijfers aantreffen. De gratis aanvraag is die eerste analyse. Het rapport van €995 blijft de uitgewerkte versie, los of in het eerste jaar van Premium.",
      },
      {
        q: "Hoe lang duurt een analyse?",
        a: "Reken op een paar weken, afhankelijk van hoe snel u de cijfers en dossiers deelt. Een exacte doorlooptijd spreken we vooraf af.",
      },
      {
        q: "Moet ik daarna een pakket afnemen?",
        a: "Nee. De analyse staat op zichzelf. Veel werkgevers gebruiken hem wel als start van een Basis- of Premium-blok.",
      },
      {
        q: "Is dit de verzuimsysteemanalyse?",
        a: "Nee. Die kijkt naar rollen, gaten en waar de informatie staat. Deze opdracht is het rapport over cijfers en dossiers. Ontbreekt een verzuimsysteem, dan leveren we er een en borgen daarin de informatie en de trajecten.",
      },
      {
        q: "Delen jullie medische gegevens in het rapport?",
        a: "Nee. We werken met wat een werkgever mag weten: verzuimduur, beperkingen in het werk en gemaakte afspraken. Diagnoses horen niet in het rapport.",
      },
    ],
  },
  {
    slug: "verzuimbeleid-protocol",
    title: "Verzuimprotocol",
    menu: "Verzuimprotocol",
    seoTitle: "Verzuimprotocol opstellen in Brabant",
    h1: "Verzuimprotocol opstellen in Brabant",
    serviceType: "Verzuimprotocol",
    description:
      "Verzuimprotocol opstellen in Noord-Brabant: wie belt op dag één, wat u wel en niet vraagt, en wanneer de bedrijfsarts erbij komt. Voor organisaties met 35–500 medewerkers. Kantoor in Uden.",
    lead: "Een protocol dat in de la ligt, verlaagt geen enkele ziektedag.",
    sections: [
      {
        heading: "Voor wie het is",
        paragraphs: [
          "We schrijven het protocol samen met HR en twee leidinggevenden. Het beleid, de keuzes van de directie, is een aparte opdracht. Dit document is het protocol: wie belt op dag één, wat u wel en niet vraagt, wanneer de bedrijfsarts erbij komt en hoe u een plan van aanpak vastlegt. De tekst volgt de geldende regels voor verzuim en re-integratie, in gewone taal.",
          "Het document sluit aan op uw cao. Een voedselproducent met ploegen heeft andere afspraken dan een accountantskantoor. We leveren geen model dat u alleen van de naam hoeft te ontdoen.",
        ],
      },
      {
        heading: "Ingebruikname",
        paragraphs: [
          "Bij het protocol hoort een korte uitleg aan leidinggevenden. Zonder die uitleg blijft het papier. De uren kunnen uit uw pakket komen of als losse opdracht.",
          "Matchvermogen publiceert een voorbeeld van een verzuimprotocol, met afspraken over de ziekmelding en het moment van een WIA-aanvraag. Een open spreekuur staat daar als vorm van preventie. Een preventief medisch onderzoek bieden we niet als aparte dienst. Een verzuimreglement als los product staat niet onder die naam op de zustermerken; de korte versie van één pagina is de afspraak voor op de afdeling.",
        ],
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/verzuimprotocol-voorbeeld/",
      text: "Voorbeeld van een verzuimprotocol bij Matchvermogen.",
    },
    faq: [
      {
        q: "Leveren jullie een Word-bestand?",
        a: "Ja, zodat uw jurist of OR het kan aanpassen. We leveren ook een korte versie van één pagina voor op de afdeling.",
      },
      {
        q: "Moet de OR instemmen?",
        a: "Een verzuimregeling kan instemmingsplichtig zijn. Dat toetst u met uw eigen adviseur. Wij schrijven de inhoud, we vervangen uw jurist niet.",
      },
      {
        q: "Kunnen jullie een bestaand protocol aanscherpen?",
        a: "Ja. Meestal is bijwerken sneller dan opnieuw beginnen.",
      },
    ],
  },
  {
    slug: "vso-en-ontslagdossier",
    title: "Vaststellingsovereenkomst en ontslagdossier",
    menu: "VSO en ontslagdossier",
    description:
      "Ordenen van het dossier als terugkeer niet lukt en een vaststellingsovereenkomst of beëindiging in beeld komt.",
    lead: "Een slordig dossier maakt een vertrek duurder en trager. Wij ordenen de feiten. De jurist blijft van u.",
    sections: [
      {
        heading: "Wat we wel en niet doen",
        paragraphs: [
          "We zijn geen advocatenkantoor. We zorgen dat de tijdlijn klopt: ziekmelding, adviezen van de bedrijfsarts, plannen, evaluaties en de inzet op ander werk. Een jurist kan daarmee een vaststellingsovereenkomst of een ontslagroute onderbouwen zonder gaten.",
          "Tijdens ziekte geldt een opzegverbod. Een vertrek regelen terwijl iemand ziek is, vraagt zorgvuldigheid. We werken alleen mee aan een route die de medewerker en uw jurist allebei begrijpen. Druk op een zieke medewerker om te tekenen, doen we niet.",
        ],
      },
      {
        heading: "Samenhang met re-integratie",
        paragraphs: [
          "Soms is een vertrek de uitkomst van een tweede spoor dat niets oplevert, soms van een conflict dat niet meer te lijmen is. Eerst moet vaststaan dat terugkeer echt is onderzocht. Dat beschermt u bij een latere toets, en het is eerlijker naar de medewerker.",
        ],
      },
    ],
    faq: [
      {
        q: "Maken jullie de vaststellingsovereenkomst?",
        a: "Nee. Die maakt uw jurist of een advocaat. Wij leveren het feitenoverzicht en blijven beschikbaar voor vragen over het dossier.",
      },
      {
        q: "Kan dit naast een lopend pakket?",
        a: "Ja. De uren komen uit het blok, of we offreren een afgebakend aantal uren voor één dossier.",
      },
      {
        q: "Werken jullie voor de werknemer?",
        a: "Onze opdrachtgever is de werkgever. In het gesprek blijven we correct naar de medewerker. Wie een eigen adviseur zoekt, verwijzen we niet naar onszelf.",
      },
    ],
  },
  {
    slug: "tweede-spoor",
    title: "Tweede spoor",
    menu: "Tweede spoor",
    seoTitle: "Spoor 2 in Brabant",
    h1: "Tweede spoor in Brabant",
    serviceType: "Tweede spoor",
    description:
      `Spoor 2 en tweede spoor in Noord-Brabant: re-integratie bij een andere werkgever, via Best Match, met ${site.discount.tweedeSpoor}% korting voor klanten van Arbopartner Brabant. Kantoor in Uden.`,
    lead: "Als terugkeer in eigen werk niet realistisch is, moet ander werk op tijd starten. Niet in de laatste maand.",
    sections: [
      {
        heading: "Wie het doet",
        paragraphs: [
          "Het traject zelf voert Best Match uit, het zustermerk voor re-integratie. Arbopartner Brabant houdt de regie in het dossier en de afstemming met HR. U heeft één aanspreekpunt en een coach die het dagelijkse traject doet.",
          `Klanten van dit label krijgen ${site.discount.tweedeSpoor}% korting op het tweede spoor bij Best Match. De prijs van het traject hangt af van duur en vorm. Een actueel overzicht van richtprijzen staat bij Matchvermogen. We plakken die bedragen hier niet over als ware het onze prijslijst.`,
        ],
      },
      {
        heading: "Wanneer u start",
        paragraphs: [
          "De vuistregel: zodra duidelijk is dat structurele terugkeer in de eigen functie of in ander werk bij u niet waarschijnlijk is. Wachten tot de bedrijfsarts het woord ‘spoor 2’ uitspreekt, is vaak al laat. De casemanager zet die vraag eerder op tafel.",
          "Arbeidsdeskundig.com vermeldt dat Best Match ook spoor 3 uitvoert. Wat dat traject inhoudt, werken we op deze pagina niet uit. Dat leest u bij Best Match.",
        ],
      },
    ],
    faq: [
      {
        q: "Wie betaalt het tweede spoor?",
        a: "De werkgever. Het hoort bij de re-integratie tijdens de loondoorbetaling. De korting van 10% verrekenen we via Best Match.",
      },
      {
        q: "Kan een traject online?",
        a: "Best Match werkt met coaches op locatie en met online opdrachten. Welke mix past, hangt van de medewerker af.",
      },
      {
        q: "Blijft onze casemanager betrokken?",
        a: "Ja. Het tweede spoor vervangt de casemanager niet. Die bewaakt de samenhang met het eerste spoor en de bedrijfsarts.",
      },
    ],
    sister: {
      name: "Best Match",
      url: "https://bestmatchbv.nl/tweede-spoor/",
      text: "Lees hoe Best Match een tweede spoor uitvoert.",
    },
  },
  {
    slug: "arbeidsdeskundig-onderzoek",
    title: "Arbeidsdeskundig onderzoek",
    menu: "Arbeidsdeskundig onderzoek",
    seoTitle: "Arbeidsdeskundig onderzoek in Brabant",
    h1: "Arbeidsdeskundig onderzoek in Brabant",
    serviceType: "Arbeidsdeskundig onderzoek",
    description:
      `Arbeidsdeskundig onderzoek in Noord-Brabant, via Matchvermogen, met ${site.discount.arbeidsdeskundige}% korting voor klanten van Arbopartner Brabant. Onafhankelijk van de casemanager. Kantoor in Uden.`,
    lead: "Soms is een dossier te zwaar voor begeleiding alleen. Dan heeft u een arbeidsdeskundige nodig, geen extra overleg.",
    sections: [
      {
        heading: "Wanneer een onderzoek helpt",
        paragraphs: [
          "Een onderzoek is op zijn plaats als u wilt weten welk werk iemand nog kan, welke aanpassingen realistisch zijn, en of een andere functie binnen of buiten het bedrijf in beeld moet komen. Ook bij een verschil van inzicht, een naderende WIA-aanvraag of een loonwaarde-vraag is dat de juiste stap.",
          "Het onderzoek doet Matchvermogen, ons moederbedrijf, met register-arbeidsdeskundigen. Arbopartner Brabant blijft de casemanager leveren. We mengen de rollen niet: de onderzoeker is niet dezelfde persoon als de begeleider.",
        ],
      },
      {
        heading: "Korting",
        paragraphs: [
          `Klanten van Arbopartner Brabant krijgen ${site.discount.arbeidsdeskundige}% korting op het arbeidsdeskundig onderzoek bij Matchvermogen. De prijs van een onderzoek hangt af van de vraag. U ontvangt een offerte van Matchvermogen, niet een vast bedrag op deze pagina.`,
        ],
      },
    ],
    faq: [
      {
        q: "Is een arbeidsdeskundige verplicht?",
        a: "Niet in elk dossier. Wel is een deugdelijke onderbouwing van de re-integratie verplicht. Een onderzoek is het middel als de bedrijfsarts en de werkgever de mogelijkheden niet scherp genoeg hebben.",
      },
      {
        q: "Hoe snel kan Matchvermogen starten?",
        a: "Matchvermogen publiceert dat een onderzoek vaak binnen twee weken kan worden afgerond. Of dat voor uw dossier geldt, hoort u bij de offerte.",
      },
      {
        q: "Telt dit als onze eigen review?",
        a: "Nee. Ervaringen op deze site zijn reviews van Matchvermogen, letterlijk overgenomen en als zodanig gelabeld.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/",
      text: "Naar het moederbedrijf voor arbeidsdeskundig onderzoek.",
    },
  },
  {
    slug: "eerste-spoor",
    title: "Eerste spoor",
    menu: "Eerste spoor",
    description:
      "Re-integratie in eigen werk of ander werk bij de eigen werkgever. Matchvermogen noemt dat spoor 1. De gedetacheerde casemanager begeleidt die route. Geen los tarief.",
    lead: "Terugkeer bij u, voordat werk buiten de deur de enige route lijkt.",
    sections: [
      {
        heading: "Wat eerste spoor hier betekent",
        paragraphs: [
          "Matchvermogen beschrijft spoor 1 als eigen werk. De casemanager begeleidt die route: aangepast eigen werk, ander werk in de organisatie, en de termijnen in het dossier. De bedrijfsarts blijft van u. Wij geven geen medisch oordeel.",
          "Dit is het werk van de gedetacheerde casemanager, geen apart geprijsd product. De uren komen uit het blok dat u afneemt.",
        ],
      },
      {
        heading: "Wanneer een onderzoek erbij hoort",
        paragraphs: [
          "Arbeidsdeskundig.com beschrijft dat een onderzoek zicht geeft op passend werk binnen spoor 1, en dat bij de Ziektewet spoor 1 bij de ex-werkgever zorgvuldig wordt afgesloten. Dat onderzoek doet Matchvermogen. De onderzoeker is niet dezelfde persoon als de begeleider.",
        ],
      },
    ],
    faq: [
      {
        q: "Is eerste spoor een los traject met een eigen prijs?",
        a: "Nee. De begeleiding in eigen werk hoort bij de casemanager. Een arbeidsdeskundig onderzoek of een tweede spoor offerteert het zustermerk apart.",
      },
      {
        q: "Wanneer stopt eerste spoor?",
        a: "Als terugkeer in eigen werk of ander werk bij u niet realistisch is. Dan zet de casemanager tweede spoor op tafel, op tijd, niet in de laatste maand.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/verzuimtraining-op-maat/training-verzuim-en-interventies/",
      text: "Daar legt Matchvermogen spoor 1 uit als eigen werk.",
    },
  },
  {
    slug: "leidinggevenden-training",
    title: "Training voor leidinggevenden",
    menu: "Training leidinggevenden",
    seoTitle: "Training leidinggevenden verzuim in Brabant",
    h1: "Training leidinggevenden verzuim in Brabant",
    serviceType: "Training leidinggevenden",
    description:
      "Training voor leidinggevenden in Noord-Brabant: het verzuimgesprek, de Wet verbetering poortwachter en vroegsignalering. Voor organisaties met 35–500 medewerkers. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Het verzuimgesprek, de momenten uit de wet, en signalen vóórdat een dossier vastloopt.",
    sections: [
      {
        heading: "Wat de training behandelt",
        paragraphs: [
          "Drie onderwerpen: het verzuimgesprek, de momenten uit de Wet verbetering poortwachter die bij de leidinggevende horen, en vroegsignalering. Daarnaast oorzaken, het beleid en het moment om een arbeidsdeskundige te bellen, zoals Matchvermogen die training beschrijft.",
          "Duur en prijs publiceren we hier niet. Die hoort u in de offerte, of u leest het aanbod bij Matchvermogen. De training vervangt de casemanager niet en is geen juridisch advies.",
        ],
      },
      {
        heading: "Voor wie",
        paragraphs: [
          `De training is ${site.audience} in Noord-Brabant, naast een lopend blok of als losse opdracht. We oefenen met situaties uit uw organisatie, niet met een verzonnen casus met een naam.`,
        ],
      },
    ],
    faq: [
      {
        q: "Moet elke leidinggevende mee?",
        a: "Dat spreken we af. Meestal starten we met de leidinggevenden die de ziekmeldingen doen.",
      },
      {
        q: "Staat de prijs hier?",
        a: "Nee. Matchvermogen biedt de training. Het bedrag bevestigen we in de offerte.",
      },
      {
        q: "Behandelen jullie de Wet verbetering poortwachter?",
        a: "Ja, in gewone taal: welke momenten in het dossier bij de leidinggevende horen, en wat vroegsignalering daarbij is. De training is geen juridisch advies en vervangt de casemanager niet.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/transformeer-verzuimbeheer-een-verzuimtraining-voor-leidinggevenden/",
      text: "De verzuimtraining voor leidinggevenden bij Matchvermogen.",
    },
  },
  {
    slug: "jobcoaching",
    title: "Jobcoaching",
    menu: "Jobcoaching",
    description:
      "Jobcoaching van Matchvermogen, voor preventie en verzuim: coaching naar werk dat iemand kan volhouden, in de eigen functie of in ander werk.",
    lead: "Een coach naast de medewerker, voordat een dossier alleen nog uit termijnen bestaat.",
    sections: [
      {
        heading: "Wat Matchvermogen hieronder verstaat",
        paragraphs: [
          "De pagina Jobcoaching van Matchvermogen beschrijft coaching naar duurzame inzetbaarheid, in eigen werk of in ander werk, door geregistreerde coaches. Ook signalen vóór verzuim horen daarbij.",
          "Een preventief medisch onderzoek staat niet als dienst op matchvermogen.nl, werkhervattingskas.nl of arbeidsdeskundig.com. Die pagina maken we niet. Preventie is hier de coaching en, in het voorbeeldprotocol, een open spreekuur.",
        ],
      },
      {
        heading: "Wat we niet overnemen",
        paragraphs: [
          "Besparingscijfers van die pagina, zoals een bedrag per dag of een percentage korter verzuim, zetten we hier niet neer. Onze verzuimkosten rekenen met de TNO-dagkosten en een scenario dat u zelf kiest. Geen garantie vooraf.",
        ],
      },
    ],
    faq: [
      {
        q: "Is jobcoaching hetzelfde als tweede spoor?",
        a: "Nee. Jobcoaching kan ook in het eigen werk, en vóór een lang dossier. Tweede spoor is re-integratie bij een andere werkgever, via Best Match.",
      },
      {
        q: "Wie is de opdrachtgever?",
        a: "De werkgever. De coach blijft correct naar de medewerker. We zijn geen behandelaar.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/jobcoaching/",
      text: "Jobcoaching bij Matchvermogen, voor preventie en verzuim.",
    },
  },
  {
    slug: "mediation",
    title: "Mediation bij verzuim",
    menu: "Mediation",
    description:
      "Mediation door een arbeidsdeskundige mediator van Matchvermogen, als verzuim en een conflict door elkaar lopen.",
    lead: "Eerst uit elkaar halen wat ziekte is en wat een conflict is. Daarna pas de route kiezen.",
    sections: [
      {
        heading: "Wat de mediator doet",
        paragraphs: [
          "Matchvermogen werkt met een arbeidsdeskundige mediator. Die scheidt het verzuim van het conflict en kan een vaststellingsovereenkomst bespreken. Wij zijn geen advocatenkantoor. De jurist of advocaat blijft van u. Druk op een zieke medewerker om te tekenen, doen we niet.",
          "De casemanager houdt het dossier bij. De mediator is een andere rol. Zo blijft het gesprek over het conflict los van de termijnen.",
        ],
      },
    ],
    faq: [
      {
        q: "Maken jullie de vaststellingsovereenkomst?",
        a: "Nee. Die maakt uw jurist. De mediator en de casemanager leveren het feitenoverzicht.",
      },
      {
        q: "Kan mediation naast een lopend blok?",
        a: "Ja. De uren komen uit het blok, of we offreren een afgebakend aantal uren voor één dossier.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/arbeidsdeskundige-mediator/",
      text: "Arbeidsdeskundige mediator bij Matchvermogen.",
    },
  },
  {
    slug: "wia-begeleiding",
    title: "WIA-begeleiding",
    menu: "WIA-begeleiding",
    description:
      "De casemanager bewaakt het dossier richting de WIA. De aanvraag van de werknemer dienen we niet in. Bezwaar en premie horen bij de zustermerken.",
    lead: "Rond week 88 hoort het re-integratiedossier compleet te zijn. Dat bewaken we. De aanvraag zelf niet.",
    sections: [
      {
        heading: "Wat we wel doen",
        paragraphs: [
          "De casemanager houdt de datum in de gaten waarop de WIA in beeld komt, grofweg week 88 tot 93, en kijkt of de stukken er zijn: plannen, evaluaties, inzet op eigen werk en, waar nodig, tweede spoor. Arbeidsdeskundig.com beschrijft dat een arbeidsdeskundige vlak voor die aanvraag helpt bij een onderbouwde beoordeling. Dat onderzoek doet Matchvermogen.",
          "Werkhervattingskas.nl heeft een rekenhulp voor een WIA-uitkering en hulp bij een WHK-beschikking, bezwaar en premie. De begeleiding vanuit Brabant staat op de pagina Bezwaar en beroep. Het bezwaar zelf loopt via Matchvermogen. We plakken uitkomsten van het zustermerk hier niet over.",
        ],
      },
      {
        heading: "Wat we niet doen",
        paragraphs: [
          "We dienen de WIA-aanvraag van de werknemer niet in en we voorspellen de uitkomst niet. UWV beslist. Een loonsanctie blijft een risico dat UWV oplegt, geen belofte die wij wegnemen.",
        ],
      },
    ],
    faq: [
      {
        q: "Vullen jullie de WIA-aanvraag in?",
        a: "Nee. De werknemer vraagt de uitkering aan. Wij zorgen dat het dossier van de werkgever de re-integratie kan laten zien.",
      },
      {
        q: "Waar regel ik bezwaar of de premie?",
        a: "U spreekt de begeleiding hier af, op de pagina Bezwaar en beroep. Het bezwaar zelf loopt via Matchvermogen. Premie en de WGA-beschikking horen bij werkhervattingskas.nl. Wij zijn geen advocatenkantoor en beloven de uitkomst van UWV niet.",
      },
    ],
    sister: {
      name: "Werkhervattingskas.nl",
      url: "https://werkhervattingskas.nl",
      text: "WIA-rekentool, WHK-beschikking en premie bij het zustermerk.",
    },
  },
  ...hrServices,
  ...extraServices,
];

export const serviceIcons = {
  "casemanager-detachering": "calendar",
  verzuimanalyse: "chart",
  "verzuimbeleid-protocol": "document",
  "vso-en-ontslagdossier": "balance",
  "tweede-spoor": "route",
  "arbeidsdeskundig-onderzoek": "shield",
  "eerste-spoor": "building",
  "leidinggevenden-training": "chairs",
  jobcoaching: "pin",
  mediation: "swap",
  "wia-begeleiding": "clock",
  "functiehuis-opstellen": "building",
  "verzuimbeleid-opstellen": "document",
  verzuimsysteemanalyse: "chart",
  "tender-arbodiensten": "balance",
  "re-integratiebeleid-opstellen": "route",
  eigenrisicodragerschap: "shield",
  "dossiertoets-wia": "document",
  "bezwaar-beroep": "balance",
  eerstejaarsevaluatie: "calendar",
  verzuimpreventie: "chart",
  "interim-casemanager": "clock",
  "second-opinion-verzuim": "swap",
} as const;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
