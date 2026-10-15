import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compareEmployment, dayCost, matchCasemanager, savings } from "../src/lib/calc.ts";
import { pct } from "../src/lib/format.ts";
import { hourlySavingPct, monthlyCost } from "../src/lib/rates.ts";

describe("tarief", () => {
  it("rekent een maandbedrag als uren × tarief × 52 / 12", () => {
    assert.equal(monthlyCost(10, 112.5), 4875);
    assert.equal(monthlyCost(20, 107.5), (20 * 107.5 * 52) / 12);
    assert.equal(monthlyCost(24, 102.5), 10660);
    assert.equal(monthlyCost(24, 125), 13000);
    assert.equal(monthlyCost(20, 115), (20 * 115 * 52) / 12);
    assert.equal(monthlyCost(24, 110), 11440);
    assert.equal(monthlyCost(10, 137.5), (10 * 137.5 * 52) / 12);
    assert.equal(monthlyCost(20, 131.5), (20 * 131.5 * 52) / 12);
  });

  it("zet de besparing op het uurtarief tegenover 10 uur van hetzelfde niveau", () => {
    assert.equal(hourlySavingPct("medior", 10), 0);
    assert.equal(hourlySavingPct("medior", 20), ((112.5 - 107.5) / 112.5) * 100);
    assert.equal(hourlySavingPct("medior", 24), ((112.5 - 102.5) / 112.5) * 100);
    assert.equal(hourlySavingPct("medior-plus", 20), ((120 - 115) / 120) * 100);
    assert.equal(hourlySavingPct("medior-plus", 24), ((120 - 110) / 120) * 100);
    assert.equal(hourlySavingPct("senior", 20), ((137.5 - 131.5) / 137.5) * 100);
    assert.equal(hourlySavingPct("senior", 24), ((137.5 - 125) / 137.5) * 100);
    assert.equal(pct(hourlySavingPct("medior", 20)), "4,4%");
    assert.equal(pct(hourlySavingPct("medior", 24)), "8,9%");
    assert.equal(pct(hourlySavingPct("medior-plus", 20)), "4,2%");
    assert.equal(pct(hourlySavingPct("medior-plus", 24)), "8,3%");
    assert.equal(pct(hourlySavingPct("senior", 20)), "4,4%");
    assert.equal(pct(hourlySavingPct("senior", 24)), "9,1%");
  });
});

describe("match", () => {
  const base = {
    size: "35-75" as const,
    headcount: 50,
    absence: "lt4" as const,
    long: "0-1" as const,
    nature: "fysiek" as const,
    year1: false,
    sanction: false,
    hr: "team" as const,
    sector: false,
  };

  it("kiest medior en basis bij een lage score", () => {
    const result = matchCasemanager(base);
    assert.equal(result.score, 0);
    assert.equal(result.level, "medior");
    assert.equal(result.block, 10);
    assert.equal(result.billedHours, 10);
    assert.equal(result.hourly, 112.5);
    assert.equal(result.monthly, 4875);
  });

  it("forceert senior bij sanctierisico én psychisch verzuim", () => {
    const result = matchCasemanager({
      ...base,
      nature: "psychisch",
      sanction: true,
    });
    assert.equal(result.score, 5);
    assert.equal(result.override, true);
    assert.equal(result.level, "senior");
    assert.equal(result.spoed, true);
  });

  it("stapt een pakket omhoog vanaf score 8", () => {
    const result = matchCasemanager({
      ...base,
      headcount: 120,
      size: "76-200",
      absence: "gt6",
      long: "5+",
      nature: "gemengd",
      hr: "one",
    });
    assert.ok(result.score >= 8);
    assert.equal(result.block, 20);
    assert.equal(result.steppedUp, true);
  });
});

describe("besparing", () => {
  it("houdt arbo en begeleiding vast en indexeert het loondeel", () => {
    assert.equal(dayCost(36500), 409.5);
    const result = savings({
      employees: 100,
      absencePct: 6,
      annualWage: 36500,
      longCases: 2,
      scenarioPoints: 1,
      level: "medior",
      weeklyHours: 10,
    });
    assert.equal(result.costNow, 540540);
    assert.equal(result.grossSaving, 90090);
    assert.equal(result.guidanceCost, 58500);
    assert.equal(result.net, 31590);
    assert.equal(result.sanctionRisk, 94900);
  });
});

describe("vergelijking", () => {
  it("zet detachering naast een productief uur in dienst", () => {
    const result = compareEmployment({
      level: "medior",
      weeklyHours: 10,
      grossMonthly: 4000,
      contractHours: 40,
      largeEmployer: true,
      temporaryContract: false,
      pensionPct: 0,
      absencePct: 5.4,
      sickPayPct: 100,
      replaceAbsence: true,
      replacementRate: 102.5,
      recruitmentCost: 5000,
      tenureYears: 3,
      vacancyCalendarDays: 60,
      coverVacancy: true,
      onboardingWeeks: 4,
      onboardingProductivity: 0.5,
      idlePct: 0.15,
      publicHolidays: 7,
    });
    assert.equal(result.detachedHourly, 112.5);
    assert.equal(result.detachedYear, 58500);
    assert.ok(result.employed.productiveHours > 1400);
    assert.ok(result.employed.productiveHours < 1600);
    assert.ok(result.employed.costPerProductiveHour < result.detachedHourly);
    assert.ok(result.employed.fteNeeded < 0.5);
    assert.equal(Math.round(result.employed.premiumPct * 10000), 1849);
  });
});
