// font-awesome config from: https://aleen42.gitbooks.io/personalwiki/content/Programming/JavaScript/Framework/webpack/webpack_and_fa/webpack_and_fa.html
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
    extensions: ['', '.js', '.jsx', 'css']
  },

  module: {
    loaders: [
      /** style */
      {
        test: /\.css/,
        loader: 'style!css?sourceMap',
      },

      /** font-awesome */
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
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
      }
    ]
  }

};
