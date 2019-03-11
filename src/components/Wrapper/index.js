/**
 * 包裹层
 * 储存主要状态，组织架构
 **/

// Libs
import React from 'react'
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

export default class Wrapper extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            // 显示
            show: false,
            // 缩放
            zoom: false,
            // 页数
            page: props.defaultPage && props.defaultPage>props.set.length-1 ? props.set.length-1 : 0,
            // 旋转
            rotate: 0,
        }
	  }

    componentDidMount() {
        setTimeout(this.mountSelf, 0)
    }
    componentWillUnmount() {
        window.addEventListener('scroll', this.handleScroll)
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    /**
     * 加载器
     **/
    mountSelf = () => {
        const { cover } = this.props
        const { page } = this.state
        this.setState({ show: true }, () => {
            // 隐藏封面原图 (当设定的 defaultPage 不为首张图片时, 图片将从上方进入, 此时不需要隐藏封面图片)
            if (page === 0) {
                cover.style.visibility = 'hidden'
            }
            // 绑定事件
            window.addEventListener('scroll', this.handleScroll)
            window.addEventListener('keydown', this.handleKeyDown)
        })
    }
    unMountSelf = () => {
        const { cover } = this.props
        const { page } = this.state
        // 显示封面原图（当前不为第一页时，遮罩从上方移除会迅速露出，需要立即显示，否则交由图片层处理）
        if(page!==0) cover.style.visibility = 'visible'
        this.setState({ show: false })
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
        switch (e.key) {
            case "Escape":
                // 退出
                hotKey.close && (zoom ? this.handleToggleZoom() : this.unMountSelf())
                break
            case " ":
                // 缩放
	            hotKey.zoom && this.handleToggleZoom()
                break
            case "ArrowLeft":
                // 上一张
                !zoom && hotKey.flip && hasImageSet && this.handleToPrevPage()
                break
            case "ArrowRight":
                // 下一张
                !zoom && hotKey.flip && hasImageSet && this.handleToNextPage()
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
    handleToPrevPage = this.handleSwitchPages("prev")
    handleToNextPage = this.handleSwitchPages("next")

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

        const { cover, remove, set, controller, preset, backdrop, radius, edge } = this.props
        const { show, zoom, page, rotate } = this.state

        const contextValue = {
            // Props
            // 内部
            cover, remove,
            // 基础数据
            set,
            // 功能控制
            controller, preset,
            // 界面样式
            backdrop, radius, edge,
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
                        toPrevPage={this.handleToPrevPage}
                        toNextPage={this.handleToNextPage}
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

    /**
     * 内部
     **/
    cover: {},
    remove: () => {},

    /**
     * 基础数据
     **/
    alt: defProp.alt,
    txt: defProp.txt,
    set: defProp.set,

    /**
     * 功能控制
     **/
    controller: defProp.controller,
    hotKey: defProp.hotKey,

    /**
     * 界面样式
     **/
    backdrop: defProp.backdrop,
    radius: defProp.radius,
    edge: defProp.edge,

    /**
     * 生命周期
     **/
    onZooming: defProp.onZooming,
    onSwitching: defProp.onSwitching,
    onRotating: defProp.onRotating,

}

Wrapper.propTypes = {

    /**
     * 内部
     **/
    cover: defType.cover,
    remove: defType.remove,

    /**
     * 基础数据
     **/
    alt: defType.alt,
    txt: defType.txt,
    set: defType.set,

    /**
     * 功能控制
     **/
    controller: defType.controller,
    hotKey: defType.hotKey,

    /**
     * 界面样式
     **/
    backdrop: defType.backdrop,
    radius: defType.radius,
    edge: defType.edge,

    /**
     * 生命周期
     **/
    onZooming: defType.onZooming,
    onSwitching: defType.onSwitching,
    onRotating: defType.onRotating,

}
