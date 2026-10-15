import {
  levels,
  monthlyCost,
  rateFor,
  tierForHours,
  yearlyCost,
  type Block,
  type LevelId,
} from "./rates.ts";

export const CBS = {
  nl2025: 5.4,
  size10to100: 4.7,
  size100plus: 6.0,
  source: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/80072ned/table",
  sourceLabel: "CBS StatLine 80072ned, ziekteverzuimpercentage",
};

export const TNO = {
  referenceWage: 36500,
  wagePart: 153 + 146 + 43,
  fixedPart: 60 + 7.5,
  pointEstimate: 410,
  workdays: 220,
  wagePay: 153,
  replacement: 146,
  productivity: 43,
  arbo: 60,
  guidance: 7.5,
  source: "https://publications.tno.nl/publication/34646745/vbrmvNib/TNO-2026-17537.pdf",
  sourceLabel: "TNO, Verzuimkosten (2026), TNO-2026-17537",
};

export const PREMIA_2026 = {
  awfLow: 0.0274,
  awfHigh: 0.0774,
  aofLow: 0.0627,
  aofHigh: 0.0763,
  wko: 0.005,
  zvw: 0.061,
  whkAverage: 0.0152,
  maxPremieLoon: 79409,
  holidayAllowance: 0.08,
  statutoryLeaveWeeks: 4,
  loonsomGrensKlein: 1082500,
};

export function defaultAbsencePct(employees: number): number {
  if (employees >= 100) return CBS.size100plus;
  if (employees >= 10) return CBS.size10to100;
  return CBS.nl2025;
}

export function dayCost(annualWage: number): number {
  return TNO.wagePart * (annualWage / TNO.referenceWage) + TNO.fixedPart;
}

export function absenceCost(employees: number, absencePct: number, annualWage: number): number {
  return employees * (absencePct / 100) * TNO.workdays * dayCost(annualWage);
}

export type SizeBand = "35-75" | "76-200" | "200+";
export type AbsenceBand = "lt4" | "4-6" | "gt6";
export type LongBand = "0-1" | "2-4" | "5+";
export type NatureBand = "fysiek" | "gemengd" | "psychisch";
export type HrBand = "team" | "one" | "none";

export type MatchAnswers = {
  size: SizeBand;
  headcount: number;
  absence: AbsenceBand;
  long: LongBand;
  nature: NatureBand;
  year1: boolean;
  sanction: boolean;
  hr: HrBand;
  sector: boolean;
};

export function headcountDefault(size: SizeBand): number {
  if (size === "35-75") return 50;
  if (size === "76-200") return 120;
  return 250;
}

export type MatchResult = {
  points: Record<string, number>;
  score: number;
  level: LevelId;
  levelLabel: string;
  override: boolean;
  rawHours: number;
  block: Block;
  billedHours: number;
  steppedUp: boolean;
  twoPeople: boolean;
  hourly: number;
  monthly: number;
  yearly: number;
  spoed: boolean;
};

export function matchCasemanager(answers: MatchAnswers): MatchResult {
  const points = {
    omvang: answers.size === "35-75" ? 0 : answers.size === "76-200" ? 1 : 2,
    verzuim: answers.absence === "lt4" ? 0 : answers.absence === "4-6" ? 1 : 2,
    lang: answers.long === "0-1" ? 0 : answers.long === "2-4" ? 1 : 3,
    aard: answers.nature === "fysiek" ? 0 : answers.nature === "gemengd" ? 1 : 2,
    jaar1: answers.year1 ? 2 : 0,
    sanctie: answers.sanction ? 3 : 0,
    hr: answers.hr === "team" ? 0 : answers.hr === "one" ? 1 : 2,
    sector: answers.sector ? 1 : 0,
  };
  const score = Object.values(points).reduce((sum, value) => sum + value, 0);
  let level: LevelId = score <= 5 ? "medior" : score <= 10 ? "medior-plus" : "senior";
  const override = answers.sanction && answers.nature === "psychisch";
  if (override) level = "senior";

  const headcount = Math.max(1, answers.headcount);
  const rawHours = (headcount / 100) * 10;
  const baseHours = Math.max(10, rawHours);
  let block = tierForHours(baseHours);
  const steppedUp = score >= 8 && block !== 24;
  if (score >= 8) block = block === 10 ? 20 : 24;

  let billedHours = block === 10 ? 10 : block === 20 ? 20 : Math.max(24, Math.round(baseHours));
  if (block === 24 && baseHours > 24) billedHours = Math.max(24, Math.round(baseHours));

  const hourly = levels[level].rates[block];
  return {
    points,
    score,
    level,
    levelLabel: levels[level].label,
    override,
    rawHours,
    block,
    billedHours,
    steppedUp,
    twoPeople: billedHours >= 30,
    hourly,
    monthly: monthlyCost(billedHours, hourly),
    yearly: yearlyCost(billedHours, hourly),
    spoed: answers.sanction,
  };
}

