// common.js
import '../lib/common';

import Vue from '../lib/js/vue.runtime';
import View from '../view/UcGallery.vue';

View.el = '.uc-gallery';

export default new Vue(View);
