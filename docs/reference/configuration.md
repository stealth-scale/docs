---
title: Configuring a repository
description: 'What each builder of @stealthscale/tool-config takes and what it settles: the root config, the format, lint, pack, run, staged and test blocks, the resolver conditions, the generated globs and the tsconfig bases.'
sidebar:
  order: 3
---

A stealth repository is configured once, at its root, in one `vite.config.ts`. The config
spreads `stealthDefaults` and replaces the blocks that differ for this repository, each built
by that block's own builder. A replaced block replaces the shared one whole, so every builder
returns a complete block and takes options rather than a patch. [Code standards](code.md)
says what the blocks enforce; this page says what each builder takes.

```ts
import { defineConfig } from 'vite-plus'
import { lintConfig, stealthDefaults, testConfig } from '@stealthscale/tool-config'

export default defineConfig({
  ...stealthDefaults({ sourceCondition: 'ui-source' }),
  lint: lintConfig({ web: ['components/**'] }),
  test: testConfig({ dom: true }),
})
```

Inside the toolchain repository the builders are imported by relative path, because the
source condition a root config turns on cannot resolve the package that turns it on. Every
other repository imports them by name.

## stealthDefaults

```ts
function stealthDefaults(options: Readonly<DefaultOptions>): UserConfig
```

Returns every block at its shared value. `sourceCondition` is its one option, required: the
repository's source condition, `tooling-source` in the toolchain.

| Block                    | Built by                                  |
| ------------------------ | ----------------------------------------- |
| `fmt`                    | `formatConfig()`                          |
| `lint`                   | `lintConfig()`                            |
| `pack`                   | `packConfig({ sourceCondition })`         |
| `resolve.conditions`     | `sourceConditions(sourceCondition)`       |
| `run`                    | `runConfig()`                             |
| `ssr.resolve.conditions` | `serverSourceConditions(sourceCondition)` |
| `staged`                 | `stagedConfig()`                          |
| `test`                   | `testConfig()`                            |

## formatConfig

```ts
function formatConfig(options?: Readonly<FormatOptions>): FormatBlock
```

Settles no semicolons, single quotes and sorted manifests, and skips what a build wrote. The
formatter does not wrap comments, so a docblock is wrapped by hand to the same width.

| Option       | Default | Meaning                                                                          |
| ------------ | ------- | -------------------------------------------------------------------------------- |
| `ignore`     | none    | Globs for what this repository generates, appended to the shared generated globs |
| `printWidth` | `100`   | The columns to wrap at. The docblock rules assume 100                            |

## lintConfig

```ts
function lintConfig(options?: Readonly<LintOptions>): LintBlock
```

Settles oxlint's `correctness`, `suspicious`, `perf` and `pedantic` categories as errors; the
`typescript`, `unicorn`, `oxc`, `import` and `promise` plugins everywhere; three plugins from
npm, vite-plus's own, `eslint-plugin-jsdoc` under the alias `jsdoc-js` and
`eslint-plugin-perfectionist`; and the type-aware engine with type checking on, so one pass
reports lint findings and type errors together. The rules are the size, safety, style,
docblock and sorting sets, whose values [Code standards](code.md) lists, plus
`vite-plus/prefer-vite-plus-imports`.

