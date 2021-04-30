// Type definitions for react-zmage
// Project: https://github.com/caldis/react-zmage

import * as React from 'react'
import { ReactNode } from 'react'

/**
 * @see https://github.com/Caldis/react-zmage#基础配置
 */
export interface ReactZmageProps {

  /**
   * 基础
   **/
  // 图片地址
  src?: string
  // 图片标题
  alt?: string
  // 图片集合
  set?: Set[]
  // 图片默认页
  defaultPage?: number

  /**
   * 預設
   **/
  preset?: Preset

  /**
   * 功能
   **/
  // 控制器
  controller?: Controller
  // 快捷键
  hotKey?: HotKey
  // 动画
  animate?: Animate

  /**
   * 界面与交互
   **/
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

  /**
   * 生命周期
   **/
  onBrowsing? (browsing: boolean): void

  onZooming? (zooming: boolean): void

  onSwitching? (paging: number): void

  onRotating? (deg: number): void
}

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
export interface Animate {
  flip:
    | 'fade'      // 渐变 (set小於3時强制使用)
    | 'crossFade' // 交叉渐变
    | 'swipe'     // 翻页
    | 'zoom'      // 缩放
}

export type ControllerItem = boolean | string | ReactNode

/**
 * @see https://github.com/Caldis/react-zmage#controller
 */
export interface Controller {
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
 * @see https://github.com/Caldis/react-zmage#高级配置
 */
export type Preset =
  | 'desktop' // 桌面端
  | 'mobile' // 移动端

/**
 * WRAPPER
 */
export class ReactZmageWrapper extends React.Component<ReactZmageProps> {}

/**
 * DEFAULT
 */
export default class ReactZmage extends React.Component<ReactZmageProps> {
  // 命令式调用组件
  static browsing (props: ReactZmageProps): void

  // HTML内容转换容器
  static wrapper: ReactZmageWrapper
}
