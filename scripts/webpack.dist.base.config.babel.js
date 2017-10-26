// 基本库
import path from 'path'
import webpack from 'webpack'
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'

const config =  merge.smart(baseConfig, {
	output: {
		path: path.resolve(__dirname, '../dist'),
		library: 'react-zmage',
		libraryTarget: 'umd'
	},

	entry: {
		app: [
			// App Entry
			'./src/index.js'
		]
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
		})
	],

	externals: {
		'react'       : 'umd react',
		'react-dom'   : 'umd react-dom',
		'prop-types'  : 'umd prop-types',
	}
})

export default config