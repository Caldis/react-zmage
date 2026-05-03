/**
 * 容器层
 * 储存主要状态
 **/

// Libs
import React, { RefObject } from 'react'
// Style
import style from './Browser.module.less'
// Components
import Portals from '../Portal'
import Control from '../Control'
import Caption from '../Caption'
import Image from '../Image'
import Background from '../Background'
// Utils
import { Context } from '../context'
import type { ContextType, FlipDirection, ZoomTrigger } from '../context'
import { disableScroll, downloadFromLink, enableScroll, getTargetPage, resolveShortestStep, unlockTouchInteraction } from '../../utils'
import { matchAnyHotKey, resolveHotKeyValue, resolveSideBinding } from '../../utils/hotkey'
import { defPropsWithEnv, resolvePreset } from '../../types/default'
import { createMotionRuntime, getMotionDurationMultiplierFromEvent, isSlowMotionEnabled, motionDefaultDurationMultiplier, normalizeMotionDurationMultiplier } from '../../config/motion'
import type { MotionTriggerEvent } from '../../config/motion'
import { probeStylesheet } from '../../utils/styleProbe'
import { getControllerLayoutStyle, hideCover, pageIsCover, pageSet, showCover } from './Browser.utils'
import { Animate, ControllerLayoutTarget, ControllerLayoutTargets, ControllerOverlayLayout, ControllerSet, FunctionalParams, GestureSet, HotKey, InterfaceAndInteractionParams, LifeCycleParams, PresetParams, Set } from '../../types/global'
import { normalizeGestureSet, resolveGestureTouchAction, selectFlipKind } from '../Image/Image.utils'

export interface Props extends PresetParams, FunctionalParams, InterfaceAndInteractionParams, LifeCycleParams {
  // Controlled status
  isBrowsingControlled: boolean
  browsing: boolean
  // Internal
  coverRef: RefObject<HTMLImageElement>
  coverPos?: Coordinate
  outBrowsing: (event?: MotionTriggerEvent) => void
  motionDurationMultiplier?: number
  // Set Normalized BaseParams
  set: Set[]
  defaultPage: number
}

export interface State {
  // 载入
  mounted: boolean
  // Image 首帧会读取 viewport 几何; 等 ref 落地后再挂载 Image, 避免 fallback 到 document 宽度.
  viewportReady: boolean
  // 显示
  show: boolean
  // 缩放
  zoom: boolean
  zoomTrigger?: ZoomTrigger
  zoomPosition?: Coordinate
  // 当前图原生尺寸是否大于视口 — 决定空格/按钮是否能进入 zoom 状态
  // 默认 true: 图片未加载完时保持兼容旧行为
  canZoom: boolean
  // 当前图无法进一步放大时, 用户从键盘触发空格的视觉反馈计数
  // Control 层用 useEffect 监听变化, 强制重放放大按钮的 shake 动画
  zoomShakeKey: number
  // 旋转
  rotate: number
  // 动画调试管线: 1 为正常速度, dev + Shift 时可临时放慢
  motionDurationMultiplier: number
  // 页数
  page: number
  pageIsCover: boolean
  pageWithStep: number
  // 首次 browsing-in 稳态前不挂载 side image; 稳态后才开始加载相邻页.
  flipPreloadStarted: boolean
  flipReadyPrev: boolean
  flipReadyNext: boolean
}

type ControllerLayoutTargetKey = keyof ControllerLayoutTargets
type ControllerLayoutInsetObject = Exclude<ControllerLayoutTarget['inset'], number | string | undefined>

const CONTROLLER_LAYOUT_TARGETS: ControllerLayoutTargetKey[] = ['toolbar', 'pagination', 'caption', 'flip']

const isLayoutInsetObject = (inset: ControllerLayoutTarget['inset']): inset is ControllerLayoutInsetObject => {
  return !!inset && typeof inset === 'object'
}

const mergeControllerLayoutTarget = (
  fallback: ControllerLayoutTarget | undefined,
  override: ControllerLayoutTarget | undefined,
): ControllerLayoutTarget | undefined => {
  if (!fallback && !override) return undefined

  const next: ControllerLayoutTarget = { ...fallback, ...override }
  if (isLayoutInsetObject(fallback?.inset) && isLayoutInsetObject(override?.inset)) {
    next.inset = { ...fallback.inset, ...override.inset }
  }
  return next
}

