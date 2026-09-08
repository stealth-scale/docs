---
title: Guarantees and gates
description: 'What every screen gets without its author asking, what enforces each one, and the gates a change passes before it reaches a person.'
sidebar:
  order: 14
---

Each row names something every screen in a stealth product gets without its author asking for
it, and the thing that makes it true. Nothing here is a promise a reviewer has to remember.

| Guarantee                                                                        | Enforced by                                                             |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| A translated title, a heading, a document title and a breadcrumb                 | the screen component and the head, by construction                      |
| Data in the cache before the screen renders, and preloaded on intent             | the loader convention, which the screen builders write                  |
| No blank page: the previous screen stays until the next one is ready             | the router's configuration, asserted by the test harness                |
| Every state drawn: loading, empty, error, forbidden and offline                  | the screen builders and the standard plugin                             |
| Back and forward restore scroll and focus, and announce the title                | the frame, and the end-to-end suite every product ships with            |
| Motion from the theme's tokens, and none under a reduced-motion setting          | the theme contract, and a story per transition                          |
| A skip link, a focus order, and every block reachable by keyboard                | the standard plugin, and an accessibility check on every story          |
| Contrast that clears WCAG in both modes                                          | the palette solver, and colour assertions in the test kit               |
| Correct in the reader's language, formatting and writing direction               | the catalogue chain, and a right-to-left story per component            |
| A session that survives expiry in place, and signs out across tabs               | the session query and the platform's expiry handling                    |
| One list pattern and one form pattern across every plugin                        | the screen builders, and the component catalogue                        |
| A form refuses exactly what the backend refuses, at the field, in their language | one schema at every boundary, and a check that every code has a message |
| A release never strands a person mid-form                                        | the document's version and the reload prompt                            |
| A block on any page can tell what the page is about                              | the context and the subject the screen declares                         |

## The gates a change passes

Every repository runs the same task, and a developer runs the same one CI runs.

1. Install from the lockfile, and audit. The tree is the one that was reviewed, and nothing in
   it carries a known advisory.
2. Build every package in dependency order, so the declarations resolve.
3. Format, lint and type-check in one pass.
4. Run every specification and every story, at the coverage floor.
5. Build the component catalogue, where the repository ships one.

Every step fails closed. [Code standards](../reference/code.md) states what each step
enforces, and [Configuring a repository](../reference/configuration.md) states what each
builder takes.

## What the floor does and does not prove

Coverage is 100% of statements, branches, functions and lines, measured per file. What that
proves is that no line ships unexercised. What it does not prove is that a line behaved, so a
specification asserts the outcome a caller sees rather than the fact that a function ran.

Three things catch what a specification cannot. Every component's stories render in a real
browser, where layout exists and jsdom's does not. Every story runs an accessibility check.
Every product ships an end-to-end suite that drives the real host with its real document.
