/**
 * 工具函数
 **/

const hasWindow = typeof window !== 'undefined'
const hasDocument = typeof document !== 'undefined'
const getDocumentElement = () => hasDocument ? document.documentElement : undefined
const getBodyElement = () => hasDocument ? document.body : undefined

/**
 * 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
 * @param {number} naturalWidth - 图片原始宽
 * @param {number} naturalHeight - 图片原始高
 * @param {number} [edge] - 需要预留的边距
 */
export const calcFitScale = (naturalWidth: number, naturalHeight: number, edge = 0) => {
  const clientWidth = getClientWidth()
  const clientHeight = getClientHeight()
  const figureWidth = naturalWidth + 2 * edge
  const figureHeight = naturalHeight + 2 * edge
  const scaleX = figureWidth > clientWidth ? clientWidth / (naturalWidth + 2 * edge) : 1
  const scaleY = figureHeight > clientHeight ? clientHeight / (naturalHeight + 2 * edge) : 1
  return Math.min(scaleX, scaleY) + 0.002 // 防止在高dpi设备出现无法占满边距的问题
}

/**
 * 屏幕尺寸
 */
export const getInnerWidth = () => hasWindow ? window.innerWidth : 0
export const getScrollWidth = () => {
  const body = getBodyElement()
  return body ? body.scrollWidth : 0
}
export const getClientWidth = () => {
  const documentElement = getDocumentElement()
  return documentElement ? documentElement.clientWidth : 0
}
export const getInnerHeight = () => hasWindow ? window.innerHeight : 0
export const getScrollHeight = () => {
  const body = getBodyElement()
  return body ? body.scrollHeight : 0
}
export const getClientHeight = () => {
  const documentElement = getDocumentElement()
  return documentElement ? documentElement.clientHeight : 0
}

/**
 * 触摸交互锁定
 * 缩放, 滚动等
 * FIXME: iOS Safari 如果进入全屏则无效
 */
const touchStyle = { documentOverflow: '', bodyOverflow: '', bodyPosition: '' }
export const lockTouchInteraction = () => {
  const documentElement = getDocumentElement()
  const body = getBodyElement()
  if (!documentElement || !body) {
    return
  }
  // Save
  touchStyle.documentOverflow = documentElement.style.overflow
  touchStyle.bodyOverflow = body.style.overflow
  touchStyle.bodyPosition = body.style.position
  // Apply
  documentElement.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
  body.style.position = 'relative'
}
export const unlockTouchInteraction = () => {
  const documentElement = getDocumentElement()
  const body = getBodyElement()
  if (!documentElement || !body) {
    return
  }
  // Recover
  documentElement.style.overflow = touchStyle.documentOverflow
  body.style.overflow = touchStyle.bodyOverflow
  body.style.position = touchStyle.bodyPosition
}

/**
 * 检查图片是否完全载入
 * @param {HTMLImageElement} targetImageElement - 目标图片元素
 * @param {function} [callback] - 回调函数
 */
export const checkImageLoadedComplete = (targetImageElement: HTMLImageElement | null, callback: () => unknown) => {
  const timer = setInterval(() => {
    if (!targetImageElement || targetImageElement.complete) {
      clearInterval(timer)
      callback()
    }
  }, 500)
  return timer
}

/**
 * 为 Url 附加参数
 * @param  url - 目标地址
 * @param [params] - 要附加的参数列表
 */
export const appendParams = (url: string, params: { [param: string]: string | number } = {}) => {
  const paramString = Object.keys(params).reduce((acc, cur = '') => params[cur] ? acc.concat(`${cur}=${params[cur]}`) : acc, [] as string[]).join('&')
  return paramString ? `${url}${url.includes('?') ? '&' : '?'}${paramString}` : url
}

/**
 * 提取样式对象中的数值
 * @param  unit - 目标样式对象
 * @param [options] - 当 unit 为百分比时的基准参考数值
 */
export const numberOfStyleUnits = (unit: string, options = { ref: 100 }) => {
  return unit
    ? unit.includes('%')
      ? options.ref * Number(unit.substring(0, unit.length - 1)) / 100
      : Number(unit.substring(0, unit.length - 2))
    : Number(unit)
}

/**
 * 下载文件
 * @param  href - 下载目标地址
 * @param [name] - 下载文件名称
 */
export const downloadFromLink = (href: string, name?: string) => {
  const body = getBodyElement()
  if (!hasDocument || !body) {
    return
  }
  const downloadLink = document.createElement('a')
  downloadLink.href = href
  downloadLink.download = name || href.split('/')[href.split('/').length - 1]
  body.appendChild(downloadLink)
  downloadLink.click()
  body.removeChild(downloadLink)
}

/**
 * 令首字母大写
 * @param string - 目标文本
 */
export const uppercaseFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 增加浏览器前缀
 * @param style - 目标样式
 */
