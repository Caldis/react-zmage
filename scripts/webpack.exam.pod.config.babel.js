/**
 * 用于输出 riz.production.min.js 文件
 **/

// 基本库
import path from 'path'
import webpack from 'webpack'
import UglifyJsPlugin  from 'uglifyjs-webpack-plugin'
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'

const config =  merge.smart(baseConfig, {

	entry: {
		app: [
			// App Entry
			'./docs/hmr.js'
		]
	},

    output: {
	    path: path.resolve(__dirname, '../docs'),
        filename: 'bundle.js',
    },

	performance: {
		hints: false
	},

	plugins: [
		// 启用范围提升 (webpack3, 避免在 dev 中使用! 会造成更新性能问题, 且导致热更新出错)
		new webpack.optimize.ModuleConcatenationPlugin(),
		// 设置环境变量
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		// 代码压缩
		new UglifyJsPlugin({
			sourceMap: false,
		}),
		// Loader压缩
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	],
})

export default config