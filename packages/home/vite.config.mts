import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { createHash } from 'crypto'

const docsDir = path.resolve(__dirname, '../../docs')
const workspaceRoot = path.resolve(__dirname, '../..')
const coreSrcEntry = path.resolve(__dirname, '../core/src/index.ts')
const devZmageStyle = path.resolve(__dirname, 'src/styles/react-zmage-dev.css')
const siteUrl = 'https://zmage.caldis.me'
const ogImage = `${siteUrl}/logo.png`

type SeoRoute = {
  path: string
  title: string
  description: string
  h1: string
  body: string
  priority: string
  faq?: SeoFaqItem[]
}

type SeoFaqItem = {
  question: string
  answer: string
}

const useCaseFaq: SeoFaqItem[] = [
  {
    question: 'What is react-zmage?',
    answer: 'react-zmage is a React image viewer that turns ordinary <img> elements into a fullscreen, origin-expand image preview with gallery browsing, keyboard navigation, mobile gestures, Wrapper mode, and SSR/RSC support.',
  },
  {
    question: 'When should I use react-zmage instead of a React lightbox?',
    answer: 'Use react-zmage when you want existing images to open fullscreen without rebuilding the page around a gallery component. It works well for blogs, CMS rich text, MDX docs, news articles, and image-heavy content pages.',
  },
  {
    question: 'Can react-zmage handle CMS, markdown, or rich text images?',
    answer: 'Yes. Zmage.Wrapper can bind descendant <img> nodes inside CMS, markdown, MDX, or dangerouslySetInnerHTML content, while preserving the page markup and layout.',
  },
  {
    question: 'Does react-zmage support Next.js, SSR, or RSC?',
    answer: 'Yes. Use the react-zmage/ssr subpath for SSR or RSC-safe imports, and call interactive viewer APIs from client-side event handlers or client components.',
  },
]

const seoRoutes: SeoRoute[] = [
  {
    path: '/',
    title: 'react-zmage - React Image Viewer with Origin Expand Zoom',
    description: 'Turn any <img> into an origin-expand fullscreen React image viewer. Supports galleries, keyboard navigation, mobile gestures, Wrapper mode, and SSR/RSC.',
    h1: 'React image viewer with origin-expand zoom',
    body: 'react-zmage turns normal img tags into a fullscreen image viewer for blogs, docs, CMS content, and news sites.',
    priority: '1.0',
  },
  {
    path: '/docs',
    title: 'react-zmage API Docs - Props, Wrapper Mode, Gestures, SSR',
    description: 'Read the react-zmage API docs for component, imperative, and Wrapper mode usage, with props, presets, gestures, controller options, and SSR/RSC notes.',
    h1: 'react-zmage API docs',
    body: 'Install react-zmage, choose component, imperative, or Wrapper mode, and configure props for galleries, gestures, controller UI, animation, and SSR/RSC.',
    priority: '0.9',
  },
  {
    path: '/playground',
    title: 'react-zmage Playground - Tune React Image Preview Behavior',
    description: 'Try react-zmage in the browser and tune image preview props for origin expand animation, galleries, gestures, controller layout, and callbacks.',
    h1: 'react-zmage playground',
    body: 'Adjust React image preview props live and copy the resulting component, imperative, or Wrapper mode code.',
    priority: '0.9',
  },
  {
    path: '/playground/imperative',
    title: 'react-zmage Imperative Playground - Open Image Viewer from Events',
    description: 'Try the imperative Zmage.browsing API for opening a fullscreen React image viewer from buttons, commands, callbacks, or custom events.',
    h1: 'Imperative React image viewer playground',
    body: 'Use Zmage.browsing to open a fullscreen image viewer from custom events without replacing existing image markup.',
    priority: '0.7',
  },
  {
    path: '/playground/wrapper',
    title: 'react-zmage Wrapper Playground - Auto-bind Rich Text Images',
    description: 'Try Zmage.Wrapper for CMS, MDX, markdown, and rich text pages where existing <img> nodes should become fullscreen image previews.',
    h1: 'Wrapper mode for rich text images',
    body: 'Wrap uncontrolled CMS, MDX, markdown, or rich text HTML so existing img nodes can open in the react-zmage fullscreen viewer.',
    priority: '0.8',
  },
  {
    path: '/use-cases',
    title: 'react-zmage Use Cases - Blog, CMS, MDX, and News Image Preview',
    description: 'See how react-zmage fits blog image preview, CMS rich text images, MDX docs, news galleries, React lightbox alternatives, and Next.js image viewers.',
    h1: 'react-zmage use cases',
    body: 'react-zmage fits blog image preview, CMS rich text images, MDX docs, news galleries, React lightbox alternatives, and Next.js image viewers.',
    priority: '0.8',
    faq: useCaseFaq,
  },
  {
    path: '/ai',
    title: 'react-zmage AI Install Guide - Agent Integration and llms.txt',
    description: 'Read llms.txt and generate a concise agent prompt for adding react-zmage to an existing React, Next.js, CMS, MDX, or rich text image surface.',
    h1: 'react-zmage AI install guide',
    body: 'Read llms.txt or generate a short prompt that tells a coding agent how to inspect your project and integrate react-zmage with the right usage mode.',
    priority: '0.7',
  },
  {
    path: '/developers',
    title: 'react-zmage Developer Resources - API Docs, Agent Files, Auth, MCP',
    description: 'Find machine-readable react-zmage developer resources including llms.txt, llms-full.txt, OpenAPI metadata, auth notes, MCP notes, webhooks notes, and agent discovery files.',
    h1: 'react-zmage developer resources',
    body: 'Machine-readable resources for agents and developers: API docs, markdown homepage, llms files, OpenAPI documentation metadata, auth notes, MCP notes, webhook notes, schema feeds, and well-known discovery files.',
    priority: '0.7',
  },
]

