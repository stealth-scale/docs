---
title: What stealth is
description: 'Stealth lets a team ship business software by writing only the part that is theirs: the problem it solves, what building on it looks like, how it compares with the alternatives, and where it stands.'
sidebar:
  order: 1
---

Stealth is a platform for building business software: the tools a company runs on, with
records, screens, roles and rules. You write the part that is yours, the records and the
rules of your business. The platform supplies everything every such tool needs and nobody
wants to build again. Stealth Scale B.V. builds it, and builds its own products on it.

## The problem it solves

Every business tool starts with the same work. Someone builds sign-in, users and roles.
Someone designs the data model, creates its tables and puts an API in front of them. Someone
writes a list screen, a detail screen and a form for every kind of record, sets permissions
on each, and adds search. Someone adds settings, notifications, dark mode and translations,
and then finds a way to deploy the tool for a second customer or a second environment.

That work is the same in every tool, and a team builds it again for each one. It takes most
of the time, it comes out a little different each time, and the part the business asked for
gets what is left. Stealth keeps one copy of that work in the platform. Your team writes the
declaration of its records and the rules particular to its business, and nothing else.

## What building on it looks like

Your operations team needs a tool to track supplier contracts: who owns each contract, when
it renews, and who may change it.

1. You declare a contract in your plugin's contract: its fields, which of them are searched,
   what its title is, and who may read and change one.
2. You write three screens, a list, a detail and a form, each a few lines naming the record,
   the layout it uses and where it sits in the product.
3. You write the one rule that is yours: a signed contract's amount does not change without
   an approval.
4. You write a deployment document naming your plugin, the platform's identity, configuration
   and dashboard plugins, and your theme.

| From                    | You get                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| the declaration         | the table, the API, the events other plugins and automations react to, search over the fields you named, and the three screens with permissions applied |
| the rule                | one place that runs on every change, whichever screen or API call made it                                                                               |
| the document            | a running product on the same host every stealth product runs on, with sign-in, the API gateway and your theme                                          |
| an administrator, later | an automation that notifies the owner thirty days before a contract renews, set up from a screen with no developer involved                             |

When legal asks for a second tool, for non-disclosure agreements, that is a second plugin
and a second document. The host, sign-in, the API, the design system and the translations
are the same ones.

## Why not something else

| You could build on                   | What you get                                                                                                                                                       | What it costs you                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| a web framework and an ORM           | full control over every part                                                                                                                                       | your team builds the shared work again for every tool, and each copy comes out different                                                           |
| an internal-tools builder            | a first screen in an afternoon                                                                                                                                     | the tool lives in the vendor's editor; version control, tests and review are what the vendor offers, and a tool that becomes a product outgrows it |
| a business suite such as Odoo        | a data model that derives its own screens, the idea stealth takes                                                                                                  | you work inside the suite: its modules, its language and its user interface                                                                        |
| a portal framework such as Backstage | one host and plugins that each bring a web part and a backend, the shape stealth takes                                                                             | it is built for developer portals and derives no screens from a data model                                                                         |
| stealth                              | plugins in TypeScript in your own repository, checked like the platform itself; records that derive their table, API and screens; a product composed by a document | the platform decides the shape of a screen and the one door to the data, and a tool that needs neither gains nothing from it                       |

[How stealth compares](comparison.md) checks sixteen capabilities against fifteen products,
from each product's own documentation.

## What the platform supplies

- Sign-in and sessions. The identity service issues a short-lived token once, and the gateway
  and every backend verify it.
- One API. A GraphQL gateway is the only door from the browser, and it accepts persisted
  documents only.
- A backend per plugin, built on the platform's core services: the database, events, jobs,
  streams, configuration, identity and telemetry.
- Screens. The shell builds one route tree from every plugin's screens, loads a screen's data
  before it renders, and hides what a person may not do.
- The design system: the components, and a theme solved for WCAG contrast in light and dark.
- Words. Every string a person reads is a key in a catalogue, rendered in that person's
  language and writing direction.
- Automations. An administrator composes a trigger, conditions and actions from a screen.
  Every run is a record with a log, and every action leaves an audit record.
- Deployment. The host is built once, and a document per product and environment tells it
  what to load.

[How a product is composed](composition.md) says how these parts meet at run time.

## What stealth is not

Stealth is not a content management system. Its screens are lists, details and forms over
records. It is not a low-code builder. A plugin is TypeScript in a repository, and the gates
that check the platform check the plugin. It is not only a component library. The design
system is one of four repositories, and a product reaches it through the platform.

## Where it stands

Four repositories hold the code, and [The repositories](repositories.md) says what each one
holds and why the cut runs where it does.

- The toolchain exists: one preset that formats, lints, type-checks, tests at a 100% per-file
  coverage floor, packs and publishes with provenance; the core libraries for validation, the
  environment, locales, logging, results and themes; and a Storybook kit. None of it is on
  npm yet.
- This site lives in its own repository.
- `ui` and `platform` hold every package's name, its README and an empty entry, and nothing
  else yet. The design they implement is on [How a product is composed](composition.md).

## The names

Three names carry it, and each one is used for exactly one thing:

| Name            | Used for                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| `stealth-scale` | The GitHub organisation, the `repository` field of every manifest, and the Pages host |
| `@stealthscale` | The npm scope, and the directory the repositories are checked out under               |
| `stealth`       | The product line itself: the command-line tool, and the word in prose                 |

## Read next

- [The repositories](repositories.md) says why the code is cut into four repositories, and
  what each one holds.
- [How a product is composed](composition.md) says what a host, a plugin and a document do at
  run time.
- The reference pages, starting with [Repositories and packages](../reference/packages.md),
  state the rules every repository follows. Where a test enforces a rule, the page says so;
  where nothing checks it yet, the page says that too.
