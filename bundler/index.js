import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

new Promise((resolve, reject) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      return reject(err);
    }

    console.log(stats.toString());
    return resolve();
  });
});
