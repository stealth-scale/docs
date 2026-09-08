---
title: Identity and permissions
description: 'The token the identity service issues, the claims every tier reads from it, and the three places a permission is checked.'
sidebar:
  order: 8
---

The identity service signs a person in once and issues a short-lived token. The gateway checks
that token and passes on what it says. Every backend checks it again for itself rather than
trusting the caller. All three read the same claims, so the browser, the gateway and a backend
never disagree about what a person may do.

## What the token carries

```ts
interface Claims {
  /** The person, or the plugin, for a token a backend holds. */
  sub: string
  /** When the person last authenticated, in seconds since the epoch. */
  auth_time: number
  /** The active organisation and the person's role in it. */
  org?: { id: string; role: string } | undefined
  /** The effective permissions for that organisation. */
  permissions: readonly string[]
  /** The deployment-wide administrator, when the person is one. */
  role?: 'admin' | undefined
  /** The administrator impersonating this person, when one is. */
  imp?: string | undefined
  /** What a token is acting as: an automation, an agent or a job, and who granted it. */
  act?: { grantedBy?: string | undefined; id: string; kind: string } | undefined
}
```

`auth_time` is absolute, because a verifier computes freshness against its own clock, and a
relative claim would be wrong by the token's age at every verifier.

## Roles and permissions are different things

A role is what the identity service says about a person: their role in the active
organisation, and the deployment-wide administrator. A permission is what a plugin means, and
a plugin declares its own in its contract. An administrator assigns permissions to roles from
the members page, and the identity service computes the effective set into the token.

One string is used everywhere. `permissions.write` is the same string in a rule that hides a
button, in the directive that guards a field, and in the generated procedure that refuses the
write.

## Where a permission is checked

| Layer     | Checks                                      | Cannot decide                          |
| --------- | ------------------------------------------- | -------------------------------------- |
| a browser | whether to draw a block or guard a screen   | anything, because this is presentation |
| a gateway | whether the caller may reach a field        | whether they may reach this record     |
| a backend | whether this caller may do this to this row | nothing; this is the answer            |

A question about one record is a query. The browser asks the backend that owns the record,
and renders the control disabled with the reason until the answer comes back. That is why a
refused action is shown rather than hidden: a person can see that the action exists and read
why it is not theirs.

## Freshness, and asking again

A sensitive action requires a recent authentication. A screen or a block states how recent,
the platform compares the token's `auth_time` against its own clock, and the person is asked
for a passkey in place. The screen stays mounted and whatever they typed stays in it.

An expired session is handled the same way. A call that comes back unauthorised is retried
once after a refresh, and if that fails a dialog opens over the screen. A person never loses a
half-written form to a redirect.

## Tokens that are not a person

A backend acting on its own holds a key the identity service issued to that plugin, and
exchanges it for a token whose subject is the plugin. The exchange takes an organisation, a
subset of the plugin's own permissions, and an actor chain naming what is acting and who
granted it. Every backend then authorises that token exactly as it authorises a person, and
the audit record names the automation or the agent rather than the plugin.

[Tenancy and isolation](tenancy.md) says what keeps one organisation's rows away from
another's. [Agents and tools](agents.md) says what an agent may do with a token of this kind.
