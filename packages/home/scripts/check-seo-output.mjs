import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const docsDir = path.resolve(__dirname, '../../../docs')
const siteUrl = 'https://zmage.caldis.me'
const llmsTxtPath = path.join(docsDir, 'llms.txt')
const llmsTxt = fs.existsSync(llmsTxtPath) ? fs.readFileSync(llmsTxtPath, 'utf8') : ''

const routes = [
  {
    path: '/',
    title: 'react-zmage - React Image Viewer with Origin Expand Zoom',
    description: 'Turn any <img> into an origin-expand fullscreen React image viewer. Supports galleries, keyboard navigation, mobile gestures, Wrapper mode, and SSR/RSC.',
  },
  {
    path: '/docs',
    title: 'react-zmage API Docs - Props, Wrapper Mode, Gestures, SSR',
    description: 'Read the react-zmage API docs for component, imperative, and Wrapper mode usage, with props, presets, gestures, controller options, and SSR/RSC notes.',
  },
  {
    path: '/playground',
    title: 'react-zmage Playground - Tune React Image Preview Behavior',
    description: 'Try react-zmage in the browser and tune image preview props for origin expand animation, galleries, gestures, controller layout, and callbacks.',
  },
  {
    path: '/playground/imperative',
    title: 'react-zmage Imperative Playground - Open Image Viewer from Events',
    description: 'Try the imperative Zmage.browsing API for opening a fullscreen React image viewer from buttons, commands, callbacks, or custom events.',
  },
  {
    path: '/playground/wrapper',
    title: 'react-zmage Wrapper Playground - Auto-bind Rich Text Images',
    description: 'Try Zmage.Wrapper for CMS, MDX, markdown, and rich text pages where existing <img> nodes should become fullscreen image previews.',
  },
  {
    path: '/use-cases',
    title: 'react-zmage Use Cases - Blog, CMS, MDX, and News Image Preview',
    description: 'See how react-zmage fits blog image preview, CMS rich text images, MDX docs, news galleries, React lightbox alternatives, and Next.js image viewers.',
  },
  {
    path: '/ai',
    title: 'react-zmage AI Install Guide - Agent Integration and llms.txt',
    description: 'Read llms.txt and generate a concise agent prompt for adding react-zmage to an existing React, Next.js, CMS, MDX, or rich text image surface.',
  },
  {
    path: '/developers',
    title: 'react-zmage Developer Resources - API Docs, Agent Files, Auth, MCP',
    description: 'Find machine-readable react-zmage developer resources including llms.txt, llms-full.txt, OpenAPI metadata, auth notes, MCP notes, webhooks notes, and agent discovery files.',
  },
]

function htmlFileForRoute (routePath) {
  if (routePath === '/') return path.join(docsDir, 'index.html')
  return path.join(docsDir, ...routePath.slice(1).split('/'), 'index.html')
}

function attrEscape (value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

function canonicalForRoute (routePath) {
  return routePath === '/' ? `${siteUrl}/` : `${siteUrl}${routePath}`
}

const failures = []

for (const route of routes) {
  const file = htmlFileForRoute(route.path)
  if (!fs.existsSync(file)) {
    failures.push(`${route.path}: missing ${path.relative(docsDir, file)}`)
    continue
  }

  const html = fs.readFileSync(file, 'utf8')
  const title = attrEscape(route.title)
  const description = attrEscape(route.description)
  const canonical = canonicalForRoute(route.path)

  if (!html.includes(`<title>${title}</title>`)) failures.push(`${route.path}: missing route title`)
  if (!html.includes(`<meta name="description" content="${description}" />`)) failures.push(`${route.path}: missing route description`)
  if (!html.includes(`<link rel="canonical" href="${canonical}" />`)) failures.push(`${route.path}: missing route canonical`)
  if (!html.includes('<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />')) failures.push(`${route.path}: missing llms.txt alternate link`)
  if (!html.includes(`<meta property="og:url" content="${canonical}" />`)) failures.push(`${route.path}: missing route og:url`)
  if (!html.includes('data-seo-fallback')) failures.push(`${route.path}: missing static SEO fallback`)
  if (!html.includes('"@type": "WebSite"')) failures.push(`${route.path}: missing WebSite schema`)
  if (!html.includes('"@type": "WebPage"')) failures.push(`${route.path}: missing WebPage schema`)
  if (!html.includes('"@type": "SoftwareSourceCode"')) failures.push(`${route.path}: missing SoftwareSourceCode schema`)
  if (!html.includes('"@type": "BreadcrumbList"')) failures.push(`${route.path}: missing BreadcrumbList schema`)

  if (route.path === '/use-cases') {
    if (!html.includes('"@type": "FAQPage"')) failures.push('/use-cases: missing FAQPage schema')
    if (!html.includes('What is react-zmage?')) failures.push('/use-cases: missing visible FAQ content')
    if (!html.includes('React lightbox alternative')) failures.push('/use-cases: missing lightbox alternative use case')
  }

  if (route.path === '/') {
    for (const text of [
      'npm install react-zmage',
      'free MIT-licensed open-source package',
      'react-medium-image-zoom',
      'Lightbox.js',
      'PhotoSwipe',
      'llms-full.txt',
      'OpenAPI metadata',
    ]) {
      if (!html.includes(text)) failures.push(`/: missing static agent-readable text: ${text}`)
    }
    const textContent = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (textContent.length < 500) failures.push(`/: static text too short (${textContent.length} chars)`)
  }
}

const notFound = path.join(docsDir, '404.html')
if (!fs.existsSync(notFound)) {
  failures.push('404.html: missing')
} else {
  const html = fs.readFileSync(notFound, 'utf8')
  if (!html.includes('<meta name="robots" content="noindex,follow" />')) failures.push('404.html: missing noindex robots meta')
}

const sitemap = path.join(docsDir, 'sitemap.xml')
if (!fs.existsSync(sitemap)) {
  failures.push('sitemap.xml: missing')
} else {
  const xml = fs.readFileSync(sitemap, 'utf8')
  for (const route of routes) {
    const canonical = canonicalForRoute(route.path)
    if (!xml.includes(`<loc>${canonical}</loc>`)) failures.push(`sitemap.xml: missing ${canonical}`)
  }
}

const robots = path.join(docsDir, 'robots.txt')
if (!fs.existsSync(robots)) {
  failures.push('robots.txt: missing')
} else {
  const txt = fs.readFileSync(robots, 'utf8')
  for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'ChatGPT-User']) {
    if (!txt.includes(`User-agent: ${bot}`)) failures.push(`robots.txt: missing ${bot}`)
  }
  for (const text of [
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    'User-agent: CCBot',
    'User-agent: ByteSpider',
    'Disallow: /',
    'Schemamap: https://zmage.caldis.me/schema-map.xml',
  ]) {
    if (!txt.includes(text)) failures.push(`robots.txt: missing ${text}`)
  }
}

