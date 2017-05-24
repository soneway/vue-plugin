webpackJsonp([4],{

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(69)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(58),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/view/Flip.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Flip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2be9b965", Component.options)
  } else {
    hotAPI.reload("data-v-2be9b965", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    // 宽度
    width: {
      default: '100%'
    },
    // 高度
    height: {
      default: '100%'
    },
    // 是否水平方向滚动
    isHorizontal: {
      default: true
    },
    // 滑动距离阈值
    swipSpanThreshold: {
      default: 6
    },
    // 滑动阈值
    swipThreshold: {
      default: 50
    },
    // 动画时长
    duration: {
      default: 400
    },
    // 默认滚动索引
    index: {
      default: 0
    },
    // 是否显示页脚
    isShowPager: {
      default: true
    },
    // 是否显示loading
    isShowLoading: {
      default: true
    },
    // 自动播放间隔
    autoPlayTimeout: {
      // 默认为0,表示禁用自动播放
      default: 0
    }
  },
  data: function data() {
    return {
      // 禁用动画
      notrans: false,
      // 滑动距离
      swipSpan: 0,
      // 滚动索引
      currentIndex: this.index,
      // translate
      currentTranslate: 0
    };
  },

  computed: {
    items: function items() {
      return this.$slots.default.filter(function (item) {
        return item.tag;
      });
    },
    _class: function _class() {
      return [{ notrans: this.notrans }, { 'pi-loading': this.isShowLoading }, { horizontal: this.isHorizontal }];
    },
    _style: function _style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    _wrapStyle: function _wrapStyle() {
      var swipSpan = this.swipSpan;

      var deg = Math.sqrt(Math.abs(swipSpan)) * 5;
      // 如为负
      if (swipSpan < 0) {
        deg = -deg;
      }
      return {
        transform: 'rotate3d(0, 1, 0, ' + deg + 'deg)',
        transitionDuration: this.duration / 1000 + 's'
      };
    },
    pagerHtml: function pagerHtml() {
      var _this = this;

      return [].concat(_toConsumableArray(new Array(this.items.length))).map(function (item, index) {
        return '<span ' + (index === _this.currentIndex ? 'class="selected"' : '') + ' data-index="' + index + '"></span>';
      }).join('');
    }
  },
  mounted: function mounted() {
    // 初始化slots
    this.initSlots();
    // 初始化timer
    this.startInter();
  },

  methods: {
    // 初始化slots
    initSlots: function initSlots() {
      var _this2 = this;

      var $el = this.$el,
          currentIndex = this.currentIndex;

      // 遍历

      this.items.forEach(function (item, index) {
        var itemEl = item.elm;

        // current状态
        index === currentIndex && itemEl.setAttribute('current', '');

        // 计算出初始滑动值
        if (currentIndex > 0) {
          var itemSpan = _this2.isHorizontal ? $el.offsetWidth : $el.offsetHeight;
          _this2.currentTranslate = -currentIndex * itemSpan;
        }
      });
    },
    __touchstart: function __touchstart(evt) {
      var touch = evt.targetTouches ? evt.targetTouches[0] : evt;

      // 记录触摸开始位置
      this.startX = touch.pageX;
      this.startY = touch.pageY;

      // 重置swipSpan
      this.swipSpan = 0;
      // 重置手指拖拽移动
      this.isMoving = false;
      // 禁用动画
      this.notrans = true;

      // 停止定时器
      this.stopInter();
    },
    __touchmove: function __touchmove(evt) {
      var touch = evt.targetTouches ? evt.targetTouches[0] : evt;
      // x轴滑动距离
      var swipSpanX = touch.pageX - this.startX;
      var absX = Math.abs(swipSpanX);
      // y轴滑动距离
      var swipSpanY = touch.pageY - this.startY;
      var absY = Math.abs(swipSpanY);

      // 左右
      if (this.isHorizontal) {
        // x轴滑动距离大于y轴 y轴滑动距离小于阈值,说明的确是左右滑动
        if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
          evt.preventDefault();
          evt.stopPropagation();
          this.swipSpan = swipSpanX;
          // 已经满足滚动条件,且正在手指拖动
          this.isMoving = true;
        }
      }
      // 上下
      else {
          // y轴滑动距离大于x轴 x轴滑动距离小于阈值,说明的确是上下滑动
          if (this.isMoving || absX < absY || absX < this.swipSpanThreshold) {
            evt.preventDefault();
            evt.stopPropagation();
            this.swipSpan = swipSpanY;
            // 已经满足滚动条件,且正在手指拖动
            this.isMoving = true;
          }
        }
    },
    __touchend: function __touchend() {
      var swipSpan = this.swipSpan,
          swipThreshold = this.swipThreshold,
          items = this.items,
          currentIndex = this.currentIndex;

      var itemCount = items.length;

      // 向右,下
      if (swipSpan > swipThreshold) {
        // 非起点
        if (currentIndex !== 0) {
          --this.currentIndex;
        }
      }
      // 向左,上
      else if (swipSpan < -swipThreshold) {
          // 非终点
          if (currentIndex !== itemCount - 1) {
            ++this.currentIndex;
          }
        }

      // 加上动画
      this.notrans = false;
      // 重置swipSpan
      this.swipSpan = 0;

      // 开始定时器
      this.startInter();
    },
    __pagerClick: function __pagerClick(evt) {
      var index = +evt.target.getAttribute('data-index');
      this.slideToIndex(index);
    },
    __wrapClick: function __wrapClick() {
      this.$emit('click', this.currentIndex);
    },


    // 滑动到第几帧
    slideToIndex: function slideToIndex(index) {
      // index不符合条件
      if (typeof index !== 'number' || index < 0 || index >= this.items.length) {
        return;
      }
      this.currentIndex = index;
    },

    // 开始定时器
    startInter: function startInter() {
      var _this3 = this;

      var autoPlayTimeout = this.autoPlayTimeout;

      var itemCount = this.items.length;

      // 自动播放开启
      if (autoPlayTimeout) {
        this.inter = setInterval(function () {
          // 最后一帧
          if (_this3.currentIndex === itemCount - 1) {
            _this3.currentIndex = 0;
          } else {
            ++_this3.currentIndex;
          }
        }, autoPlayTimeout);
      }
    },

    // 停止定定时器
    stopInter: function stopInter() {
      clearInterval(this.inter);
    }
  }
});

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_PiFlip_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_PiFlip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__component_PiFlip_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    PiFlip: __WEBPACK_IMPORTED_MODULE_0__component_PiFlip_vue___default.a
  },
  mounted: function mounted() {},

  methods: {}
});

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_third_vue_runtime_min__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_third_vue_runtime_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__lib_third_vue_runtime_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_Flip_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view_Flip_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__view_Flip_vue__);
// import '../lib/es6/object';




