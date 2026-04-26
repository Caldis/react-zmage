import type { BaseType } from 'react-zmage'
import type { I18nKey } from '@/i18n/dict'

// ─────────────────────────────────────────────────────────────
// Default values mirrored from packages/core/src/types/default.ts
// (defProp / defPreset are NOT part of react-zmage's public exports
//  and tsup bundles dist/, so we cannot deep-import them. If you change
//  defaults in packages/core, update the values here.)
// ─────────────────────────────────────────────────────────────
export const defProp = {
  src: '',
  alt: '',
  txt: '',
  set: [] as { src: string; alt?: string; text?: string }[],
  defaultPage: 0,
  preset: '',
  controller: {} as Record<string, boolean>,
  hotKey: {} as Record<string, boolean>,
  animate: {} as Record<string, unknown>,
  hideOnScroll: true,
  coverVisible: false,
  backdrop: '#FFFFFF',
  zIndex: 1000,
  radius: 0,
  edge: 0,
  loop: true,
}

export const defPreset = {
  desktop: {
    controller: { pagination: true, rotate: true, zoom: true, download: false, close: true, flip: true },
    hotKey: { close: true, zoom: true, flip: true },
    animate: { browsing: true, flip: 'fade' as const },
  },
  mobile: {
    controller: { pagination: true, rotate: false, zoom: false, download: false, close: true, flip: false },
    hotKey: { close: false, zoom: false, flip: false },
    animate: { browsing: true, flip: 'swipe' as const },
  },
}

export type ControlKind =
  | { kind: 'switch' }
  | { kind: 'slider'; min: number; max: number; step?: number }
  | { kind: 'number' }
  | { kind: 'text' }
  | { kind: 'color' }
  | { kind: 'select'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'segmented'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'object'; component: 'controller' | 'hotkey' | 'animate' | 'set' }
  | { kind: 'callback'; events: string[] }

export type ParamGroup =
  | 'data' | 'preset' | 'interface' | 'controller' | 'hotkey' | 'animate' | 'lifecycle' | 'controlled'

export type ParamDef<K extends keyof BaseType = keyof BaseType> = {
  name: K
  group: ParamGroup
  default: unknown
  control: ControlKind
  i18n: { labelKey: I18nKey; descKey: I18nKey }
  desktopOnly?: boolean
  required?: boolean
  since?: string
}

export const PARAM_SCHEMA: ParamDef[] = [
  // Data
  { name: 'src', group: 'data', default: '', required: true, control: { kind: 'text' },
    i18n: { labelKey: 'param.src.label', descKey: 'param.src.desc' } },
  { name: 'alt', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.alt.label', descKey: 'param.alt.desc' } },
  { name: 'txt', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.txt.label', descKey: 'param.txt.desc' } },
  { name: 'set', group: 'data', default: [], control: { kind: 'object', component: 'set' },
    i18n: { labelKey: 'param.set.label', descKey: 'param.set.desc' } },
  { name: 'defaultPage', group: 'data', default: 0, control: { kind: 'number' },
    i18n: { labelKey: 'param.defaultPage.label', descKey: 'param.defaultPage.desc' } },

  // Preset
  { name: 'preset', group: 'preset', default: '', control: {
      kind: 'segmented',
      options: [
        { value: 'desktop', labelKey: 'preset.desktop' },
        { value: 'mobile', labelKey: 'preset.mobile' },
        { value: '', labelKey: 'preset.none' },
      ],
    },
    i18n: { labelKey: 'param.preset.label', descKey: 'param.preset.desc' } },

  // Interface & interaction
  { name: 'backdrop', group: 'interface', default: defProp.backdrop, control: { kind: 'color' },
    i18n: { labelKey: 'param.backdrop.label', descKey: 'param.backdrop.desc' } },
  { name: 'zIndex', group: 'interface', default: defProp.zIndex, control: { kind: 'number' },
    i18n: { labelKey: 'param.zIndex.label', descKey: 'param.zIndex.desc' } },
  { name: 'radius', group: 'interface', default: defProp.radius, control: { kind: 'slider', min: 0, max: 32, step: 1 },
    i18n: { labelKey: 'param.radius.label', descKey: 'param.radius.desc' } },
  { name: 'edge', group: 'interface', default: defProp.edge, control: { kind: 'slider', min: 0, max: 64, step: 1 },
    i18n: { labelKey: 'param.edge.label', descKey: 'param.edge.desc' } },
  { name: 'loop', group: 'interface', default: defProp.loop, control: { kind: 'switch' },
    i18n: { labelKey: 'param.loop.label', descKey: 'param.loop.desc' } },
  { name: 'hideOnScroll', group: 'interface', default: defProp.hideOnScroll, desktopOnly: true, control: { kind: 'switch' },
    i18n: { labelKey: 'param.hideOnScroll.label', descKey: 'param.hideOnScroll.desc' } },
  { name: 'coverVisible', group: 'interface', default: defProp.coverVisible, desktopOnly: true, control: { kind: 'switch' },
    i18n: { labelKey: 'param.coverVisible.label', descKey: 'param.coverVisible.desc' } },

  // Controller
  { name: 'controller', group: 'controller', default: defPreset.desktop.controller, control: { kind: 'object', component: 'controller' },
    i18n: { labelKey: 'param.controller.label', descKey: 'param.controller.desc' } },

  // HotKey
  { name: 'hotKey', group: 'hotkey', default: defPreset.desktop.hotKey, control: { kind: 'object', component: 'hotkey' },
    i18n: { labelKey: 'param.hotKey.label', descKey: 'param.hotKey.desc' } },

  // Animate
  { name: 'animate', group: 'animate', default: defPreset.desktop.animate, control: { kind: 'object', component: 'animate' },
    i18n: { labelKey: 'param.animate.label', descKey: 'param.animate.desc' } },

  // Lifecycle
  { name: 'onBrowsing', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onBrowsing'] },
    i18n: { labelKey: 'param.onBrowsing.label', descKey: 'param.onBrowsing.desc' } },
  { name: 'onZooming', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onZooming'] },
    i18n: { labelKey: 'param.onZooming.label', descKey: 'param.onZooming.desc' } },
  { name: 'onSwitching', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onSwitching'] },
    i18n: { labelKey: 'param.onSwitching.label', descKey: 'param.onSwitching.desc' } },
  { name: 'onRotating', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onRotating'] },
    i18n: { labelKey: 'param.onRotating.label', descKey: 'param.onRotating.desc' } },

  // Controlled
  { name: 'browsing', group: 'controlled', default: undefined, control: { kind: 'switch' },
    i18n: { labelKey: 'param.browsing.label', descKey: 'param.browsing.desc' } },
]
