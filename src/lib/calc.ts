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

export const CBS_WAGE = {
  hourly: 32.8,
  year: 2025,
  provisional: true,
  group: "Specialisten personeels- en loopbaanontwikkeling",
  key: "A000198",
  source: "https://opendata.cbs.nl/statline/#/CBS/nl/dataset/86355NED/table",
  sourceLabel: "CBS StatLine 86355NED, bruto uurloon naar beroep",
} as const;

export const TCO = {
  holidayAllowance: 0.08,
  statutoryLeaveWeeks: 4,
  publicHolidays2026: 6,
  transitionMax: 102_000,
  rnvcYear: 380,
  crovExample: 4290,
  kmRate: 0.25,
} as const;

export function grossMonthlyFromCbs(contractHours: number): number {
  return (CBS_WAGE.hourly * Math.max(0, contractHours) * 52) / 12;
}

export type CompareInput = {
  level: LevelId;
  neededHours: number;
  grossMonthly: number;
  contractHours: number;
  largeEmployer: boolean;
  temporaryContract: boolean;
  whkPct: number;
  pensionPct: number;
  yearEndPct: number;
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
  trainingOnce: number;
  registrationYear: number;
  softwareYear: number;
  leaseYear: number;
  kmPerWeek: number;
  kmRate: number;
  includeTransition: boolean;
  publicHolidays: number;
  nonProductivePct: number;
};

export type CostLine = { label: string; amount: number; note: string };

export type CompareResult = {
  detachedHourly: number;
  detachedYear: number;
  detachedMonth: number;
  block: Block;
  billedHours: number;
  neededHours: number;
  people: number;
  employmentYear: number;
  saving: number;
  lines: CostLine[];
  employed: {
    grossYear: number;
    holiday: number;
    yearEnd: number;
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
    nonProductiveHours: number;
    productiveHours: number;
    productiveHoursWeek: number;
    unusedHoursWeek: number;
    replacementCost: number;
    recruitmentAnnual: number;
    vacancyHours: number;
    vacancyAnnual: number;
    onboardingAnnual: number;
    trainingAnnual: number;
    registrationYear: number;
    workplaceYear: number;
    travelYear: number;
    transitionAnnual: number;
    annualPerPerson: number;
    longAbsenceYear: number;
  };
};

export function defaultGrossMonthly(_level?: LevelId, contractHours = 40): number {
  return grossMonthlyFromCbs(contractHours);
}

export function defaultCompareInput(overrides: Partial<CompareInput> = {}): CompareInput {
  const level = overrides.level ?? "medior";
  const contractHours = overrides.contractHours ?? 40;
  const neededHours = overrides.neededHours ?? 10;
  const base: CompareInput = {
    level,
    neededHours,
    grossMonthly: grossMonthlyFromCbs(contractHours),
    contractHours,
    largeEmployer: true,
    temporaryContract: false,
    whkPct: PREMIA_2026.whkAverage * 100,
    pensionPct: 0,
    yearEndPct: 0,
    absencePct: CBS.nl2025,
    sickPayPct: 100,
    replaceAbsence: true,
    replacementRate: rateFor(level, Math.max(10, neededHours)),
    recruitmentCost: 5000,
    tenureYears: 3,
    vacancyCalendarDays: 60,
    coverVacancy: true,
    onboardingWeeks: 0,
    onboardingProductivity: 0.5,
    trainingOnce: TCO.crovExample,
    registrationYear: TCO.rnvcYear,
    softwareYear: 0,
    leaseYear: 0,
    kmPerWeek: 0,
    kmRate: TCO.kmRate,
    includeTransition: true,
    publicHolidays: TCO.publicHolidays2026,
    nonProductivePct: 0,
  };
  return { ...base, ...overrides };
}

