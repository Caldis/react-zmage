// libs
import path from 'path'
import webpack from 'webpack'
// Config
export const host = process.env.HOST || '127.0.0.1'
export const port = process.env.PORT || 8080
// Plugins
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

// Env
const isDev = process.env.NODE_ENV !== 'production';

// 基础配置集
export default ({ ssr=false }={}) => ({

	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': path.resolve('src')
		},
		modules: [
            path.resolve('src'),
			'node_modules',
		],
	},

	plugins: [
		// postcss配置
        new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
	],

	module: {
		rules: [
			// JS
			{
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}
				]
			},
			// Style
			{
				// *.global 后缀的所有 css 文件
				test: /\.global\.css$/,
				exclude: /node_modules/,
				use: styleProcessor('css', { ssr, modules:false })
			},
			{
				// *.global 后缀的所有 less 文件
				test: /\.global\.less$/,
				exclude: /node_modules/,
				use: styleProcessor('less', { ssr, modules:false })
			},
			{
				// 非 *.global 的 css 文件
				test: /^((?!\.global).)*\.css$/,
				exclude: /node_modules/,
				use: styleProcessor('css', { ssr, modules:true })
			},
			{
				// 非 *.global 的 less 文件
				test: /^((?!\.global).)*\.less$/,
				exclude: /node_modules/,
				use: styleProcessor('less', { ssr, modules:true })
			},
			{
				// node_modules 内的所有 css 文件
				test: /\.css$/,
				include: /node_modules/,
				use: styleProcessor('css', { ssr, modules:false })
			},
			{
				// node_modules 内的所有 less 文件
				test: /\.less/,
				include: /node_modules/,
				use: styleProcessor('less', { ssr, modules:false })
			},
			// SVG Font
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000, // 小于此值转为 base64
						mimetype: 'image/svg+xml',
					}
				}
			},
			// Web Font
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: 'url-loader'
			},
			// Common ImageOverlay Formats
			{
				test: /\.(ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader'
			},
			// Common Media Formats
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: 'url-loader'
			},
		]
	},
})

// 生成对应的样式参数配置
function styleProcessor(type = 'css', { ssr=false, modules=false }={}) {
    // 各类型 Style 的 Loader 配置项
	let styleLoader = { loader: 'style-loader' }
	if (ssr) {
		styleLoader =  MiniCssExtractPlugin.loader
	}
    const cssLoader = {
        loader: 'css-loader',
        options: modules ? {
            modules: true,
            importLoaders: true,
            localIdentName: '[local]__[hash:base64:5]',
        } : {}
    }
    const lessLoader = {
    	loader: 'less-loader'
    }
    const postcssLoader =  {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: (loader) => [
                require('autoprefixer')()
            ]
        }
    }

    // 根据传入的配置返回不同的组合
	if(type === 'css') {
		return [styleLoader, cssLoader, postcssLoader]
	}
	if(type === 'less') {
		return [styleLoader, cssLoader, postcssLoader, lessLoader]
	}
}
