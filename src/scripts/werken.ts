import { track } from "./track";

const MAX_CV = 10 * 1024 * 1024;

function checked(form: HTMLFormElement, name: string) {
  return [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)].some((box) => box.checked);
}

function requireGroup(form: HTMLFormElement, name: string, message: string) {
  const boxes = [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)];
  if (!boxes.length) return;
  boxes[0].setCustomValidity(checked(form, name) ? "" : message);
}

function syncTraject(form: HTMLFormElement) {
  const traject = form.querySelector<HTMLInputElement>("input[name=traject]:checked")?.value;
  const zzp = form.querySelector<HTMLFieldSetElement>("[data-zzp]");
  if (zzp) zzp.disabled = traject !== "zzp";
  if (traject === "zzp" || traject === "dienst") form.dataset.cta = traject === "zzp" ? "werken-zzp" : "werken-dienst";
}

function syncFile(form: HTMLFormElement) {
  const input = form.querySelector<HTMLInputElement>("input[name=cv]");
  const file = input?.files?.[0];
  if (!input) return;
  if (!file) {
    input.setCustomValidity("Voeg een CV toe als pdf of docx.");
    return;
  }
  const name = file.name.toLowerCase();
  if (!name.endsWith(".pdf") && !name.endsWith(".docx")) input.setCustomValidity("Alleen pdf of docx.");
  else if (file.size > MAX_CV) input.setCustomValidity("Het CV is groter dan 10 MB.");
  else input.setCustomValidity("");
}

function syncGroups(form: HTMLFormElement) {
  requireGroup(form, "registraties", "Kies een registratie, of Geen.");
  requireGroup(form, "regios", "Kies minstens één regio.");
  const special = checked(form, "specialisaties");
  const overig = form.querySelector<HTMLInputElement>("input[name=specialisatie_overig]");
  const boxes = [...form.querySelectorAll<HTMLInputElement>("input[name=specialisaties]")];
  const ok = special || Boolean(overig?.value.trim());
  if (boxes[0]) boxes[0].setCustomValidity(ok ? "" : "Kies minstens één specialisatie, of vul het vrije veld in.");
  syncFile(form);
  syncTraject(form);
}

function showStatus(status: HTMLElement | null, text: string) {
  if (!status) return;
  status.textContent = text;
  status.scrollIntoView({ block: "center", behavior: "instant" });
}

function statusText(result: { delivered?: boolean; via?: string; cv?: string }) {
  if (!result.delivered) {
    return "Nog niet opgeslagen. De database en de mailserver zijn nog niet ingesteld. Mail uw CV naar info@matchvermogen.nl.";
  }
  if (result.via === "airtable" && result.cv === "attachment") {
    return "Ontvangen. Uw aanmelding staat in de kandidatenlijst, met het CV erbij.";
  }
  if (result.via === "airtable+email") {
    return "Ontvangen. Uw gegevens staan in de kandidatenlijst. Het CV is per mail meegestuurd, omdat het groter is dan 5 MB of de bijlage niet in de lijst paste.";
  }
  if (result.via === "airtable-zonder-cv") {
    return "Uw gegevens staan in de kandidatenlijst. Het CV is niet opgeslagen. Mail het bestand naar info@matchvermogen.nl.";
  }
  return "Ontvangen. De aanmelding is gemaild naar info@matchvermogen.nl, met uw CV als bijlage.";
}

export function bindWerken() {
  const form = document.querySelector<HTMLFormElement>("form[data-werken]");
  if (!form || form.dataset.werkenBound === "1") return;
  form.dataset.werkenBound = "1";
  const status = form.querySelector<HTMLElement>("[data-status]");
  form.addEventListener("change", () => syncGroups(form));
  form.addEventListener("click", (event) => {
    if (!(event.target as HTMLElement).closest("[data-next]")) return;
    syncGroups(form);
  }, true);
  syncTraject(form);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    syncGroups(form);
    if (!form.checkValidity()) {
      form.reportValidity();
      track("form_error", { form_id: "werken", step: 6 });
      return;
    }
    showStatus(status, "Versturen…");
    const submit = form.querySelector<HTMLButtonElement>("button[type=submit]");
    if (submit) submit.disabled = true;
    try {
      const response = await fetch("/api/werken", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        showStatus(status, (result.errors || ["Versturen lukte niet."]).join(" "));
        track("form_error", { form_id: "werken", step: 6 });
        if (submit) submit.disabled = false;
        return;
      }
      track("generate_lead", {
        form_id: "werken",
        lead_source: form.dataset.cta || "werken",
        via: String(result.via || ""),
      });
      showStatus(status, statusText(result));
      if (result.delivered && result.cv !== "niet-opgeslagen") {
        form.reset();
        syncGroups(form);
      } else if (submit) submit.disabled = false;
    } catch {
      showStatus(status, "Versturen lukte niet. Mail uw CV naar info@matchvermogen.nl.");
      track("form_error", { form_id: "werken", step: 6 });
      if (submit) submit.disabled = false;
    }
  });
}

bindWerken();