export function compareEmployment(input: CompareInput): CompareResult {
  const neededHours = Math.max(0, input.neededHours);
  const billedHours = Math.max(10, neededHours);
  const block = tierForHours(billedHours);
  const detachedHourly = levels[input.level].rates[block];
  const contractHours = Math.max(1, input.contractHours);
  const grossYear = Math.max(0, input.grossMonthly) * 12;
  const holiday = grossYear * TCO.holidayAllowance;
  const yearEnd = (grossYear + holiday) * (Math.max(0, input.yearEndPct) / 100);
  const premiumBase = Math.min(grossYear + holiday + yearEnd, PREMIA_2026.maxPremieLoon);
  const awf = input.temporaryContract ? PREMIA_2026.awfHigh : PREMIA_2026.awfLow;
  const aof = input.largeEmployer ? PREMIA_2026.aofHigh : PREMIA_2026.aofLow;
  const whk = Math.max(0, input.whkPct) / 100;
  const premiumPct = awf + aof + PREMIA_2026.wko + PREMIA_2026.zvw + whk;
  const premiums = premiumBase * premiumPct;
  const pension = grossYear * (Math.max(0, input.pensionPct) / 100);
  const wageBeforeSick = grossYear + holiday + yearEnd + premiums + pension;
  const contractHoursYear = contractHours * 52;
  const leaveHours = TCO.statutoryLeaveWeeks * contractHours;
  const holidayHours = Math.max(0, input.publicHolidays) * (contractHours / 5);
  const availableHours = Math.max(0, contractHoursYear - leaveHours - holidayHours);
  const absenceHours = availableHours * (Math.max(0, input.absencePct) / 100);
  const afterAbsence = Math.max(0, availableHours - absenceHours);
  const nonProductiveHours = afterAbsence * Math.min(0.8, Math.max(0, input.nonProductivePct) / 100);
  const productiveHours = Math.max(0, afterAbsence - nonProductiveHours);
  const productiveHoursWeek = productiveHours / 52;
  const sickFraction = contractHoursYear > 0 ? absenceHours / contractHoursYear : 0;
  const sickPaySaving =
    (grossYear + holiday + yearEnd) * sickFraction * Math.max(0, 1 - input.sickPayPct / 100);
  const wageCost = wageBeforeSick - sickPaySaving;
  const replacementRate = Math.max(0, input.replacementRate);
  const replacementCost = input.replaceAbsence ? absenceHours * replacementRate : 0;
  const tenure = Math.max(1, input.tenureYears);
  const recruitmentAnnual = Math.max(0, input.recruitmentCost) / tenure;
  const vacancyWorkdays = Math.max(0, input.vacancyCalendarDays) * (5 / 7);
  const vacancyHours = input.coverVacancy ? vacancyWorkdays * (contractHours / 5) : 0;
  const vacancyAnnual = (vacancyHours * replacementRate) / tenure;
  const onboardingLostHours =
    Math.max(0, input.onboardingWeeks) * contractHours * Math.max(0, 1 - input.onboardingProductivity);
  const hourOfWage = contractHoursYear > 0 ? wageCost / contractHoursYear : 0;
  const onboardingAnnual = (onboardingLostHours * hourOfWage) / tenure;
  const trainingAnnual = Math.max(0, input.trainingOnce) / tenure;
  const registrationYear = Math.max(0, input.registrationYear);
  const workplaceYear = Math.max(0, input.softwareYear) + Math.max(0, input.leaseYear);
  const travelYear = Math.max(0, input.kmPerWeek) * Math.max(0, input.kmRate) * 52;
  const monthlyForTransition = (grossYear + holiday + yearEnd) / 12;
  const uncappedAccrual = monthlyForTransition / 3;
  const annualPay = grossYear + holiday + yearEnd;
  const transitionCap = Math.max(TCO.transitionMax, annualPay);
  const transitionAnnual = input.includeTransition ? Math.min(uncappedAccrual, transitionCap / tenure) : 0;
  const annualPerPerson =
    wageCost +
    replacementCost +
    recruitmentAnnual +
    vacancyAnnual +
    onboardingAnnual +
    trainingAnnual +
    registrationYear +
    workplaceYear +
    travelYear +
    transitionAnnual;
  const people =
    neededHours <= 0 ? 0 : productiveHoursWeek > 0 ? Math.max(1, Math.ceil(neededHours / productiveHoursWeek)) : 1;
  const unusedHoursWeek =
    people > 0 ? Math.max(0, people * productiveHoursWeek - neededHours) : 0;
  const longAbsenceYear = wageCost + contractHoursYear * replacementRate;
  const lines: CostLine[] = [
    { label: "Bruto jaarloon", amount: grossYear, note: "12 × het maandloon dat u invult." },
    { label: "Vakantiegeld 8%", amount: holiday, note: "Wettelijk minimum, over het bruto jaarloon." },
    { label: "Eindejaarsuitkering", amount: yearEnd, note: "Percentage over bruto jaarloon plus vakantiegeld. Standaard 0: er is geen landelijke cao." },
    { label: "Werkgeverspremies", amount: premiums, note: "AWf, Aof, Wko, Zvw en Whk, tot het maximumpremieloon." },
    { label: "Pensioen werkgever", amount: pension, note: "Percentage van het bruto jaarloon. Standaard 0: vul uw regeling in." },
    { label: "Lagere loondoorbetaling bij ziekte", amount: -sickPaySaving, note: "Alleen als u minder dan 100% doorbetaalt." },
    { label: "Vervanging tijdens ziekte", amount: replacementCost, note: "Verzuimuren × het vervangingstarief." },
    { label: "Werving, per jaar", amount: recruitmentAnnual, note: "Eenmalige fee gedeeld door de dienstjaren." },
    { label: "Vacature opvangen, per jaar", amount: vacancyAnnual, note: "Ingekochte uren tijdens de vacature, gedeeld door de dienstjaren." },
    { label: "Inwerken, per jaar", amount: onboardingAnnual, note: "Uren onder de volle productiviteit, gedeeld door de dienstjaren." },
    { label: "Opleiding, per jaar", amount: trainingAnnual, note: "Eenmalig cursusbedrag gedeeld door de dienstjaren." },
    { label: "Registratie", amount: registrationYear, note: "Jaarlijkse contributie van het register." },
    { label: "Laptop en software", amount: Math.max(0, input.softwareYear), note: "Bedrag dat u zelf invult. Er is geen landelijke prijs." },
    { label: "Lease of auto", amount: Math.max(0, input.leaseYear), note: "Leasebudget dat u zelf invult. Er is geen landelijke prijs." },
    { label: "Reiskosten", amount: travelYear, note: "Kilometers per week × tarief × 52." },
    { label: "Opbouw transitievergoeding", amount: transitionAnnual, note: "Een derde maandsalaris per dienstjaar. U betaalt dit pas als het contract op uw initiatief eindigt." },
  ];
  return {
    detachedHourly,
    detachedYear: yearlyCost(billedHours, detachedHourly),
    detachedMonth: monthlyCost(billedHours, detachedHourly),
    block,
    billedHours,
    neededHours,
    people,
    employmentYear: annualPerPerson * people,
    saving: annualPerPerson * people - yearlyCost(billedHours, detachedHourly),
    lines,
    employed: {
      grossYear,
      holiday,
      yearEnd,
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
      nonProductiveHours,
      productiveHours,
      productiveHoursWeek,
      unusedHoursWeek,
      replacementCost,
      recruitmentAnnual,
      vacancyHours,
      vacancyAnnual,
      onboardingAnnual,
      trainingAnnual,
      registrationYear,
      workplaceYear,
      travelYear,
      transitionAnnual,
      annualPerPerson,
      longAbsenceYear,
    },
  };
}

