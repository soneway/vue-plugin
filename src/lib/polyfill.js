const tmpArray = [];
const slice = tmpArray.slice;

// Object.assign
if (!Object.assign) {
  Object.assign = function(obj) {
    slice.call(arguments, 1).forEach(function(item) {
      for (var p in item) {
        obj[p] = item[p];
      }
    });
    return obj;
  };
}