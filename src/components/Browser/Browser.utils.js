// Utils
import { isInteger } from "@/utils";

/* 计算默认页面 */
export const pageDefault = (defaultPage, set) => {
    return isInteger(defaultPage) && defaultPage<set.length-1 ? defaultPage : set.length-1
}
/* 检测当前页面是否为封面 */
export const pageIsCover = (coverRef, set, page) => {
    return (page===0) || (coverRef && coverRef.current && coverRef.current.getAttribute("src")===set[page].src)
}
/* 获取页面数据 */
export const pageSet = (coverRef, defaultPage, set) => {
    const page = pageDefault(defaultPage, set)
    return {
        page,
        pageIsCover: pageIsCover(coverRef, set, page),
    }
}


/* 显示/隐藏封面 */
export const showCover = (coverRef) => {
    if(coverRef.current) {
        coverRef && coverRef.current && (coverRef.current.style.visibility = 'visible')
    }
}
export const hideCover = (coverRef) => {
    if(coverRef.current) {
        coverRef && coverRef.current && (coverRef.current.style.visibility = 'hidden')
    }
}
