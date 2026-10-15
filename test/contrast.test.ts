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
  ["#14261c", "#d8a03d", 4.5, "primaire knop"],
  ["#14261c", "#c4923a", 4.5, "primaire knop hover"],
  ["#14261c", "#ffffff", 4.5, "ghostknop"],
  ["#f4f1e8", "#12382c", 4.5, "ghostknop hover"],
  ["#ffffff", "#12382c", 4.5, "tekst op groen vlak"],
  ["#f4f1e8", "#12382c", 4.5, "lopende tekst op groen"],
  ["#f4f1e8", "#163f32", 4.5, "tekst op groen-900"],
  ["#f4f1e8", "#12382c", 4.5, "balk bovenin"],
  ["#8a5a12", "#f3f2ec", 3, "focusring op papier"],
  ["#f4e2b0", "#12382c", 3, "focusring op donker"],
  ["#145c45", "#ffffff", 4.5, "link op wit"],
  ["#145c45", "#f3f2ec", 4.5, "link op papier"],
  ["#3a463f", "#ffffff", 4.5, "lopende tekst op wit"],
  ["#3a463f", "#f3f2ec", 4.5, "lopende tekst op papier"],
  ["#7a4e12", "#f3f2ec", 4.5, "eyebrow"],
  ["#14261c", "#f8e7c4", 4.5, "tekst op oker"],
];

describe("contrast", () => {
  for (const [foreground, background, minimum, label] of pairs) {
    it(`${label} haalt ${minimum}:1`, () => {
      assert.ok(contrast(foreground, background) >= minimum, `${label}: ${contrast(foreground, background).toFixed(2)}`);
    });
  }
});
