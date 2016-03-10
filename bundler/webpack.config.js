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
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
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
    ],
  },
  postcss: () =>
    [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext'),
    ],
  plugins,
};
