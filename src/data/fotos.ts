import type { FotoId as StadId } from "./brabant-fotos";

export type SiteFoto = {
  caption: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  width: number;
  height: number;
};

function team(file: string, caption: string, alt: string): SiteFoto {
  return {
    caption,
    alt,
    author: "Matchvermogen",
    license: "Foto van Matchvermogen",
    licenseUrl: "https://matchvermogen.nl/over-matchvermogen/",
    sourceUrl: `https://matchvermogen.nl/wp-content/uploads/2024/03/${file}`,
    width: 1400,
    height: 933,
  };
}

/** Echte teamfoto's van matchvermogen.nl en rechtenvrije stock. Geen gegenereerde gezichten. */
export const fotos = {
  "gesprek-advies": team(
    "IMGL7934-Verbeterd-NR-1536x1024.jpg",
    "Twee mensen van het team van Matchvermogen in een adviesgesprek.",
    "Twee mensen van het team van Matchvermogen zitten aan een tafel met een laptop. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-bank": team(
    "IMGL7896-1536x1024.jpg",
    "Drie mensen van het team van Matchvermogen in gesprek op een bank.",
    "Drie mensen van het team van Matchvermogen in gesprek op een leren bank. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-documenten": team(
    "IMGL7906-1536x1024.jpg",
    "Twee mensen van het team van Matchvermogen bekijken documenten.",
    "Een man en een vrouw van het team van Matchvermogen bekijken papieren. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-colbert": team(
    "IMGL7837-1536x1024.jpg",
    "Gesprek aan tafel met iemand van het team van Matchvermogen.",
    "Een man en een vrouw van het team van Matchvermogen in gesprek aan een tafel. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "werkplek-laptop": team(
    "IMGL7185-1536x1024.jpg",
    "Iemand van het team van Matchvermogen werkt met een laptop. Dit is geen foto van de gevel van Losplaats 16d.",
    "Iemand van het team van Matchvermogen zit met een laptop in een zitje. Geen foto van de gevel van Losplaats 16d. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-drie": team(
    "IMGL7336-1536x1024.jpg",
    "Drie mensen van het team van Matchvermogen rond een laptop.",
    "Drie mensen van het team van Matchvermogen zitten samen aan een tafel met een laptop. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-twee": team(
    "IMGL7304-1536x1024.jpg",
    "Twee mensen van het team van Matchvermogen in gesprek aan een tafel.",
    "Twee vrouwen van het team van Matchvermogen in gesprek aan een tafel. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "werkplek-notitie": team(
    "IMGL7386-1536x1024.jpg",
    "Iemand van het team van Matchvermogen maakt aantekeningen bij een laptop.",
    "Iemand van het team van Matchvermogen schrijft in een schrift naast een laptop. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-coach": team(
    "IMGL7261-1536x1024.jpg",
    "Gesprek van twee mensen van het team van Matchvermogen.",
    "Een man en een vrouw van het team van Matchvermogen zitten tegenover elkaar. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-bankstel": team(
    "IMGL7197-1536x1024.jpg",
    "Twee mensen van het team van Matchvermogen op een bank.",
    "Een man en een vrouw van het team van Matchvermogen zitten op een bank. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-heren": team(
    "IMGL7379-1536x1024.jpg",
    "Twee mannen van het team van Matchvermogen in gesprek.",
    "Twee mannen van het team van Matchvermogen zitten aan een tafel. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "gesprek-plant": team(
    "IMGL7195-1536x1024.jpg",
    "Drie mensen van het team van Matchvermogen aan een tafel.",
    "Drie mensen van het team van Matchvermogen in gesprek, met een plant op de voorgrond. Foto gepubliceerd op matchvermogen.nl.",
  ),
  "pexels-overleg": {
    caption: "Werkoverleg aan een laptop. Geen opdrachtgever van Arbopartner Brabant.",
    alt: "Een man en een vrouw in een kantooroverleg aan een laptop. Stockfoto, geen opdrachtgever van Arbopartner Brabant.",
    author: "Antoni Shkraba",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    sourceUrl: "https://www.pexels.com/photo/a-man-and-woman-having-a-meeting-in-the-office-5862282/",
    width: 1400,
    height: 934,
  },
  "pexels-team": {
    caption: "Overleg van collega's. Geen opdrachtgever van Arbopartner Brabant.",
    alt: "Collega's in een werkoverleg met laptops. Stockfoto, geen opdrachtgever van Arbopartner Brabant.",
    author: "Yan Krukau",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    sourceUrl: "https://www.pexels.com/photo/colleagues-having-a-meeting-7793719/",
    width: 1400,
    height: 934,
  },
  "pexels-tafel": {
    caption: "Gesprek aan een tafel. Geen opdrachtgever van Arbopartner Brabant.",
    alt: "Drie collega's in gesprek aan een tafel. Stockfoto, geen opdrachtgever van Arbopartner Brabant.",
    author: "Alena Darmel",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    sourceUrl: "https://www.pexels.com/photo/colleagues-having-a-conversation-while-sitting-on-a-table-8134175/",
    width: 1400,
    height: 2100,
  },
  "unsplash-fabriek": {
    caption: "De Van Nellefabriek in Rotterdam. Geen opdrachtgever, en niet in Brabant.",
    alt: "De Van Nellefabriek in Rotterdam, een fabrieksgebouw met trappen. Geen opdrachtgever van Arbopartner Brabant.",
    author: "Pim Menkveld",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    sourceUrl: "https://unsplash.com/photos/i1aXE78if_4",
    width: 1400,
    height: 1750,
  },
  "unsplash-eindhoven": {
    caption: "Het Stratumseind in Eindhoven, 's avonds. Geen foto van een opdrachtgever.",
    alt: "Mensen op het Stratumseind in Eindhoven in de avond. Stockfoto, geen opdrachtgever van Arbopartner Brabant.",
    author: "Omar Ramadan",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    sourceUrl: "https://unsplash.com/photos/people-walking-on-street-during-night-time-RsTgMxSFppI",
    width: 1400,
    height: 1866,
  },
} as const satisfies Record<string, SiteFoto>;

export type FotoId = keyof typeof fotos;

export const dienstFoto = {
  "casemanager-detachering": "gesprek-advies",
  verzuimanalyse: "werkplek-notitie",
  "verzuimbeleid-protocol": "gesprek-documenten",
  "vso-en-ontslagdossier": "gesprek-bankstel",
  "tweede-spoor": "gesprek-drie",
  "arbeidsdeskundig-onderzoek": "gesprek-plant",
  "eerste-spoor": "gesprek-coach",
  "leidinggevenden-training": "gesprek-twee",
  jobcoaching: "gesprek-colbert",
  mediation: "gesprek-heren",
  "wia-begeleiding": "werkplek-laptop",
} as const satisfies Record<string, FotoId>;

export const situatieFoto = {
  "geen-casemanager": "gesprek-advies",
  "aannemen-te-duur": "pexels-overleg",
  "niet-aansturen": "gesprek-twee",
  continuiteit: "gesprek-bank",
  "langdurig-verzuim": "gesprek-documenten",
  loonsanctie: "gesprek-plant",
} as const satisfies Record<string, FotoId>;

export const blogFoto = {
  "verzuim-maakindustrie-brabant": "unsplash-fabriek",
  "burn-out-medewerker-werkgever": "gesprek-bankstel",
  "casemanager-in-dienst-of-detacheren": "pexels-overleg",
  "casemanager-verzuim-inhuren": "gesprek-advies",
  "verzuimpercentage-berekenen": "werkplek-notitie",
  "vragen-aan-zieke-medewerker-avg": "gesprek-documenten",
  "arbeidsconflict-ziekmelding": "gesprek-heren",
  "plan-van-aanpak-verzuim": "gesprek-coach",
  "tweede-spoor-wanneer-wie-betaalt": "gesprek-drie",
  "ziekmelding-werknemer-eerste-week": "gesprek-colbert",
  "kosten-zieke-werknemer-per-dag": "pexels-team",
  "eerstejaarsevaluatie-checklist": "werkplek-laptop",
  "arbeidsdeskundige-inschakelen": "gesprek-plant",
  "verzuimbeleid-opstellen": "gesprek-twee",
  "frequent-verzuim-aanpakken": "gesprek-coach",
  "casemanager-of-arbodienst": "pexels-tafel",
  "loonsanctie-uwv-voorkomen": "gesprek-bank",
} as const satisfies Record<string, FotoId>;

export function fotoVoorDienst(slug: string): FotoId {
  const id = (dienstFoto as Record<string, FotoId>)[slug];
  if (!id) throw new Error(`geen foto voor dienst ${slug}`);
  return id;
}

export function fotoVoorSituatie(slug: string): FotoId {
  const id = (situatieFoto as Record<string, FotoId>)[slug];
  if (!id) throw new Error(`geen foto voor situatie ${slug}`);
  return id;
}

export function fotoVoorBlog(id: string): FotoId | undefined {
  return (blogFoto as Record<string, FotoId>)[id];
}

export const blogStad = {
  "verzuimbegeleiding-den-bosch": "den-bosch",
  "verzuimbegeleiding-uden-veghel": "uden",
  "verzuimbegeleiding-eindhoven-helmond": "eindhoven",
} as const satisfies Record<string, StadId>;
