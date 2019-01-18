// Libs
import os from 'os'
import path from 'path'
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'
// Config
import { host, port } from './webpack.base.config.babel'
// Plugins
import OpenBrowserPlugin from 'open-browser-webpack-plugin'

export default merge.smart(baseConfig, {

    entry: './docs/hmr.js',

    mode: "development",

    devtool: 'inline-source-map',

	output: {
		path: path.resolve(__dirname, '../docs'),
		filename: 'bundle.js'
	},

	plugins: [
	  // 自动打开浏览器
    new OpenBrowserPlugin({
			url: `http://${host}:${port}`,
		})
	],

	devServer: {
		host: host,
		port: port,
		stats: 'errors-only',
		contentBase: './docs',
		historyApiFallback: true
	}
})