/**
 * 应用主入口
 **/

// React Libs
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// Components
import Portals from './components/Portals'
import Wrapper from './components/Wrapper'
// Config
import { defType, defProp } from './config/default'

export default class ReactZmage extends React.PureComponent {
    constructor(props){
        super(props)

        // Refs
        this.cover = React.createRef()

        // States
        this.state = {
            browsing: false,
            set: ReactZmage.buildSet(props)
        }

    }

    static getDerivedStateFromProps(nextProps) {
        return {
            // 数据更新时刷新 set
            set: ReactZmage.buildSet(nextProps)
        }
    }

    // 从初始 props 中生成图片集合
    static buildSet = (props) => {
        const { set, src, alt, txt } = props
        if(Array.isArray(set) && set.length>1) {
            return set
        } else {
            return [{ src, alt, txt }]
        }
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

    render() {
        const { browsing, set } = this.state
        const {
            // 基础
            className, src, alt, style,
            // 控制
            controller,           // 页面按钮
            hotKey,               // 热键
            // 样式
            zIndex,               // 高度
            backdrop,             // 背景颜色
            // 生命周期方法
            onBrowsing,
            onZooming,
            onSwitching,
            onRotating,
            // 剩余参数
            ...props
        } = this.props
        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    ref={ref => this.cover = ref}
                    className={className} src={src} alt={alt} title={alt}
                    style={{ cursor:'zoom-in', ...style }}
                    onClick={this.inBrowsing}
                    {...props}
                />

                {/*查看叠层*/}
                {
                    browsing &&
                    <Portals zIndex={zIndex}>
                        <Wrapper
                            set={set}
                            cover={this.cover}
                            controller={{ ...defProp.controller, ...controller }}
                            hotKey={{ ...defProp.hotKey, ...hotKey }}
                            backdrop={backdrop}
                            onZooming={onZooming}
                            onSwitching={onSwitching}
                            onRotating={onRotating}
                            remove={this.unBrowsing}
                        />
                    </Portals>
                }

            </Fragment>
        )
    }
}

ReactZmage.defaultProps = {

    // 图片 Url
    src: "",
    // 图片标题
    alt: "",
    // 图片文字
    txt: "",

    // 图片列表
    set: [],

    // 控制器
    controller: defProp.controller,
    // 快捷键
    hotKey: defProp.hotKey,

    // 背景色
    backdrop: defProp.backdrop,
    // 高度
    zIndex: defProp.zIndex,

    // 生命周期方法
    onBrowsing: ()=>{},
    onZooming: ()=>{},
    onSwitching: ()=>{},
    onRotating: ()=>{},

}

ReactZmage.propTypes = {

    // 图片 Url
    src: PropTypes.string.isRequired,
    // 图片标题
    alt: PropTypes.string,
    // 图片描述
    txt: PropTypes.string,

    // 图片集合, 可以传入单独的图片类型或数组包裹的图片类型
    set: defType.set,

    // 控制器
    controller: defType.controller,
    // 快捷键
    hotKey: defType.hotKey,

    // 背景色
    backdrop: defType.backdrop,
    // 高度
    zIndex: defType.zIndex,

    // 生命周期方法
    onBrowsing: PropTypes.func,
    onZooming: PropTypes.func,
    onSwitching: PropTypes.func,
    onRotating: PropTypes.func,

}
