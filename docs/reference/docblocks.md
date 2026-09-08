---
title: Docblocks
description: The standard for documenting code in every stealth repository - what is documented, the form of a docblock, the summary and the body, every tag with its syntax and type, one complete example per kind of declaration, line comments, and the lint rules that enforce it.
sidebar:
  order: 3
---

A docblock, `/** … */`, is documentation a user of the code reads: in an editor on hover, in
the catalogue as a props table, in a generated reference. A line comment, `//`, is for the
implementation and is read only by someone editing the file. What a caller needs to know is
in the docblock; how the body does it is in line comments; the two never mix.

The standard follows the JSDoc tags TypeScript reads, as its handbook lists them, and the
form Google's style guides prescribe. From the docblock alone, a caller knows what to pass,
what comes back in every case, and what is thrown.

## What is documented

Everything that has a name, exported or not. "Obvious from the name" is not an exemption:
a name says what a thing is called, and a docblock says what it guarantees.

| Declaration                                                                 | Carries                                                                                                                                                |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A module                                                                    | A `@fileoverview` block when the file holds more than one thing, or when its name does not say what it holds                                           |
| A function, an arrow function bound to a name, a method, a getter, a setter | A summary, a body where needed, `@template`, `@param` for every parameter, `@returns` unless nothing is returned, `@throws` for every deliberate throw |
| A constructor                                                               | `@param` for every parameter, including a parameter property                                                                                           |
| A class                                                                     | What an instance is, when to make one, and what a holder must do with it                                                                               |
| An interface, a type alias, an object type                                  | What one value is; every member documented                                                                                                             |
| A field, a property, a constant                                             | What it holds: the unit, the range, the invariant, who writes it                                                                                       |
| A React component                                                           | What it draws and for whom; its props interface, member by member                                                                                      |
| An overload                                                                 | A docblock per overload signature; the implementation signature carries none                                                                           |
| A spec, a story, a fixtures file, generated code                            | Nothing: the test names and the scene captions are the documentation, and a generator writes its own                                                   |

## The form

```ts
/**
 * Summary in one sentence, complete on its own.
 *
 * The body, when a caller needs more than the summary: why the thing exists,
 * when to use it over its sibling, what it costs, what it never does.
 *
 * @template {Schema} S - The schema type.
 * @param {S} schema - The schema to check the value against.
 * @param {unknown} value - The value to check. It comes from a boundary: a request body, a
 *     parsed manifest, an environment variable.
 * @returns {Infer<S>} The parsed value. Every transform in the schema has run.
 * @throws {InvalidValueError} When the schema refuses the value. `issues` lists every refusal.
 */
export function parse<S extends Schema>(schema: S, value: unknown): Infer<S> {
```

- **Always the multi-line form.** `/**` on its own line, every line prefixed with `*`, `*/`
  on its own line. A one-sentence docblock is written the same way; the single-line form
  `/** … */` is not used, on anything.
- **Three parts, separated by a blank ` *` line:** the summary, the body, the tags. A
  docblock with no body has one blank line, between the summary and the tags.
- **One tag per line,** the tag first, in this order: `@fileoverview`, `@template`, `@param`,
  `@returns`, `@throws`, `@example`, `@see`, `@deprecated`. A prop's `@category` and
  `@default` come last.
- **Markdown.** Code spans for identifiers, values and paths; a Markdown list for a list,
  never lines aligned with spaces, which every renderer collapses; a fenced block under
  `@example`.
- **100 columns, wrapped by hand.** The formatter does not touch comments. A wrapped tag's
  continuation lines are indented four spaces, as in `value` above; a wrapped summary, body
  or `@fileoverview` is not indented.
- **Directly above the declaration,** with nothing between them, and before a decorator.
  A docblock on the `export` line documents the declaration it exports.

## The summary sentence

One sentence, the first line, complete on its own: it is what an index, a hover and the
catalogue show first. It has a subject and an active verb, in the third person, as if "This
function" or "This field" preceded it: `Parses`, `Returns`, `Lists`, `Names`, `Carries`,
`Builds`, `Describes`. A noun phrase ("Every refusal, in schema order."), a `Whether` opener,
a participle hanging off the end ("…, narrowing it to the input type") and a chain of
appositives are not sentences a reader acts on, and they are rewritten. It never announces:
"This function parses" and "Used to parse" say nothing that "Parses" does not. It never
repeats the name: `/** The parse function. */` fails lint and helps nobody.

