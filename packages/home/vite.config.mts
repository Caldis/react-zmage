import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const docsDir = path.resolve(__dirname, '../../docs')

const spaFallback: Plugin = {
  name: 'home-spa-fallback',
  closeBundle () {
    const index = path.join(docsDir, 'index.html')
    const fallback = path.join(docsDir, '404.html')
    if (fs.existsSync(index)) {
      fs.copyFileSync(index, fallback)
    }
  },
}

// Copy repo-root llms.txt to deploy output so it's reachable at zmage.caldis.me/llms.txt
// (llmstxt.org canonical location). Repo root is the single source of truth — keep it
// updated there; this plugin keeps the deployed copy in sync.
const copyLlmsTxt: Plugin = {
  name: 'copy-llms-txt',
  closeBundle () {
    const src = path.resolve(__dirname, '../../llms.txt')
    const dest = path.join(docsDir, 'llms.txt')
    if (fs.existsSync(src)) fs.copyFileSync(src, dest)
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback, copyLlmsTxt],
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 8080),
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
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
})
