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
    const { coverRef, rotate, pageIsCover } = context
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
    } else {
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