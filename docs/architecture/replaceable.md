---
title: What you can replace
description: 'Every capability the platform provides is an interface with a default plugin behind it, and three things are fixed so the rest can be replaced safely.'
sidebar:
  order: 5
---

A company adopting a platform rarely wants all of it. It has an identity provider, a feature
flag service, an object store and a search cluster, and it wants the parts it does not have.

So every capability here is an interface, and the plugin the platform ships for it is a
default rather than a requirement. A caller names the interface. It never names the plugin,
which is what makes replacing one a change to a document rather than a change to code.

## What ships, and what replaces it

| Interface     | The default plugin                                   | Replaced by                                         |
| ------------- | ---------------------------------------------------- | --------------------------------------------------- |
| identity      | passkeys, second factor, organisations, roles        | your OpenID Connect provider or identity service    |
| configuration | the configuration service and the settings area      | your configuration store                            |
| flags         | an OpenFeature provider over the configuration store | any OpenFeature provider you already run            |
| files         | presigned upload and download over an object store   | your object store or document service               |
| search        | an index over every entity's searchable fields       | your search cluster                                 |
| notifications | subscriptions, delivery and read state               | your notification service                           |
| audit         | audit records from every mutation                    | your own audit sink                                 |
| the graph     | a gateway composing every plugin's part              | your existing supergraph, composed in               |
| storage       | Postgres, with a schema per plugin                   | your service, or a database you already run         |
| components    | the design system                                    | your own components over the same tokens            |
| the theme     | the base theme                                       | your recipe                                         |
| words         | the catalogue chain                                  | your translation service, behind the same interface |

Replacing one is writing a plugin that satisfies the interface and naming it in the document.
Nothing that used the old one changes, because nothing that used it named it.

## The three things that are fixed

A platform where everything is negotiable guarantees nothing. Three things hold, and every
guarantee elsewhere rests on them.

**How a plugin is loaded.** A plugin is described by a manifest, exposes a contract, and is
fetched while the application runs. That is what lets a plugin ship without rebuilding the
product, and what lets a plugin written by another team target this one with types.

**The claims.** Every token carries the same claims, and every tier verifies the token itself.
That is what lets the browser, the gateway and a backend agree about what a person may do
without asking each other.

**The document.** A product is composed at start from one document. That is what lets one
image run every product, and what lets an operator change a deployment without a build.

Everything else in this section is an interface with a default behind it.

## What that costs

Two things, stated plainly.

An interface is the lowest common shape of the things behind it. A search interface that has
to fit both a Postgres index and a dedicated cluster offers what both can do, and reaching a
capability only one of them has means naming that one and accepting the coupling.

A default you replace is a default you now maintain. The platform's own plugin is tested
against every other part on every change. Yours is tested by you.
