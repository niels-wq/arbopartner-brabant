export type TeamGroup = "matchvermogen" | "best-match";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  group: TeamGroup;
  widths: number[];
  width: number;
  height: number;
  bio: string | null;
  alt: string;
};

export const teamSource = "https://matchvermogen.nl/over-matchvermogen/";

const nielsBio =
  "Matchvermogen is opgericht in 2019 door Niels Alderding met als doel om arbeidsdeskundig onderzoek kwalitiever en innovatiever uit te voeren. Niels Alderding heeft een achtergrond als casemanager, Lean Six Sigma, WGA en Ziektewet ERD consultant en is erkend rechtshulpverlener UWV. Deze specialismen worden geaccentueerd in de dienstverlening van Matchvermogen om de beste match naar arbeidsvermogen te realiseren.";

function member(
  slug: string,
  name: string,
  role: string,
  group: TeamGroup,
  widths: number[],
  width: number,
  height: number,
  bio: string | null = null,
): TeamMember {
  const org = group === "matchvermogen" ? "Matchvermogen" : "Best Match Re-integratie";
  return {
    slug,
    name,
    role,
    group,
    widths,
    width,
    height,
    bio,
    alt: `${name}, ${role} bij ${org} in Uden`,
  };
}

/** Namen, functies en foto's van matchvermogen.nl/over-matchvermogen/, geraadpleegd op 15 oktober 2026. */
export const team: TeamMember[] = [
  member("sandra-ruiter", "Sandra Ruiter", "Arbeidsdeskundige", "matchvermogen", [400], 400, 400),
  member("niels-alderding", "Niels Alderding", "Directeur, arbeidsdeskundige", "matchvermogen", [480, 960], 960, 1200, nielsBio),
  member("ronald-berens", "Ronald Berens", "Arbeidsdeskundige", "matchvermogen", [400], 400, 400),
  member("audrey-regterschot", "Audrey Regterschot", "Arbeidsdeskundige", "matchvermogen", [400], 400, 400),
  member("frank-van-haarlem", "Frank van Haarlem", "Arbeidsdeskundige", "matchvermogen", [400], 400, 400),
  member("bert-pols", "Bert Pols", "Arbeidsdeskundige", "matchvermogen", [400], 400, 400),
  member("michelle-manders", "Michelle Manders", "Office manager", "matchvermogen", [480, 600], 600, 600),
  member("bas-alderding", "Bas Alderding", "Directeur Sevenlab en Arbeid.AI", "matchvermogen", [400], 400, 404),
  member("dwight-peters", "Dwight Peters", "Spoor 1, 2 en 3 coach", "matchvermogen", [480, 960], 960, 1200),
  member("judith-verrijken", "Judith Verrijken", "Office manager", "best-match", [480, 960], 960, 1200),
  member("niels-de-groot", "Niels de Groot", "Directeur NDG en Best Match", "best-match", [480, 960], 960, 1200),
  member("paul-goomans", "Paul Goomans", "Spoor 1, 2 en 3 coach", "best-match", [480, 960], 960, 1200),
  member("manouk-schaminee", "Manouk Schaminée", "Spoor 1, 2 en 3 coach", "best-match", [384], 384, 339),
  member("frank-van-der-lugt", "Frank van der Lugt", "Accountmanager", "best-match", [480, 960], 960, 1200),
  member("elsemiek-corvers", "Elsemiek Corvers", "Operationele manager", "best-match", [480, 960], 960, 1200),
  member("chaib-lajlufi", "Chaib Lajlufi", "Re-integratiecoach", "best-match", [474], 474, 474),
  member("caroline-krul", "Caroline Krul", "Re-integratiecoach", "best-match", [480, 800], 800, 800),
  member("dian-smulders", "Dian Smulders", "Re-integratiecoach", "best-match", [480, 960], 960, 1200),
  member("coos-balhmann", "Coos Balhmann", "Re-integratiecoach", "best-match", [480, 960], 960, 1200),
  member("maaike-cornelissen", "Maaike Cornelissen", "Backofficemedewerker", "best-match", [381], 381, 367),
  member("julian-herben", "Julian Herben", "Re-integratiecoach", "best-match", [400], 400, 398),
];

export const matchvermogenTeam = team.filter((person) => person.group === "matchvermogen");
export const bestMatchTeam = team.filter((person) => person.group === "best-match");

export function groupTitle(group: TeamGroup): string {
  return group === "matchvermogen" ? "Matchvermogen" : "Best Match Re-integratie";
}
