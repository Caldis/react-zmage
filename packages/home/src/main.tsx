/**
 * 应用入口 — 跨 React 版本兼容
 *
 * - R18+: ReactDOM.createRoot
 * - R16/17: 传统 ReactDOM.render
 *
 * 与 react-zmage 内部的 mount 适配器同样思路, 但这里在应用根挂载阶段做检测,
 * 不依赖捕获异常, 仅根据 React.version 分支
 */
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-zmage/style.css'
// react-zmage 的 package.json (workspace symlink → 拿到当前版本号显示在 banner)
import zmagePkg from 'react-zmage/package.json'
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
      reactVersionRequest={typeof __REACT_VERSION_REQUEST__ !== 'undefined' ? __REACT_VERSION_REQUEST__ : undefined}
      zmageVersion={zmagePkg.version}
    />
    <App />
  </React.StrictMode>
)

const reactMajor = parseInt(React.version.split('.')[0] ?? '17', 10)
if (reactMajor >= 18) {
  // R18+ 路径: 用 createRoot. 这里同样用动态 require 避免 R16/17 编译报错.
  // 在 vite 构建里 require 不可用; 但 R18+ 才会进这个分支, 那时 react-dom 必定有 client 子路径.
  const { createRoot } = require('react-dom/client') as typeof import('react-dom/client')
  createRoot(root).render(tree)
} else {
  ReactDOM.render(tree, root)
}
