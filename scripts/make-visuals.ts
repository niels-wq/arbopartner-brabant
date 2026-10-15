import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { visualIds } from "../src/data/visuals.ts";

const outDir = path.resolve("public/beeld");

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return h >>> 0;
}

function motif(id: string): "chart" | "route" | "document" | "city" | "chairs" | "clock" {
  if (id === "kantoor" || id.includes("advies") || id.includes("contact")) return "chairs";
  if (id.startsWith("plaats-") || id.includes("werkgebied")) return "city";
  if (id.includes("tijdlijn") || id.includes("tweede-spoor") || id.includes("route")) return "route";
  if (id.includes("verzuimkosten") || id.includes("percentage") || id.includes("cbs") || id.includes("tarieven") || id.includes("pakket")) return "chart";
  if (id.includes("checklist") || id.includes("beleid") || id.includes("plan") || id.includes("privacy") || id.includes("voorwaarden")) return "document";
  const motifs = ["chart", "route", "document", "city", "chairs", "clock"] as const;
  return motifs[hash(id) % motifs.length];
}

function icon(kind: ReturnType<typeof motif>, x: number, y: number): string {
  const g = `transform="translate(${x} ${y}) scale(7)" fill="none" stroke="#fbf7f0" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
  if (kind === "chart") return `<g ${g}><path d="M2 18V10M8 18V4M14 18V12M20 18V2"/><path d="M1 20h22"/></g>`;
  if (kind === "route") return `<g ${g}><circle cx="5" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M7 17c4-1 4-8 9-9"/></g>`;
  if (kind === "city") return `<g ${g}><path d="M3 20V9l8-5 8 5v11"/><path d="M9 20v-5h4v5"/></g>`;
  if (kind === "chairs") return `<g ${g}><path d="M2 14h8M6 6v8M3 6h6M14 14h8M18 6v8M15 6h6M8 18h8"/></g>`;
  if (kind === "clock") return `<g ${g}><circle cx="12" cy="12" r="8"/><path d="M12 8v5l4 2"/></g>`;
  return `<g ${g}><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h8M9 16h6"/></g>`;
}

function scene(id: string): string {
  const h = hash(id);
  const kind = motif(id);
  const bars = [0, 1, 2, 3].map((index) => 70 + ((h >> (index * 3)) % 150));
  const shift = (h % 40) - 20;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4ecdf"/>
  <rect width="26" height="630" fill="#12261c"/>
  <circle cx="${860 + shift}" cy="150" r="210" fill="#234833"/>
  <circle cx="${1020 - shift}" cy="520" r="110" fill="#c4923a"/>
  <rect x="78" y="78" width="560" height="474" rx="36" fill="#fffaf3"/>
  <rect x="118" y="128" width="220" height="14" rx="7" fill="#c4923a"/>
  <rect x="118" y="160" width="360" height="10" rx="5" fill="#e6d7bc"/>
  ${bars
    .map((height, index) => {
      const x = 130 + index * 110;
      const y = 430 - height;
      const fill = index === (h % 4) ? "#8c3d2a" : "#0c3b27";
      return `<rect x="${x}" y="${y}" width="72" height="${height}" rx="12" fill="${fill}"/>`;
    })
    .join("\n  ")}
  ${icon(kind, 760 + (h % 30), 70 + (h % 20))}
</svg>`;
}

await mkdir(outDir, { recursive: true });
for (const id of visualIds) {
  const svg = scene(id);
  const source = Buffer.from(svg);
  await writeFile(path.join(outDir, `${id}.svg`), svg);
  for (const width of [640, 1200]) {
    const height = Math.round((width * 630) / 1200);
    const pipeline = () => sharp(source).resize(width, height);
    await pipeline().webp({ quality: 62, effort: 4 }).toFile(path.join(outDir, `${id}-${width}.webp`));
    await pipeline().avif({ quality: 40, effort: 4 }).toFile(path.join(outDir, `${id}-${width}.avif`));
  }
}
console.log(`beelden: ${visualIds.length}`);
