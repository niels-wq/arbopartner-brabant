/** Data en advies voor de risicoscan en de verzuim-tijdlijn. Geen oordeel van UWV. */

export type Answer = "ja" | "deels" | "nee";
export type RiskLevel = "laag" | "gemiddeld" | "hoog";
export type MilestoneMode = "deadline" | "window" | "working-day";
export type MilestoneStatus = "verstreken" | "vandaag" | "binnenkort" | "later";

export const answerLabel: Record<Answer, string> = {
  ja: "Ja",
  deels: "Deels",
  nee: "Nee",
};

export const levelLabel: Record<RiskLevel, string> = {
  laag: "Laag risico",
  gemiddeld: "Gemiddeld risico",
  hoog: "Hoog risico",
};

/** Zelfde kernboodschap als op de pagina over het verschil met een arbodienst. Geen onderzoek. */
export const kernboodschap =
  "In ongeveer 95 procent van de dossiers gaat het vanzelf goed. Die ongeveer 5 procent die fout kan gaan, is het deel waar loonsancties ontstaan: tot 52 weken extra loon. Mist u die 5 procent, dan heeft u niets aan de 95 procent. Dit is onze kernboodschap, geen onderzoek en geen landelijk percentage.";

export const meldingBoete =
  "UWV noemt bij een te late 42e-weeksmelding een boete van maximaal € 455. Dat is iets anders dan een loonsanctie.";

export const timelineCountingNote =
  "Een ziekteweek is zeven dagen, gerekend vanaf de eerste ziektedag. Bij een deadline tonen we de laatste dag van die week. De 42e-weeksmelding is de eerste werkdag nadat week 42 voorbij is. We slaan zaterdag, zondag en dagen waarop UWV dicht is over: nieuwjaar, Goede Vrijdag, paasmaandag, Koningsdag, 5 mei, Hemelvaart, pinkstermaandag en beide kerstdagen. Een vrije dag van uw eigen bedrijf telt niet mee. Wordt iemand binnen vier weken opnieuw ziek, dan telt UWV de periodes soms bij elkaar op. Deze tijdlijn doet dat niet. Vul dan de datum in vanaf wanneer de periodes meetellen.";

const points: Record<Answer, number> = { ja: 0, deels: 1, nee: 2 };

export type ScanItem = {
  id: string;
  group: "inhoudelijk" | "administratief";
  question: string;
  hint: string;
  advice: Record<Answer, string>;
};

