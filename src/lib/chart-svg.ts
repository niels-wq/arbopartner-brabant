const tones = {
  green: "#0c3b27",
  ochre: "#8a6124",
  clay: "#8c3d2a",
} as const;

export type ChartBar = {
  label: string;
  value: number;
  tone?: keyof typeof tones;
};

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    if (char === '"') return "&quot;";
    return "&#39;";
  });
}

export function barChart(title: string, bars: ChartBar[]): string {
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  const width = 640;
  const row = 44;
  const height = 16 + bars.length * row;
  const rows = bars
    .map((bar, index) => {
      const y = 12 + index * row;
      const span = Math.max(4, Math.round((bar.value / max) * 360));
      const fill = tones[bar.tone ?? "green"];
      return `<text x="0" y="${y + 18}" fill="#1c1915" font-size="14" font-family="Source Sans 3, Segoe UI, sans-serif">${esc(bar.label)}</text><rect x="250" y="${y + 6}" width="360" height="16" rx="8" fill="#e6d7bc"></rect><rect x="250" y="${y + 6}" width="${span}" height="16" rx="8" fill="${fill}"></rect>`;
    })
    .join("");
  return `<svg class="ap-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}" width="${width}" height="${height}">${rows}</svg>`;
}
