/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// React Libs
import React, { Fragment } from 'react'
// React Motion
import {Motion, spring} from 'react-motion'
// Style
import style from './index.less'
// Utils
import {
    calcFitScale, springlization,
    addListenEventOf, removeListenEventOf,
    scrollWidth, windowWidth, clientWidth,
    scrollHeight,windowHeight, clientHeight
} from '@/utils'
// Config
import { defProp } from "@/config/default"

export default class Images extends React.PureComponent {
    constructor(props) {
        super(props)

        // Refs
        this.imageRef = React.createRef()

        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 监听状态
        this.listeningMouseMove = false
        // 初始封面样式
        const { x, y, opacity, scale, rotate, borderRadius } = Images.getCoverStyle(props)

        this.state = {
            // 样式
            defaultStyle: { x, y, opacity, scale, rotate, borderRadius },
            currentStyle: { x, y, opacity, scale, rotate, borderRadius },
        }
    }

    componentDidMount() {
        addListenEventOf('resize', this.handleResize)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 更新样式
        const { show: prevShow, zoom: prevZoom, rotate: prevRotate } = prevProps
        const { show: currShow, zoom: currZoom, rotate: currRotate } = this.props
        // Page 导致的 src 变化的 update 交给图片自身的 onload 调用
        if (prevShow!==currShow || prevZoom!==currZoom || prevRotate!==currRotate) {
            // 更新样式 (初次显示时添加延迟, 避免 Safari 初次获取不到 ref 的 bug
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
        removeListenEventOf('resize', this.handleResize)
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
            addListenEventOf('mousemove', this.handleMouseMove)
            this.listeningMouseMove = true
        } else {
            removeListenEventOf('mousemove', this.handleMouseMove)
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
                return Images.getZoomingStyle(undefined, props, imageRef)
            } else {
                return Images.getBrowsingStyle(props, imageRef)
            }
        } else {
            return Images.getCoverStyle(props)
        }
    }
    static getCoverStyle = (props) => {
        const { page, cover, rotate } = props
        const { naturalWidth } = cover
        const { top, left, width, height } = cover.getBoundingClientRect()
        const { opacity, borderRadius } = window.getComputedStyle(cover)
        return page === 0 ? {
            x: -scrollWidth()/2 + left + width/2,
            y: -windowHeight()/2 + top + height/2,
            opacity: parseInt(opacity) || 1,
            scale: width/naturalWidth,
            rotate: rotate-rotate%360,
            borderRadius: parseInt(borderRadius) || 0
        } : {
            x: 0,
            y: -windowHeight(),
            opacity: 0,
            scale: width/naturalWidth,
            rotate: rotate-rotate%360,
            borderRadius: parseInt(borderRadius) || 0
        }
    }
    static getBrowsingStyle = (props, imageRef) => {
        const { margin, rotate } = props
        const { naturalWidth, naturalHeight } = imageRef.current
        return {
            x: 0,
            y: 0,
            opacity: 1,
            scale: calcFitScale(naturalWidth, naturalHeight, margin),
            rotate,
            borderRadius: 10
        }
    }
    static getZoomingStyle = ({ clientX:mouseX=scrollWidth()/2, clientY:mouseY=windowHeight()/2 }={}, props, imageRef) => {
        const { margin, rotate } = props
        const { naturalWidth, naturalHeight } = imageRef.current
        const cw = scrollWidth()
        const ch = windowHeight()
        const rangeX = naturalWidth - scrollWidth() + (2*margin)
        const rangeY = naturalHeight - windowHeight() + (2*margin)
        // 计算偏移量
        const imgPosX = naturalWidth>cw ? ((naturalWidth - cw)/2 + margin) - (rangeX*(mouseX/cw)) : 0
        const imgPosY = naturalHeight>ch ? ((naturalHeight - ch)/2 + margin) - (rangeY*(mouseY/ch)) : 0
        // 返回位置
        return {
            x: imgPosX,
            y: imgPosY,
            opacity: 1,
            scale: 1,
            rotate,
            borderRadius: 20
        }
    }

    /**
     * 事件响应
     **/
    handleMouseMove = (e) => {
        const zoomingStyle = Images.getZoomingStyle(e, this.props, this.imageRef)
        this.setStyle(zoomingStyle)
    }
    handleResize = (e) => {
        this.updateImageStyle()
    }
    handleMotionRest = (force) => {
        const { cover, remove } = this.props
        const { show } = this.props
        if (!show || force) {
            // 显示封面原图
            cover.style.visibility = 'visible'
            // 移除节点
            remove()
        }
    }

    /**
     * 样式应用
     **/
    static mergeStyle = (currentStyle, newStyle) => {
        const {
            x            = currentStyle.x,
            y            = currentStyle.y,
            opacity      = currentStyle.opacity,
            scale        = currentStyle.opacity,
            rotate       = currentStyle.rotate,
            borderRadius = currentStyle.borderRadius
        } = newStyle
        return { x, y, opacity, scale, rotate, borderRadius }
    }
    setStyle = (newStyle) => {
        const mergedStyle = Images.mergeStyle(this.state.currentStyle, newStyle)
        this.setState({
            loading: false,
            currentStyle: mergedStyle
        })
    }


    render() {

        const { show, zoom, page, set, cover, toggleZoom } = this.props
        const { defaultStyle: ds, currentStyle: cs } = this.state

        return (
            <Fragment>

                {/*加载动画*/}
                {show &&
                <div className={style.loadingContainer}>
                    <div className={style.loading}/>
                </div>}

                {/*图片*/}
                <Motion
                    defaultStyle={ds}
                    style={springlization({
                        x: cs.x,  y: cs.y,
                        // opacity: cs.opacity,
                        // scale: cs.scale,
                        rotate: cs.rotate,
                        // borderRadius 爆卡...
                        // borderRadius: cs.borderRadius
                    })}
                >
                {
                    ({ x, y, rotate }) => (
                        <Motion
                            defaultStyle={ds}
                            style={springlization({ scale: cs.scale }, 0.025)}
                            onRest={this.handleMotionRest}
                        >
                            {
                                ({ scale }) => {
                                    const scrollYOffset = show ? 0 : this.initialPageOffset - window.pageYOffset
                                    return (
                                        <img
                                            key={`${page}-${set[page].src}`}
                                            className={style.imageLayer}
                                            style={{
                                                transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) translate3d(0px, ${scrollYOffset}px, 0px) scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${rotate}deg)`,
                                                cursor: zoom ? 'zoom-out' : 'initial',
                                                // borderRadius: borderRadius/scale,
                                            }}
                                            src={set[page].src}
                                            alt={set[page].alt}
                                            ref={this.imageRef}
                                            onLoad={() => set[page].src !== cover.getAttribute("src") && this.updateImageStyle()}
                                            onClick={zoom ? toggleZoom : () => {
                                            }}
                                            onError={() => {
                                                console.warn("react-zmage initialization error because the cover image url invalid.")
                                                this.handleMotionRest(true)
                                            }}
                                        />
                                    )
                                }

                            }
                        </Motion>
                    )
                }
                </Motion>

            </Fragment>
        )
    }
}