| Kind                           | Opens with                                           | Example                                                                                    |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| A function that does something | The verb for what it does                            | Rewrites a relative link into the path of the page the site builds from it.                |
| A predicate                    | `Returns \`true\` when`                              | Returns `true` when a walk reads code from the directory.                                  |
| A value, a constant, a field   | `Holds`, `Names`, `Lists`, `Carries`, `Points at`    | Names the heading of the install section, which is also how the rewrite finds it again.    |
| An interface, an object type   | `Describes`                                          | Describes one refusal of one field, in the shape a form renders and a log records.         |
| A type alias                   | `Names`                                              | Names what a walk reports: a missing spec, or a spec without a source.                     |
| A class                        | `Reports`, `Represents`, `Holds`, with who makes one | Reports a value that failed its schema. `parse` throws it.                                 |
| A component                    | `Draws`                                              | Draws a button that submits, cancels or opens, with a size and a tone.                     |
| A hook                         | `Returns`, and what makes it change                  | Returns `true` while the media query matches, and re-renders the caller when that changes. |
| A module                       | `Holds`, after `@fileoverview`                       | `@fileoverview` Holds the guards a workspace is held to, one function per rule.            |

## The body

Written when the summary does not say everything a caller must know, and left out otherwise.
It says, in the present tense and as fact:

- Why the thing exists, and when to reach for it over its sibling.
- What must already be true before it is called, and what is true after it returns.
- What it costs: a network round trip, a browser launched, a whole tree read.
- What it never does: no validation, no retry, no write.
- The order of what it returns, and the meaning of an empty result.

It never says how the body is implemented, what the thing used to do, what it is going to
do, which ticket asked for it, or which document explains it. It names symbols and libraries,
not files.

## The tags

Every type is written in TypeScript syntax inside braces, exactly as the signature declares
it: `{readonly FieldIssue[]}`, `{Infer<S>}`, `{Map<string, boolean>}`,
`{(value: unknown) => boolean}`, `{'light' | 'dark' | 'system'}`, `{string | undefined}`.
Never Closure syntax (`Array.<T>`, `Object.<K, V>`, `function(string): number`, `?T`, `!T`),
never `*`, `?`, `Object` or `Function`: write `unknown`, or the shape. TypeScript reads a
tag's type only in a JavaScript file, so in a `.ts` file a tag that disagrees with the
signature is wrong in silence: the reviewer compares the two, and a tag that names a type
the file does not know fails lint.

| Tag                     | Syntax                                                              | On                                                        |
| ----------------------- | ------------------------------------------------------------------- | --------------------------------------------------------- |
| `@fileoverview`         | `@fileoverview Sentence.`                                           | A module, as its first docblock                           |
| `@template`             | `@template T - Sentence.` or `@template {Constraint} T - Sentence.` | A generic function, class or type, one line per parameter |
| `@param`                | `@param {Type} name - Sentence.`                                    | Every parameter, in signature order                       |
| `@returns`              | `@returns {Type} Sentence.`                                         | A function that returns a value                           |
| `@throws`               | `@throws {ErrorClass} Sentence.`                                    | Every throw the function makes on purpose                 |
| `@example`              | `@example` then a fenced code block                                 | A call whose shape is not obvious from the signature      |
| `@see`                  | `@see {@link Symbol} Sentence.`                                     | A symbol a reader needs next                              |
| `@deprecated`           | `@deprecated Sentence naming the replacement.`                      | What is on its way out                                    |
| `@category`, `@default` | `@category Group`, `@default value`                                 | A prop, for the catalogue's table                         |

Tags the TypeScript syntax already carries are not written in a `.ts` file, because the
handbook is explicit that "only documentation tags are supported in TypeScript files":
`@type`, `@typedef`, `@callback`, `@enum`, `@public`, `@private`, `@protected`, `@readonly`,
`@override`, `@extends`, `@implements`, `@this`, `@satisfies`, `@import`, `@constructor`.
`{@link Symbol}` is used inline wherever a symbol is named in a sentence a hover shows.

### `@param`

The description states the contract of that argument: its shape beyond the type, where it
comes from, what it must already satisfy, and what the default is when the parameter is
optional. It is one plain clause, or short full sentences: "The value to check. It comes
from a boundary: a request body, a parsed manifest." Never a noun with qualifiers hung off
it by commas ("The refusals `fieldIssuesOf` wrote, in schema order"): when the origin or the
order matters, it gets a sentence of its own. The name is never repeated, and "the value",
"the input" or "what to parse" is not a contract.

