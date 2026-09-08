---
title: Security posture
description: 'What stops an attacker at each boundary: the browser, the gateway, the token every service checks, the database policy, secrets, and the packages the code is built from.'
sidebar:
  order: 16
---

Each boundary in the platform has one thing that enforces it, and that thing is code rather
than a convention. They are listed here in the order an attacker meets them.

| Boundary             | What enforces it                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| the browser's markup | components render markup and never assign it; the linter refuses the properties that parse a string |
| the browser's API    | the gateway runs only the queries the product shipped, so no caller composes its own                |
| the session          | the package that owns authentication owns the cookie, and nothing else reads it                     |
| the gateway          | it checks the token against the keys of the issuer the deployment names, and rejects anything else  |
| a backend            | it checks the token itself rather than trusting the gateway                                         |
| a record             | the backend that owns it decides, from the permission the entity declared                           |
| a row                | the database policy returns no row belonging to another organisation                                |
| your own service     | the platform forwards the person's identity, and your service decides                               |
| a secret             | it is in the environment, or encrypted in the configuration service, and never in a document        |
| a vendor             | one connector holds the credential and speaks the protocol, and nothing else does                   |
| the supply chain     | one owner per dependency, a frozen lockfile, an audit in CI, and provenance on publish              |

## What a browser can reach

A browser reaches the gateway, the identity service for signing in, and a file on a presigned
URL. That is the whole list. A backend has no address a browser can use, and the gateway runs
only the queries the product published, so a browser cannot compose a query nobody reviewed.

## The token

Whatever provides identity for the deployment issues a short-lived token. The gateway checks
it and passes on what it says. Every backend checks it again and decides from the claims
rather than from the fact that the gateway called. A key an automated caller holds never goes
past the provider. It is exchanged there for a token of the shape everything else already
checks, so there is one way to check a caller and not two.

## Calling a service you already run

When an entity reads from your own service, the platform sends the person's identity and your
service decides what that person may do. A service account is a declared exception.

The reason to insist on that is worth stating. If the platform called your service with one
credential for everybody, every screen would become a way around the access control your
service already enforces, and nothing in the product would record that it had happened.

## Secrets

A secret a process needs is read from its environment and checked before the port opens. A
secret a plugin needs for one organisation is stored encrypted by the configuration service,
shown to a screen as set or unset, and given only to that plugin's own backend. Neither ever
appears in the deployment document, which every browser fetches.

## The packages the code is built from

- One package declares each third-party dependency and wraps it. Nothing else imports it.
- A version is declared once, in the root catalog.
- Nothing published in the last three days is installed, which covers the period in which a
  compromised release is usually found and withdrawn. CI installs from the lockfile and is
  unaffected.
- An install script runs only for a package that is listed for it.
- `bun audit` runs first in CI and fails on any known advisory.
- Publishing uses a short-lived token from the CI job, with provenance. No long-lived registry
  token exists anywhere.

## What is trusted, and what is not

A plugin is first-party code. It is built from a repository held to these rules, served from
an origin the document names, and it runs in the page with the platform's own privileges.
There is no sandbox between plugins, and none is claimed.

Code that is not trusted to that degree is not a plugin. It is embedded in a frame and talks
to the product through a narrow set of messages, so it sees what those messages carry and
nothing else. That is how a third party's widget runs, and how an older application does.
