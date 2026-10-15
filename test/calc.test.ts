import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { compareEmployment, dayCost, defaultCompareInput, grossMonthlyFromCbs, matchCasemanager, savings } from "../src/lib/calc.ts";
import { savingHeadline } from "../src/lib/compare-view.ts";
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
  it("betaalt bij tien uur een volledig contract en niet een fractie fte", () => {
    const input = defaultCompareInput();
    assert.equal(input.grossMonthly, grossMonthlyFromCbs(40));
    const result = compareEmployment(input);
    assert.equal(result.detachedHourly, 112.5);
    assert.equal(result.detachedYear, 58500);
    assert.equal(result.billedHours, 10);
    assert.equal(result.people, 1);
    assert.equal(result.employmentYear, result.employed.annualPerPerson);
    assert.ok(result.saving > 50000);
    assert.equal(savingHeadline(result).positive, true);
    assert.match(savingHeadline(result).text, /^U bespaart circa /);
    assert.equal(Math.round(result.employed.premiumPct * 10000), 1849);
    const lineSum = result.lines.reduce((sum, line) => sum + line.amount, 0);
    assert.equal(Math.round(lineSum), Math.round(result.employed.annualPerPerson));
  });

  it("houdt een hoge caseload eerlijk", () => {
    const senior = compareEmployment(defaultCompareInput({ level: "senior", neededHours: 24 }));
    assert.equal(senior.detachedHourly, 125);
    assert.equal(senior.detachedYear, 156000);
    assert.ok(senior.saving < 0);
    assert.equal(savingHeadline(senior).positive, false);
    assert.match(savingHeadline(senior).text, /dienstverband circa/);
    const full = compareEmployment(defaultCompareInput({ neededHours: 40 }));
    assert.equal(full.people, 2);
  });

  it("laat een eindejaarsuitkering en de transitievergoeding de jaarkosten bewegen", () => {
    const base = compareEmployment(defaultCompareInput());
    const withBonus = compareEmployment(defaultCompareInput({ yearEndPct: 6.5 }));
    assert.ok(withBonus.employmentYear > base.employmentYear);
    const withoutTransition = compareEmployment(defaultCompareInput({ includeTransition: false }));
    assert.ok(withoutTransition.employmentYear < base.employmentYear);
    assert.equal(withoutTransition.employed.transitionAnnual, 0);
  });
});
