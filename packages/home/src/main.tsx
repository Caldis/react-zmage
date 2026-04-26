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

createRoot(root).render(
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
