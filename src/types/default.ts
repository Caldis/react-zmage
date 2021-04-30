/**
 * 默认类型与默认值
 **/

// Libs
import { AnimateFlip, BaseType, Preset, Set } from '@/types/global'

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
  // 图片描述
  txt: '',
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

  /**
   * 生命周期
   **/
  onBrowsing: () => {},
  onZooming: () => {},
  onSwitching: () => {},
  onRotating: () => {},

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
      flip: 'fade' as AnimateFlip,
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
let IS_PROP_PRESET_AUTO_DEPRECATED_WARNED = false
const DEF_PROP_DESKTOP = {
  ...defProp,
  ...defPreset.desktop,
}
const DEF_PROP_MOBILE = {
  ...defProp,
  ...defPreset.mobile,
}
export const defPropsWithEnv = (preset: Preset) => {
  switch (preset) {
  case 'desktop':
    return DEF_PROP_DESKTOP
  case 'mobile':
    return DEF_PROP_MOBILE
  case 'auto':
    // Deprecated
    if (!IS_PROP_PRESET_AUTO_DEPRECATED_WARNED) {
      console.warn('Zmage: The value \'auto\' for the props \'preset\' has been deprecated, replace with one of \'Desktop\' or \'Mobile\', the value \'auto\' will be fallback to \'desktop\'')
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
export const getConfigFromProps = (props: BaseType) => {
  const {
    // Internal
    className, style, onClick, forwardedRef,
    // Callee
    coverRef, destructor,
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
    browsing,
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
      coverRef, destructor,
    },
    controlledProps: {
      // Controlled
      browsing,
    },
    configProps: {
      // Data
      defaultPage,
      set: (Array.isArray(set) && set.length > 0) ? set : [{ src, alt, txt, ...restProps }],
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
