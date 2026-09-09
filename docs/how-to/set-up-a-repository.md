---
title: Set up a repository on the toolchain
description: 'Puts an empty repository on the stealth toolchain, file by file, from the root manifest to a green vp run ci and the first package.'
sidebar:
  order: 1
---

These steps take an empty repository to a green `vp run ci`, with one package in it. Replace
`<repository>` with the repository's name, `ui` or `platform` or the product's, everywhere it
appears. The toolchain's packages are not on npm yet, so the catalog entries for
`@stealthscale/*` below resolve nothing until they are.

## 1. Write the root manifest

Name the repository, list its trees as workspaces, and declare every version once in the
catalog. The `catalog` below holds what the toolchain needs; add the repository's own
libraries to it.

```json
{
  "name": "@stealthscale/<repository>",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "workspaces": {
    "packages": ["foundations/*", "components/*", "catalogue/*"],
    "catalog": {
      "@arethetypeswrong/core": "^0.18.5",
      "@changesets/cli": "^3.0.2",
      "@stealthscale/tool-cli": "^0.0.0",
      "@stealthscale/tool-config": "^0.0.0",
      "@types/node": "^24",
      "@vitest/coverage-v8": "4.1.11",
      "eslint-plugin-jsdoc": "^64.3.4",
      "eslint-plugin-perfectionist": "^5.11.0",
      "publint": "^0.3.24",
      "typescript": "^7.0.2",
      "vite": "npm:@voidzero-dev/vite-plus-core@0.3.0",
      "vite-plus": "0.3.0",
      "vitest": "4.1.11"
    }
  },
  "scripts": {
    "build": "vp run -r build",
    "prepare": "vp config"
  },
  "devDependencies": {
    "@arethetypeswrong/core": "catalog:",
    "@changesets/cli": "catalog:",
    "@stealthscale/tool-cli": "catalog:",
    "@stealthscale/tool-config": "catalog:",
    "@types/node": "catalog:",
    "@vitest/coverage-v8": "catalog:",
    "eslint-plugin-jsdoc": "catalog:",
    "eslint-plugin-perfectionist": "catalog:",
    "publint": "catalog:",
    "typescript": "catalog:",
    "vite": "catalog:",
    "vite-plus": "catalog:",
    "vitest": "catalog:"
  },
  "devEngines": {
    "packageManager": { "name": "bun", "version": "1.4.0", "onFail": "download" }
  },
  "engines": { "node": ">=22.18.0" },
  "packageManager": "bun@1.4.0"
}
```

`eslint-plugin-jsdoc`, `eslint-plugin-perfectionist` and `vite-plus` are peers of the
toolchain preset, `publint` and `@arethetypeswrong/core` are what the pack step imports from
the root, and `vitest` is declared at the version vite-plus carries so the browser runner
resolves it without warnings.

## 2. Write the install policy

```toml
[install]
minimumReleaseAge = 259_200
```

Copy the comments from the toolchain repository's `bunfig.toml` with it; they say what the
number does and how to override it for one install.

## 3. Write the tsconfigs

`tsconfig.base.json` extends the toolchain's base and names the repository's source
condition:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@stealthscale/tool-config/tsconfig/base.json",
  "compilerOptions": {
    "customConditions": ["<repository>-source"]
  }
}
```

`tsconfig.json` extends it and includes only the root config:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./tsconfig.base.json",
  "include": ["vite.config.ts"]
}
```

## 4. Write the root config

Spread the defaults with the same condition, then replace only the blocks that differ for
this repository. [Configuring a repository](../reference/configuration.md) lists what each
builder takes.

```ts
import { defineConfig } from 'vite-plus'
import { lintConfig, stealthDefaults, testConfig } from '@stealthscale/tool-config'

export default defineConfig({
  ...stealthDefaults({ sourceCondition: '<repository>-source' }),
  lint: lintConfig({ web: ['components/**'] }),
  test: testConfig({ dom: true }),
})
```

## 5. Ignore the build output

```txt
node_modules/
dist/
coverage/
storybook-static/
*.tsbuildinfo
*.gen.css
*.gen.ts
*.config.d.ts
.vite-hooks/
.scratch/
.env
.env.*
!.env.example
```

## 6. Wire the changesets and the workflow

`.changeset/config.json`:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@4/schema.json",
  "access": "public",
  "baseBranch": "main",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "ignore": [],
  "linked": [],
  "privatePackages": { "tag": false, "version": false },
  "updateInternalDependencies": "patch"
}
```

`.github/workflows/ci.yml` calls the toolchain's reusable workflow. Set `browsers` to `true`
only when the repository runs stories or an end-to-end suite:

```yaml
name: ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    uses: stealth-scale/tooling/.github/workflows/ci.yml@main
    with:
      browsers: true
```

A repository that publishes also calls the toolchain's `release.yml`, and each of its
packages has trusted publishing configured on npmjs.com, naming the repository and that
workflow file.

## 7. Write the files every repository needs

Add `README.md`, `CONTRIBUTING.md`, `LICENSE`, `SECURITY.md` and `docs/README.md`, whose
contents [Repositories and packages](../reference/packages.md) states. Copy the `tooling`
repository's versions of them.

## 8. Add the first package

Make a directory under one of the trees and give it four files. In the manifest, derive the
package name from its path and export its source under the repository's condition:

```json
{
  "name": "@stealthscale/component-charts",
  "version": "0.0.0",
  "description": "Draws charts, and owns recharts.",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/stealth-scale/<repository>.git",
    "directory": "components/charts"
  },
  "files": ["dist"],
  "type": "module",
  "sideEffects": false,
  "imports": { "#*": "./src/*" },
  "exports": {
    ".": {
      "<repository>-source": "./src/index.ts",
      "default": "./dist/index.mjs"
    },
    "./package.json": "./package.json"
  },
  "publishConfig": { "access": "public" },
  "scripts": { "build": "vp pack src/index.ts" },
  "devDependencies": {
    "@stealthscale/tool-config": "catalog:"
  }
}
```

Its `tsconfig.json` extends the repository's base and includes only `src`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

Add `src/index.ts` and `src/index.spec.ts` beside each other, and a `README.md` whose first
line names the package's kind and reason.

## 9. Install and run the gates

```sh
bun install
vp run ci
```

`bun install` downloads the pinned bun when yours is older and runs `vp config`, which
writes the git hooks. `vp run ci` installs from the lockfile, audits, builds every package,
checks the format, the lint findings and the types, and runs every specification at the
coverage floor. Run it again after adding a package.

When `bun install` refuses a dependency published in the last three days, it reports the
package as "not in the catalog". Install once with the window off:

```sh
bun install --minimum-release-age=0
```
