---
title: Documenting a component
description: The four files of a component, where a prop is described, what a story file holds and proves, what the spec holds, the page, and what the catalogue guarantees.
sidebar:
  order: 7
---

Every component in the design system is four files. Nothing is written twice, and nothing
that can be derived is typed by hand.

| File                 | Holds                                                 | Read by                                |
| -------------------- | ----------------------------------------------------- | -------------------------------------- |
| `<name>.tsx`         | One paragraph of what it is; a docblock per prop      | Editor hover, and the props table      |
| `<name>.stories.tsx` | The scenes and their play functions                   | The canvases, and the browser test run |
| `<name>.mdx`         | The long-form page                                    | The catalogue                          |
| `<name>.spec.tsx`    | The vendoring contract, and what a story cannot reach | The jsdom test run                     |

## The source is the only place a prop is described

The props table is built from the component's own docblocks by the catalogue's extractor. A
story file writes no `argTypes` for documentation: that is how a description and a signature
drift apart. Every prop that appears in the table is declared on the component's own
interface, even an inherited one, because the extractor does not follow `extends` into
`node_modules`.

```ts
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
```

`@category` groups the row; `@default` states the default the library applies, which is not
always the one this file writes. Both are lifted out of the description.

Seven rules the extractor depends on:

- Every optional prop is `T | undefined`: `exactOptionalPropertyTypes` is on, and the
  extractor drops that member before deciding the control.
- A union fits on one line where it can; the extractor prints the source text.
- No `VariantProps<typeof recipe>`: a mapped type yields nothing. The union is declared and
  the recipe map is keyed by it, so a missing variant is a compile error.
- No discriminated unions for props: the table comes out empty. One interface, and the
  constraint documented.
- The signature is annotated with the interface itself, never `Readonly<XProps>`.
- A type is written out, never `X.Props['y']`: the type column prints the annotation verbatim.
- A component rendering through `useRender` carries `@component` in its docblock, or it has
  no table at all.

The component's docblock is printed as the page's description with every block tag stripped;
`@param` and `@returns` stay in the source for the editor and the lint rule.

## Controls

Every prop that can be driven from the panel is. The Playground is the page's first story and
the one the controls point at, so its args seed the panel. The extractor decides the control
from the type:

| Type                          | Control                                         |
| ----------------------------- | ----------------------------------------------- |
| A union of literals           | Select or radio, offering exactly those members |
| `boolean`, `number`, `string` | Checkbox, number, text                          |
| `ReactNode`                   | Text, not the JSON editor                       |
| Anything callable             | None; a spy is seeded instead                   |

`argTypes` in a story file configures a control and never describes a prop, and only where a
prop cannot be typed into a field: an element, or an arg the story invents. A comment says
which. Event handlers need no `fn()`: the preview seeds a spy for every `on[A-Z]` prop the
table names.

## Stories

A story file does three jobs at once. Every example is a canvas on the page, under the
section that argues for it. The Playground is where a consumer tries the API before adopting
it. Every story runs in Chromium with its play function and an accessibility pass. A story
that only renders a variant does none of the three.

### The file

The file reads in the order the page does: imports; fixtures grouped per domain, each group
under a comment naming the domain or the edge it exists to show; the meta; the Playground;
the examples.

- The meta is a literal object, because the indexer reads the file without evaluating it. It
  carries no `title`, which the path derives, and no `autodocs` tag, because the MDX file is
  the page.
- The first export is `Playground`. Every other story spreads `example` from the catalogue's
  authoring kit, which turns its controls off and pads the canvas. The kit's indexer keeps
  every story but the Playground out of the sidebar, because Storybook reads a story file
  without evaluating it and a tag reached through a spread never arrives. The sidebar carries
  exactly two entries, Docs and Playground.
- Fixtures move to `<name>.fixtures.ts` when they crowd out the scenes: more than about sixty
  lines before the first story, or a story file past three hundred lines. The fixtures file
  exports the data and any component a story composes from it; the story file keeps the
  scenes.

### Fixtures

Every example draws a different domain. The house domains are payments and billing, healthcare,
logistics and freight, CI and developer tooling, HR and people, e-commerce, observability
and SRE, legal and compliance, education, media, energy and utilities, and the public sector;
a file rotates through them, one per example.

- Examples differ visibly, not only in their strings: state, count, context, language,
  control type. Two canvases that look the same are one example.
- A story that sets neither `args` nor `render` inherits the Playground's canvas and draws it
  a second time under a different heading, which is a defect.
- Values are realistic: names from more than one locale, amounts with a currency and a
  plausible magnitude, identifiers that look like identifiers, dates that could be real.
  Never `foo`, `Item 1` or lorem ipsum. An edge story gets edge data, the cycle, the vacancy,
  the zero-byte file, and the fixture comment names the edge.
- The Playground's fixture is the home domain: the component's most typical production use,
  fully populated, because it doubles as the editable example in the panel.

### The examples

The export name is the claim (`NoRowsMeansNoDataOption`); the docblock above it is the
caption the page renders; the argument for the scene belongs in the page's section. Name,
fixture and play assertion agree.

| Example       | Present when                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| One per claim | Always: this is the example set                                                                            |
| States grid   | The component has a genuine variant by state grid; pseudo-states are forced through the kit                |
| Keyboard      | There is a keyboard map; driven by `userEvent.tab()` and `keyboard()`                                      |
| Empty         | The component shows data; the empty copy is a prop, shown and asserted                                     |
| Bad data      | The component defends against malformed input                                                              |
| Controlled    | The component has controlled state; the round-trip is wired inline, with a mirror the play asserts against |
| RTL           | Always                                                                                                     |
| Localised     | The component has label props or English defaults; Dutch is the house choice                               |
| Integration   | The component ships a documented pairing; shown live and asserted through the partner                      |
| Parts         | The component exports parts for recomposition; one story rebuilds it from them                             |

