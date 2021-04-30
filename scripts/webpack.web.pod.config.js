/**
 * 用于输出 riz.production.min.js 文件
 **/

// Libs
const path = require('path')
const webpack = require('webpack')
// Merges
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig(), {

  entry: './docs/hmr.js',

  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
  },

  plugins: [
    // 作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

})
