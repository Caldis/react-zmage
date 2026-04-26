/**
 * Client hydration entry — demo-ssr 仅支持 React 18+ (createRoot / hydrateRoot 必备)
 */
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from '../App'

const root = document.getElementById('app')
if (!root) {
  throw new Error('Missing #app root element')
}

hydrateRoot(
  root,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
