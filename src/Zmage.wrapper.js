/**
 * HTML渲染容器组件入口
 **/

// Libs
import React from "react";
// Components
import callee from './Zmage.callee'
// Utils
import { defProp, defType } from "@/config/default"

class ReactZmageWrapper extends React.PureComponent {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef()
    }

    componentDidMount() {
        window['__ZMAGE_BROWSER__'] = callee
        this.attachBrowserToImage()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.attachBrowserToImage()
    }

    attachBrowserToImage = () => {
        const { children, ...restProps } = this.props
        if (this.contentRef.current) {
            this.contentRef.current.querySelectorAll('img').forEach(item => {
                if (!item.getAttribute('zmage') && item.getAttribute('src')) {
                    item.style.cursor = 'zoom-in'
                    item.setAttribute('zmage', Date.now())
                    item.addEventListener('click', () => callee({
                        ...restProps,
                        coverRef: { current:item },
                        src: item.getAttribute('src'),
                    }))
                }
            })
        }
    }

    render() {

        const { children } = this.props

        return (
            <div ref={this.contentRef}>
                { children }
            </div>
        )
    }
}

// 属性类型
ReactZmageWrapper.propTypes = defType
// 属性默认值
ReactZmageWrapper.defaultProps = defProp

export default ReactZmageWrapper
