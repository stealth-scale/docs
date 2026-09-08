---
title: Agents and tools
description: 'Why an agent on this platform gets typed tools, a bounded token and an audit record for every action, without anyone building an AI feature.'
sidebar:
  order: 10
---

A command is a named action with an argument schema and a permission. A command that declares
arguments is a tool, and an entity's generated mutations are commands of that kind without
anyone declaring them. So the set of things an agent can do is the set of things a person can
do, described in the same declaration, and it grows as the product grows.

An agent uses the declarations the product already has. Nobody builds an AI feature, and
nobody secures one separately.

## What an agent is given

An agent is handed the tools whose rules hold where it is working, the schema of each tool's
arguments, and a token. It is handed no database, no vendor credential and no way to reach a
backend except the one door every screen uses.

| What an agent may do                     | What stops it going further                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| call a command that declares arguments   | a command with no argument schema is not a tool                 |
| act inside one organisation              | the organisation is a claim in its token, not an argument       |
| use a permission the granting person has | its token carries the intersection, and no more                 |
| read a record through the graph          | the same row policy and the same read permission a person meets |
| retry after a refusal                    | the refusal is the argument schema's, and it says which field   |

## The bound

An agent's token is exchanged for one organisation, for the intersection of the granting
person's permissions and what the action requires, and it carries an actor chain naming the
agent and who granted it. Every backend authorises that token the way it authorises a person,
so no code path exists that treats an agent as trusted.

The platform re-checks the grant before each run. A grant that no longer holds pauses the
agent with a reason rather than degrading quietly.

## The record

Every action an agent takes writes an audit record whose actor is the agent and whose chain
names the person who granted it. An administrator reads what an agent did in the same place
they read what a person did, and the two records have the same shape.

## What an external agent reaches

The assistant plugin's backend speaks the Model Context Protocol beside GraphQL, so an
external agent uses the same commands, through the same permission checks, as an agent inside
the product. No second API exists, so no second set of rules can drift from the first.

## What an agent knows about the page

A screen declares what it is about, as data, under a typed reference. Any block reads that
declaration, so an assistant drawn on every page knows it is on an agreement, can summarise
that agreement and can run the commands the page allows. It imports no screen to do it.
