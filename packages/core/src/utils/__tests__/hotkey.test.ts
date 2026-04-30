/**
 * 快捷键解析 + 匹配单元测试
 */
import { describe, expect, it } from 'vitest'
import { matchHotKey, matchAnyHotKey, parseHotKey, resolveHotKeyValue, resolveSideBinding } from '../hotkey'

const ev = (init: KeyboardEventInit & { code: string }) => new KeyboardEvent('keydown', init)

describe('parseHotKey — 单字符短形式归一化', () => {
  it("'S' → KeyS (大小写不敏感)", () => {
    expect(parseHotKey('S').code).toBe('KeyS')
    expect(parseHotKey('s').code).toBe('KeyS')
  })
  it("'1' → Digit1", () => {
    expect(parseHotKey('1').code).toBe('Digit1')
  })
  it('多字符 e.code 名按字面量保留', () => {
    expect(parseHotKey('Escape').code).toBe('Escape')
    expect(parseHotKey('BracketLeft').code).toBe('BracketLeft')
    expect(parseHotKey('ArrowLeft').code).toBe('ArrowLeft')
  })
})

describe('parseHotKey — 修饰键解析', () => {
  it("'Mod+S' → needsMod=true, code=KeyS", () => {
    const p = parseHotKey('Mod+S')
    expect(p.needsMod).toBe(true)
    expect(p.code).toBe('KeyS')
  })
  it("'Cmd' / 'Meta' 等价", () => {
    expect(parseHotKey('Cmd+S').needsCmd).toBe(true)
    expect(parseHotKey('Meta+S').needsCmd).toBe(true)
  })
  it("'Ctrl' / 'Control' 等价", () => {
    expect(parseHotKey('Ctrl+S').needsCtrl).toBe(true)
    expect(parseHotKey('Control+S').needsCtrl).toBe(true)
  })
  it("'Alt' / 'Option' 等价", () => {
    expect(parseHotKey('Alt+S').needsAlt).toBe(true)
    expect(parseHotKey('Option+S').needsAlt).toBe(true)
  })
  it('多修饰键 + 空格容忍', () => {
    const p = parseHotKey('Mod + Shift + R')
    expect(p.needsMod).toBe(true)
    expect(p.needsShift).toBe(true)
    expect(p.code).toBe('KeyR')
  })
})

describe('matchHotKey — 基础按键比对', () => {
  it("'Escape' 匹配 e.code=Escape 且无修饰键", () => {
    expect(matchHotKey(ev({ code: 'Escape' }), parseHotKey('Escape'))).toBe(true)
  })
  it('e.code 不一致则不匹配', () => {
    expect(matchHotKey(ev({ code: 'Enter' }), parseHotKey('Escape'))).toBe(false)
  })
  it("'BracketLeft' 匹配物理 [ 键", () => {
    expect(matchHotKey(ev({ code: 'BracketLeft' }), parseHotKey('BracketLeft'))).toBe(true)
  })
})

describe('matchHotKey — 严格修饰键拒绝 (防误触)', () => {
  it("'Space' 不被 'Cmd+Space' (输入法切换) 触发", () => {
    expect(matchHotKey(ev({ code: 'Space', metaKey: true }), parseHotKey('Space'))).toBe(false)
  })
  it("'Space' 不被 'Ctrl+Space' 触发", () => {
    expect(matchHotKey(ev({ code: 'Space', ctrlKey: true }), parseHotKey('Space'))).toBe(false)
  })
  it("'Space' 不被 'Shift+Space' 触发", () => {
    expect(matchHotKey(ev({ code: 'Space', shiftKey: true }), parseHotKey('Space'))).toBe(false)
  })
  it("'Mod+S' 被 'Cmd+Shift+S' 拒绝 (多了未声明的 Shift)", () => {
    expect(matchHotKey(ev({ code: 'KeyS', metaKey: true, shiftKey: true }), parseHotKey('Mod+S'))).toBe(false)
  })
})

