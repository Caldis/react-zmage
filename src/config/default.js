/**
 * 定义默认值与类型
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
        // 旋转按钮
        rotate: true,
		// 缩放按钮
		zoom: true,
        // 关闭按钮
        close: true,
		// 左右翻页
		flip: true,
	},

	// 快捷键
	hotKey: {
		// 缩放（空格）
		zoom: true,
        // 关闭（ESC）
        close: true,
		// 翻页（左右）
		flip: true,
	},

    // 样式相关
    // 背景色
    backdrop: "#FFFFFF",
    // 高度
    zIndex: 1000,

    // 杂项
    // 图片距屏幕边距 (如果有)
    margin: 70,
	// 动画参数
    springOption: { stiffness: 230, damping: 25, precision: 0.01 },
    getSpringOption: (precision) => ({ stiffness: 230, damping: 25, precision })

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
		}),
	]),

	// 控制器
	controller: PropTypes.shape({
		// 分页
		pagination: PropTypes.bool,
		// 标题
		title: PropTypes.bool,
        // 旋转按钮
        rotate: PropTypes.bool,
		// 缩放按钮
		zoom: PropTypes.bool,
        // 关闭按钮
        close: PropTypes.bool,
		// 左右翻页
		flip: PropTypes.bool,
	}),

	// 快捷键
	hotKey: PropTypes.shape({
		// 缩放（空格）
		zoom: PropTypes.bool,
        // 关闭（ESC）
        close: PropTypes.bool,
		// 翻页（左右键）
		flip: PropTypes.bool,
	}),

    // 样式相关
    // 背景色
    backdrop: PropTypes.string,
    // 高度
    zIndex: PropTypes.number,

    // 杂项
    // 图片距屏幕边距 (如果有)
    margin: PropTypes.number,
    // 动画参数
    springOption: PropTypes.shape({
        stiffness: PropTypes.number, // 剛性
        damping: PropTypes.number,   // 阻尼
    }),

}