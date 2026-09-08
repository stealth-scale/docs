---
title: What a plugin brings
description: 'A plugin brings as much or as little as it needs: screens, a backend, both, or a mapping onto a service you already run, and what that service can do decides what its screens may offer.'
sidebar:
  order: 4
---

A plugin is one capability. It brings what that capability needs and nothing else, and the
platform assumes none of the parts are there.

| A plugin with            | Has                    | Suits                                                         |
| ------------------------ | ---------------------- | ------------------------------------------------------------- |
| screens only             | web, contract          | a capability over another plugin's data, or over your service |
| screens and a backend    | web, contract, backend | a capability whose data the platform stores                   |
| a backend only           | contract, backend      | data or fields another plugin renders                         |
| a mapping onto a service | contract, backend      | a service you already run, presented as an entity             |

Every part is optional except the contract, because the contract is what another plugin
imports and what the platform reads. A plugin exposes nothing else.

## Where an entity's data is stored

An entity declares what a record contains. It does not decide who stores it. The platform
stores one by default, and reads one from a service you run when the declaration names that
service.

```ts
export const agreement = defineEntity('agreements.agreement', {
  fields: object({ ... }),
  key: 'id',
  permissions: { delete: permissions.remove, read: permissions.read, write: permissions.write },
  search: ['title'],
  source: service(agreements, {
    create: 'CreateAgreement',
    get: 'GetAgreement',
    list: 'ListAgreements',
    update: 'UpdateAgreement',
  }),
  title: (agreement) => agreement.title,
})
```

| Source       | Reads from                                 | You write                                    |
| ------------ | ------------------------------------------ | -------------------------------------------- |
| `stored()`   | the platform's own schema                  | nothing; this is what an absent source means |
| `service()`  | your Connect or gRPC service               | a method name per operation                  |
| `http()`     | your REST API                              | a method, a path and a mapping per operation |
| `graph()`    | your GraphQL, composed into the supergraph | the subgraph and its keys                    |
| `database()` | a SQL schema you already run               | the connection and the table                 |

`stealth import proto ./agreements.proto` and `stealth import openapi ./agreements.yaml` write
the declaration from a schema you already have, so nobody retypes a service's shape.

Whichever source an entity names, the types, the schema, the API, the commands, the subject
and the components that read the declaration are identical. What changes is who stores the
record and which capabilities are available.

## Capabilities decide what a screen may offer

A source declares what it can do. The platform offers only what that source supports, and the
build refuses an option it cannot serve, so a screen never shows a filter that quietly does
nothing.

| Capability | What it lets a screen offer                  | Without it                                    |
| ---------- | -------------------------------------------- | --------------------------------------------- |
| `filter`   | filters, kept in the URL                     | the list shows what the source returns        |
| `sort`     | sortable columns                             | rows arrive in the source's own order         |
| `page`     | paging, with a page size                     | the list takes one call's worth               |
| `watch`    | rows that update as they change              | the browser refetches when the person returns |
| `version`  | a refused lost update, shown as a conflict   | the last write wins, and the form says so     |
| `search`   | the search box and the palette               | the entity is not searchable                  |
| `transact` | a write alongside another in one transaction | each write stands alone                       |

## The identity that reaches your service

The platform forwards the person's identity, and your service stays the authority on what that
person may do. A service account is a declared exception and never a default.

The alternative removes a check your service already makes. If the platform called your
service with one credential for everybody, every screen would be a way around the access
control that service enforces, and nothing in the product would record that it had happened.

## What a plugin exposes to other plugins

The contract, and nothing else. It carries typed references to the plugin's slots, apis,
screens, queries, entities, streams, flags, permissions, configuration and subjects. A plugin
built in another repository, by another team, imports that package and targets those
references with types.

A plugin may also expose procedures to other backends directly, by shipping a protobuf
module. That is how a plugin offers a service of its own rather than data in the graph.
