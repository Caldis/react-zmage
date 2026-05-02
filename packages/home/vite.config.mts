import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const docsDir = path.resolve(__dirname, '../../docs')
const workspaceRoot = path.resolve(__dirname, '../..')
const coreSrcEntry = path.resolve(__dirname, '../core/src/index.ts')
const devZmageStyle = path.resolve(__dirname, 'src/styles/react-zmage-dev.css')

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

export default defineConfig(({ command }) => {
  const devCoreAlias = command === 'serve'
    ? [
        { find: /^react-zmage$/, replacement: coreSrcEntry },
        { find: /^react-zmage\/style\.css$/, replacement: devZmageStyle },
      ]
    : []

  return {
    plugins: [react(), tailwindcss(), spaFallback],
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
