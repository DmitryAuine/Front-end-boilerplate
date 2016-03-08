var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var buildConfig = require('./buildConfig');

var plugins = [
  new webpack.HotModuleReplacementPlugin()
];

buildConfig.css.extract && plugins.push(new ExtractTextPlugin("[name].min.css"));


module.exports = {
  entry: [
    ...Object.keys(buildConfig.pages).map(function (key) {return buildConfig.pages[key]}),
    'webpack-dev-server/client?http://localhost:3010',
    'webpack/hot/dev-server',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.min.js',
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
