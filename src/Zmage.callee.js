/**
 * 命令式调用组件入口
 **/

// Libs
import React from "react";
import ReactDOM from "react-dom";
// Components
import Browser from './components/Browser'
// Utils
import { convertSet } from "@/Zmage.utils"
import {defProp, defPropWithEnv, defType} from "@/config/default"
import { animationDuration } from "@/config/anim"
// Constants
const RENDER = {
    REF: React.createRef(),
    CONTAINER: null,
    PORTAL: null,
}

class ReactZmageCallee extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            browsing: true
        }
    }

    outBrowsing = () => {
        const { destroyer } = this.props
        this.setState({ browsing:false })
        setTimeout(destroyer, animationDuration)
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
            ...restProps } = this.props
        const {
            // Main state
            browsing:internalBrowsing
        } = this.state

        const defProp = defPropWithEnv(preset)

        return (
            <Browser
                // Controlled status
                browsing={internalBrowsing}
                // Internal
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
        )
    }
}

// 属性类型
ReactZmageCallee.propTypes = defType

// 属性默认值
ReactZmageCallee.defaultProps = defProp

// 调用函数
const callee = (props) => {
    // Init env
    RENDER.PORTAL = document.createElement('div')
    RENDER.PORTAL.id = 'zmagePortal'
    RENDER.CONTAINER = document.body;
    RENDER.CONTAINER.appendChild(RENDER.PORTAL)
    // Mount target
    ReactDOM.render(<ReactZmageCallee ref={RENDER.REF} destroyer={() => RENDER.CONTAINER.removeChild(RENDER.PORTAL)} {...props}/>, RENDER.PORTAL)
    // Return destroyer
    return RENDER.REF.current.outBrowsing
}

export default callee