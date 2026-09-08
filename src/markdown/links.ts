import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineMdastPlugin } from "satteri";

/** The repository root, which is where the site is built from. */
const REPOSITORY_ROOT = process.cwd();

/** The directory the docs collection is read from, absolute. */
const DOCS_ROOT = resolve(REPOSITORY_ROOT, "docs");

/** Where a file outside `docs/` is read: the repository on GitHub, at its main branch. */
const REPOSITORY_URL = "https://github.com/stealth-scale/docs/blob/main/";

/** A relative link to a Markdown file, with an optional fragment. */
const MARKDOWN_LINK = /^(?!\w+:|\/|#)(?<path>[^#?]+\.mdx?)(?<hash>#.*)?$/u;

/**
 * The site path of a Markdown file under `docs/`, by the rule the collection's
 * `generateId` applies: the extension goes, and a `README` or an `index` is its
 * directory's page. A file outside `docs/` has no page, so its link points at
 * the file on GitHub.
 */
function pagePathOf(file: string): string {
  const path = relative(DOCS_ROOT, file);
  if (path.startsWith("..")) return `${REPOSITORY_URL}${relative(REPOSITORY_ROOT, file)}`;
  const id = path
    .replace(/\.mdx?$/u, "")
    .replace(/(^|\/)(README|index)$/u, "")
    .replace(/\/$/u, "");
  return id === "" ? "/" : `/${id}/`;
}

/**
 * Rewrites a relative link to a Markdown file into the path of the page the
 * site builds from it, so a link that works on GitHub works on the site. A
 * link to a file outside `docs/` becomes a link to that file on GitHub. Links
 * to anything else are left as written.
 */
export const relativeMarkdownLinks = defineMdastPlugin({
  name: "relative-markdown-links",
  link(node, ctx) {
    const match = MARKDOWN_LINK.exec(node.url);
    if (!match?.groups || ctx.fileURL === undefined) return;
    const target = resolve(dirname(fileURLToPath(ctx.fileURL)), match.groups["path"] ?? "");
    ctx.setProperty(node, "url", `${pagePathOf(target)}${match.groups["hash"] ?? ""}`);
  },
});
