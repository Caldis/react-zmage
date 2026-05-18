import type { BaseType } from 'react-zmage'
import type { I18nKey } from '@/i18n/dict'
import type { PresetScope } from '@/components/PresetScopeBadge'

type PresetValue = NonNullable<BaseType['preset']>
type ResolvedPresetValue = Exclude<PresetValue, 'auto'>

const DEFAULT_PRESET: PresetValue = 'auto'

// ─────────────────────────────────────────────────────────────
// Default values mirrored from packages/core/src/types/default.ts
// (defProp / defPreset are NOT part of react-zmage's public exports
//  and tsup bundles dist/, so we cannot deep-import them. If you change
//  defaults in packages/core, update the values here.)
// ─────────────────────────────────────────────────────────────
export const defProp = {
  src: '',
  alt: '',
  caption: '',
  set: [] as { src: string; alt?: string; caption?: string | { text: string; style?: Record<string, unknown>; className?: string } }[],
  defaultPage: 0,
  preset: DEFAULT_PRESET,
  controller: {} as Record<string, unknown>,
  hotKey: {} as Record<string, boolean>,
  animate: {} as Record<string, unknown>,
  gesture: {} as Record<string, unknown>,
  hideOnScroll: true,
  coverVisible: false,
  backdrop: '#FFFFFF',
  zIndex: 1000,
  radius: 0,
  edge: 0,
  loop: true,
  hideOnDblClick: false,
  loadingDelay: 200,
}

export const defPreset = {
  desktop: {
    radius: 8,
    edge: 16,
    controller: {
      pagination: true,
      rotate: true,
      zoom: true,
      download: false,
      close: true,
      flip: true,
      placement: 'top-right' as const,
      layout: {
        pagination: { inset: 24 },
        caption: { inset: 60 },
      },
    },
    hotKey: { close: true, zoom: true, flip: true, rotate: true, download: false },
    animate: { browsing: true, flip: 'crossFade' as const, cover: { objectFit: true, clip: true, radius: true }, slowMotion: false },
    gesture: {
      swipe: false,
      dragExit: false,
      wheelZoom: { step: 0.12, smooth: true, minScale: 'fit' as const, maxScale: 4, center: 'pointer' as const, reverse: false, exitGuardDuration: 1000 },
      pinchZoom: false,
      doubleTapZoom: false,
      touchAction: 'managed' as const,
    },
  },
  mobile: {
    radius: 0,
    edge: 0,
    controller: { pagination: true, rotate: false, zoom: false, download: false, close: true, flip: false, placement: 'top-right' as const },
    hotKey: { close: false, zoom: false, flip: false, rotate: false, download: false },
    animate: { browsing: true, flip: 'swipe' as const, cover: { objectFit: true, clip: true, radius: true }, slowMotion: false },
    gesture: {
      swipe: { threshold: 120, velocity: 0.35, axisLock: 1.2, resistance: 0.35 },
      dragExit: { threshold: 80, velocity: 0.35, axisLock: 1.2, opacity: true },
      wheelZoom: false,
      pinchZoom: { minScale: 'fit' as const, maxScale: 4, resetBelowFit: true, center: 'gesture' as const },
      doubleTapZoom: { scale: 1, minScale: 'fit' as const, maxScale: 4, center: 'tap' as const, interval: 300, distance: 32 },
      touchAction: 'managed' as const,
    },
  },
}

export const resolvePreset = (preset?: PresetValue | ''): ResolvedPresetValue => {
  const targetPreset = preset || DEFAULT_PRESET
  if (targetPreset === 'mobile') return 'mobile'
  if (targetPreset === 'desktop') return 'desktop'
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'desktop'
  return window.matchMedia('(pointer: coarse) and (hover: none)').matches ? 'mobile' : 'desktop'
}

export const getPresetDefaults = (preset?: PresetValue | '') => defPreset[resolvePreset(preset)]

const defaultPresetValues = getPresetDefaults(defProp.preset)

export type ControlKind =
  | { kind: 'switch' }
  | { kind: 'slider'; min: number; max: number; step?: number }
  | { kind: 'number' }
  | { kind: 'text' }
  | { kind: 'color' }
  | { kind: 'select'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'segmented'; options: { value: string; labelKey: I18nKey }[] }
  | { kind: 'object'; component: 'controller' | 'hotkey' | 'animate' | 'gesture' | 'set' }
  | { kind: 'callback'; events: string[] }
  | { kind: 'readonly'; type: string }

export type ParamGroup =
  | 'data' | 'preset' | 'interface' | 'controller' | 'hotkey' | 'animate' | 'gesture' | 'lifecycle' | 'controlled'

export type ParamDef<K extends keyof BaseType = keyof BaseType> = {
  name: K
  group: ParamGroup
  default: unknown
  defaultDisplay?: string
  docsOnly?: boolean
  control: ControlKind
  i18n: { labelKey: I18nKey; descKey: I18nKey }
  presetScope?: PresetScope
  required?: boolean
  since?: string
}

