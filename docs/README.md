---
title: Documentation
description: Where to look, by the question you arrived with.
---

Start with the question you arrived with.

## I want to understand the system

| I want to know                                                       | Read                                                    |
| -------------------------------------------------------------------- | ------------------------------------------------------- |
| What stealth is, what you write, and what the platform gives you     | [What stealth is](explanation/what-stealth-is.md)       |
| Why the code lives in four repositories, and what each one holds     | [The repositories](explanation/repositories.md)         |
| How a product is put together at run time                            | [How a product is composed](explanation/composition.md) |
| How stealth compares with fifteen products, capability by capability | [How stealth compares](explanation/comparison.md)       |
| What a word here means: host, shell, plugin, contract, entity        | [The vocabulary](reference/vocabulary.md)               |

## I am working in a stealth repository

| I want to know                                                   | Read                                                                  |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| How to put an empty repository on the toolchain                  | [Set up a repository on the toolchain](how-to/set-up-a-repository.md) |
| How a repository is laid out, and how a package is named         | [Repositories and packages](reference/packages.md)                    |
| What the gates enforce: formatting, lint, types, tests, releases | [Code standards](reference/code.md)                                   |
| What each block of the root config takes                         | [Configuring a repository](reference/configuration.md)                |
| What a docblock says, and on what                                | [Docblocks](reference/docblocks.md)                                   |
| How a commit message is written                                  | [Commit messages](reference/commits.md)                               |
| Where a document goes, and how it is written                     | [Documentation](reference/documentation.md)                           |
| The four files of a component: source, stories, page and spec    | [Documenting a component](reference/components.md)                    |
| How to build, check and land a change to this repository         | [Contributing](../CONTRIBUTING.md)                                    |

## Where things go

A page in `reference/` describes and does not instruct: what a rule is, what a field means,
what a tool guarantees. A page in `explanation/` says why the system is shaped the way it is
and sends the rules elsewhere. A page in `how-to/` gives the steps for one goal.

Design proposals, decisions and the roadmap are numbered records under `rfc/`, `adr/` and
`roadmap/`. Until a repository is cut out of the monorepo, its records stay in that
repository; this one holds none yet.
