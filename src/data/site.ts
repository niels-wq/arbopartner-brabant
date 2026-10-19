const responsePromiseText = "Reactie en offerte binnen 24 uur.";

export const site = {
  name: "Arbopartner Brabant",
  domain: "https://www.arbopartnerbrabant.nl",
  locale: "nl_NL",
  tagline: "Casemanager en arbo in Brabant",
  description:
    "Casemanager en arbo in Noord-Brabant. Arbopartner Brabant detacheert een vaste casemanager voor organisaties met 35–500 medewerkers. Nuchter, dichtbij, Brabants. Het kantoor en de thuisbasis staan in Uden, Losplaats 16d.",
  labelStatement: "Arbopartner Brabant is een label van Matchvermogen",
  minEmployees: 35,
  maxEmployees: 500,
  audience: "voor organisaties met 35–500 medewerkers",
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
    photo: "/mensen/niels-koffie-400.webp",
    photoWidth: 400,
    photoHeight: 336,
    avatar: "/mensen/niels-alderding-avatar.webp",
    photoSource: "https://matchvermogen.nl/wp-content/uploads/2026/09/niels-footer-cta-400.jpg",
  },
  responsePromise: responsePromiseText,
  /** Zelfde termijn als de privacyverklaring van matchvermogen.nl, rubriek contact- en offerteaanvragen. */
  retentionContact:
    "Contact- en offerteaanvragen die niet tot een opdracht leiden, bewaren we maximaal 2 jaar na het laatste contact. Die termijn publiceert Matchvermogen B.V. in de privacyverklaring op matchvermogen.nl.",
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
