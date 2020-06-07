// Libs
const path = require('path')
const webpack = require('webpack')
// Merges
const merge = require('webpack-merge'
const baseConfig = require('./webpack.base.config.js')
const nodeExternals = require('webpack-node-externals')

module.exports = (options) => merge.smart(baseConfig(options), {

	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, '../lib'),
		library: 'react-zmage',
		libraryTarget: 'commonjs2'
	},

	plugins: [
		// 作用域提升
		new webpack.optimize.ModuleConcatenationPlugin()
	],

    externals: [nodeExternals()]
})
