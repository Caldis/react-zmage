/**
 * 默认类型与默认值
 **/

// Libs
import PropTypes from 'prop-types'
// Utils
import { normalizationSet } from "@/Zmage.utils";

/**
 * 默认类型
 **/
export const defType = {

    /**
     * 基础
     **/
    // 图片地址
    src: PropTypes.string,
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
    // 图片默认页
    defaultPage: PropTypes.number,

    /**
     * 預設
     **/
    preset: PropTypes.oneOf([
        // 桌面
        "", "desktop",
        // 移动
        "mobile",
    ]),

    /**
     * 功能
     **/
    // 控制器
    controller: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            // 分页
            pagination: PropTypes.bool,
            // 旋转
            rotate: PropTypes.bool,
            // 缩放
            zoom: PropTypes.bool,
            // 下载
            download: PropTypes.bool,
            // 关闭
            close: PropTypes.bool,
            // 左右
            flip: PropTypes.bool,
        }),
    ]),
    // 快捷键
    hotKey: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            // 关闭（ESC）
            close: PropTypes.bool,
            // 缩放（空格）
            zoom: PropTypes.bool,
            // 翻页（左右键）
            flip: PropTypes.bool,
        }),
    ]),
    // 动画
    animate: PropTypes.shape({
        // 缩放动画 (未实现)
        browsing: PropTypes.bool,
        // 翻页动画
        flip: PropTypes.oneOf([
            // 渐变 (set小於3時强制使用)
            "fade",
            // 交叉渐变
            "crossFade",
            // 翻页
            "swipe",
            // 缩放
            "zoom",
        ]),
    }),

    /**
     * 界面与交互
     **/
    // 滚动时隐藏
    hideOnScroll: PropTypes.bool,
    // 封面可见性
    coverVisible: PropTypes.bool,
    // 背景色
    backdrop: PropTypes.string,
    // 高度
    zIndex: PropTypes.number,
    // 圆角
    radius: PropTypes.number,
    // 边距
    edge: PropTypes.number,
    // 循环
    loop: PropTypes.bool,

    /**
     * 生命周期
     **/
    onBrowsing: PropTypes.func,
    onZooming: PropTypes.func,
    onSwitching: PropTypes.func,
    onRotating: PropTypes.func,

    /**
     * 受控屬性
     **/
    browsing: PropTypes.bool,
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
    // 图片默认页
    defaultPage: 0,

    /**
     * 预设
     **/
    preset: "",

    /**
     * 功能控制
     **/
    // 控制器 (从 preset 初始化)
    controller: {},
    // 快捷键 (从 preset 初始化)
    hotKey: {},
    // 动画  (从 preset 初始化)
    animate: {},

    /**
     * 界面与交互
     **/
    // 滚动时隐藏 (仅桌面端可用)
    hideOnScroll: true,
    // 封面可见性 (仅桌面端可用)
    coverVisible: false,
    // 背景色
    backdrop: "#FFFFFF",
    // 高度
    zIndex: 1000,
    // 圆角
    radius: 0,
    // 边距
    edge: 0,
    // 是否循环查看
    loop: true,

    /**
     * 生命周期
     **/
    onBrowsing: ()=>{},
    onZooming: ()=>{},
    onSwitching: ()=>{},
    onRotating: ()=>{},

}

/**
 * 默认预设
 **/
export const defPreset = {
    // 桌面
    desktop: {
        controller: {
            pagination: true,
            rotate: true,
            zoom: true,
            download: false,
            close: true,
            flip: true,
        },
        hotKey: {
            close: true,
            zoom: true,
            flip: true,
        },
        animate: {
            browsing: true,
            flip: 'fade',
        },
    },
    // 移动端
    mobile: {
        controller: {
            pagination: true,
            rotate: false,
            zoom: false,
            download: false,
            close: true,
            flip: false,
        },
        hotKey: {
            close: false,
            zoom: false,
            flip: false,
        },
        animate: {
            browsing: true,
            flip: 'swipe',
        },
    }
}

/**
 * 默认值 (不同平台)
 **/
let IS_PROP_PRESET_AUTO_DEPRECATED_WARNED = false
const DEF_PROP_DESKTOP = {
    ...defProp,
    ...defPreset.desktop,
}
const DEF_PROP_MOBILE = {
    ...defProp,
    ...defPreset.mobile,
}
export const defPropsWithEnv = (preset) => {
    switch (preset) {
        case 'desktop':
            return DEF_PROP_DESKTOP
        case 'mobile':
            return DEF_PROP_MOBILE
        case 'auto':
            // Deprecated
            if (!IS_PROP_PRESET_AUTO_DEPRECATED_WARNED) {
                console.warn("Zmage: The value 'auto' for the props 'preset' has been deprecated, replace with one of 'Desktop' or 'Mobile', the value 'auto' will be fallback to 'desktop'")
                IS_PROP_PRESET_AUTO_DEPRECATED_WARNED = true
            }
            return DEF_PROP_DESKTOP
        default:
            return DEF_PROP_DESKTOP
    }
}

/**
 * 获取配置属性
 **/
export const getConfigFromProps = (props) => {
    const {
        // Internal
        className, style, onClick, forwardedRef,
        // Callee
        coverRef, destroyer,
        // Data
        src, alt, txt, set, defaultPage,
        // Presets
        preset,
        // Control
        controller, hotKey, animate,
        // Styles & interactive
        hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop,
        // Life cycle functions
        onBrowsing, onZooming, onSwitching, onRotating,
        // Controlled props
        browsing:controlledBrowsing,
        // rest
        ...restProps
    } = props

    return {
        coverProps: {
            // Internal
            className, style, onClick, forwardedRef,
            // Data
            src, alt, txt,
        },
        calleeProps: {
            // Callee
            coverRef, destroyer,
        },
        stateProps: {
            // Controlled props
            controlledBrowsing,
        },
        configProps: {
            // Data
            defaultPage,
            set: normalizationSet({ set, src, alt, txt }),
            // Presets
            preset,
            // Control
            controller, hotKey, animate,
            // Styles & interactive
            hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop,
            // Life cycle functions
            onBrowsing, onZooming, onSwitching, onRotating,
        },
        restProps,
    }
}