export type SavingsInput = {
  employees: number;
  absencePct: number;
  annualWage: number;
  longCases: number;
  scenarioPoints: 0.5 | 1 | 1.5;
  level: LevelId;
  weeklyHours: number;
};

export type SavingsResult = {
  day: number;
  costNow: number;
  costScenario: number;
  grossSaving: number;
  guidanceCost: number;
  net: number;
  scenarioPct: number;
  sanctionRisk: number;
  hourly: number;
  block: Block;
};

export function savings(input: SavingsInput): SavingsResult {
  const employees = Math.max(0, input.employees);
  const wage = Math.max(0, input.annualWage);
  const day = dayCost(wage);
  const costNow = absenceCost(employees, input.absencePct, wage);
  const scenarioPct = Math.max(0, input.absencePct - input.scenarioPoints);
  const costScenario = absenceCost(employees, scenarioPct, wage);
  const block = tierForHours(Math.max(10, input.weeklyHours));
  const hourly = rateFor(input.level, Math.max(10, input.weeklyHours));
  const hours = Math.max(10, input.weeklyHours);
  const guidanceCost = yearlyCost(hours, hourly);
  const weekWage = wage / 52;
  const sanctionRisk = Math.max(0, input.longCases) * 52 * weekWage * 1.3;
  return {
    day,
    costNow,
    costScenario,
    grossSaving: costNow - costScenario,
    guidanceCost,
    net: costNow - costScenario - guidanceCost,
    scenarioPct,
    sanctionRisk,
    hourly,
    block,
  };
}

export type CompareInput = {
  level: LevelId;
  weeklyHours: number;
  grossMonthly: number;
  contractHours: number;
  largeEmployer: boolean;
  temporaryContract: boolean;
  pensionPct: number;
  absencePct: number;
  sickPayPct: number;
  replaceAbsence: boolean;
  replacementRate: number;
  recruitmentCost: number;
  tenureYears: number;
  vacancyCalendarDays: number;
  coverVacancy: boolean;
  onboardingWeeks: number;
  onboardingProductivity: number;
  idlePct: number;
  publicHolidays: number;
};

export type CompareResult = {
  detachedHourly: number;
  detachedYear: number;
  detachedMonth: number;
  block: Block;
  billedHours: number;
  employed: {
    grossYear: number;
    holiday: number;
    premiumBase: number;
    premiumPct: number;
    premiums: number;
    pension: number;
    wageCost: number;
    sickPaySaving: number;
    contractHoursYear: number;
    leaveHours: number;
    holidayHours: number;
    availableHours: number;
    absenceHours: number;
    idleHours: number;
    productiveHours: number;
    productiveHoursWeek: number;
    replacementCost: number;
    recruitmentAnnual: number;
    vacancyHours: number;
    vacancyAnnual: number;
    onboardingLostHours: number;
    onboardingAnnual: number;
    annualPerPerson: number;
    costPerProductiveHour: number;
    fteNeeded: number;
    annualForSameHours: number;
    transitionAfter3Years: number;
  };
};

export function defaultGrossMonthly(level: LevelId): number {
  if (level === "medior") return 4000;
  if (level === "medior-plus") return 4500;
  return 5000;
}

