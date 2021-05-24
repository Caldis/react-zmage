// libs
const path = require('path')
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 基础配置集
module.exports = ({ extractStyle = false } = {}) => ({

  plugins: [new MiniCssExtractPlugin({
    filename: 'zmage.css',
  })],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve('src'),
    },
    modules: [
      path.resolve('src'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      // JS
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // TS
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // Style
      {
        // CSS
        test: /^((?!\.global).)*\.css$/,
        exclude: /node_modules/,
        use: styleProcessor('css', { extractStyle }),
      },
      {
        // LESS
        test: /^((?!\.global).)*\.less$/,
        exclude: /node_modules/,
        use: styleProcessor('less', { extractStyle }),
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // 小于此值转为 base64
            mimetype: 'image/svg+xml',
          },
        },
      },
      // Web Font
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader',
      },
      // Common ImageOverlay Formats
      {
        test: /\.(ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
      // Common Media Formats
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: 'url-loader',
      },
    ],
  },
})

// 生成对应的样式参数配置
function styleProcessor (type = 'css', { extractStyle = false } = {}) {
  // 各类型 Style 的 Loader 配置项
  let styleLoader = {
    loader: 'style-loader',
  }
  if (extractStyle) {
    styleLoader = MiniCssExtractPlugin.loader
  }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[local]__[hash:base64:5]',
      },
    },
  }
  const lessLoader = {
    loader: 'less-loader',
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer'],
      },
    },
  }

  // 根据传入的配置返回不同的组合
  if (type === 'css') {
    return [styleLoader, cssLoader, postcssLoader]
  }
  if (type === 'less') {
    return [styleLoader, cssLoader, postcssLoader, lessLoader]
  }
}
