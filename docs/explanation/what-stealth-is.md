---
title: What stealth is
description: 'Stealth is a platform for building business software: the problem it solves, what building on it looks like, how it compares with the alternatives, and where it stands.'
sidebar:
  order: 1
---

Stealth is a platform for building business software: the tools a company runs on, with
records, screens, roles and rules. You write the part that is yours. The platform supplies
what every such tool needs and nobody wants to build twice, and it works with the services
your company already runs instead of asking you to replace them. Stealth Scale B.V. builds
it, and builds its own products on it.

## The problem it solves

Every business tool starts with the same work. Someone builds sign-in, users and roles.
Someone designs the data model, creates its tables and puts an API in front of them. Someone
writes a list, a detail view and a form for every kind of record, sets permissions on each,
and adds search. Someone adds settings, notifications, dark mode and translations, and then
finds a way to deploy the tool for a second customer or a second environment.

That work is the same in every tool, and a team builds it again for each one. It takes most
of the time, it comes out a little different each time, and the part the business asked for
gets what is left. Stealth keeps one copy of that work. Your team writes the records, the
rules and the screens that are particular to your business.

## What building on it looks like

Your operations team needs a tool for supplier agreements: which person is responsible for
each one, when it renews, and who may change it.

1. You declare the agreement: its fields, which of them are searched, how one is titled, and
   who may read and change one. The platform derives the types, the API, the events and the
   storage.
2. You build the screens. A list, a detail view and a form each come from one line if the
   ordinary ones suit you, and you compose your own from the same components where they do
   not.
3. You write your own rule: nobody changes the amount on a signed agreement without an
   approval.
4. You write a deployment document naming your plugin, the platform plugins you want, and
   your theme.

If those agreements already live in a service your company runs, the declaration names that
service and everything else on this page stays the same.

| From                    | You get                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| the declaration         | the types, the API, the events other plugins react to, search over the fields you named, and storage where you want it |
| a line per screen       | the ordinary list, detail view and form, with permissions applied                                                      |
| your own composition    | the same components, arranged your way, with the same permissions and the same validation                              |
| the rule                | one place that runs on every change, whichever screen or API call made it                                              |
| the document            | a running product, with sign-in, the API and your theme, on the image every stealth product uses                       |
| an administrator, later | an automation that warns the owner before an agreement renews, set up from a screen                                    |

When legal asks for a second tool, that is a second plugin and a second document. Sign-in,
the API, the design system and the translations are the same ones.

## Why not something else

| You could build on                   | What you get                                                                                                                                                                                    | What it costs you                                                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| a web framework and an ORM           | full control over every part                                                                                                                                                                    | your team builds the shared work again for every tool, and each copy comes out different                                                                       |
| an internal-tools builder            | a first screen in an afternoon                                                                                                                                                                  | the tool is built and kept in the vendor's editor; version control, tests and review are what the vendor offers, and a tool that becomes a product outgrows it |
| a business suite such as Odoo        | a data model that comes with its own screens                                                                                                                                                    | you work inside the suite: its modules, its language and its user interface                                                                                    |
| a portal framework such as Backstage | one application and plugins that each bring a web part and a backend                                                                                                                            | it is built for developer portals, and it derives nothing from a data model                                                                                    |
| stealth                              | plugins in TypeScript in your own repository, checked like the platform itself; records that derive their API and their events; screens you take or compose; a product composed from a document | your data reaches a browser through one GraphQL API, and a team that does not want that gains less from the rest                                               |

[How stealth compares](comparison.md) checks sixteen capabilities against fifteen products,
from each product's own documentation.

## The parts you get

Each of these is an interface with one implementation behind it, so you take the ones you do
not already have and replace the rest with your own.

- **Sign-in, or the one you already run.** The platform states what a verified caller looks
  like and provides an identity plugin that produces it, with passkeys, organisations and
  roles. A company with its own provider uses that one instead.
- **One API for the browser.** A GraphQL gateway answers every request a screen makes, and it
  runs only the queries the product published.
- **Your own services, where you have them.** A declaration points at a gRPC or REST service
  you already run, and the screens, the permissions and the agent tools work as they do for a
  record the platform stores.
- **Components rather than finished screens.** The design system, plus components that read a
  declaration so a table, a form and a field list come out consistent without deciding your
  layout for you.
- **Words.** Every string a person reads is a key, rendered in that person's language and
  writing direction.
- **Storage, events, jobs, flags, files, search, notifications, audit and telemetry.** Each is
  an interface with one implementation behind it.
- **Automations.** An administrator composes a trigger, conditions and actions from a screen.
  Every run is recorded and every action leaves an audit record.
- **Deployment.** The application is built once, and a document per product and environment
  says what to load.

The [architecture section](../architecture/README.md) describes each of these in detail.

## What stealth is not

Stealth is not a content management system. A plugin decides what its screens show. It is not
a low-code builder: a plugin is TypeScript in a repository, and the checks that hold the
platform hold the plugin. It is not only a component library, though it contains one.

## Where it stands

Four repositories hold the code, and [The repositories](repositories.md) says what each one
holds and why the split runs where it does.

The toolchain exists. One preset formats, lints, type-checks, tests at a 100% per-file
coverage floor, packs and publishes with provenance. Beside it are the core libraries for
validation, the environment, locales, logging, results and themes, and a Storybook kit. None
of it is on npm yet.

This site is its own repository, and so far `ui` and `platform` contain only the name of every
package, its README and an empty entry file.

## The names

Three names are in use, and each means exactly one thing:

| Name            | Used for                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| `stealth-scale` | The GitHub organisation, the `repository` field of every manifest, and the Pages host |
| `@stealthscale` | The npm scope, and the directory the repositories are checked out under               |
| `stealth`       | The product line itself: the command-line tool, and the word in prose                 |

## Read next

- [The repositories](repositories.md) says why the code is split into four repositories.
- The [architecture section](../architecture/README.md) describes how the platform works.
- The reference pages, starting with [Repositories and packages](../reference/packages.md),
  state the rules every repository follows. Where a test enforces a rule, the page says so;
  where nothing checks it yet, the page says that too.
