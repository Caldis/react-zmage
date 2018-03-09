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
	addListenEventOf, removeListenEventOf,
    mobilecheck
} from '@/utils'

// 移动端检测
const isMobile = mobilecheck()
// 图片边距
const IMAGE_MARGIN = isMobile ? 0 : 50

export default class Image extends React.Component {
	constructor(props) {
		super(props)

		// 封面样式
		this.coverNodeStyle = {}

		this.state = {
			// 加载完成
			onLoad: true,
			// 加载错误
			onError: false,
			// 翻页方向
			direction: '',
			// 样式
            transStyle: {}
		}
	}

    componentWillMount() {
        this.resize = new Lerp({
            data: this.getCoverStyle(),
            poster: this.handleSetStyle
        })
	    addListenEventOf('resize', this.setToPageFitStyle)
	}
    componentWillReceiveProps(nextProps) {
        const { show, zoom, page } = nextProps
	    if (show) {
        	if (zoom) {
		        this.setToOriginalStyle()
	        } else {
		        this.setToPageFitStyle()
	        }
	    } else {
		    this.setToCoverStyle()
	    }
	    if (page) {
        	this.setState({
		        onLoad: true,
		        onError: false
	        })
	    }
    }
	componentWillUnmount() {
		removeListenEventOf('resize', this.setToPageFitStyle)
	}

    /**
     * 状态切换设置大小
     **/
    getCoverStyle = () => {
        const { coverNodeRef } = this.props
        let coverStyle = { scale: 0, borderWidth:0, borderRadius: 0 }
        if (coverNodeRef) {
            const coverNodeStyle = window.getComputedStyle(coverNodeRef)
			this.coverNodeStyle = coverNodeStyle
            coverStyle = {
            	scale: (parseInt(coverNodeStyle['width']||0)-2*parseInt(coverNodeStyle['border-width']||0))/coverNodeRef.naturalWidth,
                borderWidth: parseInt(coverNodeStyle['border-width']||0),
                borderRadius: parseInt(coverNodeStyle['border-radius']||0),
            }
        }
        return coverStyle
    }
    setToCoverStyle = () => {
	    const { coverNodeRef, remove } = this.props
        this.resize.to({
			data: this.getCoverStyle(),
			after: () => {
                // 显示封面原图
                if (coverNodeRef) coverNodeRef.style.visibility = 'visible'
                // 移除节点
                remove()
            }
		})
    }
    getPageFitStyle = () => {
        const { coverNodeRef } = this.props
        let fitScale = { scale: 1,  borderWidth: 0, borderRadius: 0 }
        if (coverNodeRef) {
            fitScale = {
            	scale: calcFitScale(coverNodeRef, IMAGE_MARGIN),
                borderWidth: 0,
                borderRadius: 5
            }
        }
        return fitScale
    }
    setToPageFitStyle = () => {
	    this.resize.to({ data: this.getPageFitStyle() })
    }
    getOriginalStyle = () => {
        return {
        	scale: 1,
			borderWidth: 0,
			borderRadius: 5
        }
    }
    setToOriginalStyle = () => {
        this.resize.to({ data: this.getOriginalStyle() })
    }

	/**
	 * 尺寸控制器
	 **/
    handleSetStyle = (curr) => {
    	const { show, zoom, coverNodeRef } = this.props
		this.setState({
            transStyle: {
            	// 插值样式
                transform: `translate3d(-50%, -50%, 0) scale3d(${curr.scale}, ${curr.scale}, 1)`,
                borderRadius: `${curr.borderRadius/curr.scale}px`,
                borderWidth: `${curr.borderWidth/curr.scale}px`,
				// 固定样式
				boxShadow: show ? 'none' :  this.coverNodeStyle['box-shadow'],
                boxSizing: this.coverNodeStyle['box-sizing'],
                border: this.coverNodeStyle['border'],
				// 无封面图片处理
                maxWidth: coverNodeRef ? '' : zoom ? 'max-content' : `calc(100vw - ${2*IMAGE_MARGIN}px)`,
                maxHeight: coverNodeRef ? '' : zoom ? 'max-content' : `calc(100vh - ${2*IMAGE_MARGIN}px)`
			}
		})
    }

	render() {
        const { zoom, page, imageSet, toggleZoom } = this.props
		const { onLoad, onError, transStyle } = this.state
		return (
			<Fragment>

				{/*加载动画*/}
				{onLoad && <span className={style.loading}><i/><i/><i/><i/></span>}

				{/*加载错误*/}
				{onError && <span>😖</span>}

				{/*图片*/}
				<img
		            key={page}
	                className={style.imageLayer}
					style={transStyle}
	                src={imageSet[page].src}
	                alt={imageSet[page].alt}
	                onLoad={() => this.setState({ onLoad: false })}
	                onError={() => this.setState({ onError: true })}
	                onClick={zoom ? toggleZoom : ()=>{}}
				/>

			</Fragment>
		)
	}
}