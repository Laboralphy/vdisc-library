/**
 * Created by ralphy on 26/05/17.
 */
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'public/scripts/src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public/scripts/dist'),
        filename: 'app.js',
        publicPath: "/public/scripts/dist/",
    },
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
    target: 'web'
};