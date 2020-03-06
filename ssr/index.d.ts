import * as React from 'react';

declare module 'react-zmage' {

  interface ReactZmage extends React.Component<IReactZmageProps> {
    new(props: IReactZmageProps): ReactZmage;
  }

  let ReactZmage: ReactZmage;
  export default ReactZmage;

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
    src: string;
    // 图片标题
    alt: string;
    // 类及样式
    className?: string;
    style?: CSSStyleDeclaration;
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
    flip: "fade" | "crossFade" | "swipe" | "zoom"
  }

  /**
   * @see https://github.com/Caldis/react-zmage#controller
   */
  export interface IStaticControllerParams {
    close?: boolean;
    zoom?: boolean;
    download?: boolean;
    rotate?: boolean;
    flip?: boolean;
    pagination?: boolean;
  }

  /**
   * @see https://github.com/Caldis/react-zmage#高级配置
   */
  export type TStaticPresetParams = 'desktop' | 'mobile';
}
