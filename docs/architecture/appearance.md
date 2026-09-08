---
title: Appearance and theming
description: 'The six values that decide how a product is drawn for one person, and the recipe a theme is written as before the toolchain solves it for contrast.'
sidebar:
  order: 11
---

How a product is drawn for one person is six values. The host, the settings area and the
component library all read the same six, so a preference set in one place reaches everything.

| Value     | Comes from                            | Set by                     |
| --------- | ------------------------------------- | -------------------------- |
| theme     | the document, or the product plugin   | the deployment             |
| mode      | the machine, then the person's choice | a person                   |
| density   | the person's choice                   | a person                   |
| motion    | the machine's reduced-motion setting  | the machine, then a person |
| locale    | the person, then the request          | a person                   |
| direction | the locale's script                   | nobody; it is derived      |

The platform writes these onto the document as attributes, and the base stylesheet's
selectors read them. That set of attributes is a contract the host, the component library and
a repository's Storybook all share, so a component looks the same in a product as it does on
its documentation page.

## A theme is a recipe

A theme is a short file: a few colours, a radius, a font, and the choices a brand actually
makes. The toolchain reads that recipe and solves a full palette from it, in both modes,
checking every text and fill pair against the WCAG contrast requirement. It then writes the
stylesheet the product links.

The consequence is worth stating plainly. A brand colour that would fail contrast as text is
corrected by the solver rather than shipped, so a product cannot be built with unreadable
text by picking the wrong colour.

## Tokens are the contract

A component names a token, never a literal colour and never a Tailwind alias. A theme sets
every token the contract declares, and a component that names a token it did not declare
fails the check. Light and dark are in one stylesheet, so switching mode loads nothing.

## What the host does at start

The document names the theme's stylesheet. The host links it and waits for it before it
mounts, so nothing renders unthemed. Where the document names none, the host takes the
product plugin's.

## Accessibility is checked, not claimed

Contrast is solved in the theme. Every component carries stories, and every story runs an
accessibility check in a real browser in CI. A component that colours text carries a story
that measures it, because a colour that passes as a fill often fails as small text.
