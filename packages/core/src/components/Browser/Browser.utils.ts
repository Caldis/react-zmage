// Libs
import { RefObject } from 'react'
// Utils
import { isInteger } from '../../utils'
import { Set } from '../../types/global'

/* 计算默认页面 */
export const pageDefault = (defaultPage: number, set: Set[]) => {
  return isInteger(defaultPage) && defaultPage < set.length - 1 ? defaultPage : set.length - 1
}
/* 检测当前页面是否为封面 */
// 仅靠 src 比较: 旧版本里有个 `page === 0 ||` 的硬编码短路, 假设第 0 页一定是 cover.
// 当消费者传 defaultPage > 0 (例如 hero 三图轮播, 各自 defaultPage=0/1/2) 后,
// 用户从 defaultPage 切回 page 0 时 cover.src ≠ set[0].src, 应该走 fly-out close 动画;
// 旧短路错误地返回 true 让它尝试回到 cover 位置, 表现为关闭时图片不飞走而是缩回原身位.
export const pageIsCover = (coverRef: RefObject<HTMLImageElement>, set: Set[], page: number) => {
  return coverRef?.current?.getAttribute('src') === set[page]?.src
}
/* 获取页面数据 */
export const pageSet = (coverRef: RefObject<HTMLImageElement>, defaultPage: number, set: Set[]) => {
  const page = pageDefault(defaultPage, set)
  return {
    page,
    pageIsCover: pageIsCover(coverRef, set, page),
  }
}

/* 显示/隐藏封面 */
export const showCover = (coverRef: RefObject<HTMLImageElement>) => {
  if (coverRef?.current) {
    coverRef.current.style.visibility = 'visible'
  }
}
export const hideCover = (coverRef: RefObject<HTMLImageElement>) => {
  // 隐藏太快会闪
  setTimeout(() => {
    if (coverRef?.current) {
      coverRef.current.style.visibility = 'hidden'
    }
  }, 100)
}
