/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// Libs
import React, { Fragment } from 'react'
// Context
import { ContextConsumer } from "@/components/context"
// Styles
import style from './index.less'
// Utils
import {
    addListenScroll, removeListenScroll,
    calcFitScale,
    scrollWidth, windowWidth, clientWidth,
    scrollHeight,windowHeight, clientHeight
} from '@/utils'

class Images extends React.PureComponent {

    constructor(props) {
        super(props)

        // Refs
        this.imageRef = React.createRef()

        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 监听状态
        this.listeningMouseMove = false

        this.state = {
            currentStyle: Images.getCoverStyle(props),
        }
    }

    componentDidMount() {
        addListenScroll(this.handleScroll)
        window.addEventListener('resize', this.handleResize)
        window.addEventListener("transitionend", this.handleTransitionEnded)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 更新样式
        const { show: prevShow, zoom: prevZoom, rotate: prevRotate } = prevProps
        const { show: currShow, zoom: currZoom, rotate: currRotate } = this.props
        // Page 导致的 src 变化的 update 交给图片自身的 onload 调用
        if (prevShow!==currShow || prevZoom!==currZoom || prevRotate!==currRotate) {
            // 更新样式 (添加延迟, 避免 Safari 初次获取不到 ref 的 bug)
            if (!prevShow) {
                setTimeout(this.updateImageStyle, 50)
            } else {
                this.updateImageStyle()
            }
            // 更新监听状态
            this.updateZoomEventListenerWithState()
        }
    }
    componentWillUnmount() {
        window.removeEventListener("transitionend", this.handleTransitionEnded)
        window.removeEventListener('resize', this.handleResize)
        removeListenScroll(this.handleScroll)
    }

    /**
     * 信息更新
     **/
    updateImageStyle = () => {
        const newStyle = Images.getImageStyle(this.props, this.imageRef)
        this.setStyle(newStyle)
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
     * 样式控制
     **/
    static getImageStyle = (props, imageRef) => {
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
    static getCoverStyle = (props) => {
        const { cover, page, rotate } = props
        const { naturalWidth } = cover
        const { top, left, width, height } = cover.getBoundingClientRect()
        const { opacity, borderRadius } = window.getComputedStyle(cover)
        return page === 0 ? {
            x: -scrollWidth()/2 + left + width/2,
            y: -windowHeight()/2 + top + height/2,
            opacity: ~~opacity || 1,
            scale: width/naturalWidth,
            rotate: rotate-rotate%360,
            borderRadius: borderRadius
        } : {
            x: 0,
            y: -windowHeight(),
            opacity: 0,
            scale: width/naturalWidth,
            rotate: rotate-rotate%360,
            borderRadius: borderRadius
        }
    }
    static getBrowsingStyle = (props, imageRef) => {
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
    static getZoomingStyle = (props, imageRef, { clientX:mouseX=scrollWidth()/2, clientY:mouseY=windowHeight()/2 }={}) => {
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

    /**
     * 事件响应
     **/
    handleMouseMove = (e) => {
        const zoomingStyle = Images.getZoomingStyle(this.props, this.imageRef, e)
        this.setStyle(zoomingStyle)
    }
    handleResize = (e) => {
        this.updateImageStyle()
    }
    handleTransitionEnded = (e) => {
        if (e.target === this.imageRef.current) {
            const { show } = this.props
            !show && this.removeImage()
        }
    }
    handleScroll = () => {
        if (this.imageRef.current) {
            const { show } = this.props
            this.imageRef.current.style.top = `calc(50% + ${show ? 0 : this.initialPageOffset-window.pageYOffset}px)`
        }
    }
    handleImageLoad = () => {
        const { page, set, cover } = this.props
        set[page].src !== cover.getAttribute("src") && this.updateImageStyle()
    }
    handleImageClick = () => {
        const { zoom, toggleZoom } = this.props
        zoom && toggleZoom()
    }
    handleImageError = () => {
        console.warn("Initialization error because the cover image url invalid.")
        this.removeImage()
    }

    /**
     * 样式应用
     **/
    setStyle = (newStyle) => {
        const mergedStyle = { ...this.state.currentStyle, ...newStyle }
        this.setState({
            loading: false,
            currentStyle: mergedStyle
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
        setTimeout(remove, 200)
    }

    render() {

        const { show, zoom, page, set } = this.props
        const { currentStyle:cs } = this.state

        return (
            <Fragment>

                {/*加载动画*/}
                {show &&
                <div className={style.loadingContainer}>
                    <div className={style.loading}/>
                </div>}

                {/*图片*/}
                <img
                    key={`${page}-${set[page].src}`}
                    className={`${style.imageLayer}${zoom ? ` ${style.zooming}` : ""}`}
                    style={{
                        transform: `translate3d(-50%, -50%, 0) translate3d(${cs.x}px, ${cs.y}px, 0px) scale3d(${cs.scale}, ${cs.scale}, 1) rotate3d(0, 0, 1, ${cs.rotate}deg)`,
                        cursor: zoom ? 'zoom-out' : 'initial',
                        borderRadius: cs.borderRadius,
                    }}
                    src={set[page].src}
                    alt={set[page].alt}
                    ref={this.imageRef}
                    onLoad={this.handleImageLoad}
                    onClick={this.handleImageClick}
                    onError={this.handleImageError}
                />

            </Fragment>
        )
    }
}

export default ContextConsumer(Images)
