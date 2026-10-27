import { calendlyKennismaking } from "../data/calendly";
import { site } from "../data/site";
import { checklistText } from "../lib/checklist";
import { openCalendlyPopup } from "./calendly";
import { armForm, prepareSubmission } from "./form-guard";
import { mailtoHref } from "./forms";
import { downloadPdf } from "./report";
import { track } from "./track";

const root = document.querySelector<HTMLElement>("#ap-engage");
if (root && !root.dataset.ready) {
  root.dataset.ready = "1";
  const phone = root.dataset.phone || "";
  const chat = document.querySelector<HTMLElement>("#ap-chat");
  const launch = document.querySelector<HTMLButtonElement>("#ap-chat-open");
  const log = chat?.querySelector<HTMLElement>("[data-log]");
  const chips = chat?.querySelector<HTMLElement>("[data-chips]");
  const lead = chat?.querySelector<HTMLFormElement>("[data-lead]");
  const exit = document.querySelector<HTMLElement>("#ap-exit");
  const seenKey = "ap_exit_v3";
  const choiceLabels: Record<string, string> = {
    checklist: "Stuur mij de gratis verzuimchecklist",
    terugbel: "Bel mij terug",
    gesprek: "Plan direct een gesprek",
    besparing: "Bereken mijn besparing",
  };
  const calculatorHref = "/casemanager-inhuren-of-in-dienst#vergelijking";
  function seen() {
    try {
      return sessionStorage.getItem(seenKey) === "1";
    } catch {
      return false;
    }
  }
  function markSeen() {
    try {
      sessionStorage.setItem(seenKey, "1");
    } catch {
      /* privémodus */
    }
  }

  function say(text: string, who: "bot" | "user") {
    if (!log) return;
    const p = document.createElement("p");
    p.className = who === "user" ? "ap-msg ap-msg-user" : "ap-msg";
    p.textContent = text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  const answers: { test: RegExp; text: string }[] = [
    {
      test: /\bzzp\b|freelance|\bteam\b|wie werkt|niels/,
      text: "Niels Alderding is directeur en arbeidsdeskundige van Matchvermogen. Zijn foto en het team staan op de teampagina, overgenomen van matchvermogen.nl. Naast die vaste kern werken we met gecertificeerde zzp-casemanagers, zodat we kunnen opschalen, een specialist per casus kunnen inzetten en kunnen wisselen. Wie in loondienst is en wie als zzp'er meewerkt, staat in de offerte. Ik ben de assistent, niet Niels.",
    },
    {
      test: /kantoor|losplaats|op bezoek|neutrale plek/,
      text: "Werknemers en werkgevers kunnen gesprekken voeren op het kantoor van Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden. Wie daarheen komt, blijft in beweging. Dat verhoogt de drempel om zich ziek te melden en kan verzuim minder en korter maken. Wie echt niet kan reizen, spreken we op het bedrijf of online. Plan een gesprek op ons kantoor via de pagina Adviesgesprek.",
    },
    {
      test: /dienstverband|in dienst|goedkoper|inhuren/,
      text: "U betaalt de uren die u afneemt. De vergelijking met bronnen staat op de pagina Casemanager inhuren of in dienst nemen en rekent eerlijk. Bij een bijna volle werkweek kan een dienstverband in euro's lager zijn. Dan blijven continuïteit, onafhankelijkheid en het ontbreken van werkgeversrisico staan.",
    },
    {
      test: /kost|tarief|prijs|uur|premium|basis/,
      text: "Richtprijzen, exclusief btw: medior vanaf €102,50 per uur bij 24 uur of meer, tot €137,50 voor een senior bij 10 uur. Reistijd binnen 45 minuten van Uden zit erin. De tarievenpagina zet de blokken naast elkaar. Dit is geen offerte.",
    },
    {
      test: /korting|spoor 2|tweede spoor|arbeidsdeskundig onderzoek/,
      text: "Tot 10% korting op spoor 2 en tot 8% op arbeidsdeskundig onderzoek, via Best Match en Matchvermogen. De calculator zet die korting als besparing. De offerte bevestigt het percentage.",
    },
    {
      test: /arbodienst|bedrijfsarts|arts/,
      text: "Een arbodienst richt zich op verzuimbegeleiding, de bedrijfsarts en de stappen in de eerste twee ziektejaren. Wij vullen aan, met senior casemanagers, en gaan verder tot en met 12 jaar WGA en de Ziektewet. Het verschil staat op /arbodienst-of-arbopartner. De bedrijfsarts blijft u zelf organiseren.",
    },
    {
      test: /werkgebied|uden|brabant|reistijd|waar werken/,
      text: "We werken in heel Noord-Brabant: Den Bosch, Eindhoven, Tilburg, Breda, Helmond, Oss, Uden, Veghel, Roosendaal, Bergen op Zoom en de gemeenten eromheen. Het kantoor staat in Uden, Losplaats 16d. Reistijd binnen ongeveer 45 minuten van dat kantoor zit in het tarief. Verder in Brabant staat de rit in de offerte.",
    },
    {
      test: /loonsanctie/,
      text: "Een loonsanctie beslist UWV. Wij maken het dossier leesbaar en bewaken termijnen. We garanderen niet dat een sanctie uitblijft. Kijk op de loonsanctie-risicoscan, of bij acuut verzuim op /spoedhulp.",
    },
    {
      test: /acuut|spoedscan|spoed|ziek|vandaag|terugbel/,
      text: `Bel ${phone} of app via WhatsApp. Een gratis spoedscan van 30 minuten staat op /spoedhulp. U kunt hier ook uw nummer achterlaten. ${site.responsePromise}`,
    },
  ];

  const messages: { role: "user" | "assistant"; content: string }[] = [];

  function sessionId() {
    const key = "ap_chat_session";
    try {
      const current = sessionStorage.getItem(key) || "";
      if (/^[A-Za-z0-9_-]{12,64}$/.test(current)) return current;
      const bytes = new Uint8Array(18);
      crypto.getRandomValues(bytes);
      const id = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
      sessionStorage.setItem(key, id);
      return id;
    } catch {
      return "ap-chat-sessie-lokaal";
    }
  }

  function openLead() {
    lead?.removeAttribute("hidden");
    lead?.querySelector<HTMLInputElement>("input[name=naam]")?.focus();
    track("chat_lead_open");
  }

  function scripted(question: string) {
    const hit = answers.find((item) => item.test.test(question.toLowerCase()));
    const text = hit?.text || "Die vraag kan ik niet zelf afmaken. Laat uw naam, bedrijf, telefoon en vraag achter, dan belt Matchvermogen B.V. u. Of kijk bij diensten, tarieven en het werkgebied.";
    say(text, "bot");
    messages.push({ role: "assistant", content: text });
    if (!hit) openLead();
    track("chat_message", { matched: Boolean(hit) });
  }

  async function ask(question: string) {
    const text = question.trim().slice(0, 500);
    if (!text) return;
    say(text, "user");
    messages.push({ role: "user", content: text });
    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          session: sessionId(),
          messages: messages.slice(-10),
          page: { title: document.title, path: location.pathname },
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { reply?: unknown; fallback?: boolean; action?: string };
      if (!response.ok || result.fallback || typeof result.reply !== "string" || !result.reply.trim()) {
        scripted(text);
        return;
      }
      say(result.reply, "bot");
      messages.push({ role: "assistant", content: result.reply });
      if (result.action === "lead_form") openLead();
      track("chat_message", { matched: true });
    } catch {
      scripted(text);
    }
  }

  function openChat() {
    if (!chat || !launch) return;
    chat.hidden = false;
    launch.setAttribute("aria-expanded", "true");
    if (!log?.childElementCount) {
      say("Hoi. Ik ben de verzuimpartner van Arbopartner Brabant, van Matchvermogen. Ik help werkgevers in Brabant met 35 tot 500 medewerkers. De dossiers die misgaan, veroorzaken loonsancties. Wat is jouw verzuimprobleem?", "bot");
    }
    chat.querySelector<HTMLInputElement>("input[name=q]")?.focus();
    track("chat_open");
  }

  function closeChat() {
    if (!chat || !launch) return;
    chat.hidden = true;
    launch.setAttribute("aria-expanded", "false");
    launch.focus();
    track("chat_close");
  }

  launch?.addEventListener("click", () => {
    if (chat?.hidden) openChat();
    else closeChat();
  });
  chat?.querySelector<HTMLButtonElement>("[data-close]")?.addEventListener("click", closeChat);
  chips?.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest("button");
    if (!button || button.dataset.calendly) return;
    const label = button.textContent || "";
    if (button.dataset.lead === "1") {
      say(label, "user");
      say("Laat uw gegevens hieronder achter. We gebruiken ze alleen om contact op te nemen.", "bot");
      openLead();
      return;
    }
    void ask(label);
    track("chat_chip", { chip: label.slice(0, 80) });
  });
  chat?.querySelector<HTMLFormElement>("[data-ask]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = chat.querySelector<HTMLInputElement>("input[name=q]");
    const question = input?.value.trim() || "";
    if (!question) return;
    if (input) input.value = "";
    void ask(question);
  });
  lead?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = lead.querySelector<HTMLElement>("[data-status]");
    if (status) status.textContent = "Versturen…";
    try {
      if (!lead) return;
      await prepareSubmission(lead);
      const payload = Object.fromEntries(new FormData(lead).entries());
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        if (status) status.textContent = (result.errors || ["Versturen lukte niet."]).join(" ");
        track("form_error", { form_id: "chat" });
        return;
      }
      if (status) status.textContent = "Verstuurd. We nemen contact op.";
      lead.reset();
      track("generate_lead", { form_id: "chat", lead_source: "chat" });
    } catch {
      if (status) status.textContent = "Versturen lukte niet. Bel ons gerust.";
    }
  });

  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
    if (!target) return;
    const cta = target.dataset.cta;
    if (cta) track("cta_click", { cta_id: cta, link_url: target.getAttribute("href") || "" });
    else if (target.matches("a.rounded-full, button.rounded-full, a.btn, button.btn")) {
      track("cta_click", { cta_id: (target.textContent || "").trim().slice(0, 80), link_url: target.getAttribute("href") || "" });
    }
    const channel = target.dataset.channel;
    if (channel) track("contact_click", { channel });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && exit && !exit.hidden) {
      const nodes = [...exit.querySelectorAll<HTMLElement>("a, button, input, textarea")].filter((el) => !el.closest("[hidden]"));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (first && last && event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (first && last && !event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== "Escape") return;
    if (exit && !exit.hidden) closeExit();
    else if (chat && !chat.hidden) closeChat();
  });

  function openExit() {
    if (!exit || seen()) return;
    markSeen();
    exit.hidden = false;
    exit.querySelector<HTMLElement>("h2")?.focus();
    track("exit_intent_view");
  }
  function closeExit() {
    if (!exit) return;
    exit.hidden = true;
    track("exit_intent_close");
  }
  exit?.querySelectorAll<HTMLButtonElement>("[data-close]").forEach((button) => {
    button.addEventListener("click", closeExit);
  });
  exit?.addEventListener("click", (event) => {
    const booking = (event.target as HTMLElement).closest("[data-calendly]");
    if (booking) {
      closeExit();
      return;
    }
    if (event.target === exit) closeExit();
  });
  const magnet = exit?.querySelector<HTMLFormElement>("[data-magnet]");
  if (lead) void armForm(lead).catch(() => {});
  if (magnet) void armForm(magnet).catch(() => {});
  const checklistField = magnet?.querySelector<HTMLInputElement>("[data-checklist-body]");
  if (checklistField) checklistField.value = checklistText;
  const fileName = "arbopartner-verzuim-checklist.pdf";

  function currentChoice() {
    const value = magnet?.querySelector<HTMLInputElement>('input[name="keuze"]:checked')?.value || "checklist";
    return value in choiceLabels ? value : "checklist";
  }
  function showChoice() {
    if (!magnet) return;
    const choice = currentChoice();
    magnet.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== choice;
    });
    const phone = magnet.querySelector<HTMLInputElement>('input[name="telefoon"]');
    if (phone) phone.required = choice === "terugbel";
    const submit = magnet.querySelector<HTMLButtonElement>("[data-exit-submit]");
    if (submit) {
      submit.textContent = choiceLabels[choice] || choiceLabels.checklist;
      submit.dataset.cta = `exit-${choice}`;
    }
  }
  function mailFallback(status: HTMLElement, payload: Record<string, string>, extra: string) {
    const link = mailtoHref("magnet", Object.entries(payload));
    status.innerHTML = `${extra} <a class="font-semibold underline" href="${link}">Verstuur het bericht via uw eigen e-mail</a> naar ${site.parent.email}.`;
  }
  magnet?.querySelectorAll<HTMLInputElement>('input[name="keuze"]').forEach((input) => {
    input.addEventListener("change", () => {
      showChoice();
      track("exit_intent_choice", { keuze: currentChoice() });
    });
  });
  magnet?.addEventListener("click", (event) => {
    const when = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-when]");
    if (!when) return;
    const field = magnet.querySelector<HTMLInputElement>('input[name="wanneer"]');
    if (field) field.value = when.dataset.when || "";
  });
  showChoice();
  magnet?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!magnet) return;
    const status = magnet.querySelector<HTMLElement>("[data-status]");
    const choice = currentChoice();
    if (status) status.textContent = "Versturen…";
    try {
      await prepareSubmission(magnet);
      const payload: Record<string, string> = {};
      for (const [key, value] of new FormData(magnet).entries()) payload[key] = String(value);
      payload.keuze = choice;
      if (choice !== "checklist") delete payload.checklist;
      if (choice !== "terugbel") delete payload.wanneer;
      track("exit_intent_choice", { keuze: choice });
      const response = await fetch("/api/magnet", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        if (status) status.textContent = (result.errors || ["Versturen lukte niet."]).join(" ");
        track("form_error", { form_id: "magnet", keuze: choice });
        return;
      }
      track("generate_lead", { form_id: "magnet", lead_source: "exit", keuze: choice });
      if (choice === "checklist") {
        downloadPdf("Verzuim-checklist voor werkgevers", checklistText, fileName);
        track("file_download", { form_id: "magnet", file_name: fileName, lead_source: "exit", keuze: choice });
        if (status) {
          status.textContent = result.delivered
            ? "De checklist downloadt op dit apparaat. Dezelfde tekst gaat ook naar uw e-mail."
            : "De checklist downloadt op dit apparaat.";
        }
        return;
      }
      if (choice === "terugbel") {
        if (result.delivered) {
          magnet.reset();
          showChoice();
          if (status) status.textContent = `Verstuurd. ${site.responsePromise}`;
        } else if (status) {
          mailFallback(status, payload, "Het terugbelverzoek is niet verzonden.");
        }
        return;
      }
      if (choice === "gesprek") {
        if (status) {
          if (result.delivered) status.textContent = "Uw gegevens zijn verstuurd. De agenda opent voor een belafspraak van 15 minuten.";
          else mailFallback(status, payload, "Uw gegevens zijn niet verzonden. De agenda opent wel.");
        }
        openCalendlyPopup(calendlyKennismaking.url);
        return;
      }
      if (result.delivered) {
        window.location.href = calculatorHref;
        return;
      }
      if (status) {
        mailFallback(status, payload, `<a class="font-semibold underline" href="${calculatorHref}">Ga naar de berekening</a>.`);
      }
    } catch {
      if (status) status.textContent = "Versturen lukte niet. Bel 085-0870307 of kijk bij de verzuim-checklist.";
    }
  });

  const desktop = window.matchMedia("(min-width: 768px)");
  document.addEventListener("mouseout", (event) => {
    if (!desktop.matches || seen()) return;
    if (event.clientY > 8 || event.relatedTarget) return;
    openExit();
  });
  let deepest = 0;
  let lastScroll = window.scrollY;
  window.addEventListener("scroll", () => {
    deepest = Math.max(deepest, window.scrollY);
    const goingUp = window.scrollY < lastScroll - 140;
    lastScroll = window.scrollY;
    if (!desktop.matches && goingUp && deepest > 500) openExit();
  }, { passive: true });
  let idle: number | undefined;
  const arm = () => {
    if (desktop.matches) return;
    window.clearTimeout(idle);
    idle = window.setTimeout(() => openExit(), 60000);
  };
  ["pointerdown", "keydown", "scroll"].forEach((name) => window.addEventListener(name, arm, { passive: true }));
  arm();
}
