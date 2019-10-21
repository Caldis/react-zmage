/**
 * 工具函数
 **/

// Libs
import memoize from 'lodash.memoize'

/**
 * 通过屏幕尺寸以及图片尺寸，计算出图片在屏幕中完整显示的缩放比例
 * @param {number} naturalWidth - 图片原始宽
 * @param {number} naturalHeight - 图片原始高
 * @param {number} [edge] - 需要预留的边距
 */
export const calcFitScale = (naturalWidth, naturalHeight, edge=0) => {
    const figureWidth = naturalWidth + 2*edge
    const figureHeight = naturalHeight + 2*edge
    const scaleX = figureWidth>clientWidth() ? clientWidth()/(naturalWidth+2*edge) : 1
    const scaleY = figureHeight>clientHeight() ? clientHeight()/(naturalHeight+2*edge) : 1
    return Math.min(scaleX, scaleY) // + 0.002 // 防止在高dpi设备出现无法占满边距的问题
}

/**
 * 屏幕尺寸
 */
export const windowWidth = () => window.innerWidth
export const scrollWidth = () => document.body.scrollWidth
export const clientWidth = () => document.documentElement.clientWidth
export const windowHeight = () => window.innerHeight
export const scrollHeight = () => document.body.scrollHeight
export const clientHeight = () => document.documentElement.clientHeight

/**
 * 触摸交互锁定
 * 缩放, 滚动等
 */
const touchStyle = { html:{}, body:{} }
export const lockTouchInteraction = () => {
    // Save
    touchStyle.html.overflow = document.documentElement.style.overflow
    touchStyle.body.overflow = document.body.style.overflow
    touchStyle.body.position = document.body.style.position
    // Apply
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
};
export const unlockTouchInteraction = () => {
    // Recover
    document.documentElement.style.overflow = touchStyle.html.overflow
    document.body.style.overflow = touchStyle.body.overflow
    document.body.style.position = touchStyle.body.position
};

/**
 * 根据传入的属性, 返回附带对应显示状态的类名
 * @param {string}  defClassName - 基准类名
 * @param {boolean} [flag] - 是否启用
 * @param {string}  [attach] - 显示时附加的类名
 */
export const withToggleStatus = (defClassName, flag=false, attach) => {
    return flag && attach ? `${defClassName} ${attach}` : defClassName
}

/**
 * 检查图片是否完全载入
 * @param {HTMLImageElement} targetImageElement - 目标图片元素
 * @param {function} [callback] - 回调函数
 */
export const checkImageLoadedComplete = (targetImageElement, callback) => {
    let timer
    const checker = () => {
        if (!targetImageElement || targetImageElement.complete) {
            clearInterval(timer)
            callback && callback()
        }
    }
    timer = setInterval(checker, 500)
    return timer
}

/**
 * 为 Url 附加参数
 * @param {string}  url - 目标地址
 * @param {object} [params] - 要附加的参数列表
 */
export const appendParams = (url, params={}) => {
    const paramString = Object.keys(params).reduce((acc, cur) => params[cur] ? acc.concat(`${cur}=${params[cur]}`) : acc, []).join("&")
    return paramString ? `${url}${url.includes('?') ? '&' : '?'}${paramString}` : url
}

/**
 * 提取样式对象中的数值
 * @param {string}  unit - 目标样式对象
 * @param {number} [percentRef] - 当 unit 为百分比时的基准参考数值
 */
export const numberOfStyleUnits = memoize((unit, { ref=100 }={}) => {
    return unit
        ? unit.includes('%')
            ? ref*Number(unit.substring(0, unit.length - 1))/100
            : Number(unit.substring(0, unit.length - 2))
        : unit
})

/**
 * 下载文件
 * @param {string}  href - 下载目标地址
 * @param {string} [name] - 下载文件名称
 */
export const downloadFromLink = (href, name) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = href;
    downloadLink.download = name || href.split("/")[href.split("/").length-1];
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

/**
 * 令首字母大写
 * @param {string} string - 目标文本
 */
export const uppercaseFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 增加浏览器前缀
 * @param {object} style - 目标样式
 */
export const withVendorPrefix = memoize((style) => {
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
})

/**
 * 是否数字
 * @param {number} num - 数字
 */
export const isInteger = (num) => (num^0)===num


/**
 * 获取目标页码
 */
/**
 * @param {number} current - 当前页码
 * @param {number} length - 集合总长度
 * @param {number} step - 目标方向
 * @param {object} options - 配置项
 * @param {boolean} options.loop - 是否循环
 */
export const getTargetPage = (current, length, step, options={loop:true}) => {
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
 * @param {number} distance - 距離0點的長度
 */
export const mirrorRange = memoize((edge) => {
    return [...([...Array(edge).keys()].map(k => -k - 1).reverse()), ...([...Array(edge + 1).keys()])]
})