const notFoundRoute: SeoRoute = {
  path: '/',
  title: 'react-zmage - Page Not Found',
  description: 'The requested react-zmage page was not found. Open the docs, playground, or homepage to continue.',
  h1: 'react-zmage page not found',
  body: 'Open the homepage, docs, or playground to continue exploring the React image viewer.',
  priority: '0.0',
}

function canonicalForRoute (routePath: string) {
  return routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`
}

function routeFilePath (routePath: string) {
  if (routePath === '/') return path.join(docsDir, 'index.html')
  return path.join(docsDir, ...routePath.slice(1).split('/'), 'index.html')
}

function escapeHtml (value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function setTag (html: string, pattern: RegExp, replacement: string) {
  if (pattern.test(html)) return html.replace(pattern, replacement)
  return html.replace('</head>', `    ${replacement}\n  </head>`)
}

function setMetaName (html: string, name: string, content: string) {
  return setTag(
    html,
    new RegExp(`<meta name="${name}" content="[^"]*"\\s*/>`),
    `<meta name="${name}" content="${escapeHtml(content)}" />`,
  )
}

function setMetaProperty (html: string, property: string, content: string) {
  return setTag(
    html,
    new RegExp(`<meta property="${property}" content="[^"]*"\\s*/>`),
    `<meta property="${property}" content="${escapeHtml(content)}" />`,
  )
}

function renderStructuredData (route: SeoRoute) {
  const canonical = canonicalForRoute(route.path)
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'react-zmage',
      url: `${siteUrl}/`,
      description: 'React image viewer for origin-expand fullscreen image preview.',
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#software` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${siteUrl}/#software`,
      name: 'react-zmage',
      url: `${siteUrl}/`,
      description: 'react-zmage turns ordinary <img> elements into an origin-expand fullscreen React image viewer.',
      codeRepository: 'https://github.com/Caldis/react-zmage',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React 16.8 through 19',
      license: 'https://opensource.org/licenses/MIT',
      author: { '@type': 'Person', name: 'Caldis' },
      keywords: [
        'React image viewer',
        'React image zoom',
        'React lightbox',
        'React image preview',
        'origin expand',
        'fullscreen image viewer',
        'rich text image preview',
        'CMS image preview',
        'MDX image viewer',
        'Next.js image viewer',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        ...(route.path === '/'
          ? []
          : [{ '@type': 'ListItem', position: 2, name: route.h1, item: canonical }]),
      ],
    },
  ]

  if (route.faq) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: route.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return JSON.stringify(data, null, 8).replace(/</g, '\\u003c')
}

