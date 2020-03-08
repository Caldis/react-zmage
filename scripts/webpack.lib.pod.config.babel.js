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
import CopyPlugin from "copy-webpack-plugin"

const config = merge.smart(libBaseConfig(), {

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

export default config
