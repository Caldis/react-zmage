/**
 * 用于输出 zmage.development.js 文件
 **/

// Merges
import merge from 'webpack-merge'
import baseConfig from './webpack.lib.base.config.babel.js'

const config =  merge.smart(baseConfig, {

    mode: "development",

    output: {
        filename: 'zmage.development.js',
    },

})

export default config