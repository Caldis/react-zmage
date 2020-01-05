/**
 * 输出 zmage.production.min.js 文件
 **/

// Libs
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import libBaseConfig from './webpack.lib.base.config.babel.js'
// Plugins
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const config = merge.smart(libBaseConfig(), {

    mode: "production",

    output: {
        filename: 'zmage.production.min.js',
    },

    plugins: [
        // 输出包文件分析图
        new BundleAnalyzerPlugin(),
    ],
})

export default config
