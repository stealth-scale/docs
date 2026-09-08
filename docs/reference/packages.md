---
title: Repositories and packages
description: How a stealth repository is laid out, why a package exists, what it is named, and what its manifest and README carry.
sidebar:
  order: 1
---

## The tree

A repository's root directories are the concepts a reader of that repository already has,
written in the plural: `core/`, `themes/` and `tools/` in the toolchain, `foundations/`,
`components/` and `catalogue/` in the design system, `contracts/`, `web/`, `backend/`,
`services/` and `plugins/` in the platform. A package is a leaf under one of them. What kind
of package it is is stated in its README, never in the tree.

Every repository carries the same files beside its trees:

| File or directory    | Holds                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`          | What the repository is, its layout, and its commands                                                                                                           |
| `CONTRIBUTING.md`    | From a clean clone to a merged change                                                                                                                          |
| `LICENSE`            | MIT, held by Stealth Scale B.V.                                                                                                                                |
| `SECURITY.md`        | Where a vulnerability is reported                                                                                                                              |
| `docs/`              | The tree described in [Documentation](documentation.md)                                                                                                        |
| `.github/workflows/` | Callers of the toolchain's reusable workflows                                                                                                                  |
| `vite.config.ts`     | The one configuration: the toolchain's preset, with what is true of this repository                                                                            |
| `tsconfig.base.json` | Extends the toolchain's `tsconfig/base.json` and names the repository's source condition; `tsconfig.json` and every package's extend it with only an `include` |
| `bunfig.toml`        | The install policy                                                                                                                                             |
| `.changeset/`        | The pending release notes, in a repository that publishes                                                                                                      |

Only the root carries a `vite.config.ts`. A package adds one only for what is true of that
package alone, such as several entries, a static file it ships, or a dev server's port.

## Why a package exists

A module is the default. A package exists for exactly one of four reasons, and the first line
of its README names which:

| Kind       | Reason                                                                                 | Published               |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------- |
| library    | Somebody installs it on its own, or it owns a heavy dependency the rest must not carry | yes                     |
| kit        | Another repository takes it at development time                                        | yes, as a devDependency |
| deployable | An image or a remote; nobody installs it                                               | never                   |
| cli        | It ships a bin                                                                         | yes                     |

Heavy means anything beyond React, Base UI, class-variance-authority and lucide on the web,
and beyond the platform's own core on a server. A concern inside a package is a directory
with a subpath entry, `@stealthscale/web-sdk/router`, so it is one manifest, one version, and
tree-shaken per entry, with a stylesheet per styled entry. A tier is a directory and a
layering rule, never a package.

## The name

**A package is named for the singular of its group, then the path below it, with dashes for
slashes.** The rule has no exceptions. No tool computes or checks the name yet.

| Directory                    | Name                                      |
| ---------------------------- | ----------------------------------------- |
| `core/schema`                | `@stealthscale/core-schema`               |
| `themes/base`                | `@stealthscale/theme-base`                |
| `tools/config`               | `@stealthscale/tool-config`               |
| `components/charts`          | `@stealthscale/component-charts`          |
| `foundations/theme`          | `@stealthscale/foundation-theme`          |
| `web/sdk`                    | `@stealthscale/web-sdk`                   |
| `services/identity/contract` | `@stealthscale/service-identity-contract` |
| `plugins/identity/web`       | `@stealthscale/plugin-identity-web`       |

A product's packages carry the product's own scope, `@acme/plugin-reviews-web`, and are
private. A deployable is private and named like everything else, `@stealthscale/web-host`; it
never leaves its repository.

## The manifest

A published package's manifest carries:

| Field                  | Value                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`                 | The name above                                                                                                    |
| `description`          | One sentence                                                                                                      |
| `license`              | `MIT`                                                                                                             |
| `repository`           | `{ type, url, directory }`, so npm links the source and provenance can check it                                   |
| `type`                 | `module`                                                                                                          |
| `files`                | `["dist"]`, plus a shipped stylesheet or tsconfig where there is one                                              |
| `sideEffects`          | `false`, or the list of modules that run on import                                                                |
| `exports`              | Per entry: `{ "<repository>-source": "./src/<entry>.ts", "default": "./dist/<entry>.mjs" }`, and `./package.json` |
| `publishConfig.access` | `public`                                                                                                          |
| `scripts.build`        | `vp pack`                                                                                                         |

The exports map is written by the pack step from the entries the package declares, so it
cannot drift from what is built. The source condition is named after the repository,
`tooling-source` in the toolchain. Inside the workspace the repository's tsconfigs and Vite
configs turn that one name on, so every package resolves to its source. A package installed
from the registry carries its own repository's name, which no consumer turns on, so it
resolves to `dist`. [The repositories](../explanation/repositories.md) says why one shared
name would not do.

A version is declared once, in the root manifest's catalog, and a package writes `catalog:`;
a sibling is `workspace:^`, which the pack step rewrites to a caret range. `workspace:*` is
never used: it packs as an exact pin.

React and react-dom are peers of every rendering package. A shipped file's imports are
`dependencies`; a spec's, a story's and a fixture's are `devDependencies`, the package's own
or the root's. A workspace package a shipped file imports is a dependency, never a
devDependency, or the bundler vendors a second copy into `dist`.

## The README

The first line names the kind and the reason: `A library: …`, `A kit: …`, `A deployable: …`,
`A cli: …`. Then what the package gives a consumer, and what it does not do. A released
README ends with an install section naming the command that installs the package; no tool
writes or checks that section yet. Nothing in a README narrates history or status.

## What the preset checks about the tree

One rule about the tree runs today, through the linter: the layering. The root config names
each tier, what it may not import and why, and `lintConfig({ layers })` turns that into a
`no-restricted-imports` rule per tier. It holds for what a package ships; a specification
may reach for a development-time package whatever tier it is in.

The naming rule above, one spec beside every source, one owner per third-party dependency,
and a shipped stylesheet scanning only its own `dist` are conventions this page states and no
test checks yet. When one becomes a rule, it never pins a count or a list of what the tree
holds today: it states the invariant and derives the expectation from the tree, so adding a
package edits nothing outside that package. When a rule would demand a hand edit, the tool
that makes the edit is built first.
