export type StadDossier = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  linkLabel: string;
  regio: string;
  dienstenTekst: string;
  sections: { heading: string; paragraphs: string[] }[];
  sources: { label: string; url: string }[];
};

const uwv = {
  label: "Besluit werkgebieden UWV 2024",
  url: "https://wetten.overheid.nl/BWBR0049194/",
};

export const focusSteden: StadDossier[] = [
  {
    slug: "eindhoven",
    seoTitle: "Verzuimbegeleiding in Eindhoven",
    seoDescription:
      "Verzuimbegeleiding in Eindhoven, Noord-Brabant, voor organisaties met 35–500 medewerkers. Casemanagement in Brainport, op locatie of online. UWV-vestiging Eindhoven. Kantoor in Uden.",
    h1: "Casemanager en verzuimbegeleiding in Eindhoven",
    linkLabel: "Casemanager Eindhoven",
    regio: "zuidoost-brabant",
    dienstenTekst:
      "In Eindhoven begint het meestal bij een vaste casemanager. Een arbeidsdeskundig onderzoek of een tweede spoor schuift aan als terugkeer in de eigen functie niet realistisch is. Dat onderzoek loopt via Matchvermogen, het tweede spoor via Best Match.",
    sections: [
      {
        heading: "Brainport: specialistisch werk, schaarse vervanging",
        paragraphs: [
          "Eindhoven is de kern van Brainport. Die naam dekt het zuidoosten van Brabant: 21 gemeenten, met hightech, ontwerp en maakindustrie door elkaar. In de stad zelf staan de High Tech Campus en de Technische Universiteit Eindhoven. De keten van toelevering en kenniswerk loopt door naar Veldhoven, Best en Son en Breugel. Een specialist is niet de volgende dag vervangen.",
          "UWV beschrijft de arbeidsmarkt in Zuidoost-Brabant als zeer krap. We hangen daar geen eigen percentage aan. Verzuim in kenniswerk duurt vaak lang en is vaker psychisch dan een korte blessure. Op de maakbedrijven aan de rand van de stad zit die fysieke kant er juist wel. Aangepast werk in een cleanroom of aan een lijn is iets anders dan een ochtend lichte taken op een kantoor. De casemanager leest het functiehuis voordat er een plan komt. De bedrijfsarts blijft van u. Wij vertalen het advies naar taken die er echt zijn.",
        ],
      },
      {
        heading: "Op de plant, online, of aan de Losplaats",
        paragraphs: [
          "De rit vanuit het kantoor aan de Losplaats 16d in Uden is ongeveer 35 minuten buiten de spits. Eindhoven zit daarmee binnen de ring van ongeveer 45 minuten. Die reistijd zit in het tarief. We plannen een dagdeel, niet een los uur tussen twee andere steden. Een uurtje heen en weer is voor niemand productief, ook niet als de file meevalt.",
          "Het gesprek kan bij u op het bedrijf, online, of op ons kantoor in Uden. Wie daarheen komt, blijft in beweging. Dat verhoogt de drempel om zich ziek te melden. Wie de rit niet kan maken, spreken we in Eindhoven of online. De afstemming met de leidinggevende doen we het liefst op de werkplek, zodat het plan over echte taken gaat.",
        ],
      },
      {
        heading: "UWV-vestiging Eindhoven, niet Helmond",
        paragraphs: [
          "Werkgevers in Eindhoven vallen onder de arbeidsmarktregio Zuidoost-Brabant, UWV-vestiging Eindhoven. Tot dat werkgebied horen ook Bergeijk, Best, Bladel, Eersel, Heeze-Leende, Nuenen, Gerwen en Nederwetten, Oirschot, Reusel-De Mierden, Son en Breugel, Valkenswaard, Veldhoven en Waalre. De Kempen zit daar grotendeels bij. Helmond niet. Die stad heeft een eigen vestiging, regio Helmond-De Peel.",
          "Heeft u een vestiging in Eindhoven én in Helmond, dan zijn dat bij UWV twee regio’s. Bij ons kan het één casemanager zijn, als de uren en de dossiers dat toelaten. De actuele vestiging bij een postcode staat op uwv.nl. De indeling in het besluit van 2024 kan wijzigen. Wij volgen het adres, niet een aanname vanaf de stadsnaam.",
        ],
      },
    ],
    sources: [
      uwv,
      {
        label: "UWV, Regio in Beeld 2025-2026, Zuidoost-Brabant",
        url: "https://www.uwv.nl/assets-kai/files/600d4f9c-5f9c-4738-a092-4a2b6e833521/Regio_in_Beeld_2025-2026_Zuidoost-Brabant.pdf",
      },
      { label: "Brainport Eindhoven", url: "https://brainporteindhoven.com/nl/" },
      { label: "High Tech Campus Eindhoven", url: "https://www.hightechcampus.com/" },
      { label: "Technische Universiteit Eindhoven", url: "https://www.tue.nl/" },
    ],
  },
  {
    slug: "tilburg",
    seoTitle: "Verzuimbegeleiding in Tilburg",
    seoDescription:
      "Verzuimbegeleiding in Tilburg, Midden-Brabant, voor 35–500 medewerkers. Casemanagement bij logistiek, zorg en onderwijs. UWV-vestiging Tilburg. De rit staat in de offerte.",
    h1: "Casemanager en verzuimbegeleiding in Tilburg",
    linkLabel: "Casemanager Tilburg",
    regio: "midden-brabant",
    dienstenTekst:
      "In Tilburg is de vaste casemanager de kern. Een protocol helpt als het korte verzuim in de logistiek blijft terugkomen. Een arbeidsdeskundige schuift aan als een lang dossier in zorg of onderwijs vastloopt. Tweede spoor loopt via Best Match, niet via een bureau dat het dossier voor het eerst ziet.",
    sections: [
      {
        heading: "Van textielstad naar logistiek, zorg en campus",
        paragraphs: [
          "Tilburg is de kern van Midden-Brabant, ook Hart van Brabant genoemd. De textiel is de geschiedenis. Logistiek, zorg, onderwijs en een laag maakbedrijven bepalen nu het werk. Tilburg University zit in de stad. Langs de A58 liggen de bedrijventerreinen, waaronder Vossenberg. Midpoint Brabant is de organisatie die ondernemers, onderwijs en overheid in deze regio verbindt.",
          "Die mix geeft twee soorten verzuim naast elkaar. In een magazijn of technische dienst zien we kort en fysiek verzuim, en rug- of schouderklachten die blijven liggen als de planner ook de dossiers doet. In zorg en onderwijs duren dossiers langer en gaat het vaker over passend werk dan over een andere plek aan de band. De casemanager schrijft het plan in gewone taal, met de leidinggevende die de taken kent. De bedrijfsarts blijft van u.",
        ],
      },
      {
        heading: "Een dagdeel, en de rit in de offerte",
        paragraphs: [
          "De rit vanuit Uden is ongeveer 55 minuten buiten de spits. Dat is verder dan de ongeveer 45 minuten waarin de reistijd in het tarief zit. De afspraak over de rit staat in de offerte, zodat u die niet achteraf op de factuur tegenkomt. We komen met een dagdeel. Een kort bezoek aan het eind van een route naar Den Bosch soupeert de uren op aan de A59 en de A58.",
          "Udenhout en Berkel-Enschot horen bij de gemeente Tilburg. Dezelfde casemanager doet de stad en die kernen. Gesprekken kunnen bij u, online, of op het kantoor aan de Losplaats 16d. Wie naar Uden kan komen, blijft in beweging. Wie de rit niet maakt, spreken we in Tilburg of online. Goirle, Oisterwijk en Dongen hebben geen eigen pagina. Ze horen bij dezelfde UWV-regio en plannen we mee als het adres klopt.",
        ],
      },
      {
        heading: "UWV-vestiging Tilburg",
        paragraphs: [
          "Tilburg valt onder de arbeidsmarktregio Midden-Brabant, UWV-vestiging Tilburg. Tot dat werkgebied horen Alphen-Chaam, Baarle-Nassau, Dongen, Gilze en Rijen, Goirle, Heusden, Hilvarenbeek, Loon op Zand, Oisterwijk, Tilburg en Waalwijk. Heusden telt het CBS bij Noordoost-Brabant. UWV zet die gemeente bij de vestiging Tilburg. Een werkgever in Heusden zoekt dus niet de vestiging Den Bosch.",
          "Waalwijk heeft een eigen pagina, omdat de Langstraat een ander soort werk heeft dan de Tilburgse campus en de zorg. De UWV-vestiging is dezelfde. Het overzicht van de gemeenten en de pagina’s eromheen staat bij Midden-Brabant.",
        ],
      },
    ],
    sources: [
      uwv,
      { label: "Midpoint Brabant", url: "https://midpointbrabant.nl/" },
      { label: "Tilburg University", url: "https://www.tilburguniversity.edu/" },
      {
        label: "Arbeidsmarktregio’s per 1 januari 2026",
        url: "https://www.samenvoordeklant.nl/sites/default/files/bestandsbijlage/Arbeidsmarktregios_van_Nederland_per_01-01-2026_0.pdf",
      },
    ],
  },
  {
    slug: "breda",
    seoTitle: "Verzuimbegeleiding in Breda",
    seoDescription:
      "Verzuimbegeleiding in Breda, West-Brabant, voor 35–500 medewerkers. Casemanagement bij logistiek, kantoren en zorg. UWV-vestiging Breda. Op locatie of online.",
    h1: "Casemanager en verzuimbegeleiding in Breda",
    linkLabel: "Casemanager Breda",
    regio: "west-brabant",
    dienstenTekst:
      "Voor Breda is een vaste casemanager de start. Ligt het verzuim vooral in de logistieke schil, dan hoort daar vaak een protocol bij dat de planner echt gebruikt. Een arbeidsdeskundige van Matchvermogen komt erbij als het tweede jaar in zicht is. We starten dat niet in de laatste maand.",
    sections: [
      {
        heading: "Grensstad, met een logistieke schil en een binnenstad",
        paragraphs: [
          "Breda is de grootste stad van West-Brabant, aan de A16 en de A58, dicht bij de Belgische grens. In de stad zitten zakelijke dienstverlening, horeca, zorg en de hogeschool Breda University of Applied Sciences. Rond de snelwegen zit logistiek. Prinsenbeek en Teteringen horen bij de gemeente. Het verzuim in een magazijn is ander werk dan het verzuim op een kantoor in het centrum. De casemanager stemt het plan daarop af, zonder medisch oordeel.",
          "In dezelfde UWV-regio, niet in de gemeente Breda, ligt de haven van Moerdijk: industrie, maintenance en distributie. REWIN is de ontwikkelingsmaatschappij voor West-Brabant. Een plant in Moerdijk en een hoofdkantoor in Breda kunnen één opdracht zijn, als beide binnen 35–500 medewerkers vallen en de uren kloppen. We schrijven in de offerte welke locatie welke uren krijgt.",
        ],
      },
      {
        heading: "Vanwege de afstand: een blok uren",
        paragraphs: [
          "De rit vanuit Uden is ongeveer 75 minuten buiten de spits. Breda valt buiten de ring van ongeveer 45 minuten. De reistijd zit daarom niet vanzelf in het uurtarief. We zetten de rit in de offerte. De uren op locatie blijven een blok, zodat de dag niet opgaat aan de A58.",
          "Online werken kan, en het kantoor in Uden blijft beschikbaar voor wie die kant op kan. Voor wie in Breda blijft, komen we naar het bedrijf. Een los telefoontje zonder werkplek is genoeg voor een voortgang. Het eerste beeld van de taken halen we liever op locatie, of uit een gesprek waarin de leidinggevende de afdeling echt beschrijft.",
        ],
      },
      {
        heading: "UWV-vestiging Breda",
        paragraphs: [
          "Breda hoort bij de arbeidsmarktregio West-Brabant, UWV-vestiging Breda. Tot dat werkgebied horen Altena, Bergen op Zoom, Breda, Drimmelen, Etten-Leur, Geertruidenberg, Halderberge, Moerdijk, Oosterhout, Roosendaal, Rucphen, Steenbergen, Woensdrecht en Zundert. Etten-Leur en Moerdijk zijn dus dezelfde vestiging als Breda, en een andere gemeente.",
          "Het CBS telt Altena bij Midden-Noord-Brabant. UWV zet Altena bij de vestiging Breda. Oosterhout, Roosendaal en Bergen op Zoom hebben een eigen pagina. De rest van de gemeenten staat op de pagina West-Brabant, met dezelfde manier van werken: op locatie, online, of in Uden.",
        ],
      },
    ],
    sources: [
      uwv,
      { label: "REWIN West-Brabant", url: "https://rewin.nl/" },
      { label: "Port of Moerdijk", url: "https://www.portofmoerdijk.nl/" },
      { label: "Breda University of Applied Sciences", url: "https://www.buas.nl/" },
    ],
  },
  {
    slug: "den-bosch",
    seoTitle: "Verzuimbegeleiding in Den Bosch",
    seoDescription:
      "Verzuimbegeleiding in 's-Hertogenbosch en Rosmalen, Noord-Brabant. Casemanagement bij kantoren, zorg en logistiek. UWV-vestiging Den Bosch. Op locatie, online of in Uden.",
    h1: "Casemanager en verzuimbegeleiding in 's-Hertogenbosch",
    linkLabel: "Casemanager Den Bosch",
    regio: "noordoost-brabant",
    dienstenTekst:
      "In Den Bosch is de casemanager vaak de persoon naast een kleine HR-afdeling of een ambtelijke organisatie. Verzuimbeleid schrijven we als het protocol ontbreekt. Een arbeidsdeskundig onderzoek loopt via Matchvermogen, met 8% korting op dat onderzoek voor klanten van Arbopartner Brabant.",
    sections: [
      {
        heading: "Provinciehoofdstad, niet alleen de binnenstad",
        paragraphs: [
          "’s-Hertogenbosch is de hoofdstad van Noord-Brabant. Het provinciebestuur zit er. Daaromheen kantoren, zorg, en de logistiek die de A2 en de stad bedient. Rosmalen hoort bij de gemeente, net als de andere kernen. Paleiskwartier is een kantorenwijk. Het verzuim dat we hier tegenkomen is vaker psychisch of frequent en kort dan zware fysieke uitval. De stadsdistributie heeft die fysieke kant juist wel.",
          "De bredere regio Noordoost-Brabant is agrifood. Agrifood Capital verbindt die gemeenten. De voedselproductie is zichtbaarder in Meierijstad, Oss en Land van Cuijk dan in het centrum van Den Bosch. Oss heeft life sciences rond Pivot Park. Dat is een andere pagina, dezelfde UWV-vestiging. We noemen het landschap, geen klanten.",
        ],
      },
      {
        heading: "Een vaste dag, de rit zit in het tarief",
        paragraphs: [
          "Buiten de spits is Den Bosch ongeveer 25 minuten vanaf Uden. Die rit zit binnen de ongeveer 45 minuten en dus in het tarief. We plannen niet de enige afspraak van de dag om half zes in de avondspits. De casemanager heeft een vaste dag. HR hoeft niet elke week opnieuw uit te leggen hoe besluiten in de organisatie lopen. Dat geldt voor een familiebedrijf en voor een overheidsorganisatie binnen 35–500 medewerkers.",
          "Gesprekken kunnen op het kantorenpark, in Rosmalen, online, of aan de Losplaats 16d in Uden. Wie naar het kantoor komt, blijft in beweging. Wie niet kan reizen, spreken we in Den Bosch of online. De bedrijfsarts blijft van u. Een medisch oordeel geven wij niet.",
        ],
      },
      {
        heading: "UWV-vestiging Den Bosch",
        paragraphs: [
          "De arbeidsmarktregio is Noordoost-Brabant, UWV-vestiging Den Bosch. Tot het werkgebied horen Bernheze, Boekel, Boxtel, ’s-Hertogenbosch, Land van Cuijk, Maashorst, Meierijstad, Oss, Sint-Michielsgestel en Vught. Uden (Maashorst) en Veghel (Meierijstad) vallen onder dezelfde vestiging als de provinciehoofdstad. Ons kantoor staat dus in de regio die deze vestiging bedient.",
          "Heusden hoort hier niet bij, al telt het CBS die gemeente wel bij Noordoost-Brabant. UWV zet Heusden bij de vestiging Tilburg. Nijmegen is de regio Rijk van Nijmegen. Eén casemanager kan Den Bosch en Oss combineren als de dossiers dat toelaten. In de offerte staat welk uur naar welke locatie gaat.",
        ],
      },
    ],
    sources: [
      uwv,
      { label: "Agrifood Capital", url: "https://www.agrifoodcapital.nl/" },
      { label: "Provincie Noord-Brabant", url: "https://www.brabant.nl/" },
      {
        label: "Arbeidsmarktregio’s per 1 januari 2026",
        url: "https://www.samenvoordeklant.nl/sites/default/files/bestandsbijlage/Arbeidsmarktregios_van_Nederland_per_01-01-2026_0.pdf",
      },
    ],
  },
  {
    slug: "helmond",
    seoTitle: "Verzuimbegeleiding in Helmond",
    seoDescription:
      "Verzuimbegeleiding in Helmond, Noord-Brabant, voor 35–500 medewerkers. Casemanagement bij de Automotive Campus en maakindustrie. UWV-regio Helmond-De Peel, niet Eindhoven.",
    h1: "Casemanager en verzuimbegeleiding in Helmond",
    linkLabel: "Casemanager Helmond",
    regio: "zuidoost-brabant",
    dienstenTekst:
      "In Helmond zit de casemanager vaker op de vloer dan in een boardroom. Een protocol en coaching van leidinggevenden horen erbij als kort verzuim blijft terugkomen. Een arbeidsdeskundige van Matchvermogen is de achtervang als aangepast werk in de hal op raakt. Tweede spoor loopt via Best Match.",
    sections: [
      {
        heading: "Automotive Campus en de hal, niet de campus van Eindhoven",
        paragraphs: [
          "Helmond hoort bij Brainport, en is een andere arbeidsmarkt dan Eindhoven. De Automotive Campus is het publieke gezicht van voertuigtechniek en toelevering. Daaromheen zitten maakbedrijven, logistiek en zorg. Ploegen, lassers, monteurs en een dunnere laag engineers bepalen het verzuim. Fysieke klachten zijn hier normaal. De schade ontstaat als een rugklacht een half jaar blijft liggen zonder aangepast werk, of als een conflict met een leidinggevende als ziekte wordt weggezet.",
          "Een specialist die nergens anders inzetbaar is, zien we meer aan de Eindhovense en Veldhovense kant van Brainport. In Helmond is de vraag vaker: welke taken in dezelfde hal kan iemand nog doen? De casemanager zoekt dat met de leidinggevende, op basis van wat de bedrijfsarts over belasting zegt. Wij stellen die belasting niet vast.",
        ],
      },
      {
        heading: "Dichter bij Uden, dus vaker op de werkvloer",
        paragraphs: [
          "Helmond ligt op ongeveer 25 minuten van Uden, ruim binnen de ring van ongeveer 45 minuten. De reistijd zit in het tarief. We komen met een dagdeel, op de tijden dat de bedrijfsleider er is. Een gesprek om tien uur mist de ploeg die vroeg begint. Online kan voor een voortgang. Het eerste beeld van de werkplek halen we op locatie.",
          "Het kantoor aan de Losplaats 16d blijft beschikbaar. Wie daarheen komt, blijft in beweging. Wie niet kan reizen, spreken we in Helmond. Twee planten van één groep, bijvoorbeeld Helmond en Deurne of Gemert, kunnen uren delen. In de offerte staat hoeveel uur naar welke locatie gaat, en wie het vaste gezicht is.",
        ],
      },
      {
        heading: "UWV-vestiging Helmond, regio Helmond-De Peel",
        paragraphs: [
          "Helmond is niet de UWV-regio van Eindhoven. De arbeidsmarktregio heet Helmond-De Peel, de vestiging staat in Helmond. Tot het werkgebied horen Asten, Deurne, Geldrop-Mierlo, Gemert-Bakel, Helmond, Laarbeek en Someren. Deurne en Gemert hebben bij ons een eigen pagina. Asten, Someren, Laarbeek en Geldrop-Mierlo vallen onder de regiopagina Zuidoost-Brabant en De Kempen.",
          "Wie in Helmond én Eindhoven zit, heeft bij UWV twee vestigingen en kan bij ons toch één casemanager hebben. De uren moeten dat toelaten. De actuele indeling staat op uwv.nl. Brainport telt beide steden mee. Dat samenwerkingsverband is iets anders dan het werkgebied van een UWV-vestiging.",
        ],
      },
    ],
    sources: [
      uwv,
      { label: "Automotive Campus Helmond", url: "https://www.automotivecampus.com/" },
      { label: "Brainport Eindhoven", url: "https://brainporteindhoven.com/nl/" },
      { label: "Samenwerking Kempengemeenten", url: "https://www.kempengemeenten.nl/" },
    ],
  },
];

export function getStad(slug: string | undefined): StadDossier | undefined {
  return focusSteden.find((stad) => stad.slug === slug);
}
