/**
 * 图片层
 * 展示图片, 控制图片尺寸
 **/

// React Libs
import React, { Fragment } from 'react'
// React Motion
import { Motion, spring } from 'react-motion'
// Style
import style from './index.less'
// Utils
import { calcFitScale } from '@/utils'
// Config
import { defProp } from "@/config/default";

export default class Image extends React.PureComponent {
	constructor(props) {
		super(props)

		// 初始封面尺寸
		const { scale } = this.coverSize()

		this.state = {
            // 样式
            defaultStyle: { scale },
            currentStyle: { scale },
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
            if (this.props.mobile) {
                setTimeout(this.handleMotionRest, 600)
            }
	    }
	    if (page !== this.props.page) {
            this.resizeTo(this.pageFitSize())
        }
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
    resizeTo = ({ scale }) => {
        this.setState({
            currentStyle: { scale },
            onLoad: true,
            onError: false
        })
    }

    /**
     * 事件响应
     **/
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


    render() {
        const { zoom, page, set, toggleZoom } = this.props
		const { defaultStyle, currentStyle } = this.state
		return (
			<Fragment>

				{/*图片*/}
				<Motion
                    defaultStyle={defaultStyle}
                    style={{ scale: spring(currentStyle.scale, defProp.springOption) }}
                    onRest={this.handleMotionRest}
                >
                    {({ scale }) =>{
                        return (<img
                            key={page}
                            className={style.imageLayer}
                            style={{
                                transform: `translate3d(-50%, -50%, 0) scale3d(${scale}, ${scale}, 1)`,
                                cursor: zoom ? 'zoom-out' : 'initial'
                            }}
                            src={set[page].src}
                            alt={set[page].alt}
                            title={set[page].alt}
                            onClick={zoom ? toggleZoom : ()=>{}}
                        />)}
                    }
                </Motion>

			</Fragment>
		)
	}
}