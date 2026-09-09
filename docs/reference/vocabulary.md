---
title: The vocabulary
description: 'Defines each word the pages here use for a part of the system: one meaning per word, grouped by the part of the system it belongs to.'
sidebar:
  order: 8
---

Every page on this site uses one word per concept, and this page gives the meaning of each.
Where the word in code and the word in writing differ, the code takes the tool's own name and
the writing keeps the word below.

## In the browser

| Word        | Meaning                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| host        | The one application, built once. It reads a deployment document at start and boots the shell. Nobody installs it.                                                                                                                          |
| shell       | Loads the plugins by their manifests, builds one route tree from their screens, mounts the frame, and works out the context for each navigation.                                                                                           |
| manifest    | Describes one plugin to the shell, which loads the plugin by it.                                                                                                                                                                           |
| screen      | A page a plugin declares. The plugin decides what it draws, either by calling a builder or by composing components itself.                                                                                                                 |
| builder     | A function that writes a whole screen from an entity: `listScreen`, `detailScreen`, `formScreen`. Calling one is the author's choice.                                                                                                      |
| route tree  | One tree holding every plugin's screens. The route decides everything on screen.                                                                                                                                                           |
| frame       | Renders the active layout and draws its slots.                                                                                                                                                                                             |
| layout      | An arrangement plus options. A layout is configuration, never code.                                                                                                                                                                        |
| arrangement | A registered way of laying out a page. The product plugin registers its own.                                                                                                                                                               |
| slot        | A named place blocks go, drawn by a layout, a screen or a block.                                                                                                                                                                           |
| block       | What a plugin puts into a slot: typed metadata, a module loaded on first use, a position before, after, around or instead of what the slot already holds, and the rules under which it shows.                                              |
| where, when | The two rules on a block. A where rule reads the route; a when rule reads the flags, the session and the permissions.                                                                                                                      |
| context     | What the shell works out once per navigation and gives every block: the route, the session, the organisation and the subjects.                                                                                                             |
| subject     | What the screens on a branch declare the page to be about.                                                                                                                                                                                 |
| words       | Every string a person reads. Each is a key, and the platform renders it in that person's language and writing direction.                                                                                                                   |
| catalogue   | Holds the keys and their texts per locale, as ICU MessageFormat. A package ships its keys and its base locale, and the platform loads them into its translation chain. The Storybook site a repository ships is also called its catalogue. |

## Behind the gateway

| Word          | Meaning                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gateway       | The one GraphQL API a browser calls. It composes one schema from every plugin's part and runs only the queries the product shipped.                                                          |
| backend       | One process per plugin that has data. It holds the plugin's part of the schema, its rules, its entities, its job handlers and its webhooks.                                                  |
| core services | What every backend gets from the platform: the database, entities, events, jobs, streams, configuration, identity and telemetry.                                                             |
| service       | A process that runs once per deployment and that every backend uses, such as the one providing identity. A service your own company runs is also a service, and an entity may read from one. |
| Connect       | The transport between backends and services, over protobuf. It never reaches a browser.                                                                                                      |
| token         | What the deployment's identity provider issues, short-lived. The gateway checks it and passes on the claims, and every backend checks it again for itself.                                   |

## A plugin's own declarations

| Word           | Meaning                                                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugin         | One capability. It brings screens, a backend, both, or a mapping onto a service you already run.                                                                                                                             |
| contract       | What a plugin exposes to the rest: typed references to its slots, apis, screens, queries, entities, streams, flags, permissions, configuration and subjects.                                                                 |
| reference      | A typed name in a contract that another plugin targets. A plugin never imports another plugin.                                                                                                                               |
| entity         | A kind of record, declared once. The platform derives its types, its schema, its API, its events and, where the platform stores it, its table.                                                                               |
| source         | Who stores an entity's records: the platform, or a service, an API or a database you already run.                                                                                                                            |
| capability     | Something a source can do, such as filtering or paging. A screen may offer only what its source declares.                                                                                                                    |
| stream         | A query whose data grows.                                                                                                                                                                                                    |
| api            | An interface named in a contract that another plugin consumes by reference.                                                                                                                                                  |
| flag           | A named switch a plugin declares. A deployment document sets its value, and a when rule reads it.                                                                                                                            |
| permission     | A named right a plugin declares. A when rule checks it, and a backend decides with it.                                                                                                                                       |
| interface      | A capability the platform names rather than implements: identity, storage, events, jobs, configuration, flags, files, search, notifications, audit, words, telemetry.                                                        |
| implementation | What satisfies an interface. The platform ships one for each, and a company replaces it with its own; nothing that used it changes, because nothing that used it named it.                                                   |
| SDK            | What no plugin exists without, and nothing more. The web SDK holds the shell, routing, the query layer, the session and the words; the backend SDK holds the process, the database, the outbox, the cache, the keys and rpc. |

## A product

| Word                | Meaning                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product plugin      | The plugin that carries a product's brand, the arrangements it registers, its theme, and its own screens if it has any.                                                           |
| deployment document | What the application reads at start: the product plugin, the plugins it loads, its layouts, its blocks, its flags and its head. It is the only place a plugin's address is named. |
| remote              | Where a plugin's web part is served from. The application fetches it while running, so a plugin is redeployed without rebuilding the product.                                     |
| product             | A deployment document, a product plugin and a handful of plugins. Adding a product is a plugin and a document, never a build.                                                     |
| automation          | What an administrator composes without a developer: a trigger, conditions over the payload, and actions. Every run is recorded and every action leaves an audit record.           |
| theme               | A recipe. The toolchain solves its palette for WCAG contrast in light and dark and writes the stylesheet a product links.                                                         |

## Repositories and packages

| Word                          | Meaning                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| repository                    | One of four: `tooling`, `ui`, `platform`, and one per product. The code is split by who may see it and who owns it, never by architectural layer.                                               |
| tree                          | A root directory of a repository, named for a concept in the plural. A package is a leaf under one.                                                                                             |
| tier                          | A directory and a layering rule, never a package.                                                                                                                                               |
| package                       | A leaf under a tree, with a manifest. A module is the default, and a package exists for one of four reasons.                                                                                    |
| library, kit, deployable, cli | The four kinds of package. Somebody installs a library on its own; another repository takes a kit at development time; a deployable is an image or a remote nobody installs; a cli ships a bin. |
| catalog                       | The root manifest's list of versions. A package writes `catalog:` in place of a version.                                                                                                        |
| source condition              | The export condition named after the repository, `tooling-source` in the toolchain. Inside the workspace it resolves a package to its source; outside, a consumer gets `dist`.                  |
| toolchain                     | What builds, checks, tests and releases a stealth repository: the preset and the `stealth` command.                                                                                             |
| preset                        | The configuration `@stealthscale/tool-config` provides, composed at a repository's root into one `vite.config.ts`.                                                                              |
| gate                          | A check that fails a change: the formatter, the linter, the type check, the specs at the coverage floor, and the pack.                                                                          |
| changeset                     | The file a change to a published package carries. The release turns the pending changesets into one version pull request.                                                                       |
