/**
 * 快捷键描述符解析 + 事件匹配
 *
 * 设计动机:
 * - HotKey 接口允许用户传入字符串描述符 (如 'Mod+S' / 'BracketLeft' / 'S')
 *   覆盖默认绑定, 此模块负责把字符串解析为可与原生 KeyboardEvent 比较的结构。
 * - 用 e.code (按键物理位置, 不受键盘布局影响) 而非已弃用的 e.keyCode 或受布局影响的 e.key,
 *   保证 'BracketLeft' 在 QWERTY/AZERTY 上指向同一个物理键, 这是设计快捷键的正确粒度。
 * - 修饰键支持跨平台 'Mod' 别名: ⌘ (mac, metaKey) 与 Ctrl (win/linux, ctrlKey) 任一满足。
 *   用户也可显式写 'Cmd' / 'Ctrl' 锁定到具体平台。
 * - 严格匹配未声明的修饰键: 'Space' 不能被 'Cmd+Space' 触发 (否则切换输入法时误吞).
 */

import { HotKeyValue } from '../types/global'

export interface ParsedKey {
  /** 标准化后的 e.code 值, 如 'KeyS' / 'Escape' / 'BracketLeft' */
  code: string
  /** 'Mod' = ⌘ 或 Ctrl 任一满足 */
  needsMod: boolean
  /** 'Cmd' / 'Meta' = 仅 ⌘ */
  needsCmd: boolean
  /** 'Ctrl' / 'Control' = 仅 Ctrl */
  needsCtrl: boolean
  needsShift: boolean
  needsAlt: boolean
}

/**
 * 把用户友好短形式归一化为 e.code
 *  'S' → 'KeyS'      'a' → 'KeyA'
 *  '1' → 'Digit1'
 *  其余按 e.code 标准名直接透传 (Escape / Space / ArrowLeft / BracketLeft / Comma / F1 ...)
 */
const normalizeKeyName = (raw: string): string => {
  if (raw.length === 1) {
    if (/[A-Za-z]/.test(raw)) return `Key${raw.toUpperCase()}`
    if (/[0-9]/.test(raw))    return `Digit${raw}`
  }
  return raw
}

/**
 * 解析单个描述符
 * 'Escape' / 'Space' / 'ArrowLeft' / 'BracketLeft' / 'S' / 'Mod+S' / 'Cmd+Shift+R'
 */
export const parseHotKey = (descriptor: string): ParsedKey => {
  const parts = descriptor.split('+').map(s => s.trim()).filter(Boolean)
  // 末尾段为主键, 前面所有段为修饰键
  const last = parts.pop() ?? ''
  const mods = new Set(parts.map(p => p.toLowerCase()))
  return {
    code:       normalizeKeyName(last),
    needsMod:   mods.has('mod'),
    needsCmd:   mods.has('cmd') || mods.has('meta'),
    needsCtrl:  mods.has('ctrl') || mods.has('control'),
    needsShift: mods.has('shift'),
    needsAlt:   mods.has('alt') || mods.has('option'),
  }
}

/**
 * 把 HotKeyValue 解析成可匹配的描述符列表
 *  true        → [defaultDesc]
 *  false/undef → []
 *  string      → [parsed]
 *  string[]    → 多绑定
 */
export const resolveHotKeyValue = (
  value: HotKeyValue | undefined,
  defaultDescriptor: string,
): ParsedKey[] => {
  if (value == null || value === false) return []
  if (value === true)            return [parseHotKey(defaultDescriptor)]
  if (typeof value === 'string') return [parseHotKey(value)]
  if (Array.isArray(value))      return value.map(parseHotKey)
  return []
}

/**
 * 按"per-side 优先, 否则 umbrella 兜底"的语义解析左/右类成对动作 (flip / rotate)
 *
 * 行为表 (兼容旧 OR-语义, 对 string 描述符则 per-side 严格胜出):
 *   side=string|array   → 始终用 per-side (umbrella 被忽略)
 *   side=true           → 默认描述符
 *   side=undefined      → umbrella 决定; umbrella=true 则用默认描述符
 *   side=false          → 与 umbrella OR (保留旧行为: umbrella=true 仍生效)
 */
export const resolveSideBinding = (
  side: HotKeyValue | undefined,
  umbrella: boolean | undefined,
  defaultDescriptor: string,
): ParsedKey[] => {
  if (typeof side === 'string' || Array.isArray(side)) {
    return resolveHotKeyValue(side, defaultDescriptor)
  }
  // 仅 boolean / undefined 走 OR 兜底, 与历史 (hotKey.flipLeft || hotKey.flip) 等价
  const enabled = !!side || !!umbrella
  return enabled ? [parseHotKey(defaultDescriptor)] : []
}

/**
 * 把原生 KeyboardEvent 与解析后的描述符比对
 *
 * 严格匹配规则:
 *  - e.code 必须等于 p.code
 *  - p.needsMod=true: e.metaKey 或 e.ctrlKey 任一为 true 即满足 ('Mod' 跨平台别名)
 *  - p.needsMod=false: 严格相等比较 (未声明的修饰键不能被按下, 否则 'Space' 会被
 *    'Cmd+Space' (输入法切换) 误触发)
 *  - shift / alt 始终严格相等
 */
export const matchHotKey = (e: KeyboardEvent, p: ParsedKey): boolean => {
  if (e.code !== p.code) return false
  if (p.needsMod) {
    if (!(e.metaKey || e.ctrlKey)) return false
  } else {
    if (p.needsCmd !== e.metaKey)  return false
    if (p.needsCtrl !== e.ctrlKey) return false
  }
  if (p.needsShift !== e.shiftKey) return false
  if (p.needsAlt   !== e.altKey)   return false
  return true
}

/**
 * 任一描述符匹配即返回 true
 */
export const matchAnyHotKey = (e: KeyboardEvent, parsed: ParsedKey[]): boolean => {
  for (let i = 0; i < parsed.length; i++) {
    if (matchHotKey(e, parsed[i])) return true
  }
  return false
}
