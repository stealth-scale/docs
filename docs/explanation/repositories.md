---
title: The repositories
description: Why the code is cut into four repositories, what each one holds, and the seams between them.
sidebar:
  order: 2
---

The code is cut by who may see it and who owns it, never by architectural layer. Four
motives decided the cut: parts of the system are open source and parts are not; a build
should not pay for trees it does not touch; different teams own different trees; and the
toolchain, the design system, the platform and a product each change on a rhythm of their own.

```mermaid
flowchart LR
  tooling[tooling: builds, checks, tests, releases] --> ui[ui: draws a screen]
  tooling --> platform[platform: runs a product]
  ui --> platform
  platform --> product[a product: plugins, a theme, a deployment]
  ui --> product
```

An arrow reads "is installed by". Nothing points the other way: the toolchain knows no
component, the design system knows no router, and the platform knows no product.

## What each repository holds

| Repository | Visibility | Holds                                                                                                                                        |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `tooling`  | public     | `core/`: what every tier stands on, such as validation. `tools/`: the build preset, the `stealth` command, the test helpers.                 |
| `ui`       | public     | `foundations/`: the theme contract and the hooks. `components/`: the component library and one package per heavy dependency. `catalogue/`.   |
| `platform` | public     | `contracts/`: what a plugin declares. `web/` and `backend/`: the two SDKs and the host. `services/`, `plugins/`, `catalogue/`.               |
| a product  | private    | `plugins/`: what the product adds. `theme/`: a recipe. `e2e/`: the suite that drives the host. `deploy/`: the document and the environments. |

The directories under a root are the concepts a reader of that repository already has, in
the plural. A package is a leaf under one of them, and its name is that path:
[Repositories and packages](../reference/packages.md) has the rule and the examples.

## Why a module is the default

The monorepo this cut comes from had ninety-three manifests for one system, most of them
carrying a layering rule rather than serving a consumer. Layering is checked by path, so a
package needs one of four reasons to exist: somebody installs it on its own; another
repository takes it at development time; it is deployed as an image or a remote; or it ships
a command. A concern inside a package is a directory with a subpath entry, so
`@stealthscale/web-sdk/router` is one manifest and one version, tree-shaken per entry.

## The seams that stayed, and the one that went

**GraphQL is the browser's only door.** Every read and write from a screen goes through one
gateway with persisted documents. Between backends and services the transport is Connect over
protobuf, and it never reaches the browser. The two protocols answer two different questions:
the browser needs one composable graph it cannot misuse; a backend needs a typed procedure
with a schema checked in a registry.

**Module federation is the loader.** A plugin's web part is a federated bundle the host
fetches at run time, so a plugin is redeployed without rebuilding the host. One module in the
web SDK knows federation exists, and the deployment document is the only place a remote is
named.

**Words are ICU MessageFormat catalogues, resolved by the platform.** A component speaks keys
through a resolver the root provides; a package ships its keys and their base locale as ICU
data; the platform loads them into its translation chain, and an app outside the platform
loads them into its own. An earlier design compiled words with inlang and paraglide into every
package, which made a second translation system below the platform's, and it was dropped.

**An SDK is for building a plugin; functionality is a plugin.** The backend SDK holds what no
backend exists without: the process, the platform, the database, the outbox and the queue, the
cache, keys and tokens, telemetry, the mail transport, rpc. The web SDK holds what no screen
exists without. Everything that does something for a person, from billing to search, is a
plugin, and another plugin reaches it through that plugin's contract.

## What stays the same everywhere

Every repository carries the same `docs/` tree, the same workflows calling the toolchain's,
the same gates, and packages that resolve to their source inside the workspace and to `dist`
outside it through one export condition, `stealth-source`. A consumer outside never sees the
condition, and a smoke test installs every published seam from a registry before a release.
