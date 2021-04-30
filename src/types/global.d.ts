import { HTMLAttributes, RefObject } from 'react'
import { GlobalClickMonitor } from '@/utils'

/**
 * 全局
 */
declare global {

    // 特殊全局属性
    interface Window {
        __ZMAGE_GLOBAL_CLICK_MONITOR__: GlobalClickMonitor
    }

    // 坐标
    interface CoordinateType {
        x: number
        y: number
    }
}

/**
 * 全局类型定义
 */

/**
 * @see https://github.com/Caldis/react-zmage#set
 */
export interface SetType {
    // 基础属性
    src: string,
    alt?: string,
    text?: string,
    // 类及样式
    className?: string
    style?: CSSStyleDeclaration
}

/**
 * @see https://github.com/Caldis/react-zmage#preset
 */
export type PresetType =
    | 'desktop' // 桌面模式
    | 'mobile'  // 移动端模式
    | 'auto'    // 自动识别 (废弃)

/**
 * @see https://github.com/Caldis/react-zmage#controller
 */
export interface ControllerType {
    // 分页
    pagination?: boolean
    // 旋转
    rotate?: boolean
    // 缩放
    zoom?: boolean
    // 下载
    download?: boolean
    // 关闭
    close?: boolean
    // 左右
    flip?: boolean
}

/**
 * @see https://github.com/Caldis/react-zmage#hotkey
 */
export interface HotKeyType {
    // 关闭（ESC）
    close?: boolean
    // 缩放（空格）
    zoom?: boolean
    // 翻页（左右键）
    flip?: boolean
}

/**
 * @see https://github.com/Caldis/react-zmage#animate
 */
export type AnimateFlipType =
    | 'fade'      // 渐变 (set小於3時强制使用)
    | 'crossFade' // 交叉渐变
    | 'swipe'     // 翻页
    | 'zoom'      // 缩放
export interface AnimateType {
    // 缩放动画 (未实现)
    browsing?: boolean
    // 翻页动画
    flip?: AnimateFlipType
}

/**
 * 基础
 */
export interface BaseParams {
    // 图片地址
    src: string
    // 图片标题
    alt?: string
    // 图片描述
    txt?: string
    // 图片集合
    set?: SetType[]
    // 图片默认页
    defaultPage?: number
}

/**
 * Internal
 */
export interface InternalParams {
    forwardedRef?: MutableRefObject<HTMLImageElement>
}

/**
 * Callee
 */
export interface CalleeParams {
    coverRef?: RefObject<HTMLImageElement>
    destructor?: () => unknown
}

/**
 * 預設
 */
export interface PresetParams {
    // 预设类型
    preset?: PresetType
}

/**
 * 功能
 */
export interface FunctionalParams {
    // 控制器
    controller?: boolean | ControllerType
    // 快捷键
    hotKey?: boolean | HotKeyType
    // 动画
    animate?: boolean | AnimateType
}
export interface FunctionalNormalizedParams {
    // 控制器
    controller?: ControllerType
    // 快捷键
    hotKey?: HotKeyType
    // 动画
    animate?: AnimateType
}

/**
 * 界面与交互
 */
export interface InterfaceAndInteractionParams {
    // 滚动时隐藏
    hideOnScroll?: boolean
    // 封面可见性
    coverVisible?: boolean
    // 背景色
    backdrop?: string
    // 高度
    zIndex?: number
    // 圆角
    radius?: number
    // 边距
    edge?: number
    // 循环
    loop?: boolean
}

/**
 * 生命周期
 */
export interface LifeCycleParams {
    onBrowsing?: (isBrowsing: boolean) => void
    onZooming?: (isZooming: boolean) => void
    onSwitching?: (paging: number) => void
    onRotating?: (deg: number) => void
}

/**
 * 受控屬性
 */
export interface ControlledParams {
    // 浏览状态
    browsing?: boolean
}

/**
 * 基础类型
 */
export type BaseType =
    & BaseParams
    & InternalParams
    & CalleeParams
    & PresetParams
    & FunctionalParams
    & InterfaceAndInteractionParams
    & LifeCycleParams
    & ControlledParams
    & HTMLAttributes<HTMLImageElement>
