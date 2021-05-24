// Libs
const path = require('path')
// Merges
const { merge } = require('webpack-merge')
// Configs
const baseConfig = require('./webpack.base.config.js')

module.exports = () => merge(baseConfig({ extractStyle: true }), {

  entry: './src/index',

  mode: 'production',

  output: {
    filename: 'zmage.js',
    path: path.resolve(__dirname, '../lib'),
    library: 'react-zmage',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
})
