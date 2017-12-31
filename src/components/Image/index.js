/**
 * 图片层
 * 展示图片
 **/

// React Libs
import React,{ Fragment } from 'react'
// Style
import style from './index.less'
// Utils
import Lerp from '@/utils/lerp'
import {
	calcFitScale,
	addListenEventOf, removeListenEventOf
} from '@/utils'

// TODO: CONFIG
const IMAGE_MARGIN = 50

export default class Image extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			// 加载完成
			onLoad: true,
			// 加载错误
			onError: false,
			// 翻页方向
			direction: ''
		}
	}

    componentWillMount() {
        this.resize = new Lerp({
            data: this.getCoverScale(),
            poster: this.handleResizeScale
        })
	    addListenEventOf('resize', this.setToPageFitScale)
	}
    componentWillReceiveProps(nextProps) {
        const { show, zoom, page } = nextProps
	    if (show) {
        	if (zoom) {
		        this.setToOriginalScale()
	        } else {
		        this.setToPageFitScale()
	        }
	    } else {
		    this.setToCoverScale()
	    }
	    if (page) {
        	this.setState({
		        onLoad: true,
		        onError: false
	        })
	    }
    }
	componentWillUnmount() {
		removeListenEventOf('resize', this.setToPageFitScale)
	}

    /**
     * 状态切换设置大小
     **/
    getCoverScale = () => {
        const { coverNodeRef } = this.props
        let coverScale = { scale: 0 }
        if (coverNodeRef) {
            const coverNodeStyle = window.getComputedStyle(coverNodeRef)
            coverScale = { scale: parseInt(coverNodeStyle.width)/coverNodeRef.naturalWidth }
        }
        return coverScale
    }
    setToCoverScale = () => {
	    const { coverNodeRef, remove } = this.props
        this.resize.to({
			data: this.getCoverScale(),
			after: () => {
                // 显示封面原图
                if (coverNodeRef) coverNodeRef.style.visibility = 'visible'
                // 移除节点
                remove()
            }
		})
    }
    getPageFitScale = () => {
        const { coverNodeRef } = this.props
        let fitScale = { scale: 1 }
        if (coverNodeRef) {
            fitScale = { scale: calcFitScale(coverNodeRef, IMAGE_MARGIN) }
        }
        return fitScale
    }
    setToPageFitScale = () => {
	    const { coverNodeRef } = this.props
	    this.resize.to({ data: this.getPageFitScale() })
	    if (!coverNodeRef) {
		    this.refs.imageLayer.style.maxWidth = `calc(100vw - ${2*IMAGE_MARGIN}px)`
		    this.refs.imageLayer.style.maxHeight = `calc(100vh - ${2*IMAGE_MARGIN}px)`
	    }
    }
    getOriginalScale = () => {
        return { scale: 1 }
    }
    setToOriginalScale = () => {
	    const { coverNodeRef } = this.props
        this.resize.to({ data: this.getOriginalScale() })
	    if (!coverNodeRef) {
		    this.refs.imageLayer.style.maxWidth = ''
		    this.refs.imageLayer.style.maxHeight = ''
	    }
    }

	/**
	 * 尺寸控制器
	 **/
    handleResizeScale = (curr) => {
        if (this.refs.imageLayer) {
            this.refs.imageLayer.style.transform = `translate(-50%, -50%) scale(${curr.scale})`
        }
    }

	render() {
        const { zoom, page, imageSet } = this.props
		const { onLoad, onError } = this.state
		return (
			<Fragment>

				{/*加载动画*/}
				{onLoad && <span className={style.loading}><i/><i/><i/><i/></span>}

				{/*加载错误*/}
				{onError && <span>😖</span>}

				{/*图片*/}
				<img
		            key={page}
	                ref="imageLayer"
	                className={style.imageLayer}
	                src={imageSet[page].src}
	                alt={imageSet[page].alt}
	                onLoad={() => this.setState({ onLoad: false })}
	                onError={() => this.setState({ onError: true })}
	                onClick={zoom ? this.handleToggleZoom : ()=>{}}
				/>

			</Fragment>
		)
	}
}