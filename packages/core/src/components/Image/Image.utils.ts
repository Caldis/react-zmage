/**
 * 样式控制
 **/

// Libs
import { RefObject } from 'react'
// Utils
import { getClientHeight, getClientWidth, numberOfStyleUnits } from '../../utils'
import { animationCurve, animationDuration, animationFunctionOnZooming, animationTransition } from '../../config/anim'
import type { ContextType } from '../context'
import { defaultGestureDragExitOptions, defaultGestureSwipeOptions } from '../../types/default'
import { Animate, AnimateFlip, GestureDragExitOptions, GestureSet, GestureSwipeOptions } from '../../types/global'

export interface ImageStyleType {
  _type: 'cover' | 'browsing' | 'zooming'
  _behavior?: 'merge'
  x?: number
  y: number
  opacity?: number
  scale?: number
  rotate?: number
  radius?: number
}

export type ImageRole = 'center' | 'side'

export type MotionPhase =
  | 'idle'
  | 'browsing-instant'
  | 'zoom-enter'
  | 'zoom-follow'
  | 'closing-follow'

const zoomTransition = `transform ${animationDuration}ms ${animationFunctionOnZooming}, opacity ${animationDuration}ms ${animationFunctionOnZooming}, clip-path ${animationDuration}ms ${animationFunctionOnZooming}`

export interface ViewportRect {
  left: number
  top: number
  width: number
  height: number
}

export const getViewportRect = (context?: Pick<ContextType, 'viewportRef'>): ViewportRect => {
  const rect = context?.viewportRef?.current?.getBoundingClientRect()
  if (rect && rect.width > 0 && rect.height > 0) {
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    }
  }

  return {
    left: 0,
    top: 0,
    width: getClientWidth(),
    height: getClientHeight(),
  }
}

export const calcFitScale = (naturalWidth: number, naturalHeight: number, edge = 0, viewport = getViewportRect()) => {
  const figureWidth = naturalWidth + 2 * edge
  const figureHeight = naturalHeight + 2 * edge
  const scaleX = figureWidth > viewport.width ? viewport.width / figureWidth : 1
  const scaleY = figureHeight > viewport.height ? viewport.height / figureHeight : 1
  return Math.min(scaleX, scaleY) + 0.002
}

export const isZoomMotionPhase = (phase: MotionPhase) => (
  phase === 'zoom-enter' ||
  phase === 'zoom-follow'
)

export const getImageTransition = ({
  role,
  motionPhase,
  touchTransition,
  flip,
  imageType,
}: {
  role: ImageRole
  motionPhase: MotionPhase
  touchTransition?: string
  flip?: AnimateFlip | false
  imageType: ImageStyleType['_type']
}) => {
  if (touchTransition === 'none') {
    return 'none'
  }
  if (motionPhase === 'browsing-instant') {
    return 'none'
  }
  if (role === 'center') {
    if (motionPhase === 'zoom-enter') {
      return zoomTransition
    }
    if (motionPhase === 'zoom-follow') {
      return 'none'
    }
    if (motionPhase === 'closing-follow') {
      return 'none'
    }
  }
  if (flip === false && imageType !== 'zooming') {
    return 'none'
  }
  return touchTransition
}

/* 获取当前图片样式 */
export const getCurrentImageStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>, touchGesture: TouchGesture) => {
  const { show, zoom } = context
  if (show) {
    if (zoom) {
      return getZoomingStyle(context, imageRef)
    } else {
      return getBrowsingStyle(context, imageRef)
    }
  } else {
    return getCoverStyle(context, imageRef, touchGesture)
  }
}

