<template>
    <div class="pi-carousel"
        :class="_class"
        :style="_style"
        :data-direction="direction"
        @touchstart="__touchstart"
        @touchmove="__touchmove"
        @touchend="__touchend">

        <!--滚动容器-->
        <div class="pi-wrap"
            :style="_wrapStyle"
            @click="__wrapClick">
            <div class="pi-item"
                :class="_prevClass">
                <slot v-if="prevData"
                    :itemData="prevData"
                    :index="prevIndex">
                    <div class="pi-img"
                        :style="getImgStyle(prevData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item" ref="currentItem">
                <slot v-if="currentData"
                    :itemData="currentData"
                    :index="currentIndex">
                    <div class="pi-img"
                        :style="getImgStyle(currentData)">
                    </div>
                </slot>
            </div>
            <div class="pi-item"
                :class="_nextClass">
                <slot v-if="nextData"
                    :itemData="nextData"
                    :index="nextIndex">
                    <div class="pi-img"
                        :style="getImgStyle(nextData)">
                    </div>
                </slot>
            </div>
        </div>
        <!--滚动容器 end-->

        <!--页脚-->
        <div class="pi-pager"
            v-if="isShowPager">
            <slot name="pager" :self="this">
                <span v-for="(_, index) in dataList"
                    @click="__pagerClick(index)"
                    :class="{selected: index === currentIndex}"></span>
            </slot>
        </div>
        <!--页脚 end-->
    </div>
</template>

<style lang="scss">
    @import "../style/lib/loading";

    .pi-carousel {
        overflow: hidden;
        position: relative;
        /*可有效减缓闪烁*/
        backface-visibility: hidden;
        /*loading*/
        &.pi-loading {
            .pi-item {
                @extend .loading;
            }
        }

        /*正在动画*/
        &.pi-animating {
            .pi-wrap {
                transition: transform ease 0.4s;
            }
        }

        .pi-wrap {
            width: 300%;
            height: 100%;
            margin-left: -100%;
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
      // 动画时长(该时长,需要和动画时长相同)
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
        // 方向状态
        direction: 0,
        // 是否正在动画
        isAnimating: false,
        prevIndex: this.index - 1,
        // 滚动索引
        currentIndex: this.index,
        nextIndex: this.index + 1,
        // 滑动值
        currentTranslate: 0
      };
    },
    computed: {
      prevData() {
        const { dataList } = this;
        let { prevIndex } = this;

        // 第一帧前面
        if (prevIndex < 0) {
          // 不能循环滚动
          if (!this.isLoop) {
            return;
          }
          prevIndex = dataList.length - 1;
        }
        return dataList[prevIndex];
      },
      currentData() {
        return this.dataList[this.currentIndex];
      },
      nextData() {
        const { dataList } = this;
        let { nextIndex } = this;

        // 最后一帧后面
        if (nextIndex === dataList.length) {
          // 不能循环滚动
          if (!this.isLoop) {
            return;
          }
          nextIndex = 0;
        }
        return dataList[nextIndex];
      },
      _class() {
        return {
          'pi-loading': this.isShowLoading,
          'pi-animating': this.isAnimating
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
          transform: `translate3d(${this.currentTranslate},0,0)`
        };
      },
      _prevClass() {
        return {
          'temp-current': this.isAnimating && this.direction === BACK
        };
      },
      _nextClass() {
        return {
          'temp-current': this.isAnimating && this.direction === FORWARD
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
      },
      currentIndex() {
        const { currentIndex } = this;
        this.prevIndex = currentIndex - 1;
        this.nextIndex = currentIndex + 1;
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
        // 正在动画
        this.isAnimating = true;

        // 判断滚动方向
        switch (direction) {
          // 向左
          case FORWARD:
          // 向右
          case BACK: {
            // 方向状态
            this.direction = direction;
            // 作动画
            this.currentTranslate = `${this.$el.offsetWidth * direction}px`;

            // index值为undefined
            index === undefined && (index = this.currentIndex - direction);

            // 触发slide事件
            this.$emit('slide', index, direction);
            break;
          }
          // 没有direction值(说明滑动没有超过swipSpanThreshold)
          default: {
            this.currentTranslate = 0;
            this.direction = 0;
          }
        }

        // 复位
        setTimeout(() => {
          // 复位(更新内容)
          this.reset(index);
        }, this.duration);
      },
      // 复位
      reset(index) {
        // 重置动画状态
        this.isAnimating = false;

        // 如无index
        if (index === undefined) {
          return;
        }

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
      },
      // 滑动到第几帧
      slideToIndex(index) {
        const { currentIndex } = this;
        // index不符合条件
        if (typeof index !== 'number' || index < 0 || index >= this.dataList.length || index === currentIndex) {
          return;
        }

        // 滑动方向
        let direction;
        // 向左
        if (index > currentIndex) {
          direction = FORWARD;
          this.nextIndex = index;
        }
        // 向右
        else {
          direction = BACK;
          this.prevIndex = index;
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
      getImgStyle(data) {
        return data && { backgroundImage: `url(${data})` };
      }
    }
  };
</script>
