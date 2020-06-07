/**
 * 工具函数
 **/

/**
 * 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
 * @param {number} naturalWidth - 图片原始宽
 * @param {number} naturalHeight - 图片原始高
 * @param {number} [edge] - 需要预留的边距
 */
export const calcFitScale = (naturalWidth: number, naturalHeight: number, edge = 0) => {
    const clientWidth = getClientWidth()
    const clientHeight = getClientHeight()
    const figureWidth = naturalWidth + 2*edge
    const figureHeight = naturalHeight + 2*edge
    const scaleX = figureWidth>clientWidth ? clientWidth/(naturalWidth+2*edge) : 1
    const scaleY = figureHeight>clientHeight ? clientHeight/(naturalHeight+2*edge) : 1
    return Math.min(scaleX, scaleY) + 0.002 // 防止在高dpi设备出现无法占满边距的问题
}

/**
 * 屏幕尺寸
 */
export const getInnerWidth = () => window.innerWidth
export const getScrollWidth = () => document.body.scrollWidth
export const getClientWidth = () => document.documentElement.clientWidth
export const getInnerHeight = () => window.innerHeight
export const getScrollHeight = () => document.body.scrollHeight
export const getClientHeight = () => document.documentElement.clientHeight

/**
 * 触摸交互锁定
 * 缩放, 滚动等
 * FIXME: iOS Safari 如果进入全屏则无效
 */
const touchStyle = { documentOverflow: '', bodyOverflow: '', bodyPosition: '' }
export const lockTouchInteraction = () => {
    // Save
    touchStyle.documentOverflow = document.documentElement.style.overflow
    touchStyle.bodyOverflow = document.body.style.overflow
    touchStyle.bodyPosition = document.body.style.position
    // Apply
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
};
export const unlockTouchInteraction = () => {
    // Recover
    document.documentElement.style.overflow = touchStyle.documentOverflow
    document.body.style.overflow = touchStyle.bodyOverflow
    document.body.style.position = touchStyle.bodyPosition
};

/**
 * 检查图片是否完全载入
 * @param {HTMLImageElement} targetImageElement - 目标图片元素
 * @param {function} [callback] - 回调函数
 */
export const checkImageLoadedComplete = (targetImageElement: HTMLImageElement, callback: () => unknown) => {
    let timer: number
    const checker = () => {
        if (!targetImageElement || targetImageElement.complete) {
            clearInterval(timer)
            callback()
        }
    }
    timer = setInterval(checker, 500)
    return timer
}

/**
 * 为 Url 附加参数
 * @param  url - 目标地址
 * @param [params] - 要附加的参数列表
 */
export const appendParams = (url:string, params: { [param: string]: string | number } = {}) => {
    const paramString = Object.keys(params).reduce((acc, cur) => params[cur] ? acc.concat(`${cur}=${params[cur]}`) : acc, []).join("&")
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
    const downloadLink = document.createElement('a');
    downloadLink.href = href;
    downloadLink.download = name || href.split("/")[href.split("/").length-1];
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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
export const isInteger = (num: number) => (num^0) === num


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
    if (step===0) {
        return current
    }
    if (current<0 || current>length-1) {
        return undefined
    }
    // Processing
    return options.loop
        ? Math.abs((length+step)+current)%length
        : (current+step<0 || current+step>length-1) ? undefined : current+step
}

/**
 * 生成鏡像數組
 * @param edge - 距離0點的長度
 */
const RANGE = { 0:[0], 1:[-1,0,1], 2:[-2,-1,0,1,2], 3:[-3,-2,-1,0,1,2,3] }
export const mirrorRange = (edge: 0 | 1 | 2 | 3) => RANGE[edge]

/**
 * 防抖
 */
export const debounce = (func: () => unknown, delay: number) => {
    let timer: number;
    return (...args: any[]) => {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}

/**
 * 监听全局点击事件并记录点击坐标
 */
export class GlobalClickMonitor {

    initialPosition: CoordinateType
    currentPosition: CoordinateType
    debounceResetPosition: () => void

    static CENTER_POSITION: CoordinateType = { x: 0, y: 0 }

    constructor({ position, resetInterval }: { position: CoordinateType, resetInterval: number } = { position: GlobalClickMonitor.CENTER_POSITION, resetInterval: 200 }) {
        // 如果已经存在则直接返回现存
        if (window.__ZMAGE_GLOBAL_CLICK_MONITOR__) return window.__ZMAGE_GLOBAL_CLICK_MONITOR__
        // 记录初始坐标
        this.initialPosition = position
        this.currentPosition = position
        this.debounceResetPosition = debounce(() => this.currentPosition = GlobalClickMonitor.CENTER_POSITION, resetInterval)
        // 监听点击事件
        if (window) {
            window.addEventListener('click', this.update)
            window.__ZMAGE_GLOBAL_CLICK_MONITOR__ = this
        }
    }

    // 更新数据
    update = (e: MouseEvent) => {
        // 更新点击坐标
        this.currentPosition = { x: e.clientX, y: e.clientY }
        // 如果 200ms 内发生没有发生过点击事件，则重置点击位置，以兼容非点击方式调用
        this.debounceResetPosition()
    }

    destructor() {
        window?.document?.documentElement?.removeEventListener('click', this.update)
        window.__ZMAGE_GLOBAL_CLICK_MONITOR__ = undefined
    }
}
