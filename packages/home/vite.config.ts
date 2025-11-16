import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const docsDir = path.resolve(__dirname, '../../docs')

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 8080),
  },
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: docsDir,
    emptyOutDir: true,
  },
  preview: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PREVIEW_PORT || 4173),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}))
