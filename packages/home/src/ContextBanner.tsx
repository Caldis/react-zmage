/**
 * 顶部上下文标签 — 显示当前 demo 跑在哪个 React 版本 / 哪种渲染模式 / 哪个 react-zmage 版本
 * 仅 dev 环境显示, 生产构建可以条件去掉
 */
import React from 'react'

export type RuntimeMode = 'CSR' | 'SSR' | 'RSC'

export interface ContextBannerProps {
  mode: RuntimeMode
  /** 通过 vite define 注入的目标版本 (env 触发的设定值) */
  reactVersionRequest?: string
  /** package.json 里读到的 react-zmage 版本 */
  zmageVersion?: string
}

const styles: { [k: string]: React.CSSProperties } = {
  bar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(15, 23, 42, 0.92)',
    color: '#e2e8f0',
    fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
    fontSize: 12,
    lineHeight: '24px',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
    pointerEvents: 'none', // 不挡点击底层 demo
    userSelect: 'none',
  },
  pill: {
    background: 'rgba(99, 102, 241, 0.25)',
    color: '#c7d2fe',
    padding: '2px 8px',
    borderRadius: 4,
    fontWeight: 600,
  },
  modePill: {
    background: 'rgba(34, 197, 94, 0.25)',
    color: '#bbf7d0',
    padding: '2px 8px',
    borderRadius: 4,
    fontWeight: 600,
  },
  separator: { opacity: 0.3 },
  hint: { opacity: 0.55 },
}

const modeLabel: Record<RuntimeMode, string> = {
  CSR: 'CSR · Vite SPA',
  SSR: 'SSR · Express + renderToString',
  RSC: 'RSC · Next.js App Router',
}

export function ContextBanner ({ mode, reactVersionRequest, zmageVersion }: ContextBannerProps) {
  const reactRuntimeVersion = React.version

  return (
    <div style={styles.bar} role="status" aria-label="dev context">
      <span style={styles.modePill}>{modeLabel[mode]}</span>
      <span style={styles.separator}>|</span>
      <span style={styles.pill}>React {reactRuntimeVersion}</span>
      {reactVersionRequest && reactVersionRequest !== reactRuntimeVersion.split('.')[0] && (
        <span style={styles.hint}>(requested major: {reactVersionRequest})</span>
      )}
      <span style={styles.separator}>|</span>
      <span style={styles.pill}>react-zmage {zmageVersion ?? '?'}</span>
      <span style={{ marginLeft: 'auto', ...styles.hint }}>dev banner</span>
    </div>
  )
}
