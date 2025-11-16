import autoprefixer from 'autoprefixer'
import { type Plugin } from 'esbuild'
import { readFile } from 'fs/promises'
import less from 'less'
import path from 'path'
import postcss from 'postcss'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig, type Options } from 'tsup'

const lessModulePlugin = (): Plugin => ({
  name: 'less-module-plugin',
  setup (build) {
    build.onResolve({ filter: /\.less$/ }, args => ({
      path: path.resolve(args.resolveDir, args.path),
    }))

    build.onLoad({ filter: /\.less$/ }, async (args) => {
      const source = await readFile(args.path, 'utf8')
      const rendered = await less.render(source, {
        filename: args.path,
        javascriptEnabled: true,
      })
      const processed = await postcss([
        postcssPresetEnv({ stage: 3 }),
        autoprefixer(),
      ]).process(rendered.css, { from: args.path })

      return {
        contents: processed.css,
        loader: 'css',
        resolveDir: path.dirname(args.path),
      }
    })
  },
})

const baseConfig: Options = {
  entry: ['src/index.ts'],
  sourcemap: true,
  splitting: false,
  target: 'es2019',
  treeshake: true,
  env: {
    NODE_ENV: 'production',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  minify: false,
  external: ['react', 'react-dom'],
  esbuildPlugins: [lessModulePlugin()],
}

export default defineConfig(() => ([
  {
    ...baseConfig,
    format: ['esm', 'cjs', 'iife'],
    outDir: 'dist',
    dts: true,
    clean: true,
    platform: 'browser',
    css: true,
    globalName: 'ReactZmage',
    outExtension ({ format }) {
      if (format === 'cjs') return { js: '.cjs' }
      if (format === 'esm') return { js: '.mjs' }
      return { js: '.global.js' }
    },
  },
  {
    ...baseConfig,
    format: ['esm', 'cjs'],
    outDir: 'dist/ssr',
    dts: false,
    clean: false,
    platform: 'neutral',
    css: true,
    outExtension ({ format }) {
      if (format === 'cjs') return { js: '.cjs' }
      return { js: '.mjs' }
    },
  },
]))
