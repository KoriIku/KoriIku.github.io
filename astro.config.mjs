import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://koriiku.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
});
