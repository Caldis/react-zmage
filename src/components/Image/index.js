/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// React Libs
import React, { Fragment } from 'react'
// React Motion
import { Motion } from 'react-motion'
// Style
import style from './index.less'
// Utils
import {
    calcFitScale, springlization,
    addListenEventOf, removeListenEventOf,
    scrollWidth, windowWidth, clientWidth,
    scrollHeight,windowHeight, clientHeight
} from '@/utils'

export default class Images extends React.PureComponent {
	constructor(props) {
		super(props)

        // 当前图像对象
        this.image = null
        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 初始封面样式
        const { x, y, opacity, scale } = this.coverStyle()

		this.state = {
            // 样式
            defaultStyle: { x, y, opacity, scale },
            currentStyle: { x, y, opacity, scale },
		}
	}

    componentDidMount() {
        addListenEventOf('resize', this.handleResize)
    }
    componentWillReceiveProps(nextProps) {
        const { set, show, zoom, page } = nextProps
        this.updateImageInfo(set[page].src, show, zoom)
    }
    componentWillUnmount() {
        removeListenEventOf('resize', this.handleResize)
    }

    /**
     * 信息获取
     **/
    updateImageInfo = (src, show, zoom) => {
        if (!this.image || src!==this.image.src) {
            this.image = new Image()
            this.image.onload = () => {
                this.updateImageStyle(show, zoom)
            }
            this.image.src = src
        } else {
            this.updateImageStyle(show, zoom)
        }
    }
    updateImageStyle = (show, zoom) => {
        // 此处需要从外部获取最新的 show 与 zoom
        // 在 componentWillReceiveProps 中调用时, 有可能先于render执行
        // 则有可能获取到的是旧的 props, 导致异常
        if (show) {
            if (zoom) {
                this.setStyle(this.zoomingStyle())
                addListenEventOf('mousemove', this.handleMouseMove)
            } else {
                this.setStyle(this.browsingStyle())
                removeListenEventOf('mousemove', this.handleMouseMove)
            }
        } else {
            this.setStyle(this.coverStyle())
            removeListenEventOf('mousemove', this.handleMouseMove)
        }
    }

    /**
     * 样式控制
     **/
    coverStyle = () => {
        const { page, cover } = this.props
        const { width, height, naturalWidth } = cover
        const { top, left } = cover.getBoundingClientRect()
        return page === 0 ? {
            x: -scrollWidth()/2 + left + width/2,
            y: -windowHeight()/2 + top + height/2,
            opacity: 1,
            scale: width / naturalWidth
        } : {
            x: 0,
            y: -windowHeight(),
            opacity: 0,
            scale: width / naturalWidth
        }
    }
    browsingStyle = () => {
        const { margin } = this.props
        return {
            x: 0,
            y: 0,
            opacity: 1,
            scale: calcFitScale(this.image, margin)
        }
    }
    zoomingStyle = ({ clientX:mouseX=scrollWidth()/2, clientY:mouseY=windowHeight()/2 }={}) => {
        const { margin } = this.props
        const { naturalWidth, naturalHeight } = this.image
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
            scale: 1
        }
    }

    /**
     * 事件响应
     **/
    handleMouseMove = (e) => {
        this.setStyle(this.zoomingStyle(e))
    }
    handleResize = (e) => {
        const { show, zoom } = this.props
        this.updateImageStyle(show, zoom)
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
    setStyle = (style) => {
        const { currentStyle:cs } = this.state
        const { x=cs.x, y=cs.y, opacity=cs.opacity, scale=cs.opacity } = style
        this.setState({
            currentStyle: { x, y, opacity, scale }
        })
    }


    render() {
        const { show, zoom, page, set, toggleZoom } = this.props
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
                    style={springlization({ x: cs.x, y: cs.y, opacity: cs.opacity, scale: cs.scale })}
                    onRest={this.handleMotionRest}
                >
                    {
                        ({ x, y, scale }) => {
                            const scrollYOffset = show ? 0 : this.initialPageOffset - window.pageYOffset
                            return (
                                <img
                                    key={page}
                                    className={style.imageLayer}
                                    style={{
                                        transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) translate3d(0px, ${scrollYOffset}px, 0px) scale3d(${scale}, ${scale}, 1)`,
                                        cursor: zoom ? 'zoom-out' : 'initial'
                                    }}
                                    src={set[page].src} alt={set[page].alt}
                                    onClick={zoom ? toggleZoom : ()=>{}}
                                    onError={() => {
                                        console.warn("react-zmage initialization error because the cover image url invalid.")
                                        this.handleMotionRest(true)
                                    }}
                                />
                            )
                        }
                    }
                </Motion>

			</Fragment>
		)
	}
}