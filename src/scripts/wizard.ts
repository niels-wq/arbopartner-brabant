import { track } from "./track";

function fieldsIn(step: HTMLFieldSetElement) {
  return Array.from(step.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
}

export function bindWizards() {
  document.querySelectorAll<HTMLFormElement>("form[data-wizard]").forEach((form) => {
    if (form.dataset.wizardBound === "1") return;
    form.dataset.wizardBound = "1";
    const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>("[data-step]"));
    if (!steps.length) return;
    const nav = form.querySelector<HTMLElement>("[data-nav]");
    const label = form.querySelector<HTMLElement>("[data-step-label]");
    let index = 0;

    function show(focus: boolean) {
      steps.forEach((step, stepIndex) => {
        step.hidden = stepIndex !== index;
      });
      const prev = nav?.querySelector<HTMLButtonElement>("[data-prev]");
      const next = nav?.querySelector<HTMLButtonElement>("[data-next]");
      if (prev) prev.hidden = index === 0;
      if (next) next.hidden = index === steps.length - 1;
      if (label) label.textContent = String(index + 1);
      if (!focus) return;
      const first = fieldsIn(steps[index]).find((field) => field.type !== "hidden" && field.tabIndex !== -1);
      first?.focus();
    }

    nav?.querySelector("[data-next]")?.addEventListener("click", () => {
      const invalid = fieldsIn(steps[index]).find((field) => !field.checkValidity());
      if (invalid) {
        invalid.reportValidity();
        track("form_error", { form_id: form.dataset.kind || "wizard", step: index + 1 });
        return;
      }
      track("form_step", {
        form_id: form.dataset.kind || "wizard",
        step: index + 1,
        lead_source: form.dataset.cta || "form",
      });
      index = Math.min(steps.length - 1, index + 1);
      show(true);
    });

    nav?.querySelector("[data-prev]")?.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      show(true);
    });

    show(false);
  });
}

bindWizards();
