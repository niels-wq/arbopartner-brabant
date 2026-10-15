import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keyword: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
        note: z.string().optional(),
      }),
    ),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
