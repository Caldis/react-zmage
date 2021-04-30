/**
 * 输出 zmage.development.js 文件
 **/

// Merges
const { merge } = require('webpack-merge')
const libBaseConfig = require('./webpack.lib.base.config.js')

module.exports = merge(libBaseConfig(), {

  mode: 'development',

  output: {
    filename: 'zmage.development.js',
  },

  // Fix mode=development side-effect
  devtool: false,
  optimization: {
    usedExports: true,
  },
})
