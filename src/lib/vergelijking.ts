import { euro } from "./format.ts";
import { levels, type LevelId } from "./rates.ts";

export const PEILDATUM_ISO = "2026-11-28";
export const PEILDATUM_TEKST = "28 november 2026";

export type DienstId = "arbodienstverlening" | "casemanagement" | "verzuimsysteem";
export type UurBlok = 10 | 20 | 24;
export type PakketWeergave = "abonnement" | "verrichtingen" | "alles";
export type ContractWeergave = "jaar" | "maand" | "alles";

export type Bron = {
  url: string;
  titel: string;
  geraadpleegd: string;
};

export type Prijs = {
  label: string;
  bedrag: number;
  eenheid: string;
  btw: string;
  tariefjaar: string;
  bron: string;
};

export type AanbiederInzet = {
  id: string;
  prijs_status: string;
  prijs_tekst: string | null;
  prijzen: Prijs[];
};

export type BandBasis = { aanbieder_id: string; waarde: number; bron: string };

export type Band = {
  id: string;
  eenheid: string;
  laag: number | null;
  midden: number | null;
  hoog: number | null;
  n: number | null;
  karakter: string;
  basis: BandBasis[];
};

export type Certificaat = { naam: string; status: string; bron?: string | null };

export type Profiel = {
  naam: string;
  website: string | null;
  landelijk?: { waarde?: string; toelichting?: string; bron?: string | null } | null;
  grootte?: { tekst?: string; bron?: string | null } | null;
  certificeringen?: Certificaat[];
};

export type Interventie = {
  id: DienstId;
  naam: string;
  prijsbasis: string;
  banden: Band[];
  aanbieders: AanbiederInzet[];
};

export type Vestiging = { aanbieder_id: string; naam: string; aantal: number };

export type MarktData = {
  peildatum: string;
  peildatum_tekst: string;
  bronvermelding: string;
  btw_regel: string;
  sbca_bron: string;
  sbca_toelichting: string;
  sbca_dochtervestigingen: Vestiging[];
  interventies: Interventie[];
  aanbieders: Record<string, Profiel>;
  bronnen: Record<string, Bron>;
};

export type VergelijkInvoer = {
  dienst: DienstId;
  medewerkers: number | null;
  verzuimPct: number | null;
  verzuimOngeldig: boolean;
  uren: UurBlok | null;
  pakket: PakketWeergave;
  contract: ContractWeergave;
  alleenOpenbaar: boolean;
  alleenSbca: boolean;
  alleenLandelijk: boolean;
  niveau: LevelId;
};

const DIENSTEN: DienstId[] = ["arbodienstverlening", "casemanagement", "verzuimsysteem"];
const UREN: UurBlok[] = [10, 20, 24];
const MAANDEN = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const KOP: Record<DienstId, { titel: string; tekst: string }> = {
  arbodienstverlening: {
    titel: "Losse arbodienstverlening",
    tekst: "Openbare abonnementen en verrichtingen. Een abonnement is een bedrag per medewerker. Een uurtarief is een verrichting. Die twee tellen we niet bij elkaar op.",
  },
  casemanagement: {
    titel: "Casemanagement",
    tekst: "Openbare uurtarieven voor verzuimbegeleiding, naast het uurtarief op deze site.",
  },
  verzuimsysteem: {
    titel: "Verzuimsysteem",
    tekst: "Openbare tarieven van systemen voor ziekmeldingen, registratie en dossiers. Hebt u er geen, dan leveren we arbeid.ai bij de begeleiding.",
  },
};

export const standaardInvoer: VergelijkInvoer = {
  dienst: "casemanagement",
  medewerkers: 80,
  verzuimPct: null,
  verzuimOngeldig: false,
  uren: 10,
  pakket: "alles",
  contract: "alles",
  alleenOpenbaar: false,
  alleenSbca: false,
  alleenLandelijk: false,
  niveau: "medior",
};

export function dienstTitel(dienst: DienstId): string {
  return KOP[dienst].titel;
}

