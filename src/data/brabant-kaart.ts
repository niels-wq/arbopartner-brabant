/** Provinciegrens: cartomap provincie_2025, vereenvoudigde CBS-lijn. Coördinaten zijn stadscentra. */
export const brabantKaart = {
  width: 720,
  height: 560,
  path: "M612.6 201.5L608.5 201.2L584.2 203.5L572.4 201.2L568 196.8L557.9 194.7L555.2 191.4L542.7 188L535.2 180.6L519.7 177.2L509.2 177.9L503.5 181.9L484.9 177.5L480.9 182.2L469.1 183.9L456.6 180.2L445.4 190.7L440.4 202.5L420.8 208.6L416.4 207.6L403.6 209.6L393.8 206.6L375.9 206.6L367.4 203.9L367.4 196.4L353.2 191.4L343.5 193.7L337 188L326.2 184.6L320.8 180.2L299.2 177.9L283.4 180.9L268.8 187.6L252.3 187.3L244.5 189.7L238.1 193.4L232 202.2L211.1 213L200.6 214.7L198.3 215.3L197.9 215.3L186.4 222.1L161.1 226.1L148.6 226.8L127 222.1L119.6 221.4L116.2 223.1L114.2 231.5L101.4 238.6L90.2 239.3L63.2 243.4L55.4 245.4L48 251.8L48 256.9L60.2 267L62.9 274.1L57.1 286.9L76.4 313.9L72.3 317L73.7 327.8L76.7 330.5L96.3 329.8L98.3 336.6L113.2 337.9L125.7 334.2L129 330.8L115.5 319.7L117.2 308.2L113.2 305.8L132.4 299.1L147.6 296.4L164.8 294.7L168.2 297.7L162.1 305.5L163.8 314.6L177.3 311.2L195.9 313.6L209.4 313.6L208.4 307.5L217.2 304.8L229.3 294L237.4 288.6L258.4 290.3L260.4 294.4L266.8 295.7L265.5 301.8L261.1 305.8L263.1 314.6L248.9 311.2L242.2 311.9L243.5 317.3L249.6 319.3L266.8 317.3L282.3 316.6L296.9 323.7L308.3 314.9L322.2 307.2L324.5 298.1L328.3 294.7L336.4 298.4L347.5 298.4L356.3 311.9L344.8 324.7L360.3 335.5L365.4 340.3L366.1 350.7L375.9 352.8L388.4 348.4L402.5 354.5L397.1 366.9L401.2 369.3L409.6 367.3L420.8 369.3L434.3 368.6L437.7 364.2L461.6 369L470.1 362.2L477.8 361.2L483.9 356.1L495.1 357.8L509.2 369L508.2 375.1L511.9 382.8L529.8 380.1L532.2 364.9L547.7 351.1L615.9 338.2L635.2 327.4L615.3 305.5L611.6 291.3L608.9 287.3L603.8 266.3L621.7 268.4L627.1 271.1L636.5 270.4L659.8 265L669.3 271.1L672 260.9L667.3 256.2L665.2 247.4L649 239.3L646 235.6L646.7 229.2L643.3 218L624.7 214.3L619.7 211.6L618 204.2L612.6 201.5Z",
  bron: "Provinciegrens via cartomap (provincie 2025), een vereenvoudigde lijn van de CBS-gebiedsindeling. Stippen zijn stadscentra, geen meting.",
} as const;

export type KaartStad = {
  slug: string;
  name: string;
  x: number;
  y: number;
  kind: "kantoor" | "stad" | "klein" | "rand";
  label?: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
};

export const kaartSteden: KaartStad[] = [
  { slug: "den-bosch", name: "Den Bosch", x: 423.4, y: 221.8, kind: "stad", label: { dx: 0, dy: -14, anchor: "middle" } },
  { slug: "eindhoven", name: "Eindhoven", x: 479.4, y: 308.3, kind: "stad", label: { dx: 0, dy: 20, anchor: "middle" } },
  { slug: "tilburg", name: "Tilburg", x: 351.7, y: 269.9, kind: "stad", label: { dx: 0, dy: 20, anchor: "middle" } },
  { slug: "breda", name: "Breda", x: 242.6, y: 264.3, kind: "stad", label: { dx: 0, dy: 20, anchor: "middle" } },
  { slug: "helmond", name: "Helmond", x: 542.7, y: 295.6, kind: "stad", label: { dx: 12, dy: 4, anchor: "start" } },
  { slug: "oss", name: "Oss", x: 495.9, y: 199.1, kind: "stad", label: { dx: 0, dy: -14, anchor: "middle" } },
  { slug: "uden", name: "Uden", x: 529.8, y: 234.3, kind: "kantoor", label: { dx: 12, dy: -2, anchor: "start" } },
  { slug: "veghel", name: "Veghel", x: 506, y: 249.2, kind: "stad", label: { dx: -12, dy: 16, anchor: "end" } },
  { slug: "roosendaal", name: "Roosendaal", x: 140.3, y: 278.2, kind: "stad", label: { dx: 0, dy: -14, anchor: "middle" } },
  { slug: "bergen-op-zoom", name: "Bergen op Zoom", x: 81.7, y: 290.3, kind: "stad", label: { dx: 0, dy: 22, anchor: "start" } },
  { slug: "waalwijk", name: "Waalwijk", x: 344.7, y: 227, kind: "stad", label: { dx: 0, dy: -14, anchor: "middle" } },
  { slug: "oosterhout", name: "Oosterhout", x: 273.4, y: 239.6, kind: "stad", label: { dx: 0, dy: -14, anchor: "middle" } },
  { slug: "boxmeer", name: "Boxmeer", x: 640.6, y: 239.3, kind: "klein" },
  { slug: "cuijk", name: "Cuijk", x: 617.6, y: 210.9, kind: "klein" },
  { slug: "schijndel", name: "Schijndel", x: 466.4, y: 247.4, kind: "klein" },
  { slug: "boxtel", name: "Boxtel", x: 431.9, y: 257.9, kind: "klein" },
  { slug: "veldhoven", name: "Veldhoven", x: 456.6, y: 316.3, kind: "klein" },
  { slug: "best", name: "Best", x: 452.5, y: 285.9, kind: "klein" },
  { slug: "grave", name: "Grave", x: 571, y: 201.2, kind: "klein" },
  { slug: "gemert", name: "Gemert", x: 554.2, y: 269.7, kind: "klein" },
  { slug: "deurne", name: "Deurne", x: 589.3, y: 300.8, kind: "klein" },
  { slug: "nijmegen", name: "Nijmegen", x: 608.2, y: 172.8, kind: "rand", label: { dx: 0, dy: -12, anchor: "middle" } },
];
