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
// Config
import { defProp } from '@/config/default'

export default class Position extends React.PureComponent {
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
        const { page, cover } = this.props
        const coverRect = cover.getBoundingClientRect()
        return page === 0 ? {
            x: -windowWidth()/2 + coverRect.left + coverRect.width/2,
            y: -windowHeight()/2 + coverRect.top + coverRect.height/2
        } : {
            x: 0,
            y: -windowHeight()
        }
    }
    pageCenterPosition = () => {
	    return { x: 0, y: 0 }
    }
    mouseContrastPosition = (e) => {
        const { margin } = this.props
        const { naturalSize, moveRange:mr } = this.state
        const { naturalWidth: nw, naturalHeight: nh } = naturalSize
        const cw = windowWidth()
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
    moveTo = ({ x, y }) => {
        this.setState({
            currentStyle: { x, y }
        })
    }

    /**
     * 放大查看控制
     **/
    updateZoomMovePositionRange = () => {
        const { zoom, page, margin, set } = this.props
        const image = new Image()
        image.src = set[page].src
        image.onload = () => {
            const naturalWidth = image.naturalWidth
            const naturalHeight = image.naturalHeight
            this.setState({
                naturalSize: !zoom ? { naturalWidth, naturalHeight } : null,
                moveRange: !zoom ? {
                    x: naturalWidth - windowWidth() + (2*margin),
                    y: naturalHeight - windowHeight() + (2*margin)
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
			<div className={style.positionLayer} style={{ width: windowWidth(), height: windowHeight() }}>
                <Motion
                    defaultStyle={defaultStyle}
                    style={{
                        x: spring(currentStyle.x, defProp.springOption),
                        y: spring(currentStyle.y, defProp.springOption)
                    }}
                >
                    {({ x, y }) =>
                        <div style={{
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                            top: show ? 'initial' : windowHeight()/2 - (window.pageYOffset-this.initialPageOffset)
                        }}>{this.props.children}</div>
                    }
                </Motion>
			</div>
		)
	}
}