// 基本库
import path from 'path'
import webpack from 'webpack'
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'
import nodeExternals from 'webpack-node-externals'

const config =  merge.smart(baseConfig, {

	entry: {
		app: [
			// App Entry
			'./src/index.js'
		]
	},

	output: {
		path: path.resolve(__dirname, '../lib'),
		library: 'react-zmage',
		libraryTarget: 'commonjs2'
	},

    performance: {
		hints: false
	},

	plugins: [
		// 启用范围提升
		new webpack.optimize.ModuleConcatenationPlugin(),
		// 设置环境变量
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	],

	externals: [nodeExternals()]
})

export default config