const mergeControllerLayoutTargets = (
  fallback: ControllerLayoutTargets | undefined,
  override: ControllerLayoutTargets | undefined,
): ControllerLayoutTargets | undefined => {
  const next: ControllerLayoutTargets = {}

  CONTROLLER_LAYOUT_TARGETS.forEach(target => {
    const merged = mergeControllerLayoutTarget(fallback?.[target], override?.[target])
    if (merged) {
      next[target] = merged
    }
  })

  return Object.keys(next).length > 0 ? next : undefined
}

const mergeControllerLayout = (
  fallback: ControllerOverlayLayout | undefined,
  override: ControllerOverlayLayout | undefined,
): ControllerOverlayLayout | undefined => {
  const base = mergeControllerLayoutTargets(fallback, override)
  const mobile = mergeControllerLayoutTargets(fallback?.mobile, override?.mobile)

  if (!base && !mobile) return undefined
  return {
    ...base,
    ...(mobile ? { mobile } : {}),
  }
}

export default class Browser extends React.Component<Props, State> {

  // Types
  context: ContextType
  // Defaults
  static defaultProps = {
    // Controlled status
    isBrowsingControlled: false,
    browsing: false,
    // Internal
    coverRef: React.createRef(),
    outBrowsing: () => {},
    motionDurationMultiplier: motionDefaultDurationMultiplier,
    // Data
    defaultPage: 0,
    set: [] as Set[],
  }

  // 异步动作句柄 — 卸载时必须取消, 否则 StrictMode/快速卸载下会在已卸载组件上 setState 并跳过副作用清理
  initRaf?: number
  unInitTimer?: ReturnType<typeof setTimeout>
  coverHideTimer?: ReturnType<typeof setTimeout>
  flipPreloadTimer?: ReturnType<typeof setTimeout>
  listeningMouseMove = false
  lastPointerPosition?: Coordinate
  shiftKeyActive = false
  viewportRef = React.createRef<HTMLDivElement>()

  getControllerConfig = (controller: Props['controller'], fallback: ControllerSet): ControllerSet => {
    if (controller === false) return {}

    const override = typeof controller === 'object' ? controller : {}
    const next: ControllerSet = {
      ...fallback,
      ...override,
    }
    const layout = mergeControllerLayout(fallback.layout, override.layout)
    if (layout) {
      next.layout = layout
    } else {
      delete next.layout
    }

    return next
  }

  getHotKeyConfig = (hotKey: Props['hotKey'], fallback: HotKey): HotKey => (
    hotKey === false ? {} : { ...fallback, ...(typeof hotKey === 'object' ? hotKey : {}) }
  )

  getAnimateCoverConfig = (animate: Props['animate'], fallback: Animate): Animate['cover'] => {
    const fallbackCover = fallback.cover
    if (animate === false) return false
    const inputCover = animate && typeof animate === 'object' ? animate.cover : undefined
    if (inputCover === false) return false
    if (inputCover === true || inputCover === undefined) return fallbackCover
    const base = fallbackCover && typeof fallbackCover === 'object' ? fallbackCover : {}
    return { ...base, ...inputCover }
  }

  getAnimateConfig = (animate: Props['animate'], fallback: Animate): Animate => (
    animate === false
      ? { browsing: false, flip: false, cover: false } as unknown as Animate
      : {
        ...fallback,
        ...(typeof animate === 'object' ? animate : {}),
        cover: this.getAnimateCoverConfig(animate, fallback),
      }
  )

  getGestureConfig = (gesture: Props['gesture'], fallback: GestureSet): GestureSet => (
    normalizeGestureSet(gesture, fallback)
  )

  getClosingRotate = () => {
    const { rotate } = this.state
    return Math.round(rotate / 360) * 360
  }

