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
        this.cover = null

        // States
        this.state = {
            browsing: false,
            set: this.buildSet(props)
        }

    }

    // 从初始 props 中生成图片集合
    buildSet = (props) => {
        const { set, src, alt, txt } = props
        if(set && set.constructor===Array && set.length>1) {
            return set
        } else {
            return [{ src, alt, txt }]
        }
    }

    // 切换查看状态
    browsing = () => {
        const { onClick } = this.props
        onClick && onClick.constructor===Function && onClick()
        this.setState({ browsing: true })
    }
    unBrowsing = () => {
        this.setState({ browsing: false })
    }

    render() {
        const { browsing, set } = this.state
        const {
            className, src, alt,  // 基本属性
            controller,           // 页面按钮
            hotKey,               // 热键
            style,                // 样式
            ...props              // 剩余参数
        } = this.props
        return (
            <Fragment>

                {/*封面图片*/}
                <img
                    ref={ref => this.cover = ref}
                    className={className} src={src} alt={alt} title={alt}
                    style={{ cursor:'zoom-in', ...style }}
                    onClick={this.browsing}
                    {...props}
                />

                {/*查看叠层*/}
                {
                    browsing &&
                    <Portals>
                        <Wrapper
                            set={set}
                            cover={this.cover}
                            controller={{ ...defProp.controller, ...controller }}
                            hotKey={{ ...defProp.hotKey, ...hotKey }}
                            remove={this.unBrowsing}
                        />
                    </Portals>
                }

            </Fragment>
        )
    }
}


// 默认参数
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
    hotKey: defProp.hotKey

}

// 参数类型
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
    hotKey: defType.hotKey

}