/* 与 anim.less 同步 */

// 动画参数 (正常)
// 曲线参数以数组形式存为单一来源, 字符串和 RAF 内的 cubic-bezier 求解器都从这里 derive,
// 避免改动 cubic-bezier 时 .ts/.less/RAF easing 三处脱钩.
export const animationCurve = [0.60, 0.0, 0.10, 1.0] as const
export const animationFunction = `cubic-bezier(${animationCurve.join(', ')})`
export const animationDuration = 350
// 动画参数 (放大查看时)
export const animationFunctionOnZooming = 'cubic-bezier(0, 0.1, 0.1, 1)'
export const animationDurationOnZooming = 0

// 浏览/关闭动画的实际时长。保留 preset 参数是为了让 Browser/Image 两处调用共享同一入口,
// 但 mobile 与 desktop 都必须沿用原始 browsing timing, 避免关闭卸载和图片归位不同步。
export const getBrowsingAnimationDuration = (_presetIsDesktop: boolean, multiple = 1) => animationDuration * multiple

export const animationTransition = (multiple = 1) => `transform ${animationDuration * multiple}ms ${animationFunction}, opacity ${animationDuration * multiple}ms ${animationFunction}, clip-path ${animationDuration * multiple}ms ${animationFunction}`

