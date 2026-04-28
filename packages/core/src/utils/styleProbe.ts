// Dev-only probe: warns when consumer forgot `import 'react-zmage/style.css'`.
// Reads a CSS custom property declared in Background.module.less on :root.
// Production-stripped: tsup defines NODE_ENV='production', dead-code-eliminated.

// 局部声明 process 仅为 TS 编译期识别; 运行时 tsup 的 `define` 会把整段
// `process.env.NODE_ENV === 'production'` 静态替换成字面布尔, 不依赖任何 @types/node.
declare const process: { env: { NODE_ENV?: string } }

let probed = false

export function probeStylesheet () {
  if (probed) return
  probed = true
  if (process.env.NODE_ENV === 'production') return
  if (typeof document === 'undefined') return
  const loaded = getComputedStyle(document.documentElement)
    .getPropertyValue('--rz-stylesheet-loaded')
    .trim()
  if (loaded !== '1') {
    console.error(
      '[react-zmage] Stylesheet not loaded. Add `import "react-zmage/style.css"` in your entry file.'
    )
  }
}
