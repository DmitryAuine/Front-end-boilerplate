var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var buildConfig = require('./buildConfig');

var plugins = [
  //
];

buildConfig.css.extract && plugins.push(new ExtractTextPlugin("[name].min.css"));

module.exports = {
  entry: buildConfig.pages,
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
         loader: buildConfig.css.extract ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
          : "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [require('postcss-import')({ addDependencyTo: webpack }), require('postcss-cssnext')];
  },
  plugins: plugins
};
