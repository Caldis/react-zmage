// Type definitions for react-zmage
// Project: https://github.com/caldis/react-zmage

import * as React from 'react'

/**
 * @see https://github.com/Caldis/react-zmage#基础配置
 */
export interface IReactZmageProps {

  /**
   * 基础
   **/
  // 图片地址
  src?: string
  // 图片标题
  alt?: string
  // 图片集合
  set?: IStaticSetParams[]
  // 图片默认页
  defaultPage?: number

  /**
   * 預設
   **/
  preset?: TStaticPresetParams

  /**
   * 功能
   **/
  // 控制器
  controller?: IStaticControllerParams
  // 快捷键
  hotKey?: IStaticHotKeyParams
  // 动画
  animate?: IStaticAnimateParams

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
  onBrowsing?(browsing: boolean): void
  onZooming?(zooming: boolean): void
  onSwitching?(paging: number): void
  onRotating?(deg: number): void
}

/**
 * @see https://github.com/Caldis/react-zmage#set
 */
export interface IStaticSetParams {
  // 图片地址
  src: string
  // 图片标题
  alt: string
  // 类及样式
  className?: string
  style?: CSSStyleDeclaration
}

/**
 * @see https://github.com/Caldis/react-zmage#hotkey
 */
export interface IStaticHotKeyParams {
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
 * @see https://github.com/Caldis/react-zmage#animate
 */
export interface IStaticAnimateParams {
  flip:
    // 渐变
    "fade" |
    // 交叉渐变
    "crossFade" |
    // 翻动
    "swipe" |
    // 缩放
    "zoom"
}

/**
 * @see https://github.com/Caldis/react-zmage#controller
 */
export interface IStaticControllerParams {
  // 关闭
  close?: boolean
  // 缩放
  zoom?: boolean
  // 下载
  download?: boolean
  // 旋转
  rotate?: boolean
  // 翻页
  flip?: boolean
  // 分页
  pagination?: boolean
}

/**
 * @see https://github.com/Caldis/react-zmage#高级配置
 */
export type TStaticPresetParams =
  // 桌面端
  'desktop' |
  // 移动端
  'mobile'

/**
 * WRAPPER
 */
export class ReactZmageWrapper extends React.Component<IReactZmageProps> {}

/**
 * DEFAULT
 */
export default class ReactZmage extends React.Component<IReactZmageProps> {
  // 命令式调用组件
  static browsing(props: IReactZmageProps): void
  // HTML内容转换容器
  static wrapper: ReactZmageWrapper
}
