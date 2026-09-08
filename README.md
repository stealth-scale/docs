# stealth-scale/docs

The conventions every stealth-scale repository follows, the records of how the system is
designed, and the documentation for the packages the repositories publish. The `docs/` tree
is the content; the site at https://docs.stealthscale.io is built from it, and GitHub renders
the same files.

Start at [docs/README.md](docs/README.md).

## Develop

```sh
bun install
bunx playwright install chromium   # once: Mermaid diagrams are drawn at build time
bun run dev                        # http://localhost:4321
bun run check                      # types and formatting, the same check CI runs
bun run build                      # the site into dist/, with every internal link checked
```

## Layout

```
docs/               the content, in the tree every stealth repository uses for its docs
src/markdown/       what the Markdown pipeline adds: relative links, Mermaid diagrams
src/integrations/   what the build checks: every internal link resolves
astro.config.ts     the site
```

[CONTRIBUTING.md](CONTRIBUTING.md) is how a change lands here.
