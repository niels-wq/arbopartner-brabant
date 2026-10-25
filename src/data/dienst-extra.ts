import type { ServiceLayout } from "./service-layout";
import type { Service } from "./services";

const usp =
  "Ontbreekt een verzuimsysteem, dan leveren we er een en borgen daarin de informatie en de trajecten.";

const voorWie =
  "Voor organisaties met 35–500 medewerkers in Noord-Brabant. Het kantoor staat in Uden. Een organisatie kleiner dan 35 medewerkers verwijzen we naar Matchvermogen. Meer dan 500 medewerkers valt buiten dit label.";

export const extraServices: Service[] = [
  {
    slug: "eigenrisicodragerschap",
    title: "Eigenrisicodragerschap",
    menu: "Eigenrisicodragerschap",
    seoTitle: "Eigenrisicodragerschap WGA in Brabant",
    h1: "Eigenrisicodragerschap WGA en Ziektewet in Brabant",
    serviceType: "Eigenrisicodragerschap",
    description:
      "Advies over eigenrisicodragerschap voor de WGA en de Ziektewet in Noord-Brabant. Losse consultatie, of advies en beheer als u de stap zet. Geen besparing op deze pagina. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Een losse consultatie voor de keuze, of beheer als u overstapt. Geen rekensom die wij hier invullen.",
    sections: [
      {
        heading: "Advies en beheer",
        paragraphs: [
          "We zetten op een rij wat eigenrisico voor de WGA en voor de Ziektewet voor uw organisatie betekent: welke dossiers bij u blijven, wie de re-integratie doet, en wat u zelf moet kunnen organiseren. De keuze om over te stappen of bij het publieke bestel te blijven, neemt u.",
          "Zet u de stap, dan kunnen we het beheer van die dossiers doen. De premie, de WGA-beschikking en het bezwaar blijven bij Matchvermogen en werkhervattingskas.nl. Wij zijn geen uitvoerder van UWV en geen advocatenkantoor.",
        ],
      },
    ],
    faq: [
      {
        q: "Rekenen jullie voor of eigenrisico voordeliger is?",
        a: "Nee. Op deze pagina staat geen besparing en geen premiebedrag. Een losse consultatie levert een korte beslisnotitie. Het uitgebreide advies en het beheer zijn een grotere opdracht. Cijfers over uw premie horen bij uw beschikking en bij werkhervattingskas.nl.",
      },
      {
        q: "Doen jullie de aanmelding bij UWV?",
        a: "De formele keuze en de aanmelding blijven van u. Wij leveren de beslisnotitie en kunnen daarna de dossiers beheren. Wat UWV van een aanmelding vraagt, toetst u met uw eigen adviseur.",
      },
      {
        q: "Is dit hetzelfde als WIA-begeleiding?",
        a: "Nee. WIA-begeleiding bewaakt het dossier van een zieke medewerker richting de aanvraag. Eigenrisicodragerschap gaat over de keuze van de werkgever en over het beheer dat daarbij hoort.",
      },
      {
        q: "Waar ligt bezwaar tegen een WGA-beschikking?",
        a: "De begeleiding spreekt u met ons af. Het bezwaar zelf loopt via Matchvermogen. Premie en beschikking horen bij werkhervattingskas.nl. De uitkomst van UWV beloven we niet.",
      },
    ],
    sister: {
      name: "Werkhervattingskas.nl",
      url: "https://werkhervattingskas.nl",
      text: "Premie, WGA-beschikking en de rekenhulp bij het zustermerk.",
    },
  },
  {
    slug: "dossiertoets-wia",
    title: "Dossiertoets vóór WIA",
    menu: "Dossiertoets WIA",
    seoTitle: "Dossiertoets vóór WIA in Brabant",
    h1: "Dossiertoets vóór de WIA-aanvraag in Brabant",
    serviceType: "Dossiertoets",
    description:
      "Dossiertoets vóór de WIA-aanvraag in Noord-Brabant. We lezen één re-integratiedossier op gaten die bij een loonsanctie kunnen meewegen. Geen oordeel van UWV en geen garantie. Kantoor in Uden.",
    lead: "Eén dossier, één moment, vóór de aanvraag. Niet de begeleiding van de hele twee jaar.",
    sections: [
      {
        heading: "Wat de toets is",
        paragraphs: [
          "We lezen de stukken die een werkgever mag hebben: plannen, evaluaties, inzet op eigen werk en, waar dat aan de orde is, tweede spoor. U krijgt een lijst met wat er ligt en wat nog open is voordat de WIA-aanvraag in beeld is.",
          "UWV beslist over een loonsanctie. Wij voorkomen die niet bij voorbaat en dienen de aanvraag van de werknemer niet in. De gratis loonsanctie-risicoscan is een vragenlijst, geen toets van uw stukken.",
        ],
      },
    ],
    faq: [
      {
        q: "Voorkomt deze toets een loonsanctie?",
        a: "Nee. UWV legt een loonsanctie op, of niet. De toets laat zien welke gaten u nog kunt dichten. Een garantie dat de sanctie uitblijft, geven we niet.",
      },
      {
        q: "Is dit hetzelfde als WIA-begeleiding?",
        a: "Nee. WIA-begeleiding is het bijhouden van het dossier in de uren van de casemanager, zonder los tarief. Deze toets is een afgebakende lezing van één dossier op één moment.",
      },
      {
        q: "Vullen jullie de WIA-aanvraag in?",
        a: "Nee. De werknemer vraagt de uitkering aan. Wij kijken of het werkgeversdossier de re-integratie kan laten zien.",
      },
      {
        q: "Vervangt dit de gratis risicoscan?",
        a: "Nee. De scan stelt tien vragen en geeft een indicatie. Deze opdracht leest de stukken die u aanlevert. Geen van beide is een oordeel van UWV.",
      },
    ],
  },
  {
    slug: "bezwaar-beroep",
    title: "Bezwaar en beroep",
    menu: "Bezwaar en beroep",
    seoTitle: "Bezwaar en beroep verzuim in Brabant",
    h1: "Bezwaar en beroep bij loonsanctie en WIA in Brabant",
    serviceType: "Bezwaar en beroep",
    description:
      "Begeleiding bij bezwaar en beroep in Noord-Brabant: loonsanctie, WIA-besluit en WGA-beschikking. Eén aanspreekpunt. Het bezwaar loopt via Matchvermogen. Wij zijn geen advocatenkantoor. Kantoor in Uden.",
    lead: "U wilt weten of bezwaar de moeite is, en iemand die de termijn bewaakt. De uitkomst beslist UWV.",
    sections: [
      {
        heading: "Wat we begeleiden",
        paragraphs: [
          "Een loonsanctie, een WIA-besluit of een WGA-beschikking. We lezen het besluit met de arbeidsdeskundige kennis van Matchvermogen en zeggen of bezwaar zinvol lijkt. Het bezwaar zelf loopt via dat zustermerk. Premie en beschikking horen bij werkhervattingskas.nl.",
          "Wij zijn geen advocatenkantoor. Wordt het een juridische procedure, dan schakelt u zelf een advocaat in. De uitkomst beloven we niet.",
        ],
      },
    ],
    faq: [
      {
        q: "Dienen jullie het bezwaar zelf in?",
        a: "Het bezwaar loopt via Matchvermogen. Arbopartner Brabant is het aanspreekpunt voor de werkgever in Brabant. Wij zijn geen advocatenkantoor.",
      },
      {
        q: "Voor welke beslissingen is dit?",
        a: "Voor een loonsanctie, een WIA-besluit en een WGA-beschikking. Een ander geschil, zoals een ontslagzaak, hoort bij uw eigen jurist.",
      },
      {
        q: "Beloven jullie dat UWV terugkomt op het besluit?",
        a: "Nee. UWV beslist. Wij zeggen of de stukken en de termijn een bezwaar kunnen dragen.",
      },
      {
        q: "Wat doet werkhervattingskas.nl daarbij?",
        a: "Premie, de WGA-beschikking en de rekenhulp blijven bij dat zustermerk. We plakken hun uitkomsten hier niet over als onze belofte.",
      },
    ],
    sister: {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl/",
      text: "Bezwaar en beroep loopt via Matchvermogen.",
    },
  },
  {
    slug: "eerstejaarsevaluatie",
    title: "Eerstejaarsevaluatie",
    menu: "Eerstejaarsevaluatie",
    seoTitle: "Eerstejaarsevaluatie in Brabant",
    h1: "Eerstejaarsevaluatie en re-integratieverslag in Brabant",
    serviceType: "Eerstejaarsevaluatie",
    description:
      "Eerstejaarsevaluatie en re-integratieverslag opstellen of toetsen in Noord-Brabant. Rond week 52, voor organisaties met 35–500 medewerkers. Geen oordeel van UWV. Kantoor in Uden.",
    lead: "Rond week 52 hoort op papier te staan wat er is geprobeerd en wat het tweede jaar vraagt.",
    sections: [
      {
        heading: "Opstellen of toetsen",
        paragraphs: [
          "We schrijven de eerstejaarsevaluatie met u, of we lezen de versie die er al ligt. In dezelfde opdracht kijken we of het re-integratieverslag de lijn van het eerste jaar kan dragen: plannen, bijstellingen en de inzet op eigen werk of ander werk.",
          "UWV beoordeelt het verslag later zelf. Wij beloven niet dat het wordt geaccepteerd. Een toets van het hele dossier vlak voor de WIA-aanvraag is een andere opdracht.",
        ],
      },
    ],
    faq: [
      {
        q: "Schrijven jullie de evaluatie of kijken jullie mee?",
        a: "Allebei kan. De offerte zegt of we een concept maken of een bestaand stuk toetsen, en of het re-integratieverslag daarbij hoort.",
      },
      {
        q: "Is dit de dossiertoets vóór de WIA?",
        a: "Nee. Die leest het dossier op gaten richting de aanvraag. Deze opdracht zit rond week 52, bij de evaluatie en het verslag van het eerste jaar.",
      },
      {
        q: "Accepteert UWV het verslag dan?",
        a: "Dat beslissen wij niet. We maken het stuk leesbaar voor iemand die er later alleen de tekst van ziet.",
      },
      {
        q: "Staat de medische informatie erin?",
        a: "Nee. We verwerken wat een werkgever mag weten: beperkingen in het werk, afspraken en termijnen. Diagnoses horen niet in het verslag dat wij schrijven.",
      },
    ],
  },
  {
    slug: "verzuimpreventie",
    title: "Verzuimpreventie",
    menu: "Verzuimpreventie",
    seoTitle: "Verzuimpreventie in Brabant",
    h1: "Verzuimpreventie en duurzame inzetbaarheid in Brabant",
    serviceType: "Verzuimpreventie",
    description:
      "Verzuimpreventie en duurzame inzetbaarheid in Noord-Brabant, voor de hele organisatie. Signalen, rollen en het gesprek van de leidinggevende. Geen preventief medisch onderzoek. Kantoor in Uden.",
    lead: "Preventie voor de organisatie: wie ingrijpt vóórdat een dossier alleen nog uit termijnen bestaat.",
    sections: [
      {
        heading: "Organisatie, niet één medewerker",
        paragraphs: [
          "We kijken naar frequent verzuim, de rol van de leidinggevende, en wat HR vastlegt zonder medische details. Het resultaat is een korte lijn: signalen, het gesprek, en wanneer u opschaalt naar de casemanager of de bedrijfsarts.",
          "Een coach naast één medewerker is jobcoaching. Een preventief medisch onderzoek bieden we niet. De bedrijfsarts blijft van u. Wij zijn geen arbodienst.",
        ],
      },
    ],
    faq: [
      {
        q: "Is dit een preventief medisch onderzoek?",
        a: "Nee. Dat onderzoek bieden we niet aan. Preventie is hier de organisatie: signalen, rollen en het gesprek. Medische oordelen blijven bij de bedrijfsarts.",
      },
      {
        q: "Is dit hetzelfde als jobcoaching?",
        a: "Nee. Jobcoaching is een coach naast één medewerker, via Matchvermogen. Deze opdracht gaat over de lijn voor de hele organisatie.",
      },
      {
        q: "Garanderen jullie dat het verzuim daalt?",
        a: "Nee. We leveren een plan dat leidinggevenden kunnen gebruiken. Een percentage daling beloven we niet.",
      },
      {
        q: "Hoort de training voor leidinggevenden hierbij?",
        a: "Die kan erna, als aparte opdracht. Het plan zegt wat ze moeten kunnen. De training oefent het gesprek.",
      },
    ],
  },
  {
    slug: "interim-casemanager",
    title: "Interim casemanager",
    menu: "Interim casemanager",
    seoTitle: "Interim casemanager in Brabant",
    h1: "Interim casemanager en verzuimcoördinator in Brabant",
    serviceType: "Interim casemanagement",
    description:
      "Interim casemanager of verzuimcoördinator op locatie in Noord-Brabant. Tijdelijke vervanging bij ziekte, een vacature of een piek. Voor organisaties met 35–500 medewerkers. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Iemand op locatie voor een afgesproken periode. Geen vast uurblok dat daarna vanzelf doorloopt.",
    sections: [
      {
        heading: "Tijdelijk op locatie",
        paragraphs: [
          "De interim-casemanager pakt de lopende dossiers op, spreekt leidinggevenden en houdt de termijnen bij. Zit het werk vooral in coördineren, registreren en de lijn bewaken, dan is dezelfde opdracht een verzuimcoördinator. We openen daar geen tweede pagina voor.",
          "Een vaste gedetacheerde casemanager, met uren die meeschalen, is een andere afspraak. De offerte van deze opdracht noemt de periode, de dagen op locatie en het tarief. Een dagprijs publiceren we hier niet.",
        ],
      },
    ],
    faq: [
      {
        q: "Is een verzuimcoördinator een andere dienst?",
        a: "Nee. Het is dezelfde tijdelijke inzet. De offerte zegt of het zwaartepunt op dossiers zit of op coördinatie. U huurt niet twee functies door elkaar.",
      },
      {
        q: "Wat is het verschil met een gedetacheerde casemanager?",
        a: "Detacheren is een lopend uurblok met één vast gezicht. Interim is een afgebakende periode op locatie, bijvoorbeeld bij uitval of een vacature. Daarna stopt het, tenzij u een nieuw blok afspreekt.",
      },
      {
        q: "Staat het tarief op deze pagina?",
        a: "Nee. De offerte noemt de periode, de dagen op locatie en het tarief. De uurtarieven op de tarievenpagina horen bij een lopend blok, niet bij een dagprijs voor deze interim-inzet.",
      },
      {
        q: "Werkt de interim-casemanager op locatie?",
        a: "Ja, op afgesproken dagen bij u in Noord-Brabant. Reistijd binnen 45 minuten van het kantoor in Uden zit in het tarief. Verder weg staat in de offerte.",
      },
    ],
  },
  {
    slug: "second-opinion-verzuim",
    title: "Second opinion verzuim",
    menu: "Second opinion",
    seoTitle: "Second opinion verzuim in Brabant",
    h1: "Second opinion op een verzuimtraject in Brabant",
    serviceType: "Second opinion verzuim",
    description:
      "Second opinion op een lopend verzuimtraject in Noord-Brabant. We lezen route, dossier en plan. Geen medisch oordeel en geen deskundigenoordeel van UWV. Kantoor in Uden.",
    lead: "Een tweede blik op de route die er al loopt. Niet een nieuwe arts en niet een oordeel van UWV.",
    sections: [
      {
        heading: "Wat we lezen",
        paragraphs: [
          "Iemand anders begeleidt het dossier, of het ligt stil. We lezen de plannen, de evaluaties en wie welke rol had. U hoort wat de route sterk maakt en wat open blijft.",
          "Dit is geen medische second opinion en geen deskundigenoordeel van UWV. Wat iemand medisch kan, blijft bij de bedrijfsarts. Welk werk nog passend is, kan een arbeidsdeskundig onderzoek van Matchvermogen zijn. Dat is een andere opdracht.",
        ],
      },
    ],
    faq: [
      {
        q: "Geven jullie een medische second opinion?",
        a: "Nee. We zijn geen arts en geen arbodienst. De bedrijfsarts blijft van u. Wij lezen de route, het dossier en het plan.",
      },
      {
        q: "Is dit een deskundigenoordeel van UWV?",
        a: "Nee. Dat vraagt u bij UWV. Deze opdracht is een lezing door ons, op uw verzoek, van een traject dat al loopt.",
      },
      {
        q: "Is dit de dossiertoets vóór de WIA?",
        a: "Nee. Die kijkt naar gaten vlak voor de aanvraag. Een second opinion kan eerder, op een traject dat vastloopt of waar u twijfelt aan de lijn.",
      },
      {
        q: "Nemen jullie het dossier daarna over?",
        a: "Alleen als u dat apart afspreekt, als interim of als detachering. De second opinion stopt bij het advies.",
      },
    ],
  },
  {
    slug: "verzuimsysteem-implementatie",
    title: "Verzuimsysteem implementatie",
    menu: "Systeem implementeren",
    seoTitle: "Verzuimsysteem implementatie in Brabant",
    h1: "Verzuimsysteem implementatie in Brabant",
    serviceType: "Verzuimsysteem implementatie",
    description:
      "Verzuimsysteem implementeren in Noord-Brabant: inrichting, migratie, koppeling en training. Aansluitend op de verzuimsysteemanalyse. Voor organisaties met 35–500 medewerkers. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "De analyse zegt wat er mist. Deze opdracht richt het systeem in en zet de dossiers erin.",
    sections: [
      {
        heading: "Na de analyse",
        paragraphs: [
          "De verzuimsysteemanalyse kijkt naar rollen, gaten en waar de informatie staat. Deze pagina is het vervolg: inrichten, bestaande dossiers overzetten, afspreken wie wat ziet, en leidinggevenden en HR trainen.",
          "Een productnaam van een softwarehuis publiceren we niet. Ontbreekt een systeem, dan leveren we er een. Een technische koppeling met loonadministratie of de arbodienst nemen we alleen op als dat systeem het toelaat. De offerte zegt of die koppeling in de opdracht zit.",
        ],
      },
    ],
    faq: [
      {
        q: "Is dit de verzuimsysteemanalyse?",
        a: "Nee. De analyse zegt welk systeem past en waar de gaten zitten. Deze opdracht richt in, migreert, koppelt waar dat kan, en traint de gebruikers.",
      },
      {
        q: "Zetten jullie oude dossiers over?",
        a: "Ja, de stukken die een werkgever mag bewaren: plannen, termijnen en afspraken. Diagnoses horen er niet in.",
      },
      {
        q: "Koppelen jullie aan elk pakket?",
        a: "Nee. We beloven geen koppeling met een genoemd softwarepakket. De offerte zegt of een koppeling met loonadministratie of de arbodienst in deze opdracht zit.",
      },
      {
        q: "Moet de analyse eerst?",
        a: "Dat is de gewone volgorde. Zonder analyse richten we in op aannames. De analyse kan in dezelfde periode, als aparte afspraak.",
      },
    ],
  },
  {
    slug: "verzuimverzekeringen",
    title: "Verzuimverzekeringen",
    menu: "Verzuimverzekeringen",
    seoTitle: "Verzuimverzekeringen advies in Brabant",
    h1: "Advies verzuimverzekeringen in Brabant",
    serviceType: "Advies verzuimverzekeringen",
    description:
      "Advies over de dekking van verzuimverzekeringen in Noord-Brabant, in afstemming met onze verzekeringspartners. Wij sluiten geen polis en innen geen premie. Kantoor in Uden. Offerte binnen 24 uur.",
    lead: "Het advies gaat over de dekking en over de afstemming met onze verzekeringspartners. Hun namen zetten we hier niet neer.",
    sections: [
      {
        heading: "Dekking, geen polis",
        paragraphs: [
          "We kijken wat uw verzuim vraagt van een dekking: lopende dossiers, eigenrisico, en wat u zelf organiseert. Dat stemmen we af met onze verzekeringspartners. Wij zijn geen verzekeraar en geen bemiddelaar. Een polis sluiten en een premie innen doen we niet.",
          "Een premiebedrag, een vergelijking van polissen en een naam van een partner publiceren we niet. De offerte beschrijft het advies, niet een verzekering.",
        ],
      },
    ],
    faq: [
      {
        q: "Sluiten jullie de verzekering?",
        a: "Nee. Wij zijn geen verzekeraar en geen bemiddelaar. We adviseren over de dekking en stemmen de aanpak af met onze verzekeringspartners. De polis en de premie lopen niet via deze pagina.",
      },
      {
        q: "Welke partners zijn dat?",
        a: "Die namen zetten we hier niet neer. In het gesprek hoort u met wie we afstemmen. Een partner is geen reden om een premie op deze site te zetten.",
      },
      {
        q: "Is dit een advies over eigenrisicodragerschap?",
        a: "Nee. Eigenrisico voor de WGA en de Ziektewet heeft een eigen pagina, met een losse consultatie. Een verzuimverzekering is een andere vraag. Ze kunnen wel in één offerte naast elkaar staan.",
      },
      {
        q: "Staat er een premie op deze pagina?",
        a: "Nee. Geen premie, geen dekkingsbedrag en geen vergelijking van polissen.",
      },
    ],
  },
  {
    slug: "reorganisatie-verzuim",
    title: "Reorganisatie en verzuim",
    menu: "Reorganisatie en verzuim",
    seoTitle: "Reorganisatie en verzuim in Brabant",
    h1: "Reorganisatie en verzuim in Brabant",
    serviceType: "Reorganisatie en verzuim",
    description:
      "Verzuim tijdens en na een reorganisatie in Noord-Brabant. Dossiers, re-integratie en het functiehuis op orde naast het opzegverbod bij ziekte. Wij zijn geen advocatenkantoor. Kantoor in Uden.",
    lead: "Een reorganisatie en een ziekmelding lopen door elkaar. Het dossier, de re-integratie en het functiehuis moeten dat uit elkaar houden.",
    sections: [
      {
        heading: "Feiten, geen ontslag",
        paragraphs: [
          "We ordenen welke medewerkers ziek zijn, welke plannen er liggen, en welk werk het functiehuis nog heeft. De re-integratie loopt door terwijl de organisatie verandert. Een vaststellingsovereenkomst maakt uw jurist. Die pagina bestaat apart.",
          "Tijdens ziekte geldt een opzegverbod. Of in uw geval een uitzondering geldt, toetst uw jurist of advocaat. Wij voeren het ontslag niet uit.",
        ],
      },
    ],
    faq: [
      {
        q: "Maken jullie het ontslag of de vaststellingsovereenkomst?",
        a: "Nee. Dat doet uw jurist of advocaat. Wij ordenen het verzuimdossier, de re-integratie en het functiehuis.",
      },
      {
        q: "Geldt het opzegverbod tijdens ziekte?",
        a: "Ja, tijdens ziekte geldt een opzegverbod. Of een uitzondering op uw reorganisatie van toepassing is, toetst uw eigen jurist. Wij nemen die toets niet over.",
      },
      {
        q: "Hoort het functiehuis hierbij?",
        a: "Het functiehuis laat zien welk werk er na de reorganisatie nog is. We kunnen het in dezelfde periode opstellen, als aparte opdracht, of een bestaand huis nalopen.",
      },
      {
        q: "Is dit hetzelfde als een VSO-dossier?",
        a: "Nee. Die pagina ordent één dossier als een vertrek in beeld komt. Deze opdracht gaat over verzuim in de hele reorganisatie.",
      },
    ],
  },
  {
    slug: "verzuimreductie",
    title: "Verzuimreductie",
    menu: "Verzuimreductie",
    seoTitle: "No cure no pay verzuimreductie in Brabant",
    h1: "No cure no pay verzuimreductie in Brabant",
    serviceType: "Verzuimreductie",
    description:
      "Verzuimreductie in Noord-Brabant na een risicoanalyse. Eerst de verzuimanalyse, daarna een traject waarbij betaling afhangt van het resultaat. Voorwaarden in overleg, in de offerte. Geen percentage op deze pagina. Kantoor in Uden.",
    lead: "Eerst de risicoanalyse. Daarna een reductietraject waarbij de betaling afhangt van het resultaat dat we samen afspreken.",
    sections: [
      {
        heading: "Analyse eerst",
        paragraphs: [
          "De risicoanalyse is de verzuimanalyse: cijfers, een steekproef van dossiers en het protocol. Die heeft een eigen pagina. Zonder die analyse is een reductietraject een belofte zonder basis.",
          "Daarna kan een traject waarin de betaling afhangt van het resultaat. Welk resultaat telt, hoe we het meten, en hoe de betaling daarvan afhangt, spreken we in overleg af. Dat staat in de offerte. Een percentage publiceren we niet. Een daling garanderen we niet.",
        ],
      },
    ],
    faq: [
      {
        q: "Welk percentage daling spreken jullie af?",
        a: "Geen enkel percentage op deze pagina. Het resultaat en de manier van meten staan in de offerte, in overleg. We garanderen geen daling vooraf.",
      },
      {
        q: "Is de risicoanalyse dezelfde als de verzuimanalyse?",
        a: "Ja. Die leest cijfers, dossiers en het protocol, en heeft een eigen pagina met een gepubliceerde prijs voor het rapport. Deze pagina is het traject daarna.",
      },
      {
        q: "Betaal ik niets als het resultaat uitblijft?",
        a: "Hoe de betaling van het resultaat afhangt, inclusief wat er gebeurt als het resultaat uitblijft, staat in de offerte. Dat spreken we in overleg af. Het staat niet vast op deze pagina.",
      },
      {
        q: "Kan ik alleen de analyse doen?",
        a: "Ja. De verzuimanalyse staat op zichzelf. Het reductietraject is een vervolg, geen verplichting.",
      },
    ],
  },
  {
    slug: "integrale-verzuimaanpak",
    title: "Integrale verzuimaanpak",
    menu: "Integrale aanpak",
    seoTitle: "Integrale verzuimaanpak in Brabant",
    h1: "Integrale verzuimaanpak in Brabant",
    serviceType: "Integrale verzuimaanpak",
    description:
      "Integrale verzuimaanpak in Noord-Brabant. Instap via de risicoanalyse, daarna de diensten die uw dossiers vragen. Los af te nemen of gecombineerd, op uurbasis of als vaste prijs na offerte. Kantoor in Uden.",
    lead: "Eén lijn voor de diensten die u nodig heeft. De instap is de risicoanalyse. Daarna kiest u wat erbij hoort.",
    sections: [
      {
        heading: "Wat erin kan zitten",
        paragraphs: [
          "De risicoanalyse is de verzuimanalyse. Daarna kan begeleiding, toetsing, een HR-project, interim of spoedhulp. Elke dienst blijft los af te nemen. In de integrale aanpak staan ze in één offerte, met één aanspreekpunt.",
          "Twee vormen: op uurbasis, of als kant-en-klaar product met een vaste prijs na offerte. De offerte zegt per onderdeel welke vorm past.",
        ],
      },
    ],
    faq: [
      {
        q: "Moet ik alle diensten afnemen?",
        a: "Nee. Elke dienst is los af te nemen. De integrale aanpak bundelt alleen wat uw risicoanalyse aanwijst.",
      },
      {
        q: "Waar begin ik?",
        a: "Bij de verzuimanalyse, de risicoanalyse. Die laat zien waar de dagen ontstaan. Daarna kiest u begeleiding, toetsing, een project, interim of spoedhulp.",
      },
      {
        q: "Is dit een abonnement?",
        a: "Nee. Het is een samenhang van opdrachten. Een lopend uurblok voor een casemanager blijft een aparte afspraak, met de tarieven van die pagina.",
      },
      {
        q: "Wat als het morgen misgaat?",
        a: "Dan is spoedhulp de ingang. Reactie binnen 24 uur. De integrale aanpak is de lijn daarna, niet de vervanging van dat gesprek.",
      },
    ],
  },
];

