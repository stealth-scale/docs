---
title: Docblocks
description: What gets a docblock, what each tag says, the register, and the lint rules that enforce it.
sidebar:
  order: 3
---

A docblock is call-site documentation: what a reader sees on hover, and what the catalogue
prints as a props table. It states the contract, which is what a name alone cannot carry.

## What gets one

| Declaration                      | Docblock                                 |
| -------------------------------- | ---------------------------------------- |
| Every export                     | Required                                 |
| A non-exported function          | One line                                 |
| An interface or type member      | When the name and the type do not say it |
| A spec, a story, a fixtures file | None                                     |

## What it says

The first sentence states what the thing is or does, and stands on its own: it is what an
index shows. An optional second paragraph says why it exists or what a caller must know. Then
the tags.

```ts
/**
 * Parses a value against a schema and throws on the first refusal.
 *
 * Use it at a boundary where an invalid value is a programming error; use
 * `safeParse` where the caller shows the refusal to a person.
 *
 * @param schema - The schema the value must satisfy, built with the builders this package exports.
 * @param value - The value as it arrived: a request body, a manifest, an environment variable.
 * @returns The value, typed as the schema's output; a transform in the schema has run.
 * @throws {InvalidValueError} When the value fails the schema; `issues` lists every field.
 */
export function parse<S extends Schema>(schema: S, value: unknown): Infer<S> {
```

| Tag        | States                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------- |
| `@param`   | The contract: its shape, where it usually comes from, what it must already satisfy          |
| `@returns` | Each case a caller handles: the success shape, the refusal shape, the order, the empty case |
| `@throws`  | `{Class} When …`, whenever the function throws on purpose                                   |

A tag line never repeats the parameter's name, and never says "the value", "whatever
arrived" or "what it should be". No types on `@param` or `@returns`: the TypeScript handbook
says only documentation tags are read in a `.ts` file, and the signature already carries the
type. The class on `@throws` stays, because the signature cannot say it.

Every tag line is a sentence: a capital letter or a code span to a full stop, in the hyphen
form `@param name - Sentence.`. Lines wrap at 100 columns by hand.

## Register

Present tense. Contracts and facts: what is guaranteed, when it throws, what order things
come in. No history, no status, no roadmap, no narration of how it came to be. Name symbols
and libraries; never a documentation file or a ticket. A props docblock on a component
carries `@category` and `@default` for the catalogue, and nothing that is only true of one
story.

## What enforces it

`eslint-plugin-jsdoc`, through oxlint's JavaScript plugins as `jsdoc-js/*`, in every
repository:

| Rule                                                       | Applies to                                           |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| `require-jsdoc` with `publicOnly`                          | Exports, interfaces, type aliases, enums, classes    |
| `require-description`, `informative-docs`                  | Every block                                          |
| `check-param-names`, `check-tag-names`, `no-blank-blocks`  | Every block                                          |
| `no-types`                                                 | Every block                                          |
| `require-hyphen-before-param-description`                  | Every `@param`                                       |
| `require-param-description`, `require-returns-description` | Every tag                                            |
| `require-throws-type`                                      | Every `@throws`                                      |
| `require-param`, `require-returns`, `require-throws`       | Exported functions and methods only                  |
| `match-description`                                        | Every tag: a sentence, and none of the vague openers |

In a spec the `require-*` rules are off. The formatter does not touch a comment, so a line over
100 columns is a lint finding, not a reflow.
