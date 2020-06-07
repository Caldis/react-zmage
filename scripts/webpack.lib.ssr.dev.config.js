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
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge.smart(libBaseConfig({ extractStyle:true }), {

    mode: "development",

    output: {
        // 从 output.path (lib) 目录开始查找
        filename: '../ssr/zmage.ssr.development.js',
    },

    plugins: [
        // 样式文件分离
        // 从 output.path (lib) 目录开始查找
        new MiniCssExtractPlugin({ filename:'../ssr/style.map.css' })
    ],

    // 修复 mode: "development" 带来的副作用
    devtool: false,
    optimization: {
        usedExports: true,
    },
})