/* 获取封面样式 */
export const getCoverStyle = (context: ContextType, _imageRef?: RefObject<HTMLImageElement>, touchGesture?: TouchGesture): ImageStyleType => {
  const { coverRef, coverPos, rotate, pageIsCover } = context
  const viewport = getViewportRect(context)
  if (touchGesture && touchGesture.state === 'ended' && touchGesture.lastResult.kind === 'dragExit' && touchGesture.lastResult.accepted) {
    const offset = touchGesture.getOffset()
    return {
      _type: 'cover',
      _behavior: 'merge',
      y: offset.y > 0 ? viewport.height : -viewport.height
    }
  }
  if (coverRef.current) {
    // 从封面唤出
    const { naturalWidth } = coverRef.current
    const { top, left, width, height } = coverRef.current.getBoundingClientRect()
    const { opacity, borderRadius } = window.getComputedStyle(coverRef.current)
    return pageIsCover ? {
      _type: 'cover',
      // 所有 modal 几何都以实际 overlay 盒子为参考系, 避免宿主横向溢出时
      // documentElement.clientWidth / window.innerWidth 与 fixed 层尺寸分裂.
      x: left + width / 2 - (viewport.left + viewport.width / 2),
      y: top + height / 2 - (viewport.top + viewport.height / 2),
      opacity: Number(opacity) || 1,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, { ref: width }),
    } : {
      _type: 'cover',
      x: 0,
      y: -viewport.height,
      opacity: 0,
      scale: naturalWidth ? width / naturalWidth : 1,
      rotate: rotate - rotate % 360,
      radius: numberOfStyleUnits(borderRadius, { ref: width }),
    }
  } else if (coverPos) {
    // 从 Callee 唤出
    // 获取以鼠标指针为起始点的封面样式
    return {
      _type: 'cover',
      x: coverPos.x ? coverPos.x - (viewport.left + viewport.width / 2) : 0,
      y: coverPos.y ? coverPos.y - (viewport.top + viewport.height / 2) : 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0,
    }
  } else {
    // Fallback
    // 获取以屏幕中心为起始点的封面样式
    return {
      _type: 'cover',
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      radius: 0,
    }
  }
}

/* 关闭路径用: 在动画期间逐帧把 from(浏览态)向 to(实时 cover)插值
 * 关键点是 to 由调用方每帧用 getCoverStyle 重算, 保证滚动期间 target 跟得上 cover 视口位置 */
export const lerpCoverStyle = (from: ImageStyleType, to: ImageStyleType, t: number): ImageStyleType => {
  const lerp = (a: number, b: number) => a + (b - a) * t
  return {
    _type: 'cover',
    x: lerp(from.x ?? 0, to.x ?? 0),
    y: lerp(from.y ?? 0, to.y ?? 0),
    scale: lerp(from.scale ?? 0, to.scale ?? 0),
    rotate: lerp(from.rotate ?? 0, to.rotate ?? 0),
    opacity: lerp(from.opacity ?? 1, to.opacity ?? 1),
    radius: lerp(from.radius ?? 0, to.radius ?? 0),
  }
}

/* cubic-bezier 求解 (Newton-Raphson 迭代). 把 CSS transition-timing-function 还原成 t→y 函数,
 * 让关闭路径的 RAF 用同一根曲线插值 — visual 上和 CSS transition 完全一致. */
export const makeCubicBezierEase = (p1x: number, p1y: number, p2x: number, p2y: number) => {
  const bezier = (t: number, c1: number, c2: number) =>
    3 * (1 - t) ** 2 * t * c1 + 3 * (1 - t) * t ** 2 * c2 + t ** 3
  const bezierDeriv = (t: number, c1: number, c2: number) =>
    3 * (1 - t) ** 2 * c1 + 6 * (1 - t) * t * (c2 - c1) + 3 * t ** 2 * (1 - c2)
  return (x: number): number => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 8; i++) {
      const fx = bezier(t, p1x, p2x) - x
      const dx = bezierDeriv(t, p1x, p2x)
      if (Math.abs(dx) < 1e-6) break
      t = Math.max(0, Math.min(1, t - fx / dx))
    }
    return bezier(t, p1y, p2y)
  }
}
// 用 anim.ts 的 animationCurve 实例化, 跟 CSS animationFunction 共享单一来源.
export const closingEase = makeCubicBezierEase(...animationCurve)

/* 获取浏览样式 */
export const getBrowsingStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>): ImageStyleType => {
  const { coverRef, edge, page, radius, rotate, set } = context
  const imageNaturalWidth = imageRef.current?.naturalWidth || 0
  const imageNaturalHeight = imageRef.current?.naturalHeight || 0
  const coverIsCurrentImage = !!coverRef.current && coverRef.current.getAttribute('src') === set?.[page]?.src
  const naturalWidth = imageNaturalWidth || (coverIsCurrentImage ? coverRef.current?.naturalWidth : 0) || 0
  const naturalHeight = imageNaturalHeight || (coverIsCurrentImage ? coverRef.current?.naturalHeight : 0) || 0
  const scale = calcFitScale(naturalWidth, naturalHeight, edge, getViewportRect(context))
  return {
    _type: 'browsing',
    x: 0,
    y: 0,
    opacity: 1,
    scale,
    rotate,
    radius,
  }
}

