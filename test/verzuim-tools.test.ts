import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { validate } from "../server/forms.mjs";
import {
  addDays,
  buildTimeline,
  dateInRange,
  daysBetween,
  easterSunday,
  endOfSicknessWeek,
  firstWorkingDayAfter,
  formatDutch,
  formatIso,
  icsPhysicalLines,
  isUwvClosed,
  kernboodschap,
  koningsdag,
  parseIsoDate,
  scanItems,
  scoreScan,
  startOfSicknessWeek,
  timelineMilestones,
} from "../src/lib/verzuim-tools.ts";

const day = (value: string) => {
  const date = parseIsoDate(value);
  assert.ok(date, value);
  return date;
};

test("ziekteweken tellen vanaf de eerste ziektedag", () => {
  const start = day("2025-01-06");
  assert.equal(formatIso(endOfSicknessWeek(start, 6)), "2025-02-16");
  assert.equal(formatIso(endOfSicknessWeek(start, 8)), "2025-03-02");
  assert.equal(formatIso(endOfSicknessWeek(start, 42)), "2025-10-26");
  assert.equal(formatIso(firstWorkingDayAfter(endOfSicknessWeek(start, 42))), "2025-10-27");
  assert.equal(formatIso(endOfSicknessWeek(start, 52)), "2026-01-04");
  assert.equal(formatIso(startOfSicknessWeek(start, 88)), "2026-09-07");
  assert.equal(formatIso(endOfSicknessWeek(start, 88)), "2026-09-13");
  assert.equal(formatIso(endOfSicknessWeek(start, 91)), "2026-10-04");
  assert.equal(formatIso(endOfSicknessWeek(start, 93)), "2026-10-18");
  assert.equal(formatIso(endOfSicknessWeek(start, 104)), "2027-01-03");
  assert.match(formatDutch(endOfSicknessWeek(start, 6)), /2025/);
});

test("UWV is dicht op feestdagen en de 42e-weeksmelding schuift door", () => {
  assert.equal(formatIso(easterSunday(2024)), "2024-03-31");
  assert.equal(formatIso(easterSunday(2025)), "2025-04-20");
  assert.equal(formatIso(easterSunday(2026)), "2026-04-05");
  assert.equal(formatIso(koningsdag(2025)), "2025-04-26");
  assert.equal(isUwvClosed(day("2025-04-26")), true);
  assert.equal(isUwvClosed(day("2025-04-27")), false);
  assert.equal(formatIso(firstWorkingDayAfter(day("2025-04-25"))), "2025-04-28");
  assert.equal(formatIso(addDays(easterSunday(2025), 39)), "2025-05-29");
  assert.equal(isUwvClosed(day("2025-05-29")), true);
  assert.equal(formatIso(firstWorkingDayAfter(day("2025-05-28"))), "2025-05-30");
  assert.equal(formatIso(firstWorkingDayAfter(day("2025-12-24"))), "2025-12-29");
  assert.equal(parseIsoDate("2025-02-31"), null);
  assert.equal(dateInRange(day("1980-01-01"), day("2026-10-21")), "Kies een eerste ziektedag tussen 1990 en drie jaar vooruit.");
});

test("de tijdlijn zet week 6 tot 104 en een agenda met herinnering", () => {
  const start = day("2025-01-06");
  const today = day("2025-01-01");
  const result = buildTimeline(start, today, new Date(Date.UTC(2025, 0, 1, 8, 0, 0)));
  assert.deepEqual(result.milestones.map((item) => item.weeks), [6, 8, 42, 52, 88, 91, 93, 104]);
  assert.equal(result.milestones.find((item) => item.id === "melding42")?.label.includes("27 oktober 2025"), true);
  assert.equal(result.fileName, "verzuim-tijdlijn-2025-01-06.ics");
  assert.equal((result.ics.match(/BEGIN:VEVENT/g) ?? []).length, 8);
  assert.match(result.ics, /DTSTART;VALUE=DATE:20251027/);
  assert.match(result.ics, /BEGIN:VALARM/);
  assert.match(result.ics, /TRIGGER:-P3D/);
  assert.match(result.ics, /\\,/);
  const encoder = new TextEncoder();
  for (const line of icsPhysicalLines(result.ics)) {
    assert.ok(encoder.encode(line).length <= 75, line);
  }
  const past = buildTimeline(start, day("2030-01-01"));
  assert.equal(past.ics.includes("BEGIN:VALARM"), false);
  assert.equal(past.milestones.every((item) => item.status === "verstreken"), true);
  const soon = addDays(endOfSicknessWeek(start, 6), -2);
  const near = buildTimeline(start, soon);
  const analyse = near.ics.split("BEGIN:VEVENT").find((block) => block.includes("probleemanalyse-"));
  assert.ok(analyse);
  assert.match(analyse, /TRIGGER:-P1D/);
  assert.equal(result.report.includes("geen juridisch advies"), true);
  assert.ok(result.report.length < 8000);
});

