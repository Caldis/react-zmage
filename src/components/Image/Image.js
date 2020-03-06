/**
 * 图片层
 * 控制图片尺寸
 **/

// Libs
import classnames from 'classnames'
import React, { Fragment } from 'react'
// Styles
import style from './Image.less'
// Components
import Loading from './Loading'
// Utils
import { Context } from '../context'
import { getScrollWidth, checkImageLoadedComplete, appendParams, lockTouchInteraction, unlockTouchInteraction, withVendorPrefix, isInteger, getTargetPage, mirrorRange } from '@/utils'
import { getCurrentImageStyle, getCoverStyle, getZoomingStyle, getAnimateConfig, TOUCH_BEHAVIOR_TYPE, TOUCH_BEHAVIOR_PHASE, touchProfile, getTouchConfig } from './Image.utils'

export default class Image extends React.PureComponent {

    constructor(props, context) {
        super(props)

        // Refs
        this.imageRef = React.createRef()

        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 监听状态
        this.listeningMouseMove = false
        // 图片加载
        this.imageLoadingTimer = null

        this.state = {
            // Loadings State
            isFetching: true,
            invalidate: false,
            // Style
            currentStyle: getCoverStyle(props, context),
            // Animate
            animateConfig: getAnimateConfig(context.animate.flip),
            // Touch
            touchProfile: new touchProfile(),
            // Reload Flag
            timestamp: {},
        }
    }

    componentDidMount() {
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
    componentDidUpdate(prevProps) {
        const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
        const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
        const { presetIsMobile } = this.context
        // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
        if (prevShow!==currShow || prevZoom!==currZoom || prevRotate!==currRotate) {
            // 显示状态切换
            if (!prevShow) {
                // 显示
                this.updateCurrentImageStyle()
                this.handleDetectImageLoadComplete()
                presetIsMobile && lockTouchInteraction()
            } else {
                // 隐藏
                this.updateCurrentImageStyle()
            }
            // 更新监听状态
            this.updateZoomEventListenerWithState()
        }
        // 切换页面时
        if (prevPage!==currPage) {
            // 显示加载
            this.handleImageLoadStart()
        }
    }
    componentWillUnmount() {
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
        const nextStyle = getCurrentImageStyle(this.props, this.context, this.imageRef, touchProfile)
        this.setCurrentStyle(nextStyle)
    }

    /**
     * 事件响应
     **/
    // 页面事件
    handleResize = () => {
        this.updateCurrentImageStyle()
    }
    handleScroll = () => {
        if (this.imageRef.current) {
            const { show } = this.context
            this.imageRef.current.style.top = `calc(50% + ${show ? 0 : this.initialPageOffset-window.pageYOffset}px)`
        }
    }
    handleClick = () => {
        const { zoom, toggleZoom } = this.context
        zoom && toggleZoom()
    }
    // 触摸事件
    handleTouchStart = (e) => {
        const { clientX, clientY } = e.touches[0]
        this.setTouchProfile(new touchProfile({ origin:{ x:clientX, y:clientY } }))
    }
    handleTouchMove = (e) => {
        const { touchProfile } = this.state
        const { clientX, clientY } = e.touches[0]
        this.setTouchProfile(touchProfile.update({ origin:{ x:clientX, y:clientY }}))
    }
    handleTouchEnd = (e) => {
        const { touchProfile } = this.state
        this.setTouchProfile(touchProfile.end())
    }
    // 鼠标事件
    handleMouseMove = (e) => {
        const zoomingStyle = getZoomingStyle(this.props, this.context, this.imageRef, e)
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
    handleImageLoadEnd = ({ invalidate }={}) => {
        clearInterval(this.imageLoadingTimer)
        this.setState({
            isFetching: false,
            invalidate: invalidate===undefined ? this.state.invalidate : invalidate,
        })
    }
    handleImageLoad = () => {
        this.updateCurrentImageStyle()
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
    handleSetTimestamp = (page) => {
        const { set } = this.context
        const { timestamp } = this.state
        this.setState({
            timestamp: {
                ...timestamp,
                [set[page].src]: new Date().getTime(),
            }
        })
    }
    handleGetTimestamp = (page) => {
        const { set } = this.context
        const { timestamp } = this.state
        return timestamp[set[page].src]
    }

    /**
     * 样式应用
     **/
    setCurrentStyle = (nextStyle) => {
        const { animate } = this.context
        const { currentStyle } = this.state
        this.setState({
            currentStyle: nextStyle._behavior === 'merge' ? { ...currentStyle, ...nextStyle } : nextStyle,
            animateConfig: getAnimateConfig(animate.flip),
        })
    }
    setTouchProfile = (nextProfile) => {
        if (nextProfile) {
            this.setState({
                touchProfile: {...nextProfile}
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
    getStyle = (step, distance, isSideImage) => {
        const { set, zoom, page } = this.context
        const { invalidate, currentStyle, touchProfile, animateConfig } = this.state
        let transform, clipPath, zIndex, pointerEvents
        // 获取动画配置
        let { offset, overflow, opacity } = animateConfig
        // 获取触摸配置
        let { touch, transition } = getTouchConfig(touchProfile, { enableSwiping:set.length>1, enableLiving:true })
        // 计算样式
        if (isSideImage) {
            // 仅对左右两张图做滑动跟踪
            const x = distance===1 ? currentStyle.x+touch.x+offset*step : currentStyle.x+offset*step
            const y = currentStyle.y
            transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${currentStyle.scale+overflow}, ${currentStyle.scale+overflow}, 1) rotate3d(0, 0, 1, 0deg)`
            zIndex = 10*distance
            pointerEvents = 'none'
        } else {
            const x = currentStyle.x + touch.x
            const y = currentStyle.y + touch.y
            transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${currentStyle.scale}, ${currentStyle.scale}, 1) rotate3d(0, 0, 1, ${currentStyle.rotate}deg)`
            // clipPath = currentStyle.radius ? `inset(0% 0% 0% 0% round ${currentStyle.radius/currentStyle.scale}px)` : `inset(0% 0% 0% 0% round 0)`
            opacity = currentStyle.opacity
            zIndex = 10
        }
        return {
            ...withVendorPrefix({ transform }),
            cursor: zoom ? 'zoom-out' : 'initial',
            zIndex,
            opacity: invalidate ? 0 : opacity,
            pointerEvents,
            transition,
            ...set[page].style,
        }
    }

    /**
     * 圖片構建
     **/
    buildImageSeries = (edge) => {
        const { loop, set, page } = this.context
        if (set.length > 1) {
            const rangeList = mirrorRange(edge)
            return rangeList.reduce((acc, step) => {
                // 計算索引
                const imageIndex = getTargetPage(page, set.length, step, { loop })
                if (isInteger(imageIndex)) {
                    acc.push(this.buildImage({ step, imageIndex }))
                }
                return acc
            }, [])
        } else {
            return this.buildImage({ step:0, imageIndex:page })
        }
    }
    buildImage = ({ step, imageIndex }={}) => {
        const { set, show, zoom, page, pageWithStep } = this.context
        const { invalidate } = this.state
        // 是否邊圖
        const distance = Math.abs(step)
        const isSideImage = distance>0
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
            id: "zmageImage",
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

    render() {

        const { set, show, zoom, page, pageIsCover, pageWithStep } = this.context
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
                { this.buildImageSeries(2) }

            </Fragment>
        )
    }
}

Image.contextType = Context
