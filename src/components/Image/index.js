/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// React Libs
import React,{ Fragment } from 'react'
// React Motion
import { Motion, spring } from 'react-motion'
// Style
import style from './index.less'
// Utils
import {
	calcFitScale,
	addListenEventOf, removeListenEventOf,
} from '@/utils'

export default class Image extends React.Component {
	constructor(props) {
		super(props)

		// 初始封面尺寸
		const { scale, borderWidth, borderRadius  } = this.coverSize()
        // 页面缩放时重设尺寸
        addListenEventOf('resize', this.handleResize)

		this.state = {
			// 加载完成
			onLoad: true,
			// 加载错误
			onError: false,
			// 翻页方向
			direction: '',
            // 样式
            defaultStyle: { scale, borderWidth, borderRadius },
            currentStyle: { scale, borderWidth, borderRadius },
		}
	}

    componentWillReceiveProps(nextProps) {
        const { show, zoom, page } = nextProps
	    if (show) {
        	if (zoom) {
		        this.resizeTo(this.originalSize())
	        } else {
                this.resizeTo(this.pageFitSize())
	        }
	    } else {
            this.resizeTo(this.coverSize())
            removeListenEventOf('resize', this.handleResize)
	    }
	    if (page) {
        	this.setState({
		        onLoad: true,
		        onError: false
	        })
	    }
    }

    /**
     * 尺寸控制
     **/
    coverSize = () => {
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
    pageFitSize = () => {
        const { coverNodeRef, margin } = this.props
        let fitScale = { scale: 1,  borderWidth: 0, borderRadius: 0 }
        if (coverNodeRef) {
            fitScale = {
            	scale: calcFitScale(coverNodeRef, margin),
                borderWidth: 0,
                borderRadius: 5
            }
        }
        return fitScale
    }
    originalSize = () => {
        return {
        	scale: 1,
			borderWidth: 0,
			borderRadius: 5
        }
    }
    resizeTo = ({ scale, borderWidth, borderRadius }) => {
        this.setState({
            currentStyle: { scale, borderWidth, borderRadius }
        })
    }

    /**
     * 事件响应
     **/
    handleResize = () => {
        this.resizeTo(this.pageFitSize())
    }
    handleMotionRest = () => {
        const { coverNodeRef, remove } = this.props
        const { show } = this.props
        if (!show) {
            // 显示封面原图
            if (coverNodeRef) coverNodeRef.style.visibility = 'visible'
            // 移除节点
            remove()
        }
    }


    render() {
        const { show, zoom, page, imageSet, coverNodeRef, toggleZoom } = this.props
		const { onLoad, onError, margin, defaultStyle, currentStyle } = this.state
		return (
			<Fragment>

				{/*加载动画*/}
				{onLoad && <span className={style.loading}><i/><i/><i/><i/></span>}

				{/*加载错误*/}
				{onError && <span>😖</span>}

				{/*图片*/}
				<Motion
                    defaultStyle={defaultStyle}
                    style={{
                        scale: spring(currentStyle.scale),
                        borderWidth: spring(currentStyle.borderWidth),
                        borderRadius: spring(currentStyle.borderRadius)
                    }}
                    onRest={this.handleMotionRest}
                >
                    {({ scale, borderWidth, borderRadius }) =>
                        <img
                            key={page}
                            className={style.imageLayer}
                            style={{
                                // 插值样式
                                transform: `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`,
                                borderRadius: `${borderRadius/scale}px`,
                                borderWidth: `${borderWidth/scale}px`,
                                // 固定样式
                                boxShadow: 'none',
                                // boxSizing: this.coverNodeStyle['box-sizing'],
                                border: this.coverNodeStyle['border'],
                                // 无封面图片处理
                                maxWidth: coverNodeRef ? '' : zoom ? 'max-content' : `calc(100vw - ${2*margin}px)`,
                                maxHeight: coverNodeRef ? '' : zoom ? 'max-content' : `calc(100vh - ${2*margin}px)`
                            }}
                            src={imageSet[page].src}
                            alt={imageSet[page].alt}
                            onLoad={() => this.setState({ onLoad: false })}
                            onError={() => this.setState({ onError: true })}
                            onClick={zoom ? toggleZoom : ()=>{}}
                        />
                    }
                </Motion>

			</Fragment>
		)
	}
}