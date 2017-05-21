import '../lib/es6/object';
import 'promise-polyfill';
import 'regenerator-runtime/runtime';

import Vue from '../lib/third/vue.runtime.min';
import View from '../view/Msgbox.vue';

View.el = '#root';

export default new Vue(View);