export const scanItems: ScanItem[] = [
  {
    id: "analyse",
    group: "inhoudelijk",
    question: "Ligt er een probleemanalyse van de bedrijfsarts, binnen zes weken na de eerste ziektedag?",
    hint: "De analyse beschrijft wat iemand nog kan, en hoe lang de beperkingen naar verwachting duren. Geen diagnose in de map van de leidinggevende.",
    advice: {
      ja: "Bewaar de analyse bij het plan, in gewone woorden over wat iemand nog kan. Een stuk dat alleen in het portaal van de arbodienst staat, telt straks niet als niemand het terugvindt.",
      deels: "Vraag de bedrijfsarts deze week om de ontbrekende belastbaarheid of prognose. Zet de datum van de te late analyse in het dossier. Een stuk dat later kwam, laat nog steeds een gat zien.",
      nee: "Plan vandaag een spreekuur. Zonder probleemanalyse schrijft u het plan op gevoel. Dat gat ziet UWV terug bij de toets van het re-integratieverslag.",
    },
  },
  {
    id: "plan",
    group: "inhoudelijk",
    question: "Is er binnen acht weken een plan van aanpak, getekend door werkgever en werknemer?",
    hint: "Met een concrete taak, uren, een eigenaar en een evaluatiedatum. ‘We blijven in gesprek’ is geen plan.",
    advice: {
      ja: "Houd de getekende versie, met activiteiten, data en een eigenaar. Bij de volgende bijstelling laat u de oude versie staan. UWV wil de reeks zien, niet alleen de laatste pagina.",
      deels: "Maak het plan deze week concreet: taak, uren, startdatum, eigenaar, evaluatiedatum. Laat werkgever en werknemer allebei tekenen. Eén handtekening van HR is niet genoeg.",
      nee: "Schrijf deze week een plan van één pagina en laat beide partijen tekenen. Ontbreekt de probleemanalyse nog, zet dan de afspraak met de arts in het plan en maak het definitief zodra die er is.",
    },
  },
  {
    id: "bijstelling",
    group: "inhoudelijk",
    question: "Is het plan daarna bijgesteld, minstens eens per zes weken?",
    hint: "UWV vraagt dat werkgever en werknemer de voortgang minstens eens per zes weken bespreken, en het plan aanpassen als dat nodig is.",
    advice: {
      ja: "Ga zo door. Bewaar elke versie met een datum in de bestandsnaam. Een evaluatie zonder conclusie (doorgaan, verzwaren, verlichten, of ander werk) is nog geen bijstelling.",
      deels: "Zet de eerstvolgende bijstelling in de agenda, binnen zes weken, en schrijf op wat er sinds de vorige versie veranderde. Drie regels zijn genoeg: uren, taak, volgende datum.",
      nee: "Het laatste plan is een momentopname. Plan deze week een voortgangsgesprek en leg een nieuwe versie vast. Een plan dat na week acht niet meer is aangeraakt, leest als stilstand.",
    },
  },
  {
    id: "arts",
    group: "inhoudelijk",
    question: "Is de bedrijfsarts betrokken, en niet alleen de leidinggevende?",
    hint: "De arts levert het medische kader. De leidinggevende verdeelt het werk. Een casemanager is geen arts.",
    advice: {
      ja: "Houd het oordeel actueel. Is het laatste advies ouder dan een paar maanden en is de situatie veranderd, plan dan eerst de arts en daarna pas een zwaarder of lichter plan.",
      deels: "Er is contact, maar de belastbaarheid is niet recent getoetst. Vraag een actueel oordeel voordat u taken verzwaart of iemand voor de zekerheid thuislaat.",
      nee: "Schakel de bedrijfsarts in volgens uw arbocontract, op een termijn die bij week zes past. Zonder medisch kader gokt u welke taken passend zijn.",
    },
  },
  {
    id: "evaluatie",
    group: "inhoudelijk",
    question: "Is de eerstejaarsevaluatie rond week 52 gedaan en door beide partijen vastgelegd?",
    hint: "Is week 52 nog niet bereikt, kies dan ja als de datum in de agenda staat en de stukken daarvoor klaarliggen.",
    advice: {
      ja: "Leg het verslag bij het re-integratieverslag. De acties voor de eerste acht weken daarna hebben een naam en een datum. Een mooi verslag en daarna stilte is een bekend patroon.",
      deels: "Schrijf het gesprek alsnog op en laat de medewerker tekenen. Benoem of ander werk buiten het bedrijf moet starten. Een gesprek zonder verslag is voor de toets geen evaluatie.",
      nee: "Is week 52 al geweest of bijna, plan de evaluatie binnen twee weken en beschrijf eerlijk wat ontbreekt. Is de datum nog ver, zet hem nu in de agenda, met een uitnodiging twee weken van tevoren.",
    },
  },
  {
    id: "spoor",
    group: "inhoudelijk",
    question: "Is het tweede spoor op tijd gestart toen terugkeer bij u geen perspectief meer had?",
    hint: "Heeft het eigen werk of ander werk in het bedrijf nog perspectief, en staat dat onderbouwd, kies dan ja. Het tweede spoor is werk bij een andere werkgever. De werkgever betaalt het.",
    advice: {
      ja: "Houd het eerste en het tweede spoor naast elkaar zolang terugkeer bij u nog kan. Bewaar de opdracht, de data en wat er werkelijk is gedaan, niet alleen de intentie.",
      deels: "Het traject is laat of dun. Schrijf deze week op wat er al gebeurde, wat ontbreekt, en wie de volgende stap doet. Een traject dat alleen op papier staat, is bij de toets dun.",
      nee: "Staat vast dat structurele terugkeer bij u niet waarschijnlijk is, geef dan deze week de opdracht. Wachten tot de laatste maanden is de vertraging waarop UWV de loondoorbetaling kan verlengen.",
    },
  },
  {
    id: "onderzoek",
    group: "inhoudelijk",
    question: "Is een arbeidsdeskundig onderzoek gedaan toen onduidelijk was welk werk nog kon?",
    hint: "Niet elk dossier heeft een onderzoek nodig. Kies ja als die afweging in het dossier staat, of als het onderzoek er ligt. De onderzoeker is een andere rol dan de begeleider.",
    advice: {
      ja: "Gebruik de conclusie in het plan: welke taken passen, welke niet, en of ander werk nodig is. De bedrijfsarts blijft de medische grens. De arbeidsdeskundige oordeelt over het werk.",
      deels: "Het onderzoek is gepland of half. Zet de opleverdatum vast. Stel een definitieve keuze over passend werk uit tot de conclusie er is, tenzij de arts al een harde grens gaf.",
      nee: "Is onduidelijk welk werk nog kan, binnen of buiten het bedrijf, schakel dan een arbeidsdeskundige in. Het is niet in elk dossier verplicht. Zonder die onderbouwing blijft passend werk een gok.",
    },
  },
  {
    id: "verslag",
    group: "inhoudelijk",
    question: "Is het re-integratieverslag compleet?",
    hint: "Probleemanalyse en bijstellingen, plan van aanpak en bijstellingen, eerstejaarsevaluatie, actueel oordeel van de bedrijfsarts, en tegen het einde de eindevaluatie.",
    advice: {
      ja: "Geef de medewerker een volledige kopie. Medische informatie gaat via de werknemer naar UWV. De werkgever uploadt die niet.",
      deels: "Loop de stukken na die UWV noemt en vul aan wat ontbreekt voordat de WIA-aanvraag er ligt. Een half verslag stelt de beoordeling uit.",
      nee: "Begin met de ontbrekende kernstukken en zet ze in één map. Een onvolledig verslag beoordeelt UWV niet. Tot die beoordeling betaalt u het loon door.",
    },
  },
  {
    id: "medewerking",
    group: "inhoudelijk",
    question: "Staat de medewerking van de werknemer op papier?",
    hint: "Uitnodigingen, reacties, handtekeningen, en een weigering als die er was. Noteer feiten. Geen diagnose.",
    advice: {
      ja: "Blijf uitnodigingen, reacties en een eventuele weigering noteren. Re-integratie is een verplichting van twee kanten. Druk op een vertrek voordat er passend werk is geprobeerd, voedt een sanctie eerder dan dat het die oplost.",
      deels: "Zet de mondelinge afspraken deze week op papier: datum, aanwezigen, wat iemand kan, wat u aanbiedt, en de volgende stap. Een appje ‘sterkte’ is geen verslag.",
      nee: "Nodig de medewerker deze week uit, stuur de stukken vooraf, en leg vast of iemand komt, tekent of weigert. Een plan dat u oplegt zonder gesprek geeft een scheef dossier. Een weigering die nergens staat ook.",
    },
  },
  {
    id: "melding",
    group: "administratief",
    question: "Is de 42e-weeksmelding bij UWV op tijd gedaan?",
    hint: "Is die week nog niet bereikt, kies dan ja als de datum in de agenda staat. Dit punt gaat over een boete, niet over een loonsanctie, en telt daarom niet mee in de score.",
    advice: {
      ja: "Bewaar de bevestiging van de melding. Dit is een administratieve melding. Het zegt niets over de kwaliteit van de re-integratie.",
      deels: `De melding is te laat of onvolledig gedaan. Bewaar alsnog het bewijs. ${meldingBoete}`,
      nee: `Doe de melding vandaag als de 42 weken voorbij zijn, via het werkgeversportaal of het formulier van UWV. Is de week nog niet bereikt, zet de datum uit de tijdlijn dan nu in de agenda. ${meldingBoete}`,
    },
  },
];

