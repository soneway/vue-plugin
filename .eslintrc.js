module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true
  },
  plugins: [
    // lint .vue文件(eslint-plugin-html)
    'html'
  ],
  globals: {
    Vue: true
  },

  rules: {
    // 禁用对象最后一个属性后的逗号
    'comma-dangle': [2, 'never']
  }
};