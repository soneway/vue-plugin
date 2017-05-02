const entryHelper = require('./util/entry');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: entryHelper.getEntry(),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            // css前缀处理
            autoprefixer({
              browsers: ['ios 7', 'android 4']
            })
          ]
        }
      }
    ]
  },
  plugins: [
    // 公共库
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] })
  ]
};
