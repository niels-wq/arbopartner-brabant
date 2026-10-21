/** Onderscheid met een arbodienst. Alleen de punten die Niels heeft aangeleverd. */

export const arbodienstPath = "/arbodienst-of-arbopartner";

export const arbodienstRows = [
  {
    onderwerp: "Waar het werk zit",
    arbodienst:
      "Een arbodienst richt zich op verzuimbegeleiding, de bedrijfsarts en de verplichte stappen in de eerste twee ziektejaren.",
    wij: "Wij vullen dat aan en gaan verder: de hele keten tot en met 12 jaar WGA, en de Ziektewet.",
  },
  {
    onderwerp: "Wie het doet",
    arbodienst: "De arbodienst levert de verzuimbegeleiding en de bedrijfsarts. De bedrijfsarts blijft van u.",
    wij: "Wij werken enkel met senior casemanagers. Tien jaar ervaring. Casemanagers zijn schaars en het vak is complex.",
  },
  {
    onderwerp: "Wat er omheen zit",
    arbodienst: "Het contract draait om de begeleiding en de arts.",
    wij: "Weinig tot geen overhead. U spreekt de casemanager, niet een loket.",
  },
  {
    onderwerp: "Expertise",
    arbodienst: "De medische beoordeling hoort bij de bedrijfsarts.",
    wij: "Arbeidsdeskundige expertise in huis, en kennis van bezwaar en beroep via Matchvermogen. Wij zijn geen advocatenkantoor en geven geen medisch oordeel.",
  },
] as const;

export const arbodienstGevallen = [
  {
    titel: "Een dreigende loonsanctie bij de RIV-toets",
    situatie:
      "Het re-integratiedossier is onvolledig en de toets van het re-integratieverslag door UWV komt in zicht.",
    mis: "Stukken ontbreken, termijnen zijn gemist, of een buitenstaander kan het verhaal niet volgen.",
    doen: "Een senior casemanager maakt het dossier leesbaar en vult aan wat nog kan. Waar de loonwaarde schuurt, kijkt een arbeidsdeskundige mee.",
    resultaat:
      "Een dossier dat de toets kan dragen. We garanderen niet dat UWV een loonsanctie achterwege laat. UWV beoordeelt.",
    href: "/tools/loonsanctie-check",
    hrefLabel: "Loonsanctie-check",
  },
  {
    titel: "Een tweede spoor dat te laat of te mager is",
    situatie: "Terugkeer in eigen werk lukt niet, en het traject naar ander werk is laat of dun gestart.",
    mis: "Het tweede spoor staat op papier, of het begint pas in de laatste maanden van het tweede jaar.",
    doen: "We zetten het op tijd op de agenda en laten Best Match het traject uitvoeren. De casemanager houdt bij wat er werkelijk is gedaan.",
    resultaat: "Het dossier laat de inzet zien. We beloven geen baan bij een andere werkgever.",
    href: "/diensten/tweede-spoor",
    hrefLabel: "Tweede spoor",
  },
  {
    titel: "Een WGA-beslissing waar bezwaar tegen kan",
    situatie: "UWV kent een WGA-uitkering toe en de loonwaarde of het arbeidsdeskundig oordeel wringt met het werk.",
    mis: "De termijn voor bezwaar loopt af, of niemand met arbeidsdeskundige kennis leest de beslissing.",
    doen: "We lezen de beslissing met arbeidsdeskundige expertise in huis. Kennis van bezwaar en beroep zit bij Matchvermogen. Het bezwaar zelf loopt via dat zustermerk. Een advocaat schakelt u zelf in als het juridisch wordt.",
    resultaat: "U hoort op tijd of bezwaar de moeite is. De uitkomst van UWV beloven we niet.",
    href: "/diensten/arbeidsdeskundig-onderzoek",
    hrefLabel: "Arbeidsdeskundig onderzoek",
  },
  {
    titel: "Een werknemer uit dienst, in de Ziektewet",
    situatie: "Het contract stopt en de werknemer komt in de Ziektewet. U bent eigenrisicodrager.",
    mis: "De begeleiding stopt op de laatste werkdag, terwijl de Ziektewet doorloopt.",
    doen: "We houden de keten vast, ook na uitdiensttreding. De bedrijfsarts blijft u zelf organiseren.",
    resultaat: "Het dossier stopt niet bij de einddatum. We garanderen geen lagere Ziektewetlast.",
    href: "/diensten/casemanager-detachering",
    hrefLabel: "Casemanager detacheren",
  },
  {
    titel: "WGA-eigenrisicodrager, van jaar 2 tot jaar 12",
    situatie: "Na de eerste twee ziektejaren loopt de WGA door, en u draagt het eigen risico tot en met jaar 12.",
    mis: "De aandacht zakt weg zodra de loondoorbetaling stopt, terwijl de lasten nog jaren kunnen doorlopen.",
    doen: "We overzien de hele keten, niet alleen de eerste twee jaar. Een senior casemanager en een arbeidsdeskundige kijken naar loonwaarde en passend werk.",
    resultaat: "U houdt zicht op die jaren. We noemen geen besparing en voorspellen de uitkering niet.",
    href: "/diensten/wia-begeleiding",
    hrefLabel: "WIA-begeleiding",
  },
  {
    titel: "Een onduidelijk advies, een vastgelopen dossier of een wisselende casemanager",
    situatie:
      "Het advies van de bedrijfsarts is onduidelijk, het dossier loopt vast, of casemanagers wisselen en de rode draad verdwijnt.",
    mis: "Niemand weet welke stap nu aan de beurt is. De medewerker vertelt het verhaal opnieuw.",
    doen: "Een senior casemanager maakt het advies bruikbaar, vraagt de bedrijfsarts om verduidelijking waar dat mag, en houdt één lijn in het dossier. Bij ziekte of vakantie neemt een collega over, met overdracht.",
    resultaat:
      "Duidelijkheid over de volgende stap. De werkgever krijgt geen medische details. We garanderen niet dat een sanctie uitblijft.",
    href: "/situaties#onduidelijk-verslag",
    hrefLabel: "Onduidelijk verslag",
  },
] as const;

