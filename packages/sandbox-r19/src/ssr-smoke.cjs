/**
 * SSR runtime smoke — 在真实 Node.js 环境用 renderToString 渲染 react-zmage
 * 验证: (1) 模块加载阶段无浏览器全局访问 (2) 渲染输出包含封面 <img>
 * 不验证: 视觉、动画、交互 (那些需要浏览器 e2e)
 *
 * 使用 CJS 而非 ESM, 因为 React 17 的 react-dom 没有 exports 字段, Node ESM 解析失败
 * R18/19 都向后兼容 require, 故所有 sandbox 共用同一份脚本
 */
const { createElement } = require('react')
const { renderToString } = require('react-dom/server')
// tsup CJS 产物用 `module.exports = X` 直接赋值, 不是 .default
const Zmage = require('react-zmage')
const ZmageSSR = require('react-zmage/ssr')

const cases = [
  { label: 'main entry (react-zmage)', Component: Zmage },
  { label: 'ssr  entry (react-zmage/ssr)', Component: ZmageSSR },
]

let failed = 0
for (const { label, Component } of cases) {
  try {
    const html = renderToString(
      createElement(Component, { src: '/test.jpg', alt: 't' })
    )
    if (!html.includes('<img')) {
      console.error(`FAIL [${label}]: SSR output missing <img>`)
      console.error('  Got:', html)
      failed++
    } else {
      console.log(`OK   [${label}]: ${html.length} bytes`)
    }
  } catch (e) {
    console.error(`FAIL [${label}]: threw at render time`)
    console.error(e)
    failed++
  }
}

if (failed > 0) {
  console.error(`\n${failed} SSR smoke case(s) failed`)
  process.exit(1)
}
console.log('\nAll SSR smoke cases passed')
