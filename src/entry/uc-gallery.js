require('../lib/polyfill');

import Vue from '../lib/third/vue.runtime.min';
import UcGallery from '../view/UcGallery.vue';

// pc触摸事件兼容
if (!('ontouchend' in document)) {
  const scriptEl = document.createElement('script');
  scriptEl.src = 'https://soneway.github.io/js/desktouch.js';
  document.head.appendChild(scriptEl);
}

UcGallery.el = '.uc-gallery';

// 从html中拿到数据
const headerEl = document.querySelector('header');
const titleInfo = {
  title: headerEl.querySelector('h1').textContent.trim(),
  source: headerEl.querySelector('#source').textContent.trim(),
  time: headerEl.querySelector('time').textContent.trim()
};
const figures = [].slice.call(document.querySelectorAll('.uc-gallery figure'));
const dataList = figures.map((item) => {
  return {
    img: item.querySelector('img').getAttribute('alt-src'),
    desc: item.querySelector('figcaption>p').textContent.trim()
  };
});
Object.assign(UcGallery.data || (UcGallery.data = {}), {
  dataList,
  titleInfo
});

export default new Vue(UcGallery);
