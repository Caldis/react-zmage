/**
 * 应用主入口
**/

// React Libs
import React from 'react'
import PropTypes from 'prop-types'
// Components
import { showImage } from './components/Wrapper'
// Config
import { defType, defProp } from './config/default'
// Utils
import { generateUUID } from './utils'

export { showImage, ReactZmage }
export default class ReactZmage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            uid: generateUUID()
        }
    }

    render() {
        const { uid } = this.state
        const {
            id, className,            // 避免意外 id 覆盖
            src, hiResSrc, alt, text, // 基本属性
	        imageSet,                 // 图片列表
	        controller,               // 页面上的控制器
	        hotKey,                   // 热键
            onClick,                  // 用于单独执行 onClick
            style,                    // 样式
            ...props                  // 剩余参数
        } = this.props
        const uuid = `u${uid}`
        return (
            <img
                id={uuid} className={className}
                src={src} alt={alt}
                onClick={() => {
                    // 执行绑定的函数
                    onClick && onClick.constructor===Function && onClick()
                    // 显示幻灯片叠层
                    showImage({
                        id: uuid,
                        imageSet: imageSet && imageSet.constructor===Array ?
	                        imageSet : [{
	                            src: hiResSrc || src,
		                        alt,
		                        text
	                        }],
	                    controller,
	                    hotKey
                    })
                }}
                style={Object.assign({ cursor:'zoom-in' }, style)}
                {...props}
            />
        )
    }
}


// 默认参数
ReactZmage.defaultProps = {

	// 图片链接
	src: "",
	// 高分原图链接
	hiResSrc: "",
	// 图片标题
	alt: "",
	// 图片描述
	text: "",

    // 图片列表
    imageSet: [],

	// 控制器
	controller: defProp.controller,
	// 快捷键
	hotKey: defProp.hotKey

}

// 参数类型
ReactZmage.propTypes = {

	// 图片链接
	src: PropTypes.string.isRequired,
	// 高分原图链接
	hiResSrc: PropTypes.string,
	// 图片标题
	alt: PropTypes.string,
	// 图片描述
	text: PropTypes.string,

    // 图片列表, 可以传入单独的图片类型或数组包裹的图片类型
    imageSet: defType.imageSet,

    // 控制器
	controller: defType.controller,
	// 快捷键
	hotKey: defType.hotKey

}