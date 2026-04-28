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

// 浏览/关闭动画的实际时长 — mobile preset 用 2 倍时长以匹配触摸交互的视觉节奏.
// Browser.unInit 的 closeDelay 也以此为基准 (再减 10ms 为 React state 同步留缓冲).
// Image.startClosingFollow 用它驱动 RAF.
export const getBrowsingAnimationDuration = (presetIsDesktop: boolean) =>
  presetIsDesktop ? animationDuration : animationDuration * 2

export const animationTransition = (multiple = 1) => `transform ${animationDuration * multiple}ms ${animationFunction}, opacity ${animationDuration * multiple}ms ${animationFunction}, clip-path ${animationDuration * multiple}ms ${animationFunction}`

