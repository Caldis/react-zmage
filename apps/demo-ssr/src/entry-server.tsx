/**
 * SSR entry — Vite 通过 ssrLoadModule 加载这个文件以拿到 render(req)
 */
import { renderToString } from 'react-dom/server'
import App from './App'

export function render (_url: string): string {
  return renderToString(<App />)
}
