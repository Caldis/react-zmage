import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-zmage/style.css'
import './styles/globals.css'
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