export function disclaimerTekst(): string {
  return `Peildatum ${PEILDATUM_TEKST}. De gegevens zijn indicatief en komen uit openbare bronnen. Per prijs staat de bron en de datum van raadpleging. Prijzen kunnen afwijken van de actuele tarieven en zijn geen offerte. De getoonde bandbreedte is een steekproef van openbaar gepubliceerde prijzen en geen landelijk marktgemiddelde. Prijs niet openbaar betekent dat de aanbieder op de geraadpleegde pagina's geen prijs noemt. Bedragen zijn exclusief btw, tenzij anders vermeld.`;
}

export function vergelijkFaqs(): { q: string; a: string }[] {
  const basis = euro(levels.medior.rates[10]);
  return [
    {
      q: "Waar komen de bedragen vandaan?",
      a: `Uit openbare pagina's en prijslijsten, geraadpleegd op ${PEILDATUM_TEKST}. Bij elk bedrag staat de bron. Ontbreekt een openbare prijs, dan staat er prijs niet openbaar. Er is geen bedrag geschat.`,
    },
    {
      q: "Wat betekent prijs niet openbaar?",
      a: "De aanbieder noemt op de geraadpleegde pagina's geen prijs. De vergelijking vult dat niet aan.",
    },
    {
      q: "Wat is het tarief van Arbopartner Brabant?",
      a: `Het basistarief voor casemanagement is ${basis} per uur exclusief btw, voor een medior bij tien uur per week. De andere blokken staan op de tarievenpagina. Een abonnement per medewerker en een tarief voor arbeid.ai publiceren we niet.`,
    },
    {
      q: "Rekent de vergelijking met mijn verzuimpercentage?",
      a: "Nee. Het percentage gaat mee in de offerte. Een eurobedrag per procentpunt staat niet in de openbare tarieven, en dat verzinnen we niet. Dagkosten kunt u apart bekijken in de verzuimkostencalculator.",
    },
    {
      q: "Hoe vraag ik een offerte aan?",
      a: "Met de knop Vraag een vrijblijvende offerte aan, onder de vergelijking. U vinkt toestemming aan. De aanvraag is nog geen contract. Reactie en offerte binnen 24 uur.",
    },
    {
      q: "Wat als ik geen verzuimsysteem heb?",
      a: "Dan leveren we arbeid.ai bij de begeleiding. Het tarief daarvan is niet openbaar. Op de pagina arbeid.ai staat wat het systeem doet.",
    },
  ];
}

export function controleerMarkt(data: MarktData): string[] {
  const fouten: string[] = [];
  if (data.peildatum !== PEILDATUM_ISO) fouten.push("peildatum");
  if (data.interventies.length !== 3) fouten.push("aantal diensten");
  const gezien = new Set<string>();
  for (const iv of data.interventies) {
    if (!DIENSTEN.includes(iv.id)) fouten.push(`dienst ${iv.id}`);
    for (const inzet of iv.aanbieders) {
      if (inzet.id === "bm" || inzet.id === "mv" || inzet.id === "wkk") fouten.push(`eigen groep ${inzet.id}`);
      gezien.add(inzet.id);
      if (!inzet.prijzen.length && inzet.prijs_tekst !== "prijs niet openbaar") fouten.push(`tekst ${inzet.id}`);
      for (const prijs of inzet.prijzen) {
        if (!Number.isFinite(prijs.bedrag)) fouten.push(`bedrag ${inzet.id}`);
        if (!bronUrl(data, prijs.bron)) fouten.push(`bron ${inzet.id} ${prijs.label}`);
      }
    }
    for (const band of iv.banden) {
      for (const punt of band.basis) {
        if (!bronUrl(data, punt.bron)) fouten.push(`bandbron ${punt.aanbieder_id}`);
        if (punt.aanbieder_id === "bm" || punt.aanbieder_id === "mv" || punt.aanbieder_id === "wkk") {
          fouten.push(`band eigen ${punt.aanbieder_id}`);
        }
      }
    }
  }
  for (const naam of ["ArboNed", "Arbo Unie", "Zorg van de Zaak", "Perspectief", "HumanCapitalCare"]) {
    if (![...gezien].some((id) => data.aanbieders[id]?.naam.includes(naam.replace(" Groep", "")))) {
      fouten.push(`partij ${naam}`);
    }
  }
  return fouten;
}