export type Source = { title: string; url: string; note: string };

export const scanSources: Source[] = [
  {
    title: "UWV, plan van aanpak",
    url: "https://www.uwv.nl/nl/ziek/loondoorbetaling/plan-van-aanpak",
    note: "Plan uiterlijk twee weken na de probleemanalyse. Voortgang minstens eens per zes weken.",
  },
  {
    title: "UWV, 42e-weeksmelding",
    url: "https://www.uwv.nl/nl/ziek/re-integratie/42e-weeksmelding",
    note: "Te laat melden kan een boete geven van maximaal € 455.",
  },
  {
    title: "UWV, re-integratieverslag",
    url: "https://www.uwv.nl/nl/ziek/re-integratie/verslag",
    note: "Welke stukken erin horen, en dat medische informatie via de werknemer gaat.",
  },
  {
    title: "UWV, beoordeling van het re-integratieverslag",
    url: "https://www.uwv.nl/nl/ziek/re-integratie/beoordeling-re-integratieverslag",
    note: "Bij onvoldoende re-integratie maximaal een jaar extra loon.",
  },
  {
    title: "UWV, stappen bij ziekte van een werknemer",
    url: "https://www.uwv.nl/en/employers/sickness/a-step-by-step-guide-to-employee-sickness",
    note: "Week 6, 8, 42, 52, 91, 93 en 104 zoals UWV ze aan werkgevers uitlegt.",
  },
];

