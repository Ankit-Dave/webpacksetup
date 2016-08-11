var config = {
  "root": {
    "src": "./src",
    "dest": "./build"
  },
  "tasks": {
    "js": {
      "src": "./",
      "dest": "js",
      "entries": {
        "common": ["./modules/util/common.js"],
        "entry1": ["./entry1.js"],
        "entry2": ["./entry2.js"]
      }
    }
  }
};

function packageSort(packages) {
  var i = 0;
  return function sort(a, b) {
    if(packages[i] === a.names[0]) {
      return -1;
    }
    if(packages[i] === b.names[0]) {
      return 1;
    }
    i++;
    return 0;
  }
}        

var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function makeWebpackConfig (env) {
  var context = path.resolve(config.root.src);
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest);

  var isProd = (env === 'production');
  var filenamePattern = isProd ? '[name]-[hash].js' : '[name].js';

  var webpackConfig = {
    context: context,
    entry: config.tasks.js.entries,
    output: {
      path: config.root.dest,
      filename: filenamePattern,
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    plugins: [
      new CleanWebpackPlugin([config.root.dest]),

      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify("production")
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
  };

  if(env === 'development') {
    webpackConfig.devtool = 'inline-source-map';
  }

  /*
  entry: './src/index.js',
  output: {
      path: './build',
      filename: 'app.bundle.js'
  },
  module: {
      preLoaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
      }],
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
      }]
  },
  eslint: {
      configFile:  __dirname + '/.eslintrc.json'
  }
  */
  return webpackConfig;
}

module.exports = makeWebpackConfig(process.env.NODE_ENV)
