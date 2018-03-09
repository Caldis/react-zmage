/**
 * 包裹层
 * 储存主要状态，组织架构
 **/

// React Libs
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// Style
import style from './index.less'
// Components
import Position from '../Position'
import Control from '../Control'
import Image from '../Image'
import Background from '../Background'
// Config
import { defType, defProp } from '@/config/default'
// Utils
import { addListenEventOf, removeListenEventOf } from '@/utils'

class Wrapper extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			// 显示
			show: false,
            // 缩放
            zoom: false,
			// 当前页数
			page: 0
		}
	}

    componentDidMount() {
        this.mountSelf()
    }
    componentWillUnmount() {
	    removeListenEventOf('keydown', this.handleKeyDown)
        removeListenEventOf('wheel', this.handleScroll)
        removeListenEventOf('touchmove', this.handleScroll)
    }

    /**
     * 加载器
     **/
    mountSelf = () => {
        const { coverNodeRef } = this.props
        // 隐藏封面原图
        if(coverNodeRef) coverNodeRef.style.visibility = 'hidden'
	    // 显示并绑定事件
	    this.setState({ show: true }, () => {
		    addListenEventOf('keydown', this.handleKeyDown)
		    addListenEventOf('wheel', this.handleScroll)
		    addListenEventOf('touchmove', this.handleScroll)
	    })
    }
    unmountSelf = () => {
        const { coverNodeRef } = this.props
        const { page } = this.state
        // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）
        if(coverNodeRef && page!==0) coverNodeRef.style.visibility = 'visible'
        this.setState({ show: false })
    }

    /**
     * 事件处理
     **/
    handleKeyDown = (e) => {
        // 阻止默认事件
        e.preventDefault()
        const { imageSet, hotKey } = this.props
        const { zoom } = this.state
        const hasImageSet = imageSet && imageSet.constructor===Array
        const toPrevPage = this.handleSwitchPages("prev")
        const toNextPage = this.handleSwitchPages("next")
        switch (e.key) {
            case "ArrowLeft":
                // 上一张
                !zoom && hotKey.flip && hasImageSet && toPrevPage()
                break
            case "ArrowRight":
                // 下一张
                !zoom && hotKey.flip && hasImageSet && toNextPage()
                break
            case " ":
                // 缩放
	            hotKey.zoom && this.handleToggleZoom()
                break
            case "Escape":
                // 退出
	            hotKey.close && (zoom ? this.handleToggleZoom() : this.unmountSelf())
                break
            default:
                return
        }
    }
    handleScroll = (e) => {
        this.state.show && this.unmountSelf()
    }

    /**
     * 翻页控制
     **/
    handleSwitchPages = (direction) => {
        return () => {
            const { imageSet } = this.props
            const { page } = this.state
            this.setState({
                page: direction === "prev" ?
                    Math.abs(imageSet.length + page - 1) % imageSet.length:
                    (page + 1) % imageSet.length
            })
        }
    }

    /**
     * 缩放控制
     **/
    handleToggleZoom = () => {
        this.setState({
            zoom: !this.state.zoom
        })
    }

	render() {
        const { coverNodeRef, imageSet, controller, remove } = this.props
        const { show, zoom, page } = this.state
		return (
			<div className={style.wrapperLayer}>
				{/*控制层*/}
                <Control
                    show={show}
                    zoom={zoom}
                    page={page}
                    imageSet={imageSet}
                    controller={controller}
                    unmountSelf={this.unmountSelf}
                    toggleZoom={this.handleToggleZoom}
                    switchPages={this.handleSwitchPages}
                />

				{/*位移控制层*/}
                <Position
                    show={show}
                    zoom={zoom}
                    page={page}
                    imageSet={imageSet}
                    coverNodeRef={coverNodeRef}
                >
	                {/*图片层*/}
                    <Image
                        show={show}
                        zoom={zoom}
                        page={page}
                        imageSet={imageSet}
                        coverNodeRef={coverNodeRef}
                        toggleZoom={this.handleToggleZoom}
                        remove={remove}
                    />
                </Position>

				{/*背景层*/}
                <Background
                    show={show}
                    unmountSelf={this.unmountSelf}
                    toggleZoom={this.handleToggleZoom}
                />

            </div>
		)
	}
}

Wrapper.defaultProps = {
	// 封面节点
	coverNodeRef: {},
	// 图片列表
	imageSet: [],
	// 控制器
	controller: defProp.controller,
	// 快捷键
	hotKey: defProp.hotKey,
	// 卸载函数
	remove: () => {}
}

Wrapper.propTypes = {
	// 封面节点
	coverNodeRef: PropTypes.object,
	// 图片列表
	imageSet: defType.imageSet,
	// 控制器
	controller: defType.controller,
	// 快捷键
	hotKey: defType.hotKey,
	// 卸载函数
	remove: PropTypes.func
}

// 主动调用显示，插入控件到指定节点（Body末端）
const showImage = ({ id, imageSet, controller, hotKey }) => {

	// 封面节点
	const coverNodeRef = document.getElementById(id)

	// 容器节点
	const wrapperNodeId = `zmage-wrapper`
	const previousOverlayNode = document.getElementById(wrapperNodeId)
	previousOverlayNode && previousOverlayNode.remove()
	const wrapperNode = document.createElement('div')
	wrapperNode.id = wrapperNodeId
	document.body.appendChild(wrapperNode)
	const wrapperNodeRef = document.getElementById(wrapperNodeId)

	// 卸载函数
	const remove = () => {
		ReactDOM.unmountComponentAtNode(wrapperNodeRef)
		wrapperNodeRef.remove()
	}

	// 插入容器节点
    wrapperNodeRef && ReactDOM.render(
		<Wrapper
			coverNodeRef={coverNodeRef}
			imageSet={imageSet}
			controller={Object.assign({}, defProp.controller, controller)}
			hotKey={Object.assign({}, defProp.hotKey, hotKey)}
			remove={remove}
		/>, wrapperNodeRef)

	// 对于函数调用模式，返回容器节点引用, 调用 remove() 即可移除（无动画）
	return {
		node: wrapperNodeRef,
		remove: remove
	}
}

export { showImage, Wrapper }