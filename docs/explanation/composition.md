---
title: The five choices behind the platform
description: 'The five choices the platform is built on, what each one buys, and what each one costs.'
sidebar:
  order: 3
---

Five choices decide everything else, and each one has a price this page states beside it. The
architecture section describes how the results work, and this page gives the reasoning behind
them.

## One application, and plugins loaded while it runs

The application is built once, and a deployment document lists the plugins it fetches at
start. A team can then release a plugin without anybody rebuilding the product, a company can
add a capability by listing it in a document, and a plugin written in another repository, by
another team or another company, can target this product with types.

Version machinery is what that costs. A plugin says which platform versions it was built for,
the application refuses one that does not fit, and a release that removes a code file has to
be survivable by a browser tab that is already open. The alternative, where the product
imports its plugins and is rebuilt for each change, needs none of it, and puts one team's
release in front of another team's.

## A declaration derives the data layer, not the screens

Declaring a record gives you the types, the schema, the API, the events and, where you want
it, the storage, and it gives you no user interface until you ask for one. Teams repeat the
plumbing under a record and almost never repeat the screen, so the platform derives the first
and leaves the second. A plugin author calls a builder and gets an ordinary list, detail view
and form, or composes the same components into whatever the work needs.

Somebody still writes that screen, which is what the choice costs. A platform that renders
your data model without being asked reaches a first result faster, and then argues with you
about every layout after that.

## One GraphQL API for the browser

Every request a screen makes goes to one gateway, which runs only the queries a product
published. A screen showing three plugins' data therefore asks once instead of three times,
one place checks who is calling so no backend repeats it, and the list of allowed queries
stays short and known, so a browser cannot compose a query nobody reviewed.

An extra step between backends is what that costs. A backend needing another plugin's data
pays for a request through the gateway where a direct call would have been a function call,
and the graph has to be composed and checked before it is deployed.

## A product is a document

One file, read by the application at start, decides what a product is, which plugins it loads,
how it is laid out and what its flags say. Deploying then needs no build: a new environment is
a document, and a new product, given plugins that exist, is a plugin and a document. Nothing
about an environment is compiled in, so nothing branches on an environment's name.

A large file that has to be right is what that costs. Should a document fail its schema the
product does not start, which is the one failure nobody inside the product can repair from a
screen, so the message it prints has to be good.

## Everything else is an interface with a default behind it

Identity, configuration, flags, files, search, notifications and audit are each an interface,
with a plugin from the platform behind it that a company can replace with its own. A company
with an identity provider and a search cluster keeps both and takes the rest, and nothing that
used them changes, because nothing that used them named them.

Whatever an interface cannot express is what that costs. It has to fit everything behind it,
so it offers what all of them can do, and using a capability only one implementation has means
naming that implementation and accepting the coupling.

## Where to read the details

The [architecture section](../architecture/README.md) covers each of these in turn.
