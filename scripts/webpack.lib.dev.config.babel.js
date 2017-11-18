/**
 * 用于输出 zmage.development.js 文件
 **/

// 基本库
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.lib.base.config.babel.js'

const config =  merge.smart(baseConfig, {
    output: {
        filename: 'zmage.development.js',
    },

	plugins: [
		// 输出包文件分析图
		new BundleAnalyzerPlugin()
	]
})

export default config