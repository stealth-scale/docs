---
title: The vocabulary
description: 'Defines each word the pages here use for a part of the system: one meaning per word, grouped by where the part lives.'
sidebar:
  order: 7
---

Every page on this site uses one word per concept, and this page holds the meaning of each.
Where the word in code and the word in writing differ, code takes the tool's own name and
the writing keeps the word below.

## In the browser

| Word        | Meaning                                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host        | Runs a product in the browser: it boots the shell and takes a deployment document at start. Nobody installs it.                                                                                                                              |
| shell       | Loads the plugins by their manifests, builds one route tree from their screens, mounts the frame, and derives one context per navigation.                                                                                                    |
| manifest    | Describes one plugin to the shell, which loads the plugin by it.                                                                                                                                                                             |
| screen      | A page a plugin declares. A few lines name the entity, the layout and the place, and the router loads the screen's data before it renders.                                                                                                   |
| route tree  | One tree holding every plugin's screens. The route decides everything on screen.                                                                                                                                                             |
| frame       | Renders the active layout and draws its slots.                                                                                                                                                                                               |
| layout      | An arrangement plus options. A layout is configuration, never code.                                                                                                                                                                          |
| arrangement | A registered way of laying out a page. The product plugin registers its own.                                                                                                                                                                 |
| slot        | A place where blocks go, drawn by a layout or by a block that renders.                                                                                                                                                                       |
| block       | What a plugin puts into a slot: typed metadata, a lazily loaded module, a place before, after, around or instead of what the slot already holds, and the rules under which it shows.                                                         |
| where, when | The two rules on a block. A where rule reads the route; a when rule reads the flags, the session and the permissions.                                                                                                                        |
| context     | What the shell derives once per navigation and hands to every block: the route, the session, the organisation and the subjects.                                                                                                              |
| subject     | What the screens on a branch declare themselves to be about.                                                                                                                                                                                 |
| words       | Every string a person reads. Each is a key, and the platform renders it in that person's language and writing direction.                                                                                                                     |
| catalogue   | Holds the keys and their texts per locale, as ICU MessageFormat. A package ships its keys and their base locale, and the platform loads them into its translation chain. The Storybook site a repository ships is also called its catalogue. |

## Behind the door

| Word          | Meaning                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gateway       | The one GraphQL gateway in front of a product. The browser speaks GraphQL to it and nothing else, with persisted documents only.                                                |
| backend       | One process per plugin that has data to show. It hosts the plugin's part of the graph, its domain rules, its entities, its job handlers and its webhooks, on the core services. |
| core services | What every backend receives from the platform: the database, entities, events, jobs, streams, configuration, identity and telemetry.                                            |
| service       | A process that runs once per deployment and that every backend depends on. The identity service issues the token.                                                               |
| Connect       | The transport between backends and services, over protobuf. It never reaches the browser.                                                                                       |
| token         | What the identity service issues once, short-lived. The gateway verifies it and forwards it as claims, and every backend verifies it again.                                     |

## What a plugin declares

| Word       | Meaning                                                                                                                                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugin     | A capability with a web part, a backend and a contract. Everything that does something for a person is a plugin.                                                                                                             |
| contract   | What a plugin exposes to the rest: typed references to its slots, apis, screens, queries, entities, streams, flags, permissions, configuration and subjects.                                                                 |
| reference  | A typed name in a contract that another plugin targets. A plugin never imports another plugin.                                                                                                                               |
| entity     | A kind of record, declared once in the contract. It becomes a table, its procedures, its GraphQL, its events, its search, its subject and its screens.                                                                       |
| stream     | A query whose data grows.                                                                                                                                                                                                    |
| api        | An interface named in a contract that another plugin consumes by reference.                                                                                                                                                  |
| flag       | A named switch a plugin declares. A deployment document sets its value, and a when rule reads it.                                                                                                                            |
| permission | A named right a plugin declares. A when rule checks it, and a screen hides what a person may not do.                                                                                                                         |
| SDK        | What no plugin exists without, and nothing more. The web SDK holds the shell, routing, the query layer, the session and the words; the backend SDK holds the process, the database, the outbox, the cache, the keys and rpc. |

## A product

| Word                | Meaning                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product plugin      | The plugin that carries a product's brand, the arrangements it registers, its theme, and its own screens if it has any.                                                       |
| deployment document | What the host reads at start: the product plugin, the plugins it loads, its layouts, its blocks, its flags and its head. It is the only place a remote is named.              |
| remote              | Where a plugin's web part is served from. The host fetches it at run time through module federation, so a plugin is redeployed without rebuilding the host.                   |
| product             | A deployment document, a product plugin and a handful of plugins. Adding a product is a plugin and a document, never a build.                                                 |
| automation          | What an administrator composes without a developer: a trigger, conditions over the payload, and actions. Every run is an entity with a log, and every action an audit record. |
| theme               | A recipe. The toolchain solves its palette for WCAG contrast in light and dark and writes the stylesheet a product links.                                                     |

## Repositories and packages

| Word                          | Meaning                                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| repository                    | One of four: `tooling`, `ui`, `platform`, and one per product. The code is cut by who may see it and who owns it, never by architectural layer.                                                 |
| tree                          | A root directory of a repository, named for a concept in the plural. A package is a leaf under one.                                                                                             |
| tier                          | A directory and a layering rule, never a package.                                                                                                                                               |
| package                       | A leaf under a tree, with a manifest. A module is the default, and a package exists for one of four reasons.                                                                                    |
| library, kit, deployable, cli | The four kinds of package. Somebody installs a library on its own; another repository takes a kit at development time; a deployable is an image or a remote nobody installs; a cli ships a bin. |
| catalog                       | The root manifest's list of versions. A package writes `catalog:` in place of a version.                                                                                                        |
| source condition              | The export condition named after the repository, `tooling-source` in the toolchain. Inside the workspace it resolves a package to its source; outside, a consumer resolves `dist`.              |
| toolchain                     | What builds, checks, tests and releases a stealth repository: the preset and the `stealth` command.                                                                                             |
| preset                        | The configuration `@stealthscale/tool-config` provides, composed at a repository's root into one `vite.config.ts`.                                                                              |
| gate                          | A check that fails a change: the formatter, the linter, the type check, the specs at the coverage floor, and the pack.                                                                          |
| changeset                     | The file a change to a published package carries. The release turns the pending changesets into one version pull request.                                                                       |
