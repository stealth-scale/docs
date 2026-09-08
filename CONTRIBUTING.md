# Contributing

## Getting set up

bun 1.4 or later. `bun install` downloads the pinned bun when yours is older.

```sh
git clone git@github.com:stealth-scale/docs.git
cd docs
bun install
bunx playwright install chromium
bun run build
```

A dependency published in the last three days is refused by `bun install`; `bunfig.toml`
says why and how to override it for one install.

## Before you open a pull request

```sh
bun run check && bun run build
```

That is what CI runs. `check` type-checks the site's code and checks the formatting;
`build` builds every page and fails on an internal link that leads nowhere or a Mermaid
diagram that does not draw. `bun run fmt` fixes the formatting.

## Where a document goes

[docs/README.md](docs/README.md) routes by the question a reader arrives with, and
[docs/reference/documentation.md](docs/reference/documentation.md) is the rule for the
tree: which directory holds what, how records are numbered, and how the text is written.
A page describing a convention every repository follows goes here. A page about one
repository's own packages goes in that repository until its packages are published.

## Commit messages

[docs/reference/commits.md](docs/reference/commits.md) is the convention: a Conventional
Commits header whose summary is imperative and names what changed, a body that says what
and why, and a footer for a breaking change or an issue.

```
docs: add the consumer guide and deploy the catalogue to GitHub Pages
test(tools): derive the release set and README checks from the workspace tree
```

## Review

A pull request is reviewed by a maintainer of the stealth-scale organisation. A change to a
convention names the repositories it binds and what breaks in them.
