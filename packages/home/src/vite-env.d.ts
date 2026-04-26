/// <reference types="vite/client" />

declare module '*.module.less' {
  const classes: Record<string, string>
  export default classes
}

// Vite define 注入: 当前 demo 请求的 React 主版本 (来自 REACT_VERSION env)
declare const __REACT_VERSION_REQUEST__: string
