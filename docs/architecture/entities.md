---
title: Declaring an entity
description: 'What a plugin author writes for a kind of record, what the platform writes from that declaration, and what stays the author to write.'
sidebar:
  order: 2
---

An entity is a kind of record. A plugin declares one in its contract, and the platform writes
the table, the API, the events, the search index and the screens from that declaration. This
is the idea the rest of the platform is built around.

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

The id is `<plugin>.<entity>`. `fields` is a schema in the one schema language every boundary
checks with. `key` names the field that identifies a record. `title` says how a record reads
in a list, a picker, a breadcrumb and a notification. `search` names the fields the index
covers. `permissions` names what a caller needs to read, write and delete one.

## What the platform writes

| The platform writes                                                                                                      | Where it lives                 |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| A table with the declared columns, plus `id`, `tenant`, `version`, `createdAt`, `createdBy`, `updatedAt` and `updatedBy` | the plugin's own schema        |
| A migration for every change to the fields                                                                               | the plugin's migrations        |
| A row policy that scopes every read and write to one organisation                                                        | the same table                 |
| `List` with paging, filtering and sorting, `Get`, `Create`, `Update`, `Delete`, `BatchGet` and `Watch`                   | the plugin's backend           |
| A GraphQL type, a connection, queries, mutations, resolvers and loaders                                                  | the plugin's part of the graph |
| A created, an updated and a deleted event, published in the writing transaction                                          | the events service             |
| An audit record for every mutation                                                                                       | the audit plugin               |
| An index over the fields `search` names                                                                                  | the search plugin              |
| The subject other plugins read to learn what a page is about                                                             | the contract                   |
| The mutations as commands, which are the tools an agent may call                                                         | the contract                   |
| The TypeScript type, the form schema and the persisted documents                                                         | the contract                   |
| A list screen, a detail screen and a form screen                                                                         | the plugin's web part          |

## The three screens

Each screen names the entity and takes options only for what the declaration does not say.

```tsx
// web/src/screens/index.tsx
export default listScreen(agreement, { columns: ['title', 'status', 'renewsOn'] })

// web/src/screens/$id.tsx
export default detailScreen(agreement)

// web/src/screens/$id.edit.tsx
export default formScreen(agreement)
```

The list carries its search, its filters, its sort and its page in the URL, so a person sends
a colleague a link and the colleague sees the same rows. The form validates as a person types
with the schema the backend checks, and it shows a refusal from the backend at the field that
caused it. All three hide what the person may not do.

Every capability the platform has keys on the entity and applies without being asked:
activity and comments in the aside every detail screen draws, favourites and recents, an
entry in the command palette, notification rules, saved views, and the custom fields an
administrator added.

## What a reference to another entity gives you

`ref(suppliers.entities.supplier)` is one declaration and three behaviours. The column holds
the other record's key. The graph resolves the field across the two plugins. A form draws a
picker that searches the other entity by its own title and search fields.

## What an extensible entity gives an organisation

`extensible: true` lets an administrator add fields to the entity for their organisation
alone. The platform validates a write against the organisation's schema, renders the new
fields in the same forms and filters, and indexes them. A person adds one of those fields as
a column in a saved view, so a list nobody asked to change does not change.

## What the author still writes

The platform writes nothing that is particular to the business. A rule, a join across
plugins, an aggregate, or a procedure that is not about one record is the author's, and
[Changing what is derived](changing.md) says how each of those attaches to what the platform
already wrote.
