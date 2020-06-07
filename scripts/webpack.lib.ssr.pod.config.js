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

    mode: "production",

    output: {
        // 从 output.path (lib) 目录开始查找
        filename: '../ssr/zmage.ssr.production.min.js',
    },

    plugins: [
        // 样式文件分离
        // 从 output.path (lib) 目录开始查找
        new MiniCssExtractPlugin({ filename:'../ssr/style.css' }),
        // 复制类型文件
        // from 从项目根目录开始查找
        // to 从 from 目录开始查找
        new CopyPlugin([
            { from: 'typings/index.d.ts', to: '../ssr/index.d.ts' }
        ]),
    ],

    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})
