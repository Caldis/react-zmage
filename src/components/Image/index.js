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
        // 初始封面位置
        const { x, y } = this.coverPosition()
		// 初始封面尺寸
		const { scale } = this.coverSize()

		this.state = {
            // 样式
            defaultStyle: { x, y, scale },
            currentStyle: { x, y, scale },
		}
	}

    componentDidMount() {
        addListenEventOf('resize', this.handleResize)
    }
    componentWillReceiveProps(nextProps) {
        const { set, page } = nextProps
        this.updateImageInfo(set[page].src)
    }
    componentWillUnmount() {
        removeListenEventOf('resize', this.handleResize)
    }

    /**
     * 信息获取
     **/
    updateImageInfo = (src) => {
        this.image = new Image()
        this.image.onload = this.updateImageStyle
        this.image.src = src
    }
    updateImageStyle = () => {
        const { show, zoom } = this.props
        let position, size
        if (show) {
            position = this.pagePosition()
            if (zoom) {
                size = this.originalSize()
                addListenEventOf('mousemove', this.handleMouseMove)
            } else {
                size = this.pageFitSize()
                removeListenEventOf('mousemove', this.handleMouseMove)
            }
        } else {
            position = this.coverPosition()
            size = this.coverSize()
            removeListenEventOf('mousemove', this.handleMouseMove)
        }
        this.setStyle({ ...position, ...size })
    }

    /**
     * 尺寸控制
     **/
    coverSize = () => {
        const { cover } = this.props
        const { width, naturalWidth } = cover
        return {
            scale: width / naturalWidth
        }
    }
    pageFitSize = () => {
        const { margin } = this.props
        return {
            scale: calcFitScale(this.image, margin)
        }
    }
    originalSize = () => {
        return {
            scale: 1
        }
    }

    /**
     * 移动控制
     **/
    coverPosition = () => {
        const { page, cover } = this.props
        const { top, left, width, height } = cover.getBoundingClientRect()
        return page === 0 ? {
            x: -scrollWidth()/2 + left + width/2,
            y: -windowHeight()/2 + top + height/2
        } : {
            x: 0,
            y: -windowHeight()
        }
    }
    pagePosition = () => {
        return {
            x: 0,
            y: 0
        }
    }
    mouseContrastPosition = (e) => {
        const { margin } = this.props
        const { naturalWidth, naturalHeight } = this.image
        const cw = scrollWidth()
        const ch = windowHeight()
        const mouseX = e.clientX
        const mouseY = e.clientY
        const rangeX = naturalWidth - scrollWidth() + (2*margin)
        const rangeY = naturalHeight - windowHeight() + (2*margin)
        // 计算偏移量
        const imgPosX = naturalWidth>cw ? ((naturalWidth - cw)/2 + margin) - (rangeX*(mouseX/cw)) : 0
        const imgPosY = naturalHeight>ch ? ((naturalHeight - ch)/2 + margin) - (rangeY*(mouseY/ch)) : 0
        // 返回位置
        return {
            x: imgPosX,
            y: imgPosY
        }
    }

    /**
     * 事件响应
     **/
    handleMouseMove = (e) => {
        this.setStyle(this.mouseContrastPosition(e))
    }
    handleResize = (e) => {
        this.updateImageStyle()
    }
    handleMotionRest = () => {
        const { cover, remove } = this.props
        const { show } = this.props
        if (!show) {
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
        const { currentStyle: cs } = this.state
        const { x=cs.x, y=cs.y, scale=cs.scale } = style
        this.setState({
            currentStyle: { x, y, scale }
        })
    }


    render() {
        const { show, zoom, page, set, toggleZoom } = this.props
		const { defaultStyle, currentStyle: cs } = this.state
		return (
			<Fragment>

                {/*加载动画*/}
                {show &&
                <div className={style.loadingContainer}>
                    <div className={style.loading}/>
                </div>}

				{/*图片*/}
				<Motion
                    defaultStyle={defaultStyle}
                    style={springlization({ x: cs.x, y: cs.y, scale: cs.scale })}
                    onRest={this.handleMotionRest}
                >
                    {({ x, y, scale }) =>
                        <img
                            key={page}
                            className={style.imageLayer}
                            style={{
                                top: show ? '50%' : windowHeight()/2 - (window.pageYOffset-this.initialPageOffset),
                                transform: `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px) scale3d(${scale}, ${scale}, 1)`,
                                cursor: zoom ? 'zoom-out' : 'initial'
                            }}
                            src={set[page].src} alt={set[page].alt}
                            onClick={zoom ? toggleZoom : ()=>{}}
                        />
                    }
                </Motion>

			</Fragment>
		)
	}
}