import { services } from "../data/services";
import { site, absoluteUrl, zzpFaq } from "../data/site";
import type { FaqItem } from "./schema";

const shared: FaqItem[] = [
  {
    q: "Wat is Arbopartner Brabant?",
    a: "Arbopartner Brabant is een label van Matchvermogen B.V. Het detacheert een vaste casemanager bij werkgevers met 35 of meer medewerkers, binnen ongeveer 45 minuten van Uden. Het label is geen arbodienst.",
  },
  {
    q: "Hoe neemt u contact op?",
    a: `Bel ${site.parent.phoneDisplay}, app ${site.parent.whatsappDisplay} of mail ${site.parent.email}. Een adviesgesprek duurt 30 minuten en verplicht u tot niets. Werknemer en werkgever kunnen ook op het kantoor komen: ${site.parent.street}, ${site.parent.postalCode} ${site.parent.city}.`,
  },
];

const byPath: Record<string, FaqItem[]> = {
  "/adviesgesprek": [
    {
      q: "Is het adviesgesprek gratis?",
      a: "Ja. Het gesprek duurt 30 minuten. U hoeft geen pakket af te nemen. Het kan op het kantoor aan de Losplaats 16d in Uden, bij u op het bedrijf of online. Voor de begeleiding zelf komen werknemers naar dat kantoor. Wie daarheen komt, blijft in beweging. Dat verhoogt de drempel om zich ziek te melden en kan verzuim minder en korter maken. We noemen geen percentage. Wie echt niet kan reizen, spreken we op het bedrijf of online.",
    },
    ...shared,
  ],
  "/contact": shared,
  "/werken-bij": [
    {
      q: "Kan ik me aanmelden als zzp-casemanager?",
      a: "Ja. Het formulier heeft een traject voor zzp, met KvK en uurtarief. De teampagina vermeldt niet wie in loondienst is en wie als zzp'er meewerkt. Dat staat in de offerte aan de opdrachtgever.",
    },
    {
      q: "Staat het salaris van de baan in dienst hier?",
      a: "Nee. Salaris en uren spreken we af in de procedure. Deze pagina noemt geen bedrag.",
    },
    shared[0],
  ],
  "/offerte": [
    {
      q: "Wanneer krijg ik een offerte?",
      a: site.placeholders.offerteDagen,
    },
    shared[0],
  ],
  "/diensten": [
    {
      q: "Welke dienst is de kern?",
      a: "Een vaste gedetacheerde casemanager. Verzuimanalyse, protocol, dossier bij vertrek, tweede spoor en arbeidsdeskundig onderzoek komen daar omheen.",
    },
    shared[0],
  ],
  "/pakketten": [
    {
      q: "Wat is het verschil tussen Basis, Premium en Pro?",
      a: "Basis is 10 uur per week, Premium 20 uur met een verzuimanalyse in jaar 1, Pro 24 uur of meer. Per pakket kiest u medior, medior+ of senior.",
    },
    shared[1],
  ],
  "/tools": [
    {
      q: "Zijn de tools een offerte?",
      a: "Nee. Het zijn rekenhulpen met bronnen. De uitkomst is een scenario, geen prijsafspraak.",
    },
    shared[0],
  ],
  "/blog": [
    {
      q: "Voor wie zijn de artikelen?",
      a: "Voor werkgevers die verzuim en re-integratie willen begrijpen. Het is algemene informatie, geen advies over één dossier.",
    },
    shared[0],
  ],
  "/werkgebied": [
    {
      q: "Waar werken jullie?",
      a: "Binnen ongeveer 45 minuten rijden van Uden, in Noord-Brabant en de rand daarvan. De reistijd zit in het tarief.",
    },
    shared[0],
  ],
  "/reviews": [
    {
      q: "Van wie zijn de reviews?",
      a: "Van Matchvermogen, het moederbedrijf. Ze staan letterlijk op matchvermogen.nl en gaan niet over dit nieuwe label.",
    },
    shared[0],
  ],
  "/team": [
    zzpFaq,
    {
      q: "Waarom heeft niet iedereen een bio?",
      a: "Matchvermogen publiceert op de teampagina naam, functie en foto. Een langere tekst staat daar alleen bij Niels Alderding. Die tekst nemen we over. Voor de anderen verzinnen we geen bio.",
    },
  ],
  "/privacy": [
    {
      q: "Wie verwerkt formuliergegevens?",
      a: "Matchvermogen B.V., Losplaats 16d, 5404 NJ Uden. Formulieren gaan naar info@matchvermogen.nl.",
    },
    shared[1],
  ],
  "/voorwaarden": [
    {
      q: "Zijn de voorwaarden definitief?",
      a: "Nee. Het is een concept voor een label dat nog niet live is. Laat de tekst juridisch toetsen voordat u erop contracteert.",
    },
    shared[0],
  ],
  "/tools/tijdlijn-ziekteverzuim": [
    {
      q: "Is de tijdlijn juridisch advies?",
      a: "Nee. Het is een geheugensteun. Een cao kan het loon in het eerste en tweede ziektejaar anders regelen dan het wettelijk minimum van 70%.",
    },
    shared[0],
  ],
  "/tools/loonsanctie-check": [
    {
      q: "Voorspelt de check een loonsanctie?",
      a: "Nee. Zeven vragen laten gaten in een dossier zien. UWV doet de beoordeling, wij niet.",
    },
    shared[0],
  ],
  "/tools/verzuim-vergelijken": [
    {
      q: "Waar komen de percentages vandaan?",
      a: "CBS StatLine 2025: 5,4% landelijk, 4,7% bij 10 tot 100 werknemers en 6,0% bij 100 of meer.",
    },
    shared[0],
  ],
};