  // State
  readonly state = (() => {
    const { coverRef, defaultPage, set } = this.props
    const { page, pageIsCover } = pageSet(coverRef, defaultPage, set)
    return {
      // 载入
      mounted: false,
      viewportReady: false,
      // 显示
      show: false,
      // 缩放
      zoom: false,
      canZoom: true,
      zoomShakeKey: 0,
      // 旋转
      rotate: 0,
      // 动画
      motionDurationMultiplier: motionDefaultDurationMultiplier,
      // 页数
      page,
      pageIsCover,
      pageWithStep: page,
      flipPreloadStarted: false,
      flipReadyPrev: false,
      flipReadyNext: false,
    }
  })()

  componentDidMount () {
    probeStylesheet()
    if (this.props.browsing) {
      this.init()
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    if (nextProps.browsing) {
      return {
        mounted: true,
        // 仅在当前状态为未查看时重置页面状态
        ...(!prevState.show ? pageSet(nextProps.coverRef, nextProps.defaultPage, nextProps.set) : {}),
      }
    }
    return null
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.browsing !== this.props.browsing) {
      if (this.props.browsing) {
        this.init()
      } else {
        this.unInit()
      }
    }
  }

  componentWillUnmount () {
    // 卸载前取消所有挂起异步, 避免在已卸载组件上 setState
    this.cancelInitRaf()
    this.cancelUnInitTimer()
    this.clearCoverHideTimer()
    this.clearFlipPreloadTimer()
    this.stopMouseMoveListener()
    this.unInit({ force: true })
  }

  /**
   * Props Getter
   * 如果需要读取 controller / hotKey / animate 需要由此读取
   */
  getPropsWithEnv = () => {
    const { preset, controller, hotKey, animate, gesture, radius, edge } = this.props
    const defProp = defPropsWithEnv(preset)
    const resolved = resolvePreset(preset)
    return {
      // Merge Props
      ...this.props,
      // Preset flags (driven by resolved preset so 'auto' picks the right branch)
      presetIsMobile: resolved === 'mobile',
      presetIsDesktop: resolved === 'desktop',
      // Preset-aware visual defaults. Explicit 0 must remain a valid override.
      radius: radius ?? defProp.radius,
      edge: edge ?? defProp.edge,
      // Control
      controller: this.getControllerConfig(controller, defProp.controller),
      hotKey: this.getHotKeyConfig(hotKey, defProp.hotKey),
      animate: this.getAnimateConfig(animate, defProp.animate),
      gesture: this.getGestureConfig(gesture, defProp.gesture),
    }
  }

  /**
   * 载入/卸载
   */
  cancelInitRaf = () => {
    if (this.initRaf !== undefined) {
      cancelAnimationFrame(this.initRaf)
      this.initRaf = undefined
    }
  }

  cancelUnInitTimer = () => {
    if (this.unInitTimer !== undefined) {
      clearTimeout(this.unInitTimer)
      this.unInitTimer = undefined
    }
  }

  clearCoverHideTimer = () => {
    if (this.coverHideTimer !== undefined) {
      clearTimeout(this.coverHideTimer)
      this.coverHideTimer = undefined
    }
  }

  clearFlipPreloadTimer = () => {
    if (this.flipPreloadTimer !== undefined) {
      clearTimeout(this.flipPreloadTimer)
      this.flipPreloadTimer = undefined
    }
  }

  showCoverNow = (coverRef: RefObject<HTMLImageElement>) => {
    this.clearCoverHideTimer()
    showCover(coverRef)
  }

  hideCoverAfterDelay = (coverRef: RefObject<HTMLImageElement>) => {
    this.clearCoverHideTimer()
    this.coverHideTimer = hideCover(coverRef, () => {
      this.coverHideTimer = undefined
    })
  }