__WEBPACK_IMPORTED_MODULE_1__view_Flip_vue___default.a.el = '#root';
// pc触摸事件兼容
if (!('ontouchend' in document)) {
  var scriptEl = document.createElement('script');
  scriptEl.src = 'https://soneway.github.io/js/desktouch.js';
  document.head.appendChild(scriptEl);
}

/* harmony default export */ __webpack_exports__["default"] = (new __WEBPACK_IMPORTED_MODULE_0__lib_third_vue_runtime_min___default.a(__WEBPACK_IMPORTED_MODULE_1__view_Flip_vue___default.a));

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  font-size: inherit;\n}\ninput, textarea {\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  vertical-align: middle;\n}\nimg {\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.wrapper .img {\n    background: center center no-repeat;\n    background-size: contain;\n}\n", "", {"version":3,"sources":["/Users/soneway/Sites/github/vue-plugin/src/view/Flip.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;EACnB,OAAO;EACP,YAAY;EACZ,gBAAgB;EAChB,mCAAmC;EACnC,+BAA+B;EAC/B,UAAU;EACV,0BAAkB;UAAlB,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;EACzC,UAAU;EACV,4BAA4B;EAC5B,QAAQ;EACR,kCAAkC;CAAE;AAEtC;EACE,mBAAmB;CAAE;AAEvB;EACE,0BAAkB;UAAlB,kBAAkB;CAAE;AAEtB;EACE,uBAAuB;CAAE;AAE3B;EACE,aAAa;CAAE;AAEjB;EACE,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;CAAE;AACZ;IACE,oCAAoC;IACpC,yBAAyB;CAAE","file":"Flip.vue","sourcesContent":["@charset \"UTF-8\";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch; }\n\ninput, textarea, select {\n  font-size: inherit; }\n\ninput, textarea {\n  user-select: text; }\n\nimg, input {\n  vertical-align: middle; }\n\nimg {\n  border: none; }\n\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer; }\n\nli {\n  list-style: none; }\n\ni {\n  font-style: normal; }\n\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n  .wrapper .img {\n    background: center center no-repeat;\n    background-size: contain; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-flip.pi-loading .pi-wrap > :before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n.pi-flip {\n  position: relative;\n  -webkit-perspective: 1000px;\n          perspective: 1000px;\n  /*没有动画*/\n  /*loading*/\n}\n.pi-flip.notrans .pi-wrap {\n    -webkit-transition: none;\n    transition: none;\n}\n.pi-flip .pi-wrap {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    -webkit-transition: all ease;\n    transition: all ease;\n}\n.pi-flip .pi-wrap > * {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      overflow: hidden;\n}\n.pi-flip .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-flip .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-flip .pi-pager > span.selected {\n        border-color: #555;\n}\n", "", {"version":3,"sources":["/Users/soneway/Sites/github/vue-plugin/src/component/PiFlip.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,aAAa;AACb;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,yCAAyC;EACzC,YAAY;EACZ,eAAe;EACf,2CAA2C;EAC3C,+BAA+B;EAC/B,MAAM;EACN,mDAA2C;UAA3C,2CAA2C;CAAE;;AAE/C,QAAQ;AACR;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAJnC;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAEnC;EACE,mBAAmB;EACnB,4BAAoB;UAApB,oBAAoB;EACpB,QAAQ;EACR,WAAW;CAAE;AACb;IACE,yBAAiB;IAAjB,iBAAiB;CAAE;AACrB;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,6BAAqB;IAArB,qBAAqB;CAAE;AACvB;MACE,mBAAmB;MACnB,QAAQ;MACR,SAAS;MACT,OAAO;MACP,UAAU;MACV,iBAAiB;CAAE;AACvB;IACE,mBAAmB;IACnB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,mBAAmB;IACnB,aAAa;IACb,kBAAkB;CAAE;AACpB;MACE,uBAAuB;MACvB,mBAAmB;MACnB,cAAc;CAAE;AAChB;QACE,mBAAmB;CAAE","file":"PiFlip.vue","sourcesContent":["@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-flip.pi-loading .pi-wrap > :before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  animation: ani_circle 0.8s linear infinite; }\n\n/*旋转动画*/\n@keyframes ani_circle {\n  0% {\n    transform: rotateZ(0deg); }\n  100% {\n    transform: rotateZ(360deg); } }\n\n.pi-flip {\n  position: relative;\n  perspective: 1000px;\n  /*没有动画*/\n  /*loading*/ }\n  .pi-flip.notrans .pi-wrap {\n    transition: none; }\n  .pi-flip .pi-wrap {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    transition: all ease; }\n    .pi-flip .pi-wrap > * {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      overflow: hidden; }\n  .pi-flip .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px; }\n    .pi-flip .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px; }\n      .pi-flip .pi-pager > span.selected {\n        border-color: #555; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(74)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(63),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/component/PiFlip.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PiFlip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-703898ba", Component.options)
  } else {
    hotAPI.reload("data-v-703898ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('pi-flip', {
    attrs: {
      "isHorizontal": true,
      "autoPlayTimeout": 0,
      "index": 0,
      "isShowPager": true
    }
  }, [_c('div', {
    staticClass: "img",
    staticStyle: {
      "background-image": "url(https://soneway.github.io/jq/example/dist/img/1.jpg)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "img",
    staticStyle: {
      "background-image": "url(https://soneway.github.io/jq/example/dist/img/2.jpg)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "img",
    staticStyle: {
      "background-image": "url(https://soneway.github.io/jq/example/dist/img/3.jpg)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "img",
    staticStyle: {
      "background-image": "url(https://soneway.github.io/jq/example/dist/img/4.jpg)"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "img",
    staticStyle: {
      "background-image": "url(https://soneway.github.io/jq/example/dist/img/5.jpg)"
    }
  })])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2be9b965", module.exports)
  }
}

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pi-flip",
    class: _vm._class,
    style: (_vm._style),
    on: {
      "touchstart": _vm.__touchstart,
      "touchmove": _vm.__touchmove,
      "touchend": _vm.__touchend
    }
  }, [_c('div', {
    staticClass: "pi-wrap",
    style: (_vm._wrapStyle),
    on: {
      "click": _vm.__wrapClick
    }
  }, [_vm._t("default", null, {
    currentIndex: _vm.currentIndex
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-703898ba", module.exports)
  }
}

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(42);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("70e18a90", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2be9b965\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Flip.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2be9b965\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Flip.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e20b85be", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-703898ba\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiFlip.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-703898ba\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiFlip.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

},[34]);
//# sourceMappingURL=flip.js.map