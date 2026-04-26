import * as React from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { PARAM_SCHEMA } from '@/schema/param-schema'
import { PLAYGROUND_SEED } from '@/playground/seed'

type Mode = 'component' | 'imperative' | 'wrapper'

function isCallback (v: any) {
  return typeof v === 'function' && v?.__zmageLog === true
}

function isDefault (name: string, value: any) {
  // 当前值与 playground 种子一致 → 视为默认 (不写进代码片段, 不写进分享 URL)
  if (name in PLAYGROUND_SEED) {
    try { return JSON.stringify(value) === JSON.stringify((PLAYGROUND_SEED as any)[name]) } catch { /* fallthrough */ }
  }
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  if (value === undefined) return true
  if (typeof value === 'object') {
    try { return JSON.stringify(value) === JSON.stringify(def.default) } catch { return false }
  }
  return value === def.default
}

function formatValue (v: any): string {
  if (typeof v === 'string') return JSON.stringify(v)
  if (typeof v === 'function') {
    return `(...args) => console.info(args)`
  }
  return JSON.stringify(v, null, 2)
}

export function buildPropsObject (values: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) {
    const v = values[def.name]
    if (def.required) { out[def.name] = v ?? '' ; continue }
    if (isDefault(def.name, v)) continue
    out[def.name] = v
  }
  return out
}

/**
 * Runtime-side props builder.
 * Strips ONLY schema defaults — seed values for src/alt/set pass through so
 * the rendered <Zmage> actually has data. CodeSnippet's `isDefault` (which
 * also treats seed as default) is only suitable for display/share URL.
 *
 * Why this matters: spreading raw `values` directly into <Zmage> would push
 * schema defaults like controller={} / hotKey={} / animate={} through, which
 * override the lib's defPreset.desktop.* causing the modal to render with
 * no controls / no shortcuts / no animations (= "click does nothing" feel).
 */
function isSchemaDefault (name: string, value: any) {
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  if (value === undefined) return true
  if (typeof value === 'object') {
    try { return JSON.stringify(value) === JSON.stringify(def.default) } catch { return false }
  }
  return value === def.default
}

export function buildRuntimeProps (values: Record<string, any>) {
  const out: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) {
    const v = values[def.name]
    if (def.required) { out[def.name] = v ?? ''; continue }
    if (isSchemaDefault(def.name, v)) continue
    out[def.name] = v
  }
  return out
}

function renderJsx (values: Record<string, any>) {
  const props = buildPropsObject(values)
  const lines: string[] = ['<Zmage']
  for (const [k, v] of Object.entries(props)) {
    if (typeof v === 'string' && !v.includes('\n')) {
      lines.push(`  ${k}=${JSON.stringify(v)}`)
    } else if (isCallback(v)) {
      lines.push(`  ${k}={(...args) => console.info('${k}', args)}`)
    } else {
      lines.push(`  ${k}={${formatValue(v)}}`)
    }
  }
  lines.push('/>')
  return lines.join('\n')
}

function renderImperative (values: Record<string, any>) {
  const props = buildPropsObject(values)
  return [
    `import Zmage from 'react-zmage'`,
    ``,
    `Zmage.browsing(${JSON.stringify(props, null, 2)})`,
  ].join('\n')
}

function renderWrapper (values: Record<string, any>) {
  const props = buildPropsObject(values)
  const propsStr = Object.entries(props)
    .map(([k, v]) => typeof v === 'string' ? `${k}=${JSON.stringify(v)}` : `${k}={${formatValue(v)}}`)
    .join(' ')
  return [
    `<Zmage.Wrapper${propsStr ? ' ' + propsStr : ''}>`,
    `  <article dangerouslySetInnerHTML={{ __html: html }} />`,
    `</Zmage.Wrapper>`,
  ].join('\n')
}

export function CodeSnippet ({ values, mode }: { values: Record<string, any>; mode: Mode }) {
  const code = mode === 'component' ? renderJsx(values)
    : mode === 'imperative' ? renderImperative(values)
      : renderWrapper(values)
  return <CodeBlock code={code} language={'tsx' as any} />
}
