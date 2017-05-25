webpackJsonp([3],{18:function(t,n,e){function i(t){r||e(60)}var r=!1,s=e(1)(e(27),e(51),i,null,null);s.options.__file="/Users/soneway/Sites/github/vue-plugin/src/view/Slider.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] Slider.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},22:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{width:{default:"100%"},height:{default:"100%"},isHorizontal:{default:!1},swipSpanThreshold:{default:6},swipThreshold:{default:50},duration:{default:400},pullRatio:{default:2},index:{default:0},isShowPager:{default:!0},isShowLoading:{default:!0},autoPlayTimeout:{default:0}},data:function(){return{notrans:!1,swipSpan:0,currentIndex:this.index,currentTranslate:0}},computed:{items:function(){return this.$slots.default.filter(function(t){return t.tag})},_class:function(){return[{notrans:this.notrans},{"pi-loading":this.isShowLoading},{horizontal:this.isHorizontal}]},_style:function(){return{width:this.width,height:this.height}},_wrapStyle:function(){var t=this.currentTranslate,n=this.currentIndex,e=this.isHorizontal,i=this.$el,r=this.items,s=this.swipSpan,o=r.length,a=void 0;if(s)(0===n&&s>0||n===o-1&&s<0)&&(s/=this.pullRatio),a=t+s;else if(i){var l=e?i.offsetWidth:i.offsetHeight;a=this.currentTranslate=-n*l,r.forEach(function(t,e){var i=t.elm;e===n?i.setAttribute("current",""):i.removeAttribute("current")})}var u={transform:"translate3d("+(e?a+"px,0,0":"0,"+a+"px,0")+")",transitionDuration:this.duration/1e3+"s"},d=100*o+"%";return e?u.width=d:u.height=d,u}},mounted:function(){this.initSlots(),this.startInter()},methods:{initSlots:function(){var t=this,n=this.$el,e=this.currentIndex;this.items.forEach(function(i,r){var s=i.elm;if(r===e&&s.setAttribute("current",""),e>0){var o=t.isHorizontal?n.offsetWidth:n.offsetHeight;t.currentTranslate=-e*o}})},__touchstart:function(t){var n=t.targetTouches?t.targetTouches[0]:t;this.startX=n.pageX,this.startY=n.pageY,this.swipSpan=0,this.isMoving=!1,this.notrans=!0,this.stopInter()},__touchmove:function(t){var n=t.targetTouches?t.targetTouches[0]:t,e=n.pageX-this.startX,i=Math.abs(e),r=n.pageY-this.startY,s=Math.abs(r);this.isHorizontal?(this.isMoving||s<i||s<this.swipSpanThreshold)&&(t.preventDefault(),t.stopPropagation(),this.swipSpan=e,this.isMoving=!0):(this.isMoving||i<s||i<this.swipSpanThreshold)&&(t.preventDefault(),t.stopPropagation(),this.swipSpan=r,this.isMoving=!0)},__touchend:function(){var t=this.swipSpan,n=this.swipThreshold,e=this.items,i=this.currentIndex,r=e.length;t>n?0!==i&&--this.currentIndex:t<-n&&i!==r-1&&++this.currentIndex,this.notrans=!1,this.swipSpan=0,this.startInter()},__pagerClick:function(t){this.slideToIndex(t)},__wrapClick:function(){this.$emit("click",this.currentIndex)},slideToIndex:function(t){"number"!=typeof t||t<0||t>=this.items.length||(this.currentIndex=t)},startInter:function(){var t=this,n=this.autoPlayTimeout,e=this.items.length;n&&(this.inter=setInterval(function(){t.currentIndex===e-1?t.currentIndex=0:++t.currentIndex},n))},stopInter:function(){clearInterval(this.inter)}}}},27:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(49),r=e.n(i);n.default={components:{PiSlider:r.a},mounted:function(){},methods:{}}},32:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(3),r=(e.n(i),e(4)),s=e.n(r),o=e(18),a=e.n(o);if(a.a.el="#root",!("ontouchend"in document)){var l=document.createElement("script");l.src="https://soneway.github.io/js/desktouch.js",document.head.appendChild(l)}n.default=new s.a(a.a)},36:function(t,n,e){n=t.exports=e(0)(),n.push([t.i,'\n@charset "UTF-8";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  overflow-x: hidden;\n  /*可继承*/\n  color: #333;\n  font-size: 14px;\n  font-family: helvetica, sans-serif;\n  -webkit-text-size-adjust: none;\n  /*禁止选中文本*/\n  -webkit-user-select: none;\n          user-select: none;\n  /*部分浏览器点选时会有淡蓝色框,这样可以去掉*/\n  -webkit-tap-highlight-color: transparent;\n  /*禁止保存图片*/\n  -webkit-touch-callout: none;\n  /*滚动平滑*/\n  -webkit-overflow-scrolling: touch;\n}\ninput, textarea, select {\n  font-size: inherit;\n}\ninput, textarea {\n  -webkit-user-select: text;\n          user-select: text;\n}\nimg, input {\n  vertical-align: middle;\n}\nimg {\n  border: none;\n}\na {\n  outline: none;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\nli {\n  list-style: none;\n}\ni {\n  font-style: normal;\n}\n.wrapper {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.wrapper .img {\n    background: center center no-repeat;\n    background-size: contain;\n}\n',""])},42:function(t,n,e){n=t.exports=e(0)(),n.push([t.i,"\n@charset \"UTF-8\";\n/*loading样式*/\n.loading:before, .pi-slider.pi-loading .pi-wrap > :before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n.pi-slider {\n  overflow: hidden;\n  position: relative;\n  /*没有动画*/\n  /*loading*/\n  /*水平方向*/\n}\n.pi-slider.notrans .pi-wrap {\n    -webkit-transition: none;\n    transition: none;\n}\n.pi-slider.horizontal .pi-wrap {\n    height: 100%;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n}\n.pi-slider.horizontal .pi-wrap > * {\n      height: 100%;\n}\n.pi-slider .pi-wrap {\n    width: 100%;\n    -webkit-transition: -webkit-transform ease;\n    transition: -webkit-transform ease;\n    transition: transform ease;\n    transition: transform ease, -webkit-transform ease;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n            flex-direction: column;\n}\n.pi-slider .pi-wrap > * {\n      display: block;\n      -webkit-box-flex: 1;\n      -webkit-flex: 1;\n              flex: 1;\n      overflow: hidden;\n      position: relative;\n}\n.pi-slider .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-slider .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-slider .pi-pager > span.selected {\n        border-color: #555;\n}\n",""])},49:function(t,n,e){function i(t){r||e(66)}var r=!1,s=e(1)(e(22),e(57),i,null,null);s.options.__file="/Users/soneway/Sites/github/vue-plugin/src/component/PiSlider.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] PiSlider.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},51:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"wrapper"},[e("pi-slider",{ref:"slider",attrs:{isHorizontal:!0,autoPlayTimeout:0,index:0,isShowPager:!0}},[e("div",{staticClass:"img",staticStyle:{"background-image":"url(https://soneway.github.io/jq/example/dist/img/1.jpg)"}}),t._v(" "),e("div",{staticClass:"img",staticStyle:{"background-image":"url(https://soneway.github.io/jq/example/dist/img/2.jpg)"}}),t._v(" "),e("div",{staticClass:"img",staticStyle:{"background-image":"url(https://soneway.github.io/jq/example/dist/img/3.jpg)"}}),t._v(" "),e("div",{staticClass:"img",staticStyle:{"background-image":"url(https://soneway.github.io/jq/example/dist/img/4.jpg)"}}),t._v(" "),e("div",{staticClass:"img",staticStyle:{"background-image":"url(https://soneway.github.io/jq/example/dist/img/5.jpg)"}})])],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},57:function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"pi-slider",class:t._class,style:t._style,on:{touchstart:t.__touchstart,touchmove:t.__touchmove,touchend:t.__touchend}},[e("div",{staticClass:"pi-wrap",style:t._wrapStyle,on:{click:t.__wrapClick}},[t._t("default")],2),t._v(" "),t.isShowPager?e("div",{staticClass:"pi-pager"},[t._t("pager",t._l(t.items,function(n,i){return e("span",{class:{selected:i===t.currentIndex},on:{click:function(n){t.__pagerClick(i)}}})}),{items:t.items})],2):t._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0},60:function(t,n,e){var i=e(36);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(2)("2d410d65",i,!1)},66:function(t,n,e){var i=e(42);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(2)("6f5f88f8",i,!1)}},[32]);