export function leesInvoer(formulier: FormData): VergelijkInvoer {
  const dienstRaw = String(formulier.get("dienst") || "");
  const dienst = DIENSTEN.includes(dienstRaw as DienstId) ? (dienstRaw as DienstId) : "casemanagement";
  const urenRaw = leesGeheel(formulier.get("uren"), 10, 24);
  const uren = urenRaw === 10 || urenRaw === 20 || urenRaw === 24 ? urenRaw : null;
  const pakketRaw = String(formulier.get("pakketweergave") || "alles");
  const pakket: PakketWeergave = pakketRaw === "abonnement" || pakketRaw === "verrichtingen" ? pakketRaw : "alles";
  const contractRaw = String(formulier.get("contract") || "alles");
  const contract: ContractWeergave = contractRaw === "jaar" || contractRaw === "maand" ? contractRaw : "alles";
  const verzuim = leesDecimaal(formulier.get("verzuim"), 0, 40);
  return {
    dienst,
    medewerkers: leesGeheel(formulier.get("medewerkers"), 35, 500),
    verzuimPct: verzuim.waarde,
    verzuimOngeldig: verzuim.ongeldig,
    uren,
    pakket,
    contract,
    alleenOpenbaar: formulier.get("alleenOpenbaar") === "ja",
    alleenSbca: formulier.get("alleenSbca") === "ja",
    alleenLandelijk: formulier.get("alleenLandelijk") === "ja",
    niveau: niveauVan(String(formulier.get("niveau") || "")),
  };
}

export function offerteSamenvatting(invoer: VergelijkInvoer): string {
  const regels = [
    `Vergelijking op arbopartnerbrabant.nl, peildatum ${PEILDATUM_TEKST}.`,
    `Dienst: ${dienstTitel(invoer.dienst)}.`,
    invoer.medewerkers != null
      ? `Medewerkers: ${invoer.medewerkers}.`
      : "Medewerkers: niet ingevuld binnen 35 tot 500.",
    invoer.verzuimPct != null
      ? `Verzuimpercentage: ${pctTekst(invoer.verzuimPct)}%. Daar is geen eurobedrag uitgerekend.`
      : "Verzuimpercentage: niet ingevuld. Daar is geen eurobedrag uitgerekend.",
  ];
  if (invoer.dienst === "casemanagement" && invoer.uren) {
    regels.push(`Uren per week: ${invoer.uren}. Niveau: ${levels[invoer.niveau].label}.`);
  }
  if (invoer.dienst === "arbodienstverlening") regels.push(`Weergave: ${invoer.pakket}.`);
  if (invoer.dienst === "verzuimsysteem") regels.push(`Contractweergave: ${invoer.contract}.`);
  regels.push("Indicatie, geen offerte.");
  return regels.join(" ");
}

export function jaarTotaal(prijs: Prijs, invoer: VergelijkInvoer, dienst: DienstId): number | null {
  const soort = eenheidSoort(prijs.eenheid);
  if ((soort === "jaar-mw" || soort === "maand-mw") && invoer.medewerkers == null) return null;
  if (soort === "jaar-mw" && invoer.medewerkers != null) return maal(prijs.bedrag, invoer.medewerkers);
  if (soort === "maand-mw" && invoer.medewerkers != null) return maal(maal(prijs.bedrag, 12), invoer.medewerkers);
  if (soort === "uur" && dienst === "casemanagement" && invoer.uren != null) {
    return maal(maal(prijs.bedrag, invoer.uren), 52);
  }
  return null;
}

