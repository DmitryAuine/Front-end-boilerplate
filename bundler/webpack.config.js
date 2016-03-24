import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { build as config } from '../config';

const plugins = [
  //
];

if (config.css.extract) {
  plugins.push(new ExtractTextPlugin('[name].min.css'));
}

module.exports = {
  entry: config.pages,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].min.js',
    publicPath: config.publicPath,
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
    [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext'),
    ],
  plugins,
};
