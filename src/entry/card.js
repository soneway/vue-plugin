// common.js
import '../lib/common';

import Vue from '../lib/js/vue.runtime.min';
import View from '../view/Card.vue';

View.el = '#root';

export default new Vue(View);