export function renderResultaat(data: MarktData, invoer: VergelijkInvoer): string {
  const iv = data.interventies.find((item) => item.id === invoer.dienst) ?? data.interventies[0];
  if (!iv) return "";
  const kop = KOP[iv.id];
  const lijst = sorteer(
    iv.aanbieders.filter((inzet) => past(inzet, data, invoer)),
    data,
    invoer,
    iv.id,
  );
  const kaarten = lijst.length
    ? lijst.map((inzet) => kaartHtml(inzet, data, invoer, iv.id)).join("")
    : `<p>Geen aanbieders met deze filters.</p>`;
  return `<div class="space-y-8">
    <section>
      <h2 class="font-serif text-3xl text-green-950">${esc(kop.titel)}</h2>
      <p class="mt-3 max-w-3xl">${esc(kop.tekst)}</p>
      <p class="mt-2 text-sm text-ink-soft">Prijsbasis in de bronnen: ${esc(iv.prijsbasis)}</p>
      ${verzuimHtml(invoer)}
      ${medewerkersZin(invoer)}
    </section>
    ${bandenHtml(iv, data)}
    <section class="vgl-ons">
      <h2 class="font-serif text-3xl text-green-950">Ons tarief</h2>
      ${eigenHtml(invoer)}
    </section>
    <section class="vgl-markt">
      <h2 class="font-serif text-3xl text-green-950">Openbare tarieven</h2>
      <div class="mt-4 grid gap-4 md:grid-cols-2">${kaarten}</div>
    </section>
  </div>`;
}

function medewerkersZin(invoer: VergelijkInvoer): string {
  if (invoer.medewerkers == null) {
    return `<p class="vgl-kop mt-2 text-sm">Vul een aantal medewerkers tussen 35 en 500 in. Zonder dat aantal rekenen we geen totaal per jaar.</p>`;
  }
  if (invoer.dienst !== "casemanagement") return "";
  return `<p class="vgl-kop mt-2 text-sm">U vulde ${invoer.medewerkers} medewerkers in. De openbare prijzen hier zijn per uur, dus het totaal volgt de uren per week en niet het aantal medewerkers.</p>`;
}

function verzuimHtml(invoer: VergelijkInvoer): string {
  if (invoer.verzuimOngeldig) {
    return `<p class="vgl-verzuim mt-3 text-sm">Vul een verzuimpercentage tussen 0 en 40 in. We rekenen er geen eurobedrag uit.</p>`;
  }
  if (invoer.verzuimPct == null) {
    return `<p class="vgl-verzuim mt-3 text-sm">Het verzuimpercentage is nog leeg. We rekenen er geen eurobedrag uit. Dagkosten staan apart in de <a class="underline" href="/verzuimkosten-berekenen">verzuimkostencalculator</a>.</p>`;
  }
  return `<p class="vgl-verzuim mt-3 text-sm">Verzuimpercentage: ${esc(pctTekst(invoer.verzuimPct))}%. Dit getal gaat mee in de offerte. We rekenen er geen eurobedrag uit, omdat daar geen openbaar tarief per procentpunt voor is. Dagkosten staan apart in de <a class="underline" href="/verzuimkosten-berekenen">verzuimkostencalculator</a>.</p>`;
}

