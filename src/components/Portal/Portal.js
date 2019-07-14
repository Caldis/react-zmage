/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 DOM 對象
 **/

// Libs
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// Utils
import { defProp, defType } from "@/config/default"

export default class Portals extends React.PureComponent {
    constructor(props) {
        super(props);

        // Init Env
        this.target = props.target || document.body
        this.container = document.createElement('figure')
        this.container.id = props.id
        this.container.className = props.className
        this.container.style.zIndex = props.zIndex
        this.target.appendChild(this.container)
    }

    componentWillUnmount() {
        this.target.removeChild(this.container)
    }

    render() {
        const { children } = this.props
        return ReactDOM.createPortal(children, this.container)
    }

}

Portals.defaultProps = {
    zIndex: defProp.zIndex,
}

Portals.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    zIndex: defType.zIndex,
}