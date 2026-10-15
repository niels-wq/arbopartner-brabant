export const levels = {
  medior: {
    id: "medior",
    label: "Medior",
    short: "Medior",
    summary:
      "Een ervaren casemanager voor vooral fysiek en gemengd verzuim, met een HR-afdeling of een duidelijke interne eigenaar van de dossiers.",
    rates: { 10: 112.5, 20: 107.5, 24: 102.5 },
  },
  "medior-plus": {
    id: "medior-plus",
    label: "Medior+",
    short: "Medior+",
    summary:
      "Een casemanager met CROV of vijf jaar of meer ervaring, voor meer langdurige dossiers of een mix van fysieke en psychische klachten.",
    rates: { 10: 120, 20: 115, 24: 110 },
  },
  senior: {
    id: "senior",
    label: "Senior met specialisatie",
    short: "Senior",
    summary:
      "Een senior voor psychisch verzuim, conflict, een arbeidsrechtelijke component of een dossier dat richting een WIA-beoordeling gaat.",
    rates: { 10: 137.5, 20: 131.5, 24: 125 },
  },
} as const;

export type LevelId = keyof typeof levels;
export type Block = 10 | 20 | 24;

export const blocks = {
  10: {
    id: "basis",
    hours: 10 as Block,
    name: "Basis",
    summary: "Een vast gezicht, tien uur per week, voor de lopende dossiers.",
  },
  20: {
    id: "premium",
    hours: 20 as Block,
    name: "Premium",
    summary: "Twintig uur per week, met kwartaalrapportage en in het eerste jaar een verzuimanalyse.",
  },
  24: {
    id: "pro",
    hours: 24 as Block,
    name: "Pro",
    summary: "Vanaf 24 uur per week. Vanaf 30 uur werken twee casemanagers op uw dossiers.",
  },
} as const;

export const verzuimanalysePrijs = 995;

export function tierForHours(weeklyHours: number): Block {
  if (weeklyHours >= 24) return 24;
  if (weeklyHours >= 15) return 20;
  return 10;
}

export function rateFor(level: LevelId, weeklyHours: number): number {
  const block = tierForHours(Math.max(10, weeklyHours));
  return levels[level].rates[block];
}

export function yearlyCost(weeklyHours: number, hourly: number): number {
  return weeklyHours * hourly * 52;
}

export function monthlyCost(weeklyHours: number, hourly: number): number {
  return yearlyCost(weeklyHours, hourly) / 12;
}

export function packageBlock(slug: "basis" | "premium" | "pro"): Block {
  if (slug === "basis") return 10;
  if (slug === "premium") return 20;
  return 24;
}
