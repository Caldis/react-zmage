/**
 * 位移控制层
 * 获取封面位置并控制图片位移
 **/

// React Libs
import React from 'react'
// Style
import style from './index.less'
// Utils
import Lerp from '@/utils/lerp'
import {
	addListenEventOf, removeListenEventOf,
	windowWidth, clientWidth,
	windowHeight, clientHeight
} from '@/utils'

// TODO: CONFIG
const IMAGE_MARGIN = 50

export default class Position extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			// 原始尺寸
			naturalSize: null,
			// 移动范围
			moveRange: null
		}
	}

	componentWillMount() {
        this.move = new Lerp({
            data: this.getCoverCenterPosition(),
            poster: this.handleMoveCenterPosition
        })
        // 记录初始页面高度
        this.initialPageOffset = window.pageYOffset
    }
    componentWillReceiveProps(nextProps) {
        const { show, zoom } = nextProps
	    if (show) {
		    this.moveToPageCenterPosition()
		    if (zoom) {
		    	this.gerZoomMovePositionRange()
			    addListenEventOf('mousemove', this.handleMouseMove)
		    } else {
			    removeListenEventOf('mousemove', this.handleMouseMove)
		    }
	    } else {
		    this.moveToCoverCenterPosition()
		    removeListenEventOf('mousemove', this.handleMouseMove)
	    }
	}

	/**
	 * 放大查看
	 **/
	gerZoomMovePositionRange = () => {
		const { zoom, page, imageSet } = this.props
		const image = new Image()
		image.src = imageSet[page].src
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
	handleMouseMove = (e) => {
		const { naturalSize, moveRange:mr } = this.state
		const { naturalWidth: nw, naturalHeight: nh } = naturalSize
		const cw = clientWidth()
		const ch = clientHeight()
		const mouseX = e.clientX
		const mouseY = e.clientY
		// 计算偏移量
		const imgPosX = nw>cw ? ((nw - cw)/2 + IMAGE_MARGIN) - (mr.x*(mouseX/cw)) : 0
		const imgPosY = nh>ch ? ((nh - ch)/2 + IMAGE_MARGIN) - (mr.y*(mouseY/ch)) : 0
		// 设置图片位置
		this.move.to({
            data: {
                x: imgPosX,
                y: imgPosY
            }
		})
	}

    /**
     * 状态切换
     **/
    getCoverCenterPosition = () => {
        const { page, coverNodeRef } = this.props
        let coverCenterPosition = { x: 0, y: 0 }
        if (coverNodeRef) {
            const coverNodeRect = coverNodeRef.getBoundingClientRect()
            coverCenterPosition = page === 0 ? {
                x: -windowWidth()/2 + coverNodeRect.left + coverNodeRect.width/2,
                y: -windowHeight()/2 + coverNodeRect.top + coverNodeRect.height/2
            } : {
                x: 0,
                y: -windowHeight()
            }
        }
        return coverCenterPosition
    }
	moveToCoverCenterPosition = () => {
        this.move.to({ data: this.getCoverCenterPosition() })
    }
    getPageCenterPosition = () => {
	    return { x: 0, y: 0 }
    }
    moveToPageCenterPosition = () => {
        this.move.to({ data: this.getPageCenterPosition() })
    }

	/**
	 * 位移控制器
	 **/
    handleMoveCenterPosition = (curr) => {
        const { show } = this.props
        if (this.refs.positionController) {
            this.refs.positionController.style.visibility = 'visible'
            this.refs.positionController.style.transform = `translate3d(${curr.x}px, ${curr.y}px, 0)`
            if (!show) {
                const scrollChange = window.pageYOffset - this.initialPageOffset
                this.refs.positionController.style.top = `calc(50% - ${scrollChange}px)`
            }
        }
    }

	render() {
		return (
			<div className={style.positionLayer}>
				<div ref="positionController">
                    { this.props.children }
				</div>
			</div>
		)
	}
}