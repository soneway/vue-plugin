// common.js
import '../lib/common';

import Vue from '../lib/js/vue.runtime.min';
import View from '../view/Msgbox.vue';

View.el = '#root';

export default new Vue(View);
