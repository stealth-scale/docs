---
title: Stories
description: The contract for a story file - what it is for, its layout, the fixtures, the example set, the Playground, the play functions, and what makes it done.
sidebar:
  order: 7
---

A story file does three jobs at once. Every non-Playground story is a canvas on the page,
under the section that argues for it. The Playground is where a consumer feels the API
before adopting it. Every story runs in Chromium with its play function and an axe pass. A
story that only renders a variant does none of the three.

The Select, Badge and SidebarLayout stories in the component library are the reference
implementations: thirteen examples in thirteen domains with fixtures in a sibling file; domain
rotation on a `children`-only primitive; and a layout composed from other packages, where one
domain across every story is the right choice.

## The procedure

1. Read the component source fully: which components the file exports, which props are data,
   which are functions, which are inherited.
2. Read the spec. It asserts what the stories promise not to do.
3. Put the prop docs in the source. A story file writes no documentation `argTypes`.
4. Write the meta: `args` seeded from the home domain, `component`, `parameters`, and
   `subcomponents` for every other exported component.
5. Write the Playground to the editability rules below.
6. Write the examples, one per claim on the page, each in a different domain, each visibly
   distinct.
7. Verify with every command below, then look at the page.

## The file

Imports; then fixtures grouped per domain, with a comment naming the domain or the edge each
one exists to hit; then the meta; then the Playground; then the examples.

- The meta is a literal object: the indexer reads the file without evaluating it. No
  `title`, which the path derives; no `autodocs` tag, because the MDX file is the page.
- The first export is `Playground`. Every other story spreads `example` from the catalogue's
  authoring kit, which drops it from the sidebar, turns its controls off and pads the canvas.
  The sidebar carries exactly two entries, Docs and Playground.
- Fixtures move to `<name>.fixtures.ts` when they crowd out the scenes: more than about sixty
  lines before the first story, or a story file past three hundred lines.

## Fixtures

- One domain per example story, rotated across the file. The house domains: payments and
  billing, healthcare, logistics and freight, CI and developer tooling, HR and people,
  e-commerce, observability and SRE, legal and compliance, education, media, energy and
  utilities, public sector.
- Examples differ visibly, not only in their strings: state, count, context, language,
  control type. Two canvases that look the same are one example.
- A story that sets neither `args` nor `render` is a defect: it draws the Playground's canvas a
  second time under a different heading.
- Realistic values, always: names from more than one locale, amounts with a currency, dates
  that could be real. Never `foo`, `Item 1` or lorem ipsum. An edge story gets edge data, and
  the fixture comment names the edge.
- The Playground's fixture is the home domain: the component's most typical production use,
  fully populated.

## The example set

The export name is the claim (`NoRowsMeansNoDataOption`); the docblock above it is the
caption the page renders; the argument belongs in the page's section. Name, fixture and play
assertion agree.

| Row           | Required when                                                                         |
| ------------- | ------------------------------------------------------------------------------------- |
| One per claim | Always                                                                                |
| States grid   | A genuine variant by state grid; pseudo-states forced through the kit                 |
| Keyboard      | There is a keyboard map; driven by `userEvent.tab()` and `keyboard()`                 |
| Empty         | Every data component; the empty copy is a prop, shown and asserted                    |
| Bad data      | Whatever malformed input the component defends against                                |
| Controlled    | The state round-trip, wired inline, with a mirror the play asserts against            |
| RTL           | Every component                                                                       |
| Localised     | Any component with label props; Dutch is the house choice                             |
| Integration   | The component ships a documented pairing; shown live and asserted through the partner |
| Escape hatch  | The component exports parts for recomposition; one story rebuilds it                  |

Lists a grid iterates are derived from the component itself, so a variant added to the recipe
cannot be missing from the page. A provider that renders no element has no stories; its
effect is measured in the stories of what it affects.

The RTL story measures something the component owns: which side an icon sits on, which gutter
a check mark moves to, whether a rail is at the right edge. `direction === 'rtl'` on the root
proves only that the harness works. An LTR and RTL pair is the one sanctioned shared render.

## The Playground

1. Every prop that can be edited can be edited. Text props get text controls, enums a select,
   data props an object control seeded with a full, realistic value.
2. Editing never breaks the story. The object control round-trips JSON, so function fields
   are stripped on the first edit; the render re-attaches them after the spread.
3. JSX and functions never go through `args`; they are written in `render`.
4. Every callback is inspectable in the Actions panel.
5. Every visible control changes the output; nothing is inert.
6. No story-only args.
7. The Playground's play asserts what holds for every value of every control, derived from
   `args`, never from a literal a control can change.

## The code panel

Each story's real source is what a reader recreates the usage from. State wiring is written
inline in each story's `render`, in a named function, with handlers composing `args.onX?.()`;
the duplication across stories is deliberate, and hoisted wiring harnesses are banned. A
story whose play asserts state renders a state mirror as text under the component.

## Play functions

- Query by role and accessible name first; `data-slot` only for what has no role, with a
  comment saying so.
- Derive expectations from `args`, never from a literal.
- Never guard an assertion with `if`: an assertion that does not run reads like one that
  passed.
- Measure what is a visual claim with `getBoundingClientRect`, not a class name.
- Every `expect` is awaited; `findBy*` for what mounts async, `waitFor` after a state change or
  an exit animation, never a fixed wait.
- A comment names the failure each assertion pins.
- An accessibility rule exemption carries its justification on the parameters object.
- A play that drives the component is wrapped in `interactive()` from the kit, so the
  catalogue does not run it on a docs page that mounts every story; a play that only measures
  is not wrapped.

## Verification

```sh
vp check                             # format, lint, and the type-aware check
vp test <path>                       # every project: the jsdom spec and the stories in Chromium
vp run -r build-storybook            # catches an undeclared block import in an .mdx
```

Then open the page in both themes and read it as a stranger. Open every popup a story
claims; a closed screenshot verifies nothing.

## Done when

- Every claim on the page has exactly one example story whose play proves it, and every
  example story has a section that argues for it.
- Examples are domain-rotated and visibly different; no story inherits the Playground's canvas.
- The RTL story measures something the component owns.
- Every editable prop is editable, data props are seeded full and survive a hand edit, every
  callback reaches the Actions panel, no JSX or function sits in `args`.
- Every exported component has a props table; every data prop's row carries an example value.
- Every story's code panel reads as consumer code; the sidebar shows Docs and Playground.
- `vp check`, the tests and the catalogue build are green.
