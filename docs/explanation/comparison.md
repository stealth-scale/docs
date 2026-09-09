---
title: How stealth compares
description: "Sixteen capabilities a team building business software needs, checked against fifteen products and stealth from each product's own documentation, with a legend that separates what stealth has built from what its design specifies."
sidebar:
  order: 4
---

This page compares stealth with fifteen products a team might build business software on
today. Every cell for another product comes from that product's own documentation, read on
September 8, 2026, and each page is listed at the bottom. Where a product's documentation is
silent on a capability, the cell says no rather than guessing. Repository facts come from the
GitHub API the same day: archived state, last push, stars and licence.

Amplication is not in the set, because its site now redirects to a different company's
product. Frappe is not in the set, because it is a decade older than everything else here
and this page compares what a team would choose today.

| Mark | For another product                                                                                  | For stealth                                |
| ---- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| ●    | The product does it, in the edition its documentation describes as free or open                      | Built and tested in the repositories today |
| ◐    | The product does part of it, does it only in a paid edition, or gives you hooks to write it yourself | Specified in the design, not built yet     |
| ○    | The product does not do it, or its documentation does not say                                        | Not part of the design                     |

## The capabilities

| No. | A team needs                                                                              |
| --- | ----------------------------------------------------------------------------------------- |
| 1   | The application's logic as TypeScript source in a repository the team owns                |
| 2   | A record declared once, with its API and its screens derived from it                      |
| 3   | Sign-in and sessions built in                                                             |
| 4   | Roles and permissions built in, configured rather than coded                              |
| 5   | Records scoped to an organisation or tenant, built in                                     |
| 6   | One typed API the browser reads and writes through                                        |
| 7   | Background jobs and events                                                                |
| 8   | Search across records                                                                     |
| 9   | Automations an administrator composes without a developer: a trigger, conditions, actions |
| 10  | Translations, and right-to-left languages                                                 |
| 11  | A design system with a light and a dark mode                                              |
| 12  | Configuration per environment or customer read at start, with no build per environment    |
| 13  | Plugins loaded at run time without rebuilding the application                             |
| 14  | Test tooling and CI conventions the product provides                                      |
| 15  | An open-source licence                                                                    |
| 16  | Self-hosting, documented                                                                  |
| 17  | Records read from services or databases the team already runs                             |

## The matrix

| Product     | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  |
| ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| stealth     | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ◐   | ●   | ●   | ◐   | ◐   |
| Wasp        | ●   | ◐   | ●   | ○   | ○   | ●   | ●   | ○   | ○   | ○   | ○   | ◐   | ○   | ◐   | ●   | ●   | ○   |
| Payload     | ●   | ●   | ●   | ◐   | ●   | ●   | ●   | ◐   | ○   | ◐   | ◐   | ◐   | ○   | ◐   | ●   | ●   | ○   |
| Keystone    | ●   | ●   | ◐   | ◐   | ○   | ●   | ○   | ○   | ○   | ○   | ○   | ○   | ○   | ◐   | ●   | ●   | ○   |
| Refine      | ●   | ◐   | ◐   | ◐   | ○   | ◐   | ○   | ○   | ○   | ◐   | ◐   | ◐   | ○   | ◐   | ●   | ●   | ●   |
| react-admin | ●   | ◐   | ◐   | ◐   | ○   | ◐   | ○   | ○   | ○   | ◐   | ●   | ◐   | ○   | ○   | ●   | ●   | ●   |
| Supabase    | ◐   | ◐   | ●   | ◐   | ◐   | ●   | ●   | ◐   | ○   | ○   | ○   | ◐   | ○   | ○   | ●   | ●   | ○   |
| NocoBase    | ◐   | ◐   | ●   | ●   | ◐   | ●   | ●   | ○   | ●   | ◐   | ●   | ●   | ●   | ◐   | ◐   | ●   | ●   |
| Directus    | ◐   | ●   | ●   | ●   | ○   | ●   | ◐   | ○   | ●   | ●   | ●   | ●   | ◐   | ○   | ◐   | ●   | ●   |
| Saltcorn    | ◐   | ◐   | ●   | ◐   | ●   | ◐   | ●   | ○   | ●   | ◐   | ◐   | ●   | ●   | ○   | ●   | ●   | ○   |
| Budibase    | ○   | ◐   | ●   | ●   | ●   | ○   | ◐   | ○   | ●   | ◐   | ◐   | ●   | ◐   | ○   | ●   | ●   | ●   |
| Appsmith    | ◐   | ◐   | ●   | ◐   | ○   | ○   | ◐   | ○   | ◐   | ○   | ◐   | ●   | ○   | ○   | ●   | ●   | ●   |
| ToolJet     | ◐   | ◐   | ●   | ●   | ◐   | ○   | ◐   | ○   | ◐   | ◐   | ●   | ◐   | ○   | ◐   | ●   | ●   | ●   |
| Retool      | ◐   | ◐   | ●   | ◐   | ○   | ○   | ◐   | ○   | ●   | ◐   | ●   | ◐   | ○   | ◐   | ○   | ◐   | ●   |
| Backstage   | ●   | ○   | ◐   | ◐   | ○   | ◐   | ◐   | ●   | ◐   | ◐   | ●   | ◐   | ◐   | ●   | ●   | ●   | ●   |
| Odoo        | ◐   | ◐   | ●   | ●   | ●   | ◐   | ●   | ○   | ◐   | ◐   | ○   | ●   | ◐   | ◐   | ●   | ●   | ○   |