describe("matchHotKey — 'Mod' 跨平台别名", () => {
  it('Mac 路径: metaKey 满足 Mod', () => {
    expect(matchHotKey(ev({ code: 'KeyS', metaKey: true }), parseHotKey('Mod+S'))).toBe(true)
  })
  it('Win/Linux 路径: ctrlKey 满足 Mod', () => {
    expect(matchHotKey(ev({ code: 'KeyS', ctrlKey: true }), parseHotKey('Mod+S'))).toBe(true)
  })
  it('裸 KeyS (无修饰) 不被 Mod+S 触发', () => {
    expect(matchHotKey(ev({ code: 'KeyS' }), parseHotKey('Mod+S'))).toBe(false)
  })
})

describe("matchHotKey — 显式 'Cmd' / 'Ctrl' 锁平台", () => {
  it("'Cmd+S' 仅 metaKey 满足, ctrlKey 不行", () => {
    expect(matchHotKey(ev({ code: 'KeyS', metaKey: true }), parseHotKey('Cmd+S'))).toBe(true)
    expect(matchHotKey(ev({ code: 'KeyS', ctrlKey: true }), parseHotKey('Cmd+S'))).toBe(false)
  })
  it("'Ctrl+S' 仅 ctrlKey 满足, metaKey 不行", () => {
    expect(matchHotKey(ev({ code: 'KeyS', ctrlKey: true }), parseHotKey('Ctrl+S'))).toBe(true)
    expect(matchHotKey(ev({ code: 'KeyS', metaKey: true }), parseHotKey('Ctrl+S'))).toBe(false)
  })
})

describe('resolveHotKeyValue — HotKeyValue → ParsedKey[]', () => {
  it('true → 默认描述符', () => {
    const parsed = resolveHotKeyValue(true, 'Escape')
    expect(parsed).toHaveLength(1)
    expect(parsed[0].code).toBe('Escape')
  })
  it('false / undefined → 空数组 (禁用)', () => {
    expect(resolveHotKeyValue(false, 'Escape')).toEqual([])
    expect(resolveHotKeyValue(undefined, 'Escape')).toEqual([])
  })
  it('string → 自定义单绑', () => {
    const parsed = resolveHotKeyValue('Mod+S', 'Escape')
    expect(parsed[0].code).toBe('KeyS')
    expect(parsed[0].needsMod).toBe(true)
  })
  it('string[] → 多绑', () => {
    const parsed = resolveHotKeyValue(['Escape', 'KeyQ'], 'Escape')
    expect(parsed.map(p => p.code)).toEqual(['Escape', 'KeyQ'])
  })
})

describe('resolveSideBinding — per-side + umbrella', () => {
  it('per-side 未定义, umbrella=true → 默认描述符', () => {
    const parsed = resolveSideBinding(undefined, true, 'ArrowLeft')
    expect(parsed[0].code).toBe('ArrowLeft')
  })
  it('per-side 未定义, umbrella=false → 空 (禁用)', () => {
    expect(resolveSideBinding(undefined, false, 'ArrowLeft')).toEqual([])
  })
  it('per-side=true, umbrella=false → 启用 (per-side OR umbrella)', () => {
    const parsed = resolveSideBinding(true, false, 'ArrowLeft')
    expect(parsed).toHaveLength(1)
  })
  it('per-side=string → per-side 严格胜出 (umbrella 被忽略)', () => {
    const parsed = resolveSideBinding('KeyA', true, 'ArrowLeft')
    expect(parsed[0].code).toBe('KeyA')
    expect(parsed).toHaveLength(1)
  })
  it('per-side=array → per-side 严格胜出', () => {
    const parsed = resolveSideBinding(['KeyA', 'KeyB'], true, 'ArrowLeft')
    expect(parsed.map(p => p.code)).toEqual(['KeyA', 'KeyB'])
  })
})

describe('matchAnyHotKey — 多绑定触发', () => {
  it('数组中任一描述符匹配即返回 true', () => {
    const parsed = resolveHotKeyValue(['Escape', 'KeyQ'], 'Escape')
    expect(matchAnyHotKey(ev({ code: 'KeyQ' }), parsed)).toBe(true)
    expect(matchAnyHotKey(ev({ code: 'Escape' }), parsed)).toBe(true)
    expect(matchAnyHotKey(ev({ code: 'KeyZ' }), parsed)).toBe(false)
  })
  it('空数组永不匹配', () => {
    expect(matchAnyHotKey(ev({ code: 'Escape' }), [])).toBe(false)
  })
})
