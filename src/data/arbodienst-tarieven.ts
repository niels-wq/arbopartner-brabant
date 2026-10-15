/** Gepubliceerde uurtarieven van andere organisaties. Geen gemiddelde en niet ons tarief.
 *  Geraadpleegd op 15 oktober 2026. Bedragen zoals in de bron, exclusief btw. */

export type ArbodienstTarief = {
  name: string;
  role: string;
  year: string;
  rate: number;
  url: string;
  note: string;
};

export const arbodienstUurtarieven: ArbodienstTarief[] = [
  {
    name: "ArboAnders",
    role: "Begeleiding adviseur arbeid en verzuim",
    year: "2026",
    rate: 133,
    url: "https://arboanders.nl/wp-content/uploads/2025/09/Tarieven-2026-v2-website.pdf",
    note: "Tarievenlijst 2026, versie 24 september 2025.",
  },
  {
    name: "Arbo Werkt",
    role: "Casemanager verzuimregie",
    year: "2025",
    rate: 145,
    url: "https://www.arbowerkt.nl/wp-content/uploads/2024/12/BrochureArboWerkt2025.pdf",
    note: "Brochure 2025. Het tarief wordt jaarlijks geïndexeerd. Reiskosten staan apart.",
  },
  {
    name: "FIT Verzuimbeheer",
    role: "Casemanager",
    year: "2026",
    rate: 159.9,
    url: "https://fitverzuimbeheer.nl/wp-content/uploads/2025/11/TARIEVEN-OVERZICHT-2026.pdf",
    note: "Tarievenoverzicht 2026, voor de eerste 104 weken van verzuimbegeleiding.",
  },
  {
    name: "Consense Arbo",
    role: "Arbodienstverlening",
    year: "2025",
    rate: 135,
    url: "https://www.kmuverzekeringen.nl/wp-content/uploads/2025/01/2025-dvo-wn-consense-arbo-casemanagementpakket-readirekt.pdf",
    note: "DVO 2025 via KMU. Het uurtarief voor arbodienstverlening, exclusief 21% btw.",
  },
];