  init = () => {
    this.cancelInitRaf()
    this.cancelUnInitTimer()
    this.clearFlipPreloadTimer()
    const {
      isBrowsingControlled,
      coverRef,
      coverPos,
      onBrowsing,
      hideOnScroll,
      coverVisible,
      presetIsDesktop
    } = this.getPropsWithEnv()
    const { show, pageIsCover } = this.state
    // Perform init only in un-show state
    if (!show) {
      // Only desktop should handle the keydown & scroll events
      if (presetIsDesktop) {
        // Capture phase + stopImmediatePropagation in handler — 阻止外层 modal/dialog
        // 在 zmage 处于浏览态时被同一次 ESC/方向键关掉。避免 #184 中"按 ESC 退查看器
        // 顺手把承载 zmage 的 modal 也一起关了"的事件流串扰。
        window.addEventListener('keydown', this.handleKeyDown, true)
        window.addEventListener('keyup', this.handleKeyUp, true)
        this.startMouseMoveListener()
        // Handle scroll from hide to prevent
        if (hideOnScroll) {
          // Listen to scroll to hide the browser
          window.addEventListener('scroll', this.handleScroll)
        } else {
          // Prevent page scroll
          disableScroll()
        }
      }
      this.lastPointerPosition = coverPos || this.lastPointerPosition
      const motionDurationMultiplier = normalizeMotionDurationMultiplier(this.props.motionDurationMultiplier)
      // Delay showing the browser
      this.initRaf = window.requestAnimationFrame(() => {
        this.initRaf = undefined
        this.setState({
          show: true,
          zoom: false,
          rotate: 0,
          motionDurationMultiplier,
          zoomTrigger: undefined,
          zoomPosition: undefined,
          canZoom: true,
          flipPreloadStarted: false,
          flipReadyPrev: false,
          flipReadyNext: false,
        }, () => {
          presetIsDesktop && pageIsCover && !coverVisible && this.hideCoverAfterDelay(coverRef)
          this.scheduleFlipPreloadAfterBrowsing()
          !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(true)
        })
      })
    }
  }
  unInit = ({ force } = { force: false }) => {
    this.cancelInitRaf()
    this.cancelUnInitTimer()
    this.clearFlipPreloadTimer()
    const {
      isBrowsingControlled,
      coverRef,
      onBrowsing,
      hideOnScroll,
      coverVisible,
      presetIsMobile,
      presetIsDesktop,
      animate,
    } = this.getPropsWithEnv()
    const { show, pageIsCover } = this.state
    if (show || force) {
      // === 同步清理: 不依赖动画时间, 不依赖 setState 回调 ===
      // 这部分必须立即执行, 否则卸载或快速重渲染时会留下监听器/滚动锁
      if (presetIsDesktop) {
        window.removeEventListener('keydown', this.handleKeyDown, true)
        window.removeEventListener('keyup', this.handleKeyUp, true)
        this.stopMouseMoveListener()
        if (hideOnScroll) {
          window.removeEventListener('scroll', this.handleScroll)
        } else {
          // Re-enable page scroll
          enableScroll()
        }
      }
      !pageIsCover && !coverVisible && this.showCoverNow(coverRef)
      this.shiftKeyActive = false

      // === 副作用回调 ===
      // 强制卸载路径下同步执行, 因为 setState 在卸载组件上会被丢弃
      // 正常关闭路径下放在动画结束后, 保证 UI 一致性
      const finalize = () => {
        presetIsMobile && unlockTouchInteraction()
        presetIsDesktop && pageIsCover && !coverVisible && this.showCoverNow(coverRef)
        !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(false)
      }

      if (force) {
        // 卸载/强制路径: 不再 setState (组件正在/已经被销毁), 直接执行 finalize
        finalize()
      } else {
        // 正常关闭路径: 走动画时间, 用句柄管理 timeout
        const closingRotate = this.getClosingRotate()
        const motion = createMotionRuntime(this.state.motionDurationMultiplier)
        // -10ms: 让 React state 在动画快结束时同步, 避免最后一帧的 flicker
        const closeDelay = animate.browsing === false
          ? 0
          : motion.browsingDuration - 10
        this.setState({
          show: false,
          zoom: false,
          rotate: closingRotate,
          zoomTrigger: undefined,
          zoomPosition: undefined,
          flipPreloadStarted: false,
          flipReadyPrev: false,
          flipReadyNext: false,
        }, () => {
          const finishClose = () => {
            this.unInitTimer = undefined
            this.setState({ mounted: false, viewportReady: false, rotate: 0, motionDurationMultiplier: motionDefaultDurationMultiplier }, finalize)
          }
          if (closeDelay === 0) {
            finishClose()
          } else {
            this.unInitTimer = setTimeout(finishClose, closeDelay)
          }
        })
      }
    }
  }

