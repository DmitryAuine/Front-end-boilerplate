// var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    index: "./src/js/index"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
         test: /\.css$/,
        //  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
         loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function () {
    return [require('postcss-import'), require('postcss-cssnext')];
  },
  plugins: [
    // new ExtractTextPlugin("[name].min.css")
  ]
};
