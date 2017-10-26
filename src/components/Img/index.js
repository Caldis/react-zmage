/**
 * 图片放大叠层组件
 **/

// React Libs
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// Styles
import style from './index.less'
import { lineL, lineR, zoomStyle, prevStyle, nextStyle, pagesStyle, altStyle, imageStyle, bgOverlayStyle } from './stateStyle'
// Config
import { imageType } from '../../config'
const imageId = current => `zmage-${current}`

// 图片放大遮罩
class ImageOverlay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        	// 显示
            show: false,
	        // 缩放
	        zoom: false,     // 是否缩放
	        zoomNode: null,  // 目标节点
	        zoomSize: null,  // 原始尺寸
	        zoomRange: null, // 移动范围
	        zoomMargin: 100, // 移动边距
	        // 页数
            current: 0,
	        // 点击进来的封面尺寸
	        coverNodeRect: props.coverNodeRef ? props.coverNodeRef.getBoundingClientRect() : {
		        bottom:0, height:0, left:0, right:0, top:0, width:0, x:0, y:0
            }
        }
    }

    componentDidMount() {
        setTimeout(this.mountSelf, 100)
    }

    // 显示
    mountSelf = () => {
        const { coverNodeRef } = this.props
        // 隐藏封面原图
        if(coverNodeRef) coverNodeRef.style.visibility = 'hidden'
        // 显示遮罩
        this.setState({ show: true }, () => {
        	// 添加键盘监听
	        this.addListenKeyDown()
        })
    }
    // 移除
    unmountSelf = () => {
        const { coverNodeRef, overlayNodeRef } = this.props
	    const { current } = this.state
        this.setState({ show: false }, () =>{
        	// 移除键盘监听
	        this.removeListenKeyDown()
	        // 显示封面原图（当前不为第一页时，直接显示, 遮罩从上方移除）
            if(coverNodeRef && current!==0) coverNodeRef.style.visibility = 'visible'
            setTimeout(() => {
                // 显示封面原图（当前为第一页时，延迟显示）
	            if(coverNodeRef && current===0) coverNodeRef.style.visibility = 'visible'
                // 移除遮罩节点
                overlayNodeRef && overlayNodeRef.remove()
            }, 700)
        })
    }

    // 切换页面
	handleSwitchPages = (direction) => {
		return () => {
			const { imageSet } = this.props
			const { current } = this.state
			this.setState({ current: direction === "prev" ?
				Math.abs(imageSet.length + current - 1) % imageSet.length:
				(current + 1) % imageSet.length
			})
		}
	}
	// 切换缩放
	handleToggleZoom = () => {
    	const { zoom, zoomMargin, current } = this.state
		const id = imageId(current)
		const zoomNode = document.getElementById(id)
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight
		const naturalWidth = zoomNode.naturalWidth
		const naturalHeight = zoomNode.naturalHeight
		this.setState({
			zoom: !zoom,
			zoomNode,
			zoomSize: !zoom ? { naturalWidth, naturalHeight } : null,
			zoomRange: !zoom ? {
				x: naturalWidth - windowWidth + (2*zoomMargin),
				y: naturalHeight - windowHeight + (2*zoomMargin)
			} : null
		}, () => {
    		const { zoom } = this.state
			// 根据缩放选择添加或移除鼠标移动
			zoom ? this.addListenMouseMove() : this.removeListenMouseMove()
		})
	}
	// 开始监听鼠标移动
	addListenMouseMove = () => {
		const { zoomNode } = this.state
		window.addEventListener("mousemove", this.handleMouseMove, true)
		zoomNode.style.transition = 'all 0.1s'
	}
	// 停止监听鼠标移动
	removeListenMouseMove = () => {
		const { zoomNode } = this.state
		window.removeEventListener("mousemove", this.handleMouseMove, true)
		zoomNode.style.transform = 'translate(0px, 0px)'
		zoomNode.style.transition = 'all 0.65s cubic-bezier(0.15, 1, 0.3, 1)'
	}

	// 关联键盘快捷键
	handleKeyDown = (e) => {
    	const { zoom } = this.state
		const toPrevPage = this.handleSwitchPages("prev")
		const toNextPage = this.handleSwitchPages("next")
		switch (e.key) {
			case "ArrowLeft":
				// 上一张
				toPrevPage()
				break
			case "ArrowRight":
				// 下一张
				toNextPage()
				break
			case "Enter":
				// 缩放
				this.handleToggleZoom()
				break
			case "Escape":
				// 退出
				zoom ? this.handleToggleZoom() : this.unmountSelf()
				break
			default:
				return
		}
		// 阻止默认事件
		e.preventDefault()
	}
	// 开始监听键盘快捷键
	addListenKeyDown = () => {
		window.addEventListener("keydown", this.handleKeyDown, true)
	}
	// 停止监听键盘快捷键
	removeListenKeyDown = () => {
		window.removeEventListener("keydown", this.handleKeyDown, true)
	}

	// 处理鼠标移动
	handleMouseMove = (e) => {
		const { zoomNode, zoomSize, zoomRange, zoomMargin } = this.state
		const { naturalWidth, naturalHeight } = zoomSize
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight
		const mouseX = e.clientX
		const mouseY = e.clientY
		// 计算偏移量
		const imgPosX = naturalWidth>windowWidth ?
			((naturalWidth - windowWidth)/2 + zoomMargin) - (zoomRange.x*(mouseX/windowWidth)) : 0
		const imgPosY = naturalHeight>windowHeight ?
			((naturalHeight - windowHeight)/2 + zoomMargin) - (zoomRange.y*(mouseY/windowHeight)) : 0
		// 设置图片位置
		zoomNode.style.transform = `translate(${imgPosX}px, ${imgPosY}px)`
	}


    render() {
        const { coverNodeRef, lazyLoad, indicator, imageSet } = this.props
        const { show, zoom, current, coverNodeRect } = this.state
	    const hasImageSet = imageSet && imageSet.constructor===Array
	    const id = imageId(current)

        return (
            <div className={style.imageOverlayContainer}>

	            {/*放大按钮*/}
	            {indicator && !zoom &&
	            <div className={style.zoomButton} style={zoomStyle(show)} onClick={this.handleToggleZoom}/>}

	            {/*关闭按钮*/}
	            {indicator &&
	            <div className={style.closeButton} onClick={zoom ? this.handleToggleZoom : this.unmountSelf}>
		            <div className={style.crossLine} style={lineL(show)}/>
		            <div className={style.crossLine} style={lineR(show)}/>
	            </div>}

	            {/*切换按钮*/}
	            {indicator && hasImageSet && !zoom &&
	            <div className={style.switchButton} style={prevStyle(show)} onClick={this.handleSwitchPages("prev")}>
		            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
			            <path d="M0-.5h24v24H0z" fill="none"/>
		            </svg>
	            </div>}
	            {indicator && hasImageSet && !zoom &&
	            <div className={style.switchButton} style={nextStyle(show)} onClick={this.handleSwitchPages("next")}>
		            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
			            <path d="M0-.25h24v24H0z" fill="none"/>
		            </svg>
	            </div>}

	            {/*页数指示*/}
	            {indicator && hasImageSet && !zoom &&
                <div className={style.pages} style={pagesStyle(show)}>
		            <span>{`${current+1} / ${imageSet.length}`}</span>
	            </div>}

	            {/*图片标题*/}
	            {hasImageSet && !zoom ?
	            imageSet[current].alt &&
		            <div className={style.imgAlt} style={altStyle(show)}>
			            {imageSet[current].alt}
		            </div>:
	            imageSet.alt &&
		            <div className={style.imgAlt} style={altStyle(show)}>
			            {imageSet.alt}
		            </div>}

	            {/*图片文字*/}
	            {false && hasImageSet ?
		            imageSet[current].text &&
		            <div className={style.imgText}>
			            {imageSet[current].text}
		            </div>:
		            imageSet.text &&
		            <div className={style.imgText}>
			            {imageSet.text}
		            </div>
	            }

                {/*图片本体*/}
	            <img
		            id={id}
		            src={hasImageSet ? imageSet[current].src : imageSet.src}
		            alt={hasImageSet ? imageSet[current].alt : imageSet.alt}
		            style={imageStyle(id, show, zoom, current, coverNodeRef, coverNodeRect)}
	            />

                {/*背景遮罩*/}
                <div
                    className={style.backgroundOverlay}
                    onClick={zoom ? this.handleToggleZoom : this.unmountSelf}
                    style={bgOverlayStyle(show)}
                />

            </div>
        )
    }
}
// 默认参数
ImageOverlay.defaultProps = {
    // 原图封面节点引用
    coverNodeRef: null,
    // 遮罩节点引用
    overlayNodeRef: null,
    // 图片参数
    imageSet: null
}
// 参数类型
ImageOverlay.propTypes = {
    // 原图封面节点引用
    coverNodeRef: PropTypes.object,
    // 遮罩节点引用
    overlayNodeRef: PropTypes.object,
    // 图片参数
    imageSet: PropTypes.oneOfType([
        PropTypes.arrayOf(imageType),
        imageType
    ])
}

// 调用以显示 ImageOverlay
const showImage = ({ id, lazyLoad, indicator, imageSet }) => {
    // 封面图片节点
    const coverNodeRef = document.querySelector(`#${id}`)

    // 容器节点ID
    const overlayId = `${id}-overlay`

    // 移除先前的容器节点
    const previousOverlayNode = document.querySelector(`#${overlayId}`)
    previousOverlayNode && previousOverlayNode.remove()

    // 插入新的容器节点
    const overlayNode = document.createElement('div')
    overlayNode.id = overlayId
    document.body.appendChild(overlayNode)
    const overlayNodeRef = document.querySelector(`#${overlayId}`)

    // 渲染组件容器节点
    overlayNodeRef && ReactDOM.render(
        <ImageOverlay
            coverNodeRef={coverNodeRef}
            overlayNodeRef={overlayNodeRef}
            lazyLoad={lazyLoad}
            indicator={indicator}
            imageSet={imageSet}
        />, overlayNodeRef)

    // 返回容器节点引用, 调用 remove() 即可移除
    return overlayNodeRef
}

export { showImage, ImageOverlay }
export default ImageOverlay