function bandenHtml(iv: Interventie, data: MarktData): string {
  if (!iv.banden.length) return "";
  const blokken = iv.banden.map((band) => {
    const hoog = typeof band.hoog === "number" && band.hoog > 0 ? band.hoog : null;
    const rijen = [
      ["laag", band.laag],
      ["midden", band.midden],
      ["hoog", band.hoog],
    ].filter((paar): paar is [string, number] => typeof paar[1] === "number");
    const balken = rijen
      .map(([naam, waarde]) => {
        const breedte = hoog ? Math.max(4, Math.round((waarde / hoog) * 100)) : 100;
        return `<div class="mt-1 flex items-center gap-2 text-sm"><span class="w-16">${esc(naam)}</span><span class="h-3 flex-1 rounded-full bg-sand-200"><span class="block h-3 rounded-full bg-green-800" style="width:${breedte}%"></span></span><span class="w-28 text-right">${esc(euro(waarde))}</span></div>`;
      })
      .join("");
    const aria = rijen.map(([naam, waarde]) => `${naam} ${euro(waarde)}`).join(", ");
    const middenZin =
      band.midden == null
        ? `<p class="mt-2 text-sm text-ink-soft">Een middenwaarde staat er niet bij, omdat er minder dan 3 openbare prijzen in dezelfde eenheid zijn.</p>`
        : "";
    const basis = band.basis
      .map((punt) => {
        const naam = data.aanbieders[punt.aanbieder_id]?.naam || punt.aanbieder_id;
        const link = bronLink(data, punt.bron);
        return `<li>${esc(naam)}: ${esc(euro(punt.waarde))}${link ? `. Bron: ${link}` : ""}</li>`;
      })
      .join("");
    return `<figure class="mt-4">
      <figcaption class="font-semibold">${esc(eenheidTekst(band.eenheid))}${band.n != null ? `. n = ${band.n}` : ""}</figcaption>
      <div class="vgl-bars" role="img" aria-label="${esc(aria)}">${balken}</div>
      ${band.karakter ? `<p class="mt-2 text-sm text-ink-soft">${esc(band.karakter)}</p>` : ""}
      ${middenZin}
      <details class="mt-2 text-sm"><summary class="cursor-pointer font-semibold">Bedragen in deze steekproef</summary><ul class="mt-2 list-disc space-y-1 pl-5">${basis}</ul></details>
    </figure>`;
  });
  return `<section class="vgl-banden"><h2 class="font-serif text-3xl text-green-950">Bandbreedte</h2><p class="mt-2 max-w-3xl text-sm">Laag, midden en hoog komen uit de openbare prijzen van anderen. Ons tarief telt daar niet in mee.</p>${blokken.join("")}</section>`;
}

function eigenHtml(invoer: VergelijkInvoer): string {
  const uurBlok = uurBlokHtml(invoer);
  if (invoer.dienst === "verzuimsysteem") {
    return `<article class="mt-4 rounded-[2rem] border border-ochre-500 bg-white p-5">
      <h3 class="font-serif text-2xl text-green-950">Arbopartner Brabant</h3>
      <p class="vgl-arbeid mt-3 font-semibold">prijs niet openbaar</p>
      <p class="mt-2">Hebt u geen verzuimsysteem, dan leveren we <a class="underline" href="/arbeid-ai">arbeid.ai</a> bij de begeleiding. Een tarief voor arbeid.ai publiceren we niet.</p>
    </article>`;
  }
  if (invoer.dienst === "arbodienstverlening") {
    return `<article class="mt-4 rounded-[2rem] border border-ochre-500 bg-white p-5">
      <h3 class="font-serif text-2xl text-green-950">Arbopartner Brabant</h3>
      <p class="vgl-eigen-abo mt-3 font-semibold">prijs niet openbaar</p>
      <p class="mt-2">Een bedrag per medewerker per jaar publiceren we niet.</p>
      <h4 class="mt-4 font-semibold">Casemanagement per uur</h4>
      <p class="mt-2 text-sm">Dit is een uurtarief voor casemanagement, geen abonnement per medewerker.</p>
      ${uurBlok}
    </article>`;
  }
  return `<article class="mt-4 rounded-[2rem] border border-ochre-500 bg-white p-5">
    <h3 class="font-serif text-2xl text-green-950">Arbopartner Brabant</h3>
    ${uurBlok}
  </article>`;
}

function uurBlokHtml(invoer: VergelijkInvoer): string {
  const niveau = invoer.niveau;
  const basis = levels.medior.rates[10];
  const regels = UREN.map((blok) => {
    const tarief = levels[niveau].rates[blok];
    const label = blok === 24 ? "24 uur per week" : `${blok} uur per week`;
    return `<li>${label}: ${esc(euro(tarief))} per uur</li>`;
  }).join("");
  const gekozen =
    invoer.uren == null
      ? `<p class="mt-2">Kies 10, 20 of 24 uur per week voor een jaarindicatie.</p>`
      : `<p class="mt-2">Gekozen blok, ${esc(levels[niveau].label)}, ${invoer.uren} uur per week: ${esc(euro(levels[niveau].rates[invoer.uren]))} per uur × ${invoer.uren} × 52 weken = ${esc(euro(invoer.uren * levels[niveau].rates[invoer.uren] * 52))} per jaar. Indicatie op basis van de tarieven op deze site, geen offerte.</p>`;
  return `<p class="mt-3">Basistarief, medior bij 10 uur per week: ${esc(euro(basis))} per uur, exclusief btw. Bron: <a class="underline" href="/tarieven">tarieven op deze site</a>.</p>
    ${gekozen}
    <ul class="mt-2 list-disc pl-5 text-sm">${regels}</ul>`;
}

