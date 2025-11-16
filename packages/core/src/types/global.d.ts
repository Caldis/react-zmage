import { ForwardedRef, HTMLAttributes, ReactNode, RefObject } from 'react'
import { GlobalClickMonitor } from '../utils'

/**
 * 全局
 */
declare global {

  // 特殊全局属性
  interface Window {
    __ZMAGE_GLOBAL_CLICK_MONITOR__?: GlobalClickMonitor
  }

  // 坐标
  interface Coordinate {
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
export interface Set {
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
export type Preset =
  | 'desktop' // 桌面模式
  | 'mobile'  // 移动端模式
  | 'auto'    // 自动识别 (废弃)

/**
 * @see https://github.com/Caldis/react-zmage#controllerItem
 */
export type ControllerItem = boolean | string | ReactNode

/**
 * @see https://github.com/Caldis/react-zmage#controllerSet
 */
export interface ControllerSet {
  // 分页
  pagination?: Omit<ControllerItem, string>
  // 旋转
  rotate?: ControllerItem
  rotateLeft?: ControllerItem
  rotateRight?: ControllerItem
  // 缩放
  zoom?: ControllerItem
  // 下载
  download?: ControllerItem
  // 关闭
  close?: ControllerItem
  // 左右
  flip?: ControllerItem
  flipLeft?: ControllerItem
  flipRight?: ControllerItem
}

/**
 * @see https://github.com/Caldis/react-zmage#hotkey
 */
export interface HotKey {
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
export type AnimateFlip =
  | 'fade'      // 渐变 (set小於3時强制使用)
  | 'crossFade' // 交叉渐变
  | 'swipe'     // 翻页
  | 'zoom'      // 缩放
export interface Animate {
  // 缩放动画 (未实现)
  browsing?: boolean
  // 翻页动画
  flip?: AnimateFlip
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
  set?: Set[]
  // 图片默认页
  defaultPage?: number
}

/**
 * Internal
 */
export interface InternalParams {
  forwardedRef?: ForwardedRef<HTMLImageElement | null>
}

/**
 * Callee
 */
export interface CalleeParams {
  coverRef?: RefObject<HTMLImageElement>
  destructor?: TimerHandler
}

/**
 * 預設
 */
export interface PresetParams {
  // 预设类型
  preset?: Preset
}

/**
 * 功能
 */
export interface FunctionalParams {
  // 控制器
  controller?: boolean | ControllerSet
  // 快捷键
  hotKey?: boolean | HotKey
  // 动画
  animate?: boolean | Animate
}

export interface FunctionalNormalizedParams {
  // 控制器
  controller?: ControllerSet
  // 快捷键
  hotKey?: HotKey
  // 动画
  animate?: Animate
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
