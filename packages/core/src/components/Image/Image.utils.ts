/**
 * 样式控制
 **/

// Libs
import { RefObject } from 'react'
// Utils
import { getClientHeight, getClientWidth, numberOfStyleUnits } from '../../utils'
import { animationCurve, animationDuration, animationFunctionOnZooming, animationTransition } from '../../config/anim'
import { ContextType } from '../context'
import { Animate, AnimateFlip } from '../../types/global'

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
export const getCurrentImageStyle = (context: ContextType, imageRef: RefObject<HTMLImageElement>, touchProfile: TouchProfile) => {
  const { show, zoom } = context
  if (show) {
    if (zoom) {
      return getZoomingStyle(context, imageRef)
    } else {
      return getBrowsingStyle(context, imageRef)
    }
  } else {
    return getCoverStyle(context, imageRef, touchProfile)
  }
}

/* 获取封面样式 */
export const getCoverStyle = (context: ContextType, _imageRef?: RefObject<HTMLImageElement>, touchProfile?: TouchProfile): ImageStyleType => {
  const { coverRef, coverPos, rotate, pageIsCover } = context
  const viewport = getViewportRect(context)
  if (touchProfile && touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
    const offset = touchProfile.getCurrentOffset()
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
// const TOUCH_UPDATE_PERIOD = 1
const TOUCH_BEHAVIOR_THRESHOLD = 5
const TOUCH_SPEED_THRESHOLD = 0.35
const TOUCH_DISTANCE_THRESHOLD = { x: 120, y: 80 }

export enum TOUCH_BEHAVIOR_PHASE {
  BEGIN = 'BEGIN',
  MOVING = 'MOVING',
  END = 'END',
}

export enum TOUCH_BEHAVIOR_TYPE {
  IDLE = 'IDLE',
  SWIPING = 'SWIPING',
  LIVING = 'LIVING',
}

export interface TouchProfileProps {
  origin?: Coordinate
}

export class TouchProfile {

  protected updateCounter: number
  protected begin: {
    time: number
    origin: Coordinate
    offset: Coordinate
  }
  protected current: {
    origin: Coordinate
    offset: Coordinate
  }

  public phase: TOUCH_BEHAVIOR_PHASE
  public behavior: TOUCH_BEHAVIOR_TYPE

  constructor (props?: TouchProfileProps) {
    this.updateCounter = 0
    this.phase = TOUCH_BEHAVIOR_PHASE.BEGIN
    this.behavior = TOUCH_BEHAVIOR_TYPE.IDLE
    this.begin = {
      time: new Date().getTime(),
      origin: props?.origin || { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
    }
    this.current = {
      origin: props?.origin || { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
    }
  }

  public getCurrentOffset = () => {
    return {
      x: this.current.origin.x - this.begin.origin.x,
      y: this.current.origin.y - this.begin.origin.y
    }
  }
  public getCurrentDistance = () => {
    const offset = this.getCurrentOffset()
    return {
      x: Math.abs(offset.x),
      y: Math.abs(offset.y),
    }
  }
  public getTouchConfig = ({ enableSwiping, enableLiving } = { enableSwiping: false, enableLiving: false }) => {
    let transition
    const touch = { x: 0, y: 0 }
    if (this.phase === TOUCH_BEHAVIOR_PHASE.MOVING) {
      const offset = this.getCurrentOffset()
      if (this.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && enableSwiping) {
        touch.x = offset.x
        transition = 'none'
      } else if (this.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && enableLiving) {
        touch.y = offset.y
        transition = 'none'
      }
    }
    if (this.phase === TOUCH_BEHAVIOR_PHASE.END) {
      transition = animationTransition(2)
    }
    return { touch, transition }
  }

  public update = (props: TouchProfileProps) => {
    // 会卡帧
    // // 更新计数
    // this.updateCounter++
    // // 根据周期决定是否更新
    // if (this.updateCounter%TOUCH_UPDATE_PERIOD===0) {
    // 更新阶段属性
    this.phase = TOUCH_BEHAVIOR_PHASE.MOVING
    // 更新坐标属性
    this.current.origin = props.origin || { x: 0, y: 0 }
    // 初次更新行为属性
    if (this.behavior !== TOUCH_BEHAVIOR_TYPE.IDLE) {
      const distance = this.getCurrentDistance()
      if (distance.x > distance.y) {
        if (distance.x > TOUCH_BEHAVIOR_THRESHOLD) {
          this.behavior = TOUCH_BEHAVIOR_TYPE.SWIPING
        }
      } else {
        if (distance.y > TOUCH_BEHAVIOR_THRESHOLD) {
          this.behavior = TOUCH_BEHAVIOR_TYPE.LIVING
        }
      }
    }
    return this
    // }
  }
  public end = () => {
    // 更新阶段属性
    this.phase = TOUCH_BEHAVIOR_PHASE.END
    // 时间间隔
    const interval = new Date().getTime() - this.begin.time
    // 更新行为属性, 如果对应速度小于阈值, 则视为无操作
    const distance = this.getCurrentDistance()
    if ((this.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING && (distance.x / interval < TOUCH_SPEED_THRESHOLD && distance.x < TOUCH_DISTANCE_THRESHOLD.x)) ||
      (this.behavior === TOUCH_BEHAVIOR_TYPE.LIVING && (distance.y / interval < TOUCH_SPEED_THRESHOLD && distance.y < TOUCH_DISTANCE_THRESHOLD.y))
    ) {
      this.behavior = TOUCH_BEHAVIOR_TYPE.IDLE
    }
    return this
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
