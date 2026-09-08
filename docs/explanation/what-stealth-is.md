---
title: What stealth is
description: The product line, the organisation behind it, and what is published under which name.
sidebar:
  order: 1
---

Stealth is the product line of Stealth Scale B.V.: a platform on which a business product is
a document rather than a build. One generic host loads the plugins the document names, each
plugin a capability with a web part, a backend and a contract, and everything a person sees
is drawn with one design system in the language of the person reading it.

Three names carry it, and each one is used for exactly one thing:

| Name            | Used for                                                                                |
| --------------- | --------------------------------------------------------------------------------------- |
| `stealth-scale` | The GitHub organisation, the `repository` field of every manifest, and the Pages host   |
| `@stealthscale` | The npm scope, and the directory the repositories are checked out under                 |
| `stealth`       | The product line itself: the command-line tool, the export condition, the word in prose |

Stealth Scale publishes from four repositories, which [The repositories](repositories.md)
describes:

- the toolchain that builds, checks, tests and releases a stealth repository
- the design system a screen is drawn with, and the catalogue that documents it
- the platform a plugin is written against, with the host, the services and the standard
  plugins
- one private repository per product

The toolchain and this documentation already live in repositories of their own. The design
system's and the platform's code is still in one private repository and moves into `ui` and
`platform` tree by tree; both repositories exist and receive each tree as it is cut.

## What a reader here can expect

- A rule that every repository follows is written once, in [Reference](../reference/packages.md),
  and a test in the repository enforces it. A convention no test checks says so where it is
  written.
- A design is proposed in an RFC, with the alternatives it lost to; a decision is recorded in
  an ADR; the order of work is a roadmap. Each is a numbered file that is never renumbered.
- A package published under `@stealthscale` has one page in its catalogue per component or
  module, generated from the source, and a how-to here for what an app does around it.