export const timelineSources: Source[] = [
  ...scanSources,
  {
    title: "UWV, WIA aanvragen",
    url: "https://www.uwv.nl/nl/wia/wia-aanvragen",
    note: "In de 88e ziekteweek komt de brief. Daarna is er tijd tot de datum in die brief. UWV noemt week 93 als uiterste week.",
  },
  {
    title: "UWV, ziekteperiodes optellen",
    url: "https://www.uwv.nl/nl/ziek/ziekteperiodes-optellen",
    note: "Opnieuw ziek binnen vier weken telt vaak mee. Vanaf vier weken begint een nieuwe periode.",
  },
  {
    title: "Burgerlijk Wetboek boek 7, artikel 629",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Minstens 70 procent loon gedurende 104 weken, tenzij contract of cao meer zegt.",
  },
];

export type ScoredItem = {
  id: string;
  group: ScanItem["group"];
  question: string;
  answer: Answer;
  advice: string;
};

export type ScanResult = {
  level: RiskLevel;
  label: string;
  summary: string;
  points: number;
  maxPoints: number;
  counts: Record<Answer, number>;
  melding: ScoredItem;
  items: ScoredItem[];
  report: string;
};

const summaries: Record<RiskLevel, string> = {
  laag: "Op de negen inhoudelijke punten is dit dossier grotendeels op orde. Dat is een begin, geen vrijbrief. UWV doet de toets, wij niet.",
  gemiddeld: "Er zijn gaten of halve stukken. Die zijn vaak nog te repareren als u ze deze weken vastlegt, met datum en handtekening.",
  hoog: "Er ontbreekt veel. Wacht niet tot de brief over de WIA-aanvraag. Een loonsanctie kan maximaal 52 weken extra loon betekenen. We garanderen niet dat repareren de toets haalt.",
};

function isAnswer(value: unknown): value is Answer {
  return value === "ja" || value === "deels" || value === "nee";
}

export function scoreScan(input: Record<string, unknown>): ScanResult {
  const items: ScoredItem[] = scanItems.map((item) => {
    const answer = input[item.id];
    if (!isAnswer(answer)) throw new Error(`Antwoord ontbreekt: ${item.id}.`);
    return {
      id: item.id,
      group: item.group,
      question: item.question,
      answer,
      advice: item.advice[answer],
    };
  });
  const core = items.filter((item) => item.group === "inhoudelijk");
  const counts: Record<Answer, number> = { ja: 0, deels: 0, nee: 0 };
  let total = 0;
  for (const item of core) {
    counts[item.answer] += 1;
    total += points[item.answer];
  }
  const level: RiskLevel = counts.nee >= 3 || total >= 8 ? "hoog" : counts.nee >= 1 || total >= 2 ? "gemiddeld" : "laag";
  const melding = items.find((item) => item.id === "melding");
  if (!melding) throw new Error("Melding ontbreekt.");
  const maxPoints = core.length * 2;
  const result: ScanResult = {
    level,
    label: levelLabel[level],
    summary: summaries[level],
    points: total,
    maxPoints,
    counts,
    melding,
    items,
    report: "",
  };
  result.report = scanReport(result);
  return result;
}

function scanReport(result: ScanResult): string {
  const lines = [
    "Loonsanctie-risicoscan",
    "Indicatie, geen oordeel van UWV en geen offerte.",
    "",
    `Risico: ${result.label}`,
    result.summary,
    `Score: ${result.points} van ${result.maxPoints} op de negen inhoudelijke punten.`,
    "Ja telt als 0, deels als 1, nee als 2.",
    `Ja: ${result.counts.ja}. Deels: ${result.counts.deels}. Nee: ${result.counts.nee}.`,
    "",
    `42e-weeksmelding: ${answerLabel[result.melding.answer]}. ${result.melding.advice}`,
    "",
    ...result.items.flatMap((item, index) => [
      `${index + 1}. ${item.question}`,
      `Antwoord: ${answerLabel[item.answer]}`,
      item.advice,
      "",
    ]),
    kernboodschap,
    "Een loonsanctie is maximaal 52 weken extra loon aan de medewerker, geen boete aan UWV.",
  ];
  return lines.join("\n").trim();
}

