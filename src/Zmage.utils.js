/* 转换 set 参数 */
export const normalizationSet = ({ set, src, alt, txt, restProps }={}) => {
    return (Array.isArray(set) && set.length>0) ? set : [{ src, alt, txt, ...restProps }]
}
