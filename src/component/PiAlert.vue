<template>
    <div>

        <div class="pi-alert">
            <div class="pi-box"
                :style="boxStyle">
                <h3 class="pi-title" v-html="alertTitle"></h3>
                <p class="pi-msg" v-html="alertMsg"></p>
                <div class="pi-btns">
                    <a class="btn-ok">{{alertOkText}}</a>
                </div>
            </div>
        </div>

        <div class="pi-confirm"></div>

        <div class="pi-tooltip"></div>

    </div>
</template>

<style lang="scss">
    .pi-alert {

    }
</style>

<script>
  export default {
    props: {
      // 宽度
      width: {
        default: '280px'
      },
      alertTitle: {
        default: '提示'
      },
      alertOkText: {
        default: '确定'
      }
    },
    data() {
      return {
        alertMsg: ''
      };
    },
    computed: {
      boxStyle() {
        return {
          width: this.width
        };
      }
    },
    mounted() {
      // 初始化slots
      this.initSlots();
      // 初始化timer
      this.startInter();
    },
    methods: {
      // 初始化slots
      initSlots() {
        const { $el, currentIndex } = this;

        // 遍历
        this.items.forEach((item, index) => {
          const itemEl = item.elm;

          // current状态
          index === currentIndex && (itemEl.setAttribute('current', ''));

          // 计算出初始滑动值
          if (currentIndex > 0) {
            const itemSpan = this.isHorizontal ? $el.offsetWidth : $el.offsetHeight;
            this.currentTranslate = -currentIndex * itemSpan;
          }
        });
      },
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

        // 停止定时器
        this.stopInter();
      },
      __touchmove(evt) {
        const touch = evt.targetTouches ? evt.targetTouches[0] : evt;
        // x轴滑动距离
        const swipSpanX = touch.pageX - this.startX;
        const absX = Math.abs(swipSpanX);
        // y轴滑动距离
        const swipSpanY = touch.pageY - this.startY;
        const absY = Math.abs(swipSpanY);

        // 左右
        if (this.isHorizontal) {
          // x轴滑动距离大于y轴 y轴滑动距离小于阈值,说明的确是左右滑动
          if (this.isMoving || absY < absX || absY < this.swipSpanThreshold) {
            evt.preventDefault();
            evt.stopPropagation();
            this.swipSpan = swipSpanX;
            // 已经满足滚动条件,且正在手指拖动
            this.isMoving = true;
          }
        }
        // 上下
        else {
          // y轴滑动距离大于x轴 x轴滑动距离小于阈值,说明的确是上下滑动
          if (this.isMoving || absX < absY || absX < this.swipSpanThreshold) {
            evt.preventDefault();
            evt.stopPropagation();
            this.swipSpan = swipSpanY;
            // 已经满足滚动条件,且正在手指拖动
            this.isMoving = true;
          }
        }
      },
      __touchend() {
        const { swipSpan, swipThreshold, items, currentIndex } = this;
        const itemCount = items.length;

        // 向右,下
        if (swipSpan > swipThreshold) {
          // 非起点
          if (currentIndex !== 0) {
            --this.currentIndex;
          }
        }
        // 向左,上
        else if (swipSpan < -swipThreshold) {
          // 非终点
          if (currentIndex !== itemCount - 1) {
            ++this.currentIndex;
          }
        }

        // 加上动画
        this.notrans = false;
        // 重置swipSpan
        this.swipSpan = 0;

        // 开始定时器
        this.startInter();
      },
      __pagerClick(evt) {
        const index = +evt.target.getAttribute('data-index');
        this.slideToIndex(index);
      },
      __wrapClick() {
        this.$emit('click', this.currentIndex);
      },

      // 滑动到第几帧
      slideToIndex(index) {
        // index不符合条件
        if (typeof index !== 'number' || index < 0 || index >= this.items.length) {
          return;
        }
        this.currentIndex = index;
      },
      // 开始定时器
      startInter() {
        const { autoPlayTimeout } = this;
        const itemCount = this.items.length;

        // 自动播放开启
        if (autoPlayTimeout) {
          this.inter = setInterval(() => {
            // 最后一帧
            if (this.currentIndex === itemCount - 1) {
              this.currentIndex = 0;
            }
            else {
              ++this.currentIndex;
            }
          }, autoPlayTimeout);
        }
      },
      // 停止定定时器
      stopInter() {
        clearInterval(this.inter);
      }
    }
  };
</script>
