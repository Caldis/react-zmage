/**
 * 样式控制
 **/

// Utils
import {
    calcFitScale,
    scrollWidth, windowWidth, clientWidth,
    scrollHeight, windowHeight, clientHeight,
    checkImageLoadedComplete, appendParams, numberOfStyleUnits,
    lockTouchInteraction, unlockTouchInteraction,
    withVendorPrefix,
} from '@/utils'

/* 获取当前图片样式 */
export const getCurrentImageStyle = (props, context, imageRef) => {
    const { show } = props
    const { zoom } = context
    if (show) {
        if (zoom) {
            return getZoomingStyle(props, context, imageRef)
        } else {
            return getBrowsingStyle(props, context, imageRef)
        }
    } else {
        return getCoverStyle(props, context)
    }
}

/* 获取封面样式 */
export const getCoverStyle = (props, context) => {
    const { coverRef, coverPos, rotate, pageIsCover } = context
    if (coverRef.current) {
        const { naturalWidth } = coverRef.current
        const { top, left, width, height } = coverRef.current.getBoundingClientRect()
        const { opacity, borderRadius } = window.getComputedStyle(coverRef.current)
        return pageIsCover ? {
            _type: 'cover',
            x: -scrollWidth()/2 + left + width/2,
            y: -windowHeight()/2 + top + height/2,
            opacity: Number(opacity) || 1,
            scale: naturalWidth ? width/naturalWidth : 1,
            rotate: rotate-rotate%360,
            radius: numberOfStyleUnits(borderRadius, { ref:width }),
        } : {
            _type: 'cover',
            x: 0,
            y: -windowHeight(),
            opacity: 0,
            scale: naturalWidth ? width/naturalWidth : 1,
            rotate: rotate-rotate%360,
            radius: numberOfStyleUnits(borderRadius, { ref:width }),
        }
    } else if (coverPos) {
        // 获取以鼠标指针为起始点的封面样式
        return {
            _type: 'cover',
            x: coverPos.x ? coverPos.x-scrollWidth()/2 : 0,
            y: coverPos.y ? coverPos.y-windowHeight()/2 : 0,
            opacity: 0,
            scale: 0,
            rotate: 0,
            radius: 0,
        }
    } else {
        // 获取以屏幕中心为起始点的封面样式
        return {
            _type: 'cover',
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
            rotate: 0,
            radius: 0,
        }
    }
}

/* 获取浏览样式 */
export const getBrowsingStyle = (props, context, imageRef) => {
    const { radius, edge, rotate } = context
    const { naturalWidth, naturalHeight } = imageRef.current
    return {
        _type: 'browsing',
        x: 0,
        y: 0,
        opacity: 1,
        scale: calcFitScale(naturalWidth, naturalHeight, edge),
        rotate,
        radius,
    }
}

/* 获取缩放样式 */
export const getZoomingStyle = (props, context, imageRef, { clientX:mouseX=scrollWidth()/2, clientY:mouseY=windowHeight()/2 }={}) => {
    const { radius, edge, rotate } = context
    const { naturalWidth, naturalHeight } = imageRef.current
    // 随鼠标位移偏移量
    const saveEdge = edge || 50
    const viewWidth = scrollWidth()
    const viewHeight = windowHeight()
    const rangeX = naturalWidth - viewWidth + (2*saveEdge)
    const rangeY = naturalHeight - viewHeight + (2*saveEdge)
    const imgPosX = naturalWidth>viewWidth ? ((naturalWidth - viewWidth)/2 + saveEdge) - (rangeX*(mouseX/viewWidth)) : 0
    const imgPosY = naturalHeight>viewHeight ? ((naturalHeight - viewHeight)/2 + saveEdge) - (rangeY*(mouseY/viewHeight)) : 0
    // 返回位置
    return {
        _type: 'zooming',
        x: imgPosX,
        y: imgPosY,
        opacity: 1,
        scale: 1,
        rotate,
        radius,
    }
}

/* 触控属性 */
const TOUCH_BEHAVIOR_BEGIN_THRESHOLD = 10
const TOUCH_BEHAVIOR_END_THRESHOLD = 200
export const TOUCH_BEHAVIOR_PHASE = {
    "BEGIN": "BEGIN",
    "MOVING": "MOVING",
    "END": "END",
}
export const TOUCH_BEHAVIOR_TYPE = {
    "SWIPING": "SWIPING",
    "LIVING": "LIVING",
}
export const TOUCH_STYLE = function ({ origin }={}) {
    return {
        phase: TOUCH_BEHAVIOR_PHASE.BEGIN,
        behavior: undefined,
        begin: {
            time: new Date().getTime(),
            origin: origin || { x:0, y:0 },
            offset: { x:0, y:0 },
        },
        current: {
            time: new Date().getTime(),
            origin: origin || { x:0, y:0 },
            offset: { x:0, y:0 },
        },
        update: function({ origin }={}) {
            // 更新阶段属性
            this.phase = TOUCH_BEHAVIOR_PHASE.MOVING
            // 更新坐标属性
            this.current = {
                time: new Date().getTime(),
                origin: origin,
                offset: { x:origin.x - this.begin.origin.x, y:origin.y - this.begin.origin.y }
            }
            // 更新行为属性
            if (!this.behavior) {
                const distanceX = Math.abs(this.current.offset.x)
                const distanceY = Math.abs(this.current.offset.y)
                if (distanceX>distanceY) {
                    if (distanceX>TOUCH_BEHAVIOR_BEGIN_THRESHOLD) {
                        this.behavior = TOUCH_BEHAVIOR_TYPE.SWIPING
                    }
                } else {
                    if (distanceY>TOUCH_BEHAVIOR_BEGIN_THRESHOLD) {
                        this.behavior = TOUCH_BEHAVIOR_TYPE.LIVING
                    }
                }
            }
            return this
        },
        end: function () {
            const time = new Date().getTime();
            // 更新阶段属性
            this.phase = TOUCH_BEHAVIOR_PHASE.END
            // 更新行为属性
            // 如果结束间隔大于 1000ms, 且对应距离小于 200px, 则视为无操作
            if (((time - this.current.time) > 1000) && this.behavior) {
                if (this.behavior===TOUCH_BEHAVIOR_TYPE.SWIPING && this.current.offset.x<TOUCH_BEHAVIOR_END_THRESHOLD) {
                    this.behavior = undefined
                } else if (this.behavior===TOUCH_BEHAVIOR_TYPE.LIVING && this.current.offset.y<TOUCH_BEHAVIOR_END_THRESHOLD){
                    this.behavior = undefined
                }
            }
            return this
        }
    }
}
