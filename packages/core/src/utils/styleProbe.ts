// Dev-only probe: warns when consumer forgot `import 'react-zmage/style.css'`.
// Reads a CSS custom property declared in Background.module.less on :root.
// Production-stripped: tsup defines NODE_ENV='production', dead-code-eliminated.

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