function renderFallback (route: SeoRoute) {
  const links = [
    ['Home', '/'],
    ['Docs', '/docs'],
    ['Playground', '/playground'],
    ['Wrapper playground', '/playground/wrapper'],
    ['Use cases', '/use-cases'],
    ['AI install guide', '/ai'],
    ['Developer resources', '/developers'],
    ['Markdown homepage', '/index.md'],
    ['Full agent docs', '/llms-full.txt'],
    ['GitHub', 'https://github.com/Caldis/react-zmage'],
  ]

  const homeAgentSections = route.path === '/'
    ? [
        '  <section aria-labelledby="seo-install" style="margin: 32px 0 0;">',
        '    <h2 id="seo-install" style="font-size: 22px; margin: 0 0 10px;">Quick start</h2>',
        '    <p style="margin: 0 0 10px; color: #d4d4d4;">react-zmage is a free MIT-licensed open-source package published on npm. Install it with your package manager, import the stylesheet once, then replace an owned image with the component or wrap generated HTML with Wrapper mode.</p>',
        '    <pre style="overflow-x: auto; margin: 0; padding: 12px; border: 1px solid #404040; border-radius: 8px; background: #171717; color: #f5f5f5;"><code>npm install react-zmage</code></pre>',
        '  </section>',
        '  <section aria-labelledby="seo-modes" style="margin: 32px 0 0;">',
        '    <h2 id="seo-modes" style="font-size: 22px; margin: 0 0 10px;">Usage modes</h2>',
        '    <ul style="margin: 0; padding-left: 20px; color: #d4d4d4;">',
        '      <li><strong>Component:</strong> replace controlled React <code>&lt;img&gt;</code> markup with <code>&lt;Zmage&gt;</code>.</li>',
        '      <li><strong>Wrapper:</strong> auto-bind descendant images in CMS, MDX, markdown, rich text, or <code>dangerouslySetInnerHTML</code> content.</li>',
        '      <li><strong>Imperative:</strong> call <code>Zmage.browsing()</code> from buttons, commands, callbacks, or other event handlers.</li>',
        '    </ul>',
        '  </section>',
        '  <section aria-labelledby="seo-agent-resources" style="margin: 32px 0 0;">',
        '    <h2 id="seo-agent-resources" style="font-size: 22px; margin: 0 0 10px;">Agent-readable resources</h2>',
        '    <p style="margin: 0 0 10px; color: #d4d4d4;">Agents can fetch <a href="/llms.txt" style="color: #fff;">llms.txt</a>, <a href="/llms-full.txt" style="color: #fff;">llms-full.txt</a>, <a href="/index.md" style="color: #fff;">index.md</a>, OpenAPI metadata, schema feeds, and well-known discovery files. The site is documentation-only; package access happens through npm and source access through GitHub.</p>',
        '    <ul style="margin: 0; padding-left: 20px; color: #d4d4d4;">',
        '      <li><a href="/api/openapi.json" style="color: #fff;">OpenAPI metadata</a> documents static documentation endpoints; no product API, OAuth flow, API key, hosted MCP server, or webhook system is required.</li>',
        '      <li><a href="/developers/auth.md" style="color: #fff;">Auth notes</a>, <a href="/developers/mcp.md" style="color: #fff;">MCP notes</a>, and <a href="/developers/webhooks.md" style="color: #fff;">webhook notes</a> state the real integration boundaries.</li>',
        '    </ul>',
        '  </section>',
        '  <section aria-labelledby="seo-alternatives" style="margin: 32px 0 0;">',
        '    <h2 id="seo-alternatives" style="font-size: 22px; margin: 0 0 10px;">Alternatives context</h2>',
        '    <table style="width: 100%; border-collapse: collapse; color: #d4d4d4;">',
        '      <thead><tr><th style="border: 1px solid #404040; padding: 8px; text-align: left;">Package</th><th style="border: 1px solid #404040; padding: 8px; text-align: left;">Best fit</th><th style="border: 1px solid #404040; padding: 8px; text-align: left;">Difference</th></tr></thead>',
        '      <tbody>',
        '        <tr><td style="border: 1px solid #404040; padding: 8px;">react-zmage</td><td style="border: 1px solid #404040; padding: 8px;">Origin-expand fullscreen image viewer for React images, galleries, rich text, and SSR/RSC apps.</td><td style="border: 1px solid #404040; padding: 8px;">Drop-in image replacement plus Wrapper and imperative modes.</td></tr>',
        '        <tr><td style="border: 1px solid #404040; padding: 8px;">react-medium-image-zoom</td><td style="border: 1px solid #404040; padding: 8px;">Medium-style single-image zoom.</td><td style="border: 1px solid #404040; padding: 8px;">Smaller interaction surface; less gallery and rich-text automation.</td></tr>',
        '        <tr><td style="border: 1px solid #404040; padding: 8px;">Lightbox.js</td><td style="border: 1px solid #404040; padding: 8px;">General lightbox patterns across stacks.</td><td style="border: 1px solid #404040; padding: 8px;">Often configured as a separate gallery layer instead of a React img replacement.</td></tr>',
        '        <tr><td style="border: 1px solid #404040; padding: 8px;">PhotoSwipe</td><td style="border: 1px solid #404040; padding: 8px;">Mature gallery engine for image-heavy pages.</td><td style="border: 1px solid #404040; padding: 8px;">Broader gallery engine; React integration usually needs adapter glue.</td></tr>',
        '      </tbody>',
        '    </table>',
        '  </section>',
      ]
    : []

  return [
    '<main data-seo-fallback style="max-width: 760px; margin: 72px auto; padding: 0 24px; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.65; color: #f5f5f5; background: #0a0a0a;">',
    `  <h1 style="font-size: 36px; line-height: 1.15; margin: 0 0 16px;">${escapeHtml(route.h1)}</h1>`,
    `  <p style="font-size: 18px; margin: 0 0 24px; color: #d4d4d4;">${escapeHtml(route.body)}</p>`,
    ...homeAgentSections,
    ...(route.faq
      ? [
          '  <section aria-labelledby="seo-faq" style="margin: 0 0 28px;">',
          '    <h2 id="seo-faq" style="font-size: 22px; margin: 0 0 12px;">FAQ</h2>',
          ...route.faq.flatMap(item => [
            `    <h3 style="font-size: 16px; margin: 18px 0 6px;">${escapeHtml(item.question)}</h3>`,
            `    <p style="margin: 0; color: #d4d4d4;">${escapeHtml(item.answer)}</p>`,
          ]),
          '  </section>',
        ]
      : []),
    '  <nav aria-label="react-zmage links" style="display: flex; flex-wrap: wrap; gap: 12px;">',
    ...links.map(([label, href]) => `    <a href="${href}" style="color: #ffffff; text-decoration: underline; text-underline-offset: 4px;">${escapeHtml(label)}</a>`),
    '  </nav>',
    '</main>',
  ].join('\n      ')
}

