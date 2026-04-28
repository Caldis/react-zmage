import '@testing-library/jest-dom'

// jsdom doesn't apply real CSS rules, so the stylesheet-loaded sentinel
// (declared in Background.module.less :root) is absent in tests. Simulate
// "consumer correctly imported react-zmage/style.css" so styleProbe stays silent.
document.documentElement.style.setProperty('--rz-stylesheet-loaded', '1')
