// common.js
import '../lib/common';

import Vue from '../lib/js/vue.runtime';
import View from '../view/Slider.vue';

View.el = '#root';

export default new Vue(View);
