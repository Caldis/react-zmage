'use client'

/**
 * 顶部固定层 — ContextBanner + 测试用例导航 (client component)
 * 必须 'use client', 因为 ContextBanner 读 React.version (browser API)
 * 且导航 active 高亮用 usePathname (Next.js client hook)
 */
import { usePathname } from 'next/navigation'
import { ContextBanner } from './ContextBanner'

const cases: Array<{ href: string, label: string, hint: string }> = [
  { href: '/', label: 'Constrained', hint: '缩略图固定 180px 高, 容器 960px max-width' },
  { href: '/full-bleed', label: 'Full-bleed', hint: '3 列等分铺满视口, 不限尺寸 (用于复现自然尺寸下的渲染问题)' },
]

export function ClientHeader () {
  const pathname = usePathname()

  return (
    <>
      <ContextBanner mode="RSC" reactVersionRequest="19" />
      <nav style={{
        position: 'fixed', top: 24, left: 0, right: 0, zIndex: 99998,
        background: 'rgba(255,255,255,0.96)',
        borderBottom: '1px solid #e2e8f0',
        backdropFilter: 'blur(8px)',
        padding: '8px 16px',
        display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: 'system-ui, sans-serif', fontSize: 13,
      }}>
        <span style={{ color: '#64748b', marginRight: 8 }}>测试用例:</span>
        {cases.map(c => {
          const active = pathname === c.href
          return (
            <a key={c.href} href={c.href} title={c.hint}
              style={{
                padding: '4px 10px', borderRadius: 4,
                background: active ? '#0f172a' : 'transparent',
                color: active ? '#fff' : '#0f172a',
                textDecoration: 'none',
                border: '1px solid #cbd5e1',
                fontWeight: active ? 600 : 400,
              }}>
              {c.label}
            </a>
          )
        })}
      </nav>
    </>
  )
}