## Two groups of product

Three products derive an admin application from a declared data model today: Payload,
Keystone and Directus. Each gives an editor a list and a form per collection. None derives
the screens a product's own users work in, and none loads a plugin at run time. NocoBase and
Saltcorn do load plugins at run time, and both keep the application itself in a database the
team configures through a builder instead of in source the team owns. The internal-tools
builders, Budibase, Appsmith, ToolJet and Retool, give an administrator automations and a
first screen quickly, and they keep the application in the vendor's editor, with source
control as a paid feature where it exists at all. Backstage runs one application and loads
plugins into it, and gives adopters a test harness for the frontend and the backend, but it
derives nothing from a data model. Odoo declares a model once and generates a default view
from it, in Python, inside its suite.

The split in column 17 is the one that matters most for a company that already runs services.
The products that read from what a team already has, and the products that derive an API and
screens from a declared record, are almost two different sets. Payload, Keystone and Odoo
derive a great deal and expect to own the data. Refine, react-admin, Retool and the other
builders connect to anything and derive little beyond a scaffold.

No product in the set combines all four of: the application as TypeScript in the team's own
repository, an API and screens derived from a declared record whether or not the product
stores it, plugins loaded while the application runs, and a product composed at start from a
document. That combination is stealth's design. Two of its columns are built today, the test
tooling and the licence. The rest is specified and not yet code, which
[What stealth is](what-stealth-is.md) says in its own words.

## The products

Each profile gives what the product is in its own words, its licence, its star count, and the
reason behind each half mark. Every repository was last pushed on September 8, 2026 unless
the profile says otherwise.

**Wasp** is "a full-stack web application framework using React, Node.js, and Prisma"; MIT;
18,726 stars. A `crud` declaration generates queries and actions
for an entity and no screens. Its auth page covers email, username and password, Google,
GitHub, Keycloak, Slack and Discord with sessions in the database, and says nothing about
roles: an operation checks `context.user` itself. Jobs run on PgBoss with a cron schedule.
Client environment variables "are injected into the client Javascript code during the build
process". Its testing page provides Vitest helpers for the client and says Wasp "currently
does not provide a way to test your server-side code". No documentation page covers
translations. In May 2026 its team wrote that inventing the Wasp language "was a mistake"
and the configuration moved to TypeScript.

**Payload** is "the Next.js fullstack framework" with an admin panel, database migrations,
REST and GraphQL APIs, authentication and access control "in a TypeScript codebase users own
and deploy anywhere"; MIT; 44,630 stars. A collection config yields the table, both APIs and
the admin panel's list and edit views. Access control is functions the developer writes at
collection, field and operation level, and the documentation uses a role field as its
example while providing no role system itself. The multi-tenant plugin and the search plugin
are official and open source; the search plugin
keeps "a static copy of each of your documents using only search-critical data" that you
define. The admin panel comes translated into more than thirty languages, and it can align
input text right to left. Users choose light or dark mode for the admin
panel; it is not a design system for a product's own screens. Deployment needs a Next.js
build, and testing is covered by community answers and the plugin template rather than a
guide.

