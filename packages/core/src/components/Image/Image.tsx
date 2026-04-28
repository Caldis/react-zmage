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
import { animationDuration } from '../../config/anim'
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
  getImageTransition,
  getViewportRect,
  getZoomingStyle,
  ImageAnimateType,
  ImageStyleType,
  isZoomMotionPhase,
  MotionPhase,
  TOUCH_BEHAVIOR_PHASE,
  TOUCH_BEHAVIOR_TYPE,
  TouchProfile,
} from './Image.utils'

type PropsType = BrowsingParams
const ZOOM_FOLLOW_EASE = 0.05
const ZOOM_FOLLOW_THRESHOLD = 0.35

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
  zoomEnterTimer?: ReturnType<typeof setTimeout>
  zoomFollowRaf?: number
  zoomFollowCurrentStyle?: ImageStyleType
  zoomFollowTargetStyle?: ImageStyleType
  motionPhase: MotionPhase = 'idle'
  pendingZoomMousePosition?: Coordinate
  zoomPointerPosition?: Coordinate
  // State
  readonly state = {
    // 加载状态
    isFetching: true,
    invalidate: false,
    // 样式
    currentStyle: getCoverStyle(this.context),
    // 动画
    animateConfig: getAnimateConfig(this.context, this.context.animate?.flip),
    // 触控
    touchProfile: new TouchProfile(),
    // 时间戳 Flag
    timestamp: {},
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
    const keyboardZoomEnter = !prevZoom && currZoom && this.context.zoomTrigger === 'keyboard'
    if (prevShow !== currShow || prevPage !== currPage || (prevZoom && !currZoom)) {
      this.resetZoomMotionState()
    }
    if (!prevZoom && currZoom) {
      keyboardZoomEnter ? this.startKeyboardZoomEnter() : this.startZoomEnter()
    }
    // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
    if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
      const updateStyle = () => {
        if (keyboardZoomEnter) {
          this.updateCurrentImageStyleForKeyboardZoom()
        } else if (prevShow !== currShow && animate?.browsing === false) {
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
    this.resetZoomMotionState()
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
    const nextStyle = this.context.zoom && this.context.zoomTrigger === 'keyboard'
      ? this.getZoomingStyleFromKeyboardPosition()
      : getCurrentImageStyle(this.context, this.imageRef, touchProfile)
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
    const { touchProfile } = this.state
    const nextStyle = getCurrentImageStyle(this.context, this.imageRef, touchProfile)
    this.motionPhase = 'browsing-instant'
    this.setCurrentStyle(nextStyle, () => {
      if (this.browsingTransitionRaf !== undefined) {
        window.cancelAnimationFrame(this.browsingTransitionRaf)
      }
      this.browsingTransitionRaf = window.requestAnimationFrame(() => {
        this.browsingTransitionRaf = undefined
        if (this.motionPhase === 'browsing-instant') {
          this.motionPhase = 'idle'
        }
      })
    })
  }
  updateCurrentImageStyleForKeyboardZoom = () => {
    const nextStyle = this.getZoomingStyleFromKeyboardPosition()
    this.setCurrentStyle(nextStyle, this.scheduleZoomEnterComplete)
  }
  debounceUpdateCurrentImageStyle = debounce(this.updateCurrentImageStyle, 50)

  /**
   * 事件响应
   **/
  // 页面事件
  handleResize = () => {
    this.debounceUpdateCurrentImageStyle()
    this.reportCanZoom()
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
    const zoomingStyle = getZoomingStyle(this.context, this.imageRef, e)
    this.startZoomFollow(zoomingStyle)
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
    this.reportCanZoom()
  }
  // 把 "图是否大于视口" 的判断上抛给 Browser, 用于 Control 的禁用态和空格键的早返回.
  // 旋转/dpr 暂不参与计算; 这里只用 naturalWidth/Height vs 布局视口宽高的保守判断.
  reportCanZoom = () => {
    const { setCanZoom } = this.context
    if (typeof setCanZoom !== 'function') return
    const node = this.imageRef.current
    if (!node) return
    const { naturalWidth, naturalHeight } = node
    if (!naturalWidth || !naturalHeight) return
    const viewport = getViewportRect(this.context)
    setCanZoom(naturalWidth > viewport.width || naturalHeight > viewport.height)
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
      animateConfig: getAnimateConfig(this.context, animateParams.flip),
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
    this.motionPhase = 'zoom-enter'
  }
  resetZoomMotionState = () => {
    this.cancelZoomEnterTimer()
    this.cancelZoomFollowFrame()
    this.zoomFollowCurrentStyle = undefined
    this.zoomFollowTargetStyle = undefined
    this.pendingZoomMousePosition = undefined
    this.zoomPointerPosition = undefined
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
  getZoomingStyleFromKeyboardPosition = () => {
    const zoomPosition = this.zoomPointerPosition || this.context.zoomPosition
    return zoomPosition
      ? getZoomingStyle(this.context, this.imageRef, { clientX: zoomPosition.x, clientY: zoomPosition.y })
      : getZoomingStyle(this.context, this.imageRef)
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

    if (settled) {
      this.zoomFollowCurrentStyle = undefined
      this.zoomFollowTargetStyle = undefined
      this.setCurrentStyle(target)
      return
    }

    this.zoomFollowRaf = window.requestAnimationFrame(this.stepZoomFollow)
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
    })
    this.startZoomFollow(zoomingStyle)
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
      transition: getImageTransition({
        role: isSideImage ? 'side' : 'center',
        motionPhase: this.motionPhase,
        touchTransition: transition,
        flip: animateParams.flip,
        imageType: currentStyle._type,
      }),
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
