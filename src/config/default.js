/**
 * 默认类型与默认值
 **/

// Libs
import PropTypes from 'prop-types';

/**
 * 默认类型
 **/
export const defType = {

    /**
     * 基础数据
     **/
    // 图片地址
    src: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]).isRequire,
    // 图片标题
    alt: PropTypes.string,
    // 图片描述
    txt: PropTypes.string,
    // 图片集合
    set: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                src: PropTypes.string,  // 图片地址
                alt: PropTypes.string,  // 图片标题
                text: PropTypes.string, // 图片描述
            })
        ),
        PropTypes.shape({
            src: PropTypes.string,  // 图片地址
            alt: PropTypes.string,  // 图片标题
            text: PropTypes.string, // 图片描述
        }),
    ]),

    /**
     * 功能控制
     **/
    // 控制器
    controller: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
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
    ]),
    // 快捷键
    hotKey: PropTypes.shape({
        // 缩放（空格）
        zoom: PropTypes.bool,
        // 关闭（ESC）
        close: PropTypes.bool,
        // 翻页（左右键）
        flip: PropTypes.bool,
    }),
    // 移动端
    mobile: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),

    /**
     * 界面样式
     **/
    // 背景色
    backdrop: PropTypes.string,
    // 高度
    zIndex: PropTypes.number,
    // 边距
    edge: PropTypes.number,

    /**
     * 生命周期
     **/
    onBrowsing: PropTypes.func,
    onZooming: PropTypes.func,
    onSwitching: PropTypes.func,
    onRotating: PropTypes.func,

    /**
     * 杂项
     **/
    // 传导信息
    cover: PropTypes.object,
    remove: PropTypes.func,
    // 动画参数
    springOption: PropTypes.shape({
        // 剛性
        stiffness: PropTypes.number,
        // 阻尼
        damping: PropTypes.number,
    }),
    getSpringOption: PropTypes.func,
}

/**
 * 默认值
 **/
export const defProp = {

    /**
     * 基础数据
     **/
    // 图片地址
    src: "",
    // 图片标题
    alt: "",
    // 图片描述
    txt: "",
    // 图片集合
    set: [],
	
    /**
     * 功能控制
     **/
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
    // 移动端
    mobile: "auto",

    
    /**
     * 界面样式
     **/
    // 背景色
    backdrop: "#FFFFFF",
    // 高度
    zIndex: 1000,
    // 边距
    edge: 20,
	
    /**
     * 生命周期
     **/
    onBrowsing: ()=>{},
    onZooming: ()=>{},
    onSwitching: ()=>{},
    onRotating: ()=>{},

    /**
     * 杂项
     **/
    // 传导信息
    cover: {},
    remove: ()=>{},
	// 动画参数
    springOption: { stiffness: 230, damping: 25, precision: 0.01 },
    getSpringOption: (precision) => ({ stiffness: 230, damping: 25, precision })

}