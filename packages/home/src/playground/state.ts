import { PARAM_SCHEMA } from '@/schema/param-schema'

/**
 * Single source of truth for playground state derivation.
 *
 * Three exports cover four consumers:
 *   - getInitialValues(): Playground.useState 初始值 + Reset 按钮
 *   - buildLibProps():    snippet 渲染 + livedemo 运行时
 *   - diffFromInitial():  share-URL 编码
 *
 * 新增参数：仅改 PARAM_SCHEMA。若 lib 默认为空且需 WYSIWYG 兜底，再加进 PLAYGROUND_SEED。
 */

export const PLAYGROUND_SEED: Record<string, any> = {
  src: '/imgSet/childsDream/1.jpg',
  alt: '童夢 · ONE',
  set: [
    { src: '/imgSet/childsDream/1.jpg', alt: '童夢 · ONE' },
    { src: '/imgSet/childsDream/2.jpg', alt: '童夢 · TWO' },
  ],
}

export function getInitialValues (): Record<string, any> {
  const v: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) v[def.name] = def.default
  Object.assign(v, PLAYGROUND_SEED)
  return v
}

function isSchemaDefault (name: string, value: any): boolean {
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  if (value === undefined) return true
  if (typeof value === 'object' && value !== null) {
    try { return JSON.stringify(value) === JSON.stringify(def.default) } catch { return false }
  }
  return value === def.default
}

function deepEqual (a: any, b: any): boolean {
  if (a === b) return true
  if (typeof a === 'function' || typeof b === 'function') return false
  try { return JSON.stringify(a) === JSON.stringify(b) } catch { return false }
}

/**
 * Build props for the lib OR for code-snippet display.
 *
 * - touched 缺省: 剥所有 schema 默认。livedemo 必须这样调——controller={} 等空对象会
 *   覆盖 lib 内部的 defPreset, 导致 modal 无控件无快捷键无动画.
 * - touched 传入: 仅剥 "未碰过 && value === schema 默认". snippet 用——用户拖过再
 *   拖回默认值的字段在 snippet 中保留, 体现"用户的显式选择".
 * - required 字段 (e.g. src) 始终保留, 即便等于默认.
 * - undefined 一律剥掉, 避免 callback 字段产生 `onBrowsing={undefined}` 这种无效代码.
 */
export function buildLibProps (
  values: Record<string, any>,
  touched?: ReadonlySet<string>,
): Record<string, any> {
  const out: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) {
    const v = values[def.name]
    if (def.required) { out[def.name] = v ?? ''; continue }
    if (v === undefined) continue
    if (isSchemaDefault(def.name, v) && !touched?.has(def.name)) continue
    out[def.name] = v
  }
  return out
}

/**
 * Diff current values against initial state — used by share-URL encoder.
 * 对 seed 字段, initial = seed; 对其它字段, initial = schema 默认. 只记录用户实际
 * 改动过的位置. Callback 函数与 initial 的 undefined 永不相等, 自然进 diff.
 */
export function diffFromInitial (values: Record<string, any>): Record<string, any> {
  const initial = getInitialValues()
  const out: Record<string, any> = {}
  for (const def of PARAM_SCHEMA) {
    const k = def.name
    const v = values[k]
    if (v === undefined) continue
    if (deepEqual(v, initial[k])) continue
    out[k] = v
  }
  return out
}