export function compareEmployment(input: CompareInput): CompareResult {
  const billedHours = Math.max(10, input.weeklyHours);
  const block = tierForHours(billedHours);
  const detachedHourly = levels[input.level].rates[block];
  const contractHours = Math.max(1, input.contractHours);
  const grossYear = Math.max(0, input.grossMonthly) * 12;
  const holiday = grossYear * PREMIA_2026.holidayAllowance;
  const premiumBase = Math.min(grossYear + holiday, PREMIA_2026.maxPremieLoon);
  const awf = input.temporaryContract ? PREMIA_2026.awfHigh : PREMIA_2026.awfLow;
  const aof = input.largeEmployer ? PREMIA_2026.aofHigh : PREMIA_2026.aofLow;
  const premiumPct = awf + aof + PREMIA_2026.wko + PREMIA_2026.zvw + PREMIA_2026.whkAverage;
  const premiums = premiumBase * premiumPct;
  const pension = grossYear * (Math.max(0, input.pensionPct) / 100);
  const wageBeforeSick = grossYear + holiday + premiums + pension;
  const contractHoursYear = contractHours * 52;
  const leaveHours = PREMIA_2026.statutoryLeaveWeeks * contractHours;
  const holidayHours = Math.max(0, input.publicHolidays) * (contractHours / 5);
  const availableHours = Math.max(0, contractHoursYear - leaveHours - holidayHours);
  const absenceHours = availableHours * (Math.max(0, input.absencePct) / 100);
  const afterAbsence = Math.max(0, availableHours - absenceHours);
  const idleHours = afterAbsence * Math.min(0.8, Math.max(0, input.idlePct));
  const productiveHours = Math.max(0, afterAbsence - idleHours);
  const sickFraction = contractHoursYear > 0 ? absenceHours / contractHoursYear : 0;
  const sickPaySaving = (grossYear + holiday) * sickFraction * Math.max(0, 1 - input.sickPayPct / 100);
  const wageCost = wageBeforeSick - sickPaySaving;
  const replacementCost = input.replaceAbsence ? absenceHours * Math.max(0, input.replacementRate) : 0;
  const tenure = Math.max(1, input.tenureYears);
  const recruitmentAnnual = Math.max(0, input.recruitmentCost) / tenure;
  const vacancyWorkdays = Math.max(0, input.vacancyCalendarDays) * (5 / 7);
  const vacancyHours = input.coverVacancy ? vacancyWorkdays * (contractHours / 5) : 0;
  const vacancyAnnual = (vacancyHours * Math.max(0, input.replacementRate)) / tenure;
  const onboardingLostHours =
    Math.max(0, input.onboardingWeeks) * contractHours * Math.max(0, 1 - input.onboardingProductivity);
  const hourOfWage = contractHoursYear > 0 ? wageCost / contractHoursYear : 0;
  const onboardingAnnual = (onboardingLostHours * hourOfWage) / tenure;
  const annualPerPerson = wageCost + replacementCost + recruitmentAnnual + vacancyAnnual + onboardingAnnual;
  const costPerProductiveHour = productiveHours > 0 ? annualPerPerson / productiveHours : Number.POSITIVE_INFINITY;
  const productiveHoursWeek = productiveHours / 52;
  const fteNeeded = productiveHoursWeek > 0 ? billedHours / productiveHoursWeek : Number.POSITIVE_INFINITY;
  const monthlyWageForTransition = (grossYear + holiday) / 12;
  return {
    detachedHourly,
    detachedYear: yearlyCost(billedHours, detachedHourly),
    detachedMonth: monthlyCost(billedHours, detachedHourly),
    block,
    billedHours,
    employed: {
      grossYear,
      holiday,
      premiumBase,
      premiumPct,
      premiums,
      pension,
      wageCost,
      sickPaySaving,
      contractHoursYear,
      leaveHours,
      holidayHours,
      availableHours,
      absenceHours,
      idleHours,
      productiveHours,
      productiveHoursWeek,
      replacementCost,
      recruitmentAnnual,
      vacancyHours,
      vacancyAnnual,
      onboardingLostHours,
      onboardingAnnual,
      annualPerPerson,
      costPerProductiveHour,
      fteNeeded,
      annualForSameHours: annualPerPerson * fteNeeded,
      transitionAfter3Years: monthlyWageForTransition,
    },
  };
}

