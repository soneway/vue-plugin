<template>
    <div class="pi-carousel"
         :class="classes"
         :style="carouselStyle"
         @touchstart="__touchstart"
         @touchmove="__touchmove"
         @touchend="__touchend">
        <div class="pi-wrap" :style="wrapStyle">
            <div v-html="prevHtml"></div>
            <div v-html="currentHtml"></div>
            <div v-html="nextHtml"></div>
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
            width: 300%;
            height: 100%;
            margin-left: -100%;
            font-size: 0;
            transition: transform ease;
        }

        .pi-wrap > div {
            width: 33.3334%;
            height: 100%;
            /*不能用float:left,会导致在ios safari下渲染问题*/
            display: inline-block;
        }
    }
</style>

<script>
  export default {
    props: {
      // 宽度
      width: {
        type: String,
        default: '100%'
      },
      // 高度
      height: {
        type: String,
        default: '400px'
      },
      // 列表数据
      dataList: {
        type: Array,
        default: []
      },
      // 返回内容函数
      contentFormate: {
        type: Function,
        default: (itemData) => {
          return itemData && `<div style='background: url(${itemData}) center center no-repeat; background-size: contain; width: 100%; height: 100%;'></div>`;
        }
      },
      // 滑动距离阈值
      swipSpanThreshold: {
        type: Number,
        default: 10
      },
      // 滑动阈值
      swipThreshold: {
        type: Number,
        default: 50
      },
      // 动画时长
      duration: {
        type: Number,
        default: 300
      },
      // first和last拉不动的比率
      pullRatio: {
        type: Number,
        default: 3
      },
      // 是否循环滚动
      isLoop: {
        type: Boolean,
        default: false
      },
      // 滚动索引
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        // 禁用动画
        notrans: false,
        // 滑动距离
        swipSpan: 0
      };
    },
    computed: {
      prevHtml() {
        const { dataList } = this;
        let index = this.index - 1;
        if (index < 0) {
          // 不能循环滚动
          if (!this.isLoop) {
            return '';
          }
          index = dataList.length - 1;
        }
        return this.contentFormate(dataList[index]);
      },
      currentHtml() {
        return this.contentFormate(this.dataList[this.index]);
      },
      nextHtml() {
        const { dataList } = this;
        let index = this.index + 1;
        if (index === dataList.length) {
          // 不能循环滚动
          if (!this.isLoop) {
            return '';
          }
          index = 0;
        }
        return this.contentFormate(dataList[index]);
      },
      classes() {
        return [
          { notrans: this.notrans }
        ];
      },
      carouselStyle() {
        return {
          width: this.width,
          height: this.height
        };
      },
      wrapStyle() {
        let { swipSpan } = this;
        // 兼容像素
        typeof swipSpan === 'number' && (swipSpan += 'px');
        return {
          transform: `translate3d(${swipSpan},0,0)`,
          transitionDuration: `${this.duration / 1000}s`
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
        let swipSpanX = touch.pageX - this.startX;
        const absX = Math.abs(swipSpanX);
        // y轴滑动距离
        const swipSpanY = touch.pageY - this.startY;
        const absY = Math.abs(swipSpanY);

        // x轴滑动距离大于y轴 y轴滑动距离小于阈值, 说明的确是左右滑动
        if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
          evt.preventDefault();
          evt.stopPropagation();

          // 不能循环滚动
          if (!this.isLoop) {
            // 第一张图或最后一张图
            const count = this.dataList.length;
            if (this.index === 0 && swipSpanX > 0 || this.index === count - 1 && swipSpanX < 0) {
              // 模拟拉不动操作体验
              swipSpanX /= this.pullRatio;
            }
          }

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

        const { swipSpan, swipThreshold } = this;
        let direction;
        let index = this.index;
        // 向左
        if (swipSpan < -swipThreshold) {
          if (this.isLoop) {
            direction = -1;
          }
          else {

          }
        }
        // 向右
        else if (swipSpan > swipThreshold) {
          direction = 1;
        }

        // 加上动画
        this.notrans = false;
        // 滚动
        swipSpan !== 0 && this.slide(direction);
      },

      // 滚动
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
            this.swipSpan = `${(100 / 3) * direction}%`;
            // 复位
            this.reset(this.index - direction);
            break;
          }
          default: {
            this.swipSpan = 0;
          }
        }
      },
      // 复位
      reset(index) {
        // 复位操作,更新内容
        setTimeout(() => {
          // 去掉动画
          this.notrans = true;
          // 复位
          this.swipSpan = 0;
          // 计算index
          const count = this.dataList.length;
          if (index < 0) {
            index = count - 1;
          }
          if (index === count) {
            index = 0;
          }
          // 更新index(更新内容)
          this.index = index;
          // 重置isAnimating
          this.isAnimating = false;
        }, this.duration);
      }
    }
  };
</script>
