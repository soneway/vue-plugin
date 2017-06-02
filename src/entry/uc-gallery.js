import Vue from '../lib/js/vue.runtime.min';
import View from '../view/UcGallery.vue';

View.el = '.uc-gallery';

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
Object.assign(View.data || (View.data = {}), {
  dataList,
  titleInfo
});

export default new Vue(View);
