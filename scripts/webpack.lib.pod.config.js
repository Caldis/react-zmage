/**
 * 输出 zmage.production.min.js 文件
 **/

// Libs
const webpack = require('webpack')
// Merges
const merge = require('webpack-merge')
const libBaseConfig = require('./webpack.lib.base.config.js')
// Plugins
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = merge.smart(libBaseConfig(), {

    mode: "production",

    output: {
        filename: 'zmage.production.min.js',
    },

    plugins: [
        // 输出包文件分析图
        // new BundleAnalyzerPlugin(),
        // 复制类型文件
        // from 从项目根目录开始查找
        // to 从 from 目录开始查找
        new CopyPlugin([
            { from: 'typings/index.d.ts', to: '../lib/index.d.ts' }
        ]),
    ],
})
