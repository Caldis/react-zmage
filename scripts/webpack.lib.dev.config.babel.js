/**
 * 输出 zmage.development.js 文件
 **/

// Libs
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.lib.base.config.babel.js'

const config =  merge.smart(baseConfig, {

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