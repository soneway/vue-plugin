webpackJsonp([1],[,,,,function(t,n){Object.assign||(Object.assign=function(t){return[].slice.call(arguments,1).forEach(function(n){Object.keys(n).forEach(function(e){t[e]=n[e]})}),t})},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default={props:{width:{default:"100%"},height:{default:"100%"},dataList:{default:[]},swipSpanThreshold:{default:6},swipThreshold:{default:50},duration:{default:300},pullRatio:{default:2},isLoop:{default:!0},currentIndex:{default:0},isShowPager:{default:!0},isShowLoading:{default:!0},autoPlayTimeout:{default:0}},data:function(){return{notrans:!1,translate:0,prevData$:null,nextData$:null}},computed:{prevData:{set:function(t){this.prevData$=t},get:function(){var t=this.dataList,n=this.prevData$,e=this.currentIndex;if(n)return this.prevData$=null,n;var i=e-1;if(i<0){if(!this.isLoop)return;i=t.length-1}return t[i]}},currentData:function(){return this.dataList[this.currentIndex]},nextData:{set:function(t){this.nextData$=t},get:function(){var t=this.dataList,n=this.nextData$,e=this.currentIndex;if(n)return this.nextData$=null,n;var i=e+1;if(i===t.length){if(!this.isLoop)return;i=0}return t[i]}},carouselClass:function(){return[{notrans:this.notrans},{loading:this.isShowLoading}]},carouselStyle:function(){return{width:this.width,height:this.height}},wrapStyle:function(){return{transform:"translate3d("+this.translate+",0,0)",transitionDuration:this.duration/1e3+"s"}}},mounted:function(){this.startInter()},methods:{__touchstart:function(t){if(!this.isAnimating){var n=t.targetTouches?t.targetTouches[0]:t;this.startX=n.pageX,this.startY=n.pageY,this.swipSpan=0,this.isMoving=!1,this.notrans=!0,this.stopInter()}},__touchmove:function(t){if(this.isAnimating)return t.preventDefault(),void t.stopPropagation();var n=t.targetTouches?t.targetTouches[0]:t,e=n.pageX-this.startX,i=Math.abs(e),a=n.pageY-this.startY,s=Math.abs(a);if(this.isMoving||s<i||s<this.swipSpanThreshold){if(t.preventDefault(),t.stopPropagation(),!this.isLoop){var r=this.currentIndex;(0===r&&e>0||r===this.dataList.length-1&&e<0)&&(e/=this.pullRatio)}this.translate=(this.swipSpan=e)+"px",this.isMoving=!0}},__touchend:function(){if(!this.isAnimating){var t=this.swipSpan,n=this.swipThreshold,e=this.currentIndex,i=void 0;t<-n?this.isLoop?i=-1:e!==this.dataList.length-1&&(i=-1):t>n&&(this.isLoop?i=1:0!==e&&(i=1)),t&&this.slide(i),this.startInter()}},__pagerClick:function(t){this.slideToIndex(t)},__wrapClick:function(){this.$emit("click",this.currentIndex)},slide:function(t,n){var e=this;switch(this.notrans=!1,t){case-1:case 1:this.isAnimating=!0,this.translate=100/3*t+"%",void 0===n&&(n=this.currentIndex-t),setTimeout(function(){e.reset(n),e.$emit("slide",n,t)},this.duration);break;default:this.translate=0}},reset:function(t){this.notrans=!0,this.translate=0;var n=this.dataList.length;t<0&&(t=n-1),t===n&&(t=0),this.currentIndex=t,this.isAnimating=!1},slideToIndex:function(t){var n=this.dataList,e=this.currentIndex;if(!("number"!=typeof t||t<0||t>=n.length||t===e)){var i=void 0;t>e?(i=-1,this.nextData=n[t]):(i=1,this.prevData=n[t]),this.slide(i,t)}},startInter:function(){var t=this,n=this.autoPlayTimeout;n&&(this.inter=setInterval(function(){t.slide(-1)},n))},stopInter:function(){clearInterval(this.inter)},imgStyle:function(t){return t&&{backgroundImage:"url("+t+")"}}}}},function(t,n,e){n=t.exports=e(0)(),n.push([t.i,"\n@charset \"UTF-8\";\n.pi-carousel {\n  overflow: hidden;\n  position: relative;\n  /*没有动画*/\n  /*loading*/\n}\n.pi-carousel.notrans .pi-wrap {\n    -webkit-transition: none;\n    transition: none;\n}\n.pi-carousel .pi-wrap {\n    width: 300%;\n    height: 100%;\n    margin-left: -100%;\n    -webkit-transition: -webkit-transform ease;\n    transition: -webkit-transform ease;\n    transition: transform ease;\n    transition: transform ease, -webkit-transform ease;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n            flex-direction: row;\n}\n.pi-carousel .pi-item {\n    height: 100%;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n    overflow: hidden;\n}\n.pi-carousel .pi-item .pi-img {\n      background: center center no-repeat;\n      background-size: contain;\n      width: 100%;\n      height: 100%;\n}\n.pi-carousel .pi-pager {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    text-align: center;\n    font-size: 0;\n    line-height: 20px;\n}\n.pi-carousel .pi-pager > span {\n      border: 3px solid #bbb;\n      border-radius: 50%;\n      margin: 0 2px;\n}\n.pi-carousel .pi-pager > span.selected {\n        border-color: #555;\n}\n\n/*loading样式*/\n.pi-loading:before, .pi-carousel.loading .pi-item:before {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 40px;\n  height: 40px;\n  margin-left: -20px;\n  margin-top: -20px;\n  border-radius: 40px;\n  /*如.loading元素中还有transform,:before内容将挡不住*/\n  z-index: -1;\n  /*圆环用border生成*/\n  border: 3px solid rgba(136, 136, 136, 0.2);\n  border-left: 3px solid #888888;\n  /*动画*/\n  -webkit-animation: ani_circle 0.8s linear infinite;\n          animation: ani_circle 0.8s linear infinite;\n}\n\n/*旋转动画*/\n@-webkit-keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n@keyframes ani_circle {\n0% {\n    -webkit-transform: rotateZ(0deg);\n            transform: rotateZ(0deg);\n}\n100% {\n    -webkit-transform: rotateZ(360deg);\n            transform: rotateZ(360deg);\n}\n}\n",""])},function(t,n,e){function i(t){a||e(9)}var a=!1,s=e(1)(e(5),e(8),i,null,null);s.options.__file="/Users/soneway/Sites/github/vue-plugin/src/component/PiCarousel.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] PiCarousel.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"pi-carousel",class:t.carouselClass,style:t.carouselStyle,on:{touchstart:t.__touchstart,touchmove:t.__touchmove,touchend:t.__touchend}},[e("div",{staticClass:"pi-wrap",style:t.wrapStyle,on:{click:t.__wrapClick}},[e("div",{staticClass:"pi-item"},[t.prevData?t._t("default",[e("div",{staticClass:"pi-img",style:t.imgStyle(t.prevData)})],{itemData:t.prevData,index:t.currentIndex-1}):t._e()],2),t._v(" "),e("div",{staticClass:"pi-item"},[t.currentData?t._t("default",[e("div",{staticClass:"pi-img",style:t.imgStyle(t.currentData)})],{itemData:t.currentData,index:t.currentIndex}):t._e()],2),t._v(" "),e("div",{staticClass:"pi-item"},[t.nextData?t._t("default",[e("div",{staticClass:"pi-img",style:t.imgStyle(t.nextData)})],{itemData:t.nextData,index:t.currentIndex+1}):t._e()],2)]),t._v(" "),t.isShowPager?e("div",{staticClass:"pi-pager"},[t._t("pager",t._l(t.dataList,function(n,i){return e("span",{class:{selected:i===t.currentIndex},on:{click:function(n){t.__pagerClick(i)}}})}),{dataList:t.dataList})],2):t._e()])},staticRenderFns:[]},t.exports.render._withStripped=!0},function(t,n,e){var i=e(6);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(2)("1d87ebe2",i,!1)},,,,,,,function(t,n,e){function i(t){a||e(40)}var a=!1,s=e(1)(e(20),e(36),i,null,null);s.options.__file="/Users/soneway/Sites/github/vue-plugin/src/view/UcGallery.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] UcGallery.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},,,,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(7),a=e.n(i);n.default={components:{PiCarousel:a.a},data:{thumbIndex:0},mounted:function(){var t=this,n=this.$refs.carousel;n.dataList=this.dataList,n.$on("slide",function(n){t.thumbSlide(n)})},methods:{thumbSlide:function(t){t!==this.thumbIndex&&(this.thumbIndex=t,this.$refs.carousel.slideToIndex(t),this.center(t))},thumbClick:function(t){this.thumbSlide(t)},center:function(t){var n=this.$refs.thumbWrap,e=document.querySelector(".thumb:nth-of-type("+(t+1)+")");n.scrollLeft=e.offsetLeft-(n.offsetWidth-e.offsetWidth)/2}}}},,,function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(4),a=(e.n(i),e(3)),s=e.n(a),r=e(16),o=e.n(r);if(!("ontouchend"in document)){var l=document.createElement("script");l.src="https://soneway.github.io/js/desktouch.js",document.head.appendChild(l)}o.a.el=".uc-gallery";var u=document.querySelector("header"),c={title:u.querySelector("h1").textContent.trim(),source:u.querySelector("#source").textContent.trim(),time:u.querySelector("time").textContent.trim()},d=[].slice.call(document.querySelectorAll(".uc-gallery figure")),p=d.map(function(t){return{img:t.querySelector("img").getAttribute("alt-src"),desc:t.querySelector("figcaption>p").textContent.trim()}});Object.assign(o.a.data||(o.a.data={}),{dataList:p,titleInfo:c}),n.default=new s.a(o.a)},,,,,,function(t,n,e){n=t.exports=e(0)(),n.push([t.i,'\n@charset "UTF-8";\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\nbody {\n  -webkit-overflow-scrolling: touch;\n  font-family: sans-serif;\n}\n.carouselWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 42px;\n}\n.carouselWrap .pi-carousel.loading .pi-item:before {\n    top: 100px;\n}\n.imgWrap {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  font-size: 15px;\n  color: #999;\n  line-height: 150%;\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.05) 61%, #fff 0%);\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 61%, #fff 0%);\n  /*页码指示*/\n  /*标题*/\n  /*来源和日期*/\n  /*描述信息*/\n}\n.imgWrap .img {\n    display: block;\n    max-width: 100%;\n    max-height: 60%;\n    min-height: 200px;\n    margin: 0 auto;\n}\n.imgWrap .imgInfo {\n    padding: 15px;\n    background: #fff;\n    min-height: 40%;\n}\n.imgWrap .indicator {\n    font-weight: 100;\n}\n.imgWrap .indicator span {\n      font-size: 30px;\n      color: #333;\n}\n.imgWrap .title {\n    font-size: 20px;\n    padding: 15px 0;\n    color: #333;\n}\n.imgWrap .subTitle {\n    color: #bbb;\n    font-size: 14px;\n    line-height: 100%;\n}\n.imgWrap .subTitle > span {\n      display: inline-block;\n}\n.imgWrap .subTitle > span:not(:first-of-type) {\n        border-left: 1px solid #bbb;\n        margin-left: 12px;\n        padding: 0 12px;\n}\n.imgWrap .desc {\n    padding-top: 15px;\n    text-indent: 2em;\n}\n.thumbWrap {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 42px;\n  white-space: nowrap;\n  overflow-y: hidden;\n  overflow-x: auto;\n}\n.thumb {\n  width: 60px;\n  height: 100%;\n  background: center center;\n  background-size: cover;\n  display: inline-block;\n}\n.thumb:not(:last-of-type) {\n    border-left: 1px solid #fff;\n}\n.thumb.selected {\n    border: 2px solid #00f;\n}\n.thumb.selected + .thumb {\n      border: none;\n}\n',""])},,,,,,,function(t,n,e){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"carouselWrap"},[e("pi-carousel",{ref:"carousel",attrs:{isShowPager:!1,isLoop:!1},scopedSlots:t._u([["default",function(n){return[e("div",{staticClass:"imgWrap"},[e("img",{staticClass:"img",attrs:{src:n.itemData.img}}),t._v(" "),e("div",{staticClass:"imgInfo"},[e("p",{staticClass:"indicator"},[e("span",[t._v(t._s(n.index+1))]),t._v("/"+t._s(t.dataList.length)+"\n                        ")]),t._v(" "),e("p",{staticClass:"title"},[t._v(t._s(t.titleInfo.title))]),t._v(" "),e("p",{staticClass:"subTitle"},[e("span",{staticClass:"source"},[t._v(t._s(t.titleInfo.source))]),e("span",{staticClass:"time"},[t._v(t._s(t.titleInfo.time))])]),t._v(" "),e("p",{staticClass:"desc"},[t._v(t._s(n.itemData.desc))])])])]}]])})],1),t._v(" "),e("div",{ref:"thumbWrap",staticClass:"thumbWrap"},t._l(t.dataList,function(n,i){return e("div",{staticClass:"thumb",class:{selected:i===t.thumbIndex},style:{backgroundImage:"url("+n.img+")"},on:{click:function(n){t.thumbClick(i)}}})}))])},staticRenderFns:[]},t.exports.render._withStripped=!0},,,,function(t,n,e){var i=e(29);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(2)("3166079e",i,!1)}],[23]);