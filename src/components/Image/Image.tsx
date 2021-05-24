/**
 * 图片层
 * 控制图片尺寸
 **/

// Libs
import classnames from 'classnames'
import React, { CSSProperties, Fragment } from 'react'
// Styles
import style from './Image.less'
// Components
import Loading from './loading'
// Utils
import { Animate } from '@/types/global'
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
} from '@/utils'
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
}

export default class Image extends React.Component<PropsType, StateType> {

  // Types
  context: ContextType

  // Refs
  imageRef = React.createRef<HTMLImageElement>()
  // 初始页面高度
  initialPageOffset = window.pageYOffset
  // 监听状态
  listeningMouseMove: boolean
  // 图片加载
  imageLoadingTimer: ReturnType<typeof setInterval>
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
  } as StateType

  componentDidMount () {
    const { presetIsMobile, presetIsDesktop } = this.context
    window.addEventListener('resize', this.handleResize)
    if (presetIsMobile) {
      window.requestAnimationFrame(() => {
        window.addEventListener('touchstart', this.handleTouchStart)
        window.addEventListener('touchmove', this.handleTouchMove)
        window.addEventListener('touchend', this.handleTouchEnd)
      })
    }
    if (presetIsDesktop) {
      window.requestAnimationFrame(() => {
        window.addEventListener('scroll', this.handleScroll)
      })
    }
  }

  componentDidUpdate (prevProps: BrowsingParams) {
    const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
    const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
    const { presetIsMobile } = this.context
    // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
    if (prevShow !== currShow || prevZoom !== currZoom || prevRotate !== currRotate) {
      // 显示状态切换
      if (!prevShow) {
        // 显示
        this.debounceUpdateCurrentImageStyle()
        this.handleDetectImageLoadComplete()
        presetIsMobile && lockTouchInteraction()
      } else {
        // 隐藏
        this.debounceUpdateCurrentImageStyle()
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
    this.setCurrentStyle(zoomingStyle)
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
    this.debounceUpdateCurrentImageStyle()
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
  setCurrentStyle = (nextStyle: ImageStyleType) => {
    const { animate } = this.context
    const { currentStyle } = this.state
    this.setState({
      currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
      animateConfig: getAnimateConfig(((animate || {}) as Animate).flip),
    })
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
    const { set, zoom, page } = this.context
    const { invalidate, currentStyle, touchProfile, animateConfig } = this.state
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
      transition,
      pointerEvents,
      ...set[page].style,
    } as CSSProperties
  }

  /**
   * 圖片構建
   **/
  buildImageSeries = (edge: 0 | 1 | 2 | 3) => {
    const { loop = false, set, page } = this.context
    if (set.length > 1) {
      const rangeList = mirrorRange(edge)
      return rangeList.reduce((acc, step) => {
        // 計算索引
        const imageIndex = getTargetPage(page, set.length, step, { loop })
        if (isInteger(imageIndex)) {
          const ele = this.buildImage({ step, imageIndex })
          ele && acc.push(ele)
        }
        return acc
      }, [] as JSX.Element[])
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
    const commonProps = {
      key: `${imageIndexWithStep}-${set[imageIndex].src}`,
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
      return sideImageShow && <img {...commonProps}/>
    } else {
      return <img {...commonProps} {...centerProps}/>
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
