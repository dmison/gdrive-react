const baseConfig = require('./webpack.config.js');

var devConfig = baseConfig;
devConfig.devServer = {
  hot: true,
  contentBase: './app'
};

module.exports = devConfig;