**Keystone** is "the superpowered headless CMS for Node.js, built with GraphQL and React";
MIT; pushed September 2, 2026; 9,970 stars. A list config yields the Prisma table, the
GraphQL API and the Admin UI. `createAuth` provides password sign-in and sessions, and its
page names no other method. Access control is functions at operation, filter, item and field
level, with roles not stated. The testing guide provides `@keystone-6/core/testing` helpers
for Vitest and says nothing about CI. Its pages say nothing about jobs, search, translations,
theming or multi-tenancy.

**Refine** is "a React meta-framework for CRUD-heavy web applications" with "a headless
architecture"; MIT; last pushed June 5, 2026; 35,645 stars. The three-month gap is the
longest in this set. It is a frontend: a data provider connects it to REST, GraphQL,
Supabase, Hasura, Strapi, Appwrite or NestJS. The Inferencer generates list, show, create
and edit views from the data and is "not meant to be used in production environments". The
auth provider and the access control provider are interfaces the developer implements; the
enterprise offering adds identity integrations and "support for widely accepted
authorization models". Translations come from an `i18nProvider` the developer supplies over
default English texts, with a right-to-left example in the docs. Dark mode comes from the UI
library chosen, Ant Design, Material UI, Chakra, Mantine or shadcn. The testing page
recommends Cypress and says "you don't need unit testing".

**react-admin** is "a frontend framework for single-page applications on top of REST/GraphQL
APIs"; MIT; 26,930 stars. The guessers build a list or a form from a response and are "not
intended to be used in production". Authentication is an `authProvider` the developer
implements, with ready-made providers for Google Identity, Microsoft Entra ID, AWS Cognito,
Auth0 and Keycloak. Role-based access control is `ra-rbac`, "an Enterprise Edition package".
Thirty-nine translation packages exist, Arabic, Hebrew and Farsi among them, and the locales
page does not mention right-to-left rendering. Five built-in themes each have a light and a
dark variant, and the B&W theme is "ideal for visually impaired users". The documentation
index links to no page on testing or deployment.

**Supabase** is "the Postgres development platform", a backend that gives a table REST and
GraphQL APIs and SDKs and no screens; Apache-2.0; 108,978 stars.
Auth covers password, magic link, one-time password, social login and SSO, and issues JWTs
that row-level security policies read. Roles are Postgres's `anon` and `authenticated`, and
tenant isolation is a policy the developer writes. Cron, queues, realtime and edge functions
are built in; full-text search is Postgres's, with the developer writing the index and the
query. Self-hosting runs on Docker without branching, managed backups or the management API.

**NocoBase** is "an open-source AI + no-code platform for building business systems";
24,107 stars. Its own NocoBase License Agreement covers a free Community Edition and paid
editions, and it is not an OSI licence. A collection gets a REST API, and pages and blocks
are configured in the UI Builder. Plugins are TypeScript, and the plugin manager lets you
"install, enable, or disable plugins as needed... without modifying code". Workflows with
collection events, schedules, webhooks and approvals are configured "through a visual
interface, without writing any code". Multi-app needs the App supervisor plugin, marked
Enterprise Edition and above. The interface comes in five languages, with a localisation
plugin for the rest and no page on right-to-left. The
theme editor has a dark and a compact mode. A server-side testing toolchain with
`createMockServer` is documented; CI is not.

**Directus** is "a backend your whole team can use" that wraps a SQL database with "REST,
GraphQL, and SDKs out of the box"; Monospace Sustainable Core License, source-available and
free for organisations under five million dollars of revenue and fifty employees; 37,816
stars. A collection gets both APIs and the Data Studio's collection
and item pages. Access control is users, roles, policies and permissions per collection,
field and item, set in the Settings module. Flows chain operations with a condition
operation; the page shows them configured in the Studio. Content translations, a Studio
translated on Crowdin, and right-to-left rendering of both are documented, as are light and
dark Studio themes. Extensions are TypeScript, built with `npm run build`, and loaded on a
restart or with `EXTENSIONS_AUTO_RELOAD` on. A schedule trigger for Flows is not on the page
read, and no page covers testing.

