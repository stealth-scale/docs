---
title: Declaring an entity
description: 'What a plugin author writes for a kind of record, and what the platform derives from it: the types, the schema, the API, the events, and storage where the platform is the one storing it.'
sidebar:
  order: 2
---

An entity is a kind of record. A plugin declares one in its contract, and the platform derives
the data layer from that declaration: the types both sides share, the schema every boundary
checks with, the API, the events and, where the platform is the one storing the record, the
table and its migrations.

The declaration derives no user interface on its own. What a plugin renders is the plugin's
choice, and [Building a screen](screens.md) covers the three ways to make that choice.

## The declaration

```ts
import { day, defineEntity, ref } from '@stealthscale/contract-plugin'
import { maxLength, nonEmpty, object, picklist, pipe, string } from '@stealthscale/core-schema'

import { permissions } from './refs.ts'

export const agreement = defineEntity('agreements.agreement', {
  /** An organisation may add fields of its own. */
  extensible: true,
  fields: object({
    renewsOn: day(),
    status: picklist(['draft', 'signed', 'expired']),
    /** A reference to another plugin's entity. */
    supplier: ref(suppliers.entities.supplier),
    title: pipe(string(), nonEmpty(), maxLength(200)),
  }),
  key: 'id',
  permissions: { delete: permissions.remove, read: permissions.read, write: permissions.write },
  search: ['title'],
  title: (agreement) => agreement.title,
})
```

The id is `<plugin>.<entity>`. `fields` is a schema in the one language every boundary checks
with. `key` names the field that identifies a record. `title` says how a record reads wherever
one is named: a row, a picker, a breadcrumb, a notification. `search` names the fields an
index covers. `permissions` names what a caller needs to read, write and delete one.

## What the platform derives

| Derived                                                          | Always                            |
| ---------------------------------------------------------------- | --------------------------------- |
| The TypeScript type the browser and the backend share            | yes                               |
| The schema a form validates with and a procedure refuses against | yes                               |
| Typed queries and mutations, and their persisted documents       | yes                               |
| A GraphQL type, a connection, resolvers and loaders              | yes                               |
| Created, updated and deleted events                              | yes                               |
| An audit record for every mutation the product made              | yes                               |
| The subject other plugins read to learn what a page is about     | yes                               |
| The mutations as commands, which are the tools an agent may call | yes                               |
| A table, its migrations and a row policy                         | only where the platform stores it |
| An index over the fields `search` names                          | only where a change feed exists   |

[What a plugin brings](plugins.md) says how a declaration names a service you already run
instead of letting the platform store the record.

## What a reference to another entity gives you

`ref(suppliers.entities.supplier)` is one declaration and three behaviours. The stored column
holds the other record's key. The graph resolves the field across the two plugins. A form
component draws a picker that searches the other entity by its own title and search fields.

## What an extensible entity gives an organisation

`extensible: true` lets an administrator add fields for their organisation alone. The platform
validates a write against that organisation's schema, and the components that read the
declaration render the added fields like any other. A person adds one as a column in a saved
view, so a list nobody asked to change does not change.

## What the platform does not derive

Nothing that is particular to the business. A rule, a join across plugins, an aggregate, or a
procedure that is not about one record is the author's to write.
[Taking over what the platform wrote](changing.md) says how each of those attaches to what is
already there.
