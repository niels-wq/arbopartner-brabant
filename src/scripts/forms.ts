import { site } from "../data/site";
import { track } from "./track";

export function mailtoHref(kind: string, entries: Iterable<[string, FormDataEntryValue]>): string {
  const lines = [`Formulier: ${kind}`, ""];
  for (const [key, value] of entries) {
    if (key === "company_website" || key === "checklist") continue;
    lines.push(`${key}: ${String(value)}`);
  }
  const subject = encodeURIComponent(`[Arbopartner Brabant] ${kind}`);
  const body = encodeURIComponent(lines.join("\n"));
  return `mailto:${site.parent.email}?subject=${subject}&body=${body}`;
}

function mailtoLink(kind: string, form: HTMLFormElement): string {
  return mailtoHref(kind, new FormData(form).entries());
}

export function bindForms() {
  document.querySelectorAll<HTMLFormElement>("form[data-endpoint]").forEach((form) => {
    if (form.dataset.bound === "1") return;
    form.dataset.bound = "1";
    const status = form.querySelector<HTMLElement>("[data-status]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (status) status.textContent = "Versturen…";
      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const response = await fetch(form.dataset.endpoint || "", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok || result.ok === false) {
          const errors = (result.errors || ["Versturen lukte niet."]).join(" ");
          if (status) status.textContent = errors;
          track("form_error", { form_id: form.dataset.kind || "bericht" });
          return;
        }
        track("generate_lead", { form_id: form.dataset.kind || "bericht", lead_source: form.dataset.cta || "form" });
        form.dispatchEvent(new CustomEvent("ap-lead-ok", { bubbles: true, detail: result }));
        if (result.delivered) {
          form.reset();
          if (status) status.textContent = "Verstuurd. We lezen uw bericht en nemen contact op.";
          return;
        }
        const link = mailtoLink(form.dataset.kind || "bericht", form);
        if (status) {
          status.innerHTML = `Versturen via deze site lukte niet. <a class="font-semibold underline" href="${link}">Verstuur het bericht via uw eigen e-mail</a> naar ${site.parent.email}.`;
        }
      } catch {
        const link = mailtoLink(form.dataset.kind || "bericht", form);
        if (status) {
          status.innerHTML = `Versturen lukte niet. <a class="font-semibold underline" href="${link}">Mail ons direct</a>.`;
        }
      }
    });
  });
}

bindForms();
