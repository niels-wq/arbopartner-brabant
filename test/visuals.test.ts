import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, it } from "node:test";
import { visualIds, visuals } from "../src/data/visuals.ts";

const root = path.resolve(".");

async function exists(file: string) {
  await access(path.join(root, file));
}

describe("beelden", () => {
  it("heeft voor elk beeld webp, avif en svg", async () => {
    for (const id of visualIds) {
      assert.ok(visuals[id].alt.length > 20, id);
      for (const file of [`public/beeld/${id}.svg`, `public/beeld/${id}-640.webp`, `public/beeld/${id}-640.avif`, `public/beeld/${id}-1200.webp`, `public/beeld/${id}-1200.avif`]) {
        await exists(file);
      }
    }
  });

  it("dekt elk artikel, elke plaats en elke dienst", async () => {
    const posts = (await readdir(path.join(root, "src/content/blog"))).filter((name) => name.endsWith(".md"));
    assert.equal(posts.length, 20);
    for (const name of posts) assert.ok(visualIds.includes(`blog-${name.replace(/\.md$/, "")}` as never), name);
    const placeSlugs = [...(await readFile(path.join(root, "src/data/places.ts"), "utf8")).matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
    const serviceSlugs = [...(await readFile(path.join(root, "src/data/services.ts"), "utf8")).matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
    assert.equal(placeSlugs.length, 22);
    assert.equal(serviceSlugs.length, 6);
    for (const slug of placeSlugs) assert.ok(visualIds.includes(`plaats-${slug}` as never), slug);
    for (const slug of serviceSlugs) assert.ok(visualIds.includes(`dienst-${slug}` as never), slug);
  });
});
