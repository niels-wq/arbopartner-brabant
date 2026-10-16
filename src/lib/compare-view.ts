import {
  CASE_HOURS_PER_100,
  CBS,
  CBS_WAGE,
  compareEmployment,
  defaultCompareInput,
  type CompareInput,
  type CompareResult,
} from "./calc.ts";
import { euro, num, pct } from "./format.ts";

export type Demand = {
  employees: number;
  orgAbsencePct: number;
  hoursWeek: number;
  hoursYear: number;
};

export function savingHeadline(result: CompareResult): { positive: boolean; text: string } {
  const amount = euro(Math.abs(result.saving), true);
  if (result.saving > 0) return { positive: true, text: `U bespaart circa ${amount} per jaar` };
  if (result.saving < 0) {
    return { positive: false, text: `In dit scenario is een dienstverband circa ${amount} per jaar lager` };
  }
  return { positive: false, text: "In dit scenario zijn de jaarkosten gelijk" };
}

export function scenarioNote(): string {
  return `Standaardscenario: medior, tien uur per week, tegenover één fulltime contract van veertig uur. Drie risicoposten staan apart in de uitkomst: overnametijd en inwerkperiode, verlies van continuïteit, en een slechte koppeling aan loonwaarde. Het bruto maandloon is afgeleid van het CBS-mediaan uurloon van ${euro(CBS_WAGE.hourly)} (${CBS_WAGE.group}, ${CBS_WAGE.year}, voorlopig). Die groep is breder dan alleen casemanagers verzuim. Zet u de overnameweken, de continuïteitsfactor, de extra verzuimdagen, de sanctiekans en de extra sanctiekans op nul, dan kan een dienstverband in euro's lager uitvallen. De tool laat dat zien.`;
}

function barWidth(value: number, max: number): number {
  if (max <= 0 || value <= 0) return 0;
  return Math.min(100, (value / max) * 100);
}

