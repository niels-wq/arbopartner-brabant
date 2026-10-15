/**
 * Enige calendly.com-eventlink in de bron van arbeidsdeskundig.com
 * (initPopupWidget en de hrefs naar call-15-min).
 * matchvermogen.nl noemt geen eventlink. werkhervattingskas.nl heeft
 * calendlyUrl leeg. Een eventtype voor een kantoorgesprek stond in die
 * bronnen niet. Die link verzinnen we niet.
 */
export const calendlyKennismaking = {
  id: "kennismaking",
  url: "https://calendly.com/matchvermogen/call-15-min",
  minutes: 15,
  label: "Plan direct een gesprek",
  note: "Dit plant een belafspraak van 15 minuten. Voor een adviesgesprek van 30 minuten, op het kantoor in Uden of bij u, gebruikt u het formulier.",
} as const;

export const calendlyWidgetScript = "https://assets.calendly.com/assets/external/widget.js";
export const calendlyWidgetCss = "https://assets.calendly.com/assets/external/widget.css";

type Scheduled = { event: "calendly.event_scheduled"; calendly_event?: string };

export function calendlyEventFromMessage(origin: string, data: unknown): Scheduled | null {
  if (origin !== "https://calendly.com") return null;
  if (!data || typeof data !== "object") return null;
  const message = data as { event?: unknown; payload?: { event?: { uri?: unknown } } };
  if (message.event !== "calendly.event_scheduled") return null;
  const uri = message.payload?.event?.uri;
  const hit: Scheduled = { event: "calendly.event_scheduled" };
  if (typeof uri === "string" && uri.startsWith("https://")) hit.calendly_event = uri;
  return hit;
}
