// var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack');
var path = require('path');
var pages = require('./pages');

module.exports = {
  entry: pages,
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
  postcss: function (webpack) {
    return [require('postcss-import')({ addDependencyTo: webpack }), require('postcss-cssnext')];
  },
  plugins: [
    // new ExtractTextPlugin("[name].min.css")
  ]
};
