const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    "mod_tristans_responsive_slider.min": './src/js/scripts.js',
  },
  mode: "development",
  output: {
    filename: "[name].js",
  },
  devtool: "sourcemap",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ]
  }
}