export type TimelineMilestone = {
  id: string;
  weeks: number;
  when: string;
  title: string;
  who: string;
  mode: MilestoneMode;
  detail: string;
  tip: string;
  summary: string;
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "probleemanalyse",
    weeks: 6,
    when: "Week 6",
    title: "Probleemanalyse",
    who: "Bedrijfsarts",
    mode: "deadline",
    detail: "Laatste dag van de zesde ziekteweek.",
    tip: "Vraag de bedrijfsarts wat iemand nog kan, en hoe lang dat naar verwachting duurt. Wacht niet tot deze datum als u in week drie al ziet dat het langer duurt.",
    summary: "Probleemanalyse, uiterlijk week 6",
  },
  {
    id: "plan",
    weeks: 8,
    when: "Week 8",
    title: "Plan van aanpak",
    who: "Werkgever en werknemer",
    mode: "deadline",
    detail: "Laatste dag van de achtste ziekteweek. Eerder mag, later is een gat.",
    tip: "Schrijf taak, uren, eigenaar en de volgende evaluatie op, en laat beide partijen tekenen. UWV vraagt daarna minstens eens per zes weken een voortgangsgesprek.",
    summary: "Plan van aanpak, uiterlijk week 8",
  },
  {
    id: "melding42",
    weeks: 42,
    when: "Week 42",
    title: "42e-weeksmelding bij UWV",
    who: "Werkgever",
    mode: "working-day",
    detail: "Eerste werkdag nadat week 42 voorbij is. Weekenden en dagen waarop UWV dicht is slaan we over.",
    tip: `Meld de werknemer via het werkgeversportaal als die dan nog niet volledig werkt. Bewaar de bevestiging. ${meldingBoete}`,
    summary: "42e-weeksmelding UWV",
  },
  {
    id: "evaluatie",
    weeks: 52,
    when: "Week 52",
    title: "Eerstejaarsevaluatie",
    who: "Werkgever en werknemer",
    mode: "deadline",
    detail: "Laatste dag van de 52e ziekteweek. Plan het gesprek eerder.",
    tip: "Kijk terug op taken en uren, en vooruit: past de eigen functie nog, is ander werk in het bedrijf onderzocht, en moet werk bij een andere werkgever starten. Beide partijen tekenen.",
    summary: "Eerstejaarsevaluatie, week 52",
  },
  {
    id: "wiaBrief",
    weeks: 88,
    when: "Week 88",
    title: "Brief met de WIA-aanvraagformulieren",
    who: "UWV",
    mode: "window",
    detail: "De hele 88e ziekteweek. UWV stuurt de brief in deze week, niet op een vaste dag binnen de week.",
    tip: "De werknemer krijgt de brief, u een kopie. Controleer of u dezelfde eerste ziektedag gebruikt. Vanaf deze brief loopt de tijd tot uiterlijk week 93.",
    summary: "WIA-formulieren van UWV, week 88",
  },
  {
    id: "eindevaluatie",
    weeks: 91,
    when: "Week 91",
    title: "Eindevaluatie en re-integratieverslag",
    who: "Werkgever en werknemer",
    mode: "deadline",
    detail: "Laatste dag van de 91e ziekteweek. Het verslag hoort dan bij de werknemer te liggen.",
    tip: "Rond de eindevaluatie af en geef een volledige kopie van het verslag. Medische informatie stuurt de werknemer zelf naar UWV. Zonder compleet verslag stelt UWV de beoordeling uit en betaalt u het loon door. De indien-deadline van de aanvraag is week 93.",
    summary: "Eindevaluatie, week 91",
  },
  {
    id: "wiaDeadline",
    weeks: 93,
    when: "Week 93",
    title: "Uiterste week voor de WIA-aanvraag",
    who: "Werknemer",
    mode: "deadline",
    detail: "Laatste dag van de 93e ziekteweek. Dit is de deadline die UWV noemt.",
    tip: "Te laat aanvragen kan de uitkering later of tijdelijk lager laten ingaan. Ligt dat aan de werkgever, dan betaalt u het loon langer door. Help de datum bewaken. De aanvraag doet de werknemer.",
    summary: "Deadline WIA-aanvraag, week 93",
  },
  {
    id: "einde",
    weeks: 104,
    when: "Week 104",
    title: "Einde van de loondoorbetaling",
    who: "Werkgever",
    mode: "deadline",
    detail: "Laatste dag van de 104e ziekteweek. De dag erna kan een WIA-uitkering ingaan als de aanvraag op tijd was en UWV geen loonsanctie oplegt.",
    tip: "De loondoorbetaling stopt in beginsel. Het wettelijk minimum is 70 procent gedurende deze 104 weken, tenzij contract of cao meer zegt. UWV toetst de re-integratie. Bij tekorten kan nog maximaal 52 weken loon volgen.",
    summary: "Einde loondoorbetaling, week 104",
  },
];

