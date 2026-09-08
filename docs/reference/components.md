---
title: Documenting a component
description: The four files of a component, where a prop is described, how a control is decided, and what the catalogue guarantees.
sidebar:
  order: 6
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
drift apart. Every prop that should be documented is declared on the component's own
interface, even an inherited one, because the extractor does not follow `extends` into
`node_modules`.

```ts
export interface ButtonProps extends ButtonPrimitive.Props {
  /**
   * Height and padding. The four `icon*` sizes are square and render no text, so
   * they carry no accessible name until `aria-label` gives them one.
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
- No `VariantProps<typeof recipe>`: a mapped type yields nothing. Declare the union and key the
  recipe map by it, so a missing variant is a compile error.
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

## Specs

The stories cover behaviour and accessibility in a browser. A spec holds what they cannot:
the vendoring contract (the slot, the class merge order, the ref, the prop spread); recipe
coverage, every documented variant producing its own classes; paths a story cannot reach; and
what the component promises not to do. A spec opens with the same header, so a reader knows
where the rest of the tests are, and never runs a story.

## The page

`<Meta of={Stories} />`, `<Title />`, `<Description />`, `<Primary />`, `<Controls of={…} />`,
then one `##` section per behaviour, each followed by the canvas that demonstrates it.

- The description comes from the docblock and is not restated.
- Every non-Playground story has a section that argues for it.
- Standard sections, in this order where they apply: the behaviours, Usage, Exports, the
  parts table, When to reach for something else, Keyboard, Accessibility, Do, Don't,
  Deviations from upstream.
- A family's parts are one `## Every part` section with a bold lead-in per part and its
  `<ArgTypes>`; never a `###` per part, which buries the behaviours in the table of contents.
- Accessibility says what is handled, then a table of what the caller must pass.
- A usage snippet is a component with its import from the real package, never a bare
  expression.

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
