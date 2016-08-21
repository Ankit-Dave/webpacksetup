var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('./config')
var packageSort = require('./lib/packageSort')

function makeWebpackConfig (env) {
  var context = path.resolve(config.root.src)
  // var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
  // var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)

  var isProd = (env === 'production')
  var filenamePattern = isProd ? 'js/[name]-[hash].js' : 'js/[name].js'

  var webpackConfig = {
    context: context,
    entry: config.tasks.js.entries,
    output: {
      path: config.root.dest,
      filename: filenamePattern
    },
    module: {
      preLoaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }],
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: config.tasks.js.babel
      }]
    },
    plugins: [
      new CleanWebpackPlugin([config.root.dest]),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['common']
      }),

      new HtmlWebpackPlugin({
        filename: 'entry1.html',
        chunks: ['entry1']
      }),

      new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: packageSort(['common', 'entry1', 'entry2'])
      })
    ]
  }

  if (env === 'development') {
    webpackConfig.devtool = 'inline-source-map'
  }

  return webpackConfig
}

module.exports = makeWebpackConfig(process.env.NODE_ENV)
