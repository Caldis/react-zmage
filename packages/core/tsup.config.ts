import autoprefixer from 'autoprefixer'
import { type Plugin } from 'esbuild'
import { readFile } from 'fs/promises'
import less from 'less'
import path from 'path'
import postcss from 'postcss'
import postcssModules from 'postcss-modules'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig, type Options } from 'tsup'

const lessModulePlugin = (): Plugin => {
  const cssContents = new Map<string, string>()
  const compileLess = async (filePath: string, { modules }: { modules: boolean }) => {
    const source = await readFile(filePath, 'utf8')
    const rendered = await less.render(source, {
      filename: filePath,
      javascriptEnabled: true,
    })
    const plugins = [postcssPresetEnv({ stage: 3 }), autoprefixer()]
    let tokens: Record<string, string> = {}
    if (modules) {
      plugins.push(postcssModules({
        generateScopedName: '[local]__[hash:base64:5]',
        getJSON: (_filename, json) => {
          tokens = json as Record<string, string>
        },
      }))
    }
    const processed = await postcss(plugins).process(rendered.css, { from: filePath })
    return { css: processed.css, tokens }
  }

  return {
    name: 'less-module-plugin',
    setup (build) {
      build.onResolve({ filter: /\.module\.less$/ }, args => ({
        path: path.resolve(args.resolveDir, args.path),
        namespace: 'less-module',
      }))

      build.onResolve({ filter: /\.less$/ }, args => {
        if (args.path.endsWith('.module.less')) return undefined
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace: 'less-global',
        }
      })

      build.onResolve({ filter: /\.less\?css$/ }, args => ({
        path: args.path.replace('?css', ''),
        namespace: 'less-css',
      }))

      build.onLoad({ filter: /.*/, namespace: 'less-css' }, (args) => ({
        contents: cssContents.get(args.path) ?? '',
        loader: 'css',
        resolveDir: path.dirname(args.path),
      }))

      build.onLoad({ filter: /.*/, namespace: 'less-global' }, async (args) => {
        const { css } = await compileLess(args.path, { modules: false })
        return {
          contents: css,
          loader: 'css',
          resolveDir: path.dirname(args.path),
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'less-module' }, async (args) => {
        const { css, tokens } = await compileLess(args.path, { modules: true })
        cssContents.set(args.path, css)
        return {
          contents: `import ${JSON.stringify(args.path + '?css')};\nexport default ${JSON.stringify(tokens)};`,
          loader: 'js',
          resolveDir: path.dirname(args.path),
        }
      })
    },
  }
}

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
  external: ['react', 'react-dom', 'react-dom/client'],
  esbuildPlugins: [lessModulePlugin()],
}

// Dropped IIFE / global bundle (`format: ['…', 'iife']` + `globalName`):
// React itself no longer ships UMD/IIFE, so a React component lib has no realistic
// `<script src="…">` consumer. The IIFE bundle was 60% of the npm tarball.
//
// SSR config sets `css: false` because the SSR JS doesn't need its own CSS file —
// the documented stylesheet path is `react-zmage/style.css` which `exports` maps
// to `dist/index.css`. `dist/ssr/index.css` was a byte-identical duplicate with no
// `exports` outlet → dead weight, removed.
export default defineConfig(() => ([
  {
    ...baseConfig,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: false,
    clean: true,
    platform: 'browser',
    css: true,
    outExtension ({ format }) {
      return { js: format === 'cjs' ? '.cjs' : '.mjs' }
    },
  },
  {
    ...baseConfig,
    format: ['esm', 'cjs'],
    outDir: 'dist/ssr',
    dts: false,
    clean: false,
    platform: 'neutral',
    // `css: false` here is a no-op (the lessModulePlugin emits CSS regardless);
    // the duplicate `dist/ssr/index.css` is removed by scripts/postbuild-cleanup.mjs.
    css: true,
    outExtension ({ format }) {
      return { js: format === 'cjs' ? '.cjs' : '.mjs' }
    },
  },
]))
