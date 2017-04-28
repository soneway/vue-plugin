import Index from '../view/Index.vue';
Index.el = '#root';
// pc触摸事件兼容
if (!('ontouchend' in document)) {
  const scriptEl = document.createElement('script');
  scriptEl.src = 'http://soneway.github.io/js/desktouch.js';
  document.head.appendChild(scriptEl);
}
export default new Vue(Index);
