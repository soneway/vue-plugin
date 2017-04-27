<template>
    <div class="pi-carousel"
         :class="classes"
         :style="{width: `${width}px`, height: `${height}px`}"
         @touchstart="__touchstart"
         @touchmove="__touchmove"
         @touchend="__touchend">
        <div class="pi-wrap" :style="{transform: `translate3d(${swipSpan}px,0,0)`}" :data-test="swipSpan">
            <div class="pi-item pi-prev" v-html="prevHtml"></div>
            <div class="pi-item pi-current" v-html="currentHtml"></div>
            <div class="pi-item pi-next" v-html="nextHtml"></div>
        </div>
    </div>
</template>

<style lang="scss">
    .pi-carousel {
        position: relative;
        overflow: hidden;
        background: #000;

        &.notrans {
            .pi-wrap {
                transition: none;
            }
        }

        .pi-wrap {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            transition: transform 0.3s ease;
        }

        .pi-item {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        /*第一帧*/
        .pi-prev {
            left: -100%;
        }

        /*第三帧*/
        .pi-next {
            left: 100%;
        }
    }
</style>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      dataList: {
        type: Array,
        require: true,
        default: ['http://img.gd.sohu.com/public/images/2014-07-05/75/53b79a22aa37f.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/78/53b7cf18a9dae.png', 'http://img.gd.sohu.com/public/images/2014-07-05/13/53b7aed8da8f7.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f58e12fb9.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/97/53b7f46f5488f.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f446e7fee.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/37/53b7f269dd1ff.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/58/53b7f62dc97ac.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/89/53b7f5f0398d2.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/98/53b7f5e7df185.jpg']
      },
      contentFormate: {
        type: Function,
        default: (itemData) => {
          return itemData && `<div style='background: url(${itemData}) center center no-repeat; background-size: contain; width: 100%; height: 100%;'></div>`;
        }
      },
      swipSpanThreshold: {
        type: Number,
        default: 10
      },
      swipThreshold: {
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        prevHtml: this.contentFormate(this.dataList[this.dataList.length - 1]),
        currentHtml: this.contentFormate(this.dataList[0]),
        nextHtml: this.contentFormate(this.dataList[1]),
        notrans: false,
        swipSpan: 0
      };
    },
    computed: {
      classes() {
        return [
          { notrans: this.notrans }
        ];
      }
    },
    methods: {
      __touchstart(evt) {
        const touch = evt.targetTouches ? evt.targetTouches[0] : evt;

        // 记录触摸开始位置
        this.startX = touch.pageX;
        this.startY = touch.pageY;

        // 重置swipSpan
        this.swipSpan = 0;
        // 重置手指拖拽移动
        this.isMoving = false;
        // 禁用动画
        this.notrans = true;
      },
      __touchmove(evt) {
        // 如果正在作动画,不作响应
        if (this.isAnimating) {
          evt.preventDefault();
          evt.stopPropagation();
          return;
        }

        const touch = evt.targetTouches ? evt.targetTouches[0] : evt;
        // x轴滑动距离
        const swipSpanX = touch.pageX - this.startX;
        const absX = Math.abs(swipSpanX);
        // y轴滑动距离
        const swipSpanY = touch.pageY - this.startY;
        const absY = Math.abs(swipSpanY);

        // x轴滑动距离大于y轴 y轴滑动距离小于阈值, 说明的确是左右滑动
        if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
          evt.preventDefault();
          evt.stopPropagation();

//          // 第一张图或最后一张图
//          if (index === 0 && swipSpanX > 0 || index === itemCount - 1 && swipSpanX < 0) {
//            // 模拟拉不动操作体验
//            swipSpanX /= pullRatio;
//          }

          // 位移
          this.swipSpan = swipSpanX;
          // 已经满足滚动条件,且正在手指拖动
          this.isMoving = true;
        }
      },
      __touchend() {
        this.notrans = false;
      }
    }
  };
</script>
