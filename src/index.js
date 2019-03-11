/**
 * 应用主入口
 **/

// Libs
import React, { Fragment } from 'react'
// Components
import Portals from './components/Portals'
import Wrapper from './components/Wrapper'
// Config
import { defType, defProp, defPropDesktop, defPropMobile, defPropAuto } from './config/default'

export default class ReactZmage extends React.PureComponent {
    constructor(props){
        super(props)

        this.cover = React.createRef()

        this.state = {
            browsing: false
        }

        // TODO:FEATURE 懒加载
        // TODO:FEATURE 翻页动画
        // TODO:FEATURE 移动端的拖拽翻页
        // TODO:ENHANCE 禁用移动端的滑动退出及禁用滚动
        // TODO:ENHANCE 移动端下点击隐藏的背景按下时会变暗
        // TODO:BUG     移动端下左右按钮

    }

    // 切换查看状态
    inBrowsing = (e) => {
        const { onClick, onBrowsing } = this.props
        this.setState({
            browsing: true
        }, () => {
            typeof onClick === "function" && onClick(e)
            typeof onBrowsing === "function" && onBrowsing(true)
        })
    }
    unBrowsing = () => {
        const { onBrowsing } = this.props
        this.setState({
            browsing: false
        }, () => {
            typeof onBrowsing === "function" && onBrowsing(false)
        })
    }

    // 从 set 中提取图片集合
    buildSet = (set) => {
        const { src, alt, txt } = this.props
        return (Array.isArray(set) && set.length>0) ? set : [{ src, alt, txt }]
    }

    render() {

        const {
            // 内部
            className,
            style,
            // 基础数据
            src,
            alt,
            txt,
            set,
            defaultPage,
            // 预设
            preset,
            // 功能控制
            controller,
            hotKey,
            // 界面样式
            backdrop,
            zIndex,
            radius,
            edge,
            // 生命周期
            onBrowsing,
            onZooming,
            onSwitching,
            onRotating,
            // 剩余参数
            ...props
        } = this.props
        const { browsing } = this.state

        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    ref={ref => this.cover=ref}
                    className={className}
                    style={{ cursor:'zoom-in', ...style }}
                    src={src} alt={alt} title={alt}
                    onClick={this.inBrowsing}
                    {...props}
                />

                {/*查看叠层*/}
                {
                    browsing && (() => {
                        const defPropWithEnv = preset.toString()==="desktop"
                            ? defPropDesktop
                            : preset.toString()==="mobile"
                                ? defPropMobile
                                : defPropAuto(true)
                        return (
                            <Portals zIndex={zIndex}>
                                <Wrapper
                                    // 内部
                                    cover={this.props.cover||this.cover}
                                    remove={this.unBrowsing}
                                    // 基础数据
                                    alt={alt}
                                    txt={txt}
                                    set={this.buildSet(set)}
                                    defaultPage={defaultPage}
                                    // 功能控制
                                    controller={{ ...defPropWithEnv.controller, ...controller }}
                                    hotKey={{ ...defPropWithEnv.hotKey, ...hotKey }}
                                    // 界面样式
                                    backdrop={backdrop}
                                    radius={radius!==null ? radius : defPropWithEnv.radius}
                                    edge={edge!==null ? edge : defPropWithEnv.edge}
                                    // 生命周期
                                    onZooming={onZooming}
                                    onSwitching={onSwitching}
                                    onRotating={onRotating}
                                />
                            </Portals>
                        )
                    })()
                }

            </Fragment>
        )
    }
}

ReactZmage.defaultProps = {

    /**
     * 基础数据
     **/
    src: defProp.src,
    alt: defProp.alt,
    txt: defProp.txt,
    set: defProp.set,
    defaultPage: defProp.defaultPage,

    /**
     * 预设
     **/
    preset: defProp.preset,

    /**
     * 功能控制
     **/
    controller: defProp.controller,
    hotKey: defProp.hotKey,

    /**
     * 界面样式
     **/
    backdrop: defProp.backdrop,
    zIndex: defProp.zIndex,
    radius: defProp.radius,
    edge: defProp.edge,

    /**
     * 生命周期
     **/
    onBrowsing: defProp.onBrowsing,
    onZooming: defProp.onZooming,
    onSwitching: defProp.onSwitching,
    onRotating: defProp.onRotating,

}

ReactZmage.propTypes = {

    /**
     * 基础数据
     **/
    src: defType.src,
    alt: defType.alt,
    txt: defType.txt,
    set: defType.set,
    defaultPage: defType.defaultPage,

    /**
     * 预设
     **/
    preset: defType.preset,

    /**
     * 功能控制
     **/
    controller: defType.controller,
    hotKey: defType.hotKey,

    /**
     * 界面样式
     **/
    backdrop: defType.backdrop,
    zIndex: defType.zIndex,
    radius: defType.radius,
    edge: defType.edge,

    /**
     * 生命周期
     **/
    onBrowsing: defType.onBrowsing,
    onZooming: defType.onZooming,
    onSwitching: defType.onSwitching,
    onRotating: defType.onRotating,

}
