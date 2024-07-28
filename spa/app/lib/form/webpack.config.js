const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	mode: "production",
	entry: {
		index: "./src/index.ts",
	},
	output: {
		// library: {type:"module"},
		// filename: 'index.js',
		// path: path.resolve(__dirname, 'dist'),
		// filename: '[name].js',
		libraryTarget: 'umd',
		library: '[name]',
	},
	optimization: {
		nodeEnv: "production", // NODE_ENV環境変数の設定
		minimize: true, // 出力結果を1行にするかどうか
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin({
			configFile: "./tsconfig.prod.json",
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
		})],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true, // type checkはしない設定
				},
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	// experiments: {
	// 	outputModule: true,
	// },
	// externalsType: 'module',
	externals: [
		'react',
		'react-dom',
		'react-dom/client',
	],
};
