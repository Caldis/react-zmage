// Libs
import { RefObject } from 'react'
// Utils
import { isInteger } from '@/utils'
import { SetType } from '@/types/global'

/* 计算默认页面 */
export const pageDefault = (defaultPage: number, set: SetType[]) => {
  return isInteger(defaultPage) && defaultPage < set.length - 1 ? defaultPage : set.length - 1
}
/* 检测当前页面是否为封面 */
export const pageIsCover = (coverRef: RefObject<HTMLImageElement>, set: SetType[], page: number) => {
  return page === 0 || coverRef?.current?.getAttribute('src') === set[page].src
}
/* 获取页面数据 */
export const pageSet = (coverRef: RefObject<HTMLImageElement>, defaultPage: number, set: SetType[]) => {
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
