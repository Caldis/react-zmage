// Contexts

// Libs
import React, { createContext, RefObject } from 'react'
import {
    SetType,
    PresetType,
    FunctionalNormalizedParams,
    InterfaceAndInteractionParams,
} from "@/types/global";
import { StateType as BrowsingParams } from './Browser/Browser'

export { BrowsingParams }

export interface ContextType extends BrowsingParams, FunctionalNormalizedParams, InterfaceAndInteractionParams {
    // Internal
    coverRef: RefObject<HTMLImageElement>
    coverPos: CoordinateType
    outBrowsing: () => void
    // Data
    set: SetType[]
    // Preset
    preset: PresetType
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
