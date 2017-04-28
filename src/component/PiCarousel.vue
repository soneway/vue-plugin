<template>
    <div class="pi-carousel"
         :class="classes"
         :style="itemStyle"
         @touchstart="__touchstart"
         @touchmove="__touchmove"
         @touchend="__touchend">
        <div class="pi-wrap" :style="wrapStyle">
            <div :style="itemStyle" v-html="prevHtml"></div>
            <div :style="itemStyle" v-html="currentHtml"></div>
            <div :style="itemStyle" v-html="nextHtml"></div>
        </div>
    </div>
</template>

<style lang="scss">
    .pi-carousel {
        overflow: hidden;
        background: #000;

        &.notrans {
            .pi-wrap {
                transition: none;
            }
        }

        .pi-wrap {
            transition: transform ease;
            margin-left: -100%;
            font-size: 0;
        }

        .pi-wrap > div {
            /*不能用float:left,会导致在ios safari下渲染问题*/
            display: inline-block;
        }
    }
</style>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 360
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
      },
      duration: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {
        // 禁用动画
        notrans: false,
        // 滑动距离
        swipSpan: 0,
        // 滚动索引
        index: 0,
        // html索引
        htmlIndex: 0
      };
    },
    computed: {
      prevHtml() {
        const { dataList, htmlIndex } = this;
        let index = htmlIndex - 1;
        if (index < 0) {
          index = dataList.length - 1;
        }
        return this.contentFormate(dataList[index]);
      },
      currentHtml() {
        return this.contentFormate(this.dataList[this.htmlIndex]);
      },
      nextHtml() {
        const { dataList, htmlIndex } = this;
        let index = htmlIndex + 1;
        if (index === dataList.length) {
          index = 0;
        }
        return this.contentFormate(this.dataList[index]);
      },
      classes() {
        return [
          { notrans: this.notrans }
        ];
      },
      wrapStyle() {
        return {
          transform: `translate3d(${this.swipSpan}px,0,0)`,
          transitionDuration: `${this.duration / 1000}s`,
          width: `${this.width * 3}px`
        };
      },
      itemStyle() {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        };
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

          // 位移
          this.swipSpan = swipSpanX;
          // 已经满足滚动条件,且正在手指拖动
          this.isMoving = true;
        }
      },
      __touchend() {
        // 如果正在作动画,不作响应
        if (this.isAnimating) {
          return;
        }

        let direction;
        const itemCount = this.dataList.length;
        // 向左
        if (this.swipSpan < -this.swipThreshold) {
          if (++this.index === itemCount) {
            this.index = 0;
          }
          direction = -1;
        }
        // 向右
        else if (this.swipSpan > this.swipThreshold) {
          if (--this.index < 0) {
            this.index = itemCount - 1;
          }
          direction = 1;
        }

        // 加上动画
        this.notrans = false;
        // 滚动
        this.swipSpan !== 0 && this.slide(direction);
      },
      slide(direction) {
        // 判断滚动方向
        switch (direction) {
          // 向右
          case 1:
          // 向左
          case -1: {
            // 开启动画
            this.isAnimating = true;
            // 作动画
            this.swipSpan = this.width * direction;

            // 复位操作,更新内容
            setTimeout(() => {
              // 去掉动画
              this.notrans = true;
              // 复位
              this.swipSpan = 0;
              // 更新内容
              this.htmlIndex = this.index;
              // 重置isAnimating
              this.isAnimating = false;
            }, this.duration);
            break;
          }
          default: {
            this.swipSpan = 0;
          }
        }
      }
    }
  };
</script>
