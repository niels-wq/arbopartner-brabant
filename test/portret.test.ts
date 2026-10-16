import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

function webpSize(file: string): [number, number] {
  const buf = readFileSync(file);
  assert.equal(buf.toString("ascii", 0, 4), "RIFF");
  assert.equal(buf.toString("ascii", 8, 12), "WEBP");
  const format = buf.toString("ascii", 12, 16);
  if (format === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  if (format === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  assert.equal(format, "VP8L");
  const b0 = buf[21] ?? 0;
  const b1 = buf[22] ?? 0;
  const b2 = buf[23] ?? 0;
  const b3 = buf[24] ?? 0;
  return [1 + (((b1 & 0x3f) << 8) | b0), 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6))];
}

test("vierkante uitsnedes houden het gezicht in het midden van de cirkel", () => {
  for (const file of [
    "public/mensen/niels-alderding-avatar.webp",
    "public/mensen/niels-alderding-face.webp",
  ]) {
    const [width, height] = webpSize(file);
    assert.equal(width, height, file);
    assert.ok(width >= 240, file);
  }
  assert.ok(existsSync("public/mensen/niels-alderding-face.avif"));
  const css = readFileSync("src/styles/global.css", "utf8");
  assert.match(css, /\.niels-face[\s\S]*object-fit:\s*cover/);
  assert.match(css, /\.niels-face[\s\S]*object-position:\s*center/);
  assert.match(css, /\.niels-koffie[\s\S]*object-position:\s*55% 40%/);
  const team = readFileSync("src/components/TeamPhoto.astro", "utf8");
  assert.match(team, /niels-alderding-face\.webp/);
  assert.match(team, /niels-face/);
  for (const file of [
    "src/pages/index.astro",
    "src/pages/over-ons.astro",
    "src/pages/blog/[slug].astro",
    "src/components/AuthorBlock.astro",
    "src/components/Engagement.astro",
  ]) {
    assert.match(readFileSync(file, "utf8"), /niels-face/);
  }
});

test("de productieserver importeert werken.json vanuit server/", () => {
  const docker = readFileSync("Dockerfile", "utf8");
  const server = readFileSync("server/werken.mjs", "utf8");
  assert.match(server, /from "\.\/werken\.json"/);
  assert.equal(server.includes("../src/"), false);
  assert.equal(docker.includes("src/data"), false);
  assert.match(docker, /COPY server \.\/server/);
  assert.ok(existsSync("server/werken.json"));
  assert.equal(existsSync("src/data/werken.json"), false);
  for (const file of ["server/index.mjs", "server/forms.mjs", "server/vite-plugin.mjs"]) {
    assert.equal(readFileSync(file, "utf8").includes("../src/"), false, file);
  }
});
