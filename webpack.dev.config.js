const baseConfig = require('./webpack.config.js');

var devConfig = baseConfig;
devConfig.devServer = {
  hot: true,
  contentBase: './app'
};

devConfig.output.publicPath = '/';

module.exports = devConfig;
