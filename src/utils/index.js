/**
 * 工具函数
 **/

// 随机字符串
export const generateUUID = () => {
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c==="x" ? r : (r&0x7|0x8)).toString(16);
	});
};

// 通过屏幕尺寸以及图片尺寸，计算出图片能在屏幕中完整显示的缩放比例
export const calcFitScale = (nodeRef, margin) => {
	const cw = clientWidth(), ch = clientHeight()
	const nw = nodeRef.naturalWidth+4*margin, nh = nodeRef.naturalHeight+4*margin
	const windowRatio = cw/ch, naturalRatio = nw/nh
	if (nw>=cw && nh>=ch) {
		return windowRatio>naturalRatio ? ch/nh : cw/nw
	} else if (nw>=cw && nh<=ch) {
		return cw/nw
	} else if (nw<=cw && nh>=ch) {
		return ch/nh
	} else if (nw<=cw && nh<=ch) {
		return 1
	}
}

// 事件绑定
export const addListenEventOf = (event, handler) => {
	window.addEventListener(event, handler, true)
}
export const removeListenEventOf = (event, handler) => {
	window.removeEventListener(event, handler, true)
}

// 屏幕尺寸
export const windowWidth = () => window.innerWidth
export const clientWidth = () => document.documentElement.clientWidth
export const windowHeight = () => window.innerHeight
export const clientHeight = () => document.documentElement.clientHeight