/**
 * 容器层
 * 储存主要状态
 **/

// Libs
import React from 'react'
// Style
import style from './Browser.less'
// Components
import Portals from '../Portal'
import Control from '../Control'
import Image from '../Image'
import Background from '../Background'
// Utils
import { animationDuration } from "@/config/anim"
import { Context } from '../context'
import { getTargetPage } from "@/utils"
import { pageSet, showCover, hideCover, pageIsCover } from './Browser.utils'

export default class Browser extends React.PureComponent {

    constructor(props) {
        super(props)

        const { page, pageIsCover } = pageSet(props.coverRef, props.defaultPage, props.set)
        this.state = {
            // 载入
            mount: false,
            // 显示
            show: false,
            // 缩放
            zoom: false,
            // 旋转
            rotate: 0,
            // 页数
            page,
            pageIsCover,
        }
    }

    componentDidMount() {
        if (this.props.browsing) {
            this.init()
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.browsing) {
            return {
                mount: true,
                // 仅在当前状态为未查看时重置页面状态
                ...(!prevState.show ? pageSet(nextProps.coverRef, nextProps.defaultPage, nextProps.set) : {}),
            }
        }
        return null
    }
    componentDidUpdate(prevProps) {
        if (prevProps.browsing !== this.props.browsing) {
            if (this.props.browsing) {
                this.init()
            } else {
                this.unInit()
            }
        }
    }
    componentWillUnmount() {
        this.unInit({ force:true })
    }

    /**
     * 载入/卸载
     **/
    init = () => {
        const { isControlled, coverRef, set, onBrowsing } = this.props
        const { show, page, pageIsCover } = this.state
        if (!show) {
            window.addEventListener('keydown', this.handleKeyDown)
            window.addEventListener('scroll', this.handleScroll)
            window.requestAnimationFrame(() => {
                this.setState({ show:true, zoom:false, rotate:0, }, () => {
                    pageIsCover && hideCover(coverRef, set, page)
                    !isControlled && typeof onBrowsing === "function" && onBrowsing(true)
                })
            })
        }
    }
    unInit = ({ force }={}) => {
        const { isControlled, coverRef, set, onBrowsing } = this.props
        const { show, page, pageIsCover } = this.state
        if (show || force) {
            window.removeEventListener('keydown', this.handleKeyDown)
            window.removeEventListener('scroll', this.handleScroll)
            !pageIsCover && showCover(coverRef, set, page)
            this.setState({ show:false, zoom:false, rotate:0 }, () => setTimeout(() => {
                this.setState({ mount:false }, () => {
                    pageIsCover && showCover(coverRef, set, page)
                    !isControlled && typeof onBrowsing === "function" && onBrowsing(false)
                })
            }, animationDuration))
        }
    }


    /**
     * 事件处理
     **/
    handleKeyDown = (e) => {
        // 阻止默认事件
        const { set, hotKey, loop, outBrowsing } = this.props
        const { zoom, page } = this.state
        const hasImageSet = Array.isArray(set)
        switch (e.key) {
            case "Esc":
            case "Escape":
                // 退出
                e.preventDefault()
                hotKey.close && (zoom ? this.handleToggleZoom() : outBrowsing())
                break
            case " ":
            case "Spacebar":
                // 缩放
                e.preventDefault()
	            hotKey.zoom && this.handleToggleZoom()
                break
            case "Left":
            case "ArrowLeft":
                // 上一张
                e.preventDefault()
                !(!loop && page===0) && !zoom && hotKey.flip && hasImageSet && this.handleToPrevPage()
                break
            case "Right":
            case "ArrowRight":
                // 下一张
                e.preventDefault()
                !(!loop && page===set.length-1) && !zoom && hotKey.flip && hasImageSet && this.handleToNextPage()
                break
            default:
                return
        }
    }
    handleScroll = () => {
        this.state.show && this.props.outBrowsing()
    }

    /**
     * 翻页控制
     **/
    handleToPage = (page) => {
        const { coverRef, set, onSwitching } = this.props
        this.setState({
            page,
            pageIsCover: pageIsCover(coverRef, set, page),
        }, () => {
            typeof onSwitching === "function" && onSwitching(this.state.page)
        })
    }
    handleSwitchPages = (direction) => {
        const { coverRef, onSwitching, loop } = this.props
        return () => {
            const { set } = this.props
            const { page } = this.state
            const targetPage = getTargetPage(page, set.length, direction, { loop })
            this.setState({
                page: targetPage,
                pageIsCover: pageIsCover(coverRef, set, targetPage),
            }, () => {
                typeof onSwitching === "function" && onSwitching(targetPage)
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
                return () => this.setState({ rotate:this.state.rotate-90 }, () => {
                    typeof onRotating === "function" && onRotating(this.state.rotate)
                })
            case "right":
                return () => this.setState({ rotate:this.state.rotate+90 }, () => {
                    typeof onRotating === "function" && onRotating(this.state.rotate)
                })
            default:
                return () => this.setState({ rotate:0 }, () => {
                    typeof onRotating === "function" && onRotating(0)
                })
        }
    }

    render() {

        const {
            // Internal
            coverRef, outBrowsing,
            // Data
            set,
            // Control
            controller, hotKey, animate,
            // Styles & interactive
            zIndex, backdrop, radius, edge, loop
        } = this.props
        const {
            // Internal
            mount,
            // Status
            show, zoom, rotate, page, pageIsCover,
        } = this.state

        const statusValue = {
            show, zoom, rotate, page, pageIsCover,
        }

        const contextValue = {
            // Internal
            coverRef, outBrowsing,
            // Data
            set,
            // Control
            controller, hotKey, animate,
            // Styles & interactive
            backdrop, radius, edge, loop,
            // Status
            ...statusValue,
            // Action
            toPage: this.handleToPage,
            toPrevPage: this.handleToPrevPage,
            toNextPage: this.handleToNextPage,
            toggleZoom: this.handleToggleZoom,
            toggleRotate: this.handleToggleRotate,
        }

        return (
            <Context.Provider value={contextValue}>
                {
                    mount &&
                    <Portals id="zmage" zIndex={zIndex} className={style.wrapperLayer}>

                        {/*背景层*/}
                        <Background {...statusValue}/>

                        {/*控制层*/}
                        <Control {...statusValue}/>

                        {/*图片层*/}
                        <Image {...statusValue}/>

                    </Portals>
                }
            </Context.Provider>
        )
    }
}

Browser.contextType = Context

Browser.defaultProps = {

    // Controlled status
    isControlled: false,
    browsing: false,
    // Internal
    coverRef: React.createRef(),
    outBrowsing: () => {},
    // Data
    defaultPage: 0,
    set: [],

};