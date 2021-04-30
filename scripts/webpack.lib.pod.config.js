/**
 * 输出 zmage.production.min.js 文件
 **/

// Merges
const { merge } = require('webpack-merge')
const libBaseConfig = require('./webpack.lib.base.config.js')
// Plugins
const CopyPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

module.exports = merge(libBaseConfig(), {

  mode: 'production',

  output: {
    filename: 'zmage.production.min.js',
  },

  plugins: [
    new ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'typings/index.d.ts',
          to: '../lib/index.d.ts',
        },
      ],
    }),
  ],
})
