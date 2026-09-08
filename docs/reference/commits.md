---
title: Commit messages
description: 'The shape of a commit message: the header with its type, scope and imperative summary, the body that says what changed and why, and the footers for a breaking change or an issue. Five headers from the history, rewritten.'
sidebar:
  order: 5
---

A commit message is read by someone scanning `git log` for the change that introduced or
broke something, by a reviewer, and by the release tooling that turns commits into a
changelog. It says what the change does and why, in words a reader who was not there
understands. The format is Conventional Commits 1.0.0; the header rules are Angular's, the
body rules are Go's.

## The shape

```
<type>(<scope>)!: <summary>

<body>

<footer>
```

The header is mandatory. The body is mandatory for every change to code; a `docs` or
`chore` commit whose header says everything may stop there. A footer is written only when
there is something to put in it: a breaking change, a deprecation, an issue.

## The header

```
feat(ui): add the widget frame composite with a grip, a control row and a bar
```

| Part      | Rule                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`    | One of the types below                                                                                                                                                               |
| `scope`   | The root directory of the tree the change touches: `core`, `tools`, `components`, `web`, `backend`, `plugins`. None for a change to `docs/` only, and none for a change across trees |
| `!`       | Present when the change breaks a consumer; the footer then says what breaks                                                                                                          |
| `summary` | Imperative, present tense, lower case, no full stop; the whole header 72 characters at most                                                                                          |

The summary completes the sentence "this change modifies the repository to …": `add`,
`fix`, `remove`, `rename`, `move`, `extract`, `replace`, `stop`, `allow`, `derive`. It names
the thing changed, the component, the package, the rule, the file, and what happens to it,
so a reader can tell from the header alone which files the diff touches and what behaves
differently afterwards. It is never a noun phrase describing the tree, never a title, never
a metaphor.

| Type       | Used for                                                        | Example                                                              |
| ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| `feat`     | A capability a user or a consumer did not have                  | `feat(components): add a sortable column header to DataGrid`         |
| `fix`      | Behaviour that was wrong and is now right                       | `fix(web): keep the session cookie when the host is redirected`      |
| `refactor` | A change that neither fixes nor adds: a rename, a move, a split | `refactor(core): split parse.ts into parse.ts and issues.ts`         |
| `perf`     | The same behaviour, measured faster or smaller                  | `perf(backend): batch outbox reads per poll instead of per row`      |
| `test`     | A spec, a story or a fixture, with no change to shipped code    | `test(tools): derive the release set from the workspace tree`        |
| `docs`     | Documentation only: a docblock, a README, a page here           | `docs: add the consumer guide for @stealthscale/component-library`   |
| `build`    | The build, the packaging, a dependency                          | `build: pin valibot to 1.4 in the catalog`                           |
| `ci`       | A workflow or a CI script                                       | `ci: install Chromium before the catalogue build`                    |
| `chore`    | Housekeeping that changes no behaviour and no documentation     | `chore: add ui/composites/feedback to the lockfile`                  |
| `revert`   | Undoing a commit; the summary is the reverted commit's header   | `revert: feat(components): add a sortable column header to DataGrid` |

## The body

One blank line after the header, then complete sentences or bullets, wrapped at 72
columns, with no Markdown headings and no markup a terminal cannot show. The body says what
changed and why, in engineering terms: the mechanism, not the intent.

- What was wrong or missing before, when the contrast explains the change.
- What the change does, per part, when it touches more than one thing.
- The number, when the change is a `perf` commit: the measurement before and after.
- The consequence a reader must know: a migration, a config key, a renamed export.

The body never contains a narration of how the change was made (what was tried first, in
which order, with which tools), a "verified with" trailer, or the design argument for the
approach; that argument is an RFC's or an ADR's, and the commit says what changed.

## The footer

One blank line after the body, one footer per line, `Token: value`.

| Footer                    | Says                                                                          |
| ------------------------- | ----------------------------------------------------------------------------- |
| `BREAKING CHANGE: …`      | What breaks for a consumer and how to migrate; the header carries `!` as well |
| `DEPRECATED: …`           | What is deprecated, what replaces it, and when it goes                        |
| `Fixes #123`, `Refs #123` | The issue this closes, or the issue this is a step towards                    |
| `Reverts <sha>`           | On a `revert` commit, the commit undone; the body says why                    |

A repository that publishes packages also carries a changeset file for the change, and the
changeset's note says what a consumer sees. The commit and the changeset agree on the bump:
a `!` header is a major, a `feat` a minor, a `fix` a patch.

## A summary that says nothing, and its repair

A summary that describes the tree in a noun phrase says nothing about the change. Five such
summaries, and what each should say instead:

| As written                                                                     | Rewritten                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `feat(ui): a widget frame with a grip, a control row and a bar`                | `feat(ui): add the widget frame composite with a grip, a control row and a bar` |
| `fix(themes): make elevation resolve, and step a card away from its page`      | `fix(themes): resolve the elevation variable and raise cards above the page`    |
| `test(tools): a package added to a tree changes no test and writes no section` | `test(tools): derive the release set and README checks from the workspace tree` |
| `docs: how an app outside the workspace renders, and the catalogue on Pages`   | `docs: add the consumer guide and deploy the catalogue to GitHub Pages`         |
| `chore: record the feedback composite in the lockfile`                         | `chore: add ui/composites/feedback to the lockfile`                             |

One of them written out in full:

```
test(tools): derive the release set and README checks from the workspace tree

Adding a package tripped three specs that pinned counts and lists of what
the workspace holds. Each spec now states its rule and reads the tree:

- release.spec.ts derives the release set from the public packages under
  ui/ and themes/ instead of asserting a length of 24
- stylesheets.spec.ts checks that every public UI package ships a
  source.css instead of counting them
- the README guard compares each install section with what `vp run
  readmes` writes, and names the task in its failure message

A new package needs no edit outside its own directory.
```

## One change per commit

A commit holds one change. A move and its rewrite are two commits, so a reviewer can see
that the move lost nothing; a fix and the refactoring it made room for are two commits, so
the fix can be reverted alone. No hook checks a message; a reviewer checks it against this
page.
