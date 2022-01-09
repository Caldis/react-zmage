// Libs
const path = require('path')
// Merges
const { merge } = require('webpack-merge')
// Configs
const baseConfig = require('./webpack.base.config.js')

// FLAGS
const BUILD_MODE = process.env.BUILD_MODE || '' // SSR
const isBuildModeSSR = BUILD_MODE.toLowerCase() === 'ssr'
const base = isBuildModeSSR
  ? baseConfig()
  : baseConfig({ extractStyle: isBuildModeSSR })
const output = isBuildModeSSR ? {
  filename: 'index.js',
  path: path.resolve(__dirname, '../ssr'),
  library: {
    name: 'react-zmage',
    type: 'umd',
    umdNamedDefine: true,
  },
} : {
  filename: 'index.js',
  path: path.resolve(__dirname, '../lib'),
  library: {
    name: 'react-zmage',
    type: 'umd',
    umdNamedDefine: true,
  },
}

module.exports = () => merge(base, {

  entry: './src/index',

  mode: 'production',

  output,

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
    },
  },
})
