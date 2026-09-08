---
title: Why the platform is shaped this way
description: 'The five choices the platform is built on, what each one buys, and what each one costs.'
sidebar:
  order: 3
---

Five choices decide the shape of everything else. Each buys something specific and each costs
something specific, and this page states both. The architecture section says how the results
work; this page says why they were chosen.

## One application, and plugins loaded while it runs

The application is built once. A deployment document names the plugins, and the application
fetches each one when it starts.

That buys independent delivery. A team ships a plugin without anybody rebuilding the product,
and a company adds a capability by naming it in a document. It also lets a plugin written in
another repository, by another team or another company, target this product with types.

It costs version machinery. A plugin says which platform versions it was built for, the
application refuses one that does not fit, and a release that removes a code file has to be
survivable by a browser tab that is already open. The alternative, where the product imports
its plugins and is rebuilt for each change, avoids all of that and puts one team's release in
front of another team's.

## A declaration derives the data layer, not the screens

Declaring a record gives you the types, the schema, the API, the events and, where you want
it, the storage. It does not give you a user interface until you ask for one.

That buys the part teams actually repeat. The plumbing under a record is the same everywhere,
and the screen almost never is. A plugin author calls a builder and gets an ordinary list,
detail view and form, or composes the same components into whatever the work needs.

It costs a screen. A platform that renders your data model without being asked reaches a
first result faster, and then argues with you about every layout after that.

## One GraphQL API for the browser

Every request a screen makes goes to one gateway, and only the queries a product shipped are
allowed to run.

That buys three things. A screen showing three plugins' data asks once instead of three
times. There is one place to check who is calling, rather than one per backend. And the list
of allowed queries is short and known, so a browser cannot compose a query nobody reviewed.

It costs a step between backends. A backend that needs another plugin's data goes through the
gateway rather than calling that plugin directly, which is a request rather than a function
call, and the graph has to be composed and checked before it is deployed.

## A product is a document

What a product is, which plugins it loads, how it is laid out and what its flags say, is a
file the application reads when it starts.

That buys deployment without a build. A new environment is a document. A new product, given
plugins that exist, is a plugin and a document. Nothing about an environment is compiled in,
so nothing branches on an environment's name.

It costs a large file that has to be right. A document that fails its schema stops the
product from starting, and that is the one failure nobody inside the product can repair from
a screen, so the message it prints has to be good.

## Everything else is an interface with a default behind it

Identity, configuration, flags, files, search, notifications and audit are each an interface.
The platform ships a plugin for each, and a company replaces any of them with its own.

That buys adoption. A company with an identity provider and a search cluster keeps both and
takes the rest, and nothing that used them changes, because nothing that used them named them.

It costs the shape of the interface. An interface has to fit everything behind it, so it
offers what all of them can do. Reaching something only one implementation has means naming
that one and accepting the coupling.

## Where to read the details

[The shape of a product](../architecture/product.md) starts the architecture section, which
covers each of these in turn.
