import assert from "node:assert/strict";
import { describe, it } from "node:test";

function channel(hex: string, index: number) {
  const value = parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground: string, background: string) {
  const lum = (hex: string) => 0.2126 * channel(hex, 0) + 0.7152 * channel(hex, 1) + 0.0722 * channel(hex, 2);
  const [hi, lo] = [lum(foreground), lum(background)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

const pairs: [string, string, number, string][] = [
  ["#ffffff", "#0c3b27", 4.5, "primaire knop"],
  ["#ffffff", "#145536", 4.5, "primaire knop hover"],
  ["#ffffff", "#5a2418", 4.5, "urgente knop"],
  ["#ffffff", "#3e1810", 4.5, "urgente knop hover"],
  ["#1a140c", "#f6e4c0", 4.5, "accentknop"],
  ["#1a140c", "#edd3a0", 4.5, "accentknop hover"],
  ["#12261c", "#ffffff", 4.5, "ghostknop"],
  ["#ffffff", "#12261c", 4.5, "ghostknop hover"],
  ["#ffffff", "#1a3326", 4.5, "tekst op groen vlak"],
  ["#f4efe6", "#1a3326", 4.5, "lopende tekst op groen"],
  ["#ffffff", "#5a2418", 4.5, "balk bovenin"],
  ["#5c3d12", "#fbf7f0", 3, "focusring op zand"],
  ["#f6e4c0", "#12261c", 3, "focusring op donker"],
  ["#0c3b27", "#f6e4c0", 4.5, "link op oker"],
  ["#1a140c", "#e6d7bc", 4.5, "badge op zand"],
];

describe("contrast", () => {
  for (const [foreground, background, minimum, label] of pairs) {
    it(`${label} haalt ${minimum}:1`, () => {
      assert.ok(contrast(foreground, background) >= minimum, `${label}: ${contrast(foreground, background).toFixed(2)}`);
    });
  }
});