export const compareSources = [
  {
    title: "CBS, bruto uurloon naar beroep",
    url: CBS_WAGE.source,
    note: "StatLine 86355NED, 2025 voorlopig. Mediaan €32,80 voor beroepsgroep 0415 Specialisten personeels- en loopbaanontwikkeling (sleutel A000198). Die groep is breder dan casemanagers verzuim: ook HR-adviseurs en arbeidsdeskundigen. Het uurloon is exclusief vakantiegeld, eindejaarsuitkering en verlofuren. Het standaard maandloon is uurloon × contracturen × 52 / 12. Dat is een afleiding, geen CBS-maandloon.",
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
    title: "Feestdagen op een werkdag in 2026",
    url: "https://www.rijksoverheid.nl/themas/werk/arbeidsovereenkomst-en-cao/vraag-en-antwoord/arbeidsovereenkomst-en-cao/officiele-feestdagen",
    note: "Standaard 6: 1 januari, tweede paasdag (6 april), Koningsdag (27 april), Hemelvaart (14 mei), tweede pinksterdag (25 mei) en eerste kerstdag (25 december). Tweede kerstdag valt in 2026 op zaterdag. Goede Vrijdag en 5 mei zijn niet overal vrij. Het aantal is aanpasbaar.",
  },
  {
    title: "Eindejaarsuitkering, standaard 0",
    url: "https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao",
    note: "Een eindejaarsuitkering is geen wettelijk percentage. Die staat in een cao of in de arbeidsovereenkomst. Standaard 0. Vul het percentage in dat bij u geldt, gerekend over bruto jaarloon plus vakantiegeld.",
  },
  {
    title: "Loondoorbetaling bij ziekte, minimaal 70%",
    url: "https://wetten.overheid.nl/BWBR0005290/",
    note: "Burgerlijk Wetboek boek 7, artikel 629. De tool staat standaard op 100% doorbetaling. Dat is een aanname: veel werkgevers betalen in het eerste jaar meer dan het wettelijk minimum.",
  },
  {
    title: "Premiepercentages werknemersverzekeringen 2026",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/premiedifferentiatie-ww-lage-en-hoge-ww-premie",
    note: "AWf laag 2,74% en hoog 7,74%. Aof laag 6,27% en hoog 7,63%, Wko 0,50%, werkgeversheffing Zvw 6,10% en maximumpremieloon €79.409 volgens IJK, januari 2026. De premiegrondslag is het loon tot dat maximum, inclusief vakantiegeld en de ingevulde eindejaarsuitkering.",
  },
  {
    title: "IJK, meest gebruikte bedragen en percentages 2026",
    url: "https://www.ijk.nl/sites/default/files/media/documenten/2026/01/IJK%20-%20Meest%20gebruikte%20bedragen%20en%20percentages%202026_0.pdf",
    note: "Whk is werkgever-specifiek. Standaard is het landelijk gemiddelde van 1,52%, niet uw eigen beschikking. Kleine werkgever: premieloonsom tot €1.082.500 (Aof laag). Middelgroot loopt tot €4.330.000. De tool kent alleen de knop groot of niet-groot, omdat de middelgrote mix per werkgever verschilt.",
  },
  {
    title: "Ziekteverzuim Nederland",
    url: CBS.source,
    note: "Standaard 5,4% (CBS, 2025, totaal). Dat gemiddelde bevat ook lange verzuimgevallen. Een extra jaar volledige uitval telt daarom niet nog eens mee in het jaartotaal. De tool toont dat scenario ernaast.",
  },
  {
    title: "Vervangingstarief",
    url: "https://recruitmentcenter.nl/kennisbank/interim-casemanager-verzuim-inschakelen/",
    note: "Standaard is ons eigen uurtarief voor het gekozen niveau en de benodigde uren. Recruitmentcenter noemt interimtarieven van €85 tot €120 als context. Dat midden gebruiken we niet als standaard.",
  },
  {
    title: "Directe wervingskosten en vacatureduur",
    url: "https://www.ad.nl/economie/openstaande-vacature-kost-duizenden-euros-bijna-helft-van-werkgevers-wil-langere-opzegtermijn~a6c049c5/",
    note: "Intelligence Group, aangehaald door het AD: directe wervingskosten al snel boven €5.000 en vacatures gemiddeld zestig dagen open. De €500 per dag uit dat artikel gebruiken we niet: dat is een brede opportuniteitskost, geen kostprijs van een casemanager. We schrijven het bedrag af over de ingevulde dienstjaren, standaard drie.",
  },
  {
    title: "Time to hire, aanvullende context",
    url: "https://recruitingroundtable.nl/recruitment-kengetallen-onderzoek/",
    note: "Recruiting Roundtable noemt voor corporate recruiters een time to hire van gemiddeld 65 dagen (benchmark 2021) en een cost per hire van €3.818. Onze standaard van €5.000 en 60 dagen ligt in die buurt.",
  },
  {
    title: "Opleiding casemanager, één aanbieder",
    url: "https://cs-opleidingen.nl/opleidingen/casemanager-regie-op-verzuim-crov",
    note: "CS Opleidingen, Casemanager Regie op Verzuim (CROV): zakelijke lijstprijs €4.290 exclusief btw. Dat is één aanbieder, geen marktgemiddelde. Afgeschreven over de dienstjaren. Inwerktijd staat standaard op nul weken: er is geen landelijk cijfer.",
  },
  {
    title: "Registratie RNVC 2026",
    url: "https://rnvc.nl/faq/",
    note: "Contributie Register Netwerk Verzuim Coördinatie €380 per jaar in 2026. Aanpasbaar, want niet elke casemanager staat in dit register.",
  },
  {
    title: "Laptop, software en lease",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/werkkostenregeling",
    note: "Een noodzakelijke computer kan onder een gerichte vrijstelling van de werkkostenregeling vallen. Er is geen landelijke prijs voor laptop, software of een leaseauto. Standaard €0. Vul uw bedrag in.",
  },
  {
    title: "Onbelaste kilometervergoeding 2026",
    url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/berichten/nieuws/verhoging-onbelaste-kilometervergoeding-hoe-verwerkt-u-dit-in-de-loonaangifte",
    note: "De onbelaste kilometervergoeding is €0,25 per kilometer, met terugwerkende kracht vanaf 1 januari 2026. Standaard 0 kilometer per week: niet elke casemanager declareert woon-werkverkeer.",
  },
  {
    title: "Transitievergoeding",
    url: "https://www.rijksoverheid.nl/themas/werk/ontslag/vraag-en-antwoord/ontslag/hoe-hoog-is-de-transitievergoeding-als-ik-word-ontslagen",
    note: "Een derde maandsalaris per dienstjaar (BW 7:673). Per 1 januari 2026 is het maximum €102.000 bruto, of een bruto jaarsalaris als dat hoger is. De tool telt de jaarlijkse opbouw mee. U betaalt de vergoeding pas als het contract op uw initiatief eindigt. De knop staat standaard aan en is uit te zetten.",
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
