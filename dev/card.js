webpackJsonp([1],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 获取uid函数
var getUid = function () {
  var uid = 0;
  return function () {
    return ++uid;
  };
}();

// 获取?或者&号
function getSymbol(url) {
  return url.indexOf('?') < 0 ? '?' : '&';
}

// 判断是否为function函数
function isFunction(fn) {
  return typeof fn === 'function';
}

// 加载js函数
var getScript = function () {
  var headEl = document.head;
  var jsReg = /(\.js)$/;

  return function (url, fn) {
    var isJs = jsReg.test(url);
    var scriptEl = document.createElement('script');

    // type
    scriptEl.type = 'text/javascript';

    // onload
    scriptEl.onload = function () {
      isFunction(fn) && fn();
      isJs || headEl.removeChild(scriptEl);
    };

    // onerror
    scriptEl.onerror = function (err) {
      isFunction(fn) && fn(err);
    };

    // 请求
    scriptEl.src = url;
    headEl.appendChild(scriptEl);
  };
}();

// get数据函数
function get(opts) {
  // 配置项
  opts = Object.assign({}, get.defaults, opts);
  var _opts = opts,
      url = _opts.url,
      data = _opts.data;
  // callback可用于统计

  var _opts2 = opts,
      success = _opts2.success,
      error = _opts2.error,
      callback = _opts2.callback;

  // url判断

  if (!url) {
    return console.error('请求的url不能为空');
  }

  // 回调函数名
  var cbName = 'jsonpcb' + getUid();

  // 将回调函数添加到全局变量
  window[cbName] = function (rs) {
    // 回调
    isFunction(success) && success(rs);
    isFunction(callback) && callback(opts, rs);
    // 释放回调函数
    window[cbName] = null;
  };

  // url中添加callback
  Object.assign(data || (data = {}), {
    callback: cbName
  });

  // 拼接data
  if (data) {
    url += getSymbol(url) + Object.keys(data).map(function (item) {
      return item + '=' + encodeURIComponent(data[item]);
    }).join('&');
  }

  // 发起请求
  getScript(url, function (err) {
    // js加载出错
    if (err) {
      // 回调
      isFunction(error) && error(err);
      isFunction(callback) && callback(opts);
      // 释放回调函数
      window[cbName] = null;
    }
  });
}
// get数据默认配置项
get.defaults = {};

// post数据函数
var post = function () {
  // 回调函数对象
  var msgcb = {};
  var bodyEl = document.body;
  // 临时元素
  var tmpEl = document.createElement('div');

  // 绑定消息事件
  window.addEventListener('message', function (evt) {
    var data = evt.data;

    // data转对象

    (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' || (data = JSON.parse(data || null) || {});

    // 回调函数
    var callback = msgcb[data.id];
    isFunction(callback) && callback(data.rs);
  });

  return function (opts) {
    // 配置项
    opts = Object.assign({}, post.defaults, opts);
    var _opts3 = opts,
        success = _opts3.success,
        error = _opts3.error,
        callback = _opts3.callback,
        formSelector = _opts3.formSelector,
        url = _opts3.url,
        method = _opts3.method,
        data = _opts3.data,
        enctype = _opts3.enctype;

    // iframe元素

    var ifrId = 'postifr' + getUid();
    tmpEl.innerHTML = '<iframe name="' + ifrId + '" style="display: none;"></iframe>';
    var ifrEl = tmpEl.childNodes[0];
    bodyEl.appendChild(ifrEl);

    // form元素
    var formEl = void 0;
    // 页面中已存在的form提交
    if (formSelector) {
      formEl = document.querySelector(formSelector);
      // 请求url中添加callback信息
      var _formEl = formEl,
          action = _formEl.action;

      formEl.action = action + getSymbol(action) + 'msgcb=' + ifrId;
    }
    // 动态生成的form提交
    else {
        // 请求url
        var _action = url + getSymbol(url) + 'msgcb=' + ifrId;
        // 数据添加到form的input
        var inputHtml = data && Object.keys(data).map(function (key) {
          return '<input type="hidden" name="' + key + '" value="' + data[key] + '"/>';
        }).join('');
        tmpEl.innerHTML = '<form style="display: none;" method="' + method + '" action="' + _action + '">' + inputHtml + '</form>';
        formEl = tmpEl.childNodes[0];
      }
    // target
    formEl.target = ifrId;
    // enctype
    enctype && (formEl.enctype = enctype);

    // message事件响应函数
    msgcb[ifrId] = function (rs) {
      // 回调
      isFunction(success) && success(rs);
      isFunction(callback) && callback(opts, rs);
      // 释放回调函数
      msgcb[ifrId] = null;

      // 删除节点
      bodyEl.removeChild(ifrEl);
      formSelector || bodyEl.removeChild(formEl);
    };

    // iframe onload事件,主要处理请求失败
    ifrEl.onload = function () {
      // 延迟运行
      setTimeout(function () {
        // 如果回调还在,说明没有成功回调,即发生错误
        if (msgcb[ifrId]) {
          // 回调
          isFunction(error) && error();
          isFunction(callback) && callback(opts);
          // 释放回调函数
          msgcb[ifrId] = null;

          // 删除节点
          bodyEl.removeChild(ifrEl);
          formSelector || bodyEl.removeChild(formEl);
        }
      }, 100);
    };

    // 提交
    formSelector || bodyEl.appendChild(formEl);
    formEl.submit();
  };
}();
// post数据默认配置项
post.defaults = {
  method: 'POST'
};

exports.default = {
  // 加载js函数
  getScript: getScript,
  // get数据函数
  get: get,
  // post数据函数
  post: post
};

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// 获取图片数据
var getImgs = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var rs, articles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return get('/iflow/api/v1/channel/100?method=new');

          case 2:
            rs = _context.sent;

            if (rs) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            articles = Object.getValByPath(rs, 'data.articles', {});
            return _context.abrupt('return', Object.keys(articles).map(function (key) {
              return Object.getValByPath(articles, key + '.images.0.url');
            }).filter(function (item) {
              return item;
            }));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getImgs() {
    return _ref.apply(this, arguments);
  };
}();

var _jsonp = __webpack_require__(10);

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var origin = 'https://m.uczzd.cn';

// get请求函数,对应jsonp
function get(pathname, data) {
  return new Promise(function (resolve) {
    _jsonp2.default.get({
      url: origin + pathname,
      data: data,
      success: function success(rs) {
        resolve(rs);
      },
      error: function error() {
        resolve();
      }
    });
  });
}

// post请求函数
function post(opts) {}exports.default = {
  get: get,
  post: post,
  getImgs: getImgs
};

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(77)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(66),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/view/Card.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Card.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-85d7aaf0", Component.options)
  } else {
    hotAPI.reload("data-v-85d7aaf0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 21:
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
  props: Object.assign({}, _PiCarousel2.default.props)
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

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PiCard = __webpack_require__(55);

var _PiCard2 = _interopRequireDefault(_PiCard);

var _request = __webpack_require__(11);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: {
    PiCard: _PiCard2.default
  },
  data: function data() {
    return {
      dataList: ['https://soneway.github.io/jq/example/dist/img/1.jpg', 'https://soneway.github.io/jq/example/dist/img/2.jpg', 'https://soneway.github.io/jq/example/dist/img/3.jpg', 'https://soneway.github.io/jq/example/dist/img/4.jpg', 'https://soneway.github.io/jq/example/dist/img/5.jpg']
    };
  },
  mounted: function mounted() {},

  methods: {}
};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var _vueRuntime = __webpack_require__(4);

var _vueRuntime2 = _interopRequireDefault(_vueRuntime);

var _Card = __webpack_require__(14);

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Card2.default.el = '#root'; // common.js
exports.default = new _vueRuntime2.default(_Card2.default);

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.pi-card {\n  -webkit-transform: scale3d(0.68, 0.68, 1);\n          transform: scale3d(0.68, 0.68, 1);\n  /*样式覆盖*/\n  /*动画状态,且左右切换*/\n}\n.pi-card.pi-card {\n    overflow: visible;\n}\n.pi-card.pi-animating:not([data-direction=\"0\"]) .pi-item {\n    -webkit-transition: all ease 0.4s;\n    transition: all ease 0.4s;\n    /*动画中的当前元素缩小小*/\n}\n.pi-card.pi-animating:not([data-direction=\"0\"]) .pi-item:nth-of-type(2) {\n      -webkit-transform: scale3d(0.68, 0.68, 1);\n              transform: scale3d(0.68, 0.68, 1);\n}\n.pi-card .pi-item {\n    /*非当前元素*/\n}\n.pi-card .pi-item:nth-of-type(1), .pi-card .pi-item:nth-of-type(3) {\n      /*非临时当前元素缩小*/\n}\n.pi-card .pi-item:nth-of-type(1):not(.temp-current), .pi-card .pi-item:nth-of-type(3):not(.temp-current) {\n        -webkit-transform: scale3d(0.68, 0.68, 1);\n                transform: scale3d(0.68, 0.68, 1);\n}\n", "", {"version":3,"sources":["/./src/component/PiCard.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB;EACE,0CAAkC;UAAlC,kCAAkC;EAClC,QAAQ;EACR,cAAc;CAAE;AAChB;IACE,kBAAkB;CAAE;AACtB;IACE,kCAA0B;IAA1B,0BAA0B;IAC1B,eAAe;CAAE;AACjB;MACE,0CAAkC;cAAlC,kCAAkC;CAAE;AACxC;IACE,SAAS;CAAE;AACX;MACE,aAAa;CAAE;AACf;QACE,0CAAkC;gBAAlC,kCAAkC;CAAE","file":"PiCard.vue","sourcesContent":["@charset \"UTF-8\";\n.pi-card {\n  transform: scale3d(0.68, 0.68, 1);\n  /*样式覆盖*/\n  /*动画状态,且左右切换*/ }\n  .pi-card.pi-card {\n    overflow: visible; }\n  .pi-card.pi-animating:not([data-direction=\"0\"]) .pi-item {\n    transition: all ease 0.4s;\n    /*动画中的当前元素缩小小*/ }\n    .pi-card.pi-animating:not([data-direction=\"0\"]) .pi-item:nth-of-type(2) {\n      transform: scale3d(0.68, 0.68, 1); }\n  .pi-card .pi-item {\n    /*非当前元素*/ }\n    .pi-card .pi-item:nth-of-type(1), .pi-card .pi-item:nth-of-type(3) {\n      /*非临时当前元素缩小*/ }\n      .pi-card .pi-item:nth-of-type(1):not(.temp-current), .pi-card .pi-item:nth-of-type(3):not(.temp-current) {\n        transform: scale3d(0.68, 0.68, 1); }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit;\n}\ninput, textarea {\n  /*输入框可选中文本*/\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle;\n}\nimg {\n  /*图片无边框*/\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  overflow: hidden;\n}\n", "", {"version":3,"sources":["/./src/view/Card.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,kBAAkB;AAClB;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;EACnB,OAAO;EACP,YAAY;EACZ,gBAAgB;EAChB,mCAAmC;EACnC,+BAA+B;EAC/B,UAAU;EACV,0BAAkB;UAAlB,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;EACzC,UAAU;EACV,4BAA4B;EAC5B,QAAQ;EACR,kCAAkC;CAAE;AAEtC;EACE,eAAe;EACf,mBAAmB;CAAE;AAEvB;EACE,YAAY;EACZ,0BAAkB;UAAlB,kBAAkB;CAAE;AAEtB;EACE,eAAe;EACf,uBAAuB;CAAE;AAE3B;EACE,SAAS;EACT,aAAa;CAAE;AAEjB;EACE,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,iBAAiB;CAAE","file":"Card.vue","sourcesContent":["@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch; }\n\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit; }\n\ninput, textarea {\n  /*输入框可选中文本*/\n  user-select: text; }\n\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle; }\n\nimg {\n  /*图片无边框*/\n  border: none; }\n\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer; }\n\nli {\n  list-style: none; }\n\ni {\n  font-style: normal; }\n\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  overflow: hidden; }\n"],"sourceRoot":"webpack://"}]);

// exports


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
    imgStyle: function imgStyle(data) {
      return data && { backgroundImage: 'url(' + data + ')' };
    }
  }
};

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(70)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(59),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/component/PiCard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PiCard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-016309dd", Component.options)
  } else {
    hotAPI.reload("data-v-016309dd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('pi-carousel', {
    staticClass: "pi-card",
    attrs: {
      "isShowPager": _vm.isShowPager,
      "width": _vm.width,
      "height": _vm.height,
      "dataList": _vm.dataList,
      "swipSpanThreshold": _vm.swipSpanThreshold,
      "swipThreshold": _vm.swipThreshold,
      "duration": _vm.duration,
      "pullRatio": _vm.pullRatio,
      "isLoop": _vm.isLoop,
      "index": _vm.index,
      "isShowLoading": _vm.isShowLoading,
      "autoPlayTimeout": _vm.autoPlayTimeout
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-016309dd", module.exports)
  }
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*可有效减缓闪烁*/\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  /*loading*/\n  /*正在动画*/\n}\n.pi-carousel.pi-animating .pi-wrap {\n    -webkit-transition: -webkit-transform ease 0.4s;\n    transition: -webkit-transform ease 0.4s;\n    transition: transform ease 0.4s;\n    transition: transform ease 0.4s, -webkit-transform ease 0.4s;\n}\n.pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    /*虽然是默认值,但不能省略,以确保auto-prefixer插件准确生成兼容安卓4.0的代码*/\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n}\n.pi-carousel .pi-item {\n    height: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    overflow: hidden;\n}\n.pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%;\n}\n.pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-carousel .pi-pager > span.selected {\n        border-color: #555;\n}\n", "", {"version":3,"sources":["/./src/component/PiCarousel.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,aAAa;AACb;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,yCAAyC;EACzC,YAAY;EACZ,eAAe;EACf,2CAA2C;EAC3C,+BAA+B;EAC/B,MAAM;EACN,mDAA2C;UAA3C,2CAA2C;CAAE;;AAE/C,QAAQ;AACR;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAJnC;AACE;IACE,iCAAyB;YAAzB,yBAAyB;CAAE;AAC7B;IACE,mCAA2B;YAA3B,2BAA2B;CAAE;CAAE;AAEnC;EACE,iBAAiB;EACjB,mBAAmB;EACnB,WAAW;EACX,oCAA4B;UAA5B,4BAA4B;EAC5B,WAAW;EACX,QAAQ;CAAE;AACV;IACE,gDAAgC;IAAhC,wCAAgC;IAAhC,gCAAgC;IAAhC,6DAAgC;CAAE;AACpC;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,qBAAc;IAAd,sBAAc;IAAd,cAAc;IACd,iDAAiD;IACjD,+BAAoB;IAApB,8BAAoB;IAApB,4BAAoB;YAApB,oBAAoB;CAAE;AACxB;IACE,aAAa;IACb,oBAAQ;IAAR,gBAAQ;YAAR,QAAQ;IACR,iBAAiB;CAAE;AACnB;MACE,oCAAoC;MACpC,yBAAyB;MACzB,YAAY;MACZ,aAAa;CAAE;AACnB;IACE,mBAAmB;IACnB,QAAQ;IACR,SAAS;IACT,UAAU;IACV,mBAAmB;IACnB,aAAa;IACb,kBAAkB;CAAE;AACpB;MACE,uBAAuB;MACvB,mBAAmB;MACnB,cAAc;CAAE;AAChB;QACE,mBAAmB;CAAE","file":"PiCarousel.vue","sourcesContent":["@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-carousel.pi-loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  animation: ani_circle 0.8s linear infinite; }\n\n/*旋转动画*/\n@keyframes ani_circle {\n  0% {\n    transform: rotateZ(0deg); }\n  100% {\n    transform: rotateZ(360deg); } }\n\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*可有效减缓闪烁*/\n  backface-visibility: hidden;\n  /*loading*/\n  /*正在动画*/ }\n  .pi-carousel.pi-animating .pi-wrap {\n    transition: transform ease 0.4s; }\n  .pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    display: flex;\n    /*虽然是默认值,但不能省略,以确保auto-prefixer插件准确生成兼容安卓4.0的代码*/\n    flex-direction: row; }\n  .pi-carousel .pi-item {\n    height: 100%;\n    flex: 1;\n    overflow: hidden; }\n    .pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%; }\n  .pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px; }\n    .pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px; }\n      .pi-carousel .pi-pager > span.selected {\n        border-color: #555; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('pi-card', {
    attrs: {
      "dataList": _vm.dataList
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-85d7aaf0", module.exports)
  }
}

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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("77195cc9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-016309dd\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCard.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-016309dd\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PiCard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3d0a1e96", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85d7aaf0\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Card.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85d7aaf0\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Card.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
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
    style: (_vm.imgStyle(_vm.prevData))
  })], {
    itemData: _vm.prevData,
    index: _vm.currentIndex - 1
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    ref: "currentItem",
    staticClass: "pi-item"
  }, [(_vm.currentData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.imgStyle(_vm.currentData))
  })], {
    itemData: _vm.currentData,
    index: _vm.currentIndex
  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "pi-item",
    class: _vm._nextClass
  }, [(_vm.nextData) ? _vm._t("default", [_c('div', {
    staticClass: "pi-img",
    style: (_vm.imgStyle(_vm.nextData))
  })], {
    itemData: _vm.nextData,
    index: _vm.currentIndex + 1
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
    dataList: _vm.dataList
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

/***/ })

},[31]);
//# sourceMappingURL=card.js.map