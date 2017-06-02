<template>
    <div class="pi-carousel"
        :class="_class"
        :style="_style"
        @touchstart="__touchstart"
        @touchmove="__touchmove"
        @touchend="__touchend">

        <!--滚动容器-->
        <div class="pi-wrap"
            :style="_wrapStyle"
            @click="__wrapClick">
            <div class="pi-item">
                <slot v-if="prevData"
                    :itemData="prevData"
                    :index="currentIndex - 1">
                    <div class="pi-img"
                        :style="imgStyle(prevData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item" ref="currentItem">
                <slot v-if="currentData"
                    :itemData="currentData"
                    :index="currentIndex">
                    <div class="pi-img"
                        :style="imgStyle(currentData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item">
                <slot v-if="nextData"
                    :itemData="nextData"
                    :index="currentIndex + 1">
                    <div class="pi-img"
                        :style="imgStyle(nextData)">
                    </div>
                </slot>
            </div>
        </div>
        <!--滚动容器 end-->

        <!--页脚-->
        <div class="pi-pager"
            v-if="isShowPager">
            <slot name="pager" :dataList="dataList">
                <span v-for="(_, index) in dataList"
                    @click="__pagerClick(index)"
                    :class="{selected: index === currentIndex}"></span>
            </slot>
        </div>
        <!--页脚 end-->
    </div>
</template>

<style lang="scss">
    @import "../lib/css/loading";

    .pi-carousel {
        overflow: hidden;
        position: relative;
        /*优化滚动效果*/
        backface-visibility: hidden;

        /*没有动画*/
        &.notrans {
            .pi-wrap {
                transition: none;
            }
        }
        /*loading*/
        &.pi-loading {
            .pi-item {
                @extend .loading;
            }
        }

        .pi-wrap {
            width: 300%;
            height: 100%;
            margin-left: -100%;
            transition: transform ease;
            display: flex;
            /*虽然是默认值,但不能省略,以确保auto-prefixer插件准确生成兼容安卓4.0的代码*/
            flex-direction: row;
        }

        .pi-item {
            height: 100%;
            flex: 1;
            overflow: hidden;

            .pi-img {
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
</style>

<script>
  const FORWARD = -1;
  const BACK = 1;

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
        default: 400
      },
      // first和last拉不动的比率
      pullRatio: {
        default: 2
      },
      // 是否循环滚动
      isLoop: {
        default: true
      },
      // 默认滚动索引
      index: {
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
        // 滚动索引
        currentIndex: this.index,
        // 滑动值
        currentTranslate: 0,
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
          const { dataList, prevData$, currentIndex } = this;

          // 是否有缓存数据
          if (prevData$) {
            this.prevData$ = null;
            return prevData$;
          }

          let index = currentIndex - 1;
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
          const { dataList, nextData$, currentIndex } = this;

          // 是否有缓存数据
          if (nextData$) {
            this.nextData$ = null;
            return nextData$;
          }

          let index = currentIndex + 1;
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
      _class() {
        return {
          notrans: this.notrans,
          'pi-loading': this.isShowLoading
        };
      },
      _style() {
        return {
          width: this.width,
          height: this.height
        };
      },
      _wrapStyle() {
        return {
          transform: `translate3d(${this.currentTranslate},0,0)`,
          transitionDuration: `${this.duration / 1000}s`
        };
      }
    },
    watch: {
      currentData() {
        // 重置scrollTop
        const { currentItem } = this.$refs;
        if (currentItem) {
          const wrapEl = currentItem.firstElementChild;
          wrapEl && (wrapEl.scrollTop = 0);
        }
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
            if (currentIndex === 0 && swipSpanX > 0 ||
              currentIndex === this.dataList.length - 1 && swipSpanX < 0) {
              // 模拟拉不动操作体验
              swipSpanX /= this.pullRatio;
            }
          }

          // 位移
          this.currentTranslate = `${this.swipSpan = swipSpanX}px`;
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
            currentIndex !== this.dataList.length - 1 && (direction = FORWARD);
          }
          else {
            direction = FORWARD;
          }
        }
        // 向右
        else if (swipSpan > swipThreshold) {
          // 不能循环滚动
          if (!this.isLoop) {
            // 不是第一帧
            currentIndex !== 0 && (direction = BACK);
          }
          else {
            direction = BACK;
          }
        }
        // 滚动
        swipSpan && this.slide(direction);

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
          case FORWARD:
          // 向右
          case BACK: {
            // 动画状态
            this.isAnimating = true;
            // 作动画
            this.currentTranslate = `${this.$el.offsetWidth * direction}px`;

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
            this.currentTranslate = 0;
          }
        }
      },
      // 复位
      reset(index) {
        // 禁用动画
        this.notrans = true;
        // 复位
        this.currentTranslate = 0;

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
          direction = FORWARD;
          this.nextData = dataList[index];
        }
        // 向右
        else {
          direction = BACK;
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
            this.slide(FORWARD);
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
