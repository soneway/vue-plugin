const baseConf = require('./webpack.conf.base');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryUtil = require('./util/entry');

// html处理
const templates = entryUtil.getTemplate();
const templatePlugins = templates.map((item) => new HtmlWebpackPlugin(item));

module.exports = merge(baseConf, {
  output: {
    // 打包文件输出文件夹
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
              // 禁止图片base64 inline
              limit: Number.MAX_VALUE
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    ...templatePlugins
  ]
});
