import jsonp from './jsonp';
import Promise from 'promise-polyfill';
import 'regenerator-runtime/runtime';

const origin = 'https://m.uczzd.cn';

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

async function getImgs() {
  const rs = await get('/iflow/api/v1/channel/100?method=new');
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