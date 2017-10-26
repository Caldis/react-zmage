// libs
import path from 'path'
import webpack from 'webpack'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
// 本地服务器配置
export const host = process.env.HOST || '127.0.0.1'
export const port = process.env.PORT || 8080

// 基础配置集
export default {
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
		// 热加载时直接返回更新文件名，而不是文件的id。
		new webpack.NamedModulesPlugin(),
		// 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
		new webpack.NoEmitOnErrorsPlugin(),
	],

	module: {
		rules: [
			// JS
			{
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			// Style
			{
				// *.global 后缀的所有 css 文件
				test: /\.global\.css$/,
				exclude: /node_modules/,
				use: styleProcessor('css', { modules: false, precss: false })
			},
			{
				// *.global 后缀的所有 less 文件
				test: /\.global\.less$/,
				exclude: /node_modules/,
				use: styleProcessor('less', { modules: false, precss: false })
			},
			{
				// 非 *.global 的 css 文件
				test: /^((?!\.global).)*\.css$/,
				exclude: /node_modules/,
				use: styleProcessor('css', { modules: true, precss: false })
			},
			{
				// 非 *.global 的 less 文件
				test: /^((?!\.global).)*\.less$/,
				exclude: /node_modules/,
				use: styleProcessor('less', { modules: true, precss: false })
			},
			{
				// node_modules 内的所有 css 文件
				test: /\.css$/,
				include: /node_modules/,
				use: styleProcessor('css', { modules: false, precss: false })
			},
			{
				// node_modules 内的所有 less 文件
				test: /\.less/,
				include: /node_modules/,
				use: styleProcessor('less', { modules: false, precss: false })
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
}

// 生成对应的样式参数配置
function styleProcessor(type, options = { modules: false, precss: false }) {
	if(type === 'css') {
		const loaders = [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: options.modules ? {
					modules: true,
					importLoaders: 1,
					localIdentName: '[local]__[hash:base64:5]',
				} : {}
			}
		]
		options.precss && loaders.concat({
			loader: 'postcss-loader',
			options: {
				plugins: function () {
					return [precss, autoprefixer]
				}
			}
		})
		return loaders
	}
	if(type === 'less') {
		const loaders = [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: options.modules ? {
					modules: true,
					importLoaders: 1,
					localIdentName: '[local]__[hash:base64:5]',
				} : {}
			},
			{
				loader: "less-loader"
			}
		]
		options.precss && loaders.concat({
			loader: 'postcss-loader',
			options: {
				plugins: function () {
					return [precss, autoprefixer]
				}
			}
		})
		return loaders
	}
}