function renderHtmlForRoute (baseHtml: string, route: SeoRoute, robots = 'index,follow') {
  const canonical = canonicalForRoute(route.path)
  const title = escapeHtml(route.title)
  const keywords = 'react image viewer, react image zoom, react lightbox, react image preview, origin expand, fullscreen image viewer, rich text image preview, react-zmage'

  let html = baseHtml
    .replace(/<html lang="[^"]*"/, '<html lang="en"')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)

  html = setMetaName(html, 'description', route.description)
  html = setMetaName(html, 'keywords', keywords)
  html = setMetaName(html, 'robots', robots)
  html = setMetaProperty(html, 'og:title', route.title)
  html = setMetaProperty(html, 'og:description', route.description)
  html = setMetaProperty(html, 'og:url', canonical)
  html = setMetaProperty(html, 'og:image', ogImage)
  html = setMetaName(html, 'twitter:title', route.title)
  html = setMetaName(html, 'twitter:description', route.description)
  html = setMetaName(html, 'twitter:image', ogImage)

  html = setTag(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
  )

  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n      ${renderStructuredData(route)}\n    </script>`,
  )

  html = html.replace(
    /<div id="app">[\s\S]*?<\/div>/,
    `<div id="app">\n      ${renderFallback(route)}\n    </div>`,
  )

  return html
}

function renderSitemap () {
  const urls = seoRoutes.map(route => [
    '  <url>',
    `    <loc>${canonicalForRoute(route.path)}</loc>`,
    '    <changefreq>weekly</changefreq>',
    `    <priority>${route.priority}</priority>`,
    '  </url>',
  ].join('\n')).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function writeTextFile (relativePath: string, content: string) {
  const file = path.join(docsDir, ...relativePath.split('/'))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

function writeJsonFile (relativePath: string, value: unknown) {
  writeTextFile(relativePath, `${JSON.stringify(value, null, 2)}\n`)
}

function readWorkspaceFile (relativePath: string) {
  const file = path.join(workspaceRoot, ...relativePath.split('/'))
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
}

function getCorePackage () {
  return JSON.parse(readWorkspaceFile('packages/core/package.json')) as {
    version: string
    description?: string
    license?: string
    repository?: { url?: string } | string
  }
}

function renderIndexMarkdown () {
  return `# react-zmage

react-zmage is a free MIT-licensed open-source React image viewer published on npm as \`react-zmage\`. It turns ordinary \`<img>\` elements into an origin-expand fullscreen image viewer with galleries, keyboard navigation, mobile gestures, Wrapper mode, and SSR/RSC support.

## Quick start

\`\`\`bash
npm install react-zmage
\`\`\`

\`\`\`tsx
import Zmage from 'react-zmage'
import 'react-zmage/style.css'

export function Photo () {
  return <Zmage src="/photo.jpg" alt="Photo" />
}
\`\`\`

## Usage modes

| Mode | Use when | Entry |
| --- | --- | --- |
| Component | You own the React image markup | \`<Zmage src="..." />\` |
| Wrapper | Images come from CMS, MDX, markdown, rich text, or generated HTML | \`<Zmage.Wrapper>{children}</Zmage.Wrapper>\` |
| Imperative | A button, command, callback, or custom event opens the viewer | \`Zmage.browsing(options)\` |

## Agent resources

- Full agent context: https://zmage.caldis.me/llms-full.txt
- Compact agent context: https://zmage.caldis.me/llms.txt
- Developer resource index: https://zmage.caldis.me/developers
- OpenAPI metadata for static documentation endpoints: https://zmage.caldis.me/api/openapi.json
- Auth and access notes: https://zmage.caldis.me/developers/auth.md
- MCP status notes: https://zmage.caldis.me/developers/mcp.md
- Webhook status notes: https://zmage.caldis.me/developers/webhooks.md
- Agent discovery file: https://zmage.caldis.me/.well-known/agent.json
- A2A-style discovery card: https://zmage.caldis.me/.well-known/agent-card.json

## Alternatives context

| Package | Best fit | Difference |
| --- | --- | --- |
| react-zmage | Origin-expand fullscreen viewer for React images, galleries, rich text, and SSR/RSC apps | Drop-in image replacement plus Wrapper and imperative modes |
| react-medium-image-zoom | Medium-style single-image zoom | Smaller interaction surface; less gallery and rich-text automation |
| Lightbox.js | General lightbox patterns across stacks | Often configured as a separate gallery layer instead of a React img replacement |
| PhotoSwipe | Mature image gallery engine | Broader gallery engine; React integration usually needs adapter glue |

## Access model

zmage.caldis.me is a documentation-only website. No OAuth, API key, login, hosted MCP server, webhook registration, or rate-limit budget is required to use the package. Install from npm and read source on GitHub.
`
}

