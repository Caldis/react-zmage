'use client'

/**
 * 受约束布局 — 缩略图固定 180px 高, 整个容器限 960px 宽居中
 * 用 Zmage 的 style prop 把样式透传到内部封面 <img>
 */
import type { CSSProperties } from 'react'
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'

const containerStyle: CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '96px 24px 24px',
}

const galleryStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
  marginTop: 24,
}

const cellImgStyle: CSSProperties = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 8,
  display: 'block',
}

export function ConstrainedGallery () {
  return (
    <div style={containerStyle}>
      <h1 style={{ margin: 0, fontSize: 28 }}>Constrained gallery</h1>
      <p style={{ marginTop: 12, color: '#475569', lineHeight: 1.6 }}>
        每张封面图固定 180px 高, <code>object-fit: cover</code> 裁切适配,
        整个容器 960px 居中. 这是推荐的发布站默认样式.
      </p>
      <div style={galleryStyle}>
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" style={cellImgStyle} />
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" style={cellImgStyle} />
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" style={cellImgStyle} />
      </div>
    </div>
  )
}
