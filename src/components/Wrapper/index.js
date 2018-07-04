/**
 * 包裹层
 * 储存主要状态，组织架构
 **/

// React Libs
import React from 'react'
import PropTypes from 'prop-types'
// Style
import style from './index.less'
// Components
import Control from '../Control'
import Image from '../Image'
import Background from '../Background'
// Config
import { defType, defProp } from '@/config/default'
// Utils
import {
    addListenEventOf, removeListenEventOf,
    mobileCheck, scrollWidth, windowHeight,
} from '@/utils'

export default class Wrapper extends React.PureComponent {
	constructor(props) {
		super(props)

        // 移动端检测
        const mobile = mobileCheck()

		this.state = {
			// 显示
			show: false,
            // 缩放
            zoom: false,
			// 当前页数
			page: 0,
            // 是否移动端
            mobile: mobile,
            // 图片距屏幕边距 (如果有)
            margin: mobile ? 0 : props.margin,
		}
	}

    componentDidMount() {
        this.mountSelf()
    }
    componentWillUnmount() {
        removeListenEventOf('scroll', this.handleScroll)
	    removeListenEventOf('keydown', this.handleKeyDown)
        removeListenEventOf('touchmove', this.handleScroll)
    }

    /**
     * 加载器
     **/
    mountSelf = () => {
        const { cover } = this.props
        this.setState({ show: true }, () => {
            // 隐藏封面原图
            cover.style.visibility = 'hidden'
            // 绑定事件
            addListenEventOf('scroll', this.handleScroll)
            addListenEventOf('keydown', this.handleKeyDown)
            addListenEventOf('touchmove', this.handleScroll)
        })
    }
    unmountSelf = () => {
        const { cover,remove } = this.props
        const { page } = this.state
        // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）
        if(page!==0) cover.style.visibility = 'visible'
        this.setState({ show: false },function(){
            cover.style.visibility = 'visible';
            remove()
        })
    }

    /**
     * 事件处理
     **/
    handleKeyDown = (e) => {
        // 阻止默认事件
        e.preventDefault()
        const { set, hotKey } = this.props
        const { zoom } = this.state
        const hasImageSet = set && set.constructor===Array
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
    handleScroll = () => {
        this.state.show && this.unmountSelf()
    }

    /**
     * 翻页控制
     **/
    handleJumpPages = (page) => {
        this.setState({ page })
    }
    handleSwitchPages = (direction) => {
        return () => {
            const { set } = this.props
            const { page } = this.state
            this.setState({
                page: direction === "prev" ?
                    Math.abs(set.length + page - 1) % set.length:
                    (page + 1) % set.length
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
        const { cover, set, controller, remove } = this.props
        const { show, zoom, page, mobile, margin } = this.state
		return (
			<div className={style.wrapperLayer}>

				{/*背景层*/}
                <Background
                    show={show}
                    zoom={zoom}
                    unmountSelf={this.unmountSelf}
                    toggleZoom={this.handleToggleZoom}
                />

                {/*控制层*/}
                <Control
                    set={set}
                    show={show}
                    zoom={zoom}
                    page={page}
                    mobile={mobile}
                    controller={controller}
                    unmountSelf={this.unmountSelf}
                    jumpPages={this.handleJumpPages}
                    toggleZoom={this.handleToggleZoom}
                />

                {/*图片层*/}
                <Image
                    set={set}
                    show={show}
                    zoom={zoom}
                    page={page}
                    cover={cover}
                    mobile={mobile}
                    remove={remove}
                    margin={margin}
                    toggleZoom={this.handleToggleZoom}
                />

            </div>
		)
	}
}

Wrapper.defaultProps = {
	// 封面节点
    cover: {},
	// 图片列表
    set: [],
	// 控制器
	controller: defProp.controller,
	// 快捷键
	hotKey: defProp.hotKey,
    // 图片距屏幕边距 (如果有)
    margin: defProp.margin,
	// 卸载函数
	remove: () => {}
}

Wrapper.propTypes = {
	// 封面节点
    cover: PropTypes.object,
	// 图片列表
    set: defType.set,
	// 控制器
	controller: defType.controller,
	// 快捷键
	hotKey: defType.hotKey,
    // 图片距屏幕边距 (如果有)
    margin: defType.margin,
	// 卸载函数
	remove: PropTypes.func
}