function kaartHtml(inzet: AanbiederInzet, data: MarktData, invoer: VergelijkInvoer, dienst: DienstId): string {
  const profiel = data.aanbieders[inzet.id];
  const naam = profiel?.naam || inzet.id;
  const zichtbaar = zichtbarePrijzen(inzet, invoer, dienst);
  let prijzen = "";
  if (!inzet.prijzen.length) {
    prijzen = `<p class="mt-3 font-semibold">prijs niet openbaar</p>`;
  } else if (!zichtbaar.length) {
    prijzen = `<p class="mt-3">Geen openbare prijs in deze selectie.</p>`;
  } else {
    prijzen = zichtbaar.map((prijs) => prijsHtml(prijs, invoer, dienst, data)).join("");
  }
  return `<article class="rounded-[2rem] border border-line bg-white/80 p-5">
    <h3 class="font-serif text-2xl text-green-950">${naamHtml(naam, profiel?.website)}</h3>
    ${prijzen}
    ${profiel ? kwaliteitHtml(profiel, data, inzet.id) : ""}
  </article>`;
}

function prijsHtml(prijs: Prijs, invoer: VergelijkInvoer, dienst: DienstId, data: MarktData): string {
  const meta = [prijs.eenheid, prijs.btw, prijs.tariefjaar ? `tariefjaar ${prijs.tariefjaar}` : ""].filter(Boolean).join(", ");
  const totaal = jaarTotaal(prijs, invoer, dienst);
  const vanaf = /vanaf/i.test(prijs.label) ? "Vanaf-tarief. " : "";
  const soort = eenheidSoort(prijs.eenheid);
  let jaar = "Jaarkosten: niet te berekenen";
  if (totaal != null && soort === "jaar-mw" && invoer.medewerkers != null) {
    jaar = `${vanaf}${euro(prijs.bedrag)} per medewerker per jaar × ${invoer.medewerkers} medewerkers = ${euro(totaal)} per jaar. Indicatie op basis van openbare tarieven.`;
  } else if (totaal != null && soort === "maand-mw" && invoer.medewerkers != null) {
    jaar = `${vanaf}${euro(prijs.bedrag)} per medewerker per maand × 12 × ${invoer.medewerkers} medewerkers = ${euro(totaal)} per jaar. Indicatie op basis van openbare tarieven.`;
  } else if (totaal != null && soort === "uur" && invoer.uren != null) {
    jaar = `${euro(prijs.bedrag)} per uur × ${invoer.uren} uur per week × 52 weken = ${euro(totaal)} per jaar. Indicatie op basis van openbare tarieven. Dit is geen offerte van die aanbieder.`;
  }
  const link = bronLink(data, prijs.bron);
  return `<div class="mt-3 border-t border-line pt-3">
    <p class="font-semibold">${esc(toonLabel(prijs.label))}</p>
    <p class="font-serif text-3xl text-green-950">${esc(euro(prijs.bedrag))}</p>
    <p class="text-sm">${esc(meta)}</p>
    ${link ? `<p class="text-sm">Bron: ${link}</p>` : ""}
    <p class="mt-1 text-sm">${esc(jaar)}</p>
  </div>`;
}

