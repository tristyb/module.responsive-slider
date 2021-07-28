const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    "mod_tristans_responsive_slider.min": [
      './assets/js/scripts.js',
      './assets/js/jquery.flexslider.js'
    ],
  },
  mode: "development",
  output: {
    path: __dirname + "/src/assets/js/",
    filename: "[name].js",
  },
  devtool: "sourcemap",
  externals: {
    "jquery": "jQuery"
  },
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
