// var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack');
var path = require('path');
var pages = require('./pages');

module.exports = {
  entry: [
    ...Object.keys(pages).map(function (key) {return pages[key]}),
    'webpack-dev-server/client?http://localhost:3010',
    'webpack/hot/only-dev-server',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dev.min.js',
    publicPath: '/dist'
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
    new webpack.HotModuleReplacementPlugin()
  ]
};
