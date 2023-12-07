const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/scripts/index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/assets/favicon.png',
			meta: {
				description:
					'Streamline your coding workflow with AI-generated assistance in refactoring, debugging, and language conversion, all within a user-friendly interface for an efficient coding experience.',
				keywords:
					'ai code generation, ai text generation, ai coding assistance, coding assistant, code explanations',
				author: 'Aniqa',
				'og:type': 'website',
				'og:title': 'Your AI coding assistant',
				'og:description':
					'Streamline your coding workflow with AI-generated assistance in refactoring, debugging, and language conversion, all within a user-friendly interface for an efficient coding experience.',
				'og:url': 'https://code.aniqa.dev',
				'og:image': '',
				'twitter:title': 'Your AI coding assistant',
				'twitter:card': 'summary_large_image',
				'twitter:image': '',
				'twitter:image:alt': "Screen capture of website's user interface",
				'twitter:site': '@aniqatc',
			},
		}),
		new MiniCssExtractPlugin(),
	],
};