/* 获取缩放样式 */
export const getZoomingStyle = (
  context: ContextType,
  imageRef: RefObject<HTMLImageElement>,
  pointer: { clientX?: number, clientY?: number } = {}
): ImageStyleType => {
  const { radius, edge, rotate } = context
  const { naturalWidth = 0, naturalHeight = 0 } = imageRef.current || {}
  // 随鼠标位移偏移量
  const saveEdge = edge || 50
  const viewport = getViewportRect(context)
  const viewWidth = viewport.width
  const viewHeight = viewport.height
  const mouseX = pointer.clientX ?? viewport.left + viewWidth / 2
  const mouseY = pointer.clientY ?? viewport.top + viewHeight / 2
  const localMouseX = mouseX - viewport.left
  const localMouseY = mouseY - viewport.top
  const rangeX = naturalWidth - viewWidth + (2 * saveEdge)
  const rangeY = naturalHeight - viewHeight + (2 * saveEdge)
  const imgPosX = naturalWidth > viewWidth ? ((naturalWidth - viewWidth) / 2 + saveEdge) - (rangeX * (localMouseX / viewWidth)) : 0
  const imgPosY = naturalHeight > viewHeight ? ((naturalHeight - viewHeight) / 2 + saveEdge) - (rangeY * (localMouseY / viewHeight)) : 0
  // 返回位置
  return {
    _type: 'zooming',
    x: imgPosX,
    y: imgPosY,
    opacity: 1,
    scale: 1,
    rotate,
    radius,
  }
}

/* 动画属性 */
const CROSS_FADE_OFFSET = 30
export const SWIPE_GAP = 10
const ZOOM_OVERFLOW = 0.08

export interface ImageAnimateType {
  offset: number
  overflow: number
  opacity: number
}

/**
 * 静态 flip 视觉参数表 — 单一来源.
 *
 * swipe 的 offset 在这里给 0, 真实 offset 由 getSwipeOffset(context) 在调用点叠加,
 * 避免 getAnimateConfig 因 viewport 依赖而需要 context 重载.
 */
const FLIP_VISUAL: Record<AnimateFlip, ImageAnimateType> = {
  fade:      { offset: 0,                 overflow: 0,             opacity: 0 },
  crossFade: { offset: CROSS_FADE_OFFSET, overflow: 0,             opacity: 0 },
  swipe:     { offset: 0,                 overflow: 0,             opacity: 1 },
  zoom:      { offset: 0,                 overflow: ZOOM_OVERFLOW, opacity: 0 },
  // 'none' 仅作类型完备的 fallback: Image.tsx 的 buildImageSeries 在 flip==='none' 时直接 short-circuit, 不会消费此值
  none:      { offset: 0,                 overflow: 0,             opacity: 0 },
}

const FLIP_VISUAL_FALLBACK: ImageAnimateType = { offset: 0, overflow: 0, opacity: 0 }

/**
 * swipe 模式 side image 的视口宽度依赖 offset.
 * 与 FLIP_VISUAL.swipe.offset (=0) 在调用点求和: 让 swipe 配置在 Record 内静态可视,
 * viewport 依赖单独一条纯函数, 互不污染.
 */
export const getSwipeOffset = (context?: Pick<ContextType, 'viewportRef'>): number =>
  getViewportRect(context).width + SWIPE_GAP

/**
 * side image 的实际横向 offset (考虑 swipe 模式宽边图修正).
 *
 * swipe 模式默认 baseOffset 用 center viewport.width 估算, 但 side image 自己
 * 物理宽度可能更宽 (如 1000x500 wide 在窄 center 旁), 用动态 max 把 side 完全推到
 * 视口外, 避免 "探头进镜头" (Issue #167 配套修复).
 *
 * 其他模式 (fade/crossFade/zoom/none) baseOffset 是 Record 内静态值, 直接返回.
 */
