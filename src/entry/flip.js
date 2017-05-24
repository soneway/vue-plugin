// import '../lib/es6/object';

import Vue from '../lib/third/vue.runtime.min';
import View from '../view/Flip.vue';

View.el = '#root';
// pc触摸事件兼容
if (!('ontouchend' in document)) {
  const scriptEl = document.createElement('script');
  scriptEl.src = 'https://soneway.github.io/js/desktouch.js';
  document.head.appendChild(scriptEl);
}

export default new Vue(View);