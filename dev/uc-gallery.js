webpackJsonp([5],{

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(91)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(78),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/view/UcGallery.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UcGallery.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fea266c8", Component.options)
  } else {
    hotAPI.reload("data-v-fea266c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PiCarousel = __webpack_require__(7);

var _PiCarousel2 = _interopRequireDefault(_PiCarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    PiCarousel: _PiCarousel2.default
  },
  created: function created() {
    // 从html中拿到数据
    var headerEl = document.querySelector('header');
    var titleInfo = {
      title: headerEl.querySelector('h1').textContent.trim(),
      source: headerEl.querySelector('#source').textContent.trim(),
      time: headerEl.querySelector('time').textContent.trim()
    };
    var figures = [].slice.call(document.querySelectorAll('.uc-gallery figure'));
    var dataList = figures.map(function (item) {
      return {
        img: item.querySelector('img').getAttribute('alt-src'),
        desc: item.querySelector('figcaption>p').textContent.trim()
      };
    });

    // 将data中的数据覆盖
    Object.assign(this, {
      dataList: dataList,
      titleInfo: titleInfo
    });
  },
  data: function data() {
    return {
      thumbIndex: 0,
      dataList: [],
      titleInfo: {}
    };
  },
  mounted: function mounted() {
    var _this = this;

    // carousel插件滚动事件
    this.$refs.carousel.$on('slide', function (index) {
      _this.thumbSlide(index);
    });
  },

  methods: {
    // 缩略图滚动
    thumbSlide: function thumbSlide(index) {
      if (index === this.thumbIndex) {
        return;
      }
      this.thumbIndex = index;
      this.$refs.carousel.slideToIndex(index);
      this.center(index);
    },
    __thumbClick: function __thumbClick(index) {
      this.thumbSlide(index);
    },

    // 缩略图居中
    center: function center(index) {
      var thumbWrap = this.$refs.thumbWrap;

      var thumbEl = document.querySelector('.thumb:nth-of-type(' + (index + 1) + ')');
      thumbWrap.scrollLeft = thumbEl.offsetLeft - (thumbWrap.offsetWidth - thumbEl.offsetWidth) / 2;
    }
  }
}; //
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
//
//
//
//

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _UcGallery = __webpack_require__(20);

var _UcGallery2 = _interopRequireDefault(_UcGallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_UcGallery2.default.el = '.uc-gallery'; // common.js
exports.default = new _vue2.default(_UcGallery2.default);

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var FORWARD = -1;
var BACK = 1;

exports.default = {
  props: {
    // 宽度
    width: {
      default: '100%'
    },
    // 高度
    height: {
      default: '100%'
    },
    // 列表数据
    dataList: {
      default: []
    },
    // 滑动距离阈值
    swipSpanThreshold: {
      default: 6
    },
    // 滑动阈值
    swipThreshold: {
      default: 50
    },
    // 动画时长(该时长,需要和动画时长相同)
    duration: {
      default: 400
    },
    // first和last拉不动的比率
    pullRatio: {
      default: 2
    },
    // 是否循环滚动
    isLoop: {
      default: true
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
      // 方向状态
      direction: 0,
      // 是否正在动画
      isAnimating: false,
      prevIndex: this.index - 1,
      // 滚动索引
      currentIndex: this.index,
      nextIndex: this.index + 1,
      // 滑动值
      currentTranslate: 0
    };
  },

  computed: {
    prevData: function prevData() {
      var dataList = this.dataList;
      var prevIndex = this.prevIndex;

      // 第一帧前面

      if (prevIndex < 0) {
        // 不能循环滚动
        if (!this.isLoop) {
          return;
        }
        prevIndex = dataList.length - 1;
      }
      return dataList[prevIndex];
    },
    currentData: function currentData() {
      return this.dataList[this.currentIndex];
    },
    nextData: function nextData() {
      var dataList = this.dataList;
      var nextIndex = this.nextIndex;

      // 最后一帧后面

      if (nextIndex === dataList.length) {
        // 不能循环滚动
        if (!this.isLoop) {
          return;
        }
        nextIndex = 0;
      }
      return dataList[nextIndex];
    },
    _class: function _class() {
      return {
        'pi-loading': this.isShowLoading,
        'pi-animating': this.isAnimating
      };
    },
    _style: function _style() {
      return {
        width: this.width,
        height: this.height
      };
    },
    _wrapStyle: function _wrapStyle() {
      return {
        transform: 'translate3d(' + this.currentTranslate + ',0,0)'
      };
    },
    _prevClass: function _prevClass() {
      return {
        'temp-current': this.isAnimating && this.direction === BACK
      };
    },
    _nextClass: function _nextClass() {
      return {
        'temp-current': this.isAnimating && this.direction === FORWARD
      };
    }
  },
  watch: {
    currentData: function currentData() {
      // 重置scrollTop
      var currentItem = this.$refs.currentItem;

      if (currentItem) {
        var wrapEl = currentItem.firstElementChild;
        wrapEl && (wrapEl.scrollTop = 0);
      }
    },
    currentIndex: function currentIndex() {
      var currentIndex = this.currentIndex;

      this.prevIndex = currentIndex - 1;
      this.nextIndex = currentIndex + 1;
    }
  },
  mounted: function mounted() {
    this.startInter();
  },

  methods: {
    __touchstart: function __touchstart(evt) {
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        return;
      }

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
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }

      var touch = evt.targetTouches ? evt.targetTouches[0] : evt;
      // x轴滑动距离
      var swipSpanX = touch.pageX - this.startX;
      var absX = Math.abs(swipSpanX);
      // y轴滑动距离
      var swipSpanY = touch.pageY - this.startY;
      var absY = Math.abs(swipSpanY);

      // x轴滑动距离大于y轴 y轴滑动距离小于阈值, 说明的确是左右滑动
      if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
        evt.preventDefault();
        evt.stopPropagation();

        // 不能循环滚动
        if (!this.isLoop) {
          var currentIndex = this.currentIndex;
          // 第一张图或最后一张图

          if (currentIndex === 0 && swipSpanX > 0 || currentIndex === this.dataList.length - 1 && swipSpanX < 0) {
            // 模拟拉不动操作体验
            swipSpanX /= this.pullRatio;
          }
        }

        // 位移
        this.currentTranslate = (this.swipSpan = swipSpanX) + 'px';
        // 已经满足滚动条件,且正在手指拖动
        this.isMoving = true;
      }
    },
    __touchend: function __touchend() {
      // 如果正在作动画,不作响应
      if (this.isAnimating) {
        return;
      }

      var swipSpan = this.swipSpan,
          swipThreshold = this.swipThreshold,
          currentIndex = this.currentIndex;

      var direction = void 0;

      // 向左
      if (swipSpan < -swipThreshold) {
        // 不能循环滚动
        if (!this.isLoop) {
          // 不是最后一帧
          currentIndex !== this.dataList.length - 1 && (direction = FORWARD);
        } else {
          direction = FORWARD;
        }
      }
      // 向右
      else if (swipSpan > swipThreshold) {
          // 不能循环滚动
          if (!this.isLoop) {
            // 不是第一帧
            currentIndex !== 0 && (direction = BACK);
          } else {
            direction = BACK;
          }
        }
      // 滚动
      swipSpan && this.slide(direction);

      // 开始定时器
      this.startInter();
    },
    __pagerClick: function __pagerClick(index) {
      this.slideToIndex(index);
    },
    __wrapClick: function __wrapClick() {
      this.$emit('click', this.currentIndex);
    },


    // 滚动
    slide: function slide(direction, index) {
      var _this = this;

      // 正在动画
      this.isAnimating = true;

      // 判断滚动方向
      switch (direction) {
        // 向左
        case FORWARD:
        // 向右
        case BACK:
          {
            // 方向状态
            this.direction = direction;
            // 作动画
            this.currentTranslate = this.$el.offsetWidth * direction + 'px';

            // index值为undefined
            index === undefined && (index = this.currentIndex - direction);

            // 触发slide事件
            this.$emit('slide', index, direction);
            break;
          }
        // 没有direction值(说明滑动没有超过swipSpanThreshold)
        default:
          {
            this.currentTranslate = 0;
            this.direction = 0;
          }
      }

      // 复位
      setTimeout(function () {
        // 复位(更新内容)
        _this.reset(index);
      }, this.duration);
    },

    // 复位
    reset: function reset(index) {
      // 重置动画状态
      this.isAnimating = false;

      // 如无index
      if (index === undefined) {
        return;
      }

      // 复位
      this.currentTranslate = 0;

      // 计算index
      var count = this.dataList.length;
      if (index < 0) {
        index = count - 1;
      }
      if (index === count) {
        index = 0;
      }
      // 更新index(更新内容)
      this.currentIndex = index;
    },

    // 滑动到第几帧
    slideToIndex: function slideToIndex(index) {
      var currentIndex = this.currentIndex;
      // index不符合条件

      if (typeof index !== 'number' || index < 0 || index >= this.dataList.length || index === currentIndex) {
        return;
      }

      // 滑动方向
      var direction = void 0;
      // 向左
      if (index > currentIndex) {
        direction = FORWARD;
        this.nextIndex = index;
      }
      // 向右
      else {
          direction = BACK;
          this.prevIndex = index;
        }
      // 滑动操作
      this.slide(direction, index);
    },

    // 开始定时器
    startInter: function startInter() {
      var _this2 = this;

      var autoPlayTimeout = this.autoPlayTimeout;

      if (autoPlayTimeout) {
        this.inter = setInterval(function () {
          _this2.slide(FORWARD);
        }, autoPlayTimeout);
      }
    },

    // 停止定定时器
    stopInter: function stopInter() {
      clearInterval(this.inter);
    },

    // 获取图片样式
    getImgStyle: function getImgStyle(data) {
      return data && { backgroundImage: 'url(' + data + ')' };
    }
  }
};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit;\n}\ninput, textarea {\n  /*输入框可选中文本*/\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle;\n}\nimg {\n  /*图片无边框*/\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n\n/*缩略图高度*/\n/*焦点图*/\n.carouselWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 42px;\n}\n.carouselWrap .pi-carousel.pi-loading .pi-item:before {\n    top: 100px;\n}\n.imgWrap {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  font-size: 15px;\n  color: #999;\n  line-height: 150%;\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.05) 61%, #fff 0%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 61%, #fff 0%);\n  /*页码指示*/\n  /*标题*/\n  /*来源和日期*/\n  /*描述信息*/\n}\n.imgWrap .img {\n    display: block;\n    max-width: 100%;\n    max-height: 60%;\n    min-height: 200px;\n    margin: 0 auto;\n}\n.imgWrap .imgInfo {\n    padding: 15px;\n    background: #fff;\n    min-height: 40%;\n}\n.imgWrap .indicator {\n    font-weight: 100;\n}\n.imgWrap .indicator span {\n      font-size: 30px;\n      color: #333;\n}\n.imgWrap .title {\n    font-size: 20px;\n    padding: 15px 0;\n    color: #333;\n}\n.imgWrap .subTitle {\n    color: #bbb;\n    font-size: 14px;\n    line-height: 100%;\n}\n.imgWrap .subTitle > span {\n      display: inline-block;\n}\n.imgWrap .subTitle > span:not(:first-of-type) {\n        border-left: 1px solid #bbb;\n        margin-left: 12px;\n        padding: 0 12px;\n}\n.imgWrap .desc {\n    padding-top: 15px;\n    text-indent: 2em;\n}\n\n/*缩略图*/\n.thumbWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 42px;\n  white-space: nowrap;\n  overflow-y: hidden;\n  overflow-x: auto;\n}\n.thumb {\n  width: 60px;\n  height: 100%;\n  background: center center;\n  background-size: cover;\n  display: inline-block;\n}\n.thumb:not(:last-of-type) {\n    border-left: 1px solid #fff;\n}\n.thumb.selected {\n    border: 2px solid #06f;\n}\n.thumb.selected + .thumb {\n      border: none;\n}\n", "", {"version":3,"sources":["/./src/view/UcGallery.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,kBAAkB;AAClB;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;EACnB,OAAO;EACP,YAAY;EACZ,gBAAgB;EAChB,mCAAmC;EACnC,+BAA+B;EAC/B,UAAU;EACV,0BAAkB;UAAlB,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;EACzC,UAAU;EACV,4BAA4B;EAC5B,QAAQ;EACR,kCAAkC;CAAE;AAEtC;EACE,eAAe;EACf,mBAAmB;CAAE;AAEvB;EACE,YAAY;EACZ,0BAAkB;UAAlB,kBAAkB;CAAE;AAEtB;EACE,eAAe;EACf,uBAAuB;CAAE;AAE3B;EACE,SAAS;EACT,aAAa;CAAE;AAEjB;EACE,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,mBAAmB;CAAE;;AAEvB,SAAS;AACT,OAAO;AACP;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,aAAa;CAAE;AACf;IACE,WAAW;CAAE;AAEjB;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,gBAAgB;EAChB,YAAY;EACZ,kBAAkB;EAClB,iFAA+E;EAA/E,+EAA+E;EAC/E,QAAQ;EACR,MAAM;EACN,SAAS;EACT,QAAQ;CAAE;AACV;IACE,eAAe;IACf,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,eAAe;CAAE;AACnB;IACE,cAAc;IACd,iBAAiB;IACjB,gBAAgB;CAAE;AACpB;IACE,iBAAiB;CAAE;AACnB;MACE,gBAAgB;MAChB,YAAY;CAAE;AAClB;IACE,gBAAgB;IAChB,gBAAgB;IAChB,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;CAAE;AACpB;MACE,sBAAsB;CAAE;AACxB;QACE,4BAA4B;QAC5B,kBAAkB;QAClB,gBAAgB;CAAE;AACxB;IACE,kBAAkB;IAClB,iBAAiB;CAAE;;AAEvB,OAAO;AACP;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,UAAU;EACV,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;CAAE;AAErB;EACE,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,uBAAuB;EACvB,sBAAsB;CAAE;AACxB;IACE,4BAA4B;CAAE;AAChC;IACE,uBAAuB;CAAE;AACzB;MACE,aAAa;CAAE","file":"UcGallery.vue","sourcesContent":["@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch; }\n\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit; }\n\ninput, textarea {\n  /*输入框可选中文本*/\n  user-select: text; }\n\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle; }\n\nimg {\n  /*图片无边框*/\n  border: none; }\n\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer; }\n\nli {\n  list-style: none; }\n\ni {\n  font-style: normal; }\n\n/*缩略图高度*/\n/*焦点图*/\n.carouselWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 42px; }\n  .carouselWrap .pi-carousel.pi-loading .pi-item:before {\n    top: 100px; }\n\n.imgWrap {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  font-size: 15px;\n  color: #999;\n  line-height: 150%;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 61%, #fff 0%);\n  /*页码指示*/\n  /*标题*/\n  /*来源和日期*/\n  /*描述信息*/ }\n  .imgWrap .img {\n    display: block;\n    max-width: 100%;\n    max-height: 60%;\n    min-height: 200px;\n    margin: 0 auto; }\n  .imgWrap .imgInfo {\n    padding: 15px;\n    background: #fff;\n    min-height: 40%; }\n  .imgWrap .indicator {\n    font-weight: 100; }\n    .imgWrap .indicator span {\n      font-size: 30px;\n      color: #333; }\n  .imgWrap .title {\n    font-size: 20px;\n    padding: 15px 0;\n    color: #333; }\n  .imgWrap .subTitle {\n    color: #bbb;\n    font-size: 14px;\n    line-height: 100%; }\n    .imgWrap .subTitle > span {\n      display: inline-block; }\n      .imgWrap .subTitle > span:not(:first-of-type) {\n        border-left: 1px solid #bbb;\n        margin-left: 12px;\n        padding: 0 12px; }\n  .imgWrap .desc {\n    padding-top: 15px;\n    text-indent: 2em; }\n\n/*缩略图*/\n.thumbWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 42px;\n  white-space: nowrap;\n  overflow-y: hidden;\n  overflow-x: auto; }\n\n.thumb {\n  width: 60px;\n  height: 100%;\n  background: center center;\n  background-size: cover;\n  display: inline-block; }\n  .thumb:not(:last-of-type) {\n    border-left: 1px solid #fff; }\n  .thumb.selected {\n    border: 2px solid #06f; }\n    .thumb.selected + .thumb {\n      border: none; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*可有效减缓闪烁*/\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  /*loading*/\n  /*正在动画*/\n}\n.pi-carousel.pi-animating .pi-wrap {\n    -webkit-transition: -webkit-transform ease 0.4s;\n    transition: -webkit-transform ease 0.4s;\n    transition: transform ease 0.4s;\n    transition: transform ease 0.4s, -webkit-transform ease 0.4s;\n}\n.pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    /*虽然是默认值,但不能省略,以确保auto-prefixer插件准确生成兼容安卓4.0的代码*/\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n}\n.pi-carousel .pi-item {\n    height: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    overflow: hidden;\n}\n.pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%;\n}\n.pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-carousel .pi-pager > span.selected {\n        border-color: #555;\n}\n", "", {"version":3,"sources":["/./src/component/PiCarousel.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,aAAa;AACb;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,yCAAyC;EACzC,YAAY;EACZ,eAAe;EACf,2CAA2C;EAC3C,+BAA+B;EAC/B,MAAM;EACN,mDAA2C;UAA3C,2CAA2C;CAAE;;AAE/C,QAAQ;AACR;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAJnC;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAEnC;EACE,iBAAiB;EACjB,mBAAmB;EACnB,WAAW;EACX,oCAA4B;UAA5B,4BAA4B;EAC5B,WAAW;EACX,QAAQ;CAAE;AACV;IACE,gDAAgC;IAAhC,wCAAgC;IAAhC,gCAAgC;IAAhC,6DAAgC;CAAE;AACpC;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,qBAAc;IAAd,sBAAc;IAAd,cAAc;IACd,iDAAiD;IACjD,+BAAoB;IAApB,8BAAoB;IAApB,4BAAoB;YAApB,oBAAoB;CAAE;AACxB;IACE,aAAa;IACb,oBAAQ;IAAR,gBAAQ;YAAR,QAAQ;IACR,iBAAiB;CAAE;AACnB;MACE,oCAAoC;MACpC,yBAAyB;MACzB,YAAY;MACZ,aAAa;CAAE;AACnB;IACE,mBAAmB;IACnB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,mBAAmB;IACnB,aAAa;IACb,kBAAkB;CAAE;AACpB;MACE,uBAAuB;MACvB,mBAAmB;MACnB,cAAc;CAAE;AAChB;QACE,mBAAmB;CAAE","file":"PiCarousel.vue","sourcesContent":["@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  animation: ani_circle 0.8s linear infinite; }\n\n/*旋转动画*/\n@keyframes ani_circle {\n  0% {\n    transform: rotateZ(0deg); }\n  100% {\n    transform: rotateZ(360deg); } }\n\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*可有效减缓闪烁*/\n  backface-visibility: hidden;\n  /*loading*/\n  /*正在动画*/ }\n  .pi-carousel.pi-animating .pi-wrap {\n    transition: transform ease 0.4s; }\n  .pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    display: flex;\n    /*虽然是默认值,但不能省略,以确保auto-prefixer插件准确生成兼容安卓4.0的代码*/\n    flex-direction: row; }\n  .pi-carousel .pi-item {\n    height: 100%;\n    flex: 1;\n    overflow: hidden; }\n    .pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%; }\n  .pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px; }\n    .pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px; }\n      .pi-carousel .pi-pager > span.selected {\n        border-color: #555; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(9)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(8),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/component/PiCarousel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PiCarousel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d083b4a6", Component.options)
  } else {
    hotAPI.reload("data-v-d083b4a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "carouselWrap"
  }, [_c('pi-carousel', {
    ref: "carousel",
    attrs: {
      "isShowPager": false,
      "isLoop": false,
      "dataList": _vm.dataList
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('div', {
          staticClass: "imgWrap"
        }, [_c('img', {
          staticClass: "img",
          attrs: {
            "src": props.itemData.img
          }
        }), _vm._v(" "), _c('div', {
          staticClass: "imgInfo"
        }, [_c('p', {
          staticClass: "indicator"
        }, [_c('span', [_vm._v(_vm._s(props.index + 1))]), _vm._v("/" + _vm._s(_vm.dataList.length) + "\n                        ")]), _vm._v(" "), _c('p', {
          staticClass: "title"
        }, [_vm._v(_vm._s(_vm.titleInfo.title))]), _vm._v(" "), _c('p', {
          staticClass: "subTitle"
        }, [_c('span', {
          staticClass: "source"
        }, [_vm._v(_vm._s(_vm.titleInfo.source))]), _c('span', {
          staticClass: "time"
        }, [_vm._v(_vm._s(_vm.titleInfo.time))])]), _vm._v(" "), _c('p', {
          staticClass: "desc"
        }, [_vm._v(_vm._s(props.itemData.desc))])])])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    ref: "thumbWrap",
    staticClass: "thumbWrap"
  }, _vm._l((_vm.dataList), function(item, index) {
    return _c('div', {
      staticClass: "thumb",
      class: {
        selected: index === _vm.thumbIndex
      },
      style: ({
        backgroundImage: ("url(" + (item.img) + ")")
      }),
      on: {
        "click": function($event) {
          _vm.__thumbClick(index)
        }
      }
    })
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fea266c8", module.exports)
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pi-carousel",
    class: _vm._class,
    style: (_vm._style),
    attrs: {
      "data-direction": _vm.direction
    },
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
  }, [_c('div', {
    staticClass: "pi-item",
    class: _vm._prevClass
  }, [(_vm.prevData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.getImgStyle(_vm.prevData))
  })], {
    itemData: _vm.prevData,
    index: _vm.prevIndex
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    ref: "currentItem",
    staticClass: "pi-item"
  }, [(_vm.currentData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.getImgStyle(_vm.currentData))
  })], {
    itemData: _vm.currentData,
    index: _vm.currentIndex
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "pi-item",
    class: _vm._nextClass
  }, [(_vm.nextData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.getImgStyle(_vm.nextData))
  })], {
    itemData: _vm.nextData,
    index: _vm.nextIndex
  }) : _vm._e()], 2)]), _vm._v(" "), (_vm.isShowPager) ? _c('div', {
    staticClass: "pi-pager"
  }, [_vm._t("pager", _vm._l((_vm.dataList), function(_, index) {
    return _c('span', {
      class: {
        selected: index === _vm.currentIndex
      },
      on: {
        "click": function($event) {
          _vm.__pagerClick(index)
        }
      }
    })
  }), {
    self: this
  })], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d083b4a6", module.exports)
  }
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("10ca1f40", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d083b4a6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCarousel.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d083b4a6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCarousel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4180f080", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fea266c8\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UcGallery.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fea266c8\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UcGallery.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

},[40]);
//# sourceMappingURL=uc-gallery.js.map