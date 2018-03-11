/**
 * 定义各种默认值
 **/

// React Libs
import PropTypes from 'prop-types';

// 默认值
export const defProp = {

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
		// 翻页（左右）
		flip: true
	},

    // 杂项
    // 图片距屏幕边距 (如果有)
    margin: 50,
	// 动画参数
    springOption: { stiffness: 180, damping: 25 }

}


// 默认类型
export const defType = {

	// 图片集合
    set: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.shape({
			src: PropTypes.string,  // 图片链接
			alt: PropTypes.string,  // 同 img 标签的 alt
			text: PropTypes.string, // 图片描述文字
		})),
		PropTypes.shape({
			src: PropTypes.string,  // 图片链接
			alt: PropTypes.string,  // 同 img 标签的 alt
			text: PropTypes.string, // 图片描述文字
		})
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
	}),

    // 杂项
    // 图片距屏幕边距 (如果有)
    margin: PropTypes.number,
    // 动画参数
    springOption: PropTypes.shape({
        stiffness: PropTypes.number, // 剛性
        damping: PropTypes.number,   // 阻尼
    })

}