export const extraLayouts: Record<string, ServiceLayout> = {
  eigenrisicodragerschap: {
    group: "toetsing",
    result: "Een keuze over eigenrisico, en beheer als u die zet.",
    problem:
      "Eigenrisico voor de WGA of de Ziektewet ligt op tafel, maar niemand heeft opgeschreven welke dossiers dan bij u blijven en wie de re-integratie doet. Een overstap op een premiegevoel is dan een gok.",
    steps: [
      { title: "Losse consultatie", text: "Eén gesprek en een korte beslisnotitie, zonder meteen het beheer af te nemen." },
      { title: "Wat u nu draagt", text: "We lezen hoe verzuim en re-integratie nu lopen, en of de organisatie het beheer van eigenrisico aankan." },
      { title: "WGA en Ziektewet", text: "Apart: wat de keuze voor de WGA vraagt, en wat de keuze voor de Ziektewet vraagt. Geen rekensom met een besparing." },
      { title: "Beheer", text: "Zet u de stap, dan kunnen we die dossiers beheren. Premie, beschikking en bezwaar blijven bij de zustermerken. Dat is een grotere opdracht dan de consultatie." },
    ],
    deliverables: [
      "Losse consultatie: gesprek en korte beslisnotitie",
      "Beslisnotitie eigenrisico WGA en Ziektewet, zonder een voorgespiegelde besparing",
      "Overzicht van dossiers en rollen die bij een overstap bij u blijven",
      "Voorstel voor beheer, als u de stap zet",
    ],
    answers: [
      {
        q: "Is eigenrisicodrager worden voordelig?",
        a: "Dat zeggen we niet op voorhand. Op deze pagina staat geen besparing en geen premiebedrag. Of het voordelig is, hangt af van uw dossiers en of u het beheer aankunt. Een losse consultatie is één gesprek met een korte beslisnotitie. Het uitgebreide advies en het beheer daarna zijn een grotere opdracht. De prijs en de omvang staan in de offerte.",
      },
    ],
    audience: `${voorWie} Voor directie en HR die een overstap overwegen of het beheer daarna willen beleggen. Een lopende WIA van één medewerker hoort bij WIA-begeleiding.`,
    outcome: `U weet wat de overstap van u vraagt, en wie het daarna beheert. ${usp}`,
    more: [
      { href: "/diensten/bezwaar-beroep", label: "Bezwaar en beroep" },
      { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "https://werkhervattingskas.nl", label: "Werkhervattingskas.nl" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "Een premiebedrag of een besparing publiceren we niet. De offerte zegt of het een losse consultatie is, het uitgebreide advies, het beheer, of een combinatie, en voor welke regeling. Wij zijn geen uitvoerder van UWV.",
    reviewName: "",
  },
  "dossiertoets-wia": {
    group: "toetsing",
    result: "De gaten in één dossier, vóór de aanvraag.",
    problem:
      "De WIA-aanvraag komt in zicht en het dossier is een map met losse brieven. Niemand heeft gekeken of de re-integratie erin te volgen is. Dat ziet u pas als UWV een loonsanctie noemt.",
    steps: [
      { title: "De stukken", text: "U levert aan wat de werkgever mag hebben: plannen, evaluaties, inzet op eigen werk en tweede spoor als dat liep." },
      { title: "De lezing", text: "We zetten op een rij wat er ligt, wat te laat is, en wat een buitenstaander niet zou begrijpen." },
      { title: "Wat nog kan", text: "Welke gaten u vóór de aanvraag nog kunt dichten. Geen belofte dat een loonsanctie uitblijft." },
      { title: "Afbakening", text: "De werknemer dient de aanvraag in. UWV beslist. De gratis risicoscan blijft een vragenlijst, niet deze toets." },
    ],
    deliverables: [
      "Leesverslag van één re-integratiedossier",
      "Lijst met gaten die vóór de WIA-aanvraag nog openstaan",
      "Wat u nog kunt herstellen, en wat niet meer kan",
      "Afbakening: geen aanvraag, geen oordeel van UWV",
    ],
    audience: `${voorWie} Voor HR met één dossier dat richting de WIA gaat. Lopende bewaking hoort bij de casemanager. De eerstejaarsevaluatie rond week 52 is een eerdere, smallere opdracht.`,
    outcome: `U ziet de gaten voordat de aanvraag de deur uit gaat. ${usp}`,
    more: [
      { href: "/loonsanctie-risicoscan", label: "Loonsanctie-risicoscan" },
      { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
      { href: "/diensten/eerstejaarsevaluatie", label: "Eerstejaarsevaluatie" },
      { href: "/diensten/bezwaar-beroep", label: "Bezwaar en beroep" },
      { href: "/werkgebied/eindhoven", label: "Verzuimbegeleiding in Eindhoven" },
    ],
    priceKind: "project",
    priceNote:
      "Geen los tarief in de uren van een casemanager: dit is een afgebakende toets. De offerte noemt het aantal dossiers. Eén dossier is de gewone opdracht. Een loonsanctie nemen we niet weg.",
    reviewName: "",
  },
  "bezwaar-beroep": {
    group: "toetsing",
    result: "Weten of bezwaar de moeite is, op tijd.",
    problem:
      "Een loonsanctie, een WIA-besluit of een WGA-beschikking ligt op uw bureau. De termijn loopt en niemand met kennis van het dossier zegt of bezwaar hout snijdt.",
    steps: [
      { title: "Het besluit", text: "We lezen de loonsanctie, het WIA-besluit of de WGA-beschikking, naast het dossier dat u heeft." },
      { title: "De moeite", text: "U hoort of bezwaar zinvol lijkt, en welke stukken daarbij horen. De uitkomst van UWV beloven we niet." },
      { title: "De uitvoering", text: "Het bezwaar loopt via Matchvermogen. Premie en beschikking via werkhervattingskas.nl. U houdt hier één aanspreekpunt." },
      { title: "Geen advocatuur", text: "Wordt het een procedure voor de rechter, dan schakelt u zelf een advocaat in. Die rol nemen we niet over." },
    ],
    deliverables: [
      "Lezing van het besluit naast het dossier",
      "Advies of bezwaar de moeite is, zonder een beloofde uitkomst",
      "Bewaking van de termijn die u noemt",
      "Overdracht naar Matchvermogen voor het bezwaar zelf",
    ],
    audience: `${voorWie} Voor werkgevers met een loonsanctie, een WIA-besluit of een WGA-beschikking. Een ontslagzaak hoort bij uw eigen jurist.`,
    outcome: `U weet op tijd of u bezwaar instelt, en wie dat uitvoert. ${usp}`,
    more: [
      { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór de WIA" },
      { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
      { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap" },
      { href: "/arbodienst-of-arbopartner", label: "Anders dan een arbodienst" },
      { href: "https://werkhervattingskas.nl", label: "Werkhervattingskas.nl" },
      { href: "/werkgebied/tilburg", label: "Verzuimbegeleiding in Tilburg" },
    ],
    priceKind: "project",
    priceNote:
      "Geen prijs van een procedure op deze pagina. De offerte noemt de lezing en de begeleiding. Het bezwaar zelf loopt via Matchvermogen. Wij zijn geen advocatenkantoor.",
    reviewName: "",
  },
  eerstejaarsevaluatie: {
    group: "toetsing",
    result: "De evaluatie en het verslag leesbaar op papier.",
    problem:
      "Rond week 52 is de evaluatie een gesprek dat niemand heeft opgeschreven, of een formulier dat niet vertelt wat er in het eerste jaar is geprobeerd. Het re-integratieverslag groeit daarna uit losse stukken.",
    steps: [
      { title: "Wat er was", text: "Plannen, bijstellingen, eigen werk en ander werk. Alleen wat een werkgever mag vastleggen." },
      { title: "De evaluatie", text: "We schrijven de eerstejaarsevaluatie, of we toetsen het concept dat u al heeft." },
      { title: "Het verslag", text: "We kijken of het re-integratieverslag die lijn kan dragen, en waar het nog gaten heeft." },
      { title: "Geen oordeel", text: "UWV beoordeelt het verslag later. Wij beloven geen acceptatie. De toets vlak voor de aanvraag is een andere opdracht." },
    ],
    deliverables: [
      "Eerstejaarsevaluatie, als concept of als toets op uw tekst",
      "Lezing van het re-integratieverslag tot dan toe",
      "Lijst met ontbrekende afspraken voor het tweede jaar",
      "Versie zonder medische details",
    ],
    audience: `${voorWie} Voor HR en de leidinggevende van een medewerker die het eerste ziektejaar rond heeft. Niet voor de toets vlak voor de WIA-aanvraag.`,
    outcome: `Een evaluatie en een verslag die een buitenstaander later kan lezen. ${usp}`,
    more: [
      { href: "/blog/eerstejaarsevaluatie-checklist", label: "Checklist eerstejaarsevaluatie" },
      { href: "/checklist-verzuim", label: "Checklist verzuim" },
      { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór de WIA" },
      { href: "/diensten/wia-begeleiding", label: "WIA-begeleiding" },
      { href: "/werkgebied/breda", label: "Verzuimbegeleiding in Breda" },
    ],
    priceKind: "project",
    priceNote:
      "Geen vaste prijs. De offerte zegt of we schrijven of toetsen, en of één dossier of een reeks. Dit is geen oordeel van UWV.",
    reviewName: "",
  },
  verzuimpreventie: {
    group: "projecten",
    result: "Een lijn vóórdat verzuim een dossier wordt.",
    problem:
      "Verzuim valt op als iemand al weken thuis is. Frequente meldingen, een leidinggevende die het gesprek uitstelt, en werk dat structureel te zwaar is, blijven liggen tot de termijnen beginnen.",
    steps: [
      { title: "De signalen", text: "Waar frequent verzuim zit, en welke signalen de leidinggevende ziet zonder naar een diagnose te vragen." },
      { title: "De rollen", text: "Wie het gesprek doet, wat HR vastlegt, en wanneer de bedrijfsarts of de casemanager erbij komt." },
      { title: "De lijn", text: "Een kort plan: het gesprek, passend werk, en het moment van opschalen. Geen medisch protocol." },
      { title: "Afbakening", text: "Jobcoaching blijft de coach naast één medewerker. Een preventief medisch onderzoek bieden we niet." },
    ],
    deliverables: [
      "Preventieplan: signalen, rollen en het gesprek",
      "Afspraken over frequent verzuim, zonder medische details",
      "Moment waarop u opschaalt naar casemanager of bedrijfsarts",
      "Korte versie voor leidinggevenden",
    ],
    audience: `${voorWie} Voor directie en HR die preventie voor de organisatie willen, niet een coach voor één persoon en niet een medische keuring.`,
    outcome: `Een lijn die ingrijpt vóór de termijnen, in gewone taal. ${usp}`,
    more: [
      { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
      { href: "/diensten/jobcoaching", label: "Jobcoaching" },
      { href: "/diensten/verzuimbeleid-opstellen", label: "Verzuimbeleid opstellen" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/werkgebied/helmond", label: "Verzuimbegeleiding in Helmond" },
    ],
    priceKind: "project",
    priceNote:
      "Geen prijs en geen beloofde daling van het verzuim. De offerte noemt de omvang van het plan. Een preventief medisch onderzoek zit er niet in. De training voor leidinggevenden is een vervolgstap als u die wilt.",
    reviewName: "",
  },
  "interim-casemanager": {
    group: "interim",
    result: "Een casemanager op locatie, voor een afgesproken periode.",
    problem:
      "Uw casemanager is ziek, de vacature staat open, of een piek aan dossiers past niet in de uren die u heeft. De termijnen lopen door. Een nieuw dienstverband lost de komende weken niet op.",
    steps: [
      { title: "De periode", text: "We spreken de weken of maanden af, en hoeveel dagen iemand op locatie is." },
      { title: "De rol", text: "Interim casemanager als de dossiers de kern zijn. Verzuimcoördinator als het zwaartepunt op coördinatie en registratie ligt. Eén opdracht." },
      { title: "Overdracht", text: "We pakken de lopende trajecten op en leggen ze vast. Aan het eind een overdracht, zodat het niet in één hoofd blijft zitten." },
      { title: "Daarna", text: "De inzet stopt, tenzij u een lopend uurblok wilt. Dat is de gedetacheerde casemanager, een andere pagina." },
    ],
    deliverables: [
      "Inzet op locatie voor de afgesproken periode",
      "Bijgewerkte lopende dossiers en termijnen",
      "Overdracht aan HR of aan de vaste casemanager",
      "Offerte met periode, dagen op locatie en tarief",
    ],
    audience: `${voorWie} Voor een tijdelijke vervanging of een piek. Wie structureel uren per week wil, kiest detachering.`,
    outcome: `De dossiers lopen door terwijl uw vaste bezetting er niet is. ${usp}`,
    more: [
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/tarieven", label: "Uurtarieven van een lopend blok" },
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/spoedhulp", label: "Spoedhulp" },
      { href: "/werkgebied/den-bosch", label: "Verzuimbegeleiding in Den Bosch" },
    ],
    priceKind: "project",
    priceNote:
      "Een dagprijs publiceren we niet. De offerte noemt de periode, de dagen op locatie en het tarief. De uurtarieven op de tarievenpagina horen bij een lopend blok, niet bij deze interim-inzet.",
    reviewName: "",
  },
  "second-opinion-verzuim": {
    group: "toetsing",
    result: "Een tweede blik op route, dossier en plan.",
    problem:
      "Een traject loopt al, bij u of bij een andere begeleider, en u twijfelt of de lijn klopt. Nog een gesprek met dezelfde personen herhaalt het verhaal. U wilt een lezing van buiten.",
    steps: [
      { title: "De vraag", text: "Wat u wilt weten: de route, de volledigheid van het dossier, of het plan nog past bij het werk." },
      { title: "De lezing", text: "Plannen, evaluaties en rollen. Geen medische stukken die een werkgever niet hoort te hebben." },
      { title: "De spiegel", text: "Wat sterk is, wat open is, en welke stap logisch is: door, herstellen, een arbeidsdeskundige, of een dossiertoets." },
      { title: "Stoppen bij het advies", text: "Geen medische second opinion en geen deskundigenoordeel van UWV. Overnemen van het dossier alleen als u dat apart vraagt." },
    ],
    deliverables: [
      "Lezing van het lopende traject",
      "Notitie: wat sterk is en wat open blijft",
      "Advies voor de volgende stap, zonder medisch oordeel",
      "Afbakening ten opzichte van UWV en de bedrijfsarts",
    ],
    audience: `${voorWie} Voor HR die twijfelt aan een traject dat al loopt. Niet voor een medische herbeoordeling en niet voor een deskundigenoordeel van UWV.`,
    outcome: `U weet of de lijn klopt, zonder een tweede arts. ${usp}`,
    more: [
      { href: "/diensten/dossiertoets-wia", label: "Dossiertoets vóór de WIA" },
      { href: "/diensten/arbeidsdeskundig-onderzoek", label: "Arbeidsdeskundig onderzoek in Brabant" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/diensten/interim-casemanager", label: "Interim casemanager" },
      { href: "/werkgebied/regio/noordoost-brabant", label: "Noordoost-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "Geen vaste prijs. De offerte noemt één traject. Dit is geen medische second opinion en geen deskundigenoordeel van UWV.",
    reviewName: "",
  },
  "verzuimsysteem-implementatie": {
    group: "projecten",
    result: "Een systeem dat staat, met de dossiers erin.",
    problem:
      "De analyse ligt er, of het is duidelijk dat het systeem ontbreekt, en daarna gebeurt er niets. Dossiers blijven in de mail. Een nieuwe HR-medewerker begint opnieuw.",
    steps: [
      { title: "De analyse", text: "We starten vanuit de verzuimsysteemanalyse. Zonder die analyse richten we niet in op een gok." },
      { title: "Inrichting", text: "Velden, rollen en wat een werkgever wel en niet vastlegt. Geen diagnoses." },
      { title: "Migratie en koppeling", text: "Bestaande dossiers gaan erin. Een koppeling met loonadministratie of de arbodienst alleen als dat systeem het toelaat, en als de offerte die koppeling noemt." },
      { title: "Training", text: "HR en leidinggevenden oefenen de ziekmelding, het plan en de termijnen in het systeem." },
    ],
    deliverables: [
      "Ingericht verzuimsysteem, van ons of op het systeem dat de analyse aanwijst",
      "Overgezette dossiers, zonder medische details",
      "Afspraak over een koppeling, of de vaststelling dat die erbuiten valt",
      "Training voor HR en leidinggevenden",
    ],
    audience: `${voorWie} Na een verzuimsysteemanalyse, of tegelijk daarmee als aparte afspraak. Niet de analyse van de cijfers. Die blijft de verzuimanalyse.`,
    outcome: `Dossiers en trajecten staan op één plek, en de mensen die ermee werken weten hoe. ${usp}`,
    answers: [
      {
        q: "Hoe richt ik een verzuimsysteem in?",
        a: "Eerst de verzuimsysteemanalyse: welk systeem past, en waar de informatie nu staat. Daarna deze opdracht: inrichting, migratie van de dossiers, een koppeling alleen als de offerte die noemt, en een training. Welk systeem past, beantwoordt de analyse. Een productnaam van een softwarehuis publiceren we niet.",
      },
    ],
    more: [
      { href: "/diensten/verzuimsysteemanalyse", label: "Verzuimsysteemanalyse" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/leidinggevenden-training", label: "Training leidinggevenden" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/werkgebied/uden", label: "Verzuimbegeleiding in Uden" },
    ],
    priceKind: "project",
    priceNote:
      "Geen softwareprijs en geen productnaam op deze pagina. De offerte zegt of het om inrichting, migratie, een koppeling, training of het geheel gaat.",
    reviewName: "",
  },
  verzuimverzekeringen: {
    group: "projecten",
    result: "Zicht op de dekking, afgestemd met onze partners.",
    problem:
      "Een verzuimverzekering loopt, of u overweegt er een, en niemand legt de dekking naast de dossiers. De polis en het verzuim leven in twee werelden.",
    steps: [
      { title: "De dekking", text: "Wat u nu heeft of zoekt, in gewone taal: wat wel en niet onder de dekking valt, voor zover u die stukken deelt." },
      { title: "De dossiers", text: "Welke lopende trajecten die dekking raken. Geen medisch oordeel." },
      { title: "Afstemming", text: "We stemmen het advies af met onze verzekeringspartners. Hun namen zetten we hier niet neer." },
      { title: "De grens", text: "Wij zijn geen verzekeraar en geen bemiddelaar. Een polis en een premie lopen niet via ons." },
    ],
    deliverables: [
      "Advies over de dekking, zonder een premiebedrag",
      "Afstemming met onze verzekeringspartners, zonder hun namen op deze pagina",
      "Wat u zelf in het verzuim blijft doen",
      "Afbakening: geen polis, geen bemiddeling",
    ],
    audience: `${voorWie} Voor directie en HR die de dekking willen begrijpen naast de dossiers. Eigenrisico voor de WGA en de Ziektewet is een andere pagina.`,
    outcome: `U weet wat de dekking van uw verzuim vraagt, en wie de polis doet. ${usp}`,
    answers: [
      {
        q: "Adviseren jullie over een verzuimverzekering?",
        a: "Ja, over de dekking en over de afstemming met onze verzekeringspartners. Wij zijn geen verzekeraar en geen bemiddelaar. Een polis sluiten en een premie innen doen we niet. Partnernamen, premies en een vergelijking van polissen staan niet op deze pagina.",
      },
    ],
    more: [
      { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap" },
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "Geen premie en geen polisprijs. De offerte beschrijft het advies over de dekking. Wij zijn geen verzekeraar en geen bemiddelaar.",
    reviewName: "",
  },
  "reorganisatie-verzuim": {
    group: "begeleiden",
    result: "Verzuim en de reorganisatie uit elkaar, op papier.",
    problem:
      "Tijdens een reorganisatie zijn mensen ziek. Het opzegverbod, de re-integratie en een functiehuis dat nog van de oude organisatie is, lopen door elkaar. Niemand weet welk werk er straks nog is.",
    steps: [
      { title: "De zieken", text: "Welke dossiers lopen, welke plannen er zijn, en welke termijnen niet mogen blijven liggen." },
      { title: "Het werk", text: "Het functiehuis, bestaand of nieuw: welk werk na de reorganisatie nog bestaat en wat aanpasbaar is." },
      { title: "Re-integratie", text: "Eigen werk of ander werk blijft lopen. De bedrijfsarts blijft van u. Wij geven geen medisch oordeel." },
      { title: "De jurist", text: "Tijdens ziekte geldt een opzegverbod. Of een uitzondering geldt, toetst uw jurist. Wij voeren het ontslag niet uit." },
    ],
    deliverables: [
      "Overzicht van zieke medewerkers en open termijnen",
      "Aansluiting op het functiehuis van na de reorganisatie",
      "Lijn voor re-integratie tijdens de verandering",
      "Feitenoverzicht voor uw jurist, zonder dat wij het ontslag doen",
    ],
    audience: `${voorWie} Voor directie en HR in een reorganisatie waar mensen ziek zijn. Een vaststellingsovereenkomst voor één dossier is een andere pagina.`,
    outcome: `Het verzuim blijft volgbaar terwijl de organisatie verandert. ${usp}`,
    answers: [
      {
        q: "Mag ik een zieke werknemer ontslaan bij reorganisatie?",
        a: "Tijdens ziekte geldt een opzegverbod. Of in uw geval een uitzondering geldt, toetst uw jurist of advocaat. Wij zijn geen advocatenkantoor en voeren het ontslag niet uit. Wij ordenen het verzuimdossier, de re-integratie en het functiehuis, zodat de reorganisatie en de ziekte niet door elkaar lopen.",
      },
    ],
    more: [
      { href: "/diensten/functiehuis-opstellen", label: "Functiehuis opstellen" },
      { href: "/diensten/vso-en-ontslagdossier", label: "VSO en ontslagdossier" },
      { href: "/diensten/eerste-spoor", label: "Eerste spoor" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/werkgebied/tilburg", label: "Verzuimbegeleiding in Tilburg" },
    ],
    priceKind: "project",
    priceNote:
      "Geen prijs voor een ontslag of een vaststellingsovereenkomst. Die maakt uw jurist. De offerte noemt het ordenen van het verzuim, de re-integratie en het functiehuis.",
    reviewName: "",
  },
  verzuimreductie: {
    group: "projecten",
    result: "Eerst de analyse, daarna een traject op resultaat.",
    problem:
      "Iemand belooft dat het verzuim daalt, zonder eerst de cijfers en de dossiers te lezen. De betaling staat los van wat er daarna gebeurt, of juist vast aan een percentage dat niemand kan onderbouwen.",
    steps: [
      { title: "Risicoanalyse", text: "De verzuimanalyse: cijfers, een steekproef van dossiers en het protocol. Die opdracht staat op een eigen pagina en kan los blijven." },
      { title: "Het resultaat", text: "Welk resultaat telt en hoe we het meten, spreken we in overleg af. Een percentage publiceren we niet." },
      { title: "Het traject", text: "De stappen die uit de analyse volgen: dossiers, leidinggevenden, beleid of het systeem. Elk onderdeel kan ook los." },
      { title: "De betaling", text: "De betaling hangt af van het afgesproken resultaat. Wat er gebeurt als dat resultaat uitblijft, staat in de offerte, niet op deze pagina." },
    ],
    deliverables: [
      "Start via de verzuimanalyse, de risicoanalyse",
      "Afspraken over het resultaat en de meting, in de offerte",
      "Traject met de stappen die de analyse aanwijst",
      "Betaling die afhangt van dat resultaat, voorwaarden in overleg",
    ],
    audience: `${voorWie} Voor directie die een reductietraject wil ná de analyse, met betaling die van het resultaat afhangt. De analyse alleen kan ook.`,
    outcome: `Een traject dat op uw cijfers rust, met de betaling in de offerte. ${usp}`,
    answers: [
      {
        q: "Hoe werkt no cure no pay bij verzuimreductie?",
        a: "Eerst de risicoanalyse, dat is de verzuimanalyse. Daarna een traject waarbij de betaling afhangt van het resultaat. Welk resultaat telt, hoe we meten, en hoe de betaling daarvan afhangt, spreken we in overleg af. Een percentage zetten we hier niet neer. Een daling garanderen we niet.",
      },
    ],
    more: [
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/integrale-verzuimaanpak", label: "Integrale verzuimaanpak" },
      { href: "/diensten/verzuimpreventie", label: "Verzuimpreventie" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/werkgebied/eindhoven", label: "Verzuimbegeleiding in Eindhoven" },
    ],
    priceKind: "project",
    priceNote:
      "Geen percentage en geen vaste succesfee op deze pagina. De offerte noemt het resultaat, de meting en hoe de betaling daarvan afhangt. De verzuimanalyse blijft een eigen opdracht.",
    reviewName: "",
  },
  "integrale-verzuimaanpak": {
    group: "projecten",
    result: "Eén lijn, met de risicoanalyse als instap.",
    problem:
      "Verzuim is verdeeld over een casemanager, een arbodienst, een polis en een map. Elke partij doet een stuk. Niemand houdt de lijn vast, en u weet niet wat u los kunt laten en wat samen hoort.",
    steps: [
      { title: "Risicoanalyse", text: "De verzuimanalyse is de instap. Cijfers, dossiers en protocol. Daarna is duidelijk wat erbij hoort." },
      { title: "De onderdelen", text: "Begeleiding, toetsing en bezwaar, HR-projecten, interim of spoedhulp. Alleen wat de analyse aanwijst." },
      { title: "Los of samen", text: "Elke dienst blijft los af te nemen. In deze aanpak staan ze in één offerte." },
      { title: "De vorm", text: "Per onderdeel op uurbasis of als kant-en-klaar product met een vaste prijs na offerte." },
    ],
    deliverables: [
      "Instap via de verzuimanalyse",
      "Eén offerte met de onderdelen die daarbij horen",
      "Per onderdeel de keuze: uurbasis of vaste prijs",
      "Eén aanspreekpunt voor de samenhang",
    ],
    audience: `${voorWie} Voor directie die de diensten wil bundelen zonder alles verplicht af te nemen. Wie morgen een acuut dossier heeft, begint bij spoedhulp.`,
    outcome: `Een aanpak die bij uw analyse past, in plaats van een pakket dat vooraf vaststaat. ${usp}`,
    answers: [
      {
        q: "Kan ik diensten los afnemen of alleen als geheel?",
        a: "Allebei. Elke dienst is los af te nemen, op uurbasis of als kant-en-klaar product met een vaste prijs na offerte. De integrale verzuimaanpak bundelt ze, met de verzuimanalyse als instap. U hoeft niet het hele aanbod af te nemen.",
      },
    ],
    more: [
      { href: "/diensten/verzuimanalyse", label: "Verzuimanalyse en rapportage" },
      { href: "/diensten/casemanager-detachering", label: "Casemanagement in Brabant" },
      { href: "/diensten/verzuimsysteem-implementatie", label: "Verzuimsysteem implementatie" },
      { href: "/diensten/verzuimreductie", label: "Verzuimreductie" },
      { href: "/diensten/tender-arbodiensten", label: "Arbodienst-tender" },
      { href: "/diensten/verzuimverzekeringen", label: "Verzuimverzekeringen" },
      { href: "/diensten/reorganisatie-verzuim", label: "Reorganisatie en verzuim" },
      { href: "/diensten/eigenrisicodragerschap", label: "Eigenrisicodragerschap" },
      { href: "/spoedhulp", label: "Spoedhulp verzuim" },
      { href: "/diensten", label: "Alle diensten" },
      { href: "/werkgebied", label: "Werkgebied Noord-Brabant" },
    ],
    priceKind: "project",
    priceNote:
      "Geen pakketprijs op deze pagina. De offerte noemt de onderdelen, en per onderdeel de uurbasis of een vaste prijs. De verzuimanalyse houdt de prijs die op die pagina staat.",
    reviewName: "",
  },
};
