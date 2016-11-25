const path = require('path');

module.exports = {
  entry: {
    'index' : './src/index.js'
  },
  output: {
    path: path.join(__dirname, '/app/'),
    filename: '[name].js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: './app'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }

};
