/**
 * 图片层
 * 控制图片尺寸
 **/

// Libs
import React, { CSSProperties, Fragment } from 'react'
// Styles
import style from './Image.module.less'
// Components
import Loading from './loading'
// Utils
import { BrowsingParams, Context, ContextType } from '../context'
import type { FlipDirection } from '../context'
import { animationDuration } from '../../config/anim'
import { applyMotionTransition } from '../../config/motion'
import { defaultGestureWheelZoomOptions } from '../../types/default'
import {
  appendParams,
  calcFitGeometry,
  checkImageLoadedComplete,
  computeMinPageDistance,
  cx,
  debounce,
  getTargetPage,
  isInteger,
  lockTouchInteraction,
  mirrorRange,
  withVendorPrefix,
} from '../../utils'
import {
  calcFitScale,
  closingEase,
  DoubleTapGesture,
  getAnimateConfig,
  getBrowsingStyle,
  getClipPath,
  getCoverStyle,
  getCurrentImageStyle,
  getImageTransition,
  getLocalRadius,
  getNextPinchZoomScale,
  getNextWheelZoomScale,
  getSideImageOffset,
  getTouchDistance,
  getTouchMidpoint,
  getViewportRect,
  getWheelZoomScaleRange,
  getZoomScaleRange,
  getZoomingStyle,
  ImageAnimateType,
  ImageStyleType,
  isZoomMotionPhase,
  lerpCoverStyle,
  MotionPhase,
  normalizeWheelDelta,
  selectFlipKind,
  TouchGesture,
  TouchGestureResult,
  clampZoomPanStyle,
  GESTURE_DETECT_FLOOR_PX,
  resistZoomPanStyle,
} from './Image.utils'
import type { GestureDoubleTapZoomOptions, GesturePinchZoomOptions, GestureWheelZoomOptions } from '../../types/global'

type PropsType = BrowsingParams
const ZOOM_FOLLOW_EASE = 0.05
const ZOOM_FOLLOW_THRESHOLD = 0.35
const TOUCH_PASSIVE_LISTENER_OPTIONS: AddEventListenerOptions = { passive: true }
const TOUCH_MOVE_LISTENER_OPTIONS: AddEventListenerOptions = { passive: false }
const WHEEL_LISTENER_OPTIONS: AddEventListenerOptions = { passive: false }
const WHEEL_ZOOM_FIT_EPSILON = 0.001
const TOUCH_SYNTHETIC_CLICK_GUARD_MS = 450
type NormalizedWheelZoomOptions = Required<GestureWheelZoomOptions>
type NormalizedPinchZoomOptions = Required<GesturePinchZoomOptions>
type NormalizedDoubleTapZoomOptions = Required<GestureDoubleTapZoomOptions>

interface PinchGestureSession {
  startDistance: number
  baseScale: number
  minScale: number
  maxScale: number
  fitScale: number
  options: NormalizedPinchZoomOptions
}

interface ZoomTouchPanSession {
  startPoint: Coordinate
  startStyle: ImageStyleType
  active: boolean
  targetStyle?: ImageStyleType
}

interface StateType {
  // 加载状态
  isFetching: boolean
  invalidate: boolean
  // 样式
  currentStyle: ImageStyleType,
  // 动画
  animateConfig: ImageAnimateType
  // 触控
  touchGesture: TouchGesture
  // 时间戳 Flag
  timestamp: { [ImageUrl: string]: number },
  // 各 set 索引对应图片的 natural 尺寸 — 由 onLoad 收集.
  // side image 用自己 fit-scale 渲染 (而不是共用 center 的 scale), 修复 #167:
  //   1. 翻页时 side→center 的 scale 突变 (= 看起来是"附赠缩放动画") 消失
  //   2. swipe 模式下 side 物理宽度 ≤ viewport, 不再"探头进镜头"
  imageDimensions: { [imageIndex: number]: { w: number, h: number } },
}

type CoverFollowPhase = Extract<MotionPhase, 'browsing-follow' | 'closing-follow'>
type CoverFollowTargetGetter = (from: ImageStyleType) => ImageStyleType

export default class Image extends React.Component<PropsType, StateType> {

  // Types
  context: ContextType

  // Refs
  imageRef = React.createRef<HTMLImageElement>()
  detachCenterImageAbort?: () => void
  sideImageAbortCleanups = new Map<string, () => void>()
  // 初始页面高度
  initialPageOffset = typeof window !== 'undefined' ? window.pageYOffset : 0
  // 监听状态
  listeningMouseMove: boolean
  listeningWheelZoom: boolean
  // 图片加载
  imageLoadingTimer: ReturnType<typeof setInterval>
  // 延迟监听器注册的 RAF 句柄 — 卸载时必须 cancel, 否则 StrictMode 双 mount 会泄漏监听
  pendingRafHandles: number[] = []
  browsingTransitionRaf?: number
  zoomEnterTimer?: ReturnType<typeof setTimeout>
  zoomFollowRaf?: number
  zoomFollowCurrentStyle?: ImageStyleType
  zoomFollowTargetStyle?: ImageStyleType
  // cover 路径 RAF: in/out 共用同一套 cover 几何读取、插值和节点写入逻辑.
  coverFollowRaf?: number
  coverFollowStartTime?: number
  coverFollowDuration?: number
  coverFollowFromStyle?: ImageStyleType
  coverFollowCurrentStyle?: ImageStyleType
  coverFollowTargetGetter?: CoverFollowTargetGetter
  motionPhase: MotionPhase = 'idle'
  pendingZoomMousePosition?: Coordinate
  zoomPointerPosition?: Coordinate
  zoomTargetScale?: number
  pinchGestureSession?: PinchGestureSession
  pinchTargetStyle?: ImageStyleType
  pinchSequenceLocked = false
  zoomTouchPanSession?: ZoomTouchPanSession
  doubleTapGesture?: DoubleTapGesture
  doubleTapGestureKey?: string
  suppressSyntheticClickUntil = 0
  wheelZoomExitGuardUntil = 0
  wheelZoomExitGuardTimer?: ReturnType<typeof setTimeout>
  // Dim 校准 RAF: 切到未渲染过 side 的页面时, 目标页 dims 由 onLoad 才落地, dims 一旦记录,
  // React 会用 ownFitScale 重新计算 transform, CSS transition rule 触发"错误回退 scale → 正确 ownFit"
  // 350ms 动画 (= 用户在 flip='none' 或 swipe 出环跳转下看到的 scale 抖动 bug).
  // 通过 cdU 检测此 dim 到达, 主动 setNodeTransitionNone 中断这条 transition.
  pendingDimCalibration: number | null = null
  calibrationRestoreRaf?: number
  // 跳页 fade Timer: 当 |minDist|>2 时 (超出 ±2 预取环), 给新 center 加 jumpFadeIn class 触发 CSS
  // @keyframes (opacity 0→1) 作为降级过渡. CSS animation 与 transition 是独立子系统, 不会被
  // setNodeTransitionNone 中断, 所以与 scale 校准 interrupt 完全解耦.
  jumpFadeTimer?: ReturnType<typeof setTimeout>
  // Loading 显示延迟 Timer: handleImageLoadStart 不再同步把 isFetching 设 true, 而是 schedule
  // 这个 timer (= loadingDelay 默认 200ms). 若图片在延迟内通过 onLoad / cdU fast-path / polling
  // 任何途径 handleImageLoadEnd, 此 timer 被 cancel → Loading 永不显示, 杜绝缓存图切换的 flash.
  loadingShowDelayTimer?: ReturnType<typeof setTimeout>
  touchGesture = new TouchGesture()
  // State
  readonly state = {
    // 加载状态
    isFetching: true,
    invalidate: false,
    // 样式
    currentStyle: getCoverStyle(this.context),
    // 动画
    animateConfig: getAnimateConfig(this.context, selectFlipKind(this.context.animate)),
    // 触控
    touchGesture: this.touchGesture,
    // 时间戳 Flag
    timestamp: {},
    // 各 set 索引对应图片的 natural 尺寸
    imageDimensions: {},
  } as StateType

  componentDidMount () {
    const { presetIsMobile, presetIsDesktop, hideOnScroll } = this.context
    window.addEventListener('resize', this.handleResize)
    if (presetIsMobile) {
      this.pendingRafHandles.push(window.requestAnimationFrame(() => {
        window.addEventListener('touchstart', this.handleTouchStart, TOUCH_PASSIVE_LISTENER_OPTIONS)
        window.addEventListener('touchmove', this.handleTouchMove, TOUCH_MOVE_LISTENER_OPTIONS)
        window.addEventListener('touchend', this.handleTouchEnd, TOUCH_PASSIVE_LISTENER_OPTIONS)
        window.addEventListener('touchcancel', this.handleTouchCancel, TOUCH_PASSIVE_LISTENER_OPTIONS)
      }))
    }
    if (presetIsDesktop && hideOnScroll) {
      this.pendingRafHandles.push(window.requestAnimationFrame(() => {
        window.addEventListener('scroll', this.handleScroll)
      }))
    }
  }

