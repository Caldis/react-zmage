import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

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
    title: 'react-zmage Agent Prompt - Integrate React Image Preview with AI',
    description: 'Generate a concise agent prompt for adding react-zmage to an existing React, Next.js, CMS, MDX, or rich text image surface.',
    h1: 'react-zmage agent prompt',
    body: 'Generate a short prompt that tells a coding agent how to inspect your project and integrate react-zmage with the right usage mode.',
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
    ['AI prompt', '/ai'],
    ['GitHub', 'https://github.com/Caldis/react-zmage'],
  ]

  return [
    '<main data-seo-fallback style="max-width: 760px; margin: 72px auto; padding: 0 24px; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.65; color: #f5f5f5; background: #0a0a0a;">',
    `  <h1 style="font-size: 36px; line-height: 1.15; margin: 0 0 16px;">${escapeHtml(route.h1)}</h1>`,
    `  <p style="font-size: 18px; margin: 0 0 24px; color: #d4d4d4;">${escapeHtml(route.body)}</p>`,
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
