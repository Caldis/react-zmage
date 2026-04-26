'use client'

/**
 * Client component 包装层 — RSC 边界
 * Zmage 用了 useState / refs / browser-only APIs, 必须在 client 组件里使用
 * 此处验证: (1) 'use client' + 'react-zmage/ssr' 入口配合无 build error
 *           (2) Next.js bundler 能解析 ssr 子路径
 *           (3) RSC 编译期不会因 react-zmage 模块加载触发浏览器 API 而崩溃
 */
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
import type { BaseType } from 'react-zmage'

export function ClientZmage(props: BaseType) {
  return <Zmage {...props} />
}
