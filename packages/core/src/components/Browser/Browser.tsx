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
import type { ContextType, ZoomTrigger } from '../context'
import { disableScroll, enableScroll, getTargetPage, unlockTouchInteraction } from '../../utils'
import { defPropsWithEnv, resolvePreset } from '../../types/default'
import { getBrowsingAnimationDuration } from '../../config/anim'
import { probeStylesheet } from '../../utils/styleProbe'
import { hideCover, pageIsCover, pageSet, showCover } from './Browser.utils'
import { Animate, ControllerSet, FunctionalParams, HotKey, InterfaceAndInteractionParams, LifeCycleParams, PresetParams, Set } from '../../types/global'

export interface Props extends PresetParams, FunctionalParams, InterfaceAndInteractionParams, LifeCycleParams {
  // Controlled status
  isBrowsingControlled: boolean
  browsing: boolean
  // Internal
  coverRef: RefObject<HTMLImageElement>
  coverPos?: Coordinate
  outBrowsing: () => void
  // Set Normalized BaseParams
  set: Set[]
  defaultPage: number
}

export interface State {
  // 载入
  mounted: boolean
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
  // 页数
  page: number
  pageIsCover: boolean
  pageWithStep: number
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
    // Data
    defaultPage: 0,
    set: [] as Set[],
  }

  // 异步动作句柄 — 卸载时必须取消, 否则 StrictMode/快速卸载下会在已卸载组件上 setState 并跳过副作用清理
  initRaf?: number
  unInitTimer?: ReturnType<typeof setTimeout>
  listeningMouseMove = false
  lastPointerPosition?: Coordinate
  viewportRef = React.createRef<HTMLDivElement>()

  getControllerConfig = (controller: Props['controller'], fallback: ControllerSet): ControllerSet => (
    controller === false ? {} : { ...fallback, ...(typeof controller === 'object' ? controller : {}) }
  )

  getHotKeyConfig = (hotKey: Props['hotKey'], fallback: HotKey): HotKey => (
    hotKey === false ? {} : { ...fallback, ...(typeof hotKey === 'object' ? hotKey : {}) }
  )

  getAnimateConfig = (animate: Props['animate'], fallback: Animate): Animate => (
    animate === false ? { browsing: false, flip: false } as unknown as Animate : { ...fallback, ...(typeof animate === 'object' ? animate : {}) }
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
      // 显示
      show: false,
      // 缩放
      zoom: false,
      canZoom: true,
      zoomShakeKey: 0,
      // 旋转
      rotate: 0,
      // 页数
      page,
      pageIsCover,
      pageWithStep: page,
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
    if (this.initRaf !== undefined) {
      cancelAnimationFrame(this.initRaf)
      this.initRaf = undefined
    }
    if (this.unInitTimer !== undefined) {
      clearTimeout(this.unInitTimer)
      this.unInitTimer = undefined
    }
    this.stopMouseMoveListener()
    this.unInit({ force: true })
  }

  /**
   * Props Getter
   * 如果需要读取 controller / hotKey / animate 需要由此读取
   */
  getPropsWithEnv = () => {
    const { preset, controller, hotKey, animate } = this.props
    const defProp = defPropsWithEnv(preset)
    const resolved = resolvePreset(preset)
    return {
      // Merge Props
      ...this.props,
      // Preset flags (driven by resolved preset so 'auto' picks the right branch)
      presetIsMobile: resolved === 'mobile',
      presetIsDesktop: resolved === 'desktop',
      // Control
      controller: this.getControllerConfig(controller, defProp.controller),
      hotKey: this.getHotKeyConfig(hotKey, defProp.hotKey),
      animate: this.getAnimateConfig(animate, defProp.animate),
    }
  }

  /**
   * 载入/卸载
   */
  init = () => {
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
      // Delay showing the browser
      this.initRaf = window.requestAnimationFrame(() => {
        this.initRaf = undefined
        this.setState({ show: true, zoom: false, rotate: 0, zoomTrigger: undefined, zoomPosition: undefined, canZoom: true }, () => {
          presetIsDesktop && pageIsCover && !coverVisible && hideCover(coverRef)
          !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(true)
        })
      })
    }
  }
  unInit = ({ force } = { force: false }) => {
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
        this.stopMouseMoveListener()
        if (hideOnScroll) {
          window.removeEventListener('scroll', this.handleScroll)
        } else {
          // Re-enable page scroll
          enableScroll()
        }
      }
      !pageIsCover && !coverVisible && showCover(coverRef)

      // === 副作用回调 ===
      // 强制卸载路径下同步执行, 因为 setState 在卸载组件上会被丢弃
      // 正常关闭路径下放在动画结束后, 保证 UI 一致性
      const finalize = () => {
        presetIsMobile && unlockTouchInteraction()
        presetIsDesktop && pageIsCover && !coverVisible && showCover(coverRef)
        !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(false)
      }

      if (force) {
        // 卸载/强制路径: 不再 setState (组件正在/已经被销毁), 直接执行 finalize
        finalize()
      } else {
        // 正常关闭路径: 走动画时间, 用句柄管理 timeout
        const closingRotate = this.getClosingRotate()
        // -10ms: 让 React state 在动画快结束时同步, 避免最后一帧的 flicker
        const closeDelay = animate.browsing === false
          ? 0
          : getBrowsingAnimationDuration(presetIsDesktop) - 10
        this.setState({ show: false, zoom: false, rotate: closingRotate, zoomTrigger: undefined, zoomPosition: undefined }, () => {
          const finishClose = () => {
            this.unInitTimer = undefined
            this.setState({ mounted: false, rotate: 0 }, finalize)
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

  /**
   * 事件处理
   */
  handleKeyDown = (e: KeyboardEvent) => {
    const { set, hotKey, loop, outBrowsing } = this.getPropsWithEnv()
    const { zoom, page, canZoom } = this.state
    // 仅在 zmage 真正消费按键时阻断后续 listeners (#184: 浏览态下 ESC 不再
    // 顺手关掉外层 modal). 不消费时让事件自由冒泡, 由外层处理.
    const consume = () => {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    // 判斷按鍵編碼
    switch (e.keyCode) {
    case 27: // Escape
      // 退出 — 仅在 hotKey.close 为 true 时消费, 否则交给外层 (modal/dialog)
      if (!hotKey.close) return
      consume()
      zoom ? this.handleToggleZoom() : outBrowsing()
      break
    case 32: // SpaceBar
      // 缩放 — 仅在 hotKey.zoom 为 true 时消费
      if (!hotKey.zoom) return
      consume()
      // 图片已是原始尺寸: 不进入 zoom 状态(否则 ESC 会被多消耗一次), 仅重放放大按钮 shake
      if (!zoom && !canZoom) {
        this.handleTriggerZoomShake()
        break
      }
      this.handleToggleZoom('keyboard')
      break
    case 37: // ArrowLeft
      // 上一张 — hotKey 开关决定是否拦截; 边界/zoom 态拦截但不翻页 (避免页面滚动)
      if (!(hotKey.flipLeft || hotKey.flip)) return
      consume()
      if (zoom || (!loop && page === 0)) break
      this.handleToPrevPage()
      break
    case 39: // ArrowRight — 同 ArrowLeft 语义
      if (!(hotKey.flipRight || hotKey.flip)) return
      consume()
      if (zoom || (!loop && page === set.length - 1)) break
      this.handleToNextPage()
      break
    default:
      return
    }
  }
  handleScroll = () => {
    const { outBrowsing } = this.props
    const { show } = this.state
    if (show) {
      outBrowsing()
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
  handleToPage = (targetPage: number) => {
    const { page } = this.state
    this.handleSwitchPages(targetPage - page)()
  }
  handleSwitchPages = (step: number) => {
    const { coverRef, onSwitching, loop = false } = this.props
    return () => {
      const { set } = this.props
      if (set.length > 1) {
        const { page, pageWithStep } = this.state
        const targetPage = getTargetPage(page, set.length, step, { loop })
        if (typeof targetPage === 'number') {
          this.setState({
            page: targetPage,
            pageIsCover: pageIsCover(coverRef, set, targetPage),
            pageWithStep: pageWithStep + step,
            zoom: false,
            zoomTrigger: undefined,
            zoomPosition: undefined,
            // 复位 canZoom 至允许态; 新图 onLoad 会重新评估并下发准确值
            canZoom: true,
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
    this.state.zoom ? this.handleToggleZoom() : this.props.outBrowsing()
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
      coverRef, coverPos, outBrowsing,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop, closeOnDoubleClick,
      // Life cycle
      onError,
    } = this.getPropsWithEnv()
    const { mounted } = this.state

    const statusValue = { ...this.state }

    const contextValue = {
      // Internal
      coverRef, coverPos, outBrowsing, viewportRef: this.viewportRef,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, radius, edge, loop, closeOnDoubleClick,
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
    }

    return (
      <Context.Provider value={contextValue}>
        {
          mounted &&
          <Portals id="zmage" zIndex={zIndex} className={style.wrapperLayer}>

            {/*背景层*/}
            <Background {...statusValue}/>

            <div
              id="zmageViewport"
              ref={this.viewportRef}
              className={style.viewportLayer}
              onClick={this.handleViewportClick}
            >

              {/*控制层*/}
              <Control/>

              {/*文案层*/}
              <Caption/>

              {/*图片层*/}
              <Image {...statusValue}/>

            </div>

          </Portals>
        }
      </Context.Provider>
    )
  }
}

Browser.contextType = Context
