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
import TerserJSPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const config = merge.smart(libBaseConfig({ ssr:true }), {

    mode: "production",

    output: {
        filename: 'zmage.production.ssr.js',
    },

    plugins: [
        // 样式文件分离
        new MiniCssExtractPlugin({ filename:'zmage.production.ssr.css' }),
    ],

    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})

export default config
