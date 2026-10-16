export type SituatieIcon = "calendar" | "balance" | "chairs" | "swap" | "clock" | "alert" | "document";

export type Situatie = {
  slug: string;
  title: string;
  probleem: string;
  oplossing: string;
  stappen?: string[];
  resultaat: string;
  icon: SituatieIcon;
  href: string;
  hrefLabel: string;
};

export const situaties: Situatie[] = [
  {
    slug: "geen-casemanager",
    title: "We krijgen geen casemanager gevonden of aangenomen",
    probleem:
      "De vacature staat open, kandidaten haken af, of de ronde levert niemand op die de dossiers echt kan dragen.",
    oplossing:
      "U detacheert een casemanager die het werk al doet. U werft niet, u bouwt geen procedure op, en u start met een uurblok dat bij het aantal dossiers past.",
    resultaat:
      "Eén vast gezicht op de dossiers, zonder wervingsronde. Wanneer iemand start, staat in de offerte. Een datum die we niet kennen, beloven we niet.",
    icon: "calendar",
    href: "/diensten/casemanager-detachering",
    hrefLabel: "Casemanager detacheren",
  },
  {
    slug: "aannemen-te-duur",
    title: "Iemand speciaal hiervoor aannemen is lastig of te duur",
    probleem:
      "Een eigen casemanager is een fulltime contract. Dat betaalt u ook als er weinig dossiers lopen.",
    oplossing:
      "U betaalt de uren die u afneemt. De vergelijking zet die uren naast de jaarkost van een dienstverband, met bronnen die u kunt aanpassen.",
    resultaat:
      "In het standaardscenario, medior en tien uur per week, is inhuren goedkoper dan een fulltime kracht in dienst. Bij een bijna volle werkweek, bijvoorbeeld senior en 24 uur, kan een dienstverband in euro’s lager zijn. Dan zegt de tool dat.",
    icon: "balance",
    href: "/casemanager-inhuren-of-in-dienst",
    hrefLabel: "Inhuren of in dienst",
  },
  {
    slug: "niet-aansturen",
    title: "We hebben geen zin of tijd om iemand op dit vlak aan te sturen",
    probleem:
      "HR of de directeur moet een casemanager inwerken, bijsturen en vervangen. Die tijd is er niet, of het vak ligt te ver van de rest van het werk.",
    oplossing:
      "De casemanager werkt de dossiers zelf bij en stemt af met de leidinggevende. De vakmatige aansturing zit bij ons. Besluiten die bij de werkgever horen, blijven bij u.",
    resultaat:
      "U hoeft geen casemanager te managen. De bedrijfsarts blijft u zelf organiseren. We zijn geen arbodienst.",
    icon: "chairs",
    href: "/diensten/casemanager-detachering",
    hrefLabel: "Wat de casemanager zelf doet",
  },
  {
    slug: "continuiteit",
    title: "Continuïteit in de begeleiding lukt niet",
    probleem:
      "Wisselingen, ziekte of vertrek laten een dossier liggen. De medewerker vertelt het verhaal opnieuw en een termijn schuift door.",
    oplossing:
      "U spreekt in de regel dezelfde casemanager. Is die ziek of met vakantie, dan neemt een collega het dossier over, met een overdracht.",
    resultaat:
      "Het dossier loopt door. We beloven niet dat bij langdurige uitval altijd dezelfde persoon terugkomt. Wel dat een collega het overneemt.",
    icon: "swap",
    href: "/diensten/casemanager-detachering",
    hrefLabel: "Vervanging en overdracht",
  },
  {
    slug: "langdurig-verzuim",
    title: "Langdurig verzuim loopt uit de hand",
    probleem:
      "Dossiers lopen langer dan zes weken zonder plan. Niemand zet de vraag of eigen werk nog past op tijd op tafel.",
    oplossing:
      "De casemanager houdt de stappen bij, van de eerste week tot week 104, en schakelt een verzuimanalyse, een arbeidsdeskundige of tweede spoor in als het dossier dat vraagt.",
    resultaat:
      "U ziet welke dossiers te lang zonder plan lopen. We garanderen geen daling van het verzuimpercentage. Na een analyse laten we zien hoe het kan dalen, op uw cijfers.",
    icon: "clock",
    href: "/diensten/verzuimanalyse",
    hrefLabel: "Verzuimanalyse",
  },
  {
    slug: "loonsanctie",
    title: "Angst voor een loonsanctie van het UWV",
    probleem:
      "Een onvolledig dossier kan leiden tot een loonsanctie: UWV verlengt de loondoorbetaling, tot 52 extra weken loon.",
    oplossing:
      "De casemanager houdt het re-integratiedossier bij. De loonsanctie-check laat zeven gaten zien. UWV beoordeelt, wij niet.",
    resultaat:
      "Minder gaten in het dossier. Geen belofte dat een sanctie uitblijft. Dat risico is per dossier te onzeker om weg te nemen.",
    icon: "alert",
    href: "/tools/loonsanctie-check",
    hrefLabel: "Loonsanctie-check",
  },
  {
    slug: "onduidelijk-verslag",
    title: "De verslagen van de bedrijfsarts zijn onduidelijk",
    probleem:
      "De verslagen van de bedrijfsarts zijn onduidelijk. U weet niet wat u nu wel of niet mag vragen, wat de belastbaarheid is en wat de volgende stap is.",
    oplossing:
      "De casemanager maakt het advies bruikbaar voor werkgever en werknemer. De werkgever krijgt geen medische details.",
    stappen: [
      "De casemanager vertaalt het advies van de bedrijfsarts naar concrete acties voor werkgever en werknemer.",
      "We vragen de bedrijfsarts actief om verduidelijking of aanvulling, bijvoorbeeld een concrete FML, de belastbaarheid en een prognose.",
      "Bij twijfel zetten we een arbeidsdeskundige in om de mogelijkheden en de loonwaarde scherp te krijgen.",
      "Waar nodig adviseren we over een second opinion of een deskundigenoordeel van het UWV.",
      "Alles leggen we vast voor een sluitend Poortwachterdossier.",
    ],
    resultaat:
      "Duidelijkheid, sneller handelen en een kleiner risico op een loonsanctie. De werkgever krijgt geen medische details. We garanderen niet dat een sanctie uitblijft.",
    icon: "document",
    href: "/adviesgesprek",
    hrefLabel: "Bespreek dit verslag",
  },
];
