const baseConf = require('./webpack.conf.base');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryUtil = require('./util/entry');
const webpack = require('webpack');

// html处理
const templates = entryUtil.getTemplate();
const templatePlugins = templates.map((item) => new HtmlWebpackPlugin(Object.assign(item, {
  // html压缩配置
  minify: {
    minifyCSS: true,
    minifyJS: true,
    // 删除注释
    removeComments: true,
    // 换行和空格
    collapseWhitespace: true
  }
})));

module.exports = merge(baseConf, {
  output: {
    // 打包文件输出文件夹
    path: path.join(__dirname, '../prod'),
    filename: '[name].[chunkhash].js'
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
              name: 'img/[name].[hash:20].[ext]',
              // 小于2k的图片base64 inline
              limit: 2000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...templatePlugins,
    // js压缩
    new webpack.optimize.UglifyJsPlugin()
  ]
});
