/**
 * 默认类型与默认值
 **/

// Libs
import { AnimateFlip, BaseType, Preset, Set } from './global'

/**
 * 默认值
 **/
export const defProp = {

  /**
   * 基础数据
   **/
  // 图片地址
  src: '',
  // 图片标题
  alt: '',
  // 图片下方辅助文案 (大图模式渲染为 caption)
  caption: '',
  // 图片集合
  set: [] as Set[],
  // 图片默认页
  defaultPage: 0,

  /**
   * 预设
   **/
  preset: '',

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
  backdrop: '#FFFFFF',
  // 高度
  zIndex: 1000,
  // 圆角
  radius: 0,
  // 边距
  edge: 0,
  // 是否循环查看
  loop: true,
  // 双击图片关闭 (浏览态)
  closeOnDoubleClick: false,

  /**
   * 生命周期
   **/
  onBrowsing: () => {},
  onZooming: () => {},
  onSwitching: () => {},
  onRotating: () => {},
  // onError 不预置 stub: 用户没传时传给 cover 的 onError 应为 undefined 而不是 noop,
  // 否则会改变 native HTMLImageElement 的 error 行为 (如把 broken-image fallback 抑制掉)

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
      flip: 'crossFade' as AnimateFlip,
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
      flip: 'swipe' as AnimateFlip,
    },
  }
}

/**
 * 默认值 (不同平台)
 **/
const DEF_PROP_DESKTOP = {
  ...defProp,
  ...defPreset.desktop,
}
const DEF_PROP_MOBILE = {
  ...defProp,
  ...defPreset.mobile,
}

/**
 * 把可能的 'auto' 解析为具体平台。
 * 判定基于 CSS media query: 同时满足 (pointer: coarse) 与 (hover: none) 视为移动端。
 * SSR / 无 matchMedia 环境 fallback 到 desktop, 客户端 mount 后会重新求值。
 *
 * 不依赖 UA-sniff: tablet+键盘 / 触屏笔记本 用各自当前的指针能力判定,
 * 比"是不是手机"更贴近"该不该展示 hotkey 与 swipe"的真正语义。
 */
export const resolvePreset = (preset?: Preset): 'desktop' | 'mobile' => {
  if (preset === 'mobile') return 'mobile'
  if (preset === 'desktop') return 'desktop'
  if (preset === 'auto') {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'desktop'
    return window.matchMedia('(pointer: coarse) and (hover: none)').matches ? 'mobile' : 'desktop'
  }
  return 'desktop'
}

export const defPropsWithEnv = (preset?: Preset) => {
  return resolvePreset(preset) === 'mobile' ? DEF_PROP_MOBILE : DEF_PROP_DESKTOP
}

/**
 * 获取配置属性
 **/
export const getConfigFromProps = (props: BaseType) => {
  const {
    // Internal
    className, style, onClick, forwardedRef,
    // Callee
    coverRef, destructor,
    // Data
    src, alt, caption, set, defaultPage,
    // Presets
    preset,
    // Control
    controller, hotKey, animate,
    // Styles & interactive
    hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop, closeOnDoubleClick,
    // Life cycle functions
    onBrowsing, onZooming, onSwitching, onRotating, onError,
    // Controlled props
    browsing,
    // rest
    ...restProps
  } = props

  return {
    coverProps: {
      // Internal
      className, style, onClick, forwardedRef,
      // Data (cover only consumes src/alt; caption is viewer-only)
      src, alt,
      // Native error transparently mirrored to cover img (matches docs: "all HTMLAttributes forwarded")
      onError,
    },
    calleeProps: {
      // Callee
      coverRef, destructor,
    },
    controlledProps: {
      // Controlled
      browsing,
    },
    configProps: {
      // Data
      defaultPage,
      set: (Array.isArray(set) && set.length > 0) ? set : [{ src, alt, caption, ...restProps }],
      // Presets
      preset,
      // Control
      controller, hotKey, animate,
      // Styles & interactive
      hideOnScroll, coverVisible, backdrop, zIndex, radius, edge, loop, closeOnDoubleClick,
      // Life cycle functions
      onBrowsing, onZooming, onSwitching, onRotating, onError,
    },
    restProps,
  }
}