| Form                                         | Written as                                                                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| A required parameter                         | `@param {string} path - The file to read. A relative path resolves against the workspace.`                                          |
| An optional parameter, or one with a default | `@param {string} [root] - The directory to start in. A relative path resolves against the workspace. Default: the whole workspace.` |
| A rest parameter                             | `@param {...string} names - The package names in publish order.`                                                                    |
| An options object                            | ``@param {DeriveOptions} options - The derivation options. `DeriveOptions` documents every member.``                                |
| A destructured object                        | One `@param` for the object. Its type is the interface, and the interface documents the members.                                    |
| A callback                                   | `@param {(issue: FieldIssue) => string} translate - Turns a code into the words the person reads.`                                  |

Never `[name=default]`: the default is stated in the sentence, once.

| Do not write                                                                                     | Write                                                                                                                               |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@param {string} name - The name.`                                                               | `@param {string} name - The published package name, including its scope.`                                                           |
| `@param {unknown} value - What the value should be.`                                             | `@param {unknown} value - The value to check. It comes from a boundary: a request body, a parsed manifest.`                         |
| `@param root - Where to start.`                                                                  | `@param {string} [root] - The directory to start in. A relative path resolves against the workspace. Default: the whole workspace.` |
| ``@param {readonly FieldIssue[]} issues - The refusals `fieldIssuesOf` wrote, in schema order.`` | `@param {readonly FieldIssue[]} issues - The issues the schema reported.`                                                           |
| `@param {Object} options - The options.`                                                         | ``@param {DeriveOptions} options - The derivation options. `DeriveOptions` documents every member.``                                |

### `@returns`

The type, then each case a caller handles: the success shape, the refusal shape, the order
of a list, the meaning of an empty list, when it is `undefined`. A promise says what it
resolves to. A predicate says which case is `true`. A function that returns nothing carries
no `@returns`, and a `@returns` on one fails lint.

| Do not write                                        | Write                                                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `@returns {Infer<S>} The result.`                   | `@returns {Infer<S>} The parsed value. Every transform in the schema has run.`                            |
| `@returns {Pairing} Both lists.`                    | `@returns {Pairing} Both lists, sorted. An empty list means nothing is wanting.`                          |
| `@returns {FieldIssue \| null} The issue, or null.` | ``@returns {FieldIssue \| undefined} The first issue on that path. `undefined` when every field passed.`` |
| `@returns {Promise<void>} A promise.`               | `@returns {Promise<void>} Resolves when every page is written. Rejects with the first write error.`       |

### `@throws`

One line per class the function throws on purpose, with the condition, not the message. A
function that lets a callee's error through does not document it; a function that catches
and rethrows as its own class does.

| Do not write                               | Write                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| `@throws When the file is missing.`        | `@throws {MissingFrontmatterError} When a milestone file carries no frontmatter.` |
| `@throws {Error} If something goes wrong.` | `@throws {InvalidValueError} When the value fails the schema.`                    |

### `@template`

One line per type parameter, before the `@param` lines, with the constraint in braces where
the signature has one, and a sentence saying what the parameter stands for:
`@template {Schema} S - The schema type.`

### `@example`

For a call whose shape the signature does not make obvious: a builder, an options object
with interacting members, a function returning a function. A fenced block with the language
tag, showing one complete call and, in a comment, what it yields. Never a second copy of
the usage the catalogue already shows.

### `@deprecated`

The sentence names what to use instead and why the old one is going. A deprecated symbol
keeps its full docblock, and the tag goes last. It stays until the last caller in every
repository is gone, and a changeset announces it.

### Props

A prop's docblock is its row in the catalogue's props table: the contract in the summary,
then `@category` to group the row and `@default` for the default the library applies, which
is not always the one the file writes. [Documenting a component](components.md) has the
rules the extractor depends on.

## One complete example per kind

A module with more than one thing in it:

```ts
/**
 * @fileoverview Holds the guards a workspace is held to: one exported function per rule.
 * Each is a pure function over the workspace root that returns what it found wanting, and
 * each has a spec beside it.
 */
```

A constant:

```ts
/**
 * Names the heading of the install section, which is also how the rewrite finds the
 * section again.
 */
const HEADING = '## Install'
```

A function, generic and throwing, is the form shown above. A predicate that is not exported
gets the same treatment:

```ts
/**
 * Returns `true` when the calendar has the day the string names, which the ISO pattern alone
 * does not check.
 *
 * @param {string} value - The date or timestamp to check. It must already match the ISO format.
 * @returns {boolean} `true` for a day the month has. `false` for `2026-02-30` or `2025-04-31`.
 */