export function compareReportHtml(input: CompareInput, result: CompareResult, demand?: Demand): string {
  const headline = savingHeadline(result);
  const employed = result.employed;
  const max = Math.max(result.employmentYear, result.detachedYear, 1);
  const directWidth = barWidth(result.directYear, max);
  const riskWidth = barWidth(result.riskYear, max);
  const detachedWidth = barWidth(result.detachedYear, max);
  const gap = Math.abs(result.saving);
  const figureLabel = headline.positive ? "Besparing per jaar" : result.saving < 0 ? "Verschil per jaar" : "Verschil per jaar";
  const demandText = demand
    ? `Vuistregel op deze site: ${CASE_HOURS_PER_100} uur per week per 100 medewerkers bij ${pct(CBS.nl2025)} verzuim, het landelijke CBS-cijfer van 2025. ${num(demand.employees, 0)} medewerkers en ${pct(demand.orgAbsencePct)} verzuim geven ${num(demand.hoursWeek)} uur per week, ${num(demand.hoursYear, 0)} uur per jaar. ${demand.hoursWeek + 0.05 < result.billedHours ? `Het kleinste blok is ${num(result.billedHours, 0)} uur per week. De vergelijking rekent dat blok, niet de lagere vuistregel.` : `De vergelijking rekent ${num(result.billedHours)} uur per week.`}`
    : "";
  const peopleText =
    result.people > 1
      ? ` Voor ${num(result.neededHours, 0)} uur per week zijn ${result.people} mensen in dienst nodig, omdat één persoon na verlof, feestdagen en verzuim ongeveer ${num(employed.productiveHoursWeek)} productieve uren per week levert.`
      : "";
  const qualitative = headline.positive
    ? "Ook dan blijven de andere verschillen staan: geen werkgeversrisico, continuïteit bij ziekte of vakantie, uren die u meeschaalt, en een gesprek op het kantoor in Uden. Wie daarheen komt, blijft in beweging. Dat kan verzuim minder en korter maken. We noemen geen percentage. Wie echt niet kan reizen, spreken we op het bedrijf of online."
    : "Het bedrag valt in dit scenario niet in het voordeel van inhuren uit. Wat blijft: geen loonlijst en geen transitievergoeding voor deze persoon, vervanging als de casemanager zelf uitvalt, direct starten zonder vacature, een andere casemanager als de klik er niet is, en een gesprek op het kantoor in Uden. Wie daarheen komt, blijft in beweging. Dat kan verzuim minder en korter maken, zonder een cijfer. Wie echt niet kan reizen, spreken we op het bedrijf of online. De wijzigingstermijn van de uren staat in de offerte.";
  const row = (line: (typeof result.lines)[number]) =>
    `<tr><th class="py-1 pr-3 align-top font-semibold" scope="row">${line.label}</th><td class="py-1 pr-3 align-top whitespace-nowrap">${euro(line.amount, true)}</td><td class="py-1 align-top text-ink-soft">${line.note}</td></tr>`;
  const personRows = result.lines.filter((line) => line.scope === "person").map(row).join("");
  const orgLines = result.lines.filter((line) => line.scope === "organisation");
  const orgRows = orgLines.map(row).join("");
  const orgList = orgLines
    .map(
      (line, index) =>
        `<li><span class="font-semibold">${index + 1}. ${line.label}.</span> ${euro(line.amount, true)}. ${line.note}</li>`,
    )
    .join("");

  return `
    <p class="text-sm font-semibold uppercase tracking-[0.14em] text-ochre-800">Indicatie, geen offerte</p>
    <p class="mt-2 text-sm font-semibold text-green-950">${figureLabel}</p>
    <p class="ap-save-figure font-serif text-5xl leading-none text-green-950 md:text-6xl" data-euro="${Math.round(gap)}" data-outcome>${euro(gap, true)}</p>
    <p class="mt-2 max-w-xl text-lg">${headline.text}. Exclusief btw.</p>
    ${demandText ? `<p class="mt-3 max-w-xl text-sm">${demandText}</p>` : ""}
    <div class="ap-plot mt-5" role="img" aria-label="In dienst ${euro(result.employmentYear, true)}, waarvan directe kosten ${euro(result.directYear, true)} en risicokosten ${euro(result.riskYear, true)}. Arbopartner ${euro(result.detachedYear, true)}.">
      <div class="ap-plot-col">
        <span class="ap-plot-value">${euro(result.employmentYear, true)}</span>
        <span class="ap-plot-track">
          <span class="ap-plot-bar ap-plot-direct" style="height:${directWidth}%"></span>
          <span class="ap-plot-bar ap-plot-risk" style="height:${riskWidth}%;bottom:${directWidth}%"></span>
        </span>
        <span class="ap-plot-label">In dienst</span>
      </div>
      <div class="ap-plot-col">
        <span class="ap-plot-value">${euro(result.detachedYear, true)}</span>
        <span class="ap-plot-track"><span class="ap-plot-bar ap-plot-hire" style="height:${detachedWidth}%"></span></span>
        <span class="ap-plot-label">Arbopartner</span>
      </div>
    </div>
    <p class="ap-plot-key mt-2 text-sm">
      <span><i class="ap-swatch ap-swatch-direct"></i>Directe kosten</span>
      <span><i class="ap-swatch ap-swatch-risk"></i>Risicokosten</span>
      <span><i class="ap-swatch ap-swatch-hire"></i>Arbopartner</span>
    </p>
    <p class="mt-3 max-w-3xl text-sm">Directe kosten in dienst ${euro(result.directYear, true)}. Risicokosten ${euro(result.riskYear, true)}, waarvan ${euro(result.organisationRisk, true)} over de hele organisatie. Arbopartner is ${euro(result.detachedYear, true)}, zonder die loonlijst.</p>
    <h3 class="mt-4 font-serif text-2xl text-green-950">Drie risicoposten van een interne casemanager</h3>
    <ol class="ap-risk-lines mt-2 max-w-3xl list-none space-y-2 text-sm">${orgList}</ol>
    <p class="mt-4 max-w-3xl">${qualitative}</p>
    <p class="mt-3 max-w-3xl">Bij inhuren betaalt u ${num(result.billedHours, 0)} uur per week × ${euro(result.detachedHourly)} per uur. Dat zijn de uren die u nodig heeft, met een minimum van tien. Bij een dienstverband betaalt u ${result.people === 1 ? "één volledig contract" : `${result.people} volledige contracten`} van ${num(input.contractHours, 0)} uur, ook als u ${num(result.neededHours, 0)} uur nodig heeft. Na wettelijk verlof (${num(employed.leaveHours, 0)} uur), ${num(input.publicHolidays, 0)} feestdagen (${num(employed.holidayHours, 0)} uur) en ${pct(input.absencePct)} verzuim blijft ongeveer ${num(employed.productiveHoursWeek)} productief uur per week over. Daarvan blijven ${num(employed.unusedHoursWeek)} uur onbenut. Die leegloop zit in het salaris, niet als extra regel.${peopleText}</p>
    <p class="mt-3 max-w-3xl text-sm">De opbouw splitst directe kosten en risicokosten. De transitievergoeding betaalt u pas als het contract op uw initiatief eindigt. De loonsanctie is een verwachte waarde, geen voorspelling dat UWV die oplegt. De overnameweken, de continuïteitsfactor, de extra verzuimdagen en de extra sanctiekans zijn aannames. Elk getal is aan te passen, ook naar nul.</p>
    <aside class="mt-4 rounded-3xl bg-sand-100 p-4 text-sm">
      <p class="font-semibold text-green-950">Scenario: een jaar volledige uitval</p>
      <p class="mt-1">Loonkost plus vervanging van alle contracturen: ${euro(employed.longAbsenceYear, true)} per persoon. Dit zit niet in het jaartotaal. Het CBS-percentage bevat lange gevallen al in het gemiddelde. Telt u het er zelf bij, dan vergelijkt u een uitzondering met een gemiddeld jaar.</p>
    </aside>
    <h3 class="mt-6 font-serif text-2xl text-green-950">Opbouw per persoon in dienst</h3>
    <div class="mt-2 max-w-full overflow-x-auto">
      <table class="w-full min-w-[36rem] text-left text-sm">
        <thead><tr class="border-b border-line"><th class="py-1 pr-3" scope="col">Post</th><th class="py-1 pr-3" scope="col">Per jaar</th><th class="py-1" scope="col">Toelichting</th></tr></thead>
        <tbody>${personRows}</tbody>
        <tfoot>
          <tr class="border-t border-line"><th class="py-2 pr-3" scope="row">Totaal per persoon</th><td class="py-2 pr-3 font-semibold">${euro(employed.annualPerPerson, true)}</td><td class="py-2">${result.people} × dit bedrag = ${euro(employed.annualPerPerson * result.people, true)}</td></tr>
        </tfoot>
      </table>
    </div>
    <h3 class="mt-6 font-serif text-2xl text-green-950">Risico over de hele organisatie</h3>
    <p class="mt-2 max-w-3xl text-sm">${num(result.longCases, 1)} dossiers die langer duren dan 42 weken, afgeleid van de UWV-meldingen van 2025 en meeschalend met uw verzuim. Deze bedragen tellen één keer, niet per casemanager.</p>
    <div class="mt-2 max-w-full overflow-x-auto">
      <table class="w-full min-w-[36rem] text-left text-sm">
        <thead><tr class="border-b border-line"><th class="py-1 pr-3" scope="col">Post</th><th class="py-1 pr-3" scope="col">Per jaar</th><th class="py-1" scope="col">Toelichting</th></tr></thead>
        <tbody>${orgRows}</tbody>
        <tfoot>
          <tr class="border-t border-line"><th class="py-2 pr-3" scope="row">Totaal in dienst</th><td class="py-2 pr-3 font-semibold">${euro(result.employmentYear, true)}</td><td class="py-2">Personen plus dit organisatierisico van ${euro(result.organisationRisk, true)}. Daarvan is ${euro(result.directYear, true)} direct en ${euro(result.riskYear, true)} risico.</td></tr>
        </tfoot>
      </table>
    </div>
  `;
}

export function defaultScenario() {
  const input = defaultCompareInput();
  const result = compareEmployment(input);
  return { input, result, headline: savingHeadline(result) };
}
