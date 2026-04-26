'use client'

/**
 * 自然尺寸三列等分布局 — Zmage 不带 style 透传, 图片按 grid cell 1fr 自然渲染
 * 用于在大屏复现"图片直接平铺"场景, 排查 Zmage 在无 size 约束下的渲染表现
 */
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'

export function FullBleedGallery () {
  return (
    <div style={{ paddingTop: 96, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '0 20px' }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Full-bleed gallery</h1>
        <p style={{ marginTop: 12, color: '#475569', lineHeight: 1.6 }}>
          三列等分 1fr, 不对图片做任何尺寸约束 (与之前版本一致).
          用于复现大屏铺满时 Zmage 自然尺寸下的行为.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        padding: 20,
      }}>
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" />
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" />
        <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" />
      </div>
    </div>
  )
}
