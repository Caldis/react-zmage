import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const docsDir = path.resolve(__dirname, '../../docs')

/**
 * 通过 REACT_VERSION 环境变量切换 React 版本以做兼容性验证。
 * 默认 17 (与历史发布到 zmage.caldis.me 的版本对齐)。
 *
 * 实现思路:
 *   - 用 npm alias 在 dependencies 中并行安装三个版本 (react17 / react18 / react19)
 *   - 在 vite resolve.alias 里把裸 'react' / 'react-dom' 映射到对应的 alias 包
 *   - dedupe 防止子依赖各自拉一个 react 副本造成"两个 React"运行时报错
 */
const REACT_VERSION = (process.env.REACT_VERSION || '17') as '17' | '18' | '19'
const aliasMap: Record<'17' | '18' | '19', { react: string; reactDom: string }> = {
  '17': { react: 'react17', reactDom: 'react-dom17' },
  '18': { react: 'react18', reactDom: 'react-dom18' },
  '19': { react: 'react19', reactDom: 'react-dom19' },
}
const picked = aliasMap[REACT_VERSION]
if (!picked) {
  throw new Error(`Unsupported REACT_VERSION=${REACT_VERSION}; expected 17 | 18 | 19`)
}

/**
 * Virtual module 注入构建期常量到客户端代码.
 * 用 virtual: 前缀避免与真实文件冲突, vite 插件接管解析.
 *
 * 比 define 更可靠: vite define 在 @vitejs/plugin-react (Babel) 链路下不一定真正替换 / 注入全局,
 * virtual module 一定走 vite 自己的插件解析, 兼容所有 transform.
 */
const VIRTUAL_ID = 'virtual:zmage-context'
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID
const contextPlugin: Plugin = {
  name: 'inject-zmage-context',
  resolveId (id) {
    if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
  },
  load (id) {
    if (id !== RESOLVED_VIRTUAL_ID) return undefined
    const useCreateRoot = REACT_VERSION !== '17'
    // 关键: importReactDomClient 必须按版本生成不同代码体, 不能共用一份代码用 if 分支.
    // rollup/vite 在 module-graph-build 阶段必然尝试 resolve dynamic import 的 specifier,
    // 即使被 DCE 包裹也不豁免. R17 build 下若代码体里有 import('react-dom/client'),
    // alias 会把它指向不存在的 react-dom17/client, 触发 ENOENT.
    const importBody = useCreateRoot
      ? `() => import('react-dom/client')`
      : `() => Promise.reject(new Error('react-dom/client not available in React 17 build'))`
    return [
      `export const REACT_VERSION_REQUEST = ${JSON.stringify(REACT_VERSION)}`,
      `export const USE_CREATE_ROOT = ${JSON.stringify(useCreateRoot)}`,
      `export const importReactDomClient = ${importBody}`,
    ].join('\n')
  },
}

export default defineConfig(() => ({
  plugins: [react(), contextPlugin],
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PORT || 8080),
  },
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: docsDir,
    emptyOutDir: true,
  },
  preview: {
    host: process.env.HOST || '127.0.0.1',
    port: Number(process.env.PREVIEW_PORT || 4173),
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 用绝对路径指向 home 的 node_modules, 避免从 packages/core/dist/ 解析时找不到 react17 等别名包
      'react': path.resolve(__dirname, 'node_modules', picked.react),
      'react-dom': path.resolve(__dirname, 'node_modules', picked.reactDom),
      'react-dom/client': path.resolve(__dirname, 'node_modules', picked.reactDom, 'client'),
    },
    dedupe: ['react', 'react-dom'],
  },
}))
