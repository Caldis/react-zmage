/**
 * 应用主入口
 **/

// Libs
import React, { Fragment } from 'react'
// Components
import Portals from './components/Portals'
import Wrapper from './components/Wrapper'
// Config
import { defType, defProp } from './config/default'

export default class ReactZmage extends React.PureComponent {
    constructor(props){
        super(props)

        this.cover = React.createRef()

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
            // 平台
            mobile,
            // 控制
            controller,           // 页面按钮
            hotKey,               // 热键
            // 样式
            backdrop,             // 背景色
            zIndex,               // 高度
            edge,                 // 边距
            // 生命周期方法
            onBrowsing,
            onZooming,
            onSwitching,
            onRotating,
            defaultPage,
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
                            edge={edge}
                            onZooming={onZooming}
                            onSwitching={onSwitching}
                            onRotating={onRotating}
                            remove={this.unBrowsing}
                            page={defaultPage}
                        />
                    </Portals>
                }

            </Fragment>
        )
    }
}

ReactZmage.defaultProps = {

    /**
     * 基础数据
     **/
    // 图片地址
    src: defProp.src,
    // 图片标题
    alt: defProp.alt,
    // 图片描述
    txt: defProp.txt,
    // 图片集合
    set: defProp.set,

    /**
     * 功能控制
     **/
    // 控制器
    controller: defProp.controller,
    // 快捷键
    hotKey: defProp.hotKey,
    // 移动端
    mobile: defProp.mobile,

    /**
     * 界面样式
     **/
    // 背景色
    backdrop: defProp.backdrop,
    // 高度
    zIndex: defProp.zIndex,
    // 边距
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
    // 图片 Url
    src: defType.src,
    // 图片标题
    alt: defType.alt,
    // 图片描述
    txt: defType.txt,
    // 图片集合
    set: defType.set,
    defaultPage: PropTypes.number,

    /**
     * 功能控制
     **/
    // 控制器
    controller: defType.controller,
    // 快捷键
    hotKey: defType.hotKey,
    // 移动端
    mobile: defType.mobile,

    /**
     * 界面样式
     **/
    // 背景色
    backdrop: defType.backdrop,
    // 高度
    zIndex: defType.zIndex,
    // 边距
    edge: defType.edge,

    // 生命周期方法
    onBrowsing: PropTypes.func,
    onZooming: PropTypes.func,
    onSwitching: PropTypes.func,
    onRotating: PropTypes.func,
    
    

    /**
     * 生命周期
     **/
    onBrowsing: defType.onBrowsing,
    onZooming: defType.onZooming,
    onSwitching: defType.onSwitching,
    onRotating: defType.onRotating,
}
