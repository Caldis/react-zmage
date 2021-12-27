// Libs
const path = require('path')
// Merges
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8080

module.exports = merge(baseConfig(), {

  entry: './docs/hmr.tsx',

  mode: 'development',

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  devServer: {
    open: true,
    host,
    port,
    devMiddleware: {
      stats: 'errors-only',
    },
    static: {
      directory: './docs',
    },
    historyApiFallback: true,
  },
})
