const path = require("path");
const slsw = require("serverless-webpack");
const { IgnorePlugin } = require("webpack");

module.exports = {
	entry: slsw.lib.entries,
	output: {
		libraryTarget: "commonjs",
		filename: "[name].js",
		path: path.join(__dirname, ".webpack"),
	},
	plugins: [
		new IgnorePlugin({
			resourceRegExp: /^pg-native$/
		})
	],
	mode: "development",
	target: "node",
	module: {
		rules: [
			{
				include: path.join(__dirname, "src"),
				test: /\.m?js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			}
		],
	}
};