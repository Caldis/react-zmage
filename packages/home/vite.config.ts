import { defineConfig } from 'vite'
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

export default defineConfig(() => ({
  plugins: [react()],
  define: {
    // 注入运行时常量供 main.tsx / ContextBanner 读取, 显式而非靠 React.version 推断
    __REACT_VERSION_REQUEST__: JSON.stringify(REACT_VERSION),
  },
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
      'react': picked.react,
      'react-dom': picked.reactDom,
      // 'react-dom/client' 仅在 R18+ 有 — vite 会沿着 react-dom 的 alias 解析子路径
      'react-dom/client': `${picked.reactDom}/client`,
    },
    dedupe: ['react', 'react-dom'],
  },
}))
