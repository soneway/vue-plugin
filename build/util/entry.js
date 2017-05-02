const fs = require('fs');
const path = require('path');
// 源代码文件夹
const srcDir = path.join(__dirname, '../../src');

// 获取entry函数
function getEntry(entryDir = path.join(srcDir, '/entry')) {
  const files = fs.readdirSync(entryDir);
  return files.map((file) => path.join(entryDir, file))
  // 过滤出.js文件
    .filter((filePath) => {
      const stat = fs.statSync(filePath);
      return !stat.isDirectory() && filePath.endsWith('.js');
    })
    // 返回所有js文件entry信息: {name: path}对象
    .reduce((prev, filePath) => {
      const pathInfo = path.parse(filePath);
      prev[pathInfo.name] = filePath;
      return prev;
    }, {});
}

// 获取模板函数
function getTemplate(templateDir = srcDir) {
  const files = fs.readdirSync(templateDir);
  return files.map((file) => path.join(templateDir, file))
  // 过滤出文件
    .filter((filePath) => {
      const stat = fs.statSync(filePath);
      return !stat.isDirectory() && filePath.endsWith('.html');
    })
    // 返回所有模板文件
    .map((filePath) => {
      const pathInfo = path.parse(filePath);
      return {
        filename: pathInfo.base,
        template: path.join(templateDir, pathInfo.base),
        chunks: ['vendor', pathInfo.name]
      };
    });
}

module.exports = {
  getTemplate,
  getEntry
};