  componentDidUpdate (prevProps: BrowsingParams, prevState: StateType) {
    const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
    const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
    const { animate, presetIsMobile } = this.context
    const keyboardZoomEnter = !prevZoom && currZoom && this.context.zoomTrigger === 'keyboard'
    const pinchZoomEnter = !prevZoom && currZoom && this.context.zoomTrigger === 'pinch'
    const doubleTapZoomEnter = !prevZoom && currZoom && this.context.zoomTrigger === 'doubleTap'
    if (prevShow !== currShow || prevPage !== currPage || (prevZoom && !currZoom)) {
      this.resetZoomMotionState()
    }
    // 快速重新打开会让 closing RAF 持续覆盖打开动画的 inline transform — 切换到 show=true 时主动取消
    if (!prevShow && currShow) {
      this.cancelClosingFollow()
    }
    if (prevRotate !== currRotate && currShow) {
      this.completeBrowsingFollow()
      this.reportCanZoom()
    }
    if (!prevZoom && currZoom) {
      this.cancelCoverFollow()
      if (keyboardZoomEnter) {
        this.startKeyboardZoomEnter()
      } else if (pinchZoomEnter && this.pinchTargetStyle) {
        this.applyZoomStyleImmediately(this.pinchTargetStyle)
      } else if (doubleTapZoomEnter) {
        this.startStoredZoomEnter()
      } else {
        this.startZoomEnter()
      }
    }
    // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
    if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
      const updateStyle = () => {
        if (keyboardZoomEnter) {
          this.updateCurrentImageStyleForKeyboardZoom()
        } else if (pinchZoomEnter && this.pinchTargetStyle) {
          this.setCurrentStyle(this.pinchTargetStyle)
        } else if (doubleTapZoomEnter) {
          this.updateCurrentImageStyleForStoredZoom()
        } else if (prevShow !== currShow && animate?.browsing === false) {
          this.updateCurrentImageStyleWithoutBrowsingTransition()
        } else if (!prevShow && currShow) {
          this.startBrowsingInTransition()
        } else if (prevShow && !currShow) {
          // 关闭路径: 启动 RAF 实时追踪 cover 视口位置, 避免 350ms transition 期间 target snapshot 导致的滚动滞后
          this.startClosingFollow()
        } else if (prevZoom && !currZoom) {
          this.updateCurrentImageStyle()
        } else {
          this.debounceUpdateCurrentImageStyle()
        }
      }
      // 显示状态切换
      if (!prevShow) {
        // 显示
        updateStyle()
        this.handleDetectImageLoadComplete()
        presetIsMobile && lockTouchInteraction()
      } else {
        // 隐藏
        updateStyle()
      }
      // 更新监听状态
      this.updateZoomEventListenerWithState()
    }
    // 切换页面时
    if (prevPage !== currPage) {
      this.cancelCoverFollow()
      // #167: 翻页动画下 (fade/crossFade/swipe) side image 节点会被复用为新 center,
      // 它的 src 不变 → 浏览器不再派发 load 事件 → handleImageLoad 不会触发 →
      // 两个副作用必须显式补齐 (handleImageLoad 是这两件事的唯一 onLoad-driven 来源):
      //   1. currentStyle.scale 保留前一页 fit-scale → debounceUpdateCurrentImageStyle 重算
      //   2. canZoom 保留 handleSwitchPages 的乐观 reset (=true), 小图切到时按钮不会禁用,
      //      空格键也能错误进入 zoom → reportCanZoom 重算 (与 handleResize / handleImageLoad
      //      同样的 reportCanZoom 来源, 三个触发源在此收敛).
      // 注: side image 自己有 fit-scale (走 imageDimensions, 见 getStyle), 这里只补 center.
      // 同时承担 Loading 显示策略的 fast-path 入口:
      //   - 若新 center 已 complete (cached / key-reused), 立即 handleImageLoadEnd 跳过 Loading
      //   - 否则走 handleImageLoadStart 的延迟路径 (loadingDelay 内不显示 Loading)
      const node = this.imageRef.current
      if (node && node.complete && node.naturalWidth > 0) {
        this.handleImageLoadEnd()
        this.debounceUpdateCurrentImageStyle()
        this.reportCanZoom()
      } else {
        this.handleImageLoadStart()
      }
      // ① 切页时若目标页 dims 缺失 → 标记 dim 校准债务. 仅在 page 真正改变时设置, 保证
      // 首次开场的 cover→browsing 动画 (无 page 变化) 不会被后续 dim 到达误中断.
      this.pendingDimCalibration =
        this.state.imageDimensions[currPage] == null ? currPage : null
    }
    // ② 检测目标页 dims 到达 → 中断 React 即将触发的 scale 校准 transition. 必须在
    // page change 块外检查, 因为 dim 到达通过 onLoad 异步发生, 与 page change 不在同一个 cdU.
    if (this.pendingDimCalibration === currPage &&
        prevState.imageDimensions[currPage] == null &&
        this.state.imageDimensions[currPage] != null &&
        this.props.show) {
      this.pendingDimCalibration = null
      this.cancelScaleCalibrationAnimation()
    }
    if (this.motionPhase === 'browsing-follow' &&
        prevState.imageDimensions[currPage] !== this.state.imageDimensions[currPage]) {
      this.syncBrowsingFollowTarget()
    }
    // ③ 跳页 fade: 当 page 真正变化, 且最短逻辑距离 > 2 (超出 ±2 预取环) 且非 flip='none' 时,
    // 给新 center 加 jumpFadeIn class 触发 CSS @keyframes (opacity 0→1). loop=true 时通过
    // resolveShortestStep 计算最短距离, 让 N=6 page 0→5 (= -1 wrap) 仍走 in-range 路径不进 fade.
    if (prevPage !== currPage && this.props.show) {
      const flipKind = selectFlipKind(this.context.animate)
      const set = this.context.set
      const loop = this.context.loop ?? false
      const minDist = computeMinPageDistance(prevPage, currPage, set.length, loop)
      if (minDist > 2 && flipKind !== 'none') {
        this.applyJumpFadeIn()
      }
    }
    this.maybeStartFlipPreload()
  }

  componentWillUnmount () {
    const { presetIsMobile, presetIsDesktop } = this.context
    // 取消所有还未触发的 RAF, 防止 unmount 后再注册监听 (StrictMode 双 mount 泄漏的根因)
    this.pendingRafHandles.forEach(handle => window.cancelAnimationFrame(handle))
    this.pendingRafHandles = []
    this.cancelBrowsingTransitionFrame()
    if (this.calibrationRestoreRaf !== undefined) {
      window.cancelAnimationFrame(this.calibrationRestoreRaf)
      this.calibrationRestoreRaf = undefined
    }
    if (this.jumpFadeTimer !== undefined) {
      clearTimeout(this.jumpFadeTimer)
      this.jumpFadeTimer = undefined
    }
    if (this.loadingShowDelayTimer !== undefined) {
      clearTimeout(this.loadingShowDelayTimer)
      this.loadingShowDelayTimer = undefined
    }
    this.clearWheelZoomExitGuard()
    this.cancelClosingFollow()
    this.resetZoomMotionState()
    // 取消挂起的 debounce, 避免在已卸载组件上 setState
    this.debounceUpdateCurrentImageStyle.cancel()
    if (presetIsMobile) {
      window.removeEventListener('touchstart', this.handleTouchStart)
      window.removeEventListener('touchmove', this.handleTouchMove)
      window.removeEventListener('touchend', this.handleTouchEnd)
      window.removeEventListener('touchcancel', this.handleTouchCancel)
    }
    if (presetIsDesktop) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('wheel', this.handleWheel)
    this.detachCenterImageAbort?.()
    this.detachCenterImageAbort = undefined
    this.sideImageAbortCleanups.forEach(cleanup => cleanup())
    this.sideImageAbortCleanups.clear()
    clearInterval(this.imageLoadingTimer)
  }

  /**
   * 事件监听
   **/
  updateZoomEventListenerWithState = () => {
    const { show, zoom } = this.context
    if (show && zoom && !this.listeningMouseMove) {
      window.addEventListener('mousemove', this.handleMouseMove)
      this.listeningMouseMove = true
    } else {
      window.removeEventListener('mousemove', this.handleMouseMove)
      this.listeningMouseMove = false
    }
    const shouldListenWheelZoom = show && !!this.getWheelZoomOptions() && (zoom || this.isWheelZoomExitGuardActive())
    if (shouldListenWheelZoom && !this.listeningWheelZoom) {
      window.addEventListener('wheel', this.handleWheel, WHEEL_LISTENER_OPTIONS)
      this.listeningWheelZoom = true
    } else if (!shouldListenWheelZoom && this.listeningWheelZoom) {
      window.removeEventListener('wheel', this.handleWheel)
      this.listeningWheelZoom = false
    }
  }

  /**
   * 信息更新
   **/
  updateCurrentImageStyle = () => {
    const { touchGesture } = this.state
    const nextStyle = this.context.zoom && (this.context.zoomTrigger === 'keyboard' || this.context.zoomTrigger === 'doubleTap')
      ? this.getZoomingStyleFromStoredPosition()
      : getCurrentImageStyle(this.context, this.imageRef, touchGesture)
    this.setCurrentStyle(nextStyle, () => {
      if (nextStyle._type === 'zooming') {
        if (this.motionPhase === 'zoom-enter') {
          this.scheduleZoomEnterComplete()
        } else {
          this.consumePendingZoomMousePosition()
        }
      }
    })
  }
  updateCurrentImageStyleWithoutBrowsingTransition = () => {
    const { touchGesture } = this.state
    const nextStyle = getCurrentImageStyle(this.context, this.imageRef, touchGesture)
    this.motionPhase = 'browsing-instant'
    this.setCurrentStyle(nextStyle, this.scheduleBrowsingInstantReset)
  }
  startBrowsingInTransition = () => {
    this.debounceUpdateCurrentImageStyle.cancel()
    const from = this.getCoverTargetStyle(this.getCurrentVisualStyle())
    this.startCoverFollow({
      phase: 'browsing-follow',
      from,
      getTarget: () => getBrowsingStyle(this.context, this.imageRef),
      fallback: this.debounceUpdateCurrentImageStyle,
    })
  }
  scheduleBrowsingInstantReset = ({ refreshStyle = false }: { refreshStyle?: boolean } = {}) => {
    this.cancelBrowsingTransitionFrame()
    this.browsingTransitionRaf = window.requestAnimationFrame(() => {
      this.browsingTransitionRaf = undefined
      if (this.motionPhase === 'browsing-instant') {
        this.motionPhase = 'idle'
        if (refreshStyle) {
          this.setCurrentStyle(this.state.currentStyle)
        }
        this.maybeStartFlipPreload()
      }
    })
  }
  cancelBrowsingTransitionFrame = () => {
    if (this.browsingTransitionRaf !== undefined) {
      window.cancelAnimationFrame(this.browsingTransitionRaf)
      this.browsingTransitionRaf = undefined
    }
  }
  updateCurrentImageStyleForKeyboardZoom = () => {
    const nextStyle = this.getZoomingStyleFromStoredPosition()
    this.setCurrentStyle(nextStyle, this.scheduleZoomEnterComplete)
  }
  updateCurrentImageStyleForStoredZoom = () => {
    const nextStyle = this.getZoomingStyleFromStoredPosition()
    this.setCurrentStyle(nextStyle, this.scheduleZoomEnterComplete)
  }
  debounceUpdateCurrentImageStyle = debounce(this.updateCurrentImageStyle, 50)

  /**
   * 事件响应
   **/
  // 页面事件
  handleResize = () => {
    const { show, zoom } = this.context
    if (show && !zoom) {
      this.debounceUpdateCurrentImageStyle.cancel()
      if (this.motionPhase === 'browsing-follow') {
        this.syncBrowsingFollowTarget()
      } else {
        this.updateCurrentImageStyleWithoutBrowsingTransition()
      }
    } else {
      this.debounceUpdateCurrentImageStyle()
    }
    this.reportCanZoom()
  }
  handleScroll = () => {
    if (this.imageRef.current) {
      const { show } = this.context
      // cover-follow RAF 接管整个位置计算时, inline top 不能再叠加滚动量,
      // 否则会与 transform 内的 cover-y 偏移产生双重位移.
      if (this.motionPhase === 'closing-follow' || this.motionPhase === 'browsing-follow') {
        return
      }
      this.imageRef.current.style.top = `calc(50% + ${show ? 0 : this.initialPageOffset - window.pageYOffset}px)`
    }
  }
  handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (this.shouldSuppressSyntheticClick()) {
      this.suppressSyntheticClickUntil = 0
      e.preventDefault()
      e.stopPropagation()
      return
    }
    const { zoom, toggleZoom } = this.context
    zoom && toggleZoom()
  }
  // 收集任意 set 索引图片的 natural 尺寸 (center + side 共用) — getStyle 给 side image
  // 计算自己的 fit-scale 用. 没拿到 dimensions 的索引会 fallback 到 currentStyle.scale.
  handleRecordImageDimensions = (imageIndex: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const node = e.currentTarget
    const w = node.naturalWidth
    const h = node.naturalHeight
    if (!w || !h) return
    this.setState(prev => {
      const cur = prev.imageDimensions[imageIndex]
      if (cur && cur.w === w && cur.h === h) return null
      return { imageDimensions: { ...prev.imageDimensions, [imageIndex]: { w, h } } }
    })
  }
  markFlipReadyFromStep = (step: number) => {
    if (Math.abs(step) !== 1) return
    this.context.setFlipReady(step < 0 ? -1 : 1)
  }
  handleSideImageLoad = (step: number, imageIndex: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    this.handleRecordImageDimensions(imageIndex, e)
    this.markFlipReadyFromStep(step)
  }
  handleSideImageTerminal = (step: number) => {
    this.markFlipReadyFromStep(step)
  }
  setCenterImageRef = (node: HTMLImageElement | null) => {
    this.detachCenterImageAbort?.()
    this.detachCenterImageAbort = undefined
    ;(this.imageRef as React.MutableRefObject<HTMLImageElement | null>).current = node
    if (!node) return

    node.addEventListener('abort', this.handleImageAbort)
    this.detachCenterImageAbort = () => node.removeEventListener('abort', this.handleImageAbort)
  }
  setSideImageAbortRef = (key: string, step: number) => (node: HTMLImageElement | null) => {
    const cleanup = this.sideImageAbortCleanups.get(key)
    if (cleanup) {
      cleanup()
      this.sideImageAbortCleanups.delete(key)
    }
    if (!node) return

    const handleAbort = () => this.handleSideImageTerminal(step)
    node.addEventListener('abort', handleAbort)
    this.sideImageAbortCleanups.set(key, () => node.removeEventListener('abort', handleAbort))
  }
  shouldDeferFlipPreload = () => {
    const { set, animate } = this.context
    const flipKind = selectFlipKind(animate)
    return Array.isArray(set) && set.length > 1 && flipKind !== 'none' && flipKind !== false
  }
  syncFlipReadyFromLoadedDimensions = () => {
    const { flipPreloadStarted, loop = false, page, set, setFlipReady } = this.context
    if (!flipPreloadStarted || !this.shouldDeferFlipPreload()) return

    ;([-1, 1] as FlipDirection[]).forEach(direction => {
      const imageIndex = getTargetPage(page, set.length, direction, { loop })
      if (isInteger(imageIndex) && this.state.imageDimensions[imageIndex]) {
        setFlipReady(direction)
      }
    })
  }
  maybeStartFlipPreload = () => {
    const { show, zoom, flipPreloadStarted, startFlipPreload } = this.context
    if (!show || zoom || !this.shouldDeferFlipPreload()) return
    if (this.motionPhase === 'browsing-follow' || this.motionPhase === 'closing-follow') return
    if (this.state.currentStyle._type !== 'browsing') return

    if (!flipPreloadStarted) {
      startFlipPreload()
      return
    }
    this.syncFlipReadyFromLoadedDimensions()
  }
  // 双击关闭 (hideOnDblClick=true 时启用)。注: 浏览器在 dblclick 之前会先派发两次 click,
  // 因此在 zoom 态做 dblclick 会先 zoom-out 再 close, 是有意为之的链式动画 — 不再额外门控。
  handleDoubleClick = () => {
    const { hideOnDblClick, outBrowsing } = this.context
    hideOnDblClick && outBrowsing()
  }
  // 触摸事件
  handleTouchStart = (e: TouchEvent) => {
    this.completeBrowsingFollow({ startFlipPreload: false })
    if (this.tryStartPinchGesture(e)) {
      return
    }
    if (e.touches.length > 1) {
      return
    }
    if (this.pinchSequenceLocked) {
      return
    }
    const point = this.getTouchPoint(e)
    if (!point) return
    if (this.tryStartZoomTouchPan(point)) {
      return
    }
    this.touchGesture = new TouchGesture(this.getActiveGesture()).start(point)
    this.setTouchGesture(this.touchGesture)
  }
  handleTouchMove = (e: TouchEvent) => {
    if (this.pinchGestureSession) {
      this.updatePinchGesture(e)
      return
    }
    if (this.tryStartPinchGesture(e)) {
      return
    }
    if (e.touches.length > 1) {
      return
    }
    if (this.pinchSequenceLocked) {
      return
    }
    if (this.updateZoomTouchPan(e)) {
      return
    }
    const point = this.getTouchPoint(e)
    if (!point) return
    const nextGesture = this.touchGesture.move(point)
    if (nextGesture.ownsGesture()) {
      e.preventDefault()
    }
    this.setTouchGesture(nextGesture)
  }
  handleTouchEnd = (e: TouchEvent) => {
    if (this.pinchGestureSession || this.pinchSequenceLocked) {
      this.endPinchGesture(e)
      return
    }
    if (this.endZoomTouchPan()) {
      return
    }
    if (this.tryHandleDoubleTapGesture(e)) {
      return
    }
    const result = this.touchGesture.end()
    this.setTouchGesture(this.touchGesture, () => this.commitTouchGestureResult(result))
  }
  handleTouchCancel = () => {
    this.clearPinchGesture()
    this.clearZoomTouchPan()
    this.touchGesture = new TouchGesture()
    this.setTouchGesture(this.touchGesture)
  }
  // 鼠标事件
  handleMouseMove = (e: MouseEvent) => {
    const { zoom } = this.context
    if (!zoom) {
      return
    }
    const mousePosition = { x: e.clientX, y: e.clientY }
    this.zoomPointerPosition = mousePosition
    if (this.motionPhase === 'zoom-enter' || this.state.currentStyle._type !== 'zooming') {
      this.pendingZoomMousePosition = mousePosition
      return
    }
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, e, {
      scale: this.getCurrentZoomTargetScale(),
    })
    this.startZoomFollow(zoomingStyle)
  }
  handleWheel = (e: WheelEvent) => {
    const wheelZoom = this.getWheelZoomOptions()
    if (!this.context.show || !wheelZoom) {
      return
    }
    if (!this.context.zoom) {
      if (this.isWheelZoomExitGuardActive()) {
        e.preventDefault()
      }
      return
    }

    e.preventDefault()
    const viewport = getViewportRect(this.context)
    const pixelDeltaY = normalizeWheelDelta(e, viewport)
    const zoomDeltaY = wheelZoom.reverse ? -pixelDeltaY : pixelDeltaY
    if (zoomDeltaY === 0) {
      return
    }

    const { minScale, maxScale } = getWheelZoomScaleRange(this.context, this.imageRef, wheelZoom)
    const nextScale = getNextWheelZoomScale({
      currentScale: this.getCurrentZoomTargetScale(),
      pixelDeltaY: zoomDeltaY,
      step: wheelZoom.step,
      minScale,
      maxScale,
    })
    this.zoomTargetScale = nextScale

    const focus = this.getWheelZoomFocus(e, wheelZoom, viewport)
    this.zoomPointerPosition = { x: focus.clientX, y: focus.clientY }
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, focus, { scale: nextScale })
    const reachedMinScale = zoomDeltaY > 0 && nextScale <= minScale + WHEEL_ZOOM_FIT_EPSILON
    if (reachedMinScale) {
      this.startWheelZoomExitGuard(wheelZoom.exitGuardDuration)
      this.context.toggleZoom('wheel')
      return
    }

    if (wheelZoom.smooth === false) {
      this.applyZoomStyleImmediately(zoomingStyle)
      return
    }
    this.startZoomFollow(zoomingStyle)
  }
  // 加载事件
  // Loading 显示策略 (anti-flicker):
  //   - handleImageLoadStart 不再同步显示 Loading, 而是 schedule 一个 loadingDelay 定时器
  //   - 若图片在 delay 内通过 onLoad (handleImageLoad) / cdU fast-path / polling 任何途径完成,
  //     handleImageLoadEnd 取消此 timer → Loading 永不显示
  //   - 若 delay 后仍未完成, timer 触发 setState({isFetching:true}) → Loading 显示
  // 借鉴 react-loadable / Ant Design Spin / TanStack Query 等业界做法.
  handleImageLoadStart = () => {
    // invalidate 立即重置 (与 isFetching 解耦; invalidate 是错误标记, 不需要延迟)
    this.setState({ invalidate: false })
    // 立即启动 polling 兜底 (即使 onLoad 不派发 — 例如 key-reused img — polling 仍能最终发现 complete)
    this.handleDetectImageLoadComplete()
    // 推迟 isFetching=true. 若 image 在延迟内完成, cancel timer → Loading 永不显示.
    if (this.loadingShowDelayTimer !== undefined) {
      clearTimeout(this.loadingShowDelayTimer)
    }
    const delay = this.context.loadingDelay ?? 200
    this.loadingShowDelayTimer = setTimeout(() => {
      this.loadingShowDelayTimer = undefined
      this.setState({ isFetching: true })
    }, delay)
  }
  handleDetectImageLoadComplete = () => {
    clearInterval(this.imageLoadingTimer)
    this.imageLoadingTimer = checkImageLoadedComplete(this.imageRef.current, this.handleImageLoadEnd)
  }
  handleImageLoadEnd = ({ invalidate } = { invalidate: false }) => {
    // 取消 loading 显示 timer — image 已完成, 即使 timer 还未触发, 也不需要让 Loading 显示
    if (this.loadingShowDelayTimer !== undefined) {
      clearTimeout(this.loadingShowDelayTimer)
      this.loadingShowDelayTimer = undefined
    }
    clearInterval(this.imageLoadingTimer)
    this.setState({
      isFetching: false,
      invalidate: invalidate === undefined ? this.state.invalidate : invalidate,
    })
  }
  handleImageLoad = () => {
    const { animate, show, zoom } = this.context
    if (this.motionPhase === 'browsing-follow') {
      // opening RAF 写视觉帧; logical currentStyle 仍要同步到最新浏览态目标,
      // 否则开场期间的 zoom / fit-scale 判断会拿到 cover/intermediate 几何.
      this.syncBrowsingFollowTarget()
    } else if (animate?.browsing === false && show && !zoom) {
      this.updateCurrentImageStyleWithoutBrowsingTransition()
    } else {
      this.debounceUpdateCurrentImageStyle()
    }
    this.reportCanZoom()
    // onLoad 派发 = 浏览器确认 image 加载完成. 立即清除 Loading 状态 (cancel delay timer + isFetching=false),
    // 不再独靠 500ms polling. 这是 fast-load 场景下"延迟显示"机制能彻底无 flash 的关键.
    this.handleImageLoadEnd()
  }
  // 把 fit 几何里的 canZoom 上抛给 Browser, 用于 Control 的禁用态和空格键的早返回.
  reportCanZoom = () => {
    const { setCanZoom } = this.context
    if (typeof setCanZoom !== 'function') return
    const node = this.imageRef.current
    if (!node) return
    const { naturalWidth, naturalHeight } = node
    if (!naturalWidth || !naturalHeight) return
    const viewport = getViewportRect(this.context)
    if (!viewport.width || !viewport.height) return
    const geometry = calcFitGeometry({
      naturalWidth,
      naturalHeight,
      edge: this.context.edge ?? 0,
      viewport,
      rotate: this.context.rotate ?? 0,
    })
    setCanZoom(geometry.canZoom)
  }
  handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    this.handleImageLoadEnd({ invalidate: true })
    const { onError } = this.context
    typeof onError === 'function' && onError(e)
  }
  handleImageAbort = () => {
    this.handleImageLoadEnd({ invalidate: true })
  }
  handleImageReload = () => {
    const { page } = this.context
    this.handleSetTimestamp(page)
  }

  /**
   * 時間戳
   **/
  handleSetTimestamp = (page: number) => {
    const { set } = this.context
    const { timestamp } = this.state
    this.setState({
      timestamp: {
        ...timestamp,
        [set[page].src]: new Date().getTime(),
      }
    })
  }
  handleGetTimestamp = (page: number) => {
    const { set } = this.context
    const { timestamp } = this.state
    return timestamp[set[page].src]
  }

  /**
   * 样式应用
   **/
  setCurrentStyle = (nextStyle: ImageStyleType, callback?: () => void) => {
    const { animate } = this.context
    const { currentStyle } = this.state
    this.setState({
      currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
      animateConfig: getAnimateConfig(this.context, selectFlipKind(animate)),
    }, callback)
  }
  startZoomEnter = () => {
    this.debounceUpdateCurrentImageStyle.cancel()
    this.cancelZoomEnterTimer()
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.pendingZoomMousePosition = undefined
    this.zoomPointerPosition = undefined
    this.zoomTargetScale = 1
    this.clearWheelZoomExitGuard()
    this.motionPhase = 'zoom-enter'
  }
  startStoredZoomEnter = () => {
    this.debounceUpdateCurrentImageStyle.cancel()
    this.cancelZoomEnterTimer()
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.pendingZoomMousePosition = undefined
    this.clearWheelZoomExitGuard()
    this.motionPhase = 'zoom-enter'
  }
  startKeyboardZoomEnter = () => {
    this.debounceUpdateCurrentImageStyle.cancel()
    this.cancelZoomEnterTimer()
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.pendingZoomMousePosition = undefined
    this.zoomPointerPosition = this.context.zoomPosition
    this.zoomTargetScale = 1
    this.clearWheelZoomExitGuard()
    this.motionPhase = 'zoom-enter'
  }
  resetZoomMotionState = () => {
    this.cancelZoomEnterTimer()
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.pendingZoomMousePosition = undefined
    this.zoomPointerPosition = undefined
    this.zoomTargetScale = undefined
    this.clearPinchGesture()
    this.clearZoomTouchPan()
    if (isZoomMotionPhase(this.motionPhase)) {
      this.motionPhase = 'idle'
    }
  }
  cancelZoomEnterTimer = () => {
    if (this.zoomEnterTimer !== undefined) {
      clearTimeout(this.zoomEnterTimer)
      this.zoomEnterTimer = undefined
    }
  }
  cancelZoomFollowFrame = () => {
    if (this.zoomFollowRaf !== undefined) {
      window.cancelAnimationFrame(this.zoomFollowRaf)
      this.zoomFollowRaf = undefined
    }
  }
  getCenterImageTransform = (imageStyle: ImageStyleType) => {
    const x = imageStyle.x || 0
    const y = imageStyle.y || 0
    const scale = imageStyle.scale || 0
    const rotate = imageStyle.rotate || 0
    return `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${rotate}deg)`
  }
  setNodeTransform = (node: HTMLImageElement, transform: string) => {
    node.style.transform = transform
    node.style.setProperty('-webkit-transform', transform)
  }
  setNodeTransitionNone = (node: HTMLImageElement) => {
    node.style.transition = 'none'
    node.style.setProperty('-webkit-transition', 'none')
  }
  writeImageStyleToNode = (node: HTMLImageElement, imageStyle: ImageStyleType) => {
    this.setNodeTransitionNone(node)
    this.setNodeTransform(node, this.getCenterImageTransform(imageStyle))
    node.style.opacity = String(imageStyle.opacity ?? 1)
    this.setNodeClipAndRadius(node, imageStyle)
  }
  setNodeClipAndRadius = (node: HTMLImageElement, imageStyle: ImageStyleType) => {
    const scale = imageStyle.scale ?? 1
    const clipPath = getClipPath(imageStyle.clip, imageStyle.radius ?? 0, scale)
    if (clipPath) {
      node.style.clipPath = clipPath
      node.style.setProperty('-webkit-clip-path', clipPath)
    } else {
      node.style.clipPath = ''
      node.style.removeProperty('-webkit-clip-path')
    }
    if (typeof imageStyle.radius === 'number') {
      node.style.borderRadius = `${getLocalRadius(imageStyle.radius, scale)}px`
    } else {
      node.style.borderRadius = ''
    }
  }
  getWheelZoomOptions = (): NormalizedWheelZoomOptions | null => {
    const wheelZoom = this.context.gesture?.wheelZoom
    return wheelZoom && typeof wheelZoom === 'object'
      ? wheelZoom as NormalizedWheelZoomOptions
      : null
  }
  getWheelZoomExitGuardDuration = (duration: number) => (
    Number.isFinite(duration) && duration >= 0
      ? duration
      : defaultGestureWheelZoomOptions.exitGuardDuration
  )
  startWheelZoomExitGuard = (duration: number) => {
    this.clearWheelZoomExitGuard()
    const guardDuration = this.getWheelZoomExitGuardDuration(duration)
    if (guardDuration <= 0) return
    this.wheelZoomExitGuardUntil = Date.now() + guardDuration
    this.wheelZoomExitGuardTimer = setTimeout(() => {
      this.wheelZoomExitGuardTimer = undefined
      this.wheelZoomExitGuardUntil = 0
      this.updateZoomEventListenerWithState()
    }, guardDuration)
  }
  clearWheelZoomExitGuard = () => {
    if (this.wheelZoomExitGuardTimer !== undefined) {
      clearTimeout(this.wheelZoomExitGuardTimer)
      this.wheelZoomExitGuardTimer = undefined
    }
    this.wheelZoomExitGuardUntil = 0
  }
  isWheelZoomExitGuardActive = () => Date.now() < this.wheelZoomExitGuardUntil
  getCurrentZoomTargetScale = () => {
    const candidates = [
      this.zoomFollowTargetStyle?.scale,
      this.zoomTargetScale,
      this.zoomFollowCurrentStyle?.scale,
      this.state.currentStyle._type === 'zooming' ? this.state.currentStyle.scale : undefined,
      1,
    ]
    const scale = candidates.find(value => Number.isFinite(value) && (value ?? 0) > 0)
    return scale ?? 1
  }
  getWheelZoomFocus = (
    e: WheelEvent,
    wheelZoom: NormalizedWheelZoomOptions,
    viewport = getViewportRect(this.context),
  ) => (
    wheelZoom.center === 'viewport'
      ? { clientX: viewport.left + viewport.width / 2, clientY: viewport.top + viewport.height / 2 }
      : { clientX: e.clientX, clientY: e.clientY }
  )
  writeZoomStyleToNode = (zoomingStyle: ImageStyleType) => {
    const node = this.imageRef.current
    this.cancelZoomFollowFrame()
    this.motionPhase = 'zoom-follow'
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.zoomTargetScale = zoomingStyle.scale
    if (node) {
      this.writeImageStyleToNode(node, zoomingStyle)
    }
  }
  applyZoomStyleImmediately = (zoomingStyle: ImageStyleType) => {
    this.writeZoomStyleToNode(zoomingStyle)
    this.setCurrentStyle(zoomingStyle)
  }
  getPinchZoomOptions = (): NormalizedPinchZoomOptions | null => {
    const pinchZoom = this.context.gesture?.pinchZoom
    return pinchZoom && typeof pinchZoom === 'object'
      ? pinchZoom as NormalizedPinchZoomOptions
      : null
  }
  canStartPinchZoom = () => {
    const { canZoom, zoom } = this.context
    return zoom || canZoom
  }
  getPinchFocus = (
    touches: ArrayLike<{ clientX: number, clientY: number }>,
    options: NormalizedPinchZoomOptions,
    viewport = getViewportRect(this.context),
  ) => (
    options.center === 'viewport'
      ? { clientX: viewport.left + viewport.width / 2, clientY: viewport.top + viewport.height / 2 }
      : getTouchMidpoint(touches)
  )
  tryStartPinchGesture = (e: TouchEvent) => {
    if (e.touches.length < 2 || this.pinchGestureSession) {
      return false
    }
    const pinchZoom = this.getPinchZoomOptions()
    if (!pinchZoom || !this.canStartPinchZoom()) {
      return false
    }
    const startDistance = getTouchDistance(e.touches)
    if (startDistance <= 0) {
      return false
    }

    const { minScale, maxScale, fitScale } = getZoomScaleRange(this.context, this.imageRef, pinchZoom)
    const currentScale = this.context.zoom
      ? this.getCurrentZoomTargetScale()
      : this.state.currentStyle.scale
    const baseScale = Number.isFinite(currentScale) && (currentScale ?? 0) > 0 ? currentScale as number : fitScale
    const focus = this.getPinchFocus(e.touches, pinchZoom)
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, focus, { scale: baseScale })

    this.pinchGestureSession = {
      startDistance,
      baseScale,
      minScale,
      maxScale,
      fitScale,
      options: pinchZoom,
    }
    this.pinchTargetStyle = zoomingStyle
    this.pinchSequenceLocked = true
    this.zoomPointerPosition = { x: focus.clientX, y: focus.clientY }
    this.zoomTargetScale = baseScale
    this.clearZoomTouchPan()
    this.touchGesture = new TouchGesture()
    this.setTouchGesture(this.touchGesture)

    if (this.context.zoom) {
      this.writeZoomStyleToNode(zoomingStyle)
    } else {
      this.context.toggleZoom('pinch')
    }
    return true
  }
  updatePinchGesture = (e: TouchEvent) => {
    const session = this.pinchGestureSession
    if (!session || e.touches.length < 2) {
      return
    }
    e.preventDefault()
    const currentDistance = getTouchDistance(e.touches)
    const scale = getNextPinchZoomScale({
      baseScale: session.baseScale,
      startDistance: session.startDistance,
      currentDistance,
      minScale: session.minScale,
      maxScale: session.maxScale,
    })
    const focus = this.getPinchFocus(e.touches, session.options)
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, focus, { scale })

    this.pinchTargetStyle = zoomingStyle
    this.zoomPointerPosition = { x: focus.clientX, y: focus.clientY }
    this.zoomTargetScale = scale
    this.writeZoomStyleToNode(zoomingStyle)
  }
  endPinchGesture = (e: TouchEvent) => {
    const session = this.pinchGestureSession
    const target = this.pinchTargetStyle
    const hasActiveTouches = e.touches.length > 0
    const shouldResetToFit = !!session &&
      !!target &&
      session.options.resetBelowFit !== false &&
      (target.scale ?? session.fitScale) <= session.minScale + WHEEL_ZOOM_FIT_EPSILON

    if (target) {
      this.setCurrentStyle(target)
    }
    this.pinchGestureSession = undefined
    this.pinchTargetStyle = target
    this.pinchSequenceLocked = hasActiveTouches

    if (shouldResetToFit && this.context.zoom) {
      this.context.toggleZoom('pinch')
    }
    if (!hasActiveTouches) {
      this.pinchSequenceLocked = false
      this.pinchTargetStyle = undefined
    }
  }
  clearPinchGesture = () => {
    this.pinchGestureSession = undefined
    this.pinchTargetStyle = undefined
    this.pinchSequenceLocked = false
  }
  getZoomTouchPanStartStyle = () => {
    const current = this.zoomFollowCurrentStyle ||
      this.zoomFollowTargetStyle ||
      (this.state.currentStyle._type === 'zooming' ? this.state.currentStyle : undefined) ||
      this.getZoomingStyleFromStoredPosition()
    return clampZoomPanStyle(this.context, this.imageRef, current)
  }
  tryStartZoomTouchPan = (point: Coordinate) => {
    if (!this.context.zoom || this.state.currentStyle._type !== 'zooming') {
      return false
    }
    this.zoomTouchPanSession = {
      startPoint: point,
      startStyle: this.getZoomTouchPanStartStyle(),
      active: false,
    }
    this.touchGesture = new TouchGesture().start(point)
    this.setTouchGesture(this.touchGesture)
    return true
  }
  updateZoomTouchPan = (e: TouchEvent) => {
    const session = this.zoomTouchPanSession
    if (!session) {
      return false
    }
    const point = this.getTouchPoint(e)
    if (!point) {
      return true
    }

    this.touchGesture = this.touchGesture.move(point)
    const dx = point.x - session.startPoint.x
    const dy = point.y - session.startPoint.y
    if (!session.active &&
      Math.abs(dx) < GESTURE_DETECT_FLOOR_PX &&
      Math.abs(dy) < GESTURE_DETECT_FLOOR_PX) {
      return true
    }

    session.active = true
    this.doubleTapGesture?.cancel()
    e.preventDefault()
    const nextStyle = resistZoomPanStyle(this.context, this.imageRef, {
      ...session.startStyle,
      x: (session.startStyle.x ?? 0) + dx,
      y: session.startStyle.y + dy,
    })
    session.targetStyle = nextStyle
    this.writeZoomStyleToNode(nextStyle)
    return true
  }
  endZoomTouchPan = () => {
    const session = this.zoomTouchPanSession
    if (!session) {
      return false
    }
    this.zoomTouchPanSession = undefined
    if (!session.active) {
      return false
    }
    const target = clampZoomPanStyle(this.context, this.imageRef, session.targetStyle || session.startStyle)
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.motionPhase = 'idle'
    this.zoomTargetScale = target.scale
    this.setCurrentStyle(target)
    return true
  }
  clearZoomTouchPan = () => {
    this.zoomTouchPanSession = undefined
  }
  getZoomingStyleFromStoredPosition = () => {
    const zoomPosition = this.zoomPointerPosition || this.context.zoomPosition
    const scale = this.getCurrentZoomTargetScale()
    return zoomPosition
      ? getZoomingStyle(this.context, this.imageRef, { clientX: zoomPosition.x, clientY: zoomPosition.y }, { scale })
      : getZoomingStyle(this.context, this.imageRef, {}, { scale })
  }
  getDoubleTapZoomOptions = (): NormalizedDoubleTapZoomOptions | null => {
    const doubleTapZoom = this.context.gesture?.doubleTapZoom
    return doubleTapZoom && typeof doubleTapZoom === 'object'
      ? doubleTapZoom as NormalizedDoubleTapZoomOptions
      : null
  }
  getDoubleTapGesture = (options: NormalizedDoubleTapZoomOptions) => {
    const key = `${options.interval}:${options.distance}`
    if (!this.doubleTapGesture || this.doubleTapGestureKey !== key) {
      this.doubleTapGesture = new DoubleTapGesture(options)
      this.doubleTapGestureKey = key
    }
    return this.doubleTapGesture
  }
  getDoubleTapFocus = (
    point: Coordinate,
    options: NormalizedDoubleTapZoomOptions,
    viewport = getViewportRect(this.context),
  ) => (
    options.center === 'viewport'
      ? { clientX: viewport.left + viewport.width / 2, clientY: viewport.top + viewport.height / 2 }
      : { clientX: point.x, clientY: point.y }
  )
  getDoubleTapTargetScale = (options: NormalizedDoubleTapZoomOptions) => {
    const { minScale, maxScale } = getZoomScaleRange(this.context, this.imageRef, options)
    const scale = Number.isFinite(options.scale) && options.scale > 0 ? options.scale : maxScale
    return Math.min(Math.max(scale, minScale), maxScale)
  }
  suppressNextSyntheticClick = () => {
    this.suppressSyntheticClickUntil = Date.now() + TOUCH_SYNTHETIC_CLICK_GUARD_MS
  }
  shouldSuppressSyntheticClick = () => (
    this.suppressSyntheticClickUntil > 0 && Date.now() <= this.suppressSyntheticClickUntil
  )
  tryHandleDoubleTapGesture = (e: TouchEvent) => {
    const doubleTapZoom = this.getDoubleTapZoomOptions()
    if (!doubleTapZoom || e.touches.length > 0 || e.changedTouches.length !== 1) {
      return false
    }
    const point = this.getChangedTouchPoint(e)
    if (!point) {
      return false
    }
    const movement = this.touchGesture.getDistance()
    if (movement.x > doubleTapZoom.distance || movement.y > doubleTapZoom.distance) {
      this.doubleTapGesture?.cancel()
      return false
    }
    if (!this.getDoubleTapGesture(doubleTapZoom).tap(point)) {
      return false
    }

    this.touchGesture = new TouchGesture()
    this.setTouchGesture(this.touchGesture)
    this.suppressNextSyntheticClick()

    if (this.context.zoom) {
      this.context.toggleZoom('doubleTap')
      return true
    }
    if (!this.canStartPinchZoom()) {
      return true
    }

    const focus = this.getDoubleTapFocus(point, doubleTapZoom)
    const scale = this.getDoubleTapTargetScale(doubleTapZoom)
    this.zoomPointerPosition = { x: focus.clientX, y: focus.clientY }
    this.zoomTargetScale = scale
    this.context.toggleZoom('doubleTap')
    return true
  }
  scheduleZoomEnterComplete = () => {
    this.cancelZoomEnterTimer()
    this.zoomEnterTimer = setTimeout(() => {
      this.zoomEnterTimer = undefined
      if (!this.context.zoom || this.motionPhase !== 'zoom-enter') {
        return
      }
      this.motionPhase = 'zoom-follow'
      this.consumePendingZoomMousePosition()
    }, animationDuration)
  }
  getNextZoomFollowStyle = (current: ImageStyleType, target: ImageStyleType) => ({
    ...target,
    x: (current.x || 0) + ((target.x || 0) - (current.x || 0)) * ZOOM_FOLLOW_EASE,
    y: (current.y || 0) + ((target.y || 0) - (current.y || 0)) * ZOOM_FOLLOW_EASE,
    scale: (current.scale || 0) + ((target.scale || 0) - (current.scale || 0)) * ZOOM_FOLLOW_EASE,
    rotate: (current.rotate || 0) + ((target.rotate || 0) - (current.rotate || 0)) * ZOOM_FOLLOW_EASE,
  })
  zoomFollowHasSettled = (current: ImageStyleType, target: ImageStyleType) => (
    Math.abs((current.x || 0) - (target.x || 0)) < ZOOM_FOLLOW_THRESHOLD &&
    Math.abs((current.y || 0) - (target.y || 0)) < ZOOM_FOLLOW_THRESHOLD &&
    Math.abs((current.scale || 0) - (target.scale || 0)) < 0.001 &&
    Math.abs((current.rotate || 0) - (target.rotate || 0)) < 0.001
  )
  startZoomFollow = (zoomingStyle: ImageStyleType) => {
    const node = this.imageRef.current
    this.motionPhase = 'zoom-follow'
    this.zoomFollowTargetStyle = zoomingStyle
    this.zoomTargetScale = zoomingStyle.scale
    this.zoomFollowCurrentStyle = this.zoomFollowCurrentStyle || (
      this.state.currentStyle._type === 'zooming' ? this.state.currentStyle : zoomingStyle
    )
    if (node) {
      this.setNodeTransitionNone(node)
    }
    if (this.zoomFollowRaf === undefined) {
      this.zoomFollowRaf = window.requestAnimationFrame(this.stepZoomFollow)
    }
  }
  stepZoomFollow = () => {
    this.zoomFollowRaf = undefined
    const node = this.imageRef.current
    const target = this.zoomFollowTargetStyle
    const current = this.zoomFollowCurrentStyle
    if (!node || !target || !current || !this.context.zoom) {
      this.resetZoomMotionState()
      return
    }

    const nextStyle = this.getNextZoomFollowStyle(current, target)
    const settled = this.zoomFollowHasSettled(nextStyle, target)
    const visibleStyle = settled ? target : nextStyle
    this.zoomFollowCurrentStyle = visibleStyle
    this.setNodeTransitionNone(node)
    this.setNodeTransform(node, this.getCenterImageTransform(visibleStyle))
    node.style.opacity = String(visibleStyle.opacity ?? 1)
    this.setNodeClipAndRadius(node, visibleStyle)

    if (settled) {
      this.zoomFollowCurrentStyle = undefined
      this.zoomFollowTargetStyle = undefined
      this.setCurrentStyle(target)
      return
    }

    this.zoomFollowRaf = window.requestAnimationFrame(this.stepZoomFollow)
  }
  startClosingFollow = () => {
    this.startCoverFollow({
      phase: 'closing-follow',
      from: this.getCurrentVisualStyle(),
      getTarget: this.getCoverTargetStyle,
      fallback: this.debounceUpdateCurrentImageStyle,
    })
  }

  /**
   * in/out 共用的 cover 几何动画.
   *
   * - browsing-in: from = 实时 cover, target = 浏览态 fit 几何.
   * - browsing-out: from = 当前浏览态视觉几何, target = 实时 cover.
   *
   * 两个方向都用 RAF 直接写 transform/clip/radius, 保证 cover 检测和节点写入路径一致.
   * opening 期间 logical currentStyle 保持浏览态目标, 避免 zoom/flip/load 被 cover 首帧污染.
   */
  startCoverFollow = ({
    phase,
    from,
    getTarget,
    fallback,
  }: {
    phase: CoverFollowPhase
    from: ImageStyleType
    getTarget: CoverFollowTargetGetter
    fallback: () => void
  }) => {
    this.cancelCoverFollow()
    this.debounceUpdateCurrentImageStyle.cancel()
    const node = this.imageRef.current
    if (!node) {
      // 理论上 show 切换时节点应存在; 兜底走原更新路径, 避免空 ref 直接丢状态.
      fallback()
      return
    }

    this.coverFollowStartTime = performance.now()
    this.coverFollowDuration = this.context.motion.browsingDuration
    this.coverFollowFromStyle = from
    this.coverFollowCurrentStyle = from
    this.coverFollowTargetGetter = getTarget
    this.motionPhase = phase

    // scroll handler 之前可能在 inline top 上写了滚动差; RAF 接管位置后必须复位.
    node.style.top = '50%'
    this.writeImageStyleToNode(node, from)

    const scheduleCoverFrame = () => {
      const currentNode = this.imageRef.current
      if (!currentNode || this.motionPhase !== phase || this.coverFollowFromStyle !== from) {
        return
      }
      currentNode.style.top = '50%'
      this.writeImageStyleToNode(currentNode, this.coverFollowCurrentStyle || from)
      if (this.coverFollowRaf === undefined) {
        this.coverFollowRaf = window.requestAnimationFrame(this.stepCoverFollow)
      }
    }

    if (phase === 'browsing-follow') {
      this.setCurrentStyle(getTarget(from), scheduleCoverFrame)
      return
    }

    this.setCurrentStyle(from)
    scheduleCoverFrame()
  }
  stepCoverFollow = () => {
    this.coverFollowRaf = undefined
    const node = this.imageRef.current
    const from = this.coverFollowFromStyle
    const startTime = this.coverFollowStartTime
    const duration = this.coverFollowDuration
    const getTarget = this.coverFollowTargetGetter
    if (!node || !from || startTime === undefined || duration === undefined || !getTarget) {
      this.cancelCoverFollow()
      return
    }

    const rawProgress = Math.min(1, (performance.now() - startTime) / duration)
    const eased = closingEase(rawProgress)

    const target = getTarget(from)
    const visual = lerpCoverStyle(from, target, eased)

    this.coverFollowCurrentStyle = visual
    this.writeImageStyleToNode(node, visual)

    if (rawProgress >= 1) {
      this.coverFollowFromStyle = undefined
      this.coverFollowCurrentStyle = undefined
      this.coverFollowStartTime = undefined
      this.coverFollowDuration = undefined
      this.coverFollowTargetGetter = undefined
      this.motionPhase = 'idle'
      this.writeImageStyleToNode(node, target)
      this.setCurrentStyle(target, this.maybeStartFlipPreload)
      return
    }

    this.coverFollowRaf = window.requestAnimationFrame(this.stepCoverFollow)
  }
  syncBrowsingFollowTarget = () => {
    if (this.motionPhase !== 'browsing-follow') return
    const from = this.coverFollowFromStyle
    const getTarget = this.coverFollowTargetGetter
    if (!from || !getTarget) return
    const visual = this.coverFollowCurrentStyle || from
    this.setCurrentStyle(getTarget(from), () => {
      const node = this.imageRef.current
      if (!node || this.motionPhase !== 'browsing-follow') return
      this.writeImageStyleToNode(node, this.coverFollowCurrentStyle || visual)
    })
  }
  completeBrowsingFollow = ({ startFlipPreload = true }: { startFlipPreload?: boolean } = {}) => {
    if (this.motionPhase !== 'browsing-follow') return
    const from = this.coverFollowFromStyle
    const getTarget = this.coverFollowTargetGetter
    if (!from || !getTarget) {
      this.cancelCoverFollow()
      return
    }
    const target = getTarget(from)
    this.cancelCoverFollow()
    const node = this.imageRef.current
    if (node) {
      node.style.top = '50%'
      this.writeImageStyleToNode(node, target)
    }
    this.setCurrentStyle(target, startFlipPreload ? this.maybeStartFlipPreload : undefined)
  }
  cancelCoverFollow = () => {
    if (this.coverFollowRaf !== undefined) {
      window.cancelAnimationFrame(this.coverFollowRaf)
      this.coverFollowRaf = undefined
    }
    this.coverFollowFromStyle = undefined
    this.coverFollowCurrentStyle = undefined
    this.coverFollowStartTime = undefined
    this.coverFollowDuration = undefined
    this.coverFollowTargetGetter = undefined
    if (this.motionPhase === 'closing-follow' || this.motionPhase === 'browsing-follow') {
      this.motionPhase = 'idle'
    }
  }
  cancelClosingFollow = () => {
    this.cancelCoverFollow()
  }
  getCurrentVisualStyle = (): ImageStyleType => {
    const { touchGesture } = this.state
    const { touch, opacity } = touchGesture.getTouchConfig()
    if ((this.motionPhase === 'closing-follow' || this.motionPhase === 'browsing-follow') &&
        this.coverFollowCurrentStyle) {
      return {
        ...this.coverFollowCurrentStyle,
        x: (this.coverFollowCurrentStyle.x ?? 0) + touch.x,
        y: this.coverFollowCurrentStyle.y + touch.y,
        opacity: opacity ?? this.coverFollowCurrentStyle.opacity,
      }
    }
    const { currentStyle } = this.state
    return {
      ...currentStyle,
      x: (currentStyle.x ?? 0) + touch.x,
      y: currentStyle.y + touch.y,
      opacity: opacity ?? currentStyle.opacity,
    }
  }
  getRenderCurrentStyle = (): ImageStyleType => {
    if ((this.motionPhase === 'closing-follow' || this.motionPhase === 'browsing-follow') &&
        this.coverFollowCurrentStyle) {
      return this.coverFollowCurrentStyle
    }
    return this.state.currentStyle
  }
  getCoverTargetStyle = (from: ImageStyleType): ImageStyleType => {
    const target = getCoverStyle(this.context, this.imageRef, this.state.touchGesture)
    return target._behavior === 'merge' ? { ...from, ...target } : target
  }
  /**
   * Scale 校准 transition 中断
   *
   * 触发时机: 页变化后, 目标页 dims 通过 onLoad 首次落地 (cdU 检测到 imageDimensions
   * 由 absent → present). 此刻 React 已在同一 commit 中把新 transform (= ownFitScale)
   * 写入 inline style, 浏览器即将根据 CSS rule 启动 350ms transform transition (从错误
   * 回退 scale 滑到正确 scale = 用户看到的"尺寸变化"动画).
   *
   * 在 cdU 中 (React commit 之后, 浏览器 paint 之前) 同步把 inline transition 改成 'none',
   * 浏览器看到 transition-property=none → 取消刚 schedule 的 transition → transform
   * 直接 snap 到正确值. 一帧后 RAF 把 inline transition 清空, React 重新 govern.
   *
   * 闭包捕获节点是为了快速翻页场景: imageRef 可能在 RAF 触发前指向新节点, 我们仍要
   * 恢复**之前被我们改过的那个节点**的 transition (以及对应的 -webkit-transition).
   */
  cancelScaleCalibrationAnimation = () => {
    const node = this.imageRef.current
    if (!node) return
    // 取消可能挂起的 debounce — line 184-186 路径或 handleImageLoad 都可能 schedule 过.
    // 即便它们 50ms 后用 setCurrentStyle 重写 transform 值是一致的 (React 不会变更 DOM),
    // 主动 cancel 让生命周期边界显式.
    this.debounceUpdateCurrentImageStyle.cancel()
    this.setNodeTransitionNone(node)
    if (this.calibrationRestoreRaf !== undefined) {
      window.cancelAnimationFrame(this.calibrationRestoreRaf)
    }
    this.calibrationRestoreRaf = window.requestAnimationFrame(() => {
      this.calibrationRestoreRaf = undefined
      if (node) {
        node.style.transition = ''
        node.style.removeProperty('-webkit-transition')
      }
    })
  }
  /**
   * 跳页 fade 应用
   *
   * 触发场景: 用户通过分页器跳到 ±2 预取环之外的页 (如 N=6 dot 0→3, 或 loop=false N=6 dot 0→5).
   * 此时所有旧 React key 与新 key 不对齐 (Browser cap pageWithStep 强制), 新 center 干净 fresh mount.
   * 给该节点加 `jumpFadeIn` class → 触发 CSS @keyframes 让 opacity 0→1 渐入.
   *
   * CSS animation 与 transition 是独立子系统, 与 setNodeTransitionNone 完全解耦, 慢网下 dim 到达
   * 触发的 scale 校准 interrupt 不会中断这段 fade.
   *
   * 闭包捕获节点是为了快速连续跳页时 timer 仍清理之前那个节点的 class (避免类残留).
   */
  applyJumpFadeIn = () => {
    const node = this.imageRef.current
    if (!node) return
    // CSS modules 会把 .jumpFadeIn 哈希成例如 _jumpFadeIn_xxx, 走 style.jumpFadeIn 取真实类名;
    // 测试环境 (vitest classNameStrategy='non-scoped') 下 style.jumpFadeIn === 'jumpFadeIn'.
    const jumpClass = style.jumpFadeIn
    if (!jumpClass) return
    // 强制 reflow 让 class 再次添加时 keyframe 重启 (避免连续跳页时第二次 class 不重新触发动画)
    node.classList.remove(jumpClass)
    void node.offsetWidth
    node.classList.add(jumpClass)
    if (this.jumpFadeTimer !== undefined) {
      clearTimeout(this.jumpFadeTimer)
    }
    this.jumpFadeTimer = setTimeout(() => {
      this.jumpFadeTimer = undefined
      if (node) node.classList.remove(jumpClass)
    }, animationDuration + 10)
  }
  consumePendingZoomMousePosition = () => {
    const pending = this.pendingZoomMousePosition
    if (!pending || !this.context.zoom || this.state.currentStyle._type !== 'zooming') {
      return
    }
    this.pendingZoomMousePosition = undefined
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, {
      clientX: pending.x,
      clientY: pending.y,
    }, { scale: this.getCurrentZoomTargetScale() })
    this.startZoomFollow(zoomingStyle)
  }
  getTouchPoint = (e: TouchEvent): Coordinate | null => {
    const touch = e.touches[0] || e.changedTouches[0]
    if (!touch) return null
    return { x: touch.clientX, y: touch.clientY }
  }
  getChangedTouchPoint = (e: TouchEvent): Coordinate | null => {
    const touch = e.changedTouches[0]
    if (!touch) return null
    return { x: touch.clientX, y: touch.clientY }
  }

  getActiveGesture = () => {
    const { gesture, set, zoom } = this.context
    if (zoom) return { swipe: false, dragExit: false }
    const swipe = gesture?.swipe
    const dragExit = gesture?.dragExit
    return {
      swipe: Array.isArray(set) && set.length > 1 && swipe && typeof swipe === 'object' ? swipe : false,
      dragExit: dragExit && typeof dragExit === 'object' ? dragExit : false,
    }
  }

  getSwipeBoundaryResistance = (touchGesture: TouchGesture) => {
    const { gesture, loop, page, set } = this.context
    if (loop || touchGesture.state !== 'swiping' || !Array.isArray(set) || set.length <= 1) return undefined
    const swipe = gesture?.swipe
    if (!swipe || typeof swipe !== 'object') return undefined
    const offset = touchGesture.getOffset()
    const atFirstDraggingRight = page === 0 && offset.x > 0
    const atLastDraggingLeft = page === set.length - 1 && offset.x < 0
    return atFirstDraggingRight || atLastDraggingLeft ? swipe.resistance : undefined
  }

  commitTouchGestureResult = (result: TouchGestureResult) => {
    if (!result.accepted) return
    const { outBrowsing, toPrevPage, toNextPage } = this.context
    if (result.kind === 'swipe') {
      result.offset.x < 0 ? toNextPage() : toPrevPage()
    } else if (result.kind === 'dragExit') {
      outBrowsing()
    }
  }

  setTouchGesture = (nextGesture: TouchGesture, callback?: () => void) => {
    if (nextGesture) {
      this.touchGesture = nextGesture
      this.setState({
        touchGesture: nextGesture
      }, callback)
    }
  }
  // 给定 set 索引算它自己的 fit-scale (browsing 态用); 没收集到 dimensions 返回 null,
  // 调用方 fallback 到 currentStyle.scale (老行为) 兼容首次渲染前的状态.
  getOwnFitScale = (imageIndex: number, rotate = 0): number | null => {
    const dims = this.state.imageDimensions[imageIndex]
    if (!dims) return null
    const { edge } = this.context
    return calcFitScale(dims.w, dims.h, edge ?? 0, getViewportRect(this.context), rotate)
  }

  getStyle = (step: number, distance: number, isSideImage: boolean, imageIndex: number): CSSProperties => {
    const { animate, set, zoom, page } = this.context
    const { invalidate, currentStyle, touchGesture, animateConfig } = this.state
    const renderCurrentStyle = isSideImage ? currentStyle : this.getRenderCurrentStyle()
    const flipKind = selectFlipKind(animate)
    let transform, zIndex, pointerEvents, appliedScale
    // 获取动画配置
    // eslint-disable-next-line prefer-const
    let { offset, overflow, opacity, blur } = animateConfig
    // 获取触摸配置
    const { touch, opacity: touchOpacity, transition } = touchGesture.getTouchConfig({ resistance: this.getSwipeBoundaryResistance(touchGesture) })
    // 计算样式
    if (isSideImage) {
      // side image 用自己的 fit-scale (而不是 center 的) — 修复 #167:
      //  · 翻页变 center 时 scale 已经是新页正确值, 没有突变 = 没有"附赠缩放动画"
      //  · swipe 模式下, side 自己物理宽度 + 自己半宽 + gap 决定 offset, 不会"探头进镜头"
      // browsing 态以外 (cover/zoom) side 不会渲染, 不用考虑.
      const ownScale = currentStyle._type === 'browsing' ? this.getOwnFitScale(imageIndex) : null
      const sideScale = (ownScale ?? (currentStyle.scale || 0)) + overflow
      appliedScale = sideScale
      const effectiveOffset = getSideImageOffset({
        flipKind,
        baseOffset: offset,
        ownScale,
        dims: this.state.imageDimensions[imageIndex],
        viewport: getViewportRect(this.context),
      })
      // 仅对左右两张图做滑动跟踪
      const x = distance === 1 ? (currentStyle.x || 0) + touch.x + effectiveOffset * step : (currentStyle.x || 0) + effectiveOffset * step
      const y = currentStyle.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${sideScale}, ${sideScale}, 1) rotate3d(0, 0, 1, 0deg)`
      zIndex = 10 * distance
      pointerEvents = 'none'
    } else {
      // center: browsing 态优先用 set[page] 自己的 fit-scale (跟 side 同源), 翻页瞬间
      // 不出现 scale transition — currentStyle.scale 由 debounce 异步更新, 没赶上当前帧.
      // cover / zoom 态仍用 currentStyle.scale (那时 currentStyle 含 cover-anim / zoom scale 几何).
      const ownScale = renderCurrentStyle._type === 'browsing' ? this.getOwnFitScale(page, renderCurrentStyle.rotate ?? this.context.rotate ?? 0) : null
      const centerScale = ownScale ?? (renderCurrentStyle.scale ?? 0)
      appliedScale = centerScale
      const x = (renderCurrentStyle.x || 0) + touch.x
      const y = renderCurrentStyle.y + touch.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${centerScale}, ${centerScale}, 1) rotate3d(0, 0, 1, ${renderCurrentStyle.rotate}deg)`
      zIndex = 10
      opacity = touchOpacity ?? renderCurrentStyle.opacity ?? 1
    }
    const styleForNode = isSideImage ? currentStyle : renderCurrentStyle
    const radius = styleForNode.radius ?? 0
    const localRadius = getLocalRadius(radius, appliedScale || 1)
    const clipPath = getClipPath(styleForNode.clip, radius, appliedScale || 1)
    const filter = typeof blur === 'number'
      ? isSideImage ? `blur(${blur}px)` : 'blur(0px)'
      : undefined
    return {
      ...withVendorPrefix({ transform }),
      ...(clipPath ? withVendorPrefix({ clipPath }) : {}),
      ...(filter ? { filter } : {}),
      ...(typeof styleForNode.radius === 'number' ? { borderRadius: `${localRadius}px` } : {}),
      cursor: zoom ? 'zoom-out' : 'initial',
      zIndex,
      opacity: invalidate ? 0 : opacity,
      transition: applyMotionTransition(getImageTransition({
        role: isSideImage ? 'side' : 'center',
        motionPhase: this.motionPhase,
        touchTransition: transition,
        flip: flipKind,
        imageType: styleForNode._type,
      }), this.context.motion),
      pointerEvents,
      ...set[page].style,
    } as CSSProperties
  }

  /**
   * 圖片構建
   **/
  buildImageSeries = (edge: 0 | 1 | 2 | 3) => {
    const { flipPreloadStarted, loop = false, set, page, animate } = this.context
    // animate.flip === 'none' 时跳过相邻页渲染, 翻页通过中心图 key 变化触发瞬间替换 (无 transition).
    const flipKind = selectFlipKind(animate)
    if (set.length > 1 && flipKind !== 'none' && flipKind !== false && flipPreloadStarted) {
      const rangeList = mirrorRange(edge)
      return rangeList.reduce((acc, step) => {
        // 計算索引
        const imageIndex = getTargetPage(page, set.length, step, { loop })
        if (isInteger(imageIndex)) {
          const ele = this.buildImage({ step, imageIndex })
          ele && acc.push(ele)
        }
        return acc
      }, [] as React.JSX.Element[])
    }
    const center = this.buildImage({ step: 0, imageIndex: page })
    return center ? [center] : []
  }
  buildImage = ({ step = 0, imageIndex = 0 }: { step?: number, imageIndex?: number } = {}) => {
    const { set, show, zoom, page, pageWithStep } = this.context
    const { invalidate, currentStyle } = this.state
    // 是否邊圖
    const distance = Math.abs(step)
    const isSideImage = distance > 0
    // 计算真实索引
    const imageIndexWithStep = pageWithStep + step
    // 計算樣式
    const imageStyle = this.getStyle(step, distance, isSideImage, imageIndex)
    const imageClass = cx(style.imageLayer, set[imageIndex].className, {
      [style.zooming]: zoom,
      [style.invalidate]: invalidate,
    })
    // 組裝屬性
    const key = `${imageIndexWithStep}-${set[imageIndex].src}`
    // side / center 共用同一个 onLoad 收集 dimensions, 让 side image 拿到自己的 fit-scale (#167).
    // center 在收集后还要走 handleImageLoad 维护 currentStyle.
    const sideOnLoad = (e: React.SyntheticEvent<HTMLImageElement>) => this.handleSideImageLoad(step, imageIndex, e)
    const centerOnLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      this.handleRecordImageDimensions(imageIndex, e)
      this.handleImageLoad()
    }
    const commonProps = {
      style: imageStyle,
      className: imageClass,
      src: appendParams(set[imageIndex].src, { t: this.handleGetTimestamp(page) }),
      alt: set[imageIndex].alt,
      onLoad: sideOnLoad,
    }
    const centerProps = {
      id: 'zmageImage',
      ref: this.setCenterImageRef,
      onLoad: centerOnLoad,
      onError: this.handleImageError,
      onClick: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
    }
    // 構建内容
    if (isSideImage) {
      const sideImageShow = show && !zoom && currentStyle._type !== 'zooming'
      return sideImageShow && <img key={key} {...commonProps} ref={this.setSideImageAbortRef(key, step)} onError={() => this.handleSideImageTerminal(step)}/>
    } else {
      return <img key={key} {...commonProps} {...centerProps}/>
    }
  }

  render () {

    const { show, pageIsCover } = this.context
    const { isFetching, invalidate } = this.state
    return (
      <Fragment>

        {/*加载 (仅在默认图片非封面, 或图片不可用时显示)*/}
        <Loading
          show={show && (!pageIsCover || invalidate)}
          load={isFetching}
          invalidate={invalidate}
          onReload={this.handleImageReload}
        />

        {/*图片*/}
        {this.buildImageSeries(2)}

      </Fragment>
    )
  }
}

Image.contextType = Context