function kwaliteitHtml(profiel: Profiel, data: MarktData, id: string): string {
  const items: string[] = [];
  for (const cert of profiel.certificeringen ?? []) {
    const link = bronLink(data, cert.bron);
    if (!link) continue;
    if (/^aangetroffen/i.test(cert.status) && /sbca|certificatieschema arbodiensten/i.test(cert.naam)) {
      items.push(`<li>SBCA-certificaat: ja. Bron: ${link}.</li>`);
    } else if (/eigen opgave/i.test(cert.status)) {
      items.push(`<li>Eigen opgave van de aanbieder: ${esc(cert.naam)}. Bron: ${link}.</li>`);
    }
  }
  const vestiging = data.sbca_dochtervestigingen.find((item) => item.aanbieder_id === id);
  if (vestiging) {
    const link = bronLink(data, data.sbca_bron);
    items.push(
      `<li>${esc(vestiging.naam)}: ${vestiging.aantal} dochtervestigingen in het SBCA-register. ${esc(data.sbca_toelichting)}${link ? ` Bron: ${link}.` : ""}</li>`,
    );
  }
  if (profiel.landelijk?.waarde === "ja") {
    const link = bronLink(data, profiel.landelijk.bron);
    if (link) items.push(`<li>Landelijke dekking: ja. Bron: ${link}.</li>`);
  }
  if (profiel.grootte?.tekst && profiel.grootte.bron) {
    const link = bronLink(data, profiel.grootte.bron);
    if (link) items.push(`<li>${esc(profiel.grootte.tekst)}. Bron: ${link}.</li>`);
  }
  if (!items.length) return "";
  return `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm">${items.join("")}</ul>`;
}

function zichtbarePrijzen(inzet: AanbiederInzet, invoer: VergelijkInvoer, dienst: DienstId): Prijs[] {
  return inzet.prijzen.filter((prijs) => prijsZichtbaar(prijs, invoer, dienst));
}

function prijsZichtbaar(prijs: Prijs, invoer: VergelijkInvoer, dienst: DienstId): boolean {
  if (dienst === "arbodienstverlening" && invoer.pakket !== "alles") {
    const soort = eenheidSoort(prijs.eenheid);
    if (invoer.pakket === "abonnement" && soort !== "jaar-mw" && soort !== "maand-mw") return false;
    if (invoer.pakket === "verrichtingen" && soort !== "uur") return false;
  }
  if (dienst === "verzuimsysteem" && invoer.contract !== "alles") {
    const label = prijs.label.toLowerCase();
    const jaar = label.includes("jaar");
    const maand = label.includes("maand");
    if (jaar || maand) {
      if (invoer.contract === "jaar" && !jaar) return false;
      if (invoer.contract === "maand" && !maand) return false;
    }
  }
  return true;
}

function past(inzet: AanbiederInzet, data: MarktData, invoer: VergelijkInvoer): boolean {
  const profiel = data.aanbieders[inzet.id];
  if (invoer.alleenOpenbaar && inzet.prijzen.length === 0) return false;
  if (invoer.alleenSbca && !heeftSbca(profiel, data, inzet.id)) return false;
  if (invoer.alleenLandelijk && profiel?.landelijk?.waarde !== "ja") return false;
  return true;
}

function heeftSbca(profiel: Profiel | undefined, data: MarktData, id: string): boolean {
  if (data.sbca_dochtervestigingen.some((item) => item.aanbieder_id === id)) return true;
  return (profiel?.certificeringen ?? []).some(
    (cert) => /^aangetroffen/i.test(cert.status) && /sbca|certificatieschema arbodiensten/i.test(cert.naam),
  );
}

function sorteer(lijst: AanbiederInzet[], data: MarktData, invoer: VergelijkInvoer, dienst: DienstId): AanbiederInzet[] {
  const sleutel = (inzet: AanbiederInzet): number | null => {
    const waarden: number[] = [];
    for (const prijs of zichtbarePrijzen(inzet, invoer, dienst)) {
      const soort = eenheidSoort(prijs.eenheid);
      if (dienst === "casemanagement" && soort === "uur") waarden.push(prijs.bedrag);
      else if (dienst === "verzuimsysteem" || invoer.pakket === "abonnement") {
        if (soort === "jaar-mw") waarden.push(prijs.bedrag);
        if (soort === "maand-mw") waarden.push(maal(prijs.bedrag, 12));
      } else if (invoer.pakket === "verrichtingen" && soort === "uur") waarden.push(prijs.bedrag);
    }
    return waarden.length ? Math.min(...waarden) : null;
  };
  const naam = (id: string) => data.aanbieders[id]?.naam || id;
  return lijst.slice().sort((a, b) => {
    const ka = sleutel(a);
    const kb = sleutel(b);
    if (ka == null && kb == null) return naam(a.id).localeCompare(naam(b.id), "nl");
    if (ka == null) return 1;
    if (kb == null) return -1;
    if (ka !== kb) return ka - kb;
    return naam(a.id).localeCompare(naam(b.id), "nl");
  });
}

