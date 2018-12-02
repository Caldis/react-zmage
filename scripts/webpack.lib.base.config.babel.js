// Libs
import path from 'path'
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'
import nodeExternals from 'webpack-node-externals'

const config =  merge.smart(baseConfig, {

	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, '../lib'),
		library: 'react-zmage',
		libraryTarget: 'umd'
	},

    performance: {
		hints: false
	},

	plugins: [
		// 作用域提升
		new webpack.optimize.ModuleConcatenationPlugin()
	],

    externals: {
        'prop-types'             : 'prop-types',
        'react'                  : 'react',
        'react-dom'              : 'react-dom',
        'react-hot-loader'       : 'react-hot-loader',
    }
})

export default config