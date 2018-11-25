/**
 * 用于输出 riz.production.min.js 文件
 **/

// Libs
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.lib.base.config.babel.js'
// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BrotliPlugin = require('brotli-webpack-plugin');

const config =  merge.smart(baseConfig, {

    mode: "production",

    output: {
        filename: 'zmage.production.min.js',
    },

    plugins: [
        // 输出包文件分析图
        new BundleAnalyzerPlugin(),
    ]

})

export default config