  handleViewportRef = (node: HTMLDivElement | null) => {
    this.viewportRef.current = node
    if (node && this.state.mounted && !this.state.viewportReady) {
      this.setState({ viewportReady: true })
    }
  }

  /**
   * 事件处理
   */
  handleOutBrowsing = (event?: MotionTriggerEvent) => {
    const { animate } = this.getPropsWithEnv()
    const motionTrigger = { shiftKey: Boolean(event?.shiftKey || this.shiftKeyActive) }
    const motionDurationMultiplier = getMotionDurationMultiplierFromEvent(motionTrigger, isSlowMotionEnabled(animate))
    const close = () => this.props.outBrowsing(motionTrigger)
    if (motionDurationMultiplier !== this.state.motionDurationMultiplier) {
      this.setState({ motionDurationMultiplier }, close)
    } else {
      close()
    }
  }
  handleKeyDown = (e: KeyboardEvent) => {
    this.shiftKeyActive = e.shiftKey
    const { set, hotKey } = this.getPropsWithEnv()
    const { zoom, page, canZoom } = this.state
    // 仅在 zmage 真正消费按键时阻断后续 listeners (#184: 浏览态下 ESC 不再
    // 顺手关掉外层 modal). 不消费时让事件自由冒泡, 由外层处理.
    const consume = () => {
      e.preventDefault()
      e.stopImmediatePropagation()
    }

    // 关闭 — 默认 'Escape'
    if (matchAnyHotKey(e, resolveHotKeyValue(hotKey.close, 'Escape'))) {
      consume()
      zoom ? this.handleToggleZoom() : this.handleOutBrowsing(e)
      return
    }
    // 缩放 — 默认 'Space'
    if (matchAnyHotKey(e, resolveHotKeyValue(hotKey.zoom, 'Space'))) {
      consume()
      // 图片已是原始尺寸: 不进入 zoom 状态(否则 ESC 会被多消耗一次), 仅重放放大按钮 shake
      if (!zoom && !canZoom) {
        this.handleTriggerZoomShake()
        return
      }
      this.handleToggleZoom('keyboard')
      return
    }
    // 上一张 — 默认 'ArrowLeft'; per-side 优先, umbrella flip 兜底
    if (matchAnyHotKey(e, resolveSideBinding(hotKey.flipLeft, hotKey.flip, 'ArrowLeft'))) {
      consume()
      // 边界/zoom 态拦截但不翻页 (避免页面滚动)
      if (zoom || !this.canFlipToDirection(-1)) return
      this.handleToPrevPage()
      return
    }
    // 下一张 — 默认 'ArrowRight'
    if (matchAnyHotKey(e, resolveSideBinding(hotKey.flipRight, hotKey.flip, 'ArrowRight'))) {
      consume()
      if (zoom || !this.canFlipToDirection(1)) return
      this.handleToNextPage()
      return
    }
    // 旋转 — 默认 'BracketLeft' / 'BracketRight' ([ / ]); per-side 优先, umbrella rotate 兜底
    // zoom 态下不旋转 (会破坏 zoom transform 复合, 与按钮控件保持同样的不可用语义)
    if (matchAnyHotKey(e, resolveSideBinding(hotKey.rotateLeft, hotKey.rotate, 'BracketLeft'))) {
      consume()
      if (zoom) return
      this.handleToggleRotate('left')()
      return
    }
    if (matchAnyHotKey(e, resolveSideBinding(hotKey.rotateRight, hotKey.rotate, 'BracketRight'))) {
      consume()
      if (zoom) return
      this.handleToggleRotate('right')()
      return
    }
    // 下载 — 默认 'Mod+S' (跨平台 ⌘/Ctrl + S, 与浏览器"另存为"肌肉记忆一致)
    // 必须 consume 以阻止浏览器默认 "Save Page As" 同时弹出
    if (matchAnyHotKey(e, resolveHotKeyValue(hotKey.download, 'Mod+S'))) {
      consume()
      const current = set[page]
      if (current?.src) downloadFromLink(current.src)
      return
    }
  }
  handleKeyUp = (e: KeyboardEvent) => {
    this.shiftKeyActive = e.shiftKey
  }
  handleScroll = () => {
    const { show } = this.state
    if (show) {
      this.handleOutBrowsing()
    }
  }
  handleMouseMove = (e: MouseEvent) => {
    this.lastPointerPosition = { x: e.clientX, y: e.clientY }
  }
  startMouseMoveListener = () => {
    if (this.listeningMouseMove) {
      return
    }
    window.addEventListener('mousemove', this.handleMouseMove)
    this.listeningMouseMove = true
  }
  stopMouseMoveListener = () => {
    if (!this.listeningMouseMove) {
      return
    }
    window.removeEventListener('mousemove', this.handleMouseMove)
    this.listeningMouseMove = false
  }

