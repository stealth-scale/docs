---
title: Repositories and packages
description: How a stealth repository is laid out, why a package exists, what it is named, and what its manifest and README carry.
sidebar:
  order: 1
---

## The tree

A repository's root directories are the concepts a reader of that repository already has,
written in the plural: `core/` and `tools/` in the toolchain, `foundations/`, `components/`
and `catalogue/` in the design system, `contracts/`, `web/`, `backend/`, `services/` and
`plugins/` in the platform. A package is a leaf under one of them. What kind of package it is
is stated in its README, never in the tree.

Every repository carries the same files beside its trees:

| File or directory    | Holds                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `README.md`          | What the repository is, its layout, and its commands                                |
| `CONTRIBUTING.md`    | From a clean clone to a merged change                                               |
| `LICENSE`            | MIT, held by Stealth Scale B.V.                                                     |
| `SECURITY.md`        | Where a vulnerability is reported                                                   |
| `docs/`              | The tree described in [Documentation](documentation.md)                             |
| `.github/workflows/` | Callers of the toolchain's reusable workflows                                       |
| `vite.config.ts`     | The one configuration: the toolchain's preset, with what is true of this repository |
| `tsconfig.base.json` | The compiler options every package extends                                          |
| `bunfig.toml`        | The install policy                                                                  |
| `.changeset/`        | The pending release notes, in a repository that publishes                           |

Only the root carries a `vite.config.ts`. A package adds one only for what is true of that
package alone, such as several entries or a dev server's port.

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
slashes.** The rule has no exceptions; the generator computes the name, and a guard refuses a
manifest whose name is not its path.

| Directory                    | Name                                      |
| ---------------------------- | ----------------------------------------- |
| `core/schema`                | `@stealthscale/core-schema`               |
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

| Field                  | Value                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `name`                 | The name above                                                                                               |
| `description`          | One sentence                                                                                                 |
| `license`              | `MIT`                                                                                                        |
| `repository`           | `{ type, url, directory }`, so npm links the source and provenance can check it                              |
| `type`                 | `module`                                                                                                     |
| `files`                | `["dist"]`, plus a shipped stylesheet where there is one                                                     |
| `sideEffects`          | `false`, unless a module runs on import                                                                      |
| `exports`              | Per entry: `{ "stealth-source": "./src/<entry>.ts", "default": "./dist/<entry>.mjs" }`, and `./package.json` |
| `publishConfig.access` | `public`                                                                                                     |
| `scripts.build`        | `vp pack`                                                                                                    |

The exports map is written by the pack step from the entries the package declares, so it
cannot drift from what is built. `stealth-source` is the workspace's own condition: turned on
by the repository's tsconfigs and Vite configs, and by nothing outside it, so inside the
workspace every package resolves to its source and outside it to `dist`.

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
README ends with an install section written by the toolchain from the package's name and its
directory, never by hand; a guard holds the file to what the tool writes. Nothing in a README
narrates history or status.

## What the guards check

Each rule is a function over the workspace with a spec beside it; the toolchain's preset runs
them, and a repository adds rules of its own the same way.

| Guard       | Refuses                                                                         |
| ----------- | ------------------------------------------------------------------------------- |
| names       | A manifest whose name is not the singular of its group plus its path            |
| pairing     | A source file without a spec beside it, or a spec without a source              |
| declared    | An import of a workspace package the importing file's manifest does not declare |
| layers      | A dependency that points up: a tree importing a package of a tree above it      |
| ownership   | A third-party dependency declared by more than one package                      |
| stylesheets | A shipped stylesheet that scans anything but its own `dist`                     |
| readmes     | A released README whose install section is not what the tool writes             |
| roadmap     | An index table or graph that disagrees with the milestones' own frontmatter     |

A rule never pins a count or a list of what the tree holds today: it states the invariant and
derives the expectation from the tree, so adding a package edits nothing outside that
package. When a rule would demand a hand edit, the tool that makes the edit is built first.