export const withVendorPrefix = (style: { [styleName: string]: string }) => {
  const vendorPrefixList = ['Webkit', 'Moz', 'Ms', 'O']
  return Object.keys(style).reduce((styleAcc, styleCur) => {
    const stylesWithPrefix = vendorPrefixList.reduce((prefixAcc, prefixCur) => {
      return {
        ...prefixAcc,
        [`${prefixCur}${uppercaseFirstLetter(styleCur)}`]: style[styleCur]
      }
    }, {})
    return { ...styleAcc, ...stylesWithPrefix }
  }, style)
}

/**
 * 是否数字
 * @param num - 数字
 */
export const isInteger = (num: number | undefined | null) => (typeof num === 'number') && (num ^ 0) === num

/**
 * 获取目标页码
 */
/**
 * @param current - 当前页码
 * @param length - 集合总长度
 * @param step - 目标方向
 * @param options - 配置项
 * @param options.loop - 是否循环
 */
export const getTargetPage = (current: number, length: number, step: number, options = { loop: true }) => {
  // Guards
  if (length === 0) {
    return 0
  }
  if (step === 0) {
    return current
  }
  if (current < 0 || current > length - 1) {
    return undefined
  }
  // Processing
  return options.loop
    ? Math.abs((length + step) + current) % length
    : (current + step < 0 || current + step > length - 1) ? undefined : current + step
}

/**
 * 生成鏡像數組
 * @param edge - 距離0點的長度
 */
const RANGE = { 0: [0], 1: [-1, 0, 1], 2: [-2, -1, 0, 1, 2], 3: [-3, -2, -1, 0, 1, 2, 3] }
export const mirrorRange = (edge: 0 | 1 | 2 | 3) => RANGE[edge]

/**
 * 防抖
 */
export const debounce = (func: () => unknown, delay: number) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: never[]) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

/**
 * 监听全局点击事件并记录点击坐标
 */
export class GlobalClickMonitor {

  private static readonly CENTER_POSITION: Coordinate = { x: 0, y: 0 }
  public currentPosition = GlobalClickMonitor.CENTER_POSITION
  private readonly debounceInterval = 200
  private static createFallback (): GlobalClickMonitor {
    return {
      currentPosition: GlobalClickMonitor.CENTER_POSITION,
      destructor: () => {},
    } as GlobalClickMonitor
  }

  constructor ({ position }: { position: Coordinate } = { position: GlobalClickMonitor.CENTER_POSITION }) {
    if (!hasWindow) {
      return GlobalClickMonitor.createFallback()
    }
    // 返回已有
    if (window.__ZMAGE_GLOBAL_CLICK_MONITOR__) {
      return window.__ZMAGE_GLOBAL_CLICK_MONITOR__
    }
    // 创建
    try {
      // 记录现有
      this.currentPosition = position
      // 监听点击事件
      window.addEventListener('click', this.update)
      window.__ZMAGE_GLOBAL_CLICK_MONITOR__ = this
    } catch (e) {
      // Create fake Monitor if window object not exist
      return GlobalClickMonitor.createFallback()
    }
  }

  // 重置
  private debounceResetPosition = debounce(() => {
    this.currentPosition = GlobalClickMonitor.CENTER_POSITION
  }, this.debounceInterval)
  // 更新数据
  private update = (e: MouseEvent) => {
    // 更新点击坐标
    this.currentPosition = { x: e.clientX, y: e.clientY }
    // 如果 Interval 内发生没有发生过点击事件，则重置点击位置，以兼容非点击方式调用
    this.debounceResetPosition()
  }

  public destructor () {
    if (!hasWindow) {
      return
    }
    try {
      window.removeEventListener('click', this.update)
      window.__ZMAGE_GLOBAL_CLICK_MONITOR__ = undefined
    } catch (e) {
      // No need to remove
    }
  }
}


/*
 * Block Scrolling
 * @see https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
 */
const SCROLL_RELATED_KEYS = {
  38: true, // UP
  40: true, // DOWN
  33: true, // PAGE_UP
  34: true, // PAGE_DOWN
  35: true, // END
  36: true, // HOME
}
function preventDefault(e: Event) {
  e.preventDefault()
}
function preventDefaultForScrollKeys(e: KeyboardEvent) {
  if (e.keyCode in SCROLL_RELATED_KEYS) {
    preventDefault(e)
    return false
  }
}
// modern Chrome requires { passive: false } when adding event
let supportsPassive = false
if (hasWindow) {
  try {
    window.addEventListener('test', null as unknown as EventListener, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true
      }
    }))
  } catch(e) {
    // do nothing
  }
}
const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent = hasDocument ? ('onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel') : 'wheel'
// call this to Disable
export function disableScroll() {
  if (!hasWindow) {
    return
  }
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}
// call this to Enable
export function enableScroll() {
  if (!hasWindow) {
    return
  }
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault)
  window.removeEventListener('touchmove', preventDefault)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
}
