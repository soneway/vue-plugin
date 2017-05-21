<template>
    <div class="pi-carousel"
        :class="carouselClass"
        :style="carouselStyle"
        @touchstart="__touchstart"
        @touchmove="__touchmove"
        @touchend="__touchend">

        <div class="pi-wrap"
            :style="wrapStyle"
            @click="__wrapClick">
            <div class="pi-item">
                <slot :itemData="prevData">
                    <div v-show="prevData"
                        class="img"
                        :style="imgStyle(prevData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item">
                <slot :itemData="currentData">
                    <div class="img"
                        :style="imgStyle(currentData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item">
                <slot :itemData="nextData">
                    <div v-show="nextData"
                        class="img"
                        :style="imgStyle(nextData)">
                    </div>
                </slot>
            </div>
        </div>

        <div class="pi-pager"
            v-if="isShowPager">
            <slot name="pager" :dataList="dataList">
                <span v-for="(_, index) in dataList"
                    @click="__pagerClick(index)"
                    :class="{selected: index === currentIndex}"></span>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
    .pi-carousel {
        overflow: hidden;
        position: relative;

        /*没有动画*/
        &.notrans {
            .pi-wrap {
                transition: none;
            }
        }
        /*loading*/
        &.loading {
            .pi-item {
                @extend .pi-loading;
            }
        }

        .pi-wrap {
            width: 300%;
            height: 100%;
            margin-left: -100%;
            transition: transform ease;
            display: flex;
            flex-direction: row;
        }

        .pi-item {
            height: 100%;
            flex: 1;
            overflow: hidden;

            .img {
                background: center center no-repeat;
                background-size: contain;
                width: 100%;
                height: 100%;
            }
        }

        .pi-pager {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            font-size: 0;
            line-height: 20px;

            & > span {
                border: 3px solid #bbb;
                border-radius: 50%;
                margin: 0 2px;

                &.selected {
                    border-color: #555;
                }
            }
        }
    }

    /*loading样式*/
    .pi-loading {
        &:before {
            $width: 40px;
            $border-width: 3px;
            $border-color: #888;
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: $width;
            height: $width;
            margin-left: -$width / 2;
            margin-top: -$width / 2;
            border-radius: $width;
            /*如.loading元素中还有transform,:before内容将挡不住*/
            z-index: -1;
            /*圆环用border生成*/
            border-top: $border-width solid rgba($border-color, 0.2);
            border-right: $border-width solid rgba($border-color, 0.2);
            border-bottom: $border-width solid rgba($border-color, 0.2);
            border-left: $border-width solid rgba($border-color, 1);
            /*动画*/
            animation: ani_circle 0.8s linear infinite;
        }
    }

    /*旋转动画*/
    @keyframes ani_circle {
        0% {
            transform: rotateZ(0deg);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }
</style>

<script>
  export default {
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
      // 动画时长
      duration: {
        default: 300
      },
      // first和last拉不动的比率
      pullRatio: {
        default: 2
      },
      // 是否循环滚动
      isLoop: {
        default: true
      },
      // 滚动索引
      currentIndex: {
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
    data() {
      return {
        // 禁用动画
        notrans: false,
        // 滑动距离
        swipSpan: 0,
        // 缓存数据
        prevData$: null,
        nextData$: null
      };
    },
    computed: {
      prevData: {
        set(data) {
          this.prevData$ = data;
        },
        get() {
          const { dataList, prevData$ } = this;

          // 是否有缓存数据
          if (prevData$) {
            this.prevData$ = null;
            return prevData$;
          }

          let index = this.currentIndex - 1;
          // 第一帧前面
          if (index < 0) {
            // 不能循环滚动
            if (!this.isLoop) {
              return;
            }
            index = dataList.length - 1;
          }
          return dataList[index];
        }
      },
      currentData() {
        return this.dataList[this.currentIndex];
      },
      nextData: {
        set(data) {
          this.nextData$ = data;
        },
        get() {
          const { dataList, nextData$ } = this;

          // 是否有缓存数据
          if (nextData$) {
            this.nextData$ = null;
            return nextData$;
          }

          let index = this.currentIndex + 1;
          // 最后一帧后面
          if (index === dataList.length) {
            // 不能循环滚动
            if (!this.isLoop) {
              return;
            }
            index = 0;
          }
          return dataList[index];
        }
      },
      carouselClass() {
        return [
          { notrans: this.notrans },
          { loading: this.isShowLoading }
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
    mounted() {
      this.startInter();
    },
    methods: {
      __touchstart(evt) {
        // 如果正在作动画,不作响应
        if (this.isAnimating) {
          return;
        }

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
            const { currentIndex } = this;
            // 第一张图或最后一张图
            if (currentIndex === 0 && swipSpanX > 0 || currentIndex === this.dataList.length - 1 && swipSpanX < 0) {
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

        const { swipSpan, swipThreshold, currentIndex } = this;
        let direction;

        // 向左
        if (swipSpan < -swipThreshold) {
          // 不能循环滚动
          if (!this.isLoop) {
            // 不是最后一帧
            currentIndex !== this.dataList.length - 1 && (direction = -1);
          }
          else {
            direction = -1;
          }
        }
        // 向右
        else if (swipSpan > swipThreshold) {
          // 不能循环滚动
          if (!this.isLoop) {
            // 不是第一帧
            currentIndex !== 0 && (direction = 1);
          }
          else {
            direction = 1;
          }
        }
        // 滚动
        swipSpan !== 0 && this.slide(direction);

        // 开始定时器
        this.startInter();
      },
      __pagerClick(index) {
        this.slideToIndex(index);
      },
      __wrapClick() {
        this.$emit('click', this.currentIndex);
      },

      // 滚动
      slide(direction, index) {
        // 开启动画
        this.notrans = false;
        // 判断滚动方向
        switch (direction) {
          // 向左
          case -1:
          // 向右
          case 1: {
            // 动画状态
            this.isAnimating = true;
            // 作动画
            this.swipSpan = `${(100 / 3) * direction}%`;

            // index值为undefined
            index === undefined && (index = this.currentIndex - direction);

            // 复位
            setTimeout(() => {
              // 复位(更新内容)
              this.reset(index);
              // 触发slide事件
              this.$emit('slide', index, direction);
            }, this.duration);
            break;
          }
          // 没有direction值(说明滑动没有超过swipSpanThreshold)
          default: {
            this.swipSpan = 0;
          }
        }
      },
      // 复位
      reset(index) {
        // 禁用动画
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
        this.currentIndex = index;

        // 重置isAnimating
        this.isAnimating = false;
      },
      // 滑动到第几帧
      slideToIndex(index) {
        const { dataList, currentIndex } = this;
        // index不符合条件
        if (typeof index !== 'number' || index < 0 || index >= dataList.length || index === currentIndex) {
          return;
        }

        // 滑动方向
        let direction;
        // 向左
        if (index > currentIndex) {
          direction = -1;
          this.nextData = dataList[index];
        }
        // 向右
        else {
          direction = 1;
          this.prevData = dataList[index];
        }
        // 滑动操作
        this.slide(direction, index);
      },
      // 开始定时器
      startInter() {
        const { autoPlayTimeout } = this;
        if (autoPlayTimeout) {
          this.inter = setInterval(() => {
            this.slide(-1);
          }, autoPlayTimeout);
        }
      },
      // 停止定定时器
      stopInter() {
        clearInterval(this.inter);
      },
      // 获取图片样式
      imgStyle(data) {
        return data && { backgroundImage: `url(${data})` };
      }
    }
  };
</script>
