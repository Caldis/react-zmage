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
import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const config = merge.smart(libBaseConfig({ ssr:true }), {

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

export default config
