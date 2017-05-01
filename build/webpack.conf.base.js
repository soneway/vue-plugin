const entryHelper = require('./util/entry');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: Object.assign(
    entryHelper.getEntry(),
    {
      vendor: [
        path.join(__dirname, '../src/lib/vue.runtime.min.js')
      ]
    }
  ),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {
        names: ['common', 'vendor'],
        minChunks: 2
      }
    )
  ]
};
