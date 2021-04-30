/**
 * 容器层
 * 储存主要状态
 **/

// Libs
import React, { RefObject } from 'react'
// Style
import style from './Browser.less'
// Components
import Portals from '../Portal'
import Control from '../Control'
import Image from '../Image'
import Background from '../Background'
// Utils
import { Context, ContextType } from '../context'
import { getTargetPage, unlockTouchInteraction } from '@/utils'
import { defPropsWithEnv } from '@/types/default'
import { animationDuration } from '@/config/anim'
import { hideCover, pageIsCover, pageSet, showCover } from './Browser.utils'
import { FunctionalParams, InterfaceAndInteractionParams, LifeCycleParams, PresetParams, Set } from '@/types/global'

export interface Props extends PresetParams, FunctionalParams, InterfaceAndInteractionParams, LifeCycleParams {
  // Controlled status
  isBrowsingControlled: boolean
  browsing: boolean
  // Internal
  coverRef: RefObject<HTMLImageElement>
  coverPos?: Coordinate
  outBrowsing: () => void
  // Set Normalized BaseParams
  set: Set[]
  defaultPage: number
}

export interface State {
  // 载入
  mounted: boolean
  // 显示
  show: boolean
  // 缩放
  zoom: boolean
  // 旋转
  rotate: number
  // 页数
  page: number
  pageIsCover: boolean
  pageWithStep: number
}

export default class Browser extends React.Component<Props, State> {

  // Types
  context: ContextType
  // Defaults
  static defaultProps = {
    // Controlled status
    isBrowsingControlled: false,
    browsing: false,
    // Internal
    coverRef: React.createRef(),
    outBrowsing: () => {},
    // Data
    defaultPage: 0,
    set: [] as Set[],
  }

  // State
  readonly state = (() => {
    const { coverRef, defaultPage, set } = this.props
    const { page, pageIsCover } = pageSet(coverRef, defaultPage, set)
    return {
      // 载入
      mounted: false,
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
    } as State
  })()