function eenheidSoort(eenheid: string): "jaar-mw" | "maand-mw" | "uur" | "onduidelijk" | "anders" {
  const tekst = eenheid.toLowerCase();
  if (/niet (expliciet )?vermeld|periode niet/.test(tekst)) return "onduidelijk";
  if (/per uur/.test(tekst)) return "uur";
  if (/per (medewerker|werknemer|actieve medewerker) per jaar/.test(tekst)) return "jaar-mw";
  if (/per (medewerker|werknemer|actieve medewerker) per maand/.test(tekst)) return "maand-mw";
  return "anders";
}

function eenheidTekst(eenheid: string): string {
  return eenheid.replace(/^EUR\s+/i, "euro ");
}

function toonLabel(label: string): string {
  return label
    .replace(/pay as you go/gi, "betalen naar gebruik")
    .replace(/All-in/g, "Alles inbegrepen")
    .replace(/\s*\(label in bron:\s*([^)]+)\)/gi, ", $1");
}

function naamHtml(naam: string, website?: string | null): string {
  if (website && website.startsWith("https://")) {
    return `<a class="underline" href="${esc(website)}" rel="noopener noreferrer">${esc(naam)}</a>`;
  }
  return esc(naam);
}

function bronLink(data: MarktData, key?: string | null): string {
  if (!key) return "";
  const bron = data.bronnen[key];
  const url = bronUrl(data, key);
  if (!bron || !url) return "";
  const datum = datumTekst(bron.geraadpleegd) || data.peildatum_tekst;
  return `<a class="underline" href="${esc(url)}" rel="noopener noreferrer">${esc(bron.titel)}</a>, geraadpleegd op ${esc(datum)}`;
}

function bronUrl(data: MarktData, key?: string | null): string {
  if (!key) return "";
  const url = data.bronnen[key]?.url;
  return typeof url === "string" && url.startsWith("https://") ? url : "";
}

function datumTekst(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!match) return "";
  const maand = MAANDEN[Number(match[2]) - 1];
  if (!maand) return "";
  return `${Number(match[3])} ${maand} ${match[1]}`;
}

function pctTekst(waarde: number): string {
  return String(waarde).replace(".", ",");
}

function maal(bedrag: number, factor: number): number {
  const tekst = String(bedrag);
  const dec = (tekst.split(".")[1] || "").length;
  const schaal = 10 ** dec;
  const product = Math.round(bedrag * schaal) * factor;
  return dec === 0 ? product : product / schaal;
}

function leesGeheel(raw: FormDataEntryValue | null, min: number, max: number): number | null {
  const tekst = String(raw ?? "").trim();
  if (!/^\d+$/.test(tekst)) return null;
  const waarde = Number(tekst);
  if (waarde < min || waarde > max) return null;
  return waarde;
}

function leesDecimaal(raw: FormDataEntryValue | null, min: number, max: number): { waarde: number | null; ongeldig: boolean } {
  const tekst = String(raw ?? "").trim().replace(",", ".");
  if (!tekst) return { waarde: null, ongeldig: false };
  if (!/^\d+(\.\d+)?$/.test(tekst)) return { waarde: null, ongeldig: true };
  const waarde = Number(tekst);
  if (waarde < min || waarde > max) return { waarde: null, ongeldig: true };
  return { waarde, ongeldig: false };
}

function niveauVan(waarde: string): LevelId {
  if (waarde === "Medior+" || waarde === "medior-plus") return "medior-plus";
  if (waarde.startsWith("Senior") || waarde === "senior") return "senior";
  return "medior";
}

function esc(waarde: string): string {
  return waarde.replace(/[&<>"']/g, (teken) => {
    if (teken === "&") return "&amp;";
    if (teken === "<") return "&lt;";
    if (teken === ">") return "&gt;";
    if (teken === '"') return "&quot;";
    return "&#39;";
  });
}
