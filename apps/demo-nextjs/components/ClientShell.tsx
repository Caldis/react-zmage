'use client'

/**
 * 客户端组件 — 'use client' 边界
 * Zmage 用 useState/refs/事件, 必须在 client component 里使用
 */
import type { ReactNode } from 'react'
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
import { ContextBanner } from './ContextBanner'

const REACT_VERSION_REQUEST = '19'

export function ClientShell ({ children }: { children?: ReactNode }) {
  return (
    <>
      <ContextBanner mode="RSC" reactVersionRequest={REACT_VERSION_REQUEST} />
      <main style={{ paddingTop: 60 }}>
        {children}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: 20 }}>
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" />
        </div>
      </main>
    </>
  )
}
