/**
 * Express + Vite SSR dev server
 *
 * 用 vite.ssrLoadModule 加载 entry-server, 调用 render(url) 拿到 HTML 片段,
 * 注入到 index.html 模板的 <!--ssr-outlet--> 占位符, 然后 vite.transformIndexHtml
 * 处理客户端 script 注入 (HMR / module preload), 最后返回完整页面.
 */
import express from 'express'
import { createServer as createViteServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')

const PORT = Number(process.env.PORT || 8090)

async function createServer () {
  const app = express()

  const vite = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use(/.*/, async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = await fs.readFile(path.join(root, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx') as {
        render: (url: string) => string
      }
      const appHtml = render(url)

      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(PORT, () => {
    console.log(`\n  SSR demo (REACT_VERSION=${process.env.REACT_VERSION || '19'})  →  http://127.0.0.1:${PORT}/\n`)
  })
}

createServer().catch((err) => {
  console.error(err)
  process.exit(1)
})
