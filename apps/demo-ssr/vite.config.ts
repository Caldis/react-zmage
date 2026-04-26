import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __REACT_VERSION_REQUEST__: JSON.stringify(process.env.REACT_VERSION || '19'),
  },
  resolve: {
    preserveSymlinks: true,
  },
  ssr: {
    // 让 react-zmage (CJS) 走 vite 的 SSR 转换以正确处理 default export
    noExternal: ['react-zmage'],
  },
})
