/**
 * 命令式调用组件入口
 **/

// Libs
import React from "react";
import ReactDOM from "react-dom";
// Components
import Browser from './components/Browser'
// Utils
import { defProp, defType, getConfigFromProps } from "@/config/default"
import { animationDuration } from "@/config/anim"

// 监听点击事件，函数调用模式下从鼠标位置打开图片
// https://github.com/ant-design/ant-design/blob/master/components/modal/Modal.tsx
let MOUSE_POSITION_CACHE = { x:0, y:0 };
let MOUSE_POSITION_CURRENT = { x:0, y:0 };
const getClickPosition = (e) => {
    MOUSE_POSITION_CURRENT = { x:e.clientX, y:e.clientY }
    // 100ms 内发生过点击事件，则从点击位置动画展示, 否则直接 zoom 展示, 这样可以兼容非点击方式展开
    setTimeout(() => (MOUSE_POSITION_CURRENT = { x:0, y:0 }), 100)
};
// 只有点击事件支持从鼠标位置动画展开
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    document.documentElement.addEventListener('click', getClickPosition)
}

class ReactZmageCallee extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            browsing: true
        }

        // 缓存打开位置
        MOUSE_POSITION_CACHE = MOUSE_POSITION_CURRENT;
    }

    outBrowsing = () => {
        const { destroyer } = this.props
        this.setState({ browsing:false })
        setTimeout(destroyer, animationDuration)
    }

    render() {

        const { calleeProps, configProps } = getConfigFromProps(this.props)

        const { browsing:internalBrowsing } = this.state

        const coverTarget = calleeProps.coverRef
            ? { coverRef: calleeProps.coverRef }
            : { coverPos: internalBrowsing ? MOUSE_POSITION_CURRENT : MOUSE_POSITION_CACHE }

        return (
            <Browser
                // Controlled status
                browsing={internalBrowsing}
                // Internal
                {...coverTarget}
                outBrowsing={this.outBrowsing}
                // Config
                {...configProps}
            />
        )
    }
}

// 属性类型
ReactZmageCallee.propTypes = defType
// 属性默认值
ReactZmageCallee.defaultProps = defProp

// 弹窗对象
const RENDER = {
    REF: React.createRef(),
    CONTAINER: null,
    PORTAL: null,
}
// 调用函数
const callee = ({ coverRef, ...props }) => {
    // Init env
    RENDER.PORTAL = document.createElement('div')
    RENDER.PORTAL.id = 'zmagePortal'
    RENDER.CONTAINER = document.body;
    RENDER.CONTAINER.appendChild(RENDER.PORTAL)
    // Mount target
    ReactDOM.render(<ReactZmageCallee ref={RENDER.REF} coverRef={coverRef} destroyer={()=>RENDER.CONTAINER.removeChild(RENDER.PORTAL)} {...props}/>, RENDER.PORTAL)
    // Return destroyer
    return RENDER.REF.current.outBrowsing
}

export default callee
