const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');
const sveltePreprocess = require('svelte-preprocess');
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = {
	svelte: path.resolve('node_modules', 'svelte'),
	susy: path.resolve('node_modules', 'susy')
};
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html', '.scss'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

const preprocess = sveltePreprocess({
	postcss: true
});

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess
						}
					}
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
					  // Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						{
							loader: "sass-loader",
							options: {
								includePaths: ["node_modules/susy"] // scoped-module-name exists here
							}
						},
					],
				}
			]
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map'
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
							dev,
							preprocess
						}
					}
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
					  	// Translates CSS into CommonJS
						'css-loader',
					  	// Compiles Sass to CSS
						{
							loader: "sass-loader",
							options: {
								includePaths: ["node_modules/susy"] // scoped-module-name exists here
							}
						},
					],
				}
			]
		},
		mode: process.env.NODE_ENV,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV
	}
};
