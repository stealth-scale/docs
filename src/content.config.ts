import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

/**
 * A file's page id: the path under `docs/` without its extension, where a
 * `README.md` or an `index.md` is its directory's own page. The link rewriter
 * in `src/markdown/links.ts` applies the same rule, so the two cannot disagree.
 */
function pageId(entry: string): string {
  return entry
    .replace(/\.mdx?$/u, "")
    .replace(/(^|\/)(README|index)$/u, "")
    .replace(/\/$/u, "");
}

export const collections = {
  docs: defineCollection({
    loader: glob({
      base: "./docs",
      pattern: "**/[^_]*.{md,mdx}",
      generateId: ({ entry }) => pageId(entry) || "index",
    }),
    schema: docsSchema(),
  }),
};
