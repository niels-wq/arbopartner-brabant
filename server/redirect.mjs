const APEX = "arbopartnerbrabant.nl";
const WWW = "www.arbopartnerbrabant.nl";

/** Eerste hostnaam, zonder poort. */
export function bareHost(value) {
  if (!value) return "";
  const raw = Array.isArray(value) ? value[0] : String(value);
  const first = raw.split(",")[0].trim().toLowerCase();
  if (first.startsWith("[")) return first;
  return first.replace(/:\d+$/, "");
}

/**
 * Permanente bestemming als het verzoek op de apex binnenkomt.
 * Pad en query blijven gelijk. www, localhost en andere hosts blijven staan.
 */
export function wwwRedirectLocation(pathname, search, hostHeader, forwardedHost) {
  const host = bareHost(hostHeader);
  const forwarded = bareHost(forwardedHost);
  if (host === WWW) return null;
  const apex = host === APEX || forwarded === APEX;
  if (!apex) return null;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const query = !search ? "" : search.startsWith("?") ? search : `?${search}`;
  return `https://${WWW}${path}${query}`;
}
