/**
 * 客制的 Portal 组件
 * 直接将子元素插入到 body 末端
 **/

// React Libs
import React from 'react'
import ReactDOM from 'react-dom'
// Config
import {defProp, defType} from "../../config/default";

export default class Portals extends React.Component {
    constructor(props) {
        super(props);

        this.target = props.target || document.body
        this.element = document.createElement('div')
        this.element.id = "zmage"
        this.element.style.zIndex = props.zIndex
    }

    componentDidMount() {
        this.target.appendChild(this.element);
    }

    componentWillUnmount() {
        this.target.removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.element,
        )
    }

}

Portals.defaultProps = {
    // 高度
    zIndex: defProp.zIndex,
}

Portals.propTypes = {
    // 高度
    zIndex: defType.zIndex,
}