// Contexts

// Libs
import { createContext, RefObject } from 'react'
import { FunctionalNormalizedParams, InterfaceAndInteractionParams, Preset, Set, } from '../types/global'
// 必须用 type-only import/export: State 是个 interface, 在 esbuild dev 模式下没有 JS 导出.
// 旧的值导入语法在 tsup build 阶段无害 (TS 编译会保留 .d.ts), 但 Vite 直接服务 source 时
// 浏览器抓不到 'State' export → SyntaxError. 走 import type + export type 让 esbuild 完全擦除.
import type { State as BrowsingParams } from './Browser/Browser'

export type { BrowsingParams }

export interface ContextType extends BrowsingParams, FunctionalNormalizedParams, InterfaceAndInteractionParams {
  // Internal
  coverRef: RefObject<HTMLImageElement>
  coverPos?: Coordinate
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
  toggleZoom: () => void
  toggleRotate: (direction: '' | 'left' | 'right') => () => void
}

export const Context = createContext({} as ContextType)