| Option          | Default             | Meaning                                                                                                          |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ignore`        | none                | Globs for what this repository generates, appended to the shared generated globs                                 |
| `internalScope` | `^@stealthscale/.*` | The npm scope whose imports sort as the internal group, as a regular expression source                           |
| `layers`        | none                | One rule per tier, each a `Layer`. Each becomes a `no-restricted-imports` override on that tier's files          |
| `node`          | none                | Globs that run in Node. They get Node's globals and `no-console` off, because the console is the interface there |
| `overrides`     | none                | Overrides appended after the shared ones, so this repository's win                                               |
| `rules`         | none                | Rules merged over the shared ones                                                                                |
| `web`           | none                | Globs that render. They get the `react` and `jsx-a11y` plugins and the markup rules                              |

```ts
interface Layer {
  because: string
  except?: readonly string[] | undefined
  files: readonly string[]
  forbid: readonly string[]
}
```

`files` are the globs the tier holds, `forbid` the import patterns a package in it may not
use, `except` what it may import anyway out of what `forbid` matches, and `because` the
message shown where the rule fires. The rule holds for what a package ships; a specification
may reach for a development-time package whatever tier it sits in.

The overrides apply in this order: the web override, the layer overrides, the shared
overrides, then the repository's own. The shared overrides say that a `*.config.ts` and a
story file may default-export; that `.storybook/**` carries no docblocks and may
default-export; and that a specification and a story get the `vitest` plugin, carry no
docblocks, have no function-length limit, and may assert a type.

## packConfig

```ts
function packConfig(options: Readonly<PackOptions>): PackBlock
```

Settles per-file ESM, declarations from tsgo, and the `exports` map written back into the
manifest with two conditions: the repository's source condition pointing at the source, and
`default` pointing at what was packed. publint reads the manifest, and arethetypeswrong
resolves the declarations under the `esm-only` profile with stylesheets excluded.

| Option            | Default                                            | Meaning                                                                                                                               |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `bin`             | one command, named after the package               | Each command the package installs, mapped to the source file that runs it. The pack step writes the workspace form and the built form |
| `copy`            | none                                               | Files to carry into the built package, each `{ from, to }`; `to` defaults to the output directory                                     |
| `hooks`           | none                                               | `build:before` runs after the output directory is emptied and before the bundler starts                                               |
| `neverBundle`     | none                                               | Imports the bundler leaves as imports on purpose, such as a virtual module a plugin supplies at run time                              |
| `sourceCondition` | required                                           | The repository's source condition, written into every manifest the step packs                                                         |
| `staticExports`   | every root stylesheet the manifest's `files` names | Export paths mapped to the static files that serve them, for what a package ships but a build does not write. Replaces the default    |

## runConfig

```ts
function runConfig(options?: Readonly<RunOptions>): RunBlock
```

Settles that scripts and tasks are cached by their inputs and that `ci` never is. `ci` runs,
in order, `bun install --frozen-lockfile`, `bun audit`, `vp run -r build`, `vp check` and
`vp test`, then `vp run storybook:build` in a repository that ships a Storybook.

| Option      | Default        | Meaning                                                                                                                                                           |
| ----------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci`        | the list above | The `ci` task's commands, in order, replacing the shared list                                                                                                     |
| `storybook` | `false`        | Adds a `storybook` task that serves it, never cached, and a `storybook:build` task that builds it into `storybook-static/`, cached, and appends the build to `ci` |
| `tasks`     | none           | Tasks merged in beside `ci`                                                                                                                                       |

## stagedConfig

```ts
function stagedConfig(options?: Readonly<StagedOptions>): StagedBlock
```

Settles one pre-commit command over the staged files, `vp check --fix`.

| Option       | Default                                           | Meaning                                    |
| ------------ | ------------------------------------------------- | ------------------------------------------ |
| `extensions` | `ts, tsx, js, mjs, cjs, json, css, md, yaml, yml` | The extensions the pass runs over, no dots |

## testConfig

```ts
function testConfig(options?: Readonly<TestOptions>): TestBlock
```

Settles a `node` project for `**/*.spec.ts`, a `dom` project under jsdom for `**/*.spec.tsx`
when `dom` is on, and coverage: on, the v8 provider, over `**/src/**/*.{ts,tsx}`, never
counting `dist`, specifications, stories, fixtures, generated files or declarations, with a
floor of 100% per file and the `text-summary`, `html` and `lcov` reporters. A test times out
after 15 seconds, which is longer than the five Testing Library waits for an element.

| Option       | Default | Meaning                                                                                    |
| ------------ | ------- | ------------------------------------------------------------------------------------------ |
| `dom`        | `false` | Runs the jsdom project                                                                     |
| `exclude`    | none    | Globs no project runs, appended to `node_modules` and `dist`; an `e2e` suite a driver owns |
| `projects`   | none    | Projects appended after the shared ones; the Storybook kit's stories project goes here     |
| `setupFiles` | none    | Files the jsdom project loads before a specification                                       |
| `uncovered`  | none    | Paths coverage never counts, appended to the shared list                                   |

## The resolver conditions

```ts
function sourceConditions(condition: string): string[]
function serverSourceConditions(condition: string): string[]
```

Each returns the repository's source condition ahead of Vite's own defaults, the client
defaults for `resolve.conditions` and the server defaults for `ssr.resolve.conditions`.
Setting either replaces Vite's defaults rather than adding to them, which is why the builders
spread them back in. The client list reaches the browser resolver alone; the server list is
what a specification and a server load a workspace package through, and without it a
specification reads what the imported package last built. A package's own `vite.config.ts`
inherits nothing from the root's, so a package config that resolves workspace packages sets
both itself.

The condition is named after the repository, `tooling-source` rather than one name every
repository shares. [The repositories](../explanation/repositories.md) says why.

## The generated globs

```ts
const GENERATED: readonly string[]
function generatedGlobs(extra?: readonly string[]): string[]
```

`GENERATED` names what a build writes rather than a person, which the formatter and the
linter both skip: `**/dist/**`, `**/coverage/**`, `**/storybook-static/**`, `**/*.gen.*` and
`**/*.config.d.ts`. `generatedGlobs` returns that list with a repository's own appended,
which is what the `ignore` option of `formatConfig` and `lintConfig` passes through.

## The tsconfig bases

The package ships two tsconfig files and exports each at its own path.

| File                  | Sets                                                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsconfig/base.json`  | What every package compiles under: target and lib `es2023`, module `esnext`, resolution `bundler`, `noEmit`, and the checks [Code standards](code.md) lists |
| `tsconfig/react.json` | The base, plus the `dom` and `dom.iterable` libs and `jsx: react-jsx`                                                                                       |

Neither names a source condition. A repository extends `base.json` once, in its own
`tsconfig.base.json`, and adds `customConditions` naming its condition; a package extends
the repository's base and adds only its `include`. A package that renders extends
`react.json` through the repository's base the same way. A package extending either declares
`@stealthscale/tool-config` as a devDependency, which is what puts the files on disk.

## A package's own config

A package carries a `vite.config.ts` only for what is true of that package alone. It replaces
the root's block whole, so it calls the same builder again with the repository's source
condition. Two packages in the toolchain carry one. The command-line package names its
command, because the pack step would otherwise name the command after the package:

```ts
export default defineConfig({
  pack: packConfig({ bin: { stealth: './src/bin/stealth.ts' }, sourceCondition: 'tooling-source' }),
})
```

The config package ships its tsconfig bases, which no build writes:

```ts
export default defineConfig({
  pack: packConfig({
    sourceCondition: 'tooling-source',
    staticExports: {
      './tsconfig/base.json': './tsconfig/base.json',
      './tsconfig/react.json': './tsconfig/react.json',
    },
  }),
})
```

A package's tsconfig never includes its `vite.config.ts`, or the declaration build writes
files beside the config's imports.
