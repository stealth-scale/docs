import { defineConfig } from 'vite-plus'

/**
 * The toolchain's configuration for this repository: how the site's code and
 * the Markdown are formatted and linted. Astro reads its own `astro.config.ts`;
 * this file is what `vp fmt` and `vp check` read, the same commands every
 * stealth repository runs.
 */
export default defineConfig({
  fmt: {
    ignorePatterns: ['dist/**', '.astro/**'],
    printWidth: 100,
    semi: false,
    singleQuote: true,
    sortPackageJson: true,
  },
  lint: {
    ignorePatterns: ['dist/**', '.astro/**'],
  },
})
