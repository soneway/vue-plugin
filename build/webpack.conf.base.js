const entryHelper = require('./util/entry');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// 入口js
const entry = entryHelper.getEntry();
// 配置
const config = {
  entry,
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
  plugins: []
};

if (Object.keys(entry).length > 0) {
  // 公共库
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }));
}

module.exports = config;
