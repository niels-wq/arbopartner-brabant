type Param = string | number | boolean;

export function track(event: string, params: Record<string, Param> = {}) {
  const payload = {
    event,
    page: typeof location === "undefined" ? "" : location.pathname,
    ...params,
  };
  const layer = (window.dataLayer = window.dataLayer || []);
  layer.push(payload);
  if (typeof window.gtag === "function") {
    const { event: name, ...rest } = payload;
    window.gtag("event", name, rest);
  }
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}
