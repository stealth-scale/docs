---
title: What you can replace
description: 'The platform is a set of interfaces with a default implementation behind each, and three things that are fixed so the rest can be replaced safely.'
sidebar:
  order: 5
---

A company adopting a platform rarely wants all of it. It has an identity provider, a feature
flag service, an object store and a search cluster, and it wants the parts it does not have.

So the platform names an interface for each thing a product needs and ships one implementation
of each. This is ports and adapters: the platform depends on the interface, the implementation
sits outside it, and swapping one changes nothing that used it. A caller names the interface.
It never names the implementation, which is why replacing one is a change to a document rather
than a change to code.

## The interfaces, and what ships behind each

| Interface     | What an implementation must do                                    | What ships                                           |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------- |
| identity      | sign a person in, and issue a token carrying the claims           | passkeys, a second factor, organisations, roles      |
| authorisation | answer whether a caller may act on a record                       | the claims, plus the permissions an entity declares  |
| storage       | store and read an entity's records                                | Postgres, with a schema per plugin                   |
| events        | publish a change, and let a consumer read from where it stopped   | an outbox per backend and one events service         |
| jobs          | run work later, and on a schedule                                 | a queue per backend                                  |
| configuration | read and write values for a deployment, an organisation, a person | the configuration service and the settings area      |
| flags         | evaluate a flag for a person                                      | an OpenFeature provider over the configuration store |
| files         | store a file and serve it                                         | presigned upload and download over an object store   |
| search        | index a record and answer a query                                 | an index over every entity's searchable fields       |
| notifications | deliver a message to a person                                     | subscriptions, delivery and read state               |
| audit         | record what was done, by whom, to what                            | a record from every mutation                         |
| words         | turn a key and its arguments into text                            | the catalogue chain                                  |
| telemetry     | take traces, metrics and logs                                     | OTLP to whatever collector the deployment runs       |
| the API       | compose one schema and answer a query across plugins              | a gateway over every plugin's part                   |
| components    | draw what a screen is made of                                     | the design system                                    |

Replacing one is writing a plugin that satisfies the interface and naming it in the document.
Nothing that used the old one changes, because nothing that used it named it.

## An implementation says what it cannot do

An implementation declares which parts of its interface it supports, and the platform then
offers only those and says what is unavailable. A source that cannot filter gets no filters on
its screens. An identity provider that carries no freshness claim gets no step-up. A storage
implementation that offers no change feed gets no live updates and no automations triggered by
a change.

This is the difference between a platform that adapts and one that fails at run time. What an
implementation cannot do is known when the product is built, not when somebody clicks.

## The three things that are fixed

A platform where everything is negotiable guarantees nothing. Three things hold, and every
guarantee elsewhere rests on them.

**What a verified caller looks like.** Every token carries the same claims and every service
checks the token itself. Who issues it is yours to choose. What a verified caller looks like
is not, because the browser, the gateway and every backend read it without asking each other.

**How a plugin is loaded.** A plugin is described by a manifest, exposes a contract, and is
fetched while the application runs. That is what lets a plugin ship without rebuilding the
product, and what lets a plugin written by another team target this one with types.

**The document.** A product is composed at start from one document. That is what lets one
image run every product, and what lets an operator change a deployment without a build.

## What it costs

An interface is the smallest shape common to the things behind it. A search interface that has
to fit both a Postgres index and a dedicated cluster offers what both can do, and reaching
something only one of them has means naming that one and accepting the coupling.

A default you replace is a default you maintain. The platform's own implementation is tested
against every other part on every change. Yours is tested by you.
