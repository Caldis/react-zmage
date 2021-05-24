// Contexts

// Libs
import { createContext, RefObject } from 'react'
import { FunctionalNormalizedParams, InterfaceAndInteractionParams, Preset, Set, } from '@/types/global'
import { State as BrowsingParams } from './Browser/Browser'

export { BrowsingParams }

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
