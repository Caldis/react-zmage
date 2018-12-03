/**
 * 用于输出 riz.production.min.js 文件
 **/

// Libs
import path from 'path'
import webpack from 'webpack'
// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config.babel.js'

const config =  merge.smart(baseConfig, {

    entry: './docs/hmr.js',

    mode: "production",

    output: {
	    path: path.resolve(__dirname, '../docs'),
        filename: 'bundle.js',
    },

	plugins: [
        // 作用域提升
        new webpack.optimize.ModuleConcatenationPlugin()
	],

})

export default config