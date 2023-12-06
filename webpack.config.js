const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
};
