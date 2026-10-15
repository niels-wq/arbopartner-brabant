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
    description: site.description,
    url: site.domain,
    telephone: site.parent.phoneTel,
    email: site.parent.email,
    image: absoluteUrl("/og.svg"),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.parent.street,
      postalCode: site.parent.postalCode,
      addressLocality: site.parent.city,
      addressRegion: site.parent.region,
      addressCountry: site.parent.country,
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
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.domain,
    },
    publisher: {
      "@type": "Organization",
      name: site.parent.legalName,
      url: site.parent.url,
    },
    image: absoluteUrl("/og.svg"),
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
