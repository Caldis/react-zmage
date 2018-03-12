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

        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 初始封面位置
        const { x, y } = this.coverPosition()
		// 初始封面尺寸
		const { scale } = this.coverSize()

		this.state = {
            initialPageOffset: window.pageYOffset,
            // 原始尺寸
            naturalSize: null,
            // 移动范围
            moveRange: null,
            // 样式
            defaultStyle: { x, y, scale },
            currentStyle: { x, y, scale },
		}
	}

    componentWillReceiveProps(nextProps) {
        const { show, zoom } = nextProps
        let position, size
	    if (show) {
            position = this.pagePosition()
        	if (zoom) {
                this.updateZoomMovePositionRange()
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
            scale: width/naturalWidth
        }
    }
    pageFitSize = () => {
        const { cover, margin } = this.props
        const fitScale = calcFitScale(cover, margin)
        return {
            scale: fitScale
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
    updateZoomMovePositionRange = () => {
        const { set, zoom, page, margin } = this.props
        console.log(set[page])
        const image = new Image()
        image.src = set[page].src
        image.onload = () => {
            const { naturalWidth, naturalHeight } = image
            this.setState({
                naturalSize: !zoom ? { naturalWidth, naturalHeight } : null,
                moveRange: !zoom ? {
                    x: naturalWidth - scrollWidth() + (2*margin),
                    y: naturalHeight - windowHeight() + (2*margin)
                } : null
            })
        }
    }
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
        const { naturalSize, moveRange:mr } = this.state
        const { naturalWidth: nw, naturalHeight: nh } = naturalSize
        const cw = scrollWidth()
        const ch = windowHeight()
        const mouseX = e.clientX
        const mouseY = e.clientY
        // 计算偏移量
        const imgPosX = nw>cw ? ((nw - cw)/2 + margin) - (mr.x*(mouseX/cw)) : 0
        const imgPosY = nh>ch ? ((nh - ch)/2 + margin) - (mr.y*(mouseY/ch)) : 0
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
                            src={set[page].src} alt={set[page].alt} title={set[page].alt}
                            onClick={zoom ? toggleZoom : ()=>{}}
                        />
                    }
                </Motion>

			</Fragment>
		)
	}
}