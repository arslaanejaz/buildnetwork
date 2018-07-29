var path = require("path");

var DIST_DIR   = path.join(__dirname, "public_static/libs/"),
    CLIENT_DIR = path.join(__dirname, "src");

module.exports = {
    mode: "development",
	context: CLIENT_DIR,

	entry: "./main.js",

	output: {
		path:     DIST_DIR,
		filename: "bundle.js"
	},

	resolve: {
		extensions: ['.js']
	}
};
