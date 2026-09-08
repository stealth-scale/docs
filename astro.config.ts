import { satteri } from '@astrojs/markdown-satteri'
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

import { internalLinks } from './src/integrations/links.ts'
import { mermaidDiagrams } from './src/markdown/mermaid.ts'
import { relativeMarkdownLinks } from './src/markdown/links.ts'

/**
 * The site is built from the `docs/` tree at the root of this repository, which
 * is also what GitHub renders: every page links its neighbours by relative
 * Markdown path, and the Markdown pipeline turns those into site paths.
 */
export default defineConfig({
  site: 'https://docs.stealthscale.io',
  markdown: {
    processor: satteri({ mdastPlugins: [relativeMarkdownLinks, mermaidDiagrams] }),
  },
  integrations: [
    starlight({
      title: 'Stealth Scale',
      description: 'How the stealth repositories are built, and how their packages are used.',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/stealth-scale' }],
      editLink: { baseUrl: 'https://github.com/stealth-scale/docs/edit/main/' },
      lastUpdated: true,
      sidebar: [
        { label: 'Understand', items: [{ autogenerate: { directory: 'docs/explanation' } }] },
        {
          label: 'Architecture',
          items: [
            { slug: 'architecture' },
            { slug: 'architecture/goals' },
            { slug: 'architecture/constraints' },
            {
              label: '3. Context and scope',
              items: [{ autogenerate: { directory: 'docs/architecture/context' } }],
            },
            { slug: 'architecture/strategy' },
            {
              label: '5. Building blocks',
              items: [{ autogenerate: { directory: 'docs/architecture/building-blocks' } }],
            },
            {
              label: '6. Runtime',
              items: [{ autogenerate: { directory: 'docs/architecture/runtime' } }],
            },
            {
              label: '7. Deployment',
              items: [{ autogenerate: { directory: 'docs/architecture/deployment' } }],
            },
            {
              label: '8. Crosscutting concepts',
              items: [{ autogenerate: { directory: 'docs/architecture/concepts' } }],
            },
            { slug: 'architecture/decisions' },
            { slug: 'architecture/quality' },
            { slug: 'architecture/risks' },
            { slug: 'architecture/glossary' },
          ],
        },
        { label: 'How to', items: [{ autogenerate: { directory: 'docs/how-to' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'docs/reference' } }] },
      ],
    }),
    internalLinks(),
  ],
})
