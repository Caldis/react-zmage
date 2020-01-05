// Libs
import path from 'path'
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'
import nodeExternals from 'webpack-node-externals'

export default (options) => merge.smart(baseConfig(options), {

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
