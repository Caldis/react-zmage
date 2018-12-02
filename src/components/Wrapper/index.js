/**
 * 包裹层
 * 储存主要状态，组织架构
 **/

// Libs
import React from 'react'
import PropTypes from 'prop-types'
// Context
import { Context } from "@/components/context"
// Style
import style from './index.less'
// Components
import Control from '../Control'
import Image from '../Image'
import Background from '../Background'
// Config
import { defType, defProp } from '@/config/default'
// Utils
import { addListenScroll, removeListenScroll, mobileCheck, scrollWidth, windowHeight } from '@/utils'

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
            // 页数
            page: this.props.page||0,
            // 旋转
            rotate: 0,
            // 是否移动端
            mobile: mobile,
            // 图片距屏幕边距 (如果有)
            edge: mobile ? 0 : props.edge,
        }
	  }

    componentDidMount() {
        setTimeout(this.mountSelf, 0)
    }
    componentWillUnmount() {
        removeListenScroll(this.handleScroll)
        window.removeEventListener('keydown', this.handleKeyDown)
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
            addListenScroll(this.handleScroll)
            window.addEventListener('keydown', this.handleKeyDown)
        })
    }
    unMountSelf = () => {
        const { cover } = this.props
        const { page } = this.state
        // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）
        if(page!==0) cover.style.visibility = 'visible'
        this.setState({
            show: false,
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
	            hotKey.close && (zoom ? this.handleToggleZoom() : this.unMountSelf())
                break
            default:
                return
        }
    }
    handleScroll = () => {
        this.state.show && this.unMountSelf()
    }

    /**
     * 翻页控制
     **/
    handleToPages = (page) => {
        const { onSwitching } = this.props
        this.setState({ page }, () => {
            typeof onSwitching === "function" && onSwitching(this.state.page)
        })
    }
    handleSwitchPages = (direction) => {
        const { onSwitching } = this.props
        return () => {
            const { set } = this.props
            const { page } = this.state
            this.setState({
                page: direction === "prev" ?
                    Math.abs(set.length + page - 1) % set.length:
                    (page + 1) % set.length
            }, () => {
                typeof onSwitching === "function" && onSwitching(this.state.page)
            })
        }
    }

    /**
     * 缩放控制
     **/
    handleToggleZoom = () => {
        const { onZooming } = this.props
        this.setState({
            zoom: !this.state.zoom
        }, () => {
            typeof onZooming === "function" && onZooming(this.state.zoom)
        })
    }

    /**
     * 旋转控制
     **/
    handleToggleRotate = (direction) => {
        const { onRotating } = this.props
        switch (direction) {
            case "left":
                return () => this.setState({
                    rotate: this.state.rotate-90
                }, () => {
                    typeof onRotating === "function" && onRotating(this.state.rotate)
                })
            case "right":
                return () => this.setState({
                    rotate: this.state.rotate+90
                }, () => {
                    typeof onRotating === "function" && onRotating(this.state.rotate)
                })
            default:
                return () => this.setState({
                    rotate: 0
                }, () => {
                    typeof onRotating === "function" && onRotating(0)
                })
        }
    }

    render() {
        const { cover, set, controller, backdrop, mobile, edge, remove } = this.props
        const { show, zoom, page, rotate } = this.state

        const contextValue = {
            // Props
            cover, set, controller, backdrop, mobile, edge, remove,
            // State
            show, zoom, page, rotate,
        }

        return (
            <Context.Provider value={contextValue}>

                <div className={style.wrapperLayer}>

                    {/*背景层*/}
                    <Background
                        unmountSelf={this.unMountSelf}
                        toggleZoom={this.handleToggleZoom}
                    />

                    {/*控制层*/}
                    <Control
                        unmountSelf={this.unMountSelf}
                        toPages={this.handleToPages}
                        toggleZoom={this.handleToggleZoom}
                        toggleRotate={this.handleToggleRotate}
                    />

                    {/*图片层*/}
                    <Image
                        toggleZoom={this.handleToggleZoom}
                    />

                </div>

            </Context.Provider>
        )
    }
}

Wrapper.defaultProps = {

    // 封面节点
    cover: {},
    // 卸载函数
    remove: () => {},

    /**
     * 基础数据
     **/
    // 图片列表
    set: defProp.set,

    /**
     * 功能控制
     **/
    // 控制器
    controller: defProp.controller,
    // 快捷键
    hotKey: defProp.hotKey,

    /**
     * 界面样式
     **/
    // 背景
    backdrop: defProp.backdrop,
    // 边距
    edge: defProp.edge,

    /**
     * 生命周期
     **/
    onZooming: defProp.onZooming,
    onSwitching: defProp.onSwitching,
    onRotating: defProp.onRotating,

}

Wrapper.propTypes = {

    // 封面节点
    cover: defType.cover,
    // 卸载函数
    remove: defType.remove,

    /**
     * 基础数据
     **/
    // 图片列表
    set: defType.set,

    /**
     * 功能控制
     **/
    // 控制器
    controller: defType.controller,
    // 快捷键
    hotKey: defType.hotKey,

    /**
     * 界面样式
     **/
    // 背景
    backdrop: defType.backdrop,
    // 边距
    edge: defType.edge,

    /**
     * 生命周期
     **/
    onZooming: defType.onZooming,
    onSwitching: defType.onSwitching,
    onRotating: defType.onRotating,

}