function renderPricingMarkdown () {
  return `# react-zmage pricing

react-zmage has no paid plans.

| Item | Value |
| --- | --- |
| License | MIT |
| Package | \`react-zmage\` on npm |
| Cost | Free |
| Hosted account | Not required |
| API key | Not required |
| OAuth | Not required |
| Rate limits | Not applicable; this is a client-side React package and documentation site |

Use \`npm install react-zmage\` or your preferred package manager. The source code is available at https://github.com/Caldis/react-zmage.
`
}

function renderDeveloperLlms () {
  return `# react-zmage developer resources

react-zmage is a React component library, not a hosted SaaS API. Use these predictable URLs for agent discovery:

- Homepage markdown: https://zmage.caldis.me/index.md
- Full agent context: https://zmage.caldis.me/llms-full.txt
- Compact agent context: https://zmage.caldis.me/llms.txt
- OpenAPI metadata: https://zmage.caldis.me/api/openapi.json
- Auth notes: https://zmage.caldis.me/developers/auth.md
- MCP notes: https://zmage.caldis.me/developers/mcp.md
- Webhook notes: https://zmage.caldis.me/developers/webhooks.md
- Agent discovery: https://zmage.caldis.me/.well-known/agent.json
- A2A card: https://zmage.caldis.me/.well-known/agent-card.json
- Agent skill index: https://zmage.caldis.me/.well-known/agent-skills/index.json

Install with \`npm install react-zmage\`. Import \`react-zmage/style.css\` once in the app-level style entry.
`
}

function renderDocsLlms () {
  return `# react-zmage docs

Use this scoped file when an agent only needs API and usage documentation.

- Full API reference: https://zmage.caldis.me/llms.txt
- Human docs page: https://zmage.caldis.me/docs
- Playground: https://zmage.caldis.me/playground
- Wrapper mode playground: https://zmage.caldis.me/playground/wrapper
- Source README: https://github.com/Caldis/react-zmage/blob/master/README.md

Core modes: Component for owned React image markup, Wrapper for CMS/MDX/markdown/rich text images, and \`Zmage.browsing()\` for imperative event handlers.
`
}

function renderApiLlms () {
  return `# react-zmage API metadata

react-zmage has a TypeScript component API, not a hosted network API. The OpenAPI document at https://zmage.caldis.me/api/openapi.json describes this documentation site's static, read-only resources so agents can discover markdown, llms, schema, and well-known files.

No OAuth or API key is required. Non-existent static paths may return GitHub Pages HTML 404 responses; agents should recover by using /llms.txt, /llms-full.txt, /index.md, npm, or GitHub.
`
}

function renderAuthMarkdown () {
  return `# react-zmage auth and access

No OAuth, API key, login, service account, tenant, or paid plan is required for react-zmage.

react-zmage is a client-side React package published on npm. Install it with:

\`\`\`bash
npm install react-zmage
\`\`\`

The documentation site at https://zmage.caldis.me is static and public. It does not expose authenticated product APIs or rate-limited application endpoints. Agents should fetch /llms.txt, /llms-full.txt, /index.md, and /api/openapi.json for documentation, then use npm and GitHub for package access.
`
}

function renderMcpMarkdown () {
  return `# react-zmage MCP discovery

react-zmage does not currently run a hosted MCP server.

This is intentional: the product is a React component library, and agents can integrate it by reading the package docs, installing from npm, and editing the user's React codebase. The discovery files at /.well-known/mcp and /.well-known/mcp/server-card.json explicitly state that no MCP transport is available.

Recommended agent path:

1. Fetch https://zmage.caldis.me/llms.txt or https://zmage.caldis.me/llms-full.txt.
2. Inspect the user's image surfaces.
3. Choose Component, Wrapper, or Imperative mode.
4. Install \`react-zmage\` and import \`react-zmage/style.css\`.
`
}

function renderWebhooksMarkdown () {
  return `# react-zmage webhooks

react-zmage has no webhook system.

The package runs inside the user's React app and does not host server-side accounts, projects, jobs, events, or subscriptions. There is no webhook registration endpoint and no webhook payload schema. Agents should use React lifecycle callbacks such as \`onBrowsing\`, \`onZooming\`, \`onSwitching\`, \`onRotating\`, and \`onError\` inside the application code when they need local event handling.
`
}

