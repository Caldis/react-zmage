/**
 * 剥离出来的组件样式
 **/

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
    const centerPosition = `translate(0, 0)`
    // 封面中心点位置 (如果当前为第一页，则返回封面位置，否则向上隐藏)
    const coverNodeRect = coverNodeRef ? coverNodeRef.getBoundingClientRect() : {
        bottom:0, height:0, left:0, right:0, top:0, width:0, x:0, y:0
    }
    const coverPosition = current === 0 ?
        `translate(calc(-50vw + ${coverNodeRect.left+coverNodeRect.width/2}px), calc(-50vh + ${coverNodeRect.top+coverNodeRect.height/2}px))` :
        `translate(0, -100vh)`
    return show ? {
        WebkitTransform: centerPosition,
        transform: centerPosition
    } : {
        WebkitTransform: coverPosition,
        transform: coverPosition
    }
}
export const imageStyle = (zmageId, show, zoom, coverNodeRef) => {
    // 封面尺寸
    const coverNodeRect = coverNodeRef ? coverNodeRef.getBoundingClientRect() : {
        bottom:0, height:0, left:0, right:0, top:0, width:0, x:0, y:0
    }
    // 大图原始尺寸
    let naturalWidth, naturalHeight;
    if(zoom) {
        const zmageNode = document.getElementById(zmageId)
        naturalWidth = zmageNode.naturalWidth
        naturalHeight = zmageNode.naturalHeight
    }
    return show ? {
        width:  zoom ? naturalWidth : 'initial',
        height:  zoom ? naturalHeight : 'initial',
        maxWidth: zoom ? naturalWidth : '90vw',
        maxHeight: zoom ? naturalHeight : '90vh',
        border: 0,
        borderRadius: 6,
    } : {
        maxWidth: coverNodeRect.width,
        maxHeight: coverNodeRect.height,
        border: coverNodeRef && coverNodeRef.style.border || 0,
        borderRadius: coverNodeRef && coverNodeRef.style.borderRadius || 0,
    }
}

// 背景遮罩样式
export const bgOverlayStyle = show => show ? {backgroundColor: 'white'} : {backgroundColor: 'transparent'}
