---
title: Documentation
description: The docs tree every repository carries, the numbered records and their statuses, and how the text is written.
sidebar:
  order: 5
---

A reader arrives with a question and reaches the answer in one hop. That is the only thing
the layout is for. Each document lives in one place, and every index says what is really
there. A directory exists only when there is something to put in it.

## The tree

```
docs/
├── README.md        the router: which page answers which question
├── explanation/     why it works this way
├── how-to/          the steps for one goal
├── reference/       what a field, a rule, a flag means; complete and dry
├── tutorials/       a lesson, start to finish, no decisions to make
├── roadmap/         what we build, in what order       NNNN-*.md and README.md
├── rfc/             designs proposed and debated        NNNN-*.md and README.md
└── adr/             decisions we enacted                 NNNN-*.md and README.md
```

| The document answers                                              | Directory                           |
| ----------------------------------------------------------------- | ----------------------------------- |
| "Why does the system work this way?"                              | `adr/`                              |
| "Should we do this, and what would it look like?"                 | `rfc/`                              |
| "What are we building, in what order, what has to be true first?" | `roadmap/`                          |
| "I have a goal. Give me the steps"                                | `how-to/`                           |
| "What does this field, flag or rule mean?"                        | `reference/`                        |
| "Why does this concept exist?"                                    | `explanation/`                      |
| "I am new. Teach me by doing"                                     | `tutorials/`                        |
| "What is this, and should I use it?"                              | `README.md` at the root             |
| "How do I contribute?"                                            | `CONTRIBUTING.md`                   |
| An implementation detail, a bug fix, a naming choice              | Nowhere; the pull request is enough |

A reference page describes and never instructs. A how-to instructs and never explains. An
explanation page may summarise several decisions into one current picture and link to them;
it never records a decision, because it is edited freely and an ADR is not.

The records of every repository, its RFCs, ADRs and roadmap, live in `stealth-scale/docs`.
Until a repository is cut out of the monorepo, its records stay in that repository.

## Numbered records

A file is `NNNN-short-name.md`: four digits, one higher than the highest on disk, never
reused, never changed, never deleted. A rejected RFC and a dropped milestone stay on disk;
they are the record of why not. Numbering is independent per directory, so a cross-type
reference always carries its prefix: `ADR-0007`, never `0007`.

| Record    | Frontmatter                                                                                                           | Statuses                                                 |
| --------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| RFC       | `rfc`, `title`, `author`, `status`, `created`, `updated`, `discussion`, `supersedes`, `superseded-by`, `produces-adr` | Draft, Review, Accepted, Rejected, Withdrawn, Superseded |
| ADR       | `adr`, `title`, `status`, `date`, `supersedes`, `superseded-by`, `rfc`                                                | Proposed, Accepted, Superseded, Deprecated               |
| Milestone | `milestone`, `title`, `status`, `depends-on`, `ships-in`, `deadline`, `deadline-source`, `prd`, `rfc`                 | Planned, In progress, Done, Deferred, Dropped            |

An RFC carries, in order: Summary, Motivation, Detailed design, Alternatives considered,
Drawbacks, Open questions, Unresolved and future work, References. An ADR: Status, Context,
Decision, Alternatives considered, Consequences, References. A milestone: Goal, Done when,
Why now, Scope, Not in this milestone, Risks to the sequence, Changes, References.

Each numbered directory has a `README.md` index table, ordered by number, with a row added on
every write and updated on every status change. The roadmap's index is different: its order is
the plan, so its rows are reordered when the plan changes and never its file names. A test
holds the roadmap's table and graph to the milestones' own frontmatter.

Four rules keep the records honest:

- **The document graph lives in the frontmatter.** `supersedes`, `superseded-by`,
  `produces-adr`, `depends-on` and `rfc` are the only copy. A body states the fact, never
  "ADR-0004 says"; References holds the pointer for anyone who wants to check.
- **Milestones belong to the roadmap and nowhere else.** No RFC or ADR names a milestone, not
  as motivation and not in References; the link points one way, from the roadmap to the
  record.
- **Past and present only.** A record does not know the future: no "will land", no "once the
  registry exists", no dates. It states a scope exclusion ("this proposal carries no metadata
  accessor") or a standing rule ("adding a field is a schema edit plus a regeneration").
- **References go at the bottom**, in one table of sources from outside the document set.
  Running text names things naturally and carries its own argument.

Once an ADR is accepted its argument does not change; to change a decision, write a new ADR
that supersedes it, and mark both ends.

## Writing

Plain English, as to a colleague who knows the area and is short on time.

- Say who does what. Every sentence has a subject that exists: a user, a file, a command, a
  caller. Not "the decision", "the capability", "adoption".
- Give instructions and checkable statements, not properties. "Returns `ErrNotFound` instead
  of panicking", not "handles errors gracefully". A number, not an adjective.
- No metaphors: nothing lands, fires, surfaces, unlocks or graduates. No invented terms: use
  the word the code declares, or ordinary English.
- One word per concept, and short sentences with one idea each. No em dashes: rebuild the
  sentence. No aphorisms, no "not X but Y", no rhetorical questions, no throat-clearing.
- A table for a fixed set of comparable things; a two-row table is a sentence. A code block
  for anything typed or copied; an interface is shown, never described. A list only for
  parallel items. A diagram, in a fenced `mermaid` block, only where it shows a shape or an
  order words describe badly, with every arrow labelled.
- Headings say what the section holds; "Overview" and "Details" do not. Levels do not skip.
- Links say where they go, and a relative link to another Markdown file works both on GitHub
  and on the site.
- Lines wrap at 100 columns. Tables are aligned by the formatter.

Nothing in a document narrates its own structure or the session that produced it, calls a
thing comprehensive, robust or seamless, or repeats a fenced block that another page already
holds.