const requiredStaticFiles = [
  ['index.md', '# react-zmage'],
  ['llms-full.txt', '# react-zmage'],
  ['pricing.md', '# react-zmage pricing'],
  ['openapi.json', '"openapi": "3.1.0"'],
  ['api/openapi.json', '"openapi": "3.1.0"'],
  ['developers/llms.txt', '# react-zmage developer resources'],
  ['docs/llms.txt', '# react-zmage docs'],
  ['api/llms.txt', '# react-zmage API metadata'],
  ['developers/auth.md', '# react-zmage auth and access'],
  ['developers/mcp.md', '# react-zmage MCP discovery'],
  ['developers/webhooks.md', '# react-zmage webhooks'],
  ['schema-map.xml', '<schemamap'],
  ['schema/software.jsonld', '"@type": "SoftwareSourceCode"'],
  ['feeds/react-zmage.schema.jsonl', '"@type":"SoftwareSourceCode"'],
  ['.well-known/agent.json', '"name": "react-zmage"'],
  ['.well-known/ai-plugin.json', '"name_for_model": "react_zmage_docs"'],
  ['.well-known/agent-card.json', '"name": "react-zmage documentation"'],
  ['.well-known/mcp', '"mcp_available": false'],
  ['.well-known/agent-skills/index.json', '"$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json"'],
  ['.well-known/agent-skills/react-zmage-integration/SKILL.md', 'name: react-zmage-integration'],
]

for (const [relativePath, marker] of requiredStaticFiles) {
  const file = path.join(docsDir, ...relativePath.split('/'))
  if (!fs.existsSync(file)) {
    failures.push(`${relativePath}: missing`)
    continue
  }
  const content = fs.readFileSync(file, 'utf8')
  if (!content.includes(marker)) failures.push(`${relativePath}: missing marker ${marker}`)
}

const llmsFull = path.join(docsDir, 'llms-full.txt')
if (fs.existsSync(llmsFull)) {
  const content = fs.readFileSync(llmsFull, 'utf8')
  if (content.length < llmsTxt.length) failures.push('llms-full.txt: should be at least as complete as llms.txt')
}

for (const relativePath of ['.well-known/agent-skills/index.json', 'api/openapi.json', 'openapi.json', '.well-known/agent.json', '.well-known/agent-card.json']) {
  const file = path.join(docsDir, ...relativePath.split('/'))
  if (!fs.existsSync(file)) continue
  try {
    JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON (${error.message})`)
  }
}

if (!llmsTxt.includes('zmage.caldis.me is a documentation-only website')) {
  failures.push('llms.txt: missing documentation-only error recovery guidance')
}
if (!llmsTxt.includes('No OAuth or API key is required')) {
  failures.push('llms.txt: missing no-auth guidance')
}
if (!llmsTxt.includes('https://zmage.caldis.me/llms-full.txt')) {
  failures.push('llms.txt: missing llms-full.txt link')
}

const demoVideo = path.join(docsDir, 'media', 'react-zmage-demo.mp4')
if (!fs.existsSync(demoVideo)) {
  failures.push('media/react-zmage-demo.mp4: missing')
}

if (failures.length > 0) {
  console.error(failures.map(f => `- ${f}`).join('\n'))
  process.exit(1)
}

console.log(`SEO output check passed for ${routes.length} routes.`)
