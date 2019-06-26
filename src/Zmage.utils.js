/* 转换 set 参数 */
export const convertSet = ({ set, src, alt, txt }={}) => {
    return (Array.isArray(set) && set.length>0) ? set : [{ src, alt, txt }]
}