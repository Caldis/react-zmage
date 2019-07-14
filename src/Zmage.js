/**
 * 常规组件入口
 **/

// Libs
import React, {Fragment} from 'react'
// Components
import callee from './Zmage.callee'
import Browser from './components/Browser'
// Utils
import { defType, defProp, defPropWithEnv } from './config/default'
import { convertSet } from './Zmage.utils'

// 基础组件
export default class ReactZmage extends React.PureComponent {

    constructor(props){
        super(props)

        this.coverRef = React.createRef()
        this.isControlled = this.props.hasOwnProperty('browsing')

        this.state = {
            // 浏览
            browsing: false,
        }

        // TODO:FEATURE 懒加载
        // TODO:FEATURE 翻页动画
        // TODO:FEATURE 移动端的拖拽翻页
        // TODO:ENHANCE 禁用移动端的滑动退出及禁用滚动
        // TODO:ENHANCE 移动端下点击隐藏的背景按下时会变暗
        // TODO:BUG     移动端下左右按钮
    }

    /* 切换查看状态 */
    inBrowsing = () => {
        if (this.isControlled) {
            this.props.onBrowsing(true)
        } else {
            this.setState({ browsing: true })
        }
    }
    outBrowsing = () => {
        if (this.isControlled) {
            this.props.onBrowsing(false)
        } else {
            this.setState({ browsing: false })
        }
    }

    render() {

        const {
            // Internal
            className, style, onClick,
            // Data
            src, alt, txt, set, defaultPage,
            // Presets
            preset,
            // Control
            controller, hotKey, animate,
            // Styles & interactive
            zIndex, backdrop, radius, edge, loop,
            // Life cycle functions
            onBrowsing, onZooming, onSwitching, onRotating,
            // Controlled props
            browsing:controlledBrowsing,
            // rest
            ...restProps
        } = this.props
        const {
            // Main state
            browsing:internalBrowsing
        } = this.state

        const defProp = defPropWithEnv(preset)

        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    ref={this.coverRef}
                    className={className}
                    style={{ cursor:'zoom-in', ...style }}
                    src={src} alt={alt} title={alt}
                    onClick={(e) => {
                        this.inBrowsing()
                        typeof onClick === "function" && onClick(e)
                    }}
                    {...restProps}
                />

                {/*查看叠层*/}
                <Browser
                    // Controlled status
                    isControlled={this.isControlled}
                    browsing={this.isControlled ? controlledBrowsing : internalBrowsing}
                    // Internal
                    coverRef={this.coverRef}
                    outBrowsing={this.outBrowsing}
                    // Data
                    defaultPage={defaultPage}
                    set={convertSet({ set, src, alt, txt })}
                    // Control
                    controller={{ ...defProp.controller, ...controller }}
                    hotKey={{ ...defProp.hotKey, ...hotKey }}
                    animate={{ ...defProp.animate, ...animate }}
                    // Styles & interactive
                    zIndex={zIndex}
                    backdrop={backdrop}
                    radius={radius}
                    edge={edge}
                    loop={loop}
                    // Life cycle functions
                    onBrowsing={onBrowsing}
                    onZooming={onZooming}
                    onSwitching={onSwitching}
                    onRotating={onRotating}
                />

            </Fragment>
        )
    }
}


// 命令式调用组件
ReactZmage.browsing = callee

// 属性类型
ReactZmage.propTypes = defType

// 属性默认值
ReactZmage.defaultProps = defProp