/**
 * Client hydration entry — 跨 React 版本兼容
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

const root = document.getElementById('app')
if (!root) {
  throw new Error('Missing #app root element')
}

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const reactMajor = parseInt(React.version.split('.')[0] ?? '17', 10)
if (reactMajor >= 18) {
  // R18+: hydrateRoot
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { hydrateRoot } = require('react-dom/client') as typeof import('react-dom/client')
  hydrateRoot(root, tree)
} else {
  // R17: ReactDOM.hydrate (legacy)
  // ReactDOM.hydrate is the API for SSR-rendered roots in R17
  ReactDOM.hydrate(tree, root)
}
