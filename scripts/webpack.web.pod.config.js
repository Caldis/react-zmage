/**
 * 用于输出 riz.production.min.js 文件
 **/

// Libs
const path = require('path')
// Merges
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
// Plugins
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = merge(baseConfig(), {

  entry: './docs/hmr',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
  },

  plugins: [
    new ModuleConcatenationPlugin(),
  ],

})
