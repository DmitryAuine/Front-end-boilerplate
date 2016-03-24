import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  build as config,
  devServer as devServerConfig,
} from '../config';

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
];

if (config.css.extract) {
  plugins.push(new ExtractTextPlugin('[name].min.css'));
}

module.exports = {
  entry: [
    ...Object.keys(config.pages).map(key => config.pages[key]),
    `webpack-dev-server/client?http://localhost:${devServerConfig.webpackPort}`,
    'webpack/hot/dev-server',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].min.js',
    publicPath: '../dist/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: config.css.extract
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
          : 'style-loader!css-loader!postcss-loader',
      },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name]_[hash].[ext]' },
    ],
  },
  postcss: () =>
   [require('postcss-import')({ addDependencyTo: webpack }), require('postcss-cssnext')],
  plugins,
};
