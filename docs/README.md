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

## I want to know how it works

| I want to know                                                  | Read                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------ |
| What a product is made of, and what the host does at start      | [The shape of a product](architecture/product.md)      |
| What one entity declaration gives a plugin                      | [Declaring an entity](architecture/entities.md)        |
| What to do when a derived screen is not what I need             | [Changing what is derived](architecture/changing.md)   |
| How a screen reaches a row                                      | [The request path](architecture/requests.md)           |
| What the token carries, and who checks a permission             | [Identity and permissions](architecture/identity.md)   |
| What keeps one organisation's rows from another's               | [Tenancy and isolation](architecture/tenancy.md)       |
| How a string reaches a person in their own language             | [Words, locale and direction](architecture/words.md)   |
| How a theme is written, and what decides how a product is drawn | [Appearance and theming](architecture/appearance.md)   |
| How a change becomes an event, a job, or an automation          | [Events, jobs and automations](architecture/events.md) |
| What an agent may do, and what stops it                         | [Agents and tools](architecture/agents.md)             |
| What happens when a plugin and the platform are different ages  | [Versions and upgrades](architecture/versions.md)      |
| What is deployed, and what still needs a build                  | [Deployment topology](architecture/deployment.md)      |
| What holds at each boundary                                     | [Security posture](architecture/security.md)           |
| What every screen gets, and what enforces it                    | [Guarantees and gates](architecture/guarantees.md)     |

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
and sends the rules elsewhere. A page in `architecture/` says how one part of the platform
works, in the present tense, with a diagram where a diagram shows what words do not. A page in
`how-to/` gives the steps for one goal.

Design proposals, decisions and the roadmap are numbered records under `rfc/`, `adr/` and
`roadmap/`. Until a repository is cut out of the monorepo, its records stay in that
repository; this one holds none yet.
