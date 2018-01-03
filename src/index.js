/**
 * 应用主入口
**/

// React Libs
import React from 'react'
import PropTypes from 'prop-types'
// Components
import { showImage } from './components/Wrapper'
// Config
import { imageType } from './config'
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
	                    controller: controller,
	                    hotKey: hotKey
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

    // 图片列表参数
    imageSet: [{
	    src: "",
	    alt: "",
	    text: ""
    }],

	// 控制器
	controller: {
		// 分页
		pagination: true,
		// 标题
		title: true,
		// 关闭按钮
		close: true,
		// 缩放按钮
		zoom: true,
		// 左右翻页
		flip: true
	},

	// 快捷键
	hotKey: {
		// 关闭（ESC）
		close: true,
		// 缩放（空格）
		zoom: true,
		// 翻页（左右键）
		flip: true
	}
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
    imageSet: PropTypes.oneOfType([
        PropTypes.arrayOf(imageType),
        imageType
    ]),

    // 控制器
	controller: PropTypes.shape({
		// 分页
		pagination: PropTypes.bool,
		// 标题
		title: PropTypes.bool,
		// 关闭按钮
		close: PropTypes.bool,
		// 缩放按钮
		zoom: PropTypes.bool,
		// 左右翻页
		flip: PropTypes.bool
	}),

	// 快捷键
	hotKey: PropTypes.shape({
		// 关闭（ESC）
		close: PropTypes.bool,
		// 缩放（空格）
		zoom: PropTypes.bool,
		// 翻页（左右键）
		flip: PropTypes.bool
	})

}