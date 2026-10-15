/** Geheugensteun, afgeleid van de bestaande tijdlijn. Geen nieuwe juridische claim. */
export const checklistLines = [
  "Verzuim-checklist voor werkgevers",
  "Geheugensteun, geen advies over een dossier.",
  "Een cao kan het loon anders regelen dan de wet.",
  "",
  "[ ] Dag 1. Ziekmelding vastgelegd.",
  "Vraag naar werk dat nog kan, niet naar de diagnose.",
  "Spreek het volgende contactmoment af.",
  "",
  "[ ] Eerste week. Contact over taken die wel kunnen.",
  "Leg afspraken vast.",
  "Schakel de bedrijfsarts in volgens uw eigen contract.",
  "",
  "[ ] Rond week 6. Probleemanalyse aanwezig:",
  "wat iemand nog kan, en hoe lang dat naar verwachting duurt.",
  "",
  "[ ] Rond week 8. Plan van aanpak.",
  "Activiteiten, eigenaar en evaluatiemoment. Beide tekenen.",
  "",
  "[ ] Week 42. Ziekmelding melden bij UWV.",
  "Te laat melden geeft administratieve rompslomp.",
  "",
  "[ ] Week 52. Eerstejaarsevaluatie op de kalender.",
  "",
  "[ ] Week 88 tot 93. Datum van de WIA-aanvraag bewaken.",
  "Te laat aanvragen verlengt het opzegverbod.",
  "",
  "[ ] Week 104. Einde van de loondoorbetaling in beginsel.",
  "UWV toetst of de re-integratie voldoende was.",
  "",
  "Loon: minstens 70 procent, 104 weken, tenzij cao of",
  "contract meer zegt. Bron: Burgerlijk Wetboek 7:629.",
  "UWV toetst het re-integratieverslag.",
  "De bedrijfsarts zit niet in het uurtarief van de casemanager.",
  "Meer: de tijdlijn op arbopartnerbrabant.nl.",
];

export const checklistText = checklistLines.join("\n");

export const checklistGroups = [
  {
    when: "Dag 1",
    text: "De ziekmelding staat vast. U vraagt naar werk dat nog kan, niet naar de diagnose, en u spreekt het volgende contactmoment af.",
  },
  {
    when: "Eerste week",
    text: "Er is contact over taken die wel kunnen. Afspraken staan op papier. De bedrijfsarts gaat in volgens uw eigen contract, niet op gevoel.",
  },
  {
    when: "Rond week 6",
    text: "Er hoort een probleemanalyse te liggen: wat iemand nog kan, en hoe lang de beperkingen naar verwachting duren.",
  },
  {
    when: "Rond week 8",
    text: "Een plan van aanpak: welke activiteiten, wie doet wat, wanneer u evalueert. Beide partijen tekenen.",
  },
  {
    when: "Week 42",
    text: "U meldt de ziekmelding bij UWV. Te laat melden geeft administratieve rompslomp. Dit is iets anders dan een inhoudelijke loonsanctie.",
  },
  {
    when: "Week 52",
    text: "Eerstejaarsevaluatie. Wat is er gebeurd, wat lukt niet, en moet ander werk buiten het bedrijf starten?",
  },
  {
    when: "Week 88 tot 93",
    text: "De WIA-aanvraag. Te laat aanvragen verlengt het opzegverbod. U helpt de medewerker de datum niet te missen.",
  },
  {
    when: "Week 104",
    text: "De loondoorbetalingsperiode stopt in beginsel. UWV toetst of de re-integratie voldoende was. Bij tekorten kan nog maximaal 52 weken loon volgen.",
  },
];