export const statusLabel: Record<MilestoneStatus, string> = {
  verstreken: "Verstreken",
  vandaag: "Vandaag",
  binnenkort: "Binnen twee weken",
  later: "Later",
};

export type DatedMilestone = TimelineMilestone & {
  start: Date;
  end: Date;
  label: string;
  status: MilestoneStatus;
};

export type TimelineResult = {
  firstSickDay: Date;
  milestones: DatedMilestone[];
  position: string;
  ics: string;
  fileName: string;
  report: string;
};

export function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function formatIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

const dutchDate = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDutch(date: Date): string {
  return dutchDate.format(date);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function daysBetween(from: Date, to: Date): number {
  const utc = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function startOfSicknessWeek(firstSickDay: Date, week: number): Date {
  return addDays(firstSickDay, (week - 1) * 7);
}

export function endOfSicknessWeek(firstSickDay: Date, week: number): Date {
  return addDays(firstSickDay, week * 7 - 1);
}

/** Anonieme Gregoriaanse berekening. Paaszondag. */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function koningsdag(year: number): Date {
  const day = new Date(year, 3, 27);
  if (day.getDay() === 0) return new Date(year, 3, 26);
  return day;
}

export function uwvClosedDays(year: number): Date[] {
  const easter = easterSunday(year);
  return [
    new Date(year, 0, 1),
    addDays(easter, -2),
    addDays(easter, 1),
    koningsdag(year),
    new Date(year, 4, 5),
    addDays(easter, 39),
    addDays(easter, 50),
    new Date(year, 11, 25),
    new Date(year, 11, 26),
  ];
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isUwvClosed(date: Date): boolean {
  return uwvClosedDays(date.getFullYear()).some((day) => sameDay(day, date));
}

export function firstWorkingDayAfter(date: Date): Date {
  let cursor = addDays(date, 1);
  for (let step = 0; step < 14; step += 1) {
    if (!isWeekend(cursor) && !isUwvClosed(cursor)) return cursor;
    cursor = addDays(cursor, 1);
  }
  return cursor;
}

export function dateInRange(date: Date, today: Date): string | null {
  if (date.getFullYear() < 1990 || date.getFullYear() > today.getFullYear() + 3) {
    return "Kies een eerste ziektedag tussen 1990 en drie jaar vooruit.";
  }
  return null;
}

function statusFor(start: Date, end: Date, today: Date): MilestoneStatus {
  if (daysBetween(end, today) > 0) return "verstreken";
  if (daysBetween(start, today) >= 0 && daysBetween(today, end) >= 0) return "vandaag";
  if (daysBetween(today, start) <= 14) return "binnenkort";
  return "later";
}

function dateLabel(mode: MilestoneMode, start: Date, end: Date): string {
  if (mode === "window") return `${formatDutch(start)} t/m ${formatDutch(end)}`;
  return `Uiterlijk ${formatDutch(end)}`;
}

function positionNote(milestones: DatedMilestone[], today: Date): string {
  const upcoming = milestones.find((item) => daysBetween(item.end, today) <= 0);
  if (!upcoming) return "Alle momenten op deze tijdlijn liggen voor vandaag.";
  const index = milestones.indexOf(upcoming);
  if (upcoming.status === "vandaag") return `Vandaag valt in: ${upcoming.title}.`;
  if (index === 0) return `Het eerstvolgende moment is ${upcoming.title}.`;
  return `Vandaag zit u tussen ${milestones[index - 1].title} en ${upcoming.title}.`;
}

function icsEscape(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("\n", "\\n").replaceAll(",", "\\,").replaceAll(";", "\\;");
}

function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    const max = parts.length === 0 ? 75 : 74;
    if (current && bytes + size > max) {
      if (current.endsWith("\\")) {
        const kept = current.slice(0, -1);
        parts.push(kept);
        current = `\\${char}`;
        bytes = encoder.encode(current).length;
      } else {
        parts.push(current);
        current = char;
        bytes = size;
      }
    } else {
      current += char;
      bytes += size;
    }
  }
  if (current) parts.push(current);
  return parts.map((part, index) => (index === 0 ? part : ` ${part}`)).join("\r\n");
}

function utcStamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function compact(date: Date): string {
  return formatIso(date).replaceAll("-", "");
}

function alarmTrigger(start: Date, today: Date): string | null {
  const days = daysBetween(today, start);
  if (days >= 3) return "-P3D";
  if (days >= 1) return "-P1D";
  return null;
}

export function buildIcs(result: Pick<TimelineResult, "milestones">, today: Date, now: Date): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arbopartner Brabant//Verzuim-tijdlijn//NL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Verzuim-tijdlijn",
  ];
  for (const item of result.milestones) {
    const description = `${item.label}. ${item.detail} ${item.tip}`;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${item.id}-${compact(item.end)}@arbopartnerbrabant.nl`);
    lines.push(`DTSTAMP:${utcStamp(now)}`);
    lines.push(`DTSTART;VALUE=DATE:${compact(item.start)}`);
    lines.push(`DTEND;VALUE=DATE:${compact(addDays(item.end, 1))}`);
    lines.push(`SUMMARY:${icsEscape(item.summary)}`);
    lines.push(`DESCRIPTION:${icsEscape(description)}`);
    const trigger = alarmTrigger(item.start, today);
    if (trigger) {
      lines.push("BEGIN:VALARM");
      lines.push("ACTION:DISPLAY");
      lines.push(`DESCRIPTION:${icsEscape(`Herinnering: ${item.summary}`)}`);
      lines.push(`TRIGGER:${trigger}`);
      lines.push("END:VALARM");
    }
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

export function buildTimeline(firstSickDay: Date, today: Date, now: Date = today): TimelineResult {
  if (Number.isNaN(firstSickDay.getTime()) || Number.isNaN(today.getTime())) {
    throw new Error("Ongeldige datum.");
  }
  const milestones: DatedMilestone[] = timelineMilestones.map((item) => {
    const weekEnd = endOfSicknessWeek(firstSickDay, item.weeks);
    const start = item.mode === "window" ? startOfSicknessWeek(firstSickDay, item.weeks) : item.mode === "working-day" ? firstWorkingDayAfter(weekEnd) : weekEnd;
    const end = item.mode === "window" ? weekEnd : start;
    return {
      ...item,
      start,
      end,
      label: dateLabel(item.mode, start, end),
      status: statusFor(start, end, today),
    };
  });
  const partial = { milestones };
  const ics = buildIcs(partial, today, now);
  const report = timelineReport(firstSickDay, milestones);
  return {
    firstSickDay,
    milestones,
    position: positionNote(milestones, today),
    ics,
    fileName: `verzuim-tijdlijn-${formatIso(firstSickDay)}.ics`,
    report,
  };
}

function timelineReport(firstSickDay: Date, milestones: DatedMilestone[]): string {
  const lines = [
    "Verzuim-tijdlijn",
    `Eerste ziektedag: ${formatDutch(firstSickDay)}.`,
    "Geheugensteun, geen juridisch advies en geen offerte.",
    timelineCountingNote,
    "",
    ...milestones.flatMap((item) => [
      `${item.when}. ${item.title} (${item.who})`,
      item.label,
      item.detail,
      item.tip,
      "",
    ]),
    "Het agenda-bestand op de site zet een herinnering in uw agenda, één of drie dagen van tevoren, zolang de datum nog niet voorbij is. Deze mail sturen we één keer. Een wekelijkse herinneringsmail sturen we niet.",
  ];
  return lines.join("\n").trim();
}

export function icsPhysicalLines(ics: string): string[] {
  return ics.split("\r\n").filter((line) => line.length > 0);
}