export const arbodienstFaq = [
  {
    q: "Zijn jullie een arbodienst?",
    a: "Nee. Een arbodienst richt zich op verzuimbegeleiding, de bedrijfsarts en de verplichte stappen in de eerste twee ziektejaren. Wij vullen dat aan en gaan verder op de keten tot en met 12 jaar WGA en de Ziektewet. De bedrijfsarts blijft u zelf organiseren.",
  },
  {
    q: "Werken jullie met beginnende casemanagers?",
    a: "Nee. We werken enkel met senior casemanagers. Casemanagers zijn schaars en het vak is complex. Een beginnende casemanager ziet de dossiers die fout kunnen gaan niet aankomen. Een senior wel. We hebben tien jaar ervaring.",
  },
  {
    q: "Is ongeveer 95 procent een gemeten cijfer?",
    a: "Nee. Het is onze kernboodschap, geen onderzoek en geen landelijk percentage. In ongeveer 95 procent van de dossiers gaat het vanzelf goed. Die ongeveer 5 procent die fout kan gaan, is het deel waar loonsancties en hoge WGA-lasten ontstaan. Mist u die 5 procent, dan heeft u niets aan de 95 procent.",
  },
  {
    q: "Doen jullie het bezwaar zelf?",
    a: "Kennis van bezwaar en beroep zit in huis, via Matchvermogen. Het bezwaar zelf loopt via dat zustermerk. Wij zijn geen advocatenkantoor. De uitkomst beloven we niet.",
  },
  {
    q: "Voor wie is dit?",
    a: "Voor organisaties met 35 tot 500 medewerkers in Noord-Brabant. Kleinere organisaties verwijzen we door naar een gerichte opdracht bij Matchvermogen.",
  },
] as const;
