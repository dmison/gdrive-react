// font-awesome config from: https://aleen42.gitbooks.io/personalwiki/content/Programming/JavaScript/Framework/webpack/webpack_and_fa/webpack_and_fa.html

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    'index.js' : './src/index.js'
  },

  output: {
    path: path.join(__dirname, '/app/'),
    filename: '[name]',
    publicPath: './'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'css', 'json', 'less']
  },

  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: false })
  ],

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      /** style */
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('css-loader!less-loader')
      },

      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
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
          presets: ['react', 'env']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  }

};
