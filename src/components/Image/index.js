/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// Libs
import classnames from 'classnames';
import React, { Fragment } from 'react'
// Context
import { ContextConsumer } from "@/components/context"
// Styles
import style from './index.less'
// Components
import Loading from './loading';
// Utils
import {
    calcFitScale,
    scrollWidth, windowWidth, clientWidth,
    scrollHeight,windowHeight, clientHeight,
    checkImageLoadedComplete, appendParams,
} from '@/utils'

class Images extends React.PureComponent {

    constructor(props) {
        super(props)

        // Refs
        this.currentImageRef = React.createRef()

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
            currentStyle: Images.getCoverStyle(props),
            // Flag
            timestamp: null,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
        window.addEventListener("transitionend", this.handleTransitionEnded)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { show: prevShow, zoom: prevZoom, rotate: prevRotate, page: prevPage } = prevProps
        const { show: currShow, zoom: currZoom, rotate: currRotate, page: currPage } = this.props
        // 状态改变时更新样式 (Page 导致的 src 变化的 update 交给图片自身的 onload 调用)
        if (prevShow!==currShow || prevZoom!==currZoom || prevRotate!==currRotate) {
            // 在初次进入时添加延迟, 避免 Safari 初次获取不到 ref 的 bug
            if (!prevShow) {
                setTimeout(() => {
                    this.updateCurrentImageStyle()
                    this.handleDetectImageLoadComplete()
                }, 50)
            } else {
                this.updateCurrentImageStyle()
            }
            // 更新监听状态
            this.updateZoomEventListenerWithState()
        }
        // 切换页面时显示加载, 并去除加载时间戳
        if (prevPage!==currPage) {
            this.handleImageLoadStart({ timestamp: null })
        }
    }
    componentWillUnmount() {
        window.removeEventListener("transitionend", this.handleTransitionEnded)
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('mousemove', this.handleMouseMove)
        clearInterval(this.imageLoadingTimer)
    }

    /**
     * 事件监听
     **/
    updateZoomEventListenerWithState = () => {
        const { show, zoom } = this.props
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
        const newStyle = Images.getCurrentImageStyle(this.props, this.currentImageRef)
        this.setStyle(newStyle)
    }

    /**
     * 事件响应
     **/
    // 页面事件
    handleResize = (e) => {
        this.updateCurrentImageStyle()
    }
    handleScroll = () => {
        if (this.currentImageRef.current) {
            const { show } = this.props
            this.currentImageRef.current.style.top = `calc(50% + ${show ? 0 : this.initialPageOffset-window.pageYOffset}px)`
        }
    }
    handleClick = () => {
        const { zoom, toggleZoom } = this.props
        zoom && toggleZoom()
    }
    // 鼠标事件
    handleMouseMove = (e) => {
        const zoomingStyle = Images.getZoomingStyle(this.props, this.currentImageRef, e)
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
        this.imageLoadingTimer = checkImageLoadedComplete(this.currentImageRef.current, this.handleImageLoadEnd)
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
    // 动画事件
    handleTransitionEnded = (e) => {
        if (e.target === this.currentImageRef.current) {
            const { show } = this.props
            !show && this.removeImage()
        }
    }

    /**
     * 样式应用
     **/
    setStyle = (newStyle) => {
        this.setState({
            currentStyle: { ...this.state.currentStyle, ...newStyle }
        })
    }

    /**
     * 移除节点
     **/
    removeImage = () => {
        const { cover, remove } = this.props
        // 显示封面原图
        cover.style.visibility = 'visible'
        // 移除节点
        remove()
    }

    render() {

        const { show, zoom, page, set } = this.props
        const { isFetching, invalidate, currentStyle, timestamp } = this.state

        const imageClassNames = classnames(style.imageLayer, set[page].className, {
            [style.zooming]: zoom,
            [style.invalidate]: invalidate,
        })
        const imageStyle = {
            transform: `translate3d(-50%, -50%, 0) translate3d(${currentStyle.x}px, ${currentStyle.y}px, 0px) scale3d(${currentStyle.scale}, ${currentStyle.scale}, 1) rotate3d(0, 0, 1, ${currentStyle.rotate}deg)`,
            cursor: zoom ? 'zoom-out' : 'initial',
            // borderRadius: currentStyle.borderRadius,
            clipPath: `inset(0% 0% 0% 0% round ${currentStyle.borderRadius}px)`,
            opacity: invalidate ? 0 : currentStyle.opacity,
            ...set[page].style,
        }

        return (
            <Fragment>

                {/*加载*/}
                <Loading
                    show={show}
                    load={isFetching}
                    invalidate={invalidate}
                    onReload={this.handleImageReload}
                />

                {/*图片*/}
                <img
                    key={`${page}-${set[page].src}`}
                    className={imageClassNames}
                    style={imageStyle}
                    src={appendParams(set[page].src, { t: timestamp })}
                    alt={set[page].alt}
                    ref={this.currentImageRef}
                    onLoad={this.handleImageLoad}
                    onError={this.handleImageError}
                    onAbort={this.handleImageAbort}
                    onClick={this.handleClick}
                />

            </Fragment>
        )
    }
}

/**
 * 样式控制
 **/
Images.getCurrentImageStyle = (props, imageRef) => {
    const { show, zoom } = props
    if (show) {
        if (zoom) {
            return Images.getZoomingStyle(props, imageRef)
        } else {
            return Images.getBrowsingStyle(props, imageRef)
        }
    } else {
        return Images.getCoverStyle(props)
    }
}
Images.getCoverStyle = (props) => {
    const { cover, page, rotate } = props
    const { naturalWidth } = cover
    const { top, left, width, height } = cover.getBoundingClientRect()
    const { opacity, borderRadius } = window.getComputedStyle(cover)
    return page === 0 ? {
        x: -scrollWidth()/2 + left + width/2,
        y: -windowHeight()/2 + top + height/2,
        opacity: Number(opacity) || 1,
        scale: naturalWidth ? width/naturalWidth : 1,
        rotate: rotate-rotate%360,
        borderRadius: borderRadius
    } : {
        x: 0,
        y: -windowHeight(),
        opacity: 0,
        scale: naturalWidth ? width/naturalWidth : 1,
        rotate: rotate-rotate%360,
        borderRadius: borderRadius
    }
}
Images.getBrowsingStyle = (props, imageRef) => {
    const { radius, edge, rotate } = props
    const { naturalWidth, naturalHeight } = imageRef.current
    return {
        x: 0,
        y: 0,
        opacity: 1,
        scale: calcFitScale(naturalWidth, naturalHeight, edge),
        rotate,
        borderRadius: radius
    }
}
Images.getZoomingStyle = (props, imageRef, { clientX:mouseX=scrollWidth()/2, clientY:mouseY=windowHeight()/2 }={}) => {
    const { radius, edge, rotate } = props
    const { naturalWidth, naturalHeight } = imageRef.current
    const cw = scrollWidth()
    const ch = windowHeight()
    const rangeX = naturalWidth - scrollWidth() + (2*edge)
    const rangeY = naturalHeight - windowHeight() + (2*edge)
    // 计算偏移量
    const imgPosX = naturalWidth>cw ? ((naturalWidth - cw)/2 + edge) - (rangeX*(mouseX/cw)) : 0
    const imgPosY = naturalHeight>ch ? ((naturalHeight - ch)/2 + edge) - (rangeY*(mouseY/ch)) : 0
    // 返回位置
    return {
        x: imgPosX,
        y: imgPosY,
        opacity: 1,
        scale: 1,
        rotate,
        borderRadius: radius
    }
}

export default ContextConsumer(Images)