function renderFullLlms () {
  const compact = readWorkspaceFile('docs/llms.txt')
  const readme = readWorkspaceFile('README.md')
  const agents = readWorkspaceFile('AGENTS.md')

  return `# react-zmage full agent documentation

This file is a single-request context bundle for AI agents. It combines the compact /llms.txt integration guide, the README, and repository agent instructions.

## Discovery and access

- Canonical compact guide: https://zmage.caldis.me/llms.txt
- Markdown homepage: https://zmage.caldis.me/index.md
- OpenAPI documentation metadata: https://zmage.caldis.me/api/openapi.json
- Auth notes: https://zmage.caldis.me/developers/auth.md
- MCP notes: https://zmage.caldis.me/developers/mcp.md
- Webhook notes: https://zmage.caldis.me/developers/webhooks.md

zmage.caldis.me is a documentation-only website. No OAuth or API key is required, and there is no hosted product API, hosted MCP server, webhook registration endpoint, or rate-limit budget.

---

## Compact llms.txt

${compact}

---

## README.md

${readme}

---

## AGENTS.md

${agents}
`
}

function openApiDocument () {
  const corePkg = getCorePackage()
  const textMarkdown = {
    description: 'Markdown document',
    content: {
      'text/markdown': {
        schema: { type: 'string' },
      },
    },
  }
  const textPlain = {
    description: 'Plain text document',
    content: {
      'text/plain': {
        schema: { type: 'string' },
      },
    },
  }
  const json = {
    description: 'JSON document',
    content: {
      'application/json': {
        schema: { type: 'object', additionalProperties: true },
      },
    },
  }

  return {
    openapi: '3.1.0',
    info: {
      title: 'react-zmage documentation metadata',
      version: corePkg.version,
      summary: 'Read-only static documentation endpoints for the react-zmage React image viewer package.',
      description: 'This OpenAPI document describes zmage.caldis.me documentation resources. It is not a hosted product API for manipulating images or accounts. No OAuth or API key is required.',
      license: { name: 'MIT', url: 'https://github.com/Caldis/react-zmage/blob/master/LICENSE' },
    },
    servers: [{ url: siteUrl }],
    tags: [
      { name: 'Docs', description: 'Markdown and llms documentation files' },
      { name: 'Discovery', description: 'Agent discovery and schema files' },
      { name: 'Status', description: 'Truthful notes about unsupported hosted APIs' },
    ],
    paths: {
      '/index.md': { get: { tags: ['Docs'], operationId: 'getMarkdownHomepage', summary: 'Markdown homepage', responses: { '200': textMarkdown } } },
      '/llms.txt': { get: { tags: ['Docs'], operationId: 'getLlmsTxt', summary: 'Compact agent guide', responses: { '200': textPlain } } },
      '/llms-full.txt': { get: { tags: ['Docs'], operationId: 'getLlmsFullTxt', summary: 'Full single-file agent documentation', responses: { '200': textPlain } } },
      '/developers/llms.txt': { get: { tags: ['Docs'], operationId: 'getDeveloperLlmsTxt', summary: 'Scoped developer resource index', responses: { '200': textPlain } } },
      '/developers/auth.md': { get: { tags: ['Status'], operationId: 'getAuthNotes', summary: 'Auth and access notes', responses: { '200': textMarkdown } } },
      '/developers/mcp.md': { get: { tags: ['Status'], operationId: 'getMcpNotes', summary: 'MCP availability notes', responses: { '200': textMarkdown } } },
      '/developers/webhooks.md': { get: { tags: ['Status'], operationId: 'getWebhookNotes', summary: 'Webhook availability notes', responses: { '200': textMarkdown } } },
      '/.well-known/agent.json': { get: { tags: ['Discovery'], operationId: 'getAgentDiscovery', summary: 'Agent discovery file', responses: { '200': json } } },
      '/.well-known/agent-card.json': { get: { tags: ['Discovery'], operationId: 'getA2aAgentCard', summary: 'A2A-style discovery card', responses: { '200': json } } },
      '/.well-known/agent-skills/index.json': { get: { tags: ['Discovery'], operationId: 'getAgentSkillsIndex', summary: 'Agent skills discovery index', responses: { '200': json } } },
      '/schema-map.xml': { get: { tags: ['Discovery'], operationId: 'getSchemaMap', summary: 'NLWeb schema map', responses: { '200': { description: 'Schema map XML', content: { 'application/xml': { schema: { type: 'string' } } } } } } },
    },
    components: {
      securitySchemes: {},
    },
    security: [],
    externalDocs: {
      description: 'Human-readable react-zmage docs',
      url: `${siteUrl}/docs`,
    },
    'x-documentation-only': true,
    'x-package': {
      npm: 'react-zmage',
      repository: 'https://github.com/Caldis/react-zmage',
    },
  }
}

