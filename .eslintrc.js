module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true
  },
  plugins: [
    // lint .vue文件
    'html'
  ],
  globals: {
    Vue: true
  },

  rules: {
    // 对象最后一个属性后的逗号
    'comma-dangle': [2, 'never'],
    // 模块加载必须换行
    'import/newline-after-import': 0,
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // 禁止给参数重新赋值
    'no-param-reassign': 1,
    // 语句强制分号结束
    'semi': [2, 'always'],
    // 箭头函数中花括号样式(只有return语句时,不需要花括号)
    'arrow-body-style': 0,
    // 自增自减
    'no-plusplus': 0,
    // 禁止无用的表达式
    'no-unused-expressions': 1,
    // 大括号风格
    'brace-style': 0,
    // 禁止switch穿透
    'no-fallthrough': 1,
    // 禁止操作符混用
    'no-mixed-operators': 1,
    // function关键字后空格
    'space-before-function-paren': 1
  }
};