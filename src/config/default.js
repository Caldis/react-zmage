/**
 * 默认类型与默认值
 **/

// Libs
import PropTypes from 'prop-types'
import { env } from "@/utils/env"

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
    ]),
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
        // 自动
        "auto",
        // 桌面端
        "desktop",
        // 移动端
        "mobile",
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
    preset: "auto",

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
    // 封面可见性
    coverVisible: false,
    // 背景色
    backdrop: "#FFFFFF",
    // 高度
    zIndex: 1000,
    // 圆角 (受制于 preset)
    radius: 0,
    // 边距 (受制于 preset)
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
 * 默认值 (不同平台)
 **/
const DEF_PROP = "__ZMAGE_DEF_PROP__"
export const defPropWithEnv = (preset) => {
    if (typeof window !== "undefined") {
        if (!window.hasOwnProperty(DEF_PROP)) {
            window[DEF_PROP] = {}
        }
        if (!window[DEF_PROP].hasOwnProperty(preset)) {
            switch (preset) {
                case 'desktop':
                    window[DEF_PROP][preset] = {
                        ...defProp,
                        ...defPreset.desktop,
                    }
                    break
                case 'mobile':
                    window[DEF_PROP][preset] = {
                        ...defProp,
                        ...defPreset.mobile,
                    }
                    break
                case 'auto':
                    window[DEF_PROP][preset] = {
                        ...defProp,
                        ...env.isDesktop && defPreset.desktop,
                        ...env.isMobile && defPreset.mobile,
                    }
                    break
                default:
                    window[DEF_PROP][preset] = {
                        ...defProp,
                        ...defPreset.desktop,
                    }
            }
        }
        return window[DEF_PROP][preset]
    } else {
        return {}
    }
}