  /**
   * 翻页控制
   */
  requiresFlipPreload = () => {
    const { set, animate } = this.getPropsWithEnv()
    const flipKind = selectFlipKind(animate)
    return Array.isArray(set) && set.length > 1 && flipKind !== 'none' && flipKind !== false
  }
  canFlipToDirection = (direction: FlipDirection) => {
    const { set, loop = false } = this.getPropsWithEnv()
    const { page, flipReadyPrev, flipReadyNext } = this.state
    if (!Array.isArray(set) || set.length <= 1) return false
    if (!loop && direction < 0 && page === 0) return false
    if (!loop && direction > 0 && page === set.length - 1) return false
    if (!this.requiresFlipPreload()) return true
    return direction < 0 ? flipReadyPrev : flipReadyNext
  }
  handleStartFlipPreload = () => {
    if (!this.requiresFlipPreload() || this.state.flipPreloadStarted) {
      return
    }
    this.setState({ flipPreloadStarted: true })
  }
  scheduleFlipPreloadAfterBrowsing = () => {
    this.clearFlipPreloadTimer()
    if (!this.requiresFlipPreload()) {
      return
    }
    const { animate } = this.getPropsWithEnv()
    const motion = createMotionRuntime(this.state.motionDurationMultiplier)
    const delay = animate.browsing === false ? 0 : motion.browsingDuration
    this.flipPreloadTimer = setTimeout(() => {
      this.flipPreloadTimer = undefined
      if (!this.state.show || this.state.zoom) {
        return
      }
      this.handleStartFlipPreload()
    }, delay)
  }
  handleSetFlipReady = (direction: FlipDirection, ready = true) => {
    const key = direction < 0 ? 'flipReadyPrev' : 'flipReadyNext'
    if (this.state[key] === ready) {
      return
    }
    this.setState({ [key]: ready } as Pick<State, 'flipReadyPrev' | 'flipReadyNext'>)
  }
  handleToPage = (targetPage: number) => {
    const { page } = this.state
    const { set, loop = false } = this.props
    // loop 场景下用最短路径解析 step (如 N=6, 0→5: raw=+5 → -1, 让分页器走 ±2 预取环, 与左方向键路径合流)
    const raw = targetPage - page
    const step = (loop && set.length > 1) ? resolveShortestStep(raw, set.length) : raw
    this.handleSwitchPages(step)()
  }
  handleSwitchPages = (step: number) => {
    const { coverRef, onSwitching, loop = false } = this.props
    return () => {
      const { set } = this.props
      if (set.length > 1) {
        const { page, pageWithStep } = this.state
        if (Math.abs(step) === 1 && !this.canFlipToDirection(step < 0 ? -1 : 1)) {
          return
        }
        const targetPage = getTargetPage(page, set.length, step, { loop })
        if (typeof targetPage === 'number') {
          // 跳页 (|step|>2 = 超出 ±2 预取环) 时把 pageWithStep 推进量 cap 到 ±1, 强制让所有新 React key
          // 与旧 key 不对齐 → 全部 fresh mount, 既消灭"错向 reuse 扫掠" (#issue-0), 也给 Image cdU 留出
          // 干净的新 center 节点用于 jumpFadeIn class 视觉过渡.
          const advance = Math.abs(step) > 2 ? Math.sign(step) : step
          this.setState({
            page: targetPage,
            pageIsCover: pageIsCover(coverRef, set, targetPage),
            pageWithStep: pageWithStep + advance,
            zoom: false,
            zoomTrigger: undefined,
            zoomPosition: undefined,
            // 复位 canZoom 至允许态; 新图 onLoad 会重新评估并下发准确值
            canZoom: true,
            flipReadyPrev: false,
            flipReadyNext: false,
            rotate: 0,
          }, () => {
            typeof onSwitching === 'function' && onSwitching(targetPage)
          })
        }
      }
    }
  }
  handleToPrevPage = this.handleSwitchPages(-1)
  handleToNextPage = this.handleSwitchPages(1)

