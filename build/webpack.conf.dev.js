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
      // 图片处理
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loaders: [
          // 路径处理
          {
            loader: 'url-loader',
            query: {
              name: 'img/[name].[ext]',
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...templatePlugins
  ]
});
