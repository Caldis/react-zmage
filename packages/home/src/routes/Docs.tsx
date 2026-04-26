import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '@/docs/Sidebar'
import { useScrollSpy } from '@/docs/Toc'
import { Footer } from '@/components/Footer'
import { useT } from '@/i18n/useT'
import { Installation } from '@/docs/sections/Installation'
import { ThreeModes } from '@/docs/sections/ThreeModes'
import { Theming } from '@/docs/sections/Theming'
import { Props } from '@/docs/sections/Props'
import { Examples } from '@/docs/sections/Examples'
import { TypeScript } from '@/docs/sections/TypeScript'
import { Migration } from '@/docs/sections/Migration'
import { FAQ } from '@/docs/sections/FAQ'

export default function Docs () {
  const activeId = useScrollSpy('main h2[id], main h3[id]')
  const { t } = useT()
  const { pathname, hash } = useLocation()

  // react-router 的 navigate(/docs#xxx) 只改 URL 不滚动. 这里在 mount + hash 变更时
  // 主动找元素 scrollIntoView, 让 Cmd+K 等程序式跳转能真正定位到对应章节.
  // 用 RAF 让 sections 先渲染完再滚 — 避免拿到 null.
  React.useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    let cancelled = false
    // 双 RAF: 第一帧布局完成, 第二帧确保所有 section 已挂载
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
    return () => { cancelled = true }
  }, [pathname, hash])

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar activeId={activeId} />
          </div>
        </aside>
        <main className="max-w-none space-y-2 min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">{t('docs.title')}</h1>
          <Installation />
          <ThreeModes />
          <Theming />
          <Props />
          <Examples />
          <TypeScript />
          <Migration />
          <FAQ />
        </main>
      </div>
      <Footer />
    </>
  )
}
