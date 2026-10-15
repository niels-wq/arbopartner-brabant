export const site = {
  name: "Arbopartner Brabant",
  domain: "https://www.arbopartnerbrabant.nl",
  locale: "nl_NL",
  tagline: "Een vast gezicht voor verzuim in Brabant",
  description:
    "Arbopartner Brabant is een label van Matchvermogen. Wij detacheren een vaste casemanager bij werkgevers met 35 of meer medewerkers, binnen ongeveer 45 minuten van Uden.",
  labelStatement: "Arbopartner Brabant is een label van Matchvermogen",
  minEmployees: 35,
  travelMinutes: 45,
  parent: {
    legalName: "Matchvermogen B.V.",
    tradeName: "Matchvermogen",
    url: "https://matchvermogen.nl",
    kvk: "85849618",
    btw: null as string | null,
    email: "info@matchvermogen.nl",
    phoneDisplay: "085-0870307",
    phoneTel: "+31850870307",
    whatsappE164: "31650213593",
    whatsappDisplay: "06-50213593",
    street: "Losplaats 16d",
    postalCode: "5404 NJ",
    city: "Uden",
    region: "Noord-Brabant",
    country: "NL",
  },
  sisters: [
    {
      name: "Matchvermogen",
      url: "https://matchvermogen.nl",
      role: "Arbeidsdeskundig onderzoek, bezwaar en advies",
    },
    {
      name: "Best Match",
      url: "https://bestmatchbv.nl",
      role: "Tweede spoor en re-integratie",
    },
    {
      name: "Werkhervattingskas.nl",
      url: "https://werkhervattingskas.nl",
      role: "WHK-beschikkingen en premie",
    },
    {
      name: "Arbeidsdeskundig.com",
      url: "https://www.arbeidsdeskundig.com",
      role: "Zustermerk voor arbeidsdeskundig onderzoek",
    },
  ],
  discount: {
    arbeidsdeskundige: 8,
    tweedeSpoor: 10,
  },
  adviesMinuten: 30,
  placeholders: {
    callback:
      "PLACEHOLDER: de terugbeltermijn is nog niet vastgesteld. Bel of app, dan pakt Matchvermogen B.V. uw vraag op.",
    offerteDagen:
      "PLACEHOLDER: het aantal werkdagen waarbinnen u een offerte ontvangt, is nog niet vastgesteld.",
    eigenEmail:
      "PLACEHOLDER: een eigen mailbox voor Arbopartner Brabant is nog niet ingesteld. Mail gaat naar info@matchvermogen.nl.",
    btw: "PLACEHOLDER: het btw-identificatienummer staat niet op matchvermogen.nl.",
    team: "PLACEHOLDER: namen, foto’s en directe nummers van casemanagers publiceren we pas na hun akkoord.",
    agenda: "PLACEHOLDER: er is nog geen online agendalink voor het adviesgesprek.",
    bewaartermijn:
      "PLACEHOLDER: de bewaartermijn van formuliergegevens is nog niet vastgesteld.",
    opzegtermijn:
      "PLACEHOLDER: de standaard opzegtermijn van een detacheringsblok is nog niet vastgelegd en staat in de offerte.",
    adresLabel:
      "Het bezoekadres is het openbare kantoor van Matchvermogen B.V. Een apart vestigingsadres voor het label is niet gevonden.",
  },
} as const;

export const phoneHref = `tel:${site.parent.phoneTel}`;
export const mailHref = `mailto:${site.parent.email}`;
export const whatsappHref = `https://wa.me/${site.parent.whatsappE164}`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, site.domain).toString().replace(/\/$/, "") || site.domain;
}
