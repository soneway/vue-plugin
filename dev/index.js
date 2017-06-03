webpackJsonp([5],{

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(71)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(61),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/soneway/Sites/github/vue-plugin/src/view/Index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72ea8cec", Component.options)
  } else {
    hotAPI.reload("data-v-72ea8cec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 26:
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

var urls = ['carousel', 'uc-gallery', 'slider', 'msgbox'];

exports.default = {
  data: function data() {
    return {
      url: urls[0],
      urls: urls
    };
  },

  methods: {
    __linckClick: function __linckClick(url) {
      this.url = url;
    }
  }
};

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var _vueRuntime = __webpack_require__(4);

var _vueRuntime2 = _interopRequireDefault(_vueRuntime);

var _Index = __webpack_require__(16);

var _Index2 = _interopRequireDefault(_Index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Index2.default.el = '#root'; // common.js
exports.default = new _vueRuntime2.default(_Index2.default);

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit;\n}\ninput, textarea {\n  /*输入框可选中文本*/\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle;\n}\nimg {\n  /*图片无边框*/\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.linkWrap {\n  line-height: 40px;\n  height: 40px;\n  overflow-y: hidden;\n  overflow-x: auto;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  z-index: 1;\n  white-space: nowrap;\n}\n.linkWrap > a {\n    display: inline-block;\n    padding: 0 10px;\n}\n.linkWrap > a.selected {\n      box-shadow: 0 -2px 0 0 #09f inset;\n}\niframe {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  border: none;\n}\n", "", {"version":3,"sources":["/./src/view/Index.vue"],"names":[],"mappings":";AAAA,iBAAiB;AACjB,kBAAkB;AAClB;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;CAAE;AAE3B;EACE,mBAAmB;EACnB,OAAO;EACP,YAAY;EACZ,gBAAgB;EAChB,mCAAmC;EACnC,+BAA+B;EAC/B,UAAU;EACV,0BAAkB;UAAlB,kBAAkB;EAClB,yBAAyB;EACzB,yCAAyC;EACzC,UAAU;EACV,4BAA4B;EAC5B,QAAQ;EACR,kCAAkC;CAAE;AAEtC;EACE,eAAe;EACf,mBAAmB;CAAE;AAEvB;EACE,YAAY;EACZ,0BAAkB;UAAlB,kBAAkB;CAAE;AAEtB;EACE,eAAe;EACf,uBAAuB;CAAE;AAE3B;EACE,SAAS;EACT,aAAa;CAAE;AAEjB;EACE,cAAc;EACd,eAAe;EACf,sBAAsB;EACtB,gBAAgB;CAAE;AAEpB;EACE,iBAAiB;CAAE;AAErB;EACE,mBAAmB;CAAE;AAEvB;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,qBAAc;EAAd,sBAAc;EAAd,cAAc;EACd,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;UAAvB,uBAAuB;CAAE;AAE3B;EACE,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,iBAAiB;EACjB,yCAAyC;EACzC,WAAW;EACX,oBAAoB;CAAE;AACtB;IACE,sBAAsB;IACtB,gBAAgB;CAAE;AAClB;MACE,kCAAkC;CAAE;AAE1C;EACE,oBAAQ;EAAR,gBAAQ;UAAR,QAAQ;EACR,aAAa;CAAE","file":"Index.vue","sourcesContent":["@charset \"UTF-8\";\n/*基础样式,作用类似reset*/\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch; }\n\ninput, textarea, select {\n  /*表单元素字体大小可继承*/\n  font-size: inherit; }\n\ninput, textarea {\n  /*输入框可选中文本*/\n  user-select: text; }\n\nimg, input {\n  /*图片和输入元素垂直居中*/\n  vertical-align: middle; }\n\nimg {\n  /*图片无边框*/\n  border: none; }\n\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer; }\n\nli {\n  list-style: none; }\n\ni {\n  font-style: normal; }\n\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column; }\n\n.linkWrap {\n  line-height: 40px;\n  height: 40px;\n  overflow-y: hidden;\n  overflow-x: auto;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  z-index: 1;\n  white-space: nowrap; }\n  .linkWrap > a {\n    display: inline-block;\n    padding: 0 10px; }\n    .linkWrap > a.selected {\n      box-shadow: 0 -2px 0 0 #09f inset; }\n\niframe {\n  flex: 1;\n  border: none; }\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "linkWrap"
  }, _vm._l((_vm.urls), function(item) {
    return _c('a', {
      class: {
        selected: item === _vm.url
      },
      on: {
        "click": function($event) {
          _vm.__linckClick(item)
        }
      }
    }, [_vm._v(_vm._s(item))])
  })), _vm._v(" "), _c('iframe', {
    attrs: {
      "src": (_vm.url + ".html")
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72ea8cec", module.exports)
  }
}

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("75c3f352", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ea8cec\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72ea8cec\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

},[32]);
//# sourceMappingURL=index.js.map