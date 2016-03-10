import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './bundler/webpack.dev.config';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(3010, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3010');
});
