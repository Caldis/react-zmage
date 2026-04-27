/**
 * 图片层
 * 控制图片尺寸
 **/

// Libs
import classnames from 'classnames'
import React, { CSSProperties, Fragment } from 'react'
// Styles
import style from './Image.module.less'
// Components
import Loading from './loading'
// Utils
import { Animate } from '../../types/global'
import { BrowsingParams, Context, ContextType } from '../context'
import {
  appendParams,
  checkImageLoadedComplete,
  debounce,
  getTargetPage,
  isInteger,
  lockTouchInteraction,
  mirrorRange,
  withVendorPrefix,
} from '../../utils'
import {
  getAnimateConfig,
  getCoverStyle,
  getCurrentImageStyle,
  getZoomingStyle,
  ImageAnimateType,
  ImageStyleType,
  TOUCH_BEHAVIOR_PHASE,
  TOUCH_BEHAVIOR_TYPE,
  TouchProfile,
} from './Image.utils'

type PropsType = BrowsingParams

interface StateType {
  // 加载状态
  isFetching: boolean
  invalidate: boolean
  // 样式
  currentStyle: ImageStyleType,
  // 动画
  animateConfig: ImageAnimateType
  // 触控
  touchProfile: TouchProfile
  // 时间戳 Flag
  timestamp: { [ImageUrl: string]: number },
  // 鼠标驱动的 zoom 跟随: true 时该次 render transition 强制为 'none', 用于消除 mousemove 粘滞
  zoomMouseDriven: boolean,
}

export default class Image extends React.Component<PropsType, StateType> {

  // Types
  context: ContextType

  // Refs
  imageRef = React.createRef<HTMLImageElement>()
  // 初始页面高度
  initialPageOffset = typeof window !== 'undefined' ? window.pageYOffset : 0
  // 监听状态
  listeningMouseMove: boolean
  // 图片加载
  imageLoadingTimer: ReturnType<typeof setInterval>
  // 延迟监听器注册的 RAF 句柄 — 卸载时必须 cancel, 否则 StrictMode 双 mount 会泄漏监听
  pendingRafHandles: number[] = []
  browsingTransitionRaf?: number
  suppressBrowsingTransition = false
  // zoom 内首次 mousemove 已被认领 (用 instance prop 避免同帧多次 mousemove 竞态;
  // 第一次 setState 不翻 zoomMouseDriven 让那一帧走 CSS 350ms transition,
  // 第二次 mousemove 才把 zoomMouseDriven 翻 true 进入即时跟随)
  zoomTrackingClaimed = false
  // State
  readonly state = {
    // 加载状态
    isFetching: true,
    invalidate: false,
    // 样式
    currentStyle: getCoverStyle(this.context),
    // 动画
    animateConfig: getAnimateConfig(this.context.animate?.flip),
    // 触控
    touchProfile: new TouchProfile(),
    // 时间戳 Flag
    timestamp: {},
    // 鼠标驱动的 zoom 跟随标志
    zoomMouseDriven: false,
  } as StateType

  componentDidMount () {
    const { presetIsMobile, presetIsDesktop, hideOnScroll } = this.context
    window.addEventListener('resize', this.handleResize)
    if (presetIsMobile) {
      this.pendingRafHandles.push(window.requestAnimationFrame(() => {
        window.addEventListener('touchstart', this.handleTouchStart)
        window.addEventListener('touchmove', this.handleTouchMove)
        window.addEventListener('touchend', this.handleTouchEnd)
      }))
    }
    if (presetIsDesktop && hideOnScroll) {
      this.pendingRafHandles.push(window.requestAnimationFrame(() => {
        window.addEventListener('scroll', this.handleScroll)
      }))
    }
  }

