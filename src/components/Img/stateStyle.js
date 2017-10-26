/**
 * 剥离出来的组件样式
 **/

// 放大按钮样式
export const zoomStyle = show =>
	show ? {
		clipPath: "polygon(0 65%, 65% 0, 100% 0, 100% 35%, 35% 100%, 0 100%)",
		opacity: 1
	} : {
		clipPath: "polygon(0 100%, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%)",
		opacity: 0
	}

// 关闭按钮样式
export const lineL = show =>
	show ? {
		transform: 'translate(-50%, -50%) rotate(45deg)',
		opacity: 1
	} : {
		transform: 'translate(-50%, -50%) rotate(0)',
		opacity: 0
	}
export const lineR = show =>
	show ? {
		transform: 'translate(-50%, -50%) rotate(-45deg)',
		opacity: 1
	} : {
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
	clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
	opacity: 1
} : {
	clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
	opacity: 0
}

// 图片本体样式
export const imageStyle = (id, show, zoom, current, coverNodeRef, coverNodeRect) => {
	const zoomNode = document.getElementById(id)
	let naturalWidth, naturalHeight;
	if(zoom && zoomNode) {
		naturalWidth = zoomNode.naturalWidth
		naturalHeight = zoomNode.naturalHeight
	}
	return show ? {
		width: naturalWidth || 'initial',
		maxWidth: zoom ? naturalWidth || 'initial' : '90vw',
		height: naturalHeight || 'initial',
		maxHeight: zoom ? naturalHeight || 'initial' : '90vh',
		border: 0,
		borderRadius: 3,
		transform: `translateX(0) translateY(0)`
	} : {
		maxWidth: coverNodeRect.width,
		maxHeight: coverNodeRect.height,
		border: coverNodeRef && coverNodeRef.style.border || 0,
		borderRadius: coverNodeRef && coverNodeRef.style.borderRadius || 0,
		// 如果当前为第一页，则返回初始位置，否则向上隐藏
		transform: current === 0 ?
			`translateX(-50vw) translateX(50%) translateX(${coverNodeRect.left}px) translateY(-50vh) translateY(50%) translateY(${coverNodeRect.top}px)` :
			`translateY(-50vh) translateY(-50%)`
	}
}

// 背景遮罩样式
export const bgOverlayStyle = show => show ? {backgroundColor: 'white'} : {backgroundColor: 'transparent'}