export const PARAM_SCHEMA: ParamDef[] = [
  // Data
  { name: 'src', group: 'data', default: '', required: true, control: { kind: 'text' },
    i18n: { labelKey: 'param.src.label', descKey: 'param.src.desc' } },
  { name: 'alt', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.alt.label', descKey: 'param.alt.desc' } },
  { name: 'caption', group: 'data', default: '', control: { kind: 'text' },
    i18n: { labelKey: 'param.caption.label', descKey: 'param.caption.desc' } },
  { name: 'set', group: 'data', default: [], control: { kind: 'object', component: 'set' },
    i18n: { labelKey: 'param.set.label', descKey: 'param.set.desc' } },
  { name: 'defaultPage', group: 'data', default: 0, control: { kind: 'number' },
    i18n: { labelKey: 'param.defaultPage.label', descKey: 'param.defaultPage.desc' } },

  // Preset
  { name: 'preset', group: 'preset', default: defProp.preset, control: {
    kind: 'segmented',
    options: [
      { value: 'auto', labelKey: 'preset.auto' },
      { value: 'desktop', labelKey: 'preset.desktop' },
      { value: 'mobile', labelKey: 'preset.mobile' },
    ],
  },
  i18n: { labelKey: 'param.preset.label', descKey: 'param.preset.desc' } },

  // Interface & interaction
  { name: 'backdrop', group: 'interface', default: defProp.backdrop, control: { kind: 'color' },
    i18n: { labelKey: 'param.backdrop.label', descKey: 'param.backdrop.desc' } },
  { name: 'zIndex', group: 'interface', default: defProp.zIndex, control: { kind: 'number' },
    i18n: { labelKey: 'param.zIndex.label', descKey: 'param.zIndex.desc' } },
  { name: 'radius', group: 'interface', default: defaultPresetValues.radius, control: { kind: 'slider', min: 0, max: 32, step: 1 },
    i18n: { labelKey: 'param.radius.label', descKey: 'param.radius.desc' } },
  { name: 'edge', group: 'interface', default: defaultPresetValues.edge, control: { kind: 'slider', min: 0, max: 64, step: 1 },
    i18n: { labelKey: 'param.edge.label', descKey: 'param.edge.desc' } },
  { name: 'loop', group: 'interface', default: defProp.loop, control: { kind: 'switch' },
    i18n: { labelKey: 'param.loop.label', descKey: 'param.loop.desc' } },
  // hide-trigger 家族 (用户动作 → 自动关闭)
  { name: 'hideOnScroll', group: 'interface', default: defProp.hideOnScroll, presetScope: 'desktop', control: { kind: 'switch' },
    i18n: { labelKey: 'param.hideOnScroll.label', descKey: 'param.hideOnScroll.desc' } },
  { name: 'hideOnDblClick', group: 'interface', default: defProp.hideOnDblClick, control: { kind: 'switch' },
    i18n: { labelKey: 'param.hideOnDblClick.label', descKey: 'param.hideOnDblClick.desc' } },
  { name: 'coverVisible', group: 'interface', default: defProp.coverVisible, presetScope: 'desktop', control: { kind: 'switch' },
    i18n: { labelKey: 'param.coverVisible.label', descKey: 'param.coverVisible.desc' } },
  { name: 'loadingDelay', group: 'interface', default: defProp.loadingDelay, control: { kind: 'slider', min: 0, max: 1000, step: 50 },
    i18n: { labelKey: 'param.loadingDelay.label', descKey: 'param.loadingDelay.desc' } },

  // Controller
  { name: 'controller', group: 'controller', default: defaultPresetValues.controller, control: { kind: 'object', component: 'controller' },
    i18n: { labelKey: 'param.controller.label', descKey: 'param.controller.desc' } },

  // HotKey
  { name: 'hotKey', group: 'hotkey', default: defaultPresetValues.hotKey, control: { kind: 'object', component: 'hotkey' },
    i18n: { labelKey: 'param.hotKey.label', descKey: 'param.hotKey.desc' } },

  // Animate
  { name: 'animate', group: 'animate', default: defaultPresetValues.animate, control: { kind: 'object', component: 'animate' },
    i18n: { labelKey: 'param.animate.label', descKey: 'param.animate.desc' } },

  // Gesture
  { name: 'gesture', group: 'gesture', default: defaultPresetValues.gesture, control: { kind: 'object', component: 'gesture' },
    i18n: { labelKey: 'param.gesture.label', descKey: 'param.gesture.desc' } },

  // Lifecycle
  { name: 'onBrowsing', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onBrowsing'] },
    i18n: { labelKey: 'param.onBrowsing.label', descKey: 'param.onBrowsing.desc' } },
  { name: 'onZooming', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onZooming'] },
    i18n: { labelKey: 'param.onZooming.label', descKey: 'param.onZooming.desc' } },
  { name: 'onSwitching', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onSwitching'] },
    i18n: { labelKey: 'param.onSwitching.label', descKey: 'param.onSwitching.desc' } },
  { name: 'onRotating', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onRotating'] },
    i18n: { labelKey: 'param.onRotating.label', descKey: 'param.onRotating.desc' } },
  { name: 'onError', group: 'lifecycle', default: undefined, control: { kind: 'callback', events: ['onError'] },
    i18n: { labelKey: 'param.onError.label', descKey: 'param.onError.desc' } },

  // Controlled
  { name: 'browsing', group: 'controlled', default: undefined, control: { kind: 'switch' },
    i18n: { labelKey: 'param.browsing.label', descKey: 'param.browsing.desc' } },
]
