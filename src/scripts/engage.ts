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
  const seenKey = "ap_exit_v1";
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
      text: "Werknemers en werkgevers kunnen gesprekken voeren op het kantoor van Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden. Wie daarheen komt, blijft in beweging. Dat verhoogt de drempel om zich ziek te melden en kan verzuim minder en korter maken. We noemen geen percentage. Wie echt niet kan reizen, spreken we op het bedrijf of online. Plan een gesprek op ons kantoor via de pagina Adviesgesprek.",
    },
    {
      test: /dienstverband|in dienst|goedkoper|inhuren/,
      text: "Zolang u geen volle werkweek nodig heeft, is inhuren vaak voordeliger dan een fulltime casemanager in dienst. U betaalt de uren die u afneemt. Een dienstverband betaalt u ook bij een lage caseload. De vergelijking met bronnen staat op de pagina Casemanager inhuren of in dienst nemen. Bij een hoge caseload kan een dienstverband in euro's lager zijn. Dan blijven continuïteit, onafhankelijkheid en het ontbreken van werkgeversrisico staan.",
    },
    {
      test: /kost|tarief|prijs|uur|premium|basis/,
      text: "Richtprijzen, exclusief btw: medior vanaf €102,50 per uur bij 24 uur of meer, tot €137,50 voor een senior bij 10 uur. Reistijd binnen 45 minuten van Uden zit erin. De tarievenpagina zet de blokken naast elkaar. Dit is geen offerte.",
    },
    {
      test: /arbodienst|bedrijfsarts|arts/,
      text: "Nee. Arbopartner Brabant detacheert een casemanager. De bedrijfsarts blijft u zelf organiseren. Een arbeidsdeskundige van Matchvermogen kan meekijken, met 8% korting.",
    },
    {
      test: /werkgebied|uden|brabant|reistijd|waar werken/,
      text: "Het werkgebied is ongeveer 45 minuten rijden van Uden: onder meer Veghel, Oss, Den Bosch, Eindhoven en Helmond. De reistijd zit in het tarief.",
    },
    {
      test: /spoed|ziek|vandaag|terugbel/,
      text: `Bel ${phone} of app. U kunt hier ook uw nummer achterlaten. We verzinnen geen terugbeltermijn die nog niet is vastgesteld.`,
    },
  ];

  function reply(question: string) {
    const hit = answers.find((item) => item.test.test(question.toLowerCase()));
    say(hit?.text || "Die vraag kan ik niet zelf afmaken. Laat uw naam, bedrijf, telefoon en vraag achter, dan belt Matchvermogen B.V. u. Of kijk bij diensten, tarieven en het werkgebied.", "bot");
    if (!hit) lead?.removeAttribute("hidden");
    track("chat_message", { matched: Boolean(hit) });
  }

  function openChat() {
    if (!chat || !launch) return;
    chat.hidden = false;
    launch.setAttribute("aria-expanded", "true");
    if (!log?.childElementCount) {
      say("Hoi. Ik ben de assistent van Arbopartner Brabant, een label van Matchvermogen. Ik beantwoord korte vragen over detachering, tarieven en het werkgebied. Geen medisch advies.", "bot");
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
    if (!button) return;
    const label = button.textContent || "";
    say(label, "user");
    if (button.dataset.lead === "1") {
      say("Laat uw gegevens hieronder achter. We gebruiken ze alleen om contact op te nemen.", "bot");
      lead?.removeAttribute("hidden");
      lead?.querySelector<HTMLInputElement>("input[name=naam]")?.focus();
      track("chat_lead_open");
      return;
    }
    reply(label);
    track("chat_chip", { chip: label.slice(0, 80) });
  });
  chat?.querySelector<HTMLFormElement>("[data-ask]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = chat.querySelector<HTMLInputElement>("input[name=q]");
    const question = input?.value.trim() || "";
    if (!question) return;
    say(question, "user");
    if (input) input.value = "";
    reply(question);
  });
  lead?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = lead.querySelector<HTMLElement>("[data-status]");
    const payload = Object.fromEntries(new FormData(lead).entries());
    if (status) status.textContent = "Versturen…";
    try {
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
    if (event.target === exit) closeExit();
  });
  exit?.querySelectorAll<HTMLButtonElement>("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = exit.querySelector<HTMLFormElement>("[data-scan]");
      const kind = exit.querySelector<HTMLInputElement>("[name=soort]");
      if (kind) kind.value = button.dataset.choice || "terugbel";
      form?.removeAttribute("hidden");
      form?.querySelector<HTMLInputElement>("input[name=naam]")?.focus();
      track("exit_intent_choice", { choice: button.dataset.choice || "" });
    });
  });
  exit?.querySelector<HTMLFormElement>("[data-scan]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const status = form.querySelector<HTMLElement>("[data-status]");
    const payload = Object.fromEntries(new FormData(form).entries());
    if (status) status.textContent = "Versturen…";
    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.ok === false) {
        if (status) status.textContent = (result.errors || ["Versturen lukte niet."]).join(" ");
        return;
      }
      if (status) status.textContent = "Verstuurd. We bellen u op een werkdag.";
      form.reset();
      track("generate_lead", { form_id: "scan", lead_source: "exit" });
    } catch {
      if (status) status.textContent = "Versturen lukte niet. Bel ons gerust.";
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
