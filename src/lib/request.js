import jsonp from './jsonp';
import Promise from 'promise-polyfill';
import 'regenerator-runtime/runtime';

const origin = 'https://m.uczzd.cn';

// get请求函数,对应jsonp
function get(pathname, data) {
  return new Promise((resolve) => {
    jsonp.get({
      url: origin + pathname,
      data,
      success(rs) {
        resolve(rs);
      },
      error() {
        resolve();
      }
    });
  });
}

// post请求函数
function post(opts) {

}

// 获取图片数据
async function getImgs() {
  const rs = await get('/iflow/api/v1/channel/100?method=new');
  if (!rs) {
    return;
  }
  const articles = rs.data.articles || {};
  return Object.keys(articles).map((key) => {
    const images = articles[key].images[0] || {};
    return images.url;
  }).filter((item) => !!item);
}

export default {
  get,
  post,
  getImgs
};