---
title: Tenancy and isolation
description: 'How one organisation is kept from reading another organisation, enforced by the database and by a transaction that refuses to open without a tenant.'
sidebar:
  order: 9
---

Every entity table carries a `tenant` column and a row policy on it, unless the declaration
says the entity is not tenant-scoped. The generator writes the policy with the table, so a
query that forgets the filter returns nothing instead of everyone's rows.

Isolation that depends on a developer remembering is not isolation. Four layers enforce it
here, and the two that matter run in the database and in the transaction.

| Layer          | What it enforces                                                                  |
| -------------- | --------------------------------------------------------------------------------- |
| the token      | the active organisation is a claim, not a value the caller sends                  |
| a backend      | a tenant-scoped backend refuses a call that carries no organisation               |
| a transaction  | the database library opens none without setting the tenant on the connection      |
| the row policy | the database returns no row of another organisation, whatever the query asked for |

## What a call carries

The claims name the active organisation. A backend builds its per-request services from those
claims, with the tenant already bound, so nothing a domain function calls takes the tenant as
an argument and nothing can pass the wrong one.

The browser's query keys carry the organisation as well. Switching organisation therefore
leaves nothing of the previous one in the cache, and the switch is a full reload, because
which plugins are on and how they are configured belong to the organisation and the route
tree is built once.

## When your own service stores the record

The four layers above describe what the platform can enforce for a record it stores. It
cannot enforce a policy inside a database it does not run.

What it still does is send your service the person's identity and the organisation they are
working in, on every call, and refuse to call at all when a tenant-scoped entity has no
organisation. What your service does with that is your service's decision, and it stays the
authority. A service account, which would make every screen one caller, is a declared
exception rather than the default.

## What an organisation owns

An organisation owns more than its rows. It owns everything the deployment left unlocked:
which plugins are on, the blocks, the layout and its options, the flags, the fields a plugin
scopes to an organisation, its connections to vendors, and the custom fields it added to an
extensible entity. An administrator writes all of that from the settings area rather than
from a file, and every write is validated, versioned, audited and announced.

What the document locked, or never offered, an organisation cannot change.

## What a person owns

A field a plugin scopes to a person follows that person across devices. The narrowest scope
that has a value wins, and nothing is copied when an organisation or a person is created, so
changing the document moves every organisation that never set the field and leaves the ones
that did.

## Getting a person out

Every backend that stores anything about a person implements export and erase, generated for
every entity that refers to one, and reacts to the erasure event. A request under
data-protection law is one call rather than a search.
