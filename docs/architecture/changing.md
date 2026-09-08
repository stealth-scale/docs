---
title: Changing what is derived
description: 'The four steps between taking a derived screen or procedure as it is and owning the code outright, and the rule that each step keeps the ones before it.'
sidebar:
  order: 3
---

Sometimes what the platform derived is not what you need. Four steps take you from the
derived screen or procedure to code you own outright. You take the first step that solves the
problem, and every step keeps what the steps before it gave you.

| Step      | You write                                         | The platform keeps writing         |
| --------- | ------------------------------------------------- | ---------------------------------- |
| Configure | options on the screen, or fields on the entity    | everything else                    |
| Compose   | a block in a slot the screen draws                | the screen                         |
| Hook      | a function the generated procedure calls          | the procedure around your function |
| Own       | the expanded code, written out by `stealth eject` | every part you did not eject       |

## Configure

A derived screen takes options for what the declaration does not say: which columns a list
shows, which tabs a detail screen draws, how a form is grouped. Adding a field to the entity
changes the table, the API, the form and the filters at once.

## Compose

Every screen draws three slots by convention, for its actions, its aside and its tabs, and a
screen declares more when it has more to offer. Any plugin puts a block into any of them
under a rule that says where and when the block shows. A block adds a tab to a detail screen
another team wrote, without either plugin importing the other.

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

A refusal from a hook carries a code, and the code is what the form translates, so the person
reads the rule in their own language at the field it applies to.

## Own

Where a hook is not enough, take the code:

```sh
stealth eject procedure agreements.agreement update
stealth eject screen agreements.detail
```

The command writes what the platform generated into the plugin as ordinary source, and the
build stops using the generated copy. Everything you did not eject stays generated: ejecting
one procedure leaves the other six, and ejecting the detail screen leaves the list and the
form.

The platform keeps generating what you ejected, for comparison alone:

```sh
stealth eject --diff
```

That prints how far each owned copy has drifted from what every other entity gets, so you can
see what improvements you are no longer receiving. Adopting the platform's version again is
deleting your file.

## The rule

Each step keeps everything below it. A screen you eject still draws its slots, so other
plugins keep extending it. A procedure you eject still runs inside the transaction that
writes the audit record and publishes the event. Nothing about ejecting takes you out of the
platform, and nothing about it is one way.
