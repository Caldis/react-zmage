// Libs
const os = require('os')
const path = require('path')
const webpack = require('webpack')
// Merges
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
// Plugins
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080

module.exports = merge.smart(baseConfig(), {

    entry: './docs/hmr.tsx',

    mode: "development",

	devtool: "source-map",

	output: {
		path: path.resolve(__dirname, '../docs'),
		filename: 'bundle.js'
	},

	module:{
    	rules: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
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
