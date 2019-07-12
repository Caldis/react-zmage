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
import { defProp } from "@/config/default"

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
        console.log('outBrowsing')
        const { destroyer } = this.props
        this.setState({ browsing:false })
        setTimeout(destroyer, 350)
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
            controller, hotKey,
            // Styles
            zIndex, backdrop, radius, edge,
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
                // Styles
                zIndex={zIndex}
                backdrop={backdrop}
                radius={radius}
                edge={edge}
                // Life cycle functions
                onBrowsing={onBrowsing}
                onZooming={onZooming}
                onSwitching={onSwitching}
                onRotating={onRotating}
            />
        )
    }
}

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