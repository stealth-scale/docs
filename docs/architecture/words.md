---
title: Words, locale and direction
description: "Every string a person reads is a key in a catalogue, resolved through a chain, rendered in that person's language and writing direction."
sidebar:
  order: 7
---

A component contains no words. It speaks keys, and the platform resolves each key in the
language of the person reading it. That rule holds for every string a person can read,
including the ones a developer would not think of as text.

| What                                     | Is a key                                       |
| ---------------------------------------- | ---------------------------------------------- |
| a label, a heading, a message            | yes                                            |
| a screen's title in a manifest           | yes                                            |
| a navigation entry's label               | yes                                            |
| the description of a configuration field | yes                                            |
| the reason a rule refused a write        | yes                                            |
| a block's metadata                       | no, because metadata is never read by a person |

## The catalogue

A package ships its keys and their base locale as ICU MessageFormat data. ICU carries the
things a sentence needs and a template string cannot give: plurals that follow each
language's own rules, selects, and numbers and dates formatted in place.

The platform loads every loaded package's catalogue into one chain and resolves a key along
it. A deployment overrides a key without touching the package. An organisation overrides it
again from the settings area, for its own people only.

| Level           | Written by                      | Wins over      |
| --------------- | ------------------------------- | -------------- |
| a package       | the plugin's author             | nothing        |
| the deployment  | the operator, in an override    | the package    |
| an organisation | an administrator, from a screen | the deployment |

A key with no translation in the active locale falls back to the base locale and is listed,
so an untranslated string is a report rather than a discovery.

## Direction

The direction follows the locale. The platform writes `lang` and `dir` on the document, and
components lay out with logical properties, so a right-to-left product mirrors without a
second stylesheet and without a component knowing which direction it is in. Every component
carries a story that renders it right to left, and that story runs in CI.

## Formatting

Dates, times, numbers, currencies and relative times are formatted from the locale and the
person's own timezone, so no plugin picks a format. A number formatted inside a message and
one formatted beside it agree to the character, because both use the same formatters.

## Refusals are words too

A rule that refuses a write reports a code and its parameters, never a sentence.
The code is what the catalogue translates, so a person reads the rule in their own language
at the field that broke it, and a log reads the same rule in the base locale. A plugin that
refuses with a code ships the message for it, and the checks refuse a code that has none.
