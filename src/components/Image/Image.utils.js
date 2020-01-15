/**
 * 样式控制
 **/

// Utils
import {
    calcFitScale,
    scrollWidth, innerWidth, clientWidth,
    scrollHeight, innerHeight, clientHeight,
    checkImageLoadedComplete, appendParams, numberOfStyleUnits,
    lockTouchInteraction, unlockTouchInteraction,
    withVendorPrefix,
} from '@/utils'

/* 获取当前图片样式 */
export const getCurrentImageStyle = (props, context, imageRef, touchProfile) => {
    const { show } = props
    const { zoom } = context
    if (show) {
        if (zoom) {
            return getZoomingStyle(props, context, imageRef)
        } else {
            return getBrowsingStyle(props, context, imageRef)
        }
    } else {
        return getCoverStyle(props, context, imageRef, touchProfile)
    }
}

/* 获取封面样式 */
export const getCoverStyle = (props, context, imageRef, touchProfile) => {
    const { coverRef, coverPos, rotate, pageIsCover } = context
    if (touchProfile && touchProfile.phase === TOUCH_BEHAVIOR_PHASE.END) {
        console.log(touchProfile)
        return {
            _type: 'cover',
            _behavior: 'merge',
            y: touchProfile.current.offset.y>0 ? innerHeight() : -innerHeight()
        }
    }
    if (coverRef.current) {
        // 从封面唤出
        const { naturalWidth } = coverRef.current
        const { top, left, width, height } = coverRef.current.getBoundingClientRect()
        const { opacity, borderRadius } = window.getComputedStyle(coverRef.current)
        return pageIsCover ? {
            _type: 'cover',
            x: -scrollWidth()/2 + left + width/2,
            y: -innerHeight()/2 + top + height/2,
            opacity: Number(opacity) || 1,
            scale: naturalWidth ? width/naturalWidth : 1,
            rotate: rotate-rotate%360,
            radius: numberOfStyleUnits(borderRadius, { ref:width }),
        } : {
            _type: 'cover',
            x: 0,
            y: -innerHeight(),
            opacity: 0,
            scale: naturalWidth ? width/naturalWidth : 1,
            rotate: rotate-rotate%360,
            radius: numberOfStyleUnits(borderRadius, { ref:width }),
        }
    } else if (coverPos) {
        // 从 Callee 唤出
        // 获取以鼠标指针为起始点的封面样式
        return {
            _type: 'cover',
            x: coverPos.x ? coverPos.x-scrollWidth()/2 : 0,
            y: coverPos.y ? coverPos.y-innerHeight()/2 : 0,
            opacity: 0,
            scale: 0,
            rotate: 0,
            radius: 0,
        }
    } else {
        // Fallback
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
export const getZoomingStyle = (props, context, imageRef, { clientX:mouseX=scrollWidth()/2, clientY:mouseY=innerHeight()/2 }={}) => {
    const { radius, edge, rotate } = context
    const { naturalWidth, naturalHeight } = imageRef.current
    // 随鼠标位移偏移量
    const saveEdge = edge || 50
    const viewWidth = scrollWidth()
    const viewHeight = innerHeight()
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

/* 动画属性 */
const CROSS_FADE_OFFSET = 30
const SWIPE_GAP = 10
const ZOOM_OVERFLOW = 0.08
export const getAnimateConfig = (type) => {
    let offset=0, overflow=0, opacity=1
    switch (type) {
        case 'fade':
            opacity = 0
            break
        case 'crossFade':
            offset = CROSS_FADE_OFFSET
            opacity = 0
            break
        case 'swipe':
            offset = scrollWidth() + SWIPE_GAP
            break
        case 'zoom':
            overflow = ZOOM_OVERFLOW
            opacity = 0
            break
    }
    return { offset, overflow, opacity }
}

/* 触控属性 */
const TOUCH_UPDATE_PERIOD = 1
const TOUCH_BEHAVIOR_THRESHOLD = 5
const TOUCH_SPEED_THRESHOLD = 0.35
const TOUCH_DISTANCE_THRESHOLD = { x:120, y:80 }
export const TOUCH_BEHAVIOR_PHASE = {
    "BEGIN": "BEGIN",
    "MOVING": "MOVING",
    "END": "END",
}
export const TOUCH_BEHAVIOR_TYPE = {
    "SWIPING": "SWIPING",
    "LIVING": "LIVING",
}
export const touchProfile = function ({ origin }={}) {
    return {
        updateCounter: 0,
        phase: TOUCH_BEHAVIOR_PHASE.BEGIN,
        behavior: undefined,
        begin: {
            time: new Date().getTime(),
            origin: origin || { x:0, y:0 },
            offset: { x:0, y:0 },
        },
        current: {
            origin: origin || { x:0, y:0 },
            offset: { x:0, y:0 },
        },
        update: function({ origin }={}) {
            // 更新计数
            this.updateCounter++
            // 根据周期决定是否更新
            if (this.updateCounter%TOUCH_UPDATE_PERIOD===0) {
                // 更新阶段属性
                this.phase = TOUCH_BEHAVIOR_PHASE.MOVING
                // 更新坐标属性
                this.current = {
                    origin: origin,
                    offset: { x:origin.x-this.begin.origin.x, y:origin.y-this.begin.origin.y }
                }
                // 更新行为属性
                if (!this.behavior) {
                    const distanceX = Math.abs(this.current.offset.x)
                    const distanceY = Math.abs(this.current.offset.y)
                    if (distanceX > distanceY) {
                        if (distanceX > TOUCH_BEHAVIOR_THRESHOLD) {
                            this.behavior = TOUCH_BEHAVIOR_TYPE.SWIPING
                        }
                    } else {
                        if (distanceY > TOUCH_BEHAVIOR_THRESHOLD) {
                            this.behavior = TOUCH_BEHAVIOR_TYPE.LIVING
                        }
                    }
                }
                return this
            }
        },
        end: function () {
            // 更新阶段属性
            this.phase = TOUCH_BEHAVIOR_PHASE.END
            // 时间间隔
            const interval = new Date().getTime() - this.begin.time
            // 更新行为属性, 如果对应速度小于阈值, 则视为无操作
            const distanceX = Math.abs(this.current.offset.x)
            const distanceY = Math.abs(this.current.offset.y)
            if ((this.behavior===TOUCH_BEHAVIOR_TYPE.SWIPING && (distanceX/interval<TOUCH_SPEED_THRESHOLD && distanceX<TOUCH_DISTANCE_THRESHOLD.x)) ||
                (this.behavior===TOUCH_BEHAVIOR_TYPE.LIVING && (distanceY/interval<TOUCH_SPEED_THRESHOLD && distanceY<TOUCH_DISTANCE_THRESHOLD.y))
            ) {
                this.behavior = undefined
            }
            return this
        }
    }
}
export const getTouchConfig = (profile, { enableSwiping, enableLiving }={}) => {
    let touch={ x:0, y:0 }, transition
    if (profile && profile.phase===TOUCH_BEHAVIOR_PHASE.MOVING) {
        if (profile.behavior===TOUCH_BEHAVIOR_TYPE.SWIPING && enableSwiping) {
            touch.x = profile.current.offset.x
            transition = `none`
        } else if (profile.behavior===TOUCH_BEHAVIOR_TYPE.LIVING && enableLiving) {
            touch.y = profile.current.offset.y
            transition = `none`
        }
    }
    return { touch, transition }
}