function agentDiscoveryDocument () {
  const corePkg = getCorePackage()
  return {
    schema_version: '2026-05-09',
    name: 'react-zmage',
    description: 'Free MIT-licensed React image viewer package for origin-expand fullscreen image preview.',
    url: `${siteUrl}/`,
    package: {
      ecosystem: 'npm',
      name: 'react-zmage',
      version: corePkg.version,
      install: 'npm install react-zmage',
      style_import: 'react-zmage/style.css',
      ssr_entry: 'react-zmage/ssr',
    },
    documentation_only: true,
    auth: {
      type: 'none',
      oauth: false,
      api_key: false,
      notes_url: `${siteUrl}/developers/auth.md`,
    },
    capabilities: [
      'React component image viewer',
      'origin-expand fullscreen zoom',
      'multi-image galleries',
      'keyboard navigation',
      'mobile gestures',
      'Wrapper mode for CMS, MDX, markdown, rich text, and generated HTML',
      'SSR and React Server Components-safe import path',
    ],
    resources: {
      llms: `${siteUrl}/llms.txt`,
      llms_full: `${siteUrl}/llms-full.txt`,
      markdown_homepage: `${siteUrl}/index.md`,
      openapi: `${siteUrl}/api/openapi.json`,
      pricing: `${siteUrl}/pricing.md`,
      source: 'https://github.com/Caldis/react-zmage',
      npm: 'https://www.npmjs.com/package/react-zmage',
      mcp_notes: `${siteUrl}/developers/mcp.md`,
      webhook_notes: `${siteUrl}/developers/webhooks.md`,
    },
  }
}

function aiPluginManifest () {
  return {
    schema_version: 'v1',
    name_for_human: 'react-zmage Docs',
    name_for_model: 'react_zmage_docs',
    description_for_human: 'Documentation and integration metadata for the react-zmage React image viewer package.',
    description_for_model: 'Use this documentation source to help developers install react-zmage, choose Component, Wrapper, or Imperative mode, and understand that zmage.caldis.me is documentation-only with no OAuth, API key, hosted MCP server, or webhook API.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: `${siteUrl}/api/openapi.json`,
      is_user_authenticated: false,
    },
    logo_url: `${siteUrl}/logo.png`,
    legal_info_url: 'https://github.com/Caldis/react-zmage/blob/master/LICENSE',
  }
}

function agentCardDocument () {
  const corePkg = getCorePackage()
  return {
    name: 'react-zmage documentation',
    description: 'A documentation-only discovery card for the react-zmage React image viewer package. It does not expose an A2A task RPC endpoint.',
    url: `${siteUrl}/`,
    provider: {
      organization: 'Caldis',
      url: 'https://github.com/Caldis',
    },
    version: corePkg.version,
    protocolVersion: '0.3',
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    defaultInputModes: ['text/plain', 'text/markdown'],
    defaultOutputModes: ['text/markdown', 'application/json'],
    skills: [
      {
        id: 'react-zmage-integration',
        name: 'Integrate react-zmage',
        description: 'Help a coding agent install react-zmage and choose Component, Wrapper, or Imperative mode for existing React image surfaces.',
        tags: ['react', 'image-viewer', 'fullscreen', 'gallery', 'mdx', 'cms'],
        examples: ['Add fullscreen image preview to a Next.js MDX blog.', 'Wrap CMS rich text images without rewriting the markup.'],
      },
    ],
    securitySchemes: {},
    security: [],
    documentationUrl: `${siteUrl}/llms.txt`,
    xDocumentationOnly: true,
    xA2aTaskEndpoint: null,
  }
}

function mcpDiscoveryDocument () {
  return {
    name: 'react-zmage',
    description: 'react-zmage is a React component library. There is no hosted MCP server at this time.',
    mcp_available: false,
    documentation_only: true,
    recommended_agent_entry: `${siteUrl}/llms.txt`,
    mcp_notes: `${siteUrl}/developers/mcp.md`,
    package: 'react-zmage',
  }
}

function renderAgentSkill () {
  return `---
name: react-zmage-integration
description: Use when adding the react-zmage React image viewer to an existing React, Next.js, MDX, CMS, markdown, or rich text image surface.
---

# react-zmage integration

Use this skill when a user wants fullscreen image preview, image zoom, a React lightbox alternative, CMS image preview, MDX image preview, or gallery browsing in a React app.

## Read first

Fetch https://zmage.caldis.me/llms.txt for the compact integration contract. Use https://zmage.caldis.me/llms-full.txt when you need the full README and repository agent notes in one request.

## Install

\`\`\`bash
npm install react-zmage
\`\`\`

Import the stylesheet once from the app-level style entry:

\`\`\`ts
import 'react-zmage/style.css'
\`\`\`

## Choose a mode

- Component mode: replace owned React \`<img>\` markup with \`<Zmage src="..." alt="..." />\`.
- Wrapper mode: wrap CMS, MDX, markdown, rich text, or generated HTML with \`<Zmage.Wrapper>\`.
- Imperative mode: call \`Zmage.browsing(options)\` from a button, command, callback, or non-image event.

Prefer omitted \`preset\` so it resolves to \`auto\`. Keep optional behavior props unset during a basic install unless the user asks for them or testing exposes a concrete need.
`
}

function renderSchemaMap () {
  return `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://nlweb.ai/schemas/schemamap/1.0">
  <schemafeed>
    <loc>${siteUrl}/feeds/react-zmage.schema.jsonl</loc>
    <name>react-zmage software source code feed</name>
    <encoding>jsonl</encoding>
    <about>${siteUrl}/#software</about>
  </schemafeed>
  <schemafeed>
    <loc>${siteUrl}/schema/software.jsonld</loc>
    <name>react-zmage software JSON-LD</name>
    <encoding>jsonld</encoding>
    <about>${siteUrl}/#software</about>
  </schemafeed>
</schemamap>
`
}

