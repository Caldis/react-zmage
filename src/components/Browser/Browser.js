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
import { Context } from '../context'
import { getTargetPage } from "@/utils"
import { defPropWithEnv } from "@/config/default"
import { animationDuration } from "@/config/anim"
import { pageSet, showCover, hideCover, pageIsCover } from './Browser.utils'
import { env } from "@/utils/env";

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
            pageWithStep: page,
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
        const { isBrowsingControlled, coverRef, set, onBrowsing } = this.props
        const { show, page, pageIsCover } = this.state
        if (!show) {
            window.addEventListener('keydown', this.handleKeyDown)
            window.addEventListener('scroll', this.handleScroll)
            window.requestAnimationFrame(() => {
                this.setState({ show:true, zoom:false, rotate:0, }, () => {
                    pageIsCover && hideCover(coverRef, set, page)
                    !isBrowsingControlled && typeof onBrowsing === "function" && onBrowsing(true)
                })
            })
        }
    }
    unInit = ({ force }={}) => {
        const { isBrowsingControlled, coverRef, set, onBrowsing } = this.props
        const { show, page, pageIsCover } = this.state
        if (show || force) {
            window.removeEventListener('keydown', this.handleKeyDown)
            window.removeEventListener('scroll', this.handleScroll)
            !pageIsCover && showCover(coverRef, set, page)
            this.setState({ show:false, zoom:false, rotate:0 }, () => setTimeout(() => {
                this.setState({ mount:false }, () => {
                    pageIsCover && showCover(coverRef, set, page)
                    !isBrowsingControlled && typeof onBrowsing === "function" && onBrowsing(false)
                })
            }, animationDuration))
        }
    }


    /**
     * 事件处理
     **/
    handleKeyDown = (e) => {
        const { preset, set, hotKey:userHotKey, loop, outBrowsing } = this.props
        const { zoom, page } = this.state
        // 合并熱鍵設定
        const { hotKey:defaultHotKey } = defPropWithEnv(preset)
        const hotKey = { ...defaultHotKey, ...userHotKey }
        // 判斷按鍵編碼
        switch (e.keyCode) {
            case 27: // Escape
                // 退出
                e.preventDefault()
                hotKey.close && (zoom ? this.handleToggleZoom() : outBrowsing())
                break
            case 32: // SpaceBar
                // 缩放
                e.preventDefault()
                hotKey.zoom && this.handleToggleZoom()
                break
            case 37: // ArrowLeft
                // 上一张
                e.preventDefault()
                !(!loop && page===0) && !zoom && hotKey.flip && this.handleToPrevPage()
                break
            case 39: // ArrowRight
                // 下一张
                e.preventDefault()
                !(!loop && page===set.length-1) && !zoom && hotKey.flip && this.handleToNextPage()
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
    handleToPage = (targetPage) => {
        const { page } = this.state
        this.handleSwitchPages(targetPage - page)()
    }
    handleSwitchPages = (step) => {
        const { coverRef, onSwitching, loop } = this.props
        return () => {
            const { set } = this.props
            if (set.length>1) {
                const {page, pageWithStep} = this.state
                const targetPage = getTargetPage(page, set.length, step, {loop})
                this.setState({
                    page: targetPage,
                    pageIsCover: pageIsCover(coverRef, set, targetPage),
                    pageWithStep: pageWithStep + step,
                    zoom: false,
                    rotate: 0,
                }, () => {
                    typeof onSwitching === "function" && onSwitching(targetPage)
                })
            }
        }
    }
    handleToPrevPage = this.handleSwitchPages(-1)
    handleToNextPage = this.handleSwitchPages(1)

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
            coverRef, coverPos, outBrowsing,
            // Data
            set,
            // Preset
            preset,
            // Control
            controller, hotKey, animate,
            // Styles & interactive
            zIndex, backdrop, radius, edge, loop
        } = this.props
        const {
            // Internal
            mount,
            // Status
            show, zoom, rotate, page, pageIsCover, pageWithStep,
        } = this.state

        const defProp = defPropWithEnv(preset)
        const statusValue = { show, zoom, rotate, page, pageIsCover, pageWithStep }

        const contextValue = {
            // Internal
            coverRef, coverPos, outBrowsing,
            // Data
            set,
            // Preset
            preset,
            presetIsMobile: preset==='mobile' || (preset==='auto' && env.isMobile),
            presetIsDesktop: preset==='desktop' || (preset==='auto' && env.isDesktop),
            // Control
            controller: { ...defProp.controller, ...controller },
            hotKey: { ...defProp.hotKey, ...hotKey },
            animate: { ...defProp.animate, ...animate },
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
    isBrowsingControlled: false,
    browsing: false,
    // Internal
    coverRef: React.createRef(),
    outBrowsing: () => {},
    // Data
    defaultPage: 0,
    set: [],

};