test("de risicoscan houdt loonsanctie en de 42e-weeksmelding uit elkaar", () => {
  assert.equal(scanItems.length, 10);
  assert.equal(timelineMilestones.length, 8);
  const allYes = Object.fromEntries(scanItems.map((item) => [item.id, "ja"]));
  assert.equal(scoreScan(allYes).level, "laag");
  assert.equal(scoreScan({ ...allYes, plan: "deels" }).level, "laag");
  assert.equal(scoreScan({ ...allYes, plan: "deels", analyse: "deels" }).level, "gemiddeld");
  assert.equal(scoreScan({ ...allYes, plan: "nee" }).level, "gemiddeld");
  assert.equal(scoreScan({ ...allYes, plan: "nee", analyse: "nee", verslag: "nee" }).level, "hoog");
  const admin = scoreScan({ ...allYes, melding: "nee" });
  assert.equal(admin.level, "laag");
  assert.equal(admin.points, 0);
  assert.match(admin.melding.advice, /€ 455/);
  const planAdvice = admin.items.find((item) => item.id === "plan")?.advice ?? "";
  assert.equal(admin.report.includes(planAdvice), true);
  assert.match(kernboodschap, /geen onderzoek/);
  assert.match(kernboodschap, /52 weken/);
  for (const item of scanItems) {
    for (const answer of ["ja", "deels", "nee"] as const) {
      assert.ok(item.advice[answer].length > 40, `${item.id} ${answer}`);
    }
  }
  const worst = scoreScan(Object.fromEntries(scanItems.map((item) => [item.id, "nee"])));
  assert.equal(worst.level, "hoog");
  assert.ok(worst.report.length < 8000);
  assert.throws(() => scoreScan({}), /Antwoord ontbreekt/);
  assert.equal(daysBetween(day("2025-01-06"), day("2025-01-08")), 2);
});

test("de formulieren vragen naam en e-mail, telefoon niet", () => {
  const base = { naam: "An de Vries", email: "an@example.com", toestemming: "ja", rapport: "Het verslag." };
  assert.deepEqual(validate("risicoscan", base), []);
  assert.deepEqual(validate("tijdlijn", base), []);
  assert.deepEqual(validate("risicoscan", { ...base, telefoon: "085-0870307" }), []);
  assert.ok(validate("risicoscan", { ...base, naam: "" }).some((error) => /naam/.test(error)));
  assert.ok(validate("tijdlijn", { ...base, email: "geen-adres" }).some((error) => /e-mailadres/.test(error)));
  assert.ok(validate("risicoscan", { ...base, toestemming: "" }).length > 0);
  assert.equal(validate("risicoscan", base).some((error) => /medewerkers/.test(error)), false);
});

test("de pagina's staan in de navigatie en bellen alleen het vaste nummer", () => {
  const files = [
    "src/pages/loonsanctie-risicoscan.astro",
    "src/pages/verzuim-tijdlijn.astro",
    "src/components/PlanOfOfferte.astro",
    "src/components/Header.astro",
    "src/components/Footer.astro",
    "src/pages/index.astro",
    "src/pages/tools/index.astro",
  ];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /tel:\+316|tel:06|tel:\$\{site\.parent\.whatsapp/);
  }
  const scan = readFileSync("src/pages/loonsanctie-risicoscan.astro", "utf8");
  const timeline = readFileSync("src/pages/verzuim-tijdlijn.astro", "utf8");
  assert.match(scan, /faqLd/);
  assert.match(timeline, /faqLd/);
  assert.match(scan, /HowTo/);
  assert.match(timeline, /HowTo/);
  assert.match(scan, /PlanOfOfferte/);
  assert.match(timeline, /\/api\/tijdlijn/);
  assert.match(scan, /\/api\/risicoscan/);
  assert.match(readFileSync("src/lib/verzuim-tools.ts", "utf8"), /geen onderzoek/);
  assert.doesNotMatch(readFileSync("src/lib/verzuim-tools.ts", "utf8"), /poortwachter/i);
  assert.match(readFileSync("src/components/Header.astro", "utf8"), /\/loonsanctie-risicoscan/);
  assert.match(readFileSync("src/pages/index.astro", "utf8"), /\/verzuim-tijdlijn/);
  assert.match(readFileSync("src/pages/spoedhulp.astro", "utf8"), /\/loonsanctie-risicoscan/);
});
