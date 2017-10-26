// 基本库
import path from 'path'
import webpack from 'webpack'
// 从基础设置继承
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'
// 本地服务器配置
import { host, port } from './webpack.base.config.babel'
// 系统
import os from 'os'
// 自动打开浏览器
import OpenBrowserPlugin from 'open-browser-webpack-plugin'

export default merge.smart(baseConfig, {
	devtool: 'inline-source-map',

	entry: [
		// activate HMR for React
		'react-hot-loader/patch',
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint
		`webpack-dev-server/client?http://${host}:${port}`,
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates
		'webpack/hot/only-dev-server',
		// App Entry
		'./docs/hmr.js'
	],

	output: {
		path: path.resolve(__dirname, '../docs'),
		filename: 'bundle.js'
	},

	plugins: [
		// 设置环境变量
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		}),
		// 启用热更新
		new webpack.HotModuleReplacementPlugin(),
		// 自动打开浏览器 (非Mac下)
        new OpenBrowserPlugin({
			url: `http://${host}:${port}`,
			browser: os.platform()==='darwin' ? undefined : 'Chrome'
		})
	],

	devServer: {
		hot: true,
		host: host,
		port: port,
		stats: 'errors-only',
		contentBase: './docs',
		historyApiFallback: true
	}
})