/**
 * Next.js App Router Server Component (默认 RSC).
 * 通过 ClientShell 注入 Zmage 实例 + ContextBanner, 验证 RSC → Client boundary 渲染链路.
 */
import { ClientShell } from '../components/ClientShell'

export default function Page () {
  // Server-rendered shell. Zmage 实例由 client component 渲染.
  return (
    <ClientShell>
      <h1 style={{ paddingLeft: 20 }}>react-zmage Next.js demo</h1>
      <p style={{ paddingLeft: 20, color: '#475569' }}>
        这页由 Server Component 渲染外层结构, 内部 Zmage 实例为 'use client' 包装.
        Next.js App Router 在 build/SSG 阶段把封面 &lt;img&gt; 输出到 HTML, 浏览器加载后 hydrate.
      </p>
    </ClientShell>
  )
}
