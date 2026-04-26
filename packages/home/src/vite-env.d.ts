/// <reference types="vite/client" />

declare module '*.module.less' {
  const classes: Record<string, string>
  export default classes
}

// Vite virtual module — 由 vite.config.ts 的 inject-zmage-context 插件注入
declare module 'virtual:zmage-context' {
  export const REACT_VERSION_REQUEST: '17' | '18' | '19'
  export const USE_CREATE_ROOT: boolean
  export const importReactDomClient: () => Promise<typeof import('react-dom/client')>
}
