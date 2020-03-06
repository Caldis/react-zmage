/**
 * 常规组件入口
 **/

// Libs
import React, { Fragment } from 'react'
// Components
import callee from './Zmage.callee'
import wrapper from './Zmage.wrapper'
import Browser from './components/Browser'
// Utils
import { defType, defProp, getConfigFromProps } from './config/default'

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

        // TODO:FEATURE 按钮颜色配置
        // TODO:FEATURE 移动端的拖拽翻页
        // TODO:ENHANCE 禁用移动端的滑动退出
        // FIXME: Safari 全屏模式下无法锁定滚动

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

        const { coverProps, stateProps, configProps, restProps } = getConfigFromProps(this.props)

        const { browsing:internalBrowsing } = this.state

        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    className={coverProps.className}
                    style={{ cursor:'zoom-in', ...coverProps.style }}
                    src={coverProps.src} alt={coverProps.alt}
                    onClick={(e) => {
                        this.inBrowsing()
                        typeof coverProps.onClick === "function" && coverProps.onClick(e)
                    }}
                    ref={(ref) => {
                        coverProps.forwardedRef && (coverProps.forwardedRef.current = ref);
                        this.coverRef && (this.coverRef.current = ref);
                    }}
                    {...restProps}
                />

                {/*查看叠层*/}
                <Browser
                    // Controlled status
                    isBrowsingControlled={this.isBrowsingControlled}
                    browsing={this.isBrowsingControlled ? stateProps.controlledBrowsing : internalBrowsing}
                    // Internal
                    coverRef={this.coverRef}
                    outBrowsing={this.outBrowsing}
                    // Config
                    {...configProps}
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
forwardedReactZmage.Browsing = callee // Alias browsing
// HTML转换容器
forwardedReactZmage.wrapper = wrapper
forwardedReactZmage.Wrapper = wrapper // Alias wrapper

export default forwardedReactZmage
