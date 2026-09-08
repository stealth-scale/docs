---
title: Security posture
description: 'What holds at each boundary: the browser, the one door, the token at every hop, the row policy, secrets, and the supply chain the packages come through.'
sidebar:
  order: 13
---

Every boundary in the platform has one thing that holds it, and that thing is code rather
than a convention. This page lists them in the order an attacker would meet them.

| Boundary             | What holds it                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| the browser's markup | components render markup and never assign it; the linter refuses the properties that parse a string |
| the browser's API    | the gateway accepts persisted document ids only, so no caller composes a query                      |
| the session          | the package that owns authentication owns the cookie; nothing else reads it                         |
| the gateway          | it verifies the token against the identity service's keys and rejects anything else                 |
| a backend            | it verifies the token again; no hop trusts the hop before it                                        |
| a record             | the backend that owns it decides, from the permission the entity declared                           |
| a row                | the database policy returns no row of another organisation                                          |
| a secret             | it lives in the environment or encrypted in the configuration service, never in a document          |
| a vendor             | one connector holds the credential and speaks the protocol; nothing else does                       |
| the supply chain     | one owner per dependency, a frozen lockfile, an audit in CI, and provenance on publish              |

## The one door

The browser speaks GraphQL to one gateway and nothing else, apart from signing in against the
identity service and reading or writing a file on a presigned URL. Only persisted documents
execute. A backend is never addressable from a browser.

## The token

The identity service issues a short-lived token. The gateway verifies it and forwards the
claims. Every backend verifies it again and decides from the claims. A key an automated caller
holds never goes past the identity service. It is exchanged there for a token of the shape
everything else verifies, so one verification path serves every caller.

## Secrets

A secret a process needs is read from its environment and validated before the port opens. A
secret a plugin needs per organisation is stored encrypted by the configuration service, shown
to a screen as set or unset, and handed only to that plugin's own backend. Neither ever
appears in the deployment document, which is fetched by every browser.

## The supply chain

- One package declares each third-party dependency, and wraps it. Nothing else imports it.
- A version is declared once, in the root catalog.
- Nothing published in the last three days is installed, which covers the window in which a
  compromised release is found and withdrawn. CI installs from the lockfile and is unaffected.
- A lifecycle script runs only for a package that is listed for it.
- `bun audit` runs first in CI and fails on any known advisory.
- Publishing uses a short-lived identity token, with provenance. No long-lived registry token
  exists anywhere.

## The trust model, stated plainly

A plugin is first-party code. It is built from a repository held to these rules, served from
an origin the document names, and it runs in the page with the platform's own privileges.
There is no sandbox between plugins and none is claimed.

Code that is not trusted to that degree is not a plugin. It is embedded in a frame with a
message bridge, and it sees what the bridge passes it and nothing else. That is the mechanism
for a third party's widget and for an application that predates the platform.
