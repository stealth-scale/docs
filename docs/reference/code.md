---
title: Code standards
description: The toolchain, and what its gates enforce in every stealth repository - formatting, lint, types, tests, dependencies, the CI order, releases.
sidebar:
  order: 2
---

Every repository is checked by one toolchain, configured once at its root through the
preset `@stealthscale/tool-config` provides. What follows is what that configuration
enforces. A package never carries a rule of its own that a root rule already covers.

## The toolchain

| Tool         | Used for                                                                            |
| ------------ | ----------------------------------------------------------------------------------- |
| bun 1.4      | Installing, running scripts, the workspace and the catalog                          |
| Vite+ (`vp`) | `vp check` formats, lints and type-checks; `vp test`; `vp pack`; `vp run` for tasks |
| oxfmt        | Formatting, through `vp fmt`                                                        |
| oxlint       | Linting, type-aware, through `vp lint`                                              |
| TypeScript 7 | The compiler, native; declarations are emitted by tsgo at pack time                 |
| Vitest       | Specs in Node and jsdom, and every story in Chromium                                |
| tsdown       | Packing a library: per-file ESM, declarations, the exports map                      |
| changesets   | Versioning and changelogs                                                           |

`vp check --fix` before a commit; `vp run ci` is what CI runs, and it is the same task on a
developer's machine.

## Formatting

100 columns, single quotes, no semicolons, manifests sorted. The formatter does not wrap
comments or prose: a docblock line and a Markdown line are wrapped by hand at 100 columns.
Generated output is neither formatted nor linted: `dist/`, `coverage/`, `*.gen.*`, compiled
catalogues.

## Lint

oxlint's `correctness`, `suspicious`, `perf` and `pedantic` categories are errors. The
`typescript`, `unicorn`, `oxc`, `import` and `promise` plugins run everywhere; `react` and
`jsx-a11y` run where things render; Node's rules run under `tools/`. Taste is left to the
formatter.

Size is a proxy for whether a thing does one thing:

| Limit                 | Value                                                     |
| --------------------- | --------------------------------------------------------- |
| lines per file        | 300, blank lines and comments not counted                 |
| lines per function    | 60; a spec's `describe` and a story's `render` are exempt |
| cyclomatic complexity | 10                                                        |
| nesting depth         | 4                                                         |
| parameters            | 4                                                         |
| lines per story file  | 600                                                       |

Beyond oxlint's own rules, two plugins are load-bearing. `eslint-plugin-jsdoc` holds every
declaration, exported or not, to a typed multi-line docblock, as [Docblocks](docblocks.md)
describes. `eslint-plugin-perfectionist`
sorts imports, exports, object keys, interface members, JSX props and union members
alphabetically, with a blank line starting a new block, so a diff shows a change rather than
a reordering; a generator's manifest literal is the one place sorting is off.

Rules that stand for a security decision, on in every repository:

- `no-restricted-properties` on `innerHTML`, `outerHTML`, `insertAdjacentHTML` and
  `document.cookie`: markup is rendered, never assigned, and cookies belong to the package
  that owns authentication.
- `no-script-url`, `react/jsx-no-target-blank`, `react/no-danger`: a package that has to
  render untrusted text sanitises first and argues for its exception in its own override.
- `no-restricted-imports` with the ownership table: a wrapped dependency has exactly one
  importer, and everything else reaches for that package.
- `react/forbid-elements` on every intrinsic element in the composing trees: one layer writes
  markup, the primitives, and everything above it composes that layer, which is what makes a
  theme, a density setting or a focus ring apply everywhere at once.

## Types

`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
`noImplicitReturns`, `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters`,
`erasableSyntaxOnly`, `verbatimModuleSyntax`, `isolatedModules`, `allowImportingTsExtensions`,
`moduleDetection: force`; target and lib `es2023`, module `esnext`, resolution `bundler`,
`customConditions: ["stealth-source"]`. A package extends the root's `tsconfig.base.json` and
adds nothing but its `include`. A package's tsconfig never includes its `vite.config.ts`, or
the declaration build writes files beside the config's imports.

A package is checked against its dependencies' source, not their `dist`: no build sits
between an edit and `vp check`, a spec or a story. Generated code is still written first, by
`vp run -r codegen`, and never committed.

## Tests

A spec sits beside every source, named after it: `thing.ts` and `thing.spec.ts`. Exempt by
what they are: a barrel (`index.ts`), a declaration, a generated file, a story, a fixtures
file, a `bin/` entry that only parses arguments, a Vite or Playwright config. Exempt by path
only with a reason written beside the exemption.

| Spec            | Runs in  | Because                                                      |
| --------------- | -------- | ------------------------------------------------------------ |
| `*.spec.ts`     | Node     | It renders nothing                                           |
| `*.spec.tsx`    | jsdom    | It renders                                                   |
| `*.stories.tsx` | Chromium | Its play function and its accessibility check need a browser |

Never a `.spec.ts` and a `.spec.tsx` of the same basename beside each other: the type-aware
linter resolves the second without the workspace condition.

Coverage is on by default and the floor is 100% of statements, branches, functions and lines
per file. What sits outside the floor is listed in the root config with the reason beside
each entry: a composition root the e2e suite covers, a service's entry the suite starts,
codegen the build runs. A green suite is not a review: coverage says a line ran, not that it
behaved, so a spec asserts the outcome a caller sees.

A spec on the real workspace never pins a count or a list of what the tree holds today. It
states the rule and derives the expectation from the tree; a scratch workspace in a temporary
directory may pin, because the spec wrote it. Test data is realistic: names from more than
one locale, amounts with a currency, identifiers that look like identifiers; never `foo`,
`Item 1` or lorem ipsum.

## Dependencies

- A version is declared once, in the root catalog; a package writes `catalog:` and a sibling
  `workspace:^`.
- Nothing published in the last three days is installed; `bunfig.toml` sets the window, and
  CI installs with a frozen lockfile, so it is unaffected.
- A lifecycle script runs only for a package listed in `trustedDependencies`.
- A third-party dependency is declared by exactly one package, which wraps it; a spec's
  shared fixtures are declared once, in the root's devDependencies.
- `bun audit` runs first in CI and fails on any known advisory.

## The CI order

`vp run ci` is one task, and every repository's workflow calls the toolchain's reusable one:

1. `bun install --frozen-lockfile` and `bun audit`: the tree is the one that was reviewed.
2. `vp run -r codegen`: what the build reads is written first.
3. `vp run -r lint` and, where there are protobuf modules, `vp run -r breaking` against what
   `main` serves.
4. `vp run -r build`: every package, in dependency order.
5. `vp check` and `vp test`.
6. The catalogue build, then every e2e suite against the built artifact.

Every step fails closed. A landing is green at every step, which is what the gates say, not a
box in a list.

## Packing and releasing

A library is packed by `vp pack`: per-file ESM under `dist/`, declarations from tsgo, and the
`exports` map written back into the manifest. Every pack is checked the way a registry and a
consumer read it: publint reads the manifest and arethetypeswrong resolves the declarations,
under the `esm-only` profile, with a stylesheet export left out of the type check because it
is not a module.

A change to a published package carries a changeset file. On `main`, changesets turns the
pending files into one version pull request; when it merges, every package whose version is
not on the registry yet is packed with `bun pm pack` and published with `npm publish` and
provenance from the job's identity token, in dependency order, halting at the first failure.
No long-lived token anywhere; trusted publishing is configured per package on npmjs.com,
and the repository is public, which provenance requires. Before a release, a smoke test
publishes the release set to a registry it starts, installs consumers from it and builds
them.
