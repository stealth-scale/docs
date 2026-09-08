---
title: Versions and upgrades
description: 'What a plugin declares about the platform it was built for, which versions the platform supports at once, and what happens to data when a declaration changes.'
sidebar:
  order: 14
---

A platform that loads plugins at run time has to say what happens when the two are not the
same age. Stealth says it in three places: a declared range, a support window, and a rule
about what a schema change may do to data.

## The range

The host publishes the platform version it runs. A plugin's manifest declares the range it
was built against, and the ranges of every other plugin's contract it uses. The build writes
those from the resolved packages, so nobody maintains a number by hand.

```json
{
  "id": "agreements",
  "version": "2.3.0",
  "platform": "^4",
  "requires": { "suppliers": "^3" },
  "optional": { "billing": "^1" }
}
```

At start, the shell compares each plugin's ranges against what is actually loaded. A plugin
outside the range, or one whose required plugin is missing, is left out whole and reported by
id, version and reason. A plugin that half works is worse than a plugin that is missing, and
a report an operator can read is worth more than a screen that renders half.

An optional dependency that is absent costs nothing. Blocks aimed at its slots never render,
a link to its screens falls back, and a reference to its entities renders as a key.

## The support window

- The platform supports the current major and the one before it. A plugin built against
  either loads.
- A major release ships codemods for what changed mechanically, and `stealth upgrade` runs
  them against a plugin.
- A deprecation carries a reason and the release it will be removed in, and it is reported
  wherever anything still uses it.
- Nothing is removed in a minor.

## What a change to a declaration costs

| The change                            | What it costs                                                              |
| ------------------------------------- | -------------------------------------------------------------------------- |
| adding a field                        | a migration, applied at start. Nothing else changes                        |
| adding an optional field to a command | nothing; an older caller keeps working                                     |
| renaming a field                      | a migration that names both sides, and one release where both are readable |
| removing a field                      | two releases: one that stops reading it, one that drops it                 |
| narrowing a field's type              | the same as removing it, because an existing row may not fit               |

The generator writes the migration and a person reviews it, because a migration is code. A
migration that would drop or narrow a column is refused unless the plugin ships one that names
it, so no schema change destroys data quietly.

The same rule holds for the API. A removed or narrowed field fails the check against what
deployed clients actually call, and it stays refused until the major moves and nothing calls
it any more.

## What a person sees during a release

The document carries a version. The browser re-reads the document on focus, and when the
version changes it offers to reload at a quiet moment, never while a form is dirty. A code
chunk that a redeploy removed is retried once against the fresh document, and if that fails
the browser offers the same reload rather than showing a broken screen.

A backend applies its migrations under a lock, so two replicas starting together apply them
once. Because a removal takes two releases, the replica still running the previous release
keeps answering while the new one migrates.
