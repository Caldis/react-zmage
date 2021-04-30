// Libs
const path = require('path')
// Merges
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

module.exports = (options) => merge(baseConfig(options), {

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, '../lib'),
    library: 'react-zmage',
    libraryTarget: 'commonjs2',
  },

})