  componentDidMount () {
    if (this.props.browsing) {
      this.init()
    }
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State) {
    if (nextProps.browsing) {
      return {
        mounted: true,
        // 仅在当前状态为未查看时重置页面状态
        ...(!prevState.show ? pageSet(nextProps.coverRef, nextProps.defaultPage, nextProps.set) : {}),
      }
    }
    return null
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.browsing !== this.props.browsing) {
      if (this.props.browsing) {
        this.init()
      } else {
        this.unInit()
      }
    }
  }

  componentWillUnmount () {
    this.unInit({ force: true })
  }

  /**
   * Props Getter
   * 如果需要读取 controller / hotKey / animate 需要由此读取
   */
  getPropsWithEnv = () => {
    const { preset, controller, hotKey, animate } = this.props
    const defProp = defPropsWithEnv(preset)
    return {
      // Merge Props
      ...this.props,
      // Preset flags
      presetIsMobile: preset === 'mobile',
      presetIsDesktop: preset !== 'mobile',
      // Control
      controller: { ...defProp.controller, ...(typeof (controller) === 'object' ? controller : {}) },
      hotKey: { ...defProp.hotKey, ...(typeof (hotKey) === 'object' ? hotKey : {}) },
      animate: { ...defProp.animate, ...(typeof (animate) === 'object' ? animate : {}) },
    }
  }

  /**
   * 载入/卸载
   */
  init = () => {
    const {
      isBrowsingControlled,
      coverRef,
      onBrowsing,
      hideOnScroll,
      coverVisible,
      presetIsDesktop
    } = this.getPropsWithEnv()
    const { show, pageIsCover } = this.state
    if (!show) {
      window.addEventListener('keydown', this.handleKeyDown)
      hideOnScroll && window.addEventListener('scroll', this.handleScroll)
      window.requestAnimationFrame(() => {
        this.setState({ show: true, zoom: false, rotate: 0, }, () => {
          presetIsDesktop && pageIsCover && !coverVisible && hideCover(coverRef)
          !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(true)
        })
      })
    }
  }
  unInit = ({ force } = { force: false }) => {
    const {
      isBrowsingControlled,
      coverRef,
      onBrowsing,
      hideOnScroll,
      coverVisible,
      presetIsMobile,
      presetIsDesktop
    } = this.getPropsWithEnv()
    const { show, pageIsCover } = this.state
    if (show || force) {
      window.removeEventListener('keydown', this.handleKeyDown)
      hideOnScroll && window.removeEventListener('scroll', this.handleScroll)
      !pageIsCover && !coverVisible && showCover(coverRef)
      this.setState({ show: false, zoom: false, rotate: 0 }, () => setTimeout(() => {
        this.setState({ mounted: false }, () => {
          presetIsMobile && unlockTouchInteraction()
          presetIsDesktop && pageIsCover && !coverVisible && showCover(coverRef)
          !isBrowsingControlled && typeof onBrowsing === 'function' && onBrowsing(false)
        })
      }, presetIsDesktop ? animationDuration - 10 : animationDuration * 2 - 10))
    }
  }

  /**
   * 事件处理
   */
  handleKeyDown = (e: KeyboardEvent) => {
    const { set, hotKey, loop, outBrowsing } = this.getPropsWithEnv()
    const { zoom, page } = this.state
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
      !(!loop && page === 0) && !zoom && hotKey.flip && this.handleToPrevPage()
      break
    case 39: // ArrowRight
      // 下一张
      e.preventDefault()
      !(!loop && page === set.length - 1) && !zoom && hotKey.flip && this.handleToNextPage()
      break
    default:
      return
    }
  }
  handleScroll = () => {
    const { outBrowsing } = this.props
    const { show } = this.state
    if (show) {
      outBrowsing()
    }
  }

  /**
   * 翻页控制
   */
  handleToPage = (targetPage: number) => {
    const { page } = this.state
    this.handleSwitchPages(targetPage - page)()
  }
  handleSwitchPages = (step: number) => {
    const { coverRef, onSwitching, loop } = this.props
    return () => {
      const { set } = this.props
      if (set.length > 1) {
        const { page, pageWithStep } = this.state
        const targetPage = getTargetPage(page, set.length, step, { loop })
        if (typeof targetPage === 'number') {
          this.setState({
            page: targetPage,
            pageIsCover: pageIsCover(coverRef, set, targetPage),
            pageWithStep: pageWithStep + step,
            zoom: false,
            rotate: 0,
          }, () => {
            typeof onSwitching === 'function' && onSwitching(targetPage)
          })
        }
      }
    }
  }
  handleToPrevPage = this.handleSwitchPages(-1)
  handleToNextPage = this.handleSwitchPages(1)

  /**
   * 缩放控制
   */
  handleToggleZoom = () => {
    const { onZooming } = this.props
    this.setState({
      zoom: !this.state.zoom
    }, () => {
      typeof onZooming === 'function' && onZooming(this.state.zoom)
    })
  }

  /**
   * 旋转控制
   */
  handleToggleRotate = (direction: '' | 'left' | 'right') => {
    const { onRotating } = this.props
    switch (direction) {
    case 'left':
      return () => this.setState({ rotate: this.state.rotate - 90 }, () => {
        typeof onRotating === 'function' && onRotating(this.state.rotate)
      })
    case 'right':
      return () => this.setState({ rotate: this.state.rotate + 90 }, () => {
        typeof onRotating === 'function' && onRotating(this.state.rotate)
      })
    default:
      return () => this.setState({ rotate: 0 }, () => {
        typeof onRotating === 'function' && onRotating(0)
      })
    }
  }

  render () {

    const {
      // Internal
      coverRef, coverPos, outBrowsing,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop
    } = this.getPropsWithEnv()
    const { mounted } = this.state

    const statusValue = { ...this.state }

    const contextValue = {
      // Internal
      coverRef, coverPos, outBrowsing,
      // Data
      set,
      // Preset
      preset, presetIsMobile, presetIsDesktop,
      // Control
      controller, hotKey, animate,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, radius, edge, loop,
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
          mounted &&
          <Portals id="zmage" zIndex={zIndex} className={style.wrapperLayer}>

            {/*背景层*/}
            <Background {...statusValue}/>

            {/*控制层*/}
            <Control/>

            {/*图片层*/}
            <Image {...statusValue}/>

          </Portals>
        }
      </Context.Provider>
    )
  }
}

Browser.contextType = Context
