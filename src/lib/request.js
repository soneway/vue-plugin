import jsonp from './jsonp';

const origin = 'http://m.uczzd.cn';

function get(pathname, data) {
  return new Promise((resolve) => {
    jsonp.get({
      url: origin + pathname,
      data,
      success(rs) {
        resolve(rs);
      },
      error() {
        resolve(null);
      }
    });
  });
}

function post(opts) {

}

export default {
  get,
  post
};