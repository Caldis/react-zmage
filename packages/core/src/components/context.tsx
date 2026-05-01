// Contexts

// Libs
import { createContext, RefObject } from 'react'
import { FunctionalNormalizedParams, InterfaceAndInteractionParams, LifeCycleParams, Preset, Set, } from '../types/global'
// 必须用 type-only import/export: State 是个 interface, 在 esbuild dev 模式下没有 JS 导出.
// 旧的值导入语法在 tsup build 阶段无害 (TS 编译会保留 .d.ts), 但 Vite 直接服务 source 时
// 浏览器抓不到 'State' export → SyntaxError. 走 import type + export type 让 esbuild 完全擦除.
import type { State as BrowsingParams } from './Browser/Browser'

export type { BrowsingParams }
export type ZoomTrigger = 'control' | 'keyboard' | 'wheel'

export interface ContextType extends BrowsingParams, FunctionalNormalizedParams, InterfaceAndInteractionParams, Pick<LifeCycleParams, 'onError'> {
  // Internal
  coverRef: RefObject<HTMLImageElement>
  coverPos?: Coordinate
  viewportRef: RefObject<HTMLElement>
  outBrowsing: () => void
  // Data
  set: Set[]
  // Preset
  preset?: Preset
  presetIsMobile: boolean
  presetIsDesktop: boolean
  // Action
  toPage: (targetPage: number) => void
  toPrevPage: () => void
  toNextPage: () => void
  toggleZoom: (trigger?: ZoomTrigger) => void
  toggleRotate: (direction: '' | 'left' | 'right') => () => void
  setCanZoom: (canZoom: boolean) => void
}

export const Context = createContext({} as ContextType)
