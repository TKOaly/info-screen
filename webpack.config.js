const path = require("path");

module.exports = {
  entry: "./client.jsx",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(process.cwd(), "static"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
