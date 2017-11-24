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

	const innerWidth = window.innerWidth, innerHeight = window.innerHeight
	const naturalWidth = nodeRef.naturalWidth+margin, naturalHeight = nodeRef.naturalHeight+margin

	const windowRatio = innerWidth/innerHeight, naturalRatio = naturalWidth/naturalHeight

	if (naturalWidth>=innerWidth && naturalHeight>=innerHeight) {
		return windowRatio>naturalRatio ? innerHeight/naturalHeight : innerWidth/naturalWidth
	} else if (naturalWidth>=innerWidth && naturalHeight<=innerHeight) {
		return innerWidth/naturalWidth
	} else if (naturalWidth<=innerWidth && naturalHeight>=innerHeight) {
		return innerHeight/naturalHeight
	} else if (naturalWidth<=innerWidth && naturalHeight<=innerHeight) {
		return 1
	}
}