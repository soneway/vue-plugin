// Object.assign
if (!Object.assign) {
  Object.assign = (obj) => {
    [].slice.call(arguments, 1).forEach((item) => {
      Object.keys(item).forEach((key) => {
        obj[key] = item[key];
      });
    });
    return obj;
  };
}
