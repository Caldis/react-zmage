/**
 * 位移层
 * 控制图片位置
 **/

// React Libs
import React from 'react'
// React Motion
import { Motion, spring } from 'react-motion'
// Style
import style from './index.less'
// Utils
import {
	addListenEventOf, removeListenEventOf,
    scrollWidth, windowWidth, clientWidth,
	scrollHeight,windowHeight, clientHeight
} from '@/utils'

// TODO: CONFIG
const IMAGE_MARGIN = 50

export default class Position extends React.Component {
	constructor(props) {
		super(props)

        // 初始页面高度
        this.initialPageOffset = window.pageYOffset
        // 初始封面位置
        const { x, y } = this.coverCenterPosition()

		this.state = {
			// 原始尺寸
			naturalSize: null,
			// 移动范围
			moveRange: null,
			// 样式
            defaultStyle: { x, y },
            currentStyle: { x, y }
		}
	}

    componentWillReceiveProps(nextProps) {
        const { show, zoom } = nextProps
	    if (show) {
		    this.moveTo(this.pageCenterPosition())
		    if (zoom) {
		    	this.updateZoomMovePositionRange()
			    addListenEventOf('mousemove', this.handleMouseMove)
		    } else {
			    removeListenEventOf('mousemove', this.handleMouseMove)
		    }
	    } else {
            this.moveTo(this.coverCenterPosition())
		    removeListenEventOf('mousemove', this.handleMouseMove)
	    }
	}

    /**
     * 移动控制
     **/
    coverCenterPosition = () => {
        const { page, coverNodeRef } = this.props
        let coverCenterPosition = { x: 0, y: 0 }
        if (coverNodeRef) {
            const coverNodeRect = coverNodeRef.getBoundingClientRect()
            coverCenterPosition = page === 0 ? {
                x: -scrollWidth()/2 + coverNodeRect.left + coverNodeRect.width/2,
                y: -windowHeight()/2 + coverNodeRect.top + coverNodeRect.height/2
            } : {
                x: 0,
                y: -windowHeight()
            }
        }
        return coverCenterPosition
    }
    pageCenterPosition = () => {
	    return { x: 0, y: 0 }
    }
    mouseContrastPosition = (e) => {
        const { naturalSize, moveRange:mr } = this.state
        const { naturalWidth: nw, naturalHeight: nh } = naturalSize
        const cw = clientWidth()
        const ch = clientHeight()
        const mouseX = e.clientX
        const mouseY = e.clientY
        // 计算偏移量
        const imgPosX = nw>cw ? ((nw - cw)/2 + IMAGE_MARGIN) - (mr.x*(mouseX/cw)) : 0
        const imgPosY = nh>ch ? ((nh - ch)/2 + IMAGE_MARGIN) - (mr.y*(mouseY/ch)) : 0
        // 返回位置
        return {
            x: imgPosX,
            y: imgPosY
        }
    }
    moveTo = ({ x, y }) => {
        this.setState({
            currentStyle: { x, y }
        })
    }

    /**
     * 放大查看控制
     **/
    updateZoomMovePositionRange = () => {
        const { zoom, page, imageSet } = this.props
        const image = new Image()
        image.src = imageSet[page].src
        image.onload = () => {
            const naturalWidth = image.naturalWidth
            const naturalHeight = image.naturalHeight
            this.setState({
                naturalSize: !zoom ? { naturalWidth, naturalHeight } : null,
                moveRange: !zoom ? {
                    x: naturalWidth - clientWidth() + (2*IMAGE_MARGIN),
                    y: naturalHeight - clientHeight() + (2*IMAGE_MARGIN)
                } : null
            })
        }
    }
    handleMouseMove = (e) => {
        this.moveTo(this.mouseContrastPosition(e))
    }


	render() {
        const { show } = this.props
    	const { defaultStyle, currentStyle } = this.state
		return (
			<div className={style.positionLayer}>
                <Motion
                    defaultStyle={defaultStyle}
                    style={{
                        x: spring(currentStyle.x),
                        y: spring(currentStyle.y)
                    }}
                >
                    {({ x, y }) =>
                        <div style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            top: show ? undefined : windowHeight()/2 - (window.pageYOffset-this.initialPageOffset)
                        }}>{ this.props.children }</div>
                    }
                </Motion>
			</div>
		)
	}
}