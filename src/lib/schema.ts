import { site, absoluteUrl } from "../data/site";
import { gemeenten } from "../data/gemeenten";
import { team, type TeamMember } from "../data/team";

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
    // Vast nummer. Het 06-nummer is alleen een WhatsApp-link en hoort hier niet.
    telephone: site.parent.phoneTel,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.parent.phoneTel,
      contactType: "customer service",
      availableLanguage: "Dutch",
    },
    email: site.parent.email,
    image: absoluteUrl("/og.png"),
    logo: {
      "@type": "ImageObject",
      "@id": `${site.domain}/#logo`,
      url: absoluteUrl("/logo.png"),
      contentUrl: absoluteUrl("/logo.svg"),
      width: 892,
      height: 256,
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
      taxID: site.parent.btw,
      vatID: site.parent.btw,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Noord-Brabant" },
      ...gemeenten.map((name) => ({ "@type": "AdministrativeArea", name })),
      ...(areaName && !gemeenten.includes(areaName as (typeof gemeenten)[number])
        ? [{ "@type": "City", name: areaName }]
        : []),
    ],
    knowsLanguage: "nl",
    slogan: site.tagline,
    audience: audienceLd(),
  };
}

/** Lokale dienstpagina. NAP is het kantoor in Uden. Telefoon is alleen het vaste nummer. */
export function areaServiceLd(input: {
  name: string;
  path: string;
  description: string;
  areaName: string;
  areaType?: "City" | "AdministrativeArea";
}) {
  return {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${absoluteUrl(input.path)}#lokale-dienst`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    telephone: site.parent.phoneTel,
    email: site.parent.email,
    image: absoluteUrl("/og.png"),
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
    parentOrganization: { "@id": `${site.domain}/#organisatie` },
    areaServed: [
      { "@type": input.areaType ?? "City", name: input.areaName },
      { "@type": "AdministrativeArea", name: "Noord-Brabant" },
    ],
    priceRange: "€€",
    knowsLanguage: "nl",
  };
}

export function audienceLd() {
  return {
    "@type": "BusinessAudience",
    audienceType: site.audience,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: site.minEmployees,
      maxValue: site.maxEmployees,
      unitText: "medewerkers",
    },
  };
}

export function articleLd(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated: string;
  image?: string;
  /** Zet een praktijkvoorbeeld apart van een blogartikel, zonder er een review van te maken. */
  section?: string;
}) {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    inLanguage: "nl-NL",
    datePublished: input.date,
    dateModified: input.updated,
    mainEntityOfPage: absoluteUrl(input.path),
    ...(input.section ? { articleSection: input.section, genre: input.section } : {}),
    author: { "@id": `${site.domain}/#niels-alderding` },
    publisher: {
      "@type": "Organization",
      name: site.parent.legalName,
      url: site.parent.url,
    },
    image: input.image ?? absoluteUrl("/og.png"),
  };
}

function personNode(member: TeamMember) {
  const largest = member.widths[member.widths.length - 1];
  const niels = member.slug === "niels-alderding";
  return {
    "@type": "Person",
    "@id": niels ? `${site.domain}/#niels-alderding` : `${site.domain}/#${member.slug}`,
    name: member.name,
    jobTitle: member.role,
    description: niels
      ? `${member.bio} Hij is verantwoordelijk voor de kennisartikelen van het label Arbopartner Brabant. Algemene informatie voor werkgevers, geen advies over één dossier.`
      : `${member.name} staat op de teampagina van matchvermogen.nl als ${member.role}. Een langere bio publiceert die pagina niet.`,
    image: absoluteUrl(`/mensen/${member.slug}-${largest}.webp`),
    url: absoluteUrl(niels ? "/over-ons" : "/team"),
    worksFor: niels
      ? { "@id": `${site.domain}/#organisatie` }
      : member.group === "matchvermogen"
        ? { "@type": "Organization", name: site.parent.legalName, url: site.parent.url }
        : { "@type": "Organization", name: "Best Match Re-integratie", url: "https://bestmatchbv.nl" },
    ...(niels ? { sameAs: [site.parent.url, site.founder.quoteUrl, "https://matchvermogen.nl/over-matchvermogen/"] } : {}),
  };
}

export function personLd() {
  const niels = team.find((member) => member.slug === "niels-alderding");
  if (!niels) throw new Error("Niels ontbreekt in het team");
  return personNode(niels);
}

export function teamPeopleLd() {
  return team.filter((member) => member.slug !== "niels-alderding").map((member) => personNode(member));
}

export function jobPostingLd() {
  return {
    "@type": "JobPosting",
    title: "Casemanager verzuim, in dienst",
    description:
      "Casemanager in loondienst bij Matchvermogen B.V. voor verzuimbegeleiding bij werkgevers in Noord-Brabant. Het kantoor en de thuisbasis staan aan de Losplaats 16d in Uden. Het werk kan daar, bij de werkgever of online. Salaris en uren per week staan niet in deze vacature. Die spreken we af in de procedure. Solliciteren kan direct op de pagina Werken bij.",
    datePosted: "2026-10-15",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: site.parent.legalName,
      sameAs: site.parent.url,
      logo: absoluteUrl("/logo.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.parent.street,
        postalCode: site.parent.postalCode,
        addressLocality: site.parent.city,
        addressRegion: site.parent.region,
        addressCountry: site.parent.country,
      },
    },
    applicantLocationRequirements: {
      "@type": "AdministrativeArea",
      name: "Noord-Brabant",
    },
    url: absoluteUrl("/werken-bij"),
  };
}

export function graph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
