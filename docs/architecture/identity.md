---
title: Identity and permissions
description: 'The platform does not sign anybody in. It states what a verified caller looks like, ships one way of producing that, and takes yours instead when you have one.'
sidebar:
  order: 8
---

The platform authenticates nobody. It states what a verified caller looks like, and anything
that can produce that is an identity provider as far as the rest of the system is concerned.
A default plugin ships, with passkeys, a second factor, organisations and roles, and a company
that already runs an identity provider uses that one instead.

## What a verified caller looks like

This is the contract, and it is the same whoever issued the token.

```ts
interface Claims {
  /** The person, or the plugin, for a token an automated caller holds. */
  sub: string
  /** When the person last authenticated, in seconds since the epoch. */
  auth_time: number
  /** The active organisation and the person's role in it. */
  org?: { id: string; role: string } | undefined
  /** The permissions that apply in that organisation. */
  permissions: readonly string[]
  /** The deployment-wide administrator, when the person is one. */
  role?: 'admin' | undefined
  /** The administrator impersonating this person, when one is. */
  imp?: string | undefined
  /** What a token is acting as: an automation, an agent or a job, and who granted it. */
  act?: { grantedBy?: string | undefined; id: string; kind: string } | undefined
}
```

`auth_time` is absolute, because each service compares it against its own clock and a relative
claim would be wrong by the token's age everywhere it was read.

## Bringing your own

An identity provider is usable here when it can do three things: sign a person in, issue a
token the gateway and every backend can verify, and carry the claims above. The deployment
names the issuer, where its keys are published, and the audience. Nothing else in the product
changes, because nothing else names the provider.

Where your provider does not carry a claim, the platform states what stops working rather
than guessing.

| Claim it cannot carry | What stops working                                                      |
| --------------------- | ----------------------------------------------------------------------- |
| `org`                 | tenancy: every entity scoped to an organisation refuses to serve a call |
| `permissions`         | permission rules; the platform then asks your provider per decision     |
| `auth_time`           | step-up, so a sensitive action cannot ask for a fresh sign-in           |
| `act`                 | automations and agents, which need a bounded token to run under         |

## Where a permission is checked

A permission is a string a plugin declares. Who holds it is the identity provider's business.
Whether a caller may do a thing is decided in three places, and only the last one is security.

| Layer     | Checks                                      | Cannot decide                          |
| --------- | ------------------------------------------- | -------------------------------------- |
| a browser | whether to draw a block or guard a screen   | anything, because this is presentation |
| a gateway | whether the caller may reach a field        | whether they may reach this record     |
| a backend | whether this caller may do this to this row | nothing; this is the answer            |

A question about one record is a query. The browser asks the backend that owns the record and
renders the control disabled with the reason until the answer arrives. A refused action is
shown rather than hidden, so a person can see that it exists and read why it is not theirs.

## What the default plugin adds

The identity plugin the platform ships is one implementation, and it is a complete one:
passkeys, a second factor, organisations, roles an administrator defines, a members screen,
linked accounts, and API keys. A deployment that has none of that gets it by loading the plugin. A
deployment that has all of it already loads something else.

## Sessions, and what a person notices

A session is a query the browser keeps current, holding the claims from the token rather than
anything read from a cookie. That is why the browser, the gateway and a backend never disagree
about what a person may do.

An expired session is handled where the person is standing. A call that comes back
unauthorised is retried once after a refresh, and if that fails a dialog opens over the
screen. The screen stays mounted and whatever was typed stays in it. A sensitive action asks
for a fresh sign-in in the same way, and the answer to it is a new token rather than a new
page.

## Tokens that are not a person

An automated caller holds a key its provider issued and exchanges it for a token whose subject
is the plugin. The exchange names one organisation, a subset of that plugin's permissions, and
what the token is acting as. Every backend then authorises it exactly as it authorises a
person, and the audit record names the automation or the agent rather than the plugin.

[Tenancy and isolation](tenancy.md) says what keeps one organisation's records away from
another's. [What you can replace](replaceable.md) puts identity beside every other interface.
