import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";

/** Every `href` in a built page that points inside the site, without its fragment or query. */
const INTERNAL_HREF = /href="(?<href>\/[^"#?]*)/gu;

/** Every file under a directory, recursively, as paths relative to it. */
function filesUnder(root: string, directory = root): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesUnder(root, path) : [relative(root, path)];
  });
}

/** Whether the built output serves a site path: a file, or a directory with an index. */
function isServed(built: ReadonlySet<string>, href: string): boolean {
  const path = href.replace(/^\//u, "");
  return path === "" || built.has(path) || built.has(join(path, "index.html"));
}

/**
 * Fails the build when a page links to a path the build did not write. Pages
 * are read from the output directory, so every link a plugin rewrote is checked
 * the way a browser follows it.
 */
export function internalLinks(): AstroIntegration {
  return {
    name: "internal-links",
    hooks: {
      "astro:build:done"({ dir, logger }) {
        const root = fileURLToPath(dir);
        const built = new Set(filesUnder(root));
        const broken: string[] = [];
        for (const page of built) {
          if (!page.endsWith(".html")) continue;
          const html = readFileSync(join(root, page), "utf8");
          for (const match of html.matchAll(INTERNAL_HREF)) {
            const href = decodeURI(match.groups?.["href"] ?? "");
            if (!isServed(built, href)) broken.push(`${page} links ${href}`);
          }
        }
        if (broken.length > 0) {
          for (const line of broken) logger.error(line);
          throw new Error(
            `${String(broken.length)} link(s) point at pages the build did not write.`,
          );
        }
        logger.info(`every internal link in ${String(built.size)} files resolves`);
      },
    },
  };
}