  /**
   * 缩放控制
   */
  handleToggleZoom = (trigger: ZoomTrigger = 'control') => {
    const { onZooming } = this.props
    const nextZoom = !this.state.zoom
    this.setState({
      zoom: nextZoom,
      zoomTrigger: nextZoom ? trigger : undefined,
      zoomPosition: nextZoom && trigger === 'keyboard' ? this.lastPointerPosition : undefined,
    }, () => {
      typeof onZooming === 'function' && onZooming(this.state.zoom)
    })
  }
  handleSetCanZoom = (canZoom: boolean) => {
    if (this.state.canZoom !== canZoom) {
      this.setState({ canZoom })
    }
  }
  handleTriggerZoomShake = () => {
    this.setState(({ zoomShakeKey }) => ({ zoomShakeKey: zoomShakeKey + 1 }))
  }
  handleViewportClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return
    }
    this.state.zoom ? this.handleToggleZoom() : this.handleOutBrowsing(e)
  }

  /**
   * 旋转控制
   */
  handleToggleRotate = (direction: '' | 'left' | 'right') => {
    const { onRotating } = this.props
    switch (direction) {
    case 'left':
      return () => this.setState(({ rotate }) => ({ rotate: rotate - 90 }), () => {
        typeof onRotating === 'function' && onRotating(this.state.rotate)
      })
    case 'right':
      return () => this.setState(({ rotate }) => ({ rotate: rotate + 90 }), () => {
        typeof onRotating === 'function' && onRotating(this.state.rotate)
      })
    default:
      return () => this.setState({ rotate: 0 }, () => {
        typeof onRotating === 'function' && onRotating(0)
      })
    }
  }

  render () {

    const {
      // Internal
      coverRef, coverPos,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate, gesture,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop, hideOnDblClick, loadingDelay,
      // Life cycle
      onError,
    } = this.getPropsWithEnv()
    const { mounted, viewportReady } = this.state

    const statusValue = { ...this.state }
    const motion = createMotionRuntime(this.state.motionDurationMultiplier)
    const controllerLayoutStyle = getControllerLayoutStyle(controller, presetIsMobile)

    const contextValue = {
      // Internal
      coverRef, coverPos, outBrowsing: this.handleOutBrowsing, viewportRef: this.viewportRef, motion,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate, gesture,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, radius, edge, loop, hideOnDblClick, loadingDelay,
      // Life cycle (only those Image/Caption need from context)
      onError,
      // Status
      ...statusValue,
      // Action
      toPage: this.handleToPage,
      toPrevPage: this.handleToPrevPage,
      toNextPage: this.handleToNextPage,
      toggleZoom: this.handleToggleZoom,
      toggleRotate: this.handleToggleRotate,
      setCanZoom: this.handleSetCanZoom,
      startFlipPreload: this.handleStartFlipPreload,
      setFlipReady: this.handleSetFlipReady,
    }

    return (
      <Context.Provider value={contextValue}>
        {
          mounted &&
          <Portals id="zmage" zIndex={zIndex} className={style.wrapperLayer} style={controllerLayoutStyle}>

            {/*背景层*/}
            <Background {...statusValue}/>

            <div
              id="zmageViewport"
              ref={this.handleViewportRef}
              className={style.viewportLayer}
              style={{ touchAction: resolveGestureTouchAction(gesture) }}
              onClick={this.handleViewportClick}
            >

              {/*控制层*/}
              <Control/>

              {/*文案层*/}
              <Caption/>

              {/*图片层: 等 viewport ref 可读后再挂载, 让首帧 cover 几何和 fixed overlay 同源.*/}
              {viewportReady && <Image {...statusValue}/>}

            </div>

          </Portals>
        }
      </Context.Provider>
    )
  }
}

Browser.contextType = Context