export const getSideImageOffset = ({
  flipKind,
  baseOffset,
  ownScale,
  dims,
  viewport,
}: {
  flipKind: AnimateFlip | false | undefined
  baseOffset: number
  ownScale: number | null
  dims: { w: number, h: number } | null | undefined
  viewport: ViewportRect
}): number => {
  if (flipKind !== 'swipe' || ownScale == null || !dims) return baseOffset
  const sideScale = ownScale + FLIP_VISUAL.swipe.overflow
  const ownPhysicalHalfWidth = (dims.w * sideScale) / 2
  return Math.max(baseOffset, viewport.width / 2 + ownPhysicalHalfWidth + SWIPE_GAP)
}

export function getAnimateConfig(type?: AnimateFlip | false): ImageAnimateType
export function getAnimateConfig(context: ContextType, type?: AnimateFlip | false): ImageAnimateType
export function getAnimateConfig(
  contextOrType?: ContextType | AnimateFlip | false,
  maybeType?: AnimateFlip | false
): ImageAnimateType {
  const context = typeof contextOrType === 'object' && contextOrType !== null ? contextOrType : undefined
  const type = context ? maybeType : (contextOrType as AnimateFlip | false | undefined)
  if (!type) return FLIP_VISUAL_FALLBACK
  const base = FLIP_VISUAL[type]
  if (type === 'swipe') {
    return { ...base, offset: getSwipeOffset(context) }
  }
  return base
}

/**
 * 触控行为管理
 */
export const GESTURE_DETECT_FLOOR_PX = 5

type GestureChildOptions = GestureSwipeOptions | GestureDragExitOptions
type NormalizedGestureChild<T extends GestureChildOptions> = false | Required<T>

const mergeGestureChild = <T extends GestureChildOptions>(
  fallback: boolean | T | undefined,
  user: boolean | Partial<T> | undefined,
  defaultOptions: Required<T>
): NormalizedGestureChild<T> => {
  if (user === false) return false
  if (user === true) return { ...defaultOptions }
  if (user && typeof user === 'object') {
    const base = fallback && typeof fallback === 'object' ? fallback : defaultOptions
    return { ...defaultOptions, ...base, ...user } as Required<T>
  }
  if (fallback === false) return false
  if (fallback === true) return { ...defaultOptions }
  if (fallback && typeof fallback === 'object') return { ...defaultOptions, ...fallback } as Required<T>
  return false
}

export const normalizeGestureSet = (
  gesture: boolean | GestureSet | undefined,
  fallback: GestureSet = {},
): GestureSet => {
  if (gesture === false) {
    return { swipe: false, dragExit: false }
  }
  const input = gesture && typeof gesture === 'object' ? gesture : {}
  return {
    swipe: mergeGestureChild(fallback.swipe, input.swipe, defaultGestureSwipeOptions),
    dragExit: mergeGestureChild(fallback.dragExit, input.dragExit, defaultGestureDragExitOptions),
  }
}

export type TouchGestureState = 'idle' | 'detecting' | 'swiping' | 'dragExiting' | 'ended'
export type TouchGestureKind = 'none' | 'swipe' | 'dragExit'

export interface TouchGestureResult {
  kind: TouchGestureKind
  accepted: boolean
  offset: Coordinate
  distance: Coordinate
  velocity: Coordinate
}

const emptyTouchResult = (): TouchGestureResult => ({
  kind: 'none',
  accepted: false,
  offset: { x: 0, y: 0 },
  distance: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
})

export class TouchGesture {
  public state: TouchGestureState = 'idle'
  public lastResult: TouchGestureResult = emptyTouchResult()
  private startPoint: Coordinate = { x: 0, y: 0 }
  private currentPoint: Coordinate = { x: 0, y: 0 }
  private startTime = 0
  private now: () => number

  constructor (
    private gesture: GestureSet = {},
    options: { now?: () => number } = {},
  ) {
    this.now = options.now || (() => Date.now())
  }

  public start = (point: Coordinate) => {
    this.startPoint = point
    this.currentPoint = point
    this.startTime = this.now()
    this.state = 'detecting'
    this.lastResult = emptyTouchResult()
    return this
  }

  public move = (point: Coordinate) => {
    if (this.state === 'idle' || this.state === 'ended') return this
    this.currentPoint = point
    if (this.state === 'detecting') {
      this.lockGesture()
    }
    return this
  }

