/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// Libs
import classnames from 'classnames';
import React, { Fragment } from 'react'
// Styles
import style from './Image.less'
// Components
import Loading from './Loading';
// Utils
import { Context } from '../context'
import { env } from '@/utils/env'
import {
    checkImageLoadedComplete, appendParams,
    lockTouchInteraction, unlockTouchInteraction,
    withVendorPrefix,
} from '@/utils'
import { getCurrentImageStyle, getCoverStyle, getZoomingStyle } from './Image.utils'

export default class Images extends React.PureComponent {

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
            // Flag
            timestamp: null,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
    }
    componentDidUpdate(prevProps) {
        const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
        const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
        // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
        if (prevShow!==currShow || prevZoom!==currZoom || prevRotate!==currRotate) {
            // 显示状态切换
            if (!prevShow) {
                // 显示
                this.updateCurrentImageStyle()
                this.handleDetectImageLoadComplete()
                env.isMobile && lockTouchInteraction()
            } else {
                // 隐藏
                this.updateCurrentImageStyle()
                env.isMobile && unlockTouchInteraction()
            }
            // 更新监听状态
            this.updateZoomEventListenerWithState()
        }
        // 切换页面时
        if (prevPage!==currPage) {
            // 显示加载, 并去除加载时间戳
            this.handleImageLoadStart({ timestamp: null })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
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
        const newStyle = getCurrentImageStyle(this.props, this.context, this.imageRef)
        this.setStyle(newStyle)
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
    // 鼠标事件
    handleMouseMove = (e) => {
        const zoomingStyle = getZoomingStyle(this.props, this.context, this.imageRef, e)
        this.setStyle(zoomingStyle)
    }
    // 加载事件
    handleImageLoadStart = (state={}) => {
        this.setState({
            isFetching: true,
            invalidate: false,
            ...state,
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
        this.setState({ timestamp: new Date().getTime() })
    }

    /**
     * 样式应用
     **/
    setStyle = (newStyle) => {
        this.setState({
            currentStyle: { ...this.state.currentStyle, ...newStyle }
        })
    }

    render() {

        const { set, show, zoom, page, pageIsCover } = this.context
        const { isFetching, invalidate, currentStyle, timestamp } = this.state

        const imageClassNames = classnames(style.imageLayer, set[page].className, {
            [style.zooming]: zoom,
            [style.invalidate]: invalidate,
        })

        const imageStyle = {
            ...withVendorPrefix({ transform: `translate3d(-50%, -50%, 0) translate3d(${currentStyle.x}px, ${currentStyle.y}px, 0px) scale3d(${currentStyle.scale}, ${currentStyle.scale}, 1) rotate3d(0, 0, 1, ${currentStyle.rotate}deg)` }),
            // ...withVendorPrefix({ clipPath: currentStyle.radius ? `inset(0% 0% 0% 0% round ${currentStyle.radius/currentStyle.scale}px)` : `inset(0% 0% 0% 0% round 0)` }),
            opacity: invalidate ? 0 : currentStyle.opacity,
            cursor: zoom ? 'zoom-out' : 'initial',
            ...set[page].style,
        }

        return (
            <Fragment>

                {/*加载*/}
                {/*仅在默认图片非封面, 或图片不可用时显示*/}
                <Loading
                    show={show && (!pageIsCover || invalidate)}
                    load={isFetching}
                    invalidate={invalidate}
                    onReload={this.handleImageReload}
                />

                {/*图片*/}
                <img
                    key={`${page}-${set[page].src}`}
                    id="zmageImage"
                    className={imageClassNames}
                    style={imageStyle}
                    src={appendParams(set[page].src, { t: timestamp })}
                    alt={set[page].alt}
                    ref={this.imageRef}
                    onLoad={this.handleImageLoad}
                    onError={this.handleImageError}
                    onAbort={this.handleImageAbort}
                    onClick={this.handleClick}
                />

            </Fragment>
        )
    }
}

Images.contextType = Context