const MIN_MS = 3000;
const REFRESH_MS = 3.5 * 60 * 60 * 1000;

function hidden(form: HTMLFormElement, name: string, value: string) {
  let input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.appendChild(input);
  }
  input.value = value;
}

/** Haalt een HMAC-stempel op. De klok begint op dit apparaat op het moment van ontvangst. */
export async function armForm(form: HTMLFormElement) {
  const response = await fetch("/api/form-token", { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("token");
  const data = await response.json();
  if (typeof data.form_ts !== "string" || typeof data.form_sig !== "string") throw new Error("token");
  hidden(form, "form_ts", data.form_ts);
  hidden(form, "form_sig", data.form_sig);
  form.dataset.spamArmed = String(Date.now());
}

/** Vernieuwt een verlopen stempel en wacht tot de minimale invultijd voorbij is. */
export async function prepareSubmission(form: HTMLFormElement) {
  const armed = Number(form.dataset.spamArmed || 0);
  const sig = form.querySelector<HTMLInputElement>('input[name="form_sig"]')?.value;
  if (!sig || !armed || Date.now() - armed > REFRESH_MS) await armForm(form);
  const since = Number(form.dataset.spamArmed || Date.now());
  const wait = MIN_MS - (Date.now() - since);
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait + 50));
}
