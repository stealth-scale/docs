import { createMermaidRenderer } from "mermaid-isomorphic";
import { defineMdastPlugin } from "satteri";

/** One browser for the whole build; it closes itself when no diagram is rendering. */
const render = createMermaidRenderer();

/**
 * Replaces every fenced `mermaid` block with the SVG Mermaid draws for it, at
 * build time, so a page ships a picture and no diagram runtime. A diagram
 * Mermaid refuses fails the build with its reason.
 */
export const mermaidDiagrams = defineMdastPlugin({
  name: "mermaid-diagrams",
  async code(node, ctx) {
    if (node.lang !== "mermaid") return;
    const [result] = await render([node.value], { mermaidConfig: { theme: "neutral" } });
    if (result === undefined || result.status === "rejected") {
      throw new Error(`Mermaid refused a diagram: ${String(result?.reason)}`);
    }
    ctx.replaceNode(node, {
      raw: `<figure class="diagram">${result.value.svg}</figure>`,
      mdxExpressions: false,
    });
  },
});
