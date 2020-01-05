/**
 * 输出 zmage.development.js 文件
 **/

// Libs
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import libBaseConfig from './webpack.lib.base.config.babel.js'
// Plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config = merge.smart(libBaseConfig(), {

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

export default config
