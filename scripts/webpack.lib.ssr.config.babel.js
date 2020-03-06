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

    mode: "production",

    output: {
        // 从 output.path (lib) 目录开始查找
        filename: '../ssr/zmage.production.ssr.js',
    },

    plugins: [
        // 样式文件分离
        // 从 output.path (lib) 目录开始查找
        new MiniCssExtractPlugin({ filename:'../ssr/style.css' }),
        // 复制类型文件
        // from 从项目根目录开始查找
        // to 从 from 目录开始查找
        new CopyPlugin([
            { from: 'lib/index.d.ts', to: '../ssr/index.d.ts' }
        ]),
    ],

    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})

export default config
