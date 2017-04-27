const baseConf = require('./webpack.conf.base');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryHelper = require('./entry-helper');

// html处理
const templates = entryHelper.getTemplate();
const templatePlugins = templates.map((item) => new HtmlWebpackPlugin(item));

module.exports = merge(baseConf, {
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loaders: ['url-loader']
      }
    ]
  },
  plugins: [
    ...templatePlugins
  ]
});
