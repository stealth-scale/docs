---
title: Building a screen
description: 'Three ways to build a screen from an entity, all supported: the builder that writes a whole CRUD screen, entity-aware components you compose yourself, and the design system on its own.'
sidebar:
  order: 3
---

Nothing renders because a record exists. A plugin decides which screens it has and what each
one draws, and the platform offers three ways to build one. None of them is the default, and
a plugin mixes them.

| Way                     | You write          | Reach for it when                                   |
| ----------------------- | ------------------ | --------------------------------------------------- |
| The builder             | one line           | the ordinary list, detail or form is what you want  |
| Entity-aware components | a component tree   | the layout is yours but the fields are the entity's |
| The design system alone | an ordinary screen | the page is not a record at all                     |

## The builder

`listScreen`, `detailScreen` and `formScreen` each take an entity and write a complete screen
from the declaration: the columns, the filters and their place in the URL, the form with its
validation and its server-side refusals, the permissions that hide what a person may not do,
the breadcrumb and the subject.

```tsx
// web/src/screens/index.tsx
export default listScreen(agreement, { columns: ['title', 'status', 'renewsOn'] })
```

Calling a builder is a choice, not a default. A plugin that never calls one has no screens
derived from its entities, and nothing about it is unusual.

## Entity-aware components

Where the layout is yours, compose it from components that read the declaration. They take
the entity, so the labels, the types, the formatting and the permissions come from one place
and the arrangement is yours.

```tsx
export const loader = ({ params, shell }: LoaderArgs<{ id: string }>) =>
  shell.query.ensureQueryData(agreements.queries.get(params.id))

export default function Agreement(): ReactNode {
  const { id } = useParams(screens.detail)
  const { data } = useSuspenseQuery(agreements.queries.get(id))

  return (
    <Screen title={data.title} actions={<Slot of={slots.detailActions} props={{ id }} />}>
      <Fields of={agreement} record={data} only={['status', 'renewsOn', 'supplier']} />
      <RenewalTimeline agreement={data} />
      <Slot of={slots.detailAside} props={{ id }} />
    </Screen>
  )
}

export const subject = ({ data, params }: SubjectArgs<typeof loader>) =>
  subjects.agreement.of({ id: params.id, title: data.title })
```

`DataGrid`, `Fields` and `Form` each take an entity. `Screen` draws the translated title, the
heading, the actions and the body, and it draws the conventional slots so other plugins extend
your screen without you declaring anything.

## The design system alone

A screen that is not about a record is an ordinary screen. It reads whatever queries it needs,
renders the component library, and gets the same title, breadcrumb, head and error handling
every other screen gets, because those come from `Screen` and the router rather than from an
entity.

## What every screen gets, whichever way it was built

The route module is the same shape in all three: a component, and the parts the router uses.

| Export    | The router uses it for                             |
| --------- | -------------------------------------------------- |
| `default` | what renders                                       |
| `loader`  | filling the cache before the component renders     |
| `pending` | what shows while a navigation runs long            |
| `error`   | what shows when the loader or the component throws |
| `meta`    | the document title and the rest of the head        |
| `crumb`   | this screen's segment of the breadcrumb            |
| `subject` | what the page is about, for any block that asks    |

A builder writes these for you. A screen you compose exports the ones it needs. Either way the
data is in the cache before the component renders, a link preloads on intent, and two screens
that need one record fetch it once.

## Extending a screen somebody else wrote

Every screen draws slots, and a plugin puts a block into any of them under a rule saying where
and when the block shows. That is how one team adds a tab, a panel or an action to another
team's screen without either plugin importing the other.
