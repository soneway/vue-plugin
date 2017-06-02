// 根据path安全取对象属性函数
Object.getValByPath = (obj, path, defaultVal) => {
  const paths = path.split('.');

  // 遍历路径
  const val = paths.reduce((prev, item) => {
    if (prev === undefined || prev === null) {
      return prev;
    }
    return prev[item];
  }, obj);

  // 如拿到的值为undefined,返回默认值
  if (val === undefined) {
    return defaultVal;
  }
  return val;
};
