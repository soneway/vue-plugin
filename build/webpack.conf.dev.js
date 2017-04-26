const baseConf = require('./webpack.conf.base');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(baseConf, {
  output: {
    path: path.join(__dirname, '../dev'),
    filename: '[name].js'
  }
});
