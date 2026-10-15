import { site, absoluteUrl } from "../data/site";
import { places } from "../data/places";

export type Crumb = { name: string; path: string };
export type FaqItem = { q: string; a: string };

export function crumbsLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqLd(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function organizationLd(areaName?: string) {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${site.domain}/#organisatie`,
    name: site.name,
    description: `${site.description} Werknemers en werkgevers kunnen voor gesprekken terecht op het kantoor ${site.parent.street}, ${site.parent.postalCode} ${site.parent.city}. Wie daarheen komt, blijft in beweging. Dat kan verzuim minder en korter maken. We noemen geen percentage. Wie niet kan reizen, spreken we op het bedrijf of online.`,
    url: site.domain,
    telephone: site.parent.phoneTel,
    email: site.parent.email,
    image: absoluteUrl("/og.png"),
    logo: {
      "@type": "ImageObject",
      "@id": `${site.domain}/#logo`,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.svg"),
      width: 756,
      height: 128,
      caption: `${site.name}, een label van Matchvermogen`,
    },
    founder: { "@id": `${site.domain}/#niels-alderding` },
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.parent.street,
      postalCode: site.parent.postalCode,
      addressLocality: site.parent.city,
      addressRegion: site.parent.region,
      addressCountry: site.parent.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.parent.geo.lat,
      longitude: site.parent.geo.lon,
    },
    hasMap: `https://www.openstreetmap.org/?mlat=${site.parent.geo.lat}&mlon=${site.parent.geo.lon}#map=17/${site.parent.geo.lat}/${site.parent.geo.lon}`,
    potentialAction: {
      "@type": "ReserveAction",
      name: "Plan een gesprek op ons kantoor",
      target: absoluteUrl("/adviesgesprek?plek=kantoor"),
    },
    parentOrganization: {
      "@type": "Organization",
      name: site.parent.legalName,
      url: site.parent.url,
      identifier: `KvK ${site.parent.kvk}`,
      taxID: site.parent.btw ?? undefined,
    },
    areaServed: areaName
      ? { "@type": "City", name: areaName }
      : [
          { "@type": "AdministrativeArea", name: "Noord-Brabant" },
          ...places.map((place) => ({ "@type": "City", name: place.name })),
        ],
    knowsLanguage: "nl",
    slogan: site.tagline,
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated: string;
}) {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: "nl-NL",
    datePublished: input.date,
    dateModified: input.updated,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@id": `${site.domain}/#niels-alderding` },
    publisher: {
      "@type": "Organization",
      name: site.parent.legalName,
      url: site.parent.url,
    },
    image: absoluteUrl("/og.png"),
  };
}

export function personLd() {
  return {
    "@type": "Person",
    "@id": `${site.domain}/#niels-alderding`,
    name: site.founder.name,
    jobTitle: site.founder.role,
    description:
      "Oprichter van Matchvermogen B.V. en verantwoordelijk voor de kennisartikelen van het label Arbopartner Brabant. Algemene informatie voor werkgevers, geen advies over één dossier.",
    image: absoluteUrl("/mensen/niels-alderding-800.webp"),
    url: absoluteUrl("/over-ons"),
    worksFor: { "@id": `${site.domain}/#organisatie` },
    sameAs: [site.parent.url, site.founder.quoteUrl],
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
