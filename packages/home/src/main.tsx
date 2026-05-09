import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Load Tailwind preflight FIRST so react-zmage's style.css can override
// the bare `img { max-width: 100%; height: auto; display: block }` reset
// that would otherwise shrink the expanded viewer image and corrupt the
// cover element's clientWidth/Height read used for the zoom origin.
import './styles/globals.css'
import 'react-zmage/style.css'
import { ThemeProvider } from '@/lib/theme'
import { I18nProvider } from '@/i18n/useT'
import App from './App'

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app root element')
const appRoot = root

function renderAgentMode () {
  appRoot.innerHTML = `
    <main data-agent-mode style="max-width: 860px; margin: 48px auto; padding: 0 24px; font: 16px/1.6 system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;">
      <h1>react-zmage agent view</h1>
      <p>react-zmage is a free MIT-licensed npm package for turning React img elements, galleries, CMS HTML, MDX, markdown, and rich text images into a fullscreen image viewer. This site is documentation-only; it has no hosted product API, OAuth flow, API key, rate-limit budget, webhook system, or hosted MCP server.</p>
      <h2>Install</h2>
      <pre><code>npm install react-zmage</code></pre>
      <h2>Package entry points</h2>
      <ul>
        <li><code>react-zmage</code> - browser and bundler entry.</li>
        <li><code>react-zmage/ssr</code> - SSR and React Server Components-safe import path.</li>
        <li><code>react-zmage/style.css</code> - required visual stylesheet.</li>
      </ul>
      <h2>Machine-readable resources</h2>
      <ul>
        <li><a href="/llms.txt">/llms.txt</a> - compact agent instructions.</li>
        <li><a href="/llms-full.txt">/llms-full.txt</a> - complete single-file agent context.</li>
        <li><a href="/index.md">/index.md</a> - markdown homepage.</li>
        <li><a href="/api/openapi.json">/api/openapi.json</a> - OpenAPI metadata for static documentation endpoints.</li>
        <li><a href="/developers/auth.md">/developers/auth.md</a> - auth and access notes.</li>
        <li><a href="/developers/mcp.md">/developers/mcp.md</a> - MCP status notes.</li>
        <li><a href="/developers/webhooks.md">/developers/webhooks.md</a> - webhook status notes.</li>
        <li><a href="/.well-known/agent.json">/.well-known/agent.json</a> - agent discovery file.</li>
        <li><a href="/.well-known/agent-card.json">/.well-known/agent-card.json</a> - A2A-style discovery card.</li>
      </ul>
      <h2>Use this when</h2>
      <table>
        <thead><tr><th>Mode</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td>Component</td><td>Owned React image markup.</td></tr>
          <tr><td>Wrapper</td><td>CMS, MDX, markdown, rich text, or generated HTML images.</td></tr>
          <tr><td>Imperative</td><td>Buttons, commands, callbacks, and non-image triggers.</td></tr>
        </tbody>
      </table>
    </main>
  `
}

if (new URLSearchParams(window.location.search).get('mode') === 'agent') {
  renderAgentMode()
} else {
  createRoot(appRoot).render(
    <React.StrictMode>
      <ThemeProvider>
        <I18nProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
