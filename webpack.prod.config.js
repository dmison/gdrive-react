const baseConfig = require('./webpack.config.js');
const webpack = require('webpack');

var prodConfig = baseConfig;

prodConfig.plugins = prodConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'BABEL_ENV': JSON.stringify('production')
    }
  })
]);

module.exports = prodConfig;
