import { bindForms } from "./forms";
import { track } from "./track";

function pdfSafe(value: string) {
  return value
    .replaceAll("€", "EUR ")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replaceAll("’", "'")
    .replaceAll("“", '"')
    .replaceAll("”", '"')
    .replace(/[^\x20-\x7E\n]/g, (char) => {
      const map: Record<string, string> = {
        á: "a", à: "a", ä: "a", é: "e", è: "e", ë: "e", ï: "i", í: "i",
        ó: "o", ö: "o", ú: "u", ü: "u", Á: "A", É: "E", Ë: "E", Ö: "O", Ü: "U",
      };
      return map[char] || "?";
    });
}

function pdfEscape(value: string) {
  return pdfSafe(value).replace(/[\\()]/g, (char) => `\\${char}`);
}

export function downloadPdf(title: string, body: string, fileName = "arbopartner-rapport.pdf") {
  const lines = pdfSafe(`${title}\n\n${body}`).split(/\n/).slice(0, 42);
  const commands = ["BT", "/F1 11 Tf", "50 800 Td", "14 TL"];
  lines.forEach((line, index) => {
    if (index === 0) commands.push(`(${pdfEscape(line)}) Tj`);
    else commands.push(`T* (${pdfEscape(line.slice(0, 90))}) Tj`);
  });
  commands.push("ET");
  const stream = commands.join("\n");
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    "2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj\n",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj\n`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += object;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function mountReport(host: HTMLElement, input: { calculator: string; title: string; body: string }) {
  host.querySelector("[data-report]")?.remove();
  const wrap = document.createElement("form");
  wrap.className = "ap-report";
  wrap.dataset.report = "1";
  wrap.dataset.endpoint = "/api/rapport";
  wrap.dataset.kind = "rapport";
  wrap.dataset.cta = `rapport-${input.calculator}`;
  wrap.innerHTML = `
    <p class="font-semibold">Stuur mij het rapport</p>
    <p class="text-sm">Als de mailserver aanstaat, sturen we deze berekening naar uw e-mailadres en naar ons. Het is een scenario, geen offerte. De pdf kunt u ook meteen downloaden.</p>
    <label>E-mail<input name="email" type="email" required autocomplete="email" /></label>
    <label class="flex items-start gap-2 text-sm"><input type="checkbox" name="toestemming" value="ja" required /> <span>Mail mij dit rapport. <a href="/privacy">Privacy</a></span></label>
    <input type="hidden" name="rapport" />
    <input type="hidden" name="calculator" />
    <div class="ap-actions">
      <button class="btn" type="submit">Stuur mij het rapport</button>
      <button class="btn btn-ghost" type="button" data-pdf>Download PDF</button>
    </div>
    <p data-status class="text-sm" role="status"></p>
  `;
  const hidden = wrap.querySelector<HTMLInputElement>("[name=rapport]");
  const which = wrap.querySelector<HTMLInputElement>("[name=calculator]");
  if (hidden) hidden.value = `${input.title}\n\n${input.body}`.slice(0, 3500);
  if (which) which.value = input.calculator;
  wrap.querySelector<HTMLButtonElement>("[data-pdf]")?.addEventListener("click", () => {
    downloadPdf(input.title, input.body);
    track("file_download", { calculator: input.calculator, file_name: "arbopartner-rapport.pdf" });
  });
  host.appendChild(wrap);
  bindForms();
}
