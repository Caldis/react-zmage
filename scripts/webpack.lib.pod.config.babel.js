/**
 * 用于输出 riz.production.min.js 文件
 **/

// 基本库
import webpack from 'webpack'
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.lib.base.config.babel.js'

const config =  merge.smart(baseConfig, {
    output: {
        filename: 'zmage.production.min.js',
    },

	plugins: [
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			}
		}),
		// Loader压缩
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
})

export default config