A grid comes from the authoring kit (`Grid`, `StateGrid`, `forcedBy`), and the
lists it iterates are derived from the component itself, so a variant added to the recipe
cannot be missing from the page. A provider that renders no element has no stories; its
effect is measured in the stories of what it affects, and its page says where.

The RTL story measures something the component owns: which side an icon sits on, which
gutter a check mark moves to, whether a rail sits at the right edge, that a plot keeps its
direction while its caption flips. `direction === 'rtl'` on the root proves only that the
harness works. Where nothing about the component mirrors, the story says so and measures the
thing that stays put. An LTR and RTL pair is the one sanctioned shared render, because the
pair's claim is that one markup renders both ways.

### The Playground

- Every prop that can be edited can be edited: text props get text controls, `className`
  included; enums get a select; data props get an object control seeded with a full,
  realistic value.
- Editing never breaks the story. The object control round-trips JSON, so function fields
  are stripped on the first edit; the render re-attaches them after the spread.
- JSX and functions never go through `args`: they cross the manager channel and are mangled
  on the first control change. Children and slot JSX are written in `render`; `args` carries
  scalars and JSON.
- Every callback is inspectable in the Actions panel.
- Every visible control changes the output; nothing is inert, and an object control is never
  seeded with an empty array.
- No story-only args: they document props the component does not have.
- The Playground's play asserts what holds for every value of every control, derived from
  `args`, never from a literal a control can change.

### The code panel

Each story's real source is what a reader recreates the usage from. State wiring is written
inline in each story's `render`, in a named function, with handlers composing `args.onX?.()`
so the Actions panel stays loud; the duplication across stories is deliberate, and hoisted
wiring harnesses are not used. Shared story-local components exist only for what a consumer
would also write, a card renderer or a fixture factory. A story whose play asserts state
renders a state mirror as text under the component, so the play asserts text equality and
a reader sees the state at a glance.

### Play functions

A play function is the story's assertions, and it runs in a real browser: behaviour,
interaction, layout measurement and accessibility live here rather than in the spec.

- Queries go by role and accessible name first; the query is itself an accessibility
  assertion. `data-slot` through `querySelector` only for what has no role, with a comment
  saying so.
- Expectations derive from `args`, never from a literal, which fails the moment somebody
  types in the panel.
- No assertion is guarded with `if`: an assertion that does not run reads like one that
  passed.
- A visual claim is measured with `getBoundingClientRect`, not read from a class name.
- Every `expect` is awaited: `findBy*` for what mounts async, `waitFor` after a state change
  or an exit animation, never a fixed wait. Portalled content is queried on the document,
  scoped to the popup carrying `data-open`.
- A comment names the failure each assertion pins; it is read as documentation when the test
  goes red.
- An accessibility rule exemption carries its justification on the parameters object.
- A play that drives the component is wrapped in `interactive()` from the kit: the catalogue
  plays every story a docs page mounts, so without the wrapper six sheets open the moment the
  page is opened. A play that only measures what is already on screen is not wrapped.

## Specs

The stories cover behaviour and accessibility in a browser. A spec holds what they cannot:
the vendoring contract (the slot, the class merge order, the ref, the prop spread); recipe
coverage, every documented variant producing its own classes; paths a story cannot reach, an
`error` event or a rerender with a new prop; and what the component promises not to do, no
role, no classes, no announcement. A spec opens with the same header, so a reader knows where
the rest of the tests are, and never runs a story.

## The page

`<Meta of={Stories} />`, `<Title />`, `<Description />`, `<Primary />`, `<Controls of={…} />`,
then one `##` section per behaviour, each followed by the canvas that demonstrates it.

- The description comes from the docblock and is not restated.
- Every non-Playground story has a section that argues for it, and a canvas names its story
  by export, so a renamed story is renamed on the page too.
- Standard sections, in this order where they apply: the behaviours, Usage, Exports, the
  parts table, When to reach for something else, Keyboard, Accessibility, Do, Don't,
  Deviations from upstream.
- A family's parts are one `## Every part` section with a bold lead-in per part and its
  `<ArgTypes>`; never a `###` per part, which buries the behaviours in the table of contents.
- Accessibility says what is handled, then a table of what the caller must pass.
- A usage snippet is a component with its import from the real package, never a bare
  expression.

The package holding the page declares the docs addon itself: every workspace package has its
own `node_modules`, so an undeclared block import resolves nowhere, and only the catalogue
build reports it.

## Deviations from upstream

Where a vendored component was changed, the change is documented under
`## Deviations from upstream`, and nowhere else: what upstream does, what this does, and what
breaks without the change. Upstream is the only party named.

## Styling against a state

Base UI writes a boolean state as an attribute that is present or absent, `data-open`,
`data-checked`, `data-disabled`, and orientation with a value. The theme contract defines the
variants a component may write against: `data-open:`, `data-closed:`, `data-checked:`,
`data-unchecked:`, `data-selected:`, `data-disabled:`, `data-active:`, `data-horizontal:`,
`data-vertical:`. A component writing a state attribute of its own follows the same
convention, `data-inset={inset ? '' : undefined}`: React writes a boolean `false` as the
string `"false"`, and a presence selector still matches it.

## What the catalogue guarantees

Set once in the preview, so no story has to think about it:

- A click stays in the catalogue. A plain click on an anchor is stopped in the capture phase;
  a modified click is left alone. A form submission is stopped the same way, and a story that
  demonstrates submission still receives the event.
- Direction is scoped to the canvas on a docs page and to the document in a story view, and
  both render a direction provider the primitives read.
- axe runs on every story at error level, which is why no spec calls it.
- The code panel shows the markup, not the story object.
