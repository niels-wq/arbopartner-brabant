import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { formApiPlugin } from "./server/vite-plugin.mjs";
import { rehypeMarks } from "./src/lib/rehype-marks.mjs";

export default defineConfig({
  site: "https://www.arbopartnerbrabant.nl",
  trailingSlash: "never",
  markdown: {
    rehypePlugins: [rehypeMarks],
  },
  vite: {
    plugins: [tailwindcss(), formApiPlugin()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/api/"),
    }),
  ],
});