**Saltcorn** is "a free and open source no-code application builder"; MIT; pushed
September 6, 2026; 2,067 stars. Tables are created in the builder and views are "built
visually"; a REST-like JSON API reads and writes tables. Each user has exactly one role out
of four, and a resource names its minimum role; custom roles are promised for "future
versions". Multitenancy runs one site per subdomain. Triggers bind an action to an event or
a schedule, and workflows are persisted runs built "block-by-block with Blockly" or in
JavaScript. Plugins are npm packages installed from the module store at run time. A
translations page exists; right-to-left, dark mode and testing are not documented.

**Budibase** is "an open-source platform for internal tools and workflow automation"; GPL-3,
and each package has its own licence file; 28,264 stars. Apps are built in the design
section, and custom components in Svelte and custom datasources are the code extension
points. Roles exist at tenant and workspace level with custom roles;
SSO is OpenID Connect and Google; workspaces and tenant management are documented for cloud
and self-hosted. Translations are "currently available to Enterprise users only" and cover
the system text. Themes are Light, Nord and Midnight, with dark mode not named as such. No
page documents an API for the internal database, search, or test tooling.

**Appsmith** is "an open-source developer tool that enables the rapid development of"
internal applications; Apache-2.0; 40,838 stars. Apps are built from widgets and queries in
the editor, with git version control, branch protection and a
branch per environment. Form login, Google, GitHub, OpenID Connect and SAML are documented
without naming editions. Granular access control and workflows carry the Business tier
badge. Theming sets font, colour, radius and shadow; dark mode, translations, plugins and
test tooling are not documented.

**ToolJet** is "the open-source foundation of ToolJet AI, the enterprise app generation
platform for internal tools"; AGPL-3.0; 40,868 stars. Apps are built in the builder over
data sources and the ToolJet database. Roles with granular
permissions, SSO, workflows with schedules and webhooks, and light, dark and auto theme modes
are documented. GitSync and multi-environment with promotion are Team Plan features, and the
free Basic licence allows one workspace, two applications and two workflows. Localisation is
a contributor guide for the platform's own interface. Testing is Cypress against `data-cy`
selectors the builder adds to every component.

**Retool** is "a platform for building, automating, and governing enterprise applications";
proprietary, with a free plan up to five users; no public repository. Apps are built and kept
in Retool's editor; source control with GitHub, GitLab, Bitbucket, Azure Repos and CodeCommit
is an Enterprise feature. Free and Team plans have the default Admin and All Users groups; custom
groups start on Business. Workflows run on schedules and webhooks, with 500 runs a month on
the free plan. Internationalisation is "generally available for organizations on the
Enterprise plan". Themes carry light and dark modes. WebDriver tests with Cypress or
Playwright and test deployments in CI are documented. Self-hosting "is available on
Enterprise plans".

**Backstage** is "an open source framework for building developer portals"; Apache-2.0;
34,373 stars. An app is TypeScript in the adopter's repository, composed of frontend and
backend plugins. Auth providers for Auth0, Azure, GitHub, GitLab,
Google, Okta and others are built in, and the adopter writes the sign-in page and the
resolvers. The permission framework runs policies the adopter writes. Search indexes the
catalog, TechDocs and whatever a plugin's collator adds, on Lunr, Elasticsearch or Postgres.
The events backend publishes and subscribes by topic. Internationalisation is an alpha API
on i18next. Light and dark themes are built in, on Material UI or the newer Backstage UI.
Configuration is YAML per environment, with the frontend seeing only what a schema marks
visible. Dynamic plugins are "experimental" on the backend and module federation on the
frontend. `@backstage/backend-test-utils` and `@backstage/frontend-test-utils` start whole
harnesses. Nothing derives a screen from a data model.

