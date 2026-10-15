import { site } from "./site";

export type Service = {
  slug: string;
  title: string;
  menu: string;
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
    description:
      "Een vaste gedetacheerde casemanager voor werkgevers in Brabant met 35 of meer medewerkers. Reistijd binnen 45 minuten van Uden zit in het tarief.",
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
          "Detacheren geeft u zekerheid die een dienstverband niet vanzelf heeft. Wordt de casemanager ziek, dan regelen wij vervanging. U bouwt geen transitievergoeding op, u werft niet, en u schaalt de uren mee met het aantal dossiers. We claimen niet dat dit goedkoper is dan iemand in dienst. De vergelijking per productief uur maakt u zelf.",
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
        a: "We werken voor werkgevers met 35 of meer medewerkers, binnen ongeveer 45 minuten rijden van Uden.",
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
    description:
      "Een verzuimanalyse van uw dossiers en cijfers, voor €995. In het Premium-pakket zit de analyse het eerste jaar inbegrepen.",
    lead: "Eerst kijken wat er echt speelt. Dan pas uren inkopen.",
    sections: [
      {
        heading: "Wat u krijgt",
        paragraphs: [
          "We lezen uw verzuimcijfers, een steekproef van dossiers en het protocol als dat er is. U krijgt een kort rapport: waar de dagen ontstaan, welke dossiers te lang zonder plan lopen, en of uw percentage boven of onder de CBS-benchmark voor uw grootte zit.",
          "De analyse kost €995 exclusief btw. In het Premium-pakket van twintig uur per week zit deze analyse het eerste jaar inbegrepen. Los kopen kan ook, zonder dat u meteen een casemanager detacheert.",
        ],
      },
      {
        heading: "Wat we niet beloven",
        paragraphs: [
          "Een analyse is geen garantie dat uw verzuim daalt. We laten zien waar het geld en de risico’s zitten. De besparingscalculator op deze site werkt met scenario’s die u zelf kiest. Die scenario’s zijn geen belofte.",
        ],
      },
    ],
    faq: [
      {
        q: "Hoe lang duurt een analyse?",
        a: "Reken op een paar weken, afhankelijk van hoe snel u de cijfers en dossiers deelt. Een exacte doorlooptijd spreken we vooraf af.",
      },
      {
        q: "Moet ik daarna een pakket afnemen?",
        a: "Nee. De analyse staat op zichzelf. Veel werkgevers gebruiken hem wel als start van een Basis- of Premium-blok.",
      },
      {
        q: "Delen jullie medische gegevens in het rapport?",
        a: "Nee. We werken met wat een werkgever mag weten: verzuimduur, beperkingen in het werk en gemaakte afspraken. Diagnoses horen niet in het rapport.",
      },
    ],
  },
  {
    slug: "verzuimbeleid-protocol",
    title: "Verzuimbeleid en protocol",
    menu: "Verzuimbeleid",
    description:
      "Een verzuimprotocol dat leidinggevenden echt gebruiken, afgestemd op uw cao en uw grootte.",
    lead: "Een protocol dat in de la ligt, verlaagt geen enkele ziektedag.",
    sections: [
      {
        heading: "Voor wie het is",
        paragraphs: [
          "We schrijven het protocol samen met HR en twee leidinggevenden. Daarin staat wie belt op dag één, wat u wel en niet vraagt, wanneer de bedrijfsarts erbij komt en hoe u een plan van aanpak vastlegt. De tekst volgt de geldende regels voor verzuim en re-integratie, in gewone taal.",
          "Het document sluit aan op uw cao. Een voedselproducent met ploegen heeft andere afspraken dan een accountantskantoor. We leveren geen model dat u alleen van de naam hoeft te ontdoen.",
        ],
      },
      {
        heading: "Ingebruikname",
        paragraphs: [
          "Bij het protocol hoort een korte uitleg aan leidinggevenden. Zonder die uitleg blijft het papier. De uren kunnen uit uw pakket komen of als losse opdracht.",
        ],
      },
    ],
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
    description:
      "Re-integratie bij een andere werkgever, uitgevoerd door zustermerk Best Match, met 10% korting voor klanten van Arbopartner Brabant.",
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
    description:
      "Een onafhankelijk arbeidsdeskundig onderzoek via Matchvermogen, met 8% korting als u klant bent van Arbopartner Brabant.",
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
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
