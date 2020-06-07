/**
 * 输出 zmage.development.js 文件
 **/

// Libs
const webpack = require('webpack')
// Merges
const merge = require('webpack-merge')
const libBaseConfig = require('./webpack.lib.base.config.js')
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge.smart(libBaseConfig(), {

    mode: "development",

    output: {
        filename: 'zmage.development.js',
    },

    // 修复 mode: "development" 带来的副作用
    devtool: false,
    optimization: {
        usedExports: true,
    },
})