export function faqForPath(pathname: string): FaqItem[] {
  const path = pathname.replace(/\/$/, "") || "/";
  if (byPath[path]) return byPath[path];
  if (path.startsWith("/pakketten/")) return byPath["/pakketten"];
  if (path.startsWith("/werkgebied/")) return byPath["/werkgebied"];
  if (path.startsWith("/blog/")) return byPath["/blog"];
  if (path.startsWith("/diensten/")) return byPath["/diensten"];
  return shared;
}

export function serviceNodesForPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") {
    return [{
      "@type": "Service",
      name: "Gedetacheerde casemanager",
      description: site.description,
      url: absoluteUrl("/diensten"),
      serviceType: "Verzuimbegeleiding",
      provider: { "@id": `${site.domain}/#organisatie` },
      areaServed: { "@type": "AdministrativeArea", name: "Noord-Brabant" },
    }];
  }
  const list = path === "/diensten"
    ? services
    : services.filter((service) => path === `/diensten/${service.slug}`);
  return list.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/diensten/${service.slug}`),
    serviceType: "Verzuimbegeleiding",
    provider: { "@id": `${site.domain}/#organisatie` },
    areaServed: { "@type": "AdministrativeArea", name: "Noord-Brabant" },
  }));
}

export function howToForPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/welke-casemanager") {
    return [{
      "@type": "HowTo",
      name: "Kies een casemanager",
      description: "Acht vragen geven een richtadvies voor niveau en uurblok. Geen offerte.",
      totalTime: "PT5M",
      step: [
        "Tel het aantal medewerkers.",
        "Zet het verzuimpercentage naast 5,4% (CBS 2025).",
        "Tel dossiers langer dan zes weken.",
        "Kies fysiek, gemengd of psychisch verzuim.",
        "Geef aan of een dossier het einde van jaar 1 of een WIA-aanvraag nadert.",
        "Geef aan of er een sanctie, conflict of arbeidsrechtelijke component speelt.",
        "Kies of u een HR-team, één HR-persoon of geen HR heeft.",
        "Geef aan of een cao of een sectorrisico meespeelt.",
      ].map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `Stap ${index + 1}`,
        text,
      })),
    }];
  }
  if (path === "/tools/tijdlijn-ziekteverzuim") {
    const steps = [
      ["Dag 1", "Meld de ziekte en spreek het volgende contact af. Vraag naar het werk, niet naar de diagnose."],
      ["Eerste week", "Blijf in gesprek over taken die wel kunnen. Schakel de bedrijfsarts in volgens uw contract."],
      ["Rond week 6", "Er hoort een probleemanalyse van de bedrijfsarts te liggen."],
      ["Rond week 8", "Maak een plan van aanpak en laat beide partijen tekenen."],
      ["Week 42", "Meld de ziekmelding bij UWV."],
      ["Week 52", "Evalueer het eerste jaar en bespreek of ander werk buiten het bedrijf nodig is."],
      ["Week 88 tot 93", "Help de medewerker de WIA-aanvraag op tijd te doen."],
      ["Week 104", "De loondoorbetaling stopt in beginsel. UWV toetst de re-integratie."],
    ];
    return [{
      "@type": "HowTo",
      name: "Tijdlijn bij ziekte van een medewerker",
      description: "Geheugensteun van dag 1 tot week 104. Geen juridisch advies.",
      step: steps.map(([name, text], index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name,
        text,
      })),
    }];
  }
  return [];
}