  componentDidUpdate (prevProps: BrowsingParams) {
    const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
    const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
    const { animate, presetIsMobile } = this.context
    // zoom 状态切换 (无论开还是关) 重置鼠标跟随状态:
    //   - zoomMouseDriven 翻 false 让 cover↔zoom 走 350ms 过渡
    //   - zoomTrackingClaimed 重置, 让下一次 enter zoom 后第一次 mousemove 重新走"首次动画"路径
    if (prevZoom !== currZoom) {
      this.zoomTrackingClaimed = false
      if (this.state.zoomMouseDriven) {
        this.setState({ zoomMouseDriven: false })
      }
    }
    // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
    if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
      const updateStyle = () => {
        if (prevShow !== currShow && animate?.browsing === false) {
          this.updateCurrentImageStyleWithoutBrowsingTransition()
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
      // 显示加载
      this.handleImageLoadStart()
    }
  }

  componentWillUnmount () {
    const { presetIsMobile, presetIsDesktop } = this.context
    // 取消所有还未触发的 RAF, 防止 unmount 后再注册监听 (StrictMode 双 mount 泄漏的根因)
    this.pendingRafHandles.forEach(handle => window.cancelAnimationFrame(handle))
    this.pendingRafHandles = []
    if (this.browsingTransitionRaf !== undefined) {
      window.cancelAnimationFrame(this.browsingTransitionRaf)
      this.browsingTransitionRaf = undefined
    }
    // 取消挂起的 debounce, 避免在已卸载组件上 setState
    this.debounceUpdateCurrentImageStyle.cancel()
    if (presetIsMobile) {
      window.removeEventListener('touchstart', this.handleTouchStart)
      window.removeEventListener('touchmove', this.handleTouchMove)
      window.removeEventListener('touchend', this.handleTouchEnd)
    }
    if (presetIsDesktop) {
      window.removeEventListener('scroll', this.handleScroll)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.handleMouseMove)
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
  }

  /**
   * 信息更新
   **/
  updateCurrentImageStyle = () => {
    const { touchProfile } = this.state
    const nextStyle = getCurrentImageStyle(this.context, this.imageRef, touchProfile)
    this.setCurrentStyle(nextStyle)
  }
  updateCurrentImageStyleWithoutBrowsingTransition = () => {
    const { touchProfile } = this.state
    const nextStyle = getCurrentImageStyle(this.context, this.imageRef, touchProfile)
    this.suppressBrowsingTransition = true
    this.setCurrentStyle(nextStyle, () => {
      if (this.browsingTransitionRaf !== undefined) {
        window.cancelAnimationFrame(this.browsingTransitionRaf)
      }
      this.browsingTransitionRaf = window.requestAnimationFrame(() => {
        this.browsingTransitionRaf = undefined
        this.suppressBrowsingTransition = false
      })
    })
  }
  debounceUpdateCurrentImageStyle = debounce(this.updateCurrentImageStyle, 50)

  /**
   * 事件响应
   **/
  // 页面事件
  handleResize = () => {
    this.debounceUpdateCurrentImageStyle()
  }
  handleScroll = () => {
    if (this.imageRef.current) {
      const { show } = this.context
      this.imageRef.current.style.top = `calc(50% + ${show ? 0 : this.initialPageOffset - window.pageYOffset}px)`
    }
  }
  handleClick = () => {
    const { zoom, toggleZoom } = this.context
    zoom && toggleZoom()
  }
  // 触摸事件
  handleTouchStart = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0]
    this.setTouchProfile(new TouchProfile({ origin: { x: clientX, y: clientY } }))
  }
  handleTouchMove = (e: TouchEvent) => {
    const { touchProfile } = this.state
    const { clientX, clientY } = e.touches[0]
    this.setTouchProfile(touchProfile.update({ origin: { x: clientX, y: clientY } }))
  }
  handleTouchEnd = () => {
    const { touchProfile } = this.state
    this.setTouchProfile(touchProfile.end())
  }
  // 鼠标事件
  handleMouseMove = (e: MouseEvent) => {
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, e)
    const { currentStyle } = this.state
    const inZoomingState = currentStyle._type === 'zooming'
    const nextStyle = zoomingStyle._behavior === 'merge'
      ? { ...currentStyle, ...zoomingStyle }
      : zoomingStyle

    // 三态分支:
    //   1. 还没切到 zooming 态 (enter zoom 的 debounce 还没触发) → 直接更新 currentStyle,
    //      不动 zoomMouseDriven, 让 cover→zoom 自己走 350ms 缩放.
    //   2. 已经在 zooming 但本轮 zoom session 还没认领过 mousemove → 这是用户第一次动鼠标,
    //      currentStyle 之前是 "centered 1:1", 现在变成 "mouse-positioned 1:1". 仅更新
    //      currentStyle, 不翻 zoomMouseDriven, 让这一帧的 transform 变化走 CSS 基类 350ms.
    //      不要在 raf 里翻 zoomMouseDriven=true — Chromium/Webkit 把 transition 改成 'none'
    //      会取消 in-flight transition, transform 直接 snap, 首次动画就被吃掉.
    //      让 flag 在第二次 mousemove 自然翻 true: 那次必然伴随 transform 变化, 浏览器看到
    //      transform + transition: 'none' 同时改 → 直接 snap (期望的即时跟随), 或者用户从此
    //      不再动鼠标, 单次动画自由完成.
    //   3. 已经认领过 → setState 同时翻 zoomMouseDriven=true, transition: 'none' 实现零延迟跟随.
    if (!inZoomingState) {
      this.setState({ currentStyle: nextStyle })
      return
    }
    if (!this.zoomTrackingClaimed) {
      this.zoomTrackingClaimed = true
      this.setState({ currentStyle: nextStyle })
    } else {
      this.setState({ currentStyle: nextStyle, zoomMouseDriven: true })
    }
  }
  // 加载事件
  handleImageLoadStart = () => {
    this.setState({
      isFetching: true,
      invalidate: false,
    }, this.handleDetectImageLoadComplete)
  }
  handleDetectImageLoadComplete = () => {
    clearInterval(this.imageLoadingTimer)
    this.imageLoadingTimer = checkImageLoadedComplete(this.imageRef.current, this.handleImageLoadEnd)
  }
  handleImageLoadEnd = ({ invalidate } = { invalidate: false }) => {
    clearInterval(this.imageLoadingTimer)
    this.setState({
      isFetching: false,
      invalidate: invalidate === undefined ? this.state.invalidate : invalidate,
    })
  }
  handleImageLoad = () => {
    const { animate, show, zoom } = this.context
    if (animate?.browsing === false && show && !zoom) {
      this.updateCurrentImageStyleWithoutBrowsingTransition()
    } else {
      this.debounceUpdateCurrentImageStyle()
    }
  }
  handleImageError = () => {
    this.handleImageLoadEnd({ invalidate: true })
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
    const animateParams = (animate || {}) as Animate & { flip?: false }
    const { currentStyle } = this.state
    this.setState({
      currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
      animateConfig: getAnimateConfig(animateParams.flip),
    }, callback)
  }
  setTouchProfile = (nextProfile: TouchProfile) => {
    if (nextProfile) {
      this.setState({
        touchProfile: nextProfile
      }, () => {
        const { outBrowsing, toPrevPage, toNextPage } = this.context
        const { touchProfile } = this.state
        if (touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
          if (touchProfile.behavior === TOUCH_BEHAVIOR_TYPE.SWIPING) {
            const offset = touchProfile.getCurrentOffset()
            offset.x < 0 ? toNextPage() : toPrevPage()
          } else if (touchProfile.behavior === TOUCH_BEHAVIOR_TYPE.LIVING) {
            outBrowsing()
          }
        }
      })
    }
  }
  getStyle = (step: number, distance: number, isSideImage: boolean): CSSProperties => {
    const { animate, set, zoom, page } = this.context
    const { invalidate, currentStyle, touchProfile, animateConfig } = this.state
    const animateParams = (animate || {}) as Animate & { flip?: false }
    let transform, zIndex, pointerEvents
    // 获取动画配置
    // eslint-disable-next-line prefer-const
    let { offset, overflow, opacity } = animateConfig
    // 获取触摸配置
    const { touch, transition } = touchProfile.getTouchConfig({ enableSwiping: set.length > 1, enableLiving: true })
    // 计算样式
    if (isSideImage) {
      // 仅对左右两张图做滑动跟踪
      const x = distance === 1 ? (currentStyle.x || 0) + touch.x + offset * step : (currentStyle.x || 0) + offset * step
      const y = currentStyle.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${(currentStyle.scale || 0) + overflow}, ${(currentStyle.scale || 0) + overflow}, 1) rotate3d(0, 0, 1, 0deg)`
      zIndex = 10 * distance
      pointerEvents = 'none'
    } else {
      const x = (currentStyle.x || 0) + touch.x
      const y = currentStyle.y + touch.y
      transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${currentStyle.scale}, ${currentStyle.scale}, 1) rotate3d(0, 0, 1, ${currentStyle.rotate}deg)`
      zIndex = 10
      opacity = currentStyle.opacity || 1
      // clipPath = currentStyle.radius ? `inset(0% 0% 0% 0% round ${currentStyle.radius/currentStyle.scale}px)` : `inset(0% 0% 0% 0% round 0)`
    }
    return {
      ...withVendorPrefix({ transform }),
      cursor: zoom ? 'zoom-out' : 'initial',
      zIndex,
      opacity: invalidate ? 0 : opacity,
      transition: this.suppressBrowsingTransition
        || animateParams.flip === false
        // zoom mousemove 跟随: 仅中心图 + 已经在 zooming 态时关闭 transition, enter zoom 自然过渡
        || (zoom && !isSideImage && this.state.zoomMouseDriven)
        ? 'none' : transition,
      pointerEvents,
      ...set[page].style,
    } as CSSProperties
  }

  /**
   * 圖片構建
   **/
  buildImageSeries = (edge: 0 | 1 | 2 | 3) => {
    const { loop = false, set, page, animate } = this.context
    // animate.flip === 'none' 时跳过相邻页渲染, 翻页通过中心图 key 变化触发瞬间替换 (无 transition).
    const flipKind = (typeof animate === 'object' && animate?.flip) ? animate.flip : undefined
    if (set.length > 1 && flipKind !== 'none') {
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
    } else {
      return this.buildImage({ step: 0, imageIndex: page })
    }
  }
  buildImage = ({ step = 0, imageIndex = 0 }: { step?: number, imageIndex?: number } = {}) => {
    const { set, show, zoom, page, pageWithStep } = this.context
    const { invalidate } = this.state
    // 是否邊圖
    const distance = Math.abs(step)
    const isSideImage = distance > 0
    // 计算真实索引
    const imageIndexWithStep = pageWithStep + step
    // 計算樣式
    const imageStyle = this.getStyle(step, distance, isSideImage)
    const imageClass = classnames(style.imageLayer, set[imageIndex].className, {
      [style.zooming]: zoom,
      [style.invalidate]: invalidate,
    })
    // 組裝屬性
    const key = `${imageIndexWithStep}-${set[imageIndex].src}`
    const commonProps = {
      style: imageStyle,
      className: imageClass,
      src: appendParams(set[imageIndex].src, { t: this.handleGetTimestamp(page) }),
      alt: set[imageIndex].alt,
    }
    const centerProps = {
      id: 'zmageImage',
      ref: this.imageRef,
      onLoad: this.handleImageLoad,
      onError: this.handleImageError,
      onAbort: this.handleImageAbort,
      onClick: this.handleClick,
    }
    // 構建内容
    if (isSideImage) {
      const sideImageShow = show && !zoom
      return sideImageShow && <img key={key} {...commonProps}/>
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