function schemaSoftware () {
  const corePkg = getCorePackage()
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${siteUrl}/#software`,
    name: 'react-zmage',
    url: `${siteUrl}/`,
    description: 'Free MIT-licensed React image viewer for origin-expand fullscreen image preview, galleries, rich text, and SSR/RSC apps.',
    codeRepository: 'https://github.com/Caldis/react-zmage',
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React 16.8 through 19',
    license: 'https://opensource.org/licenses/MIT',
    softwareVersion: corePkg.version,
    keywords: [
      'React image viewer',
      'React image zoom',
      'React lightbox alternative',
      'fullscreen image viewer',
      'CMS image preview',
      'MDX image viewer',
    ],
  }
}

function writeAgentReadyFiles () {
  const skill = renderAgentSkill()
  const skillDigest = createHash('sha256').update(Buffer.from(skill, 'utf8')).digest('hex')

  writeTextFile('index.md', renderIndexMarkdown())
  writeTextFile('pricing.md', renderPricingMarkdown())
  writeTextFile('llms-full.txt', renderFullLlms())
  writeTextFile('developers/llms.txt', renderDeveloperLlms())
  writeTextFile('docs/llms.txt', renderDocsLlms())
  writeTextFile('api/llms.txt', renderApiLlms())
  writeTextFile('developers/auth.md', renderAuthMarkdown())
  writeTextFile('developers/mcp.md', renderMcpMarkdown())
  writeTextFile('developers/webhooks.md', renderWebhooksMarkdown())
  writeTextFile('schema-map.xml', renderSchemaMap())
  writeJsonFile('schema/software.jsonld', schemaSoftware())
  writeTextFile('feeds/react-zmage.schema.jsonl', `${JSON.stringify(schemaSoftware())}\n`)
  writeJsonFile('openapi.json', openApiDocument())
  writeJsonFile('api/openapi.json', openApiDocument())
  writeJsonFile('.well-known/agent.json', agentDiscoveryDocument())
  writeJsonFile('.well-known/ai-plugin.json', aiPluginManifest())
  writeJsonFile('.well-known/agent-card.json', agentCardDocument())
  writeJsonFile('.well-known/mcp', mcpDiscoveryDocument())
  writeTextFile('.well-known/agent-skills/react-zmage-integration/SKILL.md', skill)
  writeJsonFile('.well-known/agent-skills/index.json', {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'react-zmage-integration',
        type: 'skill-md',
        description: 'Use when adding the react-zmage React image viewer to an existing React, Next.js, MDX, CMS, markdown, or rich text image surface.',
        url: '/.well-known/agent-skills/react-zmage-integration/SKILL.md',
        digest: `sha256:${skillDigest}`,
      },
    ],
  })
}

const staticSeoRoutes: Plugin = {
  name: 'home-static-seo-routes',
  closeBundle () {
    const index = path.join(docsDir, 'index.html')
    if (!fs.existsSync(index)) return

    const baseHtml = fs.readFileSync(index, 'utf8')
    const outputRoots = Array.from(new Set(
      seoRoutes
        .filter(route => route.path !== '/')
        .map(route => path.join(docsDir, route.path.slice(1).split('/')[0])),
    ))

    for (const outputRoot of outputRoots) {
      fs.rmSync(outputRoot, { recursive: true, force: true })
    }

    for (const route of seoRoutes) {
      const file = routeFilePath(route.path)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, renderHtmlForRoute(baseHtml, route))
    }

    fs.writeFileSync(path.join(docsDir, '404.html'), renderHtmlForRoute(baseHtml, notFoundRoute, 'noindex,follow'))
    fs.writeFileSync(path.join(docsDir, 'sitemap.xml'), renderSitemap())
    writeAgentReadyFiles()
  },
}

export default defineConfig(({ command }) => {
  const devCoreAlias = command === 'serve'
    ? [
        { find: /^react-zmage$/, replacement: coreSrcEntry },
        { find: /^react-zmage\/style\.css$/, replacement: devZmageStyle },
      ]
    : []

  return {
    plugins: [react(), tailwindcss(), staticSeoRoutes],
    server: {
      host: process.env.HOST || '127.0.0.1',
      port: Number(process.env.PORT || 8080),
      // Dev serves packages/core/src directly so Vite owns JS + CSS HMR.
      fs: { allow: [workspaceRoot] },
    },
    publicDir: path.resolve(__dirname, 'public'),
    build: {
      outDir: docsDir,
      emptyOutDir: false,
    },
    preview: {
      host: process.env.HOST || '127.0.0.1',
      port: Number(process.env.PREVIEW_PORT || 4173),
    },
    resolve: {
      alias: [
        ...devCoreAlias,
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      exclude: ['react-zmage'],
    },
  }
})