  public end = (): TouchGestureResult => {
    const offset = this.getOffset()
    const distance = this.getDistance()
    const interval = Math.max(this.now() - this.startTime, 1)
    const velocity = {
      x: distance.x / interval,
      y: distance.y / interval,
    }
    const result: TouchGestureResult = {
      kind: 'none',
      accepted: false,
      offset,
      distance,
      velocity,
    }

    if (this.state === 'swiping' && this.swipeOptions) {
      result.kind = 'swipe'
      result.accepted = distance.x >= this.swipeOptions.threshold || velocity.x >= this.swipeOptions.velocity
    } else if (this.state === 'dragExiting' && this.dragExitOptions) {
      result.kind = 'dragExit'
      result.accepted = distance.y >= this.dragExitOptions.threshold || velocity.y >= this.dragExitOptions.velocity
    }

    this.state = 'ended'
    this.lastResult = result
    return result
  }

  public getOffset = (): Coordinate => ({
    x: this.currentPoint.x - this.startPoint.x,
    y: this.currentPoint.y - this.startPoint.y,
  })

  public getDistance = (): Coordinate => {
    const offset = this.getOffset()
    return {
      x: Math.abs(offset.x),
      y: Math.abs(offset.y),
    }
  }

  public getVisualOffset = (): Coordinate => {
    const offset = this.getOffset()
    if (this.state === 'swiping') return { x: offset.x, y: 0 }
    if (this.state === 'dragExiting') return { x: 0, y: offset.y }
    if (this.isAcceptedDragExitEnd()) return { x: 0, y: this.lastResult.offset.y }
    return { x: 0, y: 0 }
  }

  public getTouchConfig = (options: { resistance?: number } = {}) => {
    const touch = this.getVisualOffset()
    const opacity = this.getVisualOpacity()
    if (this.state === 'swiping' && typeof options.resistance === 'number') {
      touch.x *= options.resistance
    }
    const ownsCurrentGesture = this.state === 'swiping' || this.state === 'dragExiting'
    return {
      touch,
      opacity,
      transition: ownsCurrentGesture || this.isAcceptedDragExitEnd() ? 'none' : this.state === 'ended' ? animationTransition() : undefined,
    }
  }

  public ownsGesture = () => this.state === 'swiping' || this.state === 'dragExiting'

  private getVisualOpacity = () => {
    const dragExit = this.dragExitOptions
    const canUseDragExitOpacity = this.state === 'dragExiting' || this.isAcceptedDragExitEnd()
    if (!canUseDragExitOpacity || !dragExit || dragExit.opacity === false) return undefined
    const distanceY = this.isAcceptedDragExitEnd() ? this.lastResult.distance.y : this.getDistance().y
    const progress = Math.min(distanceY / (dragExit.threshold * 2), 1)
    return Math.max(0.35, 1 - progress)
  }

  private isAcceptedDragExitEnd = () => (
    this.state === 'ended' &&
    this.lastResult.kind === 'dragExit' &&
    this.lastResult.accepted
  )

  private get swipeOptions () {
    return this.gesture.swipe && typeof this.gesture.swipe === 'object' ? this.gesture.swipe as Required<GestureSwipeOptions> : null
  }

  private get dragExitOptions () {
    return this.gesture.dragExit && typeof this.gesture.dragExit === 'object' ? this.gesture.dragExit as Required<GestureDragExitOptions> : null
  }

  private lockGesture = () => {
    const distance = this.getDistance()
    if (distance.x < GESTURE_DETECT_FLOOR_PX && distance.y < GESTURE_DETECT_FLOOR_PX) return
    const swipe = this.swipeOptions
    const dragExit = this.dragExitOptions
    if (swipe && distance.x >= GESTURE_DETECT_FLOOR_PX && distance.x >= distance.y * swipe.axisLock) {
      this.state = 'swiping'
      return
    }
    if (dragExit && distance.y >= GESTURE_DETECT_FLOOR_PX && distance.y >= distance.x * dragExit.axisLock) {
      this.state = 'dragExiting'
    }
  }
}

/**
 * 把 props.animate 上的 flip 派生收敛成单一来源, 取出 flip 类型的 raw 值 (含 'none' 与 false).
 *
 * 历史: animate=false 在 Browser 标准化时塞入 { flip: false },
 * 但 Animate.flip 类型不允许 false; 这里用一个 cast 收敛, 不在调用点重复.
 */
export const selectFlipKind = (
  animate: Animate | boolean | undefined
): AnimateFlip | false | undefined => {
  if (animate === false) return false
  if (animate && typeof animate === 'object') {
    return (animate as Animate & { flip?: AnimateFlip | false }).flip
  }
  return undefined
}
