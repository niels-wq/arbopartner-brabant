import { euro } from "../lib/format.ts";
import { bulkVoordeel, dienstOpId, dienstToelichting, vergelijk } from "../lib/interventie-tarief.ts";

function geld(bedrag: number): string {
  return euro(bedrag, Number.isInteger(bedrag));
}

function toon(el: HTMLElement | null, tekst: string, zichtbaar: boolean) {
  if (!el) return;
  el.textContent = tekst;
  el.hidden = !zichtbaar;
}

function vraagVeld(form: HTMLFormElement): HTMLInputElement {
  let veld = form.querySelector<HTMLInputElement>('input[name="vraag"]');
  if (!veld) {
    veld = document.createElement("input");
    veld.type = "hidden";
    veld.name = "vraag";
    form.appendChild(veld);
  }
  return veld;
}

export function mountInterventieCheck(root: HTMLElement) {
  if (root.dataset.gebonden === "1") return;
  root.dataset.gebonden = "1";

  const dienstVeld = root.querySelector<HTMLSelectElement>("[data-dienst]");
  const urenBlok = root.querySelector<HTMLElement>("[data-uren]");
  const urenVeld = root.querySelector<HTMLInputElement>("[data-uren-invoer]");
  const bedragVeld = root.querySelector<HTMLInputElement>("[data-bedrag]");
  const uwvVeld = root.querySelector<HTMLInputElement>("[data-uwv]");
  const bulkVeld = root.querySelector<HTMLInputElement>("[data-bulk]");
  const fout = root.querySelector<HTMLElement>("[data-fout]");
  const uitkomst = root.querySelector<HTMLElement>("[data-uitkomst]");
  const kop = root.querySelector<HTMLElement>("[data-kop]");
  const tekst = root.querySelector<HTMLElement>("[data-tekst]");
  const context = root.querySelector<HTMLElement>("[data-context]");
  const toelichting = root.querySelector<HTMLElement>("[data-dienst-toelichting]");
  const gesprekBlok = root.querySelector<HTMLElement>("[data-gesprek-blok]");
  const gesprekForm = gesprekBlok?.querySelector<HTMLFormElement>("form[data-endpoint]");
  const prioriteitKnoppen = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-prioriteit] button"));

  let prioriteit = "";
  let laatsteSamenvatting = "";

  function gekozenDienst() {
    return dienstOpId(dienstVeld?.value || "");
  }

  function verversDienst() {
    const dienst = gekozenDienst();
    if (urenBlok) urenBlok.hidden = !dienst?.perUur;
    if (toelichting && dienst) toelichting.textContent = dienstToelichting(dienst.id);
  }

  function openGesprek(samenvatting: string) {
    if (!gesprekBlok) return;
    laatsteSamenvatting = samenvatting;
    if (gesprekForm) vraagVeld(gesprekForm).value = samenvatting.slice(0, 1000);
    gesprekBlok.hidden = false;
    gesprekBlok.scrollIntoView({ behavior: "smooth", block: "start" });
    gesprekBlok.querySelector<HTMLInputElement>('input[name="telefoon"]')?.focus();
  }

  dienstVeld?.addEventListener("change", verversDienst);
  verversDienst();

  for (const knop of prioriteitKnoppen) {
    knop.addEventListener("click", () => {
      prioriteit = knop.dataset.waarde || "";
      for (const andere of prioriteitKnoppen) {
        const aan = andere === knop;
        andere.setAttribute("aria-pressed", aan ? "true" : "false");
        andere.classList.toggle("bg-green-900", aan);
        andere.classList.toggle("text-sand-50", aan);
        andere.classList.toggle("text-green-950", !aan);
      }
    });
  }

  root.querySelector("[data-bereken]")?.addEventListener("click", () => {
    const resultaat = vergelijk({
      dienst: dienstVeld?.value || "",
      prioriteit,
      bedrag: bedragVeld?.value === "" ? Number.NaN : Number(bedragVeld?.value),
      uren: urenVeld?.value === "" ? Number.NaN : Number(urenVeld?.value),
      uwvGarantie: Boolean(uwvVeld?.checked),
      bulk: Boolean(bulkVeld?.checked),
    });
    if (!resultaat.ok) {
      toon(fout, resultaat.fout, true);
      if (uitkomst) uitkomst.hidden = true;
      return;
    }
    toon(fout, "", false);
    const regel = resultaat.uitkomst;
    laatsteSamenvatting = regel.samenvatting;
    if (kop) {
      kop.textContent =
        regel.stand === "boven" ? `${geld(regel.verschil)} boven het richttarief` : `${geld(regel.richttarief)} richttarief`;
    }
    if (tekst) tekst.textContent = regel.tekst;
    if (context) context.textContent = regel.context;
    if (uitkomst) {
      uitkomst.hidden = false;
      uitkomst.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  root.querySelector("[data-gesprek]")?.addEventListener("click", () => {
    openGesprek(laatsteSamenvatting || "Vergelijking van een interventietarief.");
  });

  root.querySelector("[data-bulk-bereken]")?.addEventListener("click", () => {
    const aantalVeld = root.querySelector<HTMLInputElement>("[data-bulk-aantal]");
    const soortVeld = root.querySelector<HTMLSelectElement>("[data-bulk-dienst]");
    const bulkFout = root.querySelector<HTMLElement>("[data-bulk-fout]");
    const bulkUit = root.querySelector<HTMLElement>("[data-bulk-uitkomst]");
    const bulkKop = root.querySelector<HTMLElement>("[data-bulk-kop]");
    const bulkTekst = root.querySelector<HTMLElement>("[data-bulk-tekst]");
    const resultaat = bulkVoordeel(soortVeld?.value || "", aantalVeld?.value === "" ? Number.NaN : Number(aantalVeld?.value));
    if (!resultaat.ok) {
      toon(bulkFout, resultaat.fout, true);
      if (bulkUit) bulkUit.hidden = true;
      return;
    }
    toon(bulkFout, "", false);
    const regel = resultaat.uitkomst;
    laatsteSamenvatting = regel.samenvatting;
    if (bulkKop) {
      bulkKop.textContent = regel.percentage === 0 ? "Nog geen staffelkorting" : `${geld(regel.besparing)} verschil`;
    }
    if (bulkTekst) bulkTekst.textContent = regel.tekst;
    if (bulkUit) {
      bulkUit.hidden = false;
      bulkUit.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  root.querySelector("[data-bulk-gesprek]")?.addEventListener("click", () => {
    openGesprek(laatsteSamenvatting || "Vraag over bulkinkoop van een interventie.");
  });
}

document.querySelectorAll<HTMLElement>("[data-interventie-check]").forEach((root) => {
  mountInterventieCheck(root);
});
