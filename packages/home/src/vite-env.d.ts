/// <reference types="vite/client" />

declare module '*.module.less' {
  const classes: Record<string, string>
  export default classes
}
