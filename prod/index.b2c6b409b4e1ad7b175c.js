webpackJsonp([4],{17:function(e,n,t){function o(e){i||t(64)}var i=!1,r=t(1)(t(26),t(55),o,null,null);r.options.__file="/Users/soneway/Sites/github/vue-plugin/src/view/Index.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},26:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=["carousel","uc-gallery","slider","msgbox"];n.default={data:{url:o[0],urls:o},methods:{__linckClick:function(e){this.url=e}}}},31:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t(3),i=t.n(o),r=t(17),s=t.n(r);if(s.a.el="#root",!("ontouchend"in document)){var l=document.createElement("script");l.src="https://soneway.github.io/js/desktouch.js",document.head.appendChild(l)}n.default=new i.a(s.a)},42:function(e,n,t){n=e.exports=t(0)(),n.push([e.i,"\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n.linkWrap {\n  line-height: 40px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  z-index: 1;\n}\n.linkWrap > a {\n    display: inline-block;\n    padding: 0 10px;\n}\n.linkWrap > a.selected {\n      box-shadow: 0 2px 0 0 #09f inset;\n}\niframe {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  border: none;\n}\n",""])},55:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"wrapper"},[t("div",{staticClass:"linkWrap"},e._l(e.urls,function(n){return t("a",{class:{selected:n===e.url},on:{click:function(t){e.__linckClick(n)}}},[e._v(e._s(n))])})),e._v(" "),t("iframe",{attrs:{src:e.url+".html"}})],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},64:function(e,n,t){var o=t(42);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t(2)("0bf75c75",o,!1)}},[31]);