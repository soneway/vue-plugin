webpackJsonp([1],[,,,,,,function(e,t,o){function n(e){s||o(19)}var s=!1,i=o(2)(o(9),o(16),n,null,null);i.options.__file="/Users/soneway/Sites/git/vue-plugin/src/view/Index.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports},,,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(4),s=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default={components:{PiCarousel:s.default},mounted:function(){var e=this.$refs.carousel;e.dataList=["http://img.gd.sohu.com/public/images/2014-07-05/75/53b79a22aa37f.jpg","http://img.gd.sohu.com/public/images/2014-07-05/78/53b7cf18a9dae.png","http://img.gd.sohu.com/public/images/2014-07-05/13/53b7aed8da8f7.jpg","http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f58e12fb9.jpg","http://img.gd.sohu.com/public/images/2014-07-05/97/53b7f46f5488f.jpg","http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f446e7fee.jpg","http://img.gd.sohu.com/public/images/2014-07-05/37/53b7f269dd1ff.jpg","http://img.gd.sohu.com/public/images/2014-07-05/58/53b7f62dc97ac.jpg","http://img.gd.sohu.com/public/images/2014-07-05/89/53b7f5f0398d2.jpg","http://img.gd.sohu.com/public/images/2014-07-05/98/53b7f5e7df185.jpg"],e.$on("slide",function(e){}).$on("click",function(e){console.log(this,e)})}}},,function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=o(0),i=n(s),u=o(6),c=n(u);if(c.default.el="#root",!("ontouchend"in document)){var a=document.createElement("script");a.src="https://soneway.github.io/js/desktouch.js",document.head.appendChild(a)}t.default=new i.default(c.default)},,function(e,t,o){t=e.exports=o(1)(),t.push([e.i,"\n.wrapper {\n  background: #333;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n* {\n  margin: 0;\n  padding: 0;\n}\n",""])},,,function(e,t,o){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"wrapper"},[o("pi-carousel",{ref:"carousel",attrs:{isShowPager:!0,isLoop:!0,autoPlayTimeout:4e3,height:"100%"}})],1)},staticRenderFns:[]},e.exports.render._withStripped=!0},,,function(e,t,o){var n=o(13);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o(3)("0bf75c75",n,!1)}],[11]);