function existsOnTheCalendar(value: string): boolean {
```

A function with an optional parameter, reporting rather than throwing:

```ts
/**
 * Lists every source file without a spec beside it, and every spec without a source.
 *
 * The rule is one spec per source, named after it and next to it. `isExempt` names the
 * exceptions: the kinds and the paths.
 *
 * @param {string} [root] - The directory to start in. A relative path resolves against the
 *     workspace. Default: the whole workspace.
 * @returns {Pairing} Both lists, sorted. An empty list means nothing is wanting.
 */
export function pairing(root = ''): Pairing {
```

An arrow function bound to a name is documented on the binding:

```ts
/**
 * Returns `true` when the link points inside the site: a path from the root, with no scheme
 * and no host.
 *
 * @param {string} href - The link from the built page.
 * @returns {boolean} `true` for `/reference/code/`. `false` for `https://…` and for `#top`.
 */
const isInternal = (href: string): boolean => href.startsWith('/')
```

An interface, with every member documented; a member's docblock is one sentence when one
sentence states the contract, in the multi-line form like every other:

```ts
/**
 * Describes one refusal of one field, in the shape a form renders and a log records.
 */
export interface FieldIssue {
  /**
   * Names the rule that refused. The code is valibot's name for the rule: `min_length`,
   * `calendar_day`. A catalogue translates it.
   */
  code: string
  /**
   * Carries the rule's scalars for the translation: `expected`, `received`, `requirement`.
   */
  params?: Readonly<Record<string, boolean | number | string>>
  /**
   * Points at the field with a dotted path from the root. The root itself has an empty path.
   */
  path: string
  /**
   * Names the plugin whose schema refused, when the schema was not the platform's own.
   */
  plugin?: string
  /**
   * Repeats the rule's own English text for a log. A person never sees it.
   */
  reason: string
}
```

A type alias for a union, with each alternative's members documented:

```ts
/**
 * Reports what `safeParse` found: the value, or every issue with it.
 *
 * @template Value - The type the schema parses to.
 */
export type Parsed<Value> =
  | {
      /**
       * Lists every refusal in the order the schema reported them.
       */
      issues: FieldIssue[]
      /**
       * Marks the refusal, so a caller narrows on it.
       */
      ok: false
    }
  | {
      /**
       * Marks the success, so a caller narrows on it.
       */
      ok: true
      /**
       * Carries the value typed as the schema's output. Every transform has run.
       */
      value: Value
    }
```

There are no enums: `erasableSyntaxOnly` is on, so a fixed set is a union of literals on a
documented alias, or a documented `as const` array.

A class, with its constructor's parameter properties, a field, a method and a getter:

```ts
/**
 * Reports a value that failed its schema. `parse` throws it; a form renders `issues`; a log
 * prints `message`.
 */
export class InvalidValueError extends Error {
  /**
   * Caps how many issues a summary names before it says "and n more".
   */
  static readonly SUMMARY_LIMIT = 3

  /**
   * Lists every refusal in the order the schema reported them.
   */
  readonly issues: readonly FieldIssue[]

  /**
   * Creates the error `parse` throws for one refused value.
   *
   * @param {readonly FieldIssue[]} issues - The issues the schema reported.
   * @param {string} summary - One line that names every failing path.
   */
  constructor(issues: readonly FieldIssue[], summary: string) {
    super(summary)
    this.name = 'InvalidValueError'
    this.issues = issues
  }

  /**
   * Lists the dotted paths that failed. Each path appears once, in the schema's order.
   */
  get paths(): string[] {
    return [...new Set(this.issues.map((issue) => issue.path))]
  }

  /**
   * Returns `true` when the field is among the refusals.
   *
   * @param {string} path - The dotted path of the field. The root's path is empty.
   * @returns {boolean} `true` when at least one issue sits on that path.
   */
  refuses(path: string): boolean {
    return this.issues.some((issue) => issue.path === path)
  }
}
```

A React component, with its props interface documented member by member:

```tsx
/**
 * Describes the props of `Button`.
 */
export interface ButtonProps extends ButtonPrimitive.Props {
  /**
   * Sets the height and the padding. The four `icon*` sizes are square and render no text,
   * so they carry no accessible name until `aria-label` gives them one.
   *
   * @category Appearance
   * @default default
   */
  size?: ButtonSize | undefined
}

/**
 * Draws a button that submits, cancels or opens, with a size and a tone. It renders a
 * `<button>` unless `render` names another element, and keeps the tone's contrast in both
 * modes.
 *
 * @param {ButtonProps} props - The props. `ButtonProps` documents every member.
 * @returns {JSX.Element} The button element. The recipe's classes come before `className`.
 */
export function Button({ size = 'default', ...props }: ButtonProps): JSX.Element {
```

A hook:

```ts
/**
 * Returns `true` while the media query matches, and re-renders the caller when that changes.
 *
 * Reads `window.matchMedia` once per query and subscribes to it. On a server it returns
 * `false` until the first render in a browser.
 *
 * @param {string} query - The media query in CSS syntax: `(prefers-color-scheme: dark)`.
 * @returns {boolean} `true` while the query matches. The hook re-renders the caller when that changes.
 */
export function useMediaQuery(query: string): boolean {
```

## What a docblock never says

| Never                                                    | Instead                                                 |
| -------------------------------------------------------- | ------------------------------------------------------- |
| History or status: "added in 0.3", "not implemented yet" | Nothing; a changelog and the roadmap hold those         |
| The future: "will move to the platform", "once X exists" | The present scope: "carries no metadata accessor"       |
| A documentation file or a ticket: "see docs/…", "#412"   | The symbol: `@see {@link safeParse}`                    |
| A narration of the implementation                        | The observable outcome a caller sees                    |
| "comprehensive", "robust", "gracefully"                  | What happens: "returns `undefined` instead of throwing" |
| A one-word tag: `@returns {Report} The result.`          | Each case, as a sentence                                |
| A type that differs from the signature                   | The signature's type, character for character           |

## Line comments

A `//` comment explains the implementation to the next editor: why this branch exists, which
upstream bug the workaround covers, what a magic number means. It sits on its own line
above the code it explains, with a space after the marker, as sentences. A comment that
needs several lines is several `//` lines; `/* … */` is not used. `// TODO(name): …` names
who owns the follow-up and what it is; a TODO never sits in a docblock.

## What enforces it

`eslint-plugin-jsdoc`, through oxlint's JavaScript plugins as `jsdoc-js/*`, in every
repository, configured once in the toolchain's preset. In a spec, a story or a fixtures file
the rules are off.

| Rule                                                                                                                                                     | Catches                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `require-jsdoc`                                                                                                                                          | A function, arrow function, method, getter, setter, class, interface, type alias, property or field without a docblock; an overload implementation is exempt |
| `multiline-blocks` with single-line blocks refused                                                                                                       | `/** … */` on one line                                                                                                                                       |
| `require-description`, `informative-docs`, `require-description-complete-sentence`                                                                       | A missing summary, one that only restates the name, one that is not a sentence                                                                               |
| `require-param`, `require-param-name`, `require-param-type`, `require-param-description`, `check-param-names`, `require-hyphen-before-param-description` | A parameter without its line, a line without its type, its name, its hyphen or its sentence, a name that is not the signature's                              |
| `no-defaults`                                                                                                                                            | `[name=default]`                                                                                                                                             |
| `require-returns`, `require-returns-type`, `require-returns-description`, `require-returns-check`                                                        | A returned value without its line, a line without its type or sentence, a `@returns` on a function that returns nothing                                      |
| `require-throws`, `require-throws-type`                                                                                                                  | A deliberate throw without its line, a line without its class                                                                                                |
| `require-template`, `check-template-names`                                                                                                               | A type parameter without its `@template`, or one that names no parameter                                                                                     |
| `valid-types`, `check-types`, `no-undefined-types`                                                                                                       | A type that does not parse, Closure spellings, a type the file does not know                                                                                 |
| `check-tag-names`                                                                                                                                        | A tag outside the set above                                                                                                                                  |
| `sort-tags`, `tag-lines`, `check-line-alignment`, `check-indentation`, `require-asterisk-prefix`, `no-bad-blocks`, `no-blank-blocks`                     | Tags out of order, a missing blank line before the tags, alignment padding, a wrong prefix, a malformed block, an empty one                                  |
| `match-description`                                                                                                                                      | "What", "Whatever", "Something", "Anything" or "Stuff" opening a tag                                                                                         |

A line over 100 columns is a lint finding, not a reflow. What the rules cannot judge, the
truth of a sentence and whether a type matches its signature, is what a review is for.
