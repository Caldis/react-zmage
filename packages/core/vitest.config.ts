import { defineConfig } from 'vitest/config'
import path from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// 防御 pnpm hoist 多版本 react (workspace 里 home 用 react@19, sandboxes 跨版测试):
// 显式把 react/react-dom/jsx-runtime 锁到 packages/core 自己 node_modules 解析的版本,
// 避免 vitest 走默认解析时拿到 .pnpm 里其他版本的副本, 引发 "older version of React was rendered".
const reactPkg = require.resolve('react/package.json')
const reactDir = path.dirname(reactPkg)
const reactDomPkg = require.resolve('react-dom/package.json')
const reactDomDir = path.dirname(reactDomPkg)

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      reporter: ['text', 'json-summary'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react': reactDir,
      'react/jsx-runtime': path.join(reactDir, 'jsx-runtime'),
      'react/jsx-dev-runtime': path.join(reactDir, 'jsx-dev-runtime'),
      'react-dom': reactDomDir,
      'react-dom/client': path.join(reactDomDir, 'client'),
      'react-dom/test-utils': path.join(reactDomDir, 'test-utils'),
    },
  },
})
