/**
 * 常规组件入口
 **/

// Libs
import React, { Fragment } from 'react'
// Components
import callee from './Zmage.callee'
import Browser from './components/Browser'
// Utils
import { convertSet } from './Zmage.utils'
import { defType, defProp } from './config/default'

// 基础组件
class ReactZmage extends React.PureComponent {

    constructor(props){
        super(props)

        this.coverRef = React.createRef()
        this.isBrowsingControlled = this.props.hasOwnProperty('browsing')

        this.state = {
            // 浏览
            browsing: false,
        }

        // TODO:FEATURE 移动端的拖拽翻页
        // TODO:ENHANCE 禁用移动端的滑动退出
        // TODO:BUG     移动端下左右按钮
    }

    /* 切换查看状态 */
    inBrowsing = () => {
        if (this.isBrowsingControlled) {
            this.props.onBrowsing(true)
        } else {
            this.setState({ browsing: true })
        }
    }
    outBrowsing = () => {
        if (this.isBrowsingControlled) {
            this.props.onBrowsing(false)
        } else {
            this.setState({ browsing: false })
        }
    }

    render() {

        const {
            // Internal
            className, style, onClick, forwardedRef,
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

        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    className={className}
                    style={{ cursor:'zoom-in', ...style }}
                    src={src} alt={alt} title={alt}
                    onClick={(e) => {
                        this.inBrowsing()
                        typeof onClick === "function" && onClick(e)
                    }}
                    ref={(ref) => {
                        forwardedRef && (forwardedRef.current = ref);
                        this.coverRef && (this.coverRef.current = ref);
                    }}
                    {...restProps}
                />

                {/*查看叠层*/}
                <Browser
                    // Controlled status
                    isBrowsingControlled={this.isBrowsingControlled}
                    browsing={this.isBrowsingControlled ? controlledBrowsing : internalBrowsing}
                    // Internal
                    coverRef={this.coverRef}
                    outBrowsing={this.outBrowsing}
                    // Data
                    defaultPage={defaultPage}
                    set={convertSet({ set, src, alt, txt })}
                    // Preset
                    preset={preset}
                    // Control
                    controller={controller}
                    hotKey={hotKey}
                    animate={animate}
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

// 属性类型
ReactZmage.propTypes = defType
// 属性默认值
ReactZmage.defaultProps = defProp

// 常规组件
const forwardedReactZmage = React.forwardRef((props, ref) => <ReactZmage {...props} forwardedRef={ref}/>)
// 命令式调用组件
forwardedReactZmage.browsing = callee

export default forwardedReactZmage
