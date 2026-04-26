'use client'

/**
 * 客户端组件 — 'use client' 边界
 * Zmage 用 useState/refs/事件, 必须在 client component 里使用
 */
import type { CSSProperties, ReactNode } from 'react'
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
import { ContextBanner } from './ContextBanner'

const REACT_VERSION_REQUEST = '19'

const containerStyle: CSSProperties = {
  paddingTop: 60,
  maxWidth: 960,
  margin: '0 auto',
  padding: '60px 24px 24px',
}

const galleryStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
  marginTop: 24,
}

// Zmage 把 className/style 透传到内部封面 <img>; 用它锁定 cell 内图片的尺寸与 fit
const cellImgStyle: CSSProperties = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 8,
  display: 'block',
}

export function ClientShell ({ children }: { children?: ReactNode }) {
  return (
    <>
      <ContextBanner mode="RSC" reactVersionRequest={REACT_VERSION_REQUEST} />
      <div style={containerStyle}>
        {children}
        <div style={galleryStyle}>
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" style={cellImgStyle} />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" style={cellImgStyle} />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" style={cellImgStyle} />
        </div>
      </div>
    </>
  )
}
