import { calendlyEventFromMessage, calendlyKennismaking, calendlyWidgetCss, calendlyWidgetScript } from "../data/calendly";
import { track } from "./track";

function ensureCss() {
  if (document.querySelector("link[data-calendly-css]")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = calendlyWidgetCss;
  link.dataset.calendlyCss = "1";
  document.head.appendChild(link);
}

function loadWidget(): Promise<void> {
  const calendly = window.Calendly;
  if (calendly?.initPopupWidget) return Promise.resolve();
  ensureCss();
  const existing = document.querySelector<HTMLScriptElement>("script[data-calendly-js]");
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly?.initPopupWidget) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("calendly")), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = calendlyWidgetScript;
    script.async = true;
    script.dataset.calendlyJs = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("calendly"));
    document.head.appendChild(script);
  });
}

async function openPopup(url: string) {
  if (url !== calendlyKennismaking.url) return;
  try {
    await loadWidget();
    if (!window.Calendly?.initPopupWidget) throw new Error("calendly");
    window.Calendly.initPopupWidget({ url });
  } catch {
    window.open(url, "_blank", "noopener");
  }
}

export function bindCalendly() {
  if (typeof window === "undefined" || window.__apCalendly) return;
  window.__apCalendly = true;
  if (document.querySelector(".calendly-inline-widget")) void loadWidget();
  window.addEventListener("message", (event) => {
    const hit = calendlyEventFromMessage(event.origin, event.data);
    if (!hit) return;
    track(hit.event, hit.calendly_event ? { calendly_event: hit.calendly_event } : {});
  });
  document.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-calendly]");
    if (!button) return;
    event.preventDefault();
    const url = button.dataset.calendlyUrl || "";
    void openPopup(url);
  });
}

bindCalendly();

declare global {
  interface Window {
    __apCalendly?: boolean;
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}
