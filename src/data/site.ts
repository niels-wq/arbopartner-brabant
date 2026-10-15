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
    geo: {
      lat: 51.655562,
      lon: 5.6240986,
    },
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
  founder: {
    name: "Niels Alderding",
    role: "Directeur, arbeidsdeskundige",
    quote:
      "Geen zin om eerst een heel formulier in te vullen? Plan gewoon een gratis kop koffie in — ik denk graag vrijblijvend met je mee.",
    quoteUrl: "https://www.arbeidsdeskundig.com/over-ons",
    photo: "/mensen/niels-alderding-800.webp",
    avatar: "/mensen/niels-alderding-avatar.webp",
  },
  placeholders: {
    callback:
      "PLACEHOLDER: de terugbeltermijn is nog niet vastgesteld. Bel of app, dan pakt Matchvermogen B.V. uw vraag op.",
    offerteDagen:
      "PLACEHOLDER: het aantal werkdagen waarbinnen u een offerte ontvangt, is nog niet vastgesteld.",
    eigenEmail:
      "PLACEHOLDER: een eigen mailbox voor Arbopartner Brabant is nog niet ingesteld. Mail gaat naar info@matchvermogen.nl.",
    btw: "PLACEHOLDER: het btw-identificatienummer staat niet op matchvermogen.nl.",
    team: "Directe nummers van casemanagers staan niet op de teampagina van matchvermogen.nl. Die verzinnen we niet.",
    agenda:
      "De online agenda is de belafspraak van 15 minuten op calendly.com/matchvermogen/call-15-min. Die link staat op arbeidsdeskundig.com. Een eventtype voor een kantoorgesprek stond niet in de bron van matchvermogen.nl, arbeidsdeskundig.com of werkhervattingskas.nl.",
    bewaartermijn:
      "PLACEHOLDER: de bewaartermijn van formuliergegevens is nog niet vastgesteld.",
    opzegtermijn:
      "PLACEHOLDER: de standaard opzegtermijn van een detacheringsblok is nog niet vastgelegd en staat in de offerte.",
    adresLabel:
      "Het bezoekadres is het openbare kantoor van Matchvermogen B.V. Een apart vestigingsadres voor het label is niet gevonden.",
  },
} as const;

export const officeConversation = {
  place:
    "Een neutrale, rustige plek buiten de werkvloer, met privacy en zonder de druk van de werkgever.",
  threshold:
    "Wie voor het gesprek naar kantoor komt, blijft actief en in beweging. Dat verhoogt de drempel om zich ziek te melden en ondersteunt herstel en re-integratie.",
  employer:
    "Voor de werkgever is het voordeel de kans op minder en korter verzuim. We hangen daar geen cijfer aan.",
  care:
    "Het is een uitnodiging om in beweging te blijven, geen straf. Wie echt niet kan reizen, spreken we op het bedrijf of online.",
} as const;

export const zzpFaq = {
  q: "Werken jullie met zzp-casemanagers?",
  a: "Ja. Naast een vaste kern werken we met een netwerk van gecertificeerde zzp-professionals. Daardoor kunnen we snel opschalen, per casus de juiste specialist inzetten en wisselen als de klik ontbreekt. De namen, functies en foto’s op de teampagina zijn overgenomen van matchvermogen.nl. Die pagina vermeldt niet wie in loondienst is en wie als zzp’er meewerkt. Dat, en de certificering van de ingezette professional, staat in de offerte. Een zzp’er presenteren we niet als medewerker in loondienst.",
} as const;

/** Bellen gaat alleen via het vaste nummer. Het 06-nummer hoort uitsluitend in whatsappHref. */
export const phoneHref = `tel:${site.parent.phoneTel}`;
export const mailHref = `mailto:${site.parent.email}`;
export const whatsappHref = `https://wa.me/${site.parent.whatsappE164}`;

export const officeQuery = `${site.parent.street}, ${site.parent.postalCode} ${site.parent.city}`;
export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeQuery)}`;
export const osmHref = `https://www.openstreetmap.org/?mlat=${site.parent.geo.lat}&mlon=${site.parent.geo.lon}#map=17/${site.parent.geo.lat}/${site.parent.geo.lon}`;

export function osmEmbedSrc(): string {
  const { lat, lon } = site.parent.geo;
  const bbox = [lon - 0.008, lat - 0.005, lon + 0.008, lat + 0.005].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, site.domain).toString().replace(/\/$/, "") || site.domain;
}
