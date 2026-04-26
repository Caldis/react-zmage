import { PARAM_SCHEMA } from '@/schema/param-schema'
import { PLAYGROUND_SEED } from '@/playground/seed'

// Hash format: #?key1=value1&key2=value2 (URL-encoded JSON for non-string values)

function isCallback (v: any) { return typeof v === 'function' && v?.__zmageLog === true }
function isDefault (name: string, v: any) {
  // playground 种子值算默认 — 不进 share URL
  if (name in PLAYGROUND_SEED) {
    try { return JSON.stringify(v) === JSON.stringify((PLAYGROUND_SEED as any)[name]) } catch { /* fallthrough */ }
  }
  const def = PARAM_SCHEMA.find(d => d.name === name)
  if (!def) return true
  if (v === undefined) return true
  try { return JSON.stringify(v) === JSON.stringify(def.default) } catch { return false }
}

export function encodeStateToHash (values: Record<string, any>): string {
  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(values)) {
    if (isDefault(k, v)) continue
    if (isCallback(v)) {
      params.set(k, '__log__')
      continue
    }
    if (typeof v === 'string') params.set(k, v)
    else params.set(k, JSON.stringify(v))
  }
  return '#?' + params.toString()
}

export function decodeStateFromHash (hash: string): Record<string, any> {
  const out: Record<string, any> = {}
  const q = hash.startsWith('#?') ? hash.slice(2) : hash.startsWith('#') ? hash.slice(1) : hash
  if (!q) return out
  const params = new URLSearchParams(q)
  for (const [k, raw] of params) {
    if (raw === '__log__') {
      const def = PARAM_SCHEMA.find(d => d.name === k)
      if (def?.control.kind === 'callback') {
        const fn: any = (...args: any[]) => {
          window.dispatchEvent(new CustomEvent('zmage-pg-event', { detail: { name: k, args } }))
        }
        fn.__zmageLog = true
        fn.__name = k
        out[k] = fn
      }
      continue
    }
    // Try JSON; fall back to raw string
    try { out[k] = JSON.parse(raw) }
    catch { out[k] = raw }
  }
  return out
}
