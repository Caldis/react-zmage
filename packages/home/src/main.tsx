/**
 * 应用入口 — 跨 React 版本兼容
 *
 * - R18+: ReactDOM.createRoot (经 vite alias → react-dom18/client 或 react-dom19/client)
 * - R16/17: 传统 ReactDOM.render
 *
 * 分支选择基于 vite 'virtual:zmage-context' 注入的常量, esbuild build 时能折叠
 * if (false) 分支 (含动态 import('react-dom/client')), 避免 R17 build 误编译
 * 不存在的 react-dom17/client 子路径.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-zmage/style.css'
// react-zmage 的 package.json (workspace symlink → 拿到当前版本号显示在 banner)
import zmagePkg from 'react-zmage/package.json'
import { REACT_VERSION_REQUEST, USE_CREATE_ROOT, importReactDomClient } from 'virtual:zmage-context'
import App from './App'
import { ContextBanner } from './ContextBanner'

const root = document.getElementById('app')
if (!root) {
  throw new Error('Missing #app root element')
}

const tree = (
  <React.StrictMode>
    <ContextBanner
      mode="CSR"
      reactVersionRequest={REACT_VERSION_REQUEST}
      zmageVersion={zmagePkg.version}
    />
    <App />
  </React.StrictMode>
)

if (USE_CREATE_ROOT) {
  // R18+ 路径 — importReactDomClient 由 virtual module 按版本生成具体代码体,
  // R17 build 不会包含真实的 import('react-dom/client') 字符串
  importReactDomClient().then(({ createRoot }) => {
    createRoot(root).render(tree)
  })
} else {
  // R16/17 路径
  ReactDOM.render(tree, root)
}
