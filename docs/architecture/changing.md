---
title: Taking over what the platform wrote
description: 'Three ways to change the data layer the platform derived, from an option on the declaration to owning the generated code outright.'
sidebar:
  order: 6
---

What the platform derives from a declaration is the data layer: the schema, the API, the
procedures, the events and, where the platform stores the record, the table. A screen is not
in that list, because a plugin composes its own.

So this page is about one question. What happens when a generated procedure is not what your
business does.

| Step      | You write                                | The platform keeps writing         |
| --------- | ---------------------------------------- | ---------------------------------- |
| Configure | options on the declaration               | everything else                    |
| Hook      | a function the generated procedure calls | the procedure around your function |
| Own       | the code, written out by `stealth eject` | every part you did not eject       |

## Configure

Adding a field to the declaration changes the table, the schema, the API and every component
that reads the entity at once. Marking an entity extensible lets an administrator add fields
without a release at all.

## Hook

Where a record has a rule, the plugin's backend exports it against the generated procedure's
own types. The procedure keeps its validation, its authorisation, its audit record and its
event, and calls your function at the point the rule belongs.

```ts
export const hooks: EntityHooks<typeof agreement> = {
  authorize: async (call, action, record) => call.identity.can(permissions.write, record.id),
  beforeUpdate: async (call, current, next) => {
    if (current.status === 'signed' && next.status === 'draft')
      throw failed('signed_stays_signed', { path: 'status' })
    return next
  },
  afterCommit: async (call, event) =>
    call.notifications.send(event.record.createdBy, 'renewed', { title: event.record.title }),
}
```

A refusal from a hook carries a code, and the code is what a form translates, so a person
reads the rule in their own language at the field it applies to.

## Own

Where a hook is not enough, take the code:

```sh
stealth eject procedure agreements.agreement update
```

The command writes what the platform generated into the plugin as ordinary source, and the
build stops using the generated copy. Everything you did not eject stays generated: ejecting
one procedure leaves the other six.

The platform keeps generating what you ejected, for comparison alone:

```sh
stealth eject --diff
```

That prints how far each owned copy has drifted from what every other entity gets, so you can
see which improvements you are no longer receiving. Taking the platform's version again is
deleting your file.

## What is not derived at all

A join across plugins, an aggregate, or a procedure that is not about one record is written
in the plugin's backend from the start, exposed through its own part of the graph. There is
nothing to eject, because there was never a generated version.

The same holds for a screen. [Building a screen](screens.md) covers the three ways to write
one, and extending a screen another team wrote is a block in one of its slots rather than a
change to their code.
