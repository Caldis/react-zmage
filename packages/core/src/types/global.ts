import { ForwardedRef, HTMLAttributes, ReactNode, RefObject, SyntheticEvent } from 'react'
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
 * @see https://github.com/Caldis/react-zmage#caption
 */
export interface CaptionObject {
  // 文案
  text: string
  // 自定义样式 (覆盖默认胶囊样式; 浅合并)
  style?: import('react').CSSProperties
  // 自定义 className (与默认 class 合并; 用于主题化)
  className?: string
}
export type CaptionProp = string | CaptionObject

/**
 * @see https://github.com/Caldis/react-zmage#set
 */
export interface Set {
  // 基础属性
  src: string,
  alt?: string,
  // 图片下方辅助文案 (string 或 { text, style?, className? })
  caption?: CaptionProp,
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
  | 'auto'    // 按 CSS media query (pointer:coarse + hover:none) 自动判定

/**
 * @see https://github.com/Caldis/react-zmage#controllerItem
 */
export type ControllerItem = boolean | string | ReactNode

export type ControllerPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'
  | 'left-center'
  | 'right-center'

export interface ControllerRenderState {
  show: boolean
  zoom: boolean
  page: number
  total: number
  canZoom: boolean
  canPrev: boolean
  canNext: boolean
  canDownload: boolean
  preset: Exclude<Preset, 'auto'>
  placement: ControllerPlacement
  current?: Set
}

export interface ControllerRenderActions {
  close: () => void
  zoom: () => void
  rotateLeft: () => void
  rotateRight: () => void
  prev: () => void
  next: () => void
  toPage: (page: number) => void
  download: () => void
}

export interface ControllerRenderSlots {
  Toolbar: ReactNode
  Pagination: ReactNode
  FlipLeft: ReactNode
  FlipRight: ReactNode
}

export type ControllerRender = (args: {
  state: ControllerRenderState
  actions: ControllerRenderActions
  slots: ControllerRenderSlots
}) => ReactNode

/**
 * @see https://github.com/Caldis/react-zmage#controllerSet
 */
export interface ControllerSet {
  // 分页 — 不接受 string (运行时若传 string 会被 isValidElement 判否, 静默渲染默认指示器,
  // 用户的字符串被吞)。Exclude 让"想用字符串自定义页码"的写法在编译期就报错而不是运行期消失。
  pagination?: Exclude<ControllerItem, string>
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
  // 视觉 — 控件容器底色 / 图标默认色 (与顶层 backdrop 解耦, 让 backdrop 暗色场景下控件仍可辨)
  // 单按钮通过 ControllerItem 字符串值仍可独立覆盖颜色 (per-button override 优先)
  backdrop?: string
  color?: string
  // 工具栏位置
  placement?: ControllerPlacement
  // 完全自定义控制器渲染
  render?: ControllerRender
}

/**
 * 单个快捷键的取值
 *
 *  true       — 启用, 使用默认绑定 (见 default.ts 中各 action 的默认描述符)
 *  false      — 禁用, 事件不被消费, 透传给外层监听 (modal/dialog 等)
 *  string     — 自定义描述符, 形如 'Escape' / 'Space' / 'BracketLeft' / 'S' / 'Mod+S'
 *               采用 e.code 命名 (按键物理位置, 与键盘布局无关)
 *               单字母/数字短形式 'S' / '1' 内部归一化为 'KeyS' / 'Digit1'
 *               修饰键前缀: Mod (= ⌘ 或 Ctrl, 跨平台) / Cmd / Ctrl / Shift / Alt
 *               未声明的修饰键不可按下 ('Space' 不被 'Cmd+Space' 触发)
 *  string[]   — 多绑定, 任一描述符匹配都触发该动作
 */
export type HotKeyValue = boolean | string | string[]

/**
 * @see https://github.com/Caldis/react-zmage#hotkey
 */
export interface HotKey {
  // 关闭 (默认 'Escape')
  close?: HotKeyValue
  // 缩放 (默认 'Space')
  zoom?: HotKeyValue
  // 翻页 — umbrella 仅 boolean (语义为"同时启用左+右"), 单边可自定义按键
  flip?: boolean
  flipLeft?: HotKeyValue   // 默认 'ArrowLeft'
  flipRight?: HotKeyValue  // 默认 'ArrowRight'
  // 旋转 — umbrella 仅 boolean, 单边可自定义按键
  rotate?: boolean
  rotateLeft?: HotKeyValue   // 默认 'BracketLeft'  ([)
  rotateRight?: HotKeyValue  // 默认 'BracketRight' (])
  // 下载 (默认 'Mod+S' — 与浏览器"另存为"肌肉记忆一致, Mod 跨平台 ⌘/Ctrl)
  download?: HotKeyValue
}

export interface GestureSwipeOptions {
  threshold?: number
  velocity?: number
  axisLock?: number
  resistance?: number
}

export interface GestureDragExitOptions {
  threshold?: number
  velocity?: number
  axisLock?: number
  opacity?: boolean
}

export interface GestureWheelZoomOptions {
  step?: number
  smooth?: boolean
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'pointer' | 'viewport'
  reverse?: boolean
  exitGuardDuration?: number
}

export interface GesturePinchZoomOptions {
  minScale?: 'fit' | number
  maxScale?: number
  resetBelowFit?: boolean
  center?: 'gesture' | 'viewport'
}

export interface GestureDoubleTapZoomOptions {
  scale?: number
  minScale?: 'fit' | number
  maxScale?: number
  center?: 'tap' | 'viewport'
  interval?: number
  distance?: number
}

export type GestureTouchAction = 'managed' | 'auto' | 'manipulation' | 'none'

export interface GestureSet {
  swipe?: boolean | GestureSwipeOptions
  dragExit?: boolean | GestureDragExitOptions
  wheelZoom?: boolean | GestureWheelZoomOptions
  pinchZoom?: boolean | GesturePinchZoomOptions
  doubleTapZoom?: boolean | GestureDoubleTapZoomOptions
  touchAction?: GestureTouchAction
}

/**
 * @see https://github.com/Caldis/react-zmage#animate
 */
export type AnimateFlip =
  | 'fade'      // 渐变
  | 'crossFade' // 交叉渐变
  | 'swipe'     // 翻页
  | 'zoom'      // 缩放
  | 'none'      // 无动画 (瞬间切换, 不渲染相邻页, caption 也无过渡)
export interface AnimateCoverOptions {
  // 读取 cover 的 object-fit / object-position, 修正 cover 裁切场景的初始几何
  objectFit?: boolean
  // 用 clip-path 表达 cover 可见裁切区域
  clip?: boolean
  // 从 cover 圆角过渡到 viewer radius
  radius?: boolean
}
export interface Animate {
  // 缩放动画 (未实现)
  browsing?: boolean
  // 翻页动画
  flip?: AnimateFlip
  // 封面进入/退出几何修正
  cover?: boolean | AnimateCoverOptions
}

/**
 * 基础
 */
export interface BaseParams {
  // 图片地址
  src: string
  // 图片标题
  alt?: string
  // 图片下方辅助文案 (string 或 { text, style?, className? })
  caption?: CaptionProp
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
  destructor?: () => void
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
  // 手势
  gesture?: boolean | GestureSet
}

export interface FunctionalNormalizedParams {
  // 控制器
  controller?: ControllerSet
  // 快捷键
  hotKey?: HotKey
  // 动画
  animate?: Animate
  // 手势
  gesture?: GestureSet
}

/**
 * 界面与交互
 */
export interface InterfaceAndInteractionParams {
  // 滚动时隐藏 (浏览态; 桌面端默认开)
  hideOnScroll?: boolean
  // 双击图片隐藏 (浏览态; 默认 false 不破坏现有点击语义)
  hideOnDblClick?: boolean
  // 封面可见性
  coverVisible?: boolean
  // 背景色 (蒙版层)
  backdrop?: string
  // 高度
  zIndex?: number
  // 圆角
  radius?: number
  // 边距
  edge?: number
  // 循环
  loop?: boolean
  // Loading 显示前的延迟 (ms). 在此时间内图片加载完成则永不显示 loading 指示器, 避免快速切换
  // 缓存图时的视觉闪烁. 默认 200 (业界 react-loadable 的经典值; UX 研究"顺滑"上限).
  // 设为 0 = 立即显示 (旧行为). 内部命中 fast-path (img.complete 已就绪) 时直接绕过此延迟.
  loadingDelay?: number
}

/**
 * 生命周期
 */
export interface LifeCycleParams {
  onBrowsing?: (isBrowsing: boolean) => void
  onZooming?: (isZooming: boolean) => void
  onSwitching?: (paging: number) => void
  onRotating?: (deg: number) => void
  // 浏览层图片加载失败时触发 (cover 失败仍走原生 HTMLImageElement.onError 透传)
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void
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
