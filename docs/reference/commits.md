---
title: Commit messages
description: The shape of a commit message, the types and scopes, and what a body does and does not say.
sidebar:
  order: 4
---

A commit is the durable record for the next reader. It says what the tree has after it and
why; it does not narrate the session that produced it.

## The subject

```
type(scope): what the tree has now
```

| Part    | Rule                                                                                                 |
| ------- | ---------------------------------------------------------------------------------------------------- |
| `type`  | `feat`, `fix`, `test`, `docs`, `chore`, `refactor`, `build`                                          |
| `scope` | The root directory of the tree touched: `ui`, `tools`, `themes`, `core`, `web`, `backend`, `plugins` |
| subject | Under 72 characters, lower case after the colon, no full stop, a phrase naming what changed          |

A commit that touches only `docs/` takes no scope: `docs: the roadmap reads the tree it
describes`. A commit across several trees takes no scope either.

Subjects from the history, as written:

```
feat(ui): a widget frame with a grip, a control row and a bar
fix(themes): make elevation resolve, and step a card away from its page
test(tools): a package added to a tree changes no test and writes no section
docs: how an app outside the workspace renders, and the catalogue on Pages
chore: record the feedback composite in the lockfile
```

## The body

Bullets that state what changed and why, in engineering terms: name the mechanism, not the
intent. A paragraph is allowed only when one sentence carries context no bullet can, and two
such paragraphs in one message is already too many.

The body never contains:

- A narration of the working session: the tools used, the order things were found, what was
  tried first.
- A "Verified with …" trailer. The gates say what passed.
- The design argument: why an approach works, what it buys, what was ruled out. That is RFC
  and ADR material, and the commit says what changed.

The check before committing: read the body and count the sentences that explain rather than
state. More than one, and it is rewritten as bullets.

## Releases

A change to a published package carries a changeset file under `.changeset/`, naming the
package and the bump. The release commit changesets writes is `chore: version packages`.