**Odoo** is "open source apps to grow your business"; LGPL-3 for the Community edition, with
Enterprise under its own licence; 54,229 stars. You write a module in Python, XML and
JavaScript, and put it on the addons path. The ORM creates the table for a model, and Odoo
"is able to generate default views for a given model", which the tutorial then calls "never
acceptable for a business application". Groups, access rights, record rules and field access
are built in, as is multi-company. The external API is JSON-2 with API keys. Scheduled
actions and server actions are built in, and an administrator creates automation rules "with
Odoo Studio". Right-to-left needs the `rtlcss` package and has a history of forum-reported gaps.
Installing a module happens from the Apps menu after the code is on the addons path and the
server restarts. Python tests, HOOT JavaScript tests and tours are documented; CI is not.
No page found covers dark mode or search views.

## References

| Product     | Page                                        | URL                                                                                                 |
| ----------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Wasp        | Introduction                                | https://wasp.sh/docs                                                                                |
| Wasp        | Auth overview                               | https://wasp.sh/docs/auth/overview                                                                  |
| Wasp        | Automatic CRUD                              | https://wasp.sh/docs/data-model/crud                                                                |
| Wasp        | Recurring jobs                              | https://wasp.sh/docs/advanced/jobs                                                                  |
| Wasp        | Testing                                     | https://wasp.sh/docs/project/testing                                                                |
| Wasp        | Env variables                               | https://wasp.sh/docs/project/env-vars                                                               |
| Wasp        | Inventing a new language was a mistake      | https://wasp.sh/blog/2026/05/13/new-language-for-web-dev-was-a-mistake                              |
| Payload     | What is Payload                             | https://payloadcms.com/docs/getting-started/what-is-payload                                         |
| Payload     | Authentication                              | https://payloadcms.com/docs/authentication/overview                                                 |
| Payload     | Access control                              | https://payloadcms.com/docs/access-control/overview                                                 |
| Payload     | Jobs queue                                  | https://payloadcms.com/docs/jobs-queue/overview                                                     |
| Payload     | I18n                                        | https://payloadcms.com/docs/configuration/i18n                                                      |
| Payload     | Multi-tenant plugin                         | https://payloadcms.com/docs/plugins/multi-tenant                                                    |
| Payload     | Search plugin                               | https://payloadcms.com/docs/plugins/search                                                          |
| Payload     | The Admin Panel                             | https://payloadcms.com/docs/admin/overview                                                          |
| Payload     | Deployment                                  | https://payloadcms.com/docs/production/deployment                                                   |
| Keystone    | Docs                                        | https://keystonejs.com/docs                                                                         |
| Keystone    | Auth                                        | https://keystonejs.com/docs/config/auth                                                             |
| Keystone    | Access control                              | https://keystonejs.com/docs/config/access-control                                                   |
| Keystone    | Testing                                     | https://keystonejs.com/docs/guides/testing                                                          |
| Keystone    | Config                                      | https://keystonejs.com/docs/config/config                                                           |
| Refine      | Docs                                        | https://refine.dev/docs/                                                                            |
| Refine      | License                                     | https://refine.dev/core/docs/further-readings/license/                                              |
| Refine      | i18n provider                               | https://refine.dev/core/docs/i18n/i18n-provider/                                                    |
| Refine      | Access control provider                     | https://refine.dev/core/docs/authorization/access-control-provider/                                 |
| Refine      | Inferencer                                  | https://refine.dev/core/docs/packages/inferencer/                                                   |
| Refine      | Deployment                                  | https://refine.dev/core/docs/guides-concepts/deployment/                                            |
| Refine      | Testing                                     | https://refine.dev/core/docs/further-readings/testing/                                              |
| Refine      | Enterprise                                  | https://refine.dev/enterprise/                                                                      |
| Refine      | RTL example                                 | https://refine.dev/docs/examples/customization/rtl/                                                 |
| react-admin | Documentation                               | https://marmelab.com/react-admin/documentation.html                                                 |
| react-admin | Authentication                              | https://marmelab.com/react-admin/Authentication.html                                                |
| react-admin | Role-based access control                   | https://marmelab.com/react-admin/AuthRBAC.html                                                      |
| react-admin | Translation                                 | https://marmelab.com/react-admin/Translation.html                                                   |
| react-admin | Available locales                           | https://marmelab.com/react-admin/TranslationLocales.html                                            |
| react-admin | Theming                                     | https://marmelab.com/react-admin/AppTheme.html                                                      |
| react-admin | Guessers                                    | https://marmelab.com/react-admin/ListGuesser.html                                                   |
| Supabase    | Docs                                        | https://supabase.com/docs                                                                           |
| Supabase    | Auth                                        | https://supabase.com/docs/guides/auth                                                               |
| Supabase    | Row-level security                          | https://supabase.com/docs/guides/database/postgres/row-level-security                               |
| Supabase    | Full-text search                            | https://supabase.com/docs/guides/database/full-text-search                                          |
| Supabase    | Self-hosting                                | https://supabase.com/docs/guides/self-hosting                                                       |
| Supabase    | Local development                           | https://supabase.com/docs/guides/local-development/overview                                         |
| NocoBase    | Docs                                        | https://docs.nocobase.com/                                                                          |
| NocoBase    | Plugin development                          | https://docs.nocobase.com/plugin-development                                                        |
| NocoBase    | Workflow                                    | https://docs.nocobase.com/workflow                                                                  |
| NocoBase    | Multi-app                                   | https://docs.nocobase.com/multi-app/multi-app                                                       |
| NocoBase    | API keys                                    | https://docs.nocobase.com/integration/api-keys/usage                                                |
| NocoBase    | Language settings                           | https://docs.nocobase.com/handbook/system-settings/language-settings/                               |
| NocoBase    | Theme editor                                | https://docs.nocobase.com/handbook/theme-editor/                                                    |
| NocoBase    | Server test                                 | https://v2.docs.nocobase.com/plugin-development/server/test                                         |
| NocoBase    | License agreement                           | https://github.com/nocobase/nocobase/blob/main/LICENSE.txt                                          |
| Directus    | Docs                                        | https://directus.com/docs                                                                           |
| Directus    | Licensing                                   | https://directus.com/docs/licensing/overview                                                        |
| Directus    | Access control                              | https://directus.com/docs/guides/auth/access-control                                                |
| Directus    | Self-hosting                                | https://directus.com/docs/self-hosting/overview                                                     |
| Directus    | Extensions                                  | https://directus.com/docs/guides/extensions/overview                                                |
| Directus    | Extensions quickstart                       | https://directus.com/docs/guides/extensions/quickstart                                              |
| Directus    | Flows operations                            | https://directus.com/docs/guides/flows/operations                                                   |
| Directus    | Translations                                | https://directus.com/docs/guides/content/translations                                               |
| Directus    | Theming                                     | https://directus.com/docs/configuration/theming                                                     |
| Saltcorn    | Home                                        | https://saltcorn.com/                                                                               |
| Saltcorn    | Workflows and actions                       | https://saltcorn.com/page/automation.html                                                           |
| Saltcorn    | Wiki                                        | https://wiki.saltcorn.com/                                                                          |
| Saltcorn    | Multitenancy                                | https://wiki.saltcorn.com/view/ShowPage/multitenancy                                                |
| Saltcorn    | Security and access control with user roles | https://wiki.saltcorn.com/view/ShowPage/security-and-access-control-with-user-roles                 |
| Saltcorn    | Module store                                | https://wiki.saltcorn.com/view/ShowPage/module-store                                                |
| Budibase    | Docs index                                  | https://docs.budibase.com/llms.txt                                                                  |
| Budibase    | User roles                                  | https://docs.budibase.com/docs/user-roles                                                           |
| Budibase    | Authentication and SSO                      | https://docs.budibase.com/docs/authentication-and-sso                                               |
| Budibase    | Translations                                | https://docs.budibase.com/docs/translations                                                         |
| Budibase    | Custom plugins                              | https://docs.budibase.com/docs/custom-plugin                                                        |
| Budibase    | Theming                                     | https://docs.budibase.com/docs/app-theming                                                          |
| Budibase    | Licence                                     | https://github.com/Budibase/budibase/blob/master/LICENSE                                            |
| Appsmith    | Docs                                        | https://docs.appsmith.com/                                                                          |
| Appsmith    | Authentication                              | https://docs.appsmith.com/getting-started/setup/instance-configuration/authentication               |
| Appsmith    | Granular access control                     | https://docs.appsmith.com/advanced-concepts/granular-access-control                                 |
| Appsmith    | Workflows                                   | https://docs.appsmith.com/workflows                                                                 |
| Appsmith    | Git version control                         | https://docs.appsmith.com/advanced-concepts/version-control-with-git                                |
| Appsmith    | Theming                                     | https://docs.appsmith.com/core-concepts/building-ui/designing-an-application/app-theming            |
| ToolJet     | Docs                                        | https://docs.tooljet.com/docs/                                                                      |
| ToolJet     | Licensing                                   | https://docs.tooljet.com/docs/tj-setup/licensing/self-hosted/                                       |
| ToolJet     | Access control                              | https://docs.tooljet.com/docs/user-management/role-based-access/access-control/                     |
| ToolJet     | Workflows                                   | https://docs.tooljet.com/docs/workflows/overview/                                                   |
| ToolJet     | GitSync                                     | https://docs.tooljet.com/docs/development-lifecycle/gitsync/overview/                               |
| ToolJet     | Multi-environment                           | https://docs.tooljet.com/docs/development-lifecycle/environment/self-hosted/multi-environment/      |
| ToolJet     | Testing                                     | https://docs.tooljet.com/docs/development-lifecycle/testing/overview/                               |
| ToolJet     | Themes                                      | https://docs.tooljet.com/docs/app-builder/building-ui/canvas/                                       |
| ToolJet     | Localization                                | https://docs.tooljet.com/docs/contributing-guide/l10n/                                              |
| Retool      | Docs                                        | https://docs.retool.com/                                                                            |
| Retool      | Self-hosted                                 | https://docs.retool.com/self-hosted                                                                 |
| Retool      | Permissions                                 | https://docs.retool.com/permissions                                                                 |
| Retool      | Source control                              | https://docs.retool.com/source-control                                                              |
| Retool      | Workflows                                   | https://docs.retool.com/workflows                                                                   |
| Retool      | Internationalization                        | https://docs.retool.com/org-users/concepts/internationalization                                     |
| Retool      | Themes                                      | https://docs.retool.com/apps/guides/presentation-styling/themes                                     |
| Retool      | WebDriver tests                             | https://docs.retool.com/docs/testing                                                                |
| Retool      | Pricing                                     | https://retool.com/pricing                                                                          |
| Backstage   | What is Backstage                           | https://backstage.io/docs/overview/what-is-backstage                                                |
| Backstage   | Authentication                              | https://backstage.io/docs/auth/                                                                     |
| Backstage   | Permissions                                 | https://backstage.io/docs/permissions/overview                                                      |
| Backstage   | Search                                      | https://backstage.io/docs/features/search/                                                          |
| Backstage   | Internationalization                        | https://backstage.io/docs/plugins/internationalization                                              |
| Backstage   | Configuration                               | https://backstage.io/docs/conf/                                                                     |
| Backstage   | Customize the look-and-feel                 | https://backstage.io/docs/getting-started/app-custom-theme/                                         |
| Backstage   | Backend feature loaders                     | https://backstage.io/docs/backend-system/architecture/feature-loaders/                              |
| Backstage   | Events service                              | https://backstage.io/docs/reference/plugin-events-node.eventsservice/                               |
| Backstage   | Testing backend plugins                     | https://backstage.io/docs/backend-system/building-plugins-and-modules/testing/                      |
| Odoo        | Developer documentation                     | https://www.odoo.com/documentation/19.0/developer.html                                              |
| Odoo        | Security                                    | https://www.odoo.com/documentation/19.0/developer/reference/backend/security.html                   |
| Odoo        | Actions                                     | https://www.odoo.com/documentation/19.0/developer/reference/backend/actions.html                    |
| Odoo        | External API                                | https://www.odoo.com/documentation/19.0/developer/reference/external_api.html                       |
| Odoo        | Multi-company guidelines                    | https://www.odoo.com/documentation/19.0/developer/howtos/company.html                               |
| Odoo        | Automation rules                            | https://www.odoo.com/documentation/19.0/applications/studio/automated_actions.html                  |
| Odoo        | Testing                                     | https://www.odoo.com/documentation/19.0/developer/reference/backend/testing.html                    |
| Odoo        | Basic views                                 | https://www.odoo.com/documentation/19.0/developer/tutorials/server_framework_101/06_basicviews.html |
| Odoo        | Licence                                     | https://github.com/odoo/odoo/blob/master/LICENSE                                                    |