export const compareSources = [
  {
    title: "Salarisband casemanager verzuim",
    url: "https://www.stavv.nl/casemanager-verzuim/",
    note: "STAVV: medior €3.500–€4.500 en senior €4.500–€5.500 bruto per maand. Het standaard maandloon in de calculator is het midden van die band. Medior+ gebruikt €4.500, de bovenkant van de mediorband. Dat is een aanname.",
  },
  {
    title: "Vakantiebijslag minimaal 8%",
    url: "https://wetten.overheid.nl/BWBR0002638/",
    note: "Wet minimumloon en minimumvakantiebijslag, artikel 15.",
  },
  {
    title: "Wettelijk verlof: viermaal de wekelijkse arbeidsduur",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Burgerlijk Wetboek boek 7, artikel 634. Veel cao’s geven meer. Er is geen landelijke cao voor casemanagers.",
  },
  {
    title: "Loondoorbetaling bij ziekte, minimaal 70%",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Burgerlijk Wetboek boek 7, artikel 629. De calculator staat standaard op 100% doorbetaling in het eerste jaar. Dat is een aanname.",
  },
  {
    title: "Premiepercentages werknemersverzekeringen 2026",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/premiedifferentiatie-ww-lage-en-hoge-ww-premie",
    note: "AWf laag 2,74% en hoog 7,74% (Belastingdienst, 2026). Aof laag 6,27% en hoog 7,63%, opslag Wko 0,50%, werkgeversheffing Zvw 6,10% en maximumpremieloon €79.409 volgens het overzicht van IJK, januari 2026.",
  },
  {
    title: "IJK, meest gebruikte bedragen en percentages 2026",
    url: "https://www.ijk.nl/sites/default/files/media/documenten/2026/01/IJK%20-%20Meest%20gebruikte%20bedragen%20en%20percentages%202026_0.pdf",
    note: "Whk is werkgever-specifiek. De calculator gebruikt het landelijk gemiddelde van 1,52% (WGA en Ziektewet) als aanname, niet uw eigen beschikking.",
  },
  {
    title: "Ziekteverzuim Nederland",
    url: CBS.source,
    note: "Standaard 5,4% (CBS, 2025, totaal). Uw percentage kan afwijken.",
  },
  {
    title: "Interim-uurtarief als vervangingstarief",
    url: "https://recruitmentcenter.nl/kennisbank/interim-casemanager-verzuim-inschakelen/",
    note: "Interim-casemanager €85–€120 per uur. Standaard gebruiken we €102,50, het midden van die band. Aanname.",
  },
  {
    title: "Directe wervingskosten en vacatureduur",
    url: "https://www.ad.nl/economie/openstaande-vacature-kost-duizenden-euros-bijna-helft-van-werkgevers-wil-langere-opzegtermijn~a6c049c5/",
    note: "Intelligence Group, aangehaald door het AD: directe wervingskosten al snel boven €5.000 en vacatures gemiddeld zestig dagen open. De €500 per dag uit dat artikel gebruiken we niet: dat is een brede opportuniteitskost, geen kostprijs van een casemanager.",
  },
  {
    title: "Time to hire, aanvullende context",
    url: "https://recruitingroundtable.nl/recruitment-kengetallen-onderzoek/",
    note: "Recruiting Roundtable noemt voor corporate recruiters een time to hire van gemiddeld 65 dagen (benchmark 2021) en een cost per hire van €3.818. Onze standaard van €5.000 en 60 dagen ligt in die buurt en blijft een aanname.",
  },
  {
    title: "Transitievergoeding",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Burgerlijk Wetboek boek 7, artikel 673: een derde maandsalaris per dienstjaar, met een jaarlijks geïndexeerd maximum. De illustratie telt niet mee in het uurtarief.",
  },
  {
    title: "Krapte op de arbeidsmarkt",
    url: "https://www.uwv.nl/nl/nieuws/werkgevers-leiden-vaker-nieuw-personeel-op-door-aanhoudende-krapte",
    note: "UWV, najaar 2025: 45% van de vacatures is volgens werkgevers moeilijk vervulbaar. Dat is context, geen toeslag in de berekening.",
  },
] as const;

export const savingsSources = [
  {
    title: TNO.sourceLabel,
    url: TNO.source,
    note: "Puntsschatting circa €410 per verzuimdag bij een jaarloon van €36.500: loondoorbetaling €153, vervanging €146, productieverlies €43, arbo €60 en begeleiding €7,50. TNO noemt ook een bandbreedte. Wij indexeren alleen het loongerelateerde deel.",
  },
  {
    title: "CBS StatLine, ziekteverzuim naar bedrijfsgrootte",
    url: CBS.source,
    note: "2025: Nederland 5,4%, 10 tot 100 werknemers 4,7%, 100 of meer werknemers 6,0%.",
  },
  {
    title: "Nationale-Nederlanden Trendrapport 2026",
    url: "https://inkomencollectief.h5mag.com/inkomencollectief/trendrapport_juni_2026/ziekteverzuim_in_cijfers/40560/Nationale_Nederlanden_Trendrapport_2026_Ziekteverzuim_in_Nederland.pdf",
    note: "Gemiddelde verzuimduur 17,3 werkdagen per zieke werknemer in 2025, op basis van CBS, NEA en TNO.",
  },
  {
    title: "TNO Arbobalans 2024",
    url: "https://www.tno.nl/nl/newsroom/2025/06/arbobalans-kosten-werkgerelateerd/",
    note: "Psychisch verzuim duurt gemiddeld ongeveer 63 werkdagen. Werkgerelateerde kosten €8,3 miljard, waarvan €4,9 miljard psychisch.",
  },
  {
    title: "Loondoorbetaling 104 weken",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Burgerlijk Wetboek boek 7, artikel 629: minimaal 70% van het loon, 104 weken.",
  },
  {
    title: "Loonsanctie, maximaal 52 weken extra loon",
    url: "https://www.uwv.nl/nl/ziek/re-integratie/beoordeling-re-integratieverslag",
    note: "UWV: bij onvoldoende re-integratie-inspanningen kan de werkgever na 104 weken nog maximaal 52 weken loon moeten doorbetalen. De factor 1,3 voor werkgeverslasten is een aanname, geen UWV-cijfer.",
  },
] as const;
