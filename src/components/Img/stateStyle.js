/**
 * 剥离组件样式
 **/
// Utils
import { calcFitScale } from '@/utils'

// 放大按钮样式
export const zoomStyle = show =>
	show ? {
		WebkitClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
		MozClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
		MsClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
		OClipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
        clipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
		opacity: 1
	} : {
        WebkitClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
        MozClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
        MsClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
        OClipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
		clipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
		opacity: 0
	}

// 关闭按钮样式
export const lineL = show =>
	show ? {
		WebkitTransform: 'translate(-50%, -50%) rotate(45deg)',
		transform: 'translate(-50%, -50%) rotate(45deg)',
		opacity: 1
	} : {
        WebkitTransform: 'translate(-50%, -50%) rotate(0)',
		transform: 'translate(-50%, -50%) rotate(0)',
		opacity: 0
	}
export const lineR = show =>
	show ? {
        WebkitTransform: 'translate(-50%, -50%) rotate(-45deg)',
		transform: 'translate(-50%, -50%) rotate(-45deg)',
		opacity: 1
	} : {
        WebkitTransform: 'translate(-50%, -50%) rotate(0)',
		transform: 'translate(-50%, -50%) rotate(0)',
		opacity: 0
	}

// 切换按钮样式
export const prevStyle = show =>
	show ? {
		left: 0,
		opacity: 1
	} : {
		left: -55,
		opacity: 0
	}
export const nextStyle = show =>
	show ? {
		right: 0,
		opacity: 1
	} : {
		right: -55,
		opacity: 0
	}

// 页数指示样式
export const pagesStyle = show =>
	show ? {
		bottom: 0,
		opacity: 1
	} : {
		bottom: -31,
		opacity: 0
	}

// 图片标题样式
export const altStyle = show => show ? {
    WebkitClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    MozClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    MsClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    OClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
	opacity: 1
} : {
    WebkitClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    MozClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    MsClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    OClipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
	clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
	opacity: 0
}

// 图片本体样式
export const imageWrapperStyle = (show, current, coverNodeRef) => {
    // 页面中心点位置
    const centerPosition = `translate3d(0, 0, 0)`
    // 封面位置 (如果当前为第一页，则返回封面位置，否则向上隐藏)
    let coverPosition = current === 0 ? `translate3d(0, 0, 0)` : `translate3d(0, -100vh, 0)`
    if (coverNodeRef) {
        const coverNodeRect = coverNodeRef.getBoundingClientRect()
        coverPosition = current === 0 ?
            `translate3d(calc(-50vw + ${coverNodeRect.left+coverNodeRect.width/2}px), calc(-50vh + ${coverNodeRect.top+coverNodeRect.height/2}px), 0)` :
            `translate3d(0, -80vh, 0)`
    }
    return show ? {
        WebkitTransform: centerPosition,
        transform: centerPosition
    } : {
        WebkitTransform: coverPosition,
        transform: coverPosition
    }
}

export const imageStyle = (zmageId, show, zoom, zoomMargin, coverNodeRef) => {

    const nodeRef = coverNodeRef || document.getElementById(zmageId)
    let coverNodeStyle = {}, opacity = 0
    let coverScale = 0, fitScale = 0, originalScale = 1
    if (nodeRef) {
        // 封面尺寸, 封面样式
        coverNodeStyle = window.getComputedStyle(nodeRef)
        opacity = 1
		// 计算缩放比例
        coverScale = parseInt(coverNodeStyle.width) / nodeRef.naturalWidth
        fitScale = calcFitScale(nodeRef, zoomMargin)
    }

    return show ? {
	    transform: coverNodeRef ? `translate(-50%, -50%) scale(${zoom ? originalScale : fitScale})` : '',
		maxWidth: coverNodeRef ? '' : '90vw',
		maxHeight: coverNodeRef ? '' : '90vh',
        border: "",
        borderRadius: "",
        boxShadow: ""
    } : {
        opacity,
	    transform: coverNodeRef ? `translate(-50%, -50%) scale(${coverScale})` : '',
        maxWidth: coverNodeRef ? '' : '0',
        maxHeight: coverNodeRef ? '' : '0',
        border: coverNodeStyle.border || "",
        borderRadius: coverNodeStyle.borderRadius || "",
        boxShadow: coverNodeStyle.boxShadow || "",
    }
}

// 背景遮罩样式
export const bgOverlayStyle = show => show ? {backgroundColor: 'rgba(255,255,255,1)'} : {backgroundColor: 'rgba(255,255,255,0)'}
