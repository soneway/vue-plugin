<template>
    <pi-carousel class="pi-card"
        :isShowPager="isShowPager"
        :width="width"
        :height="height"
        :dataList="dataList"
        :swipSpanThreshold="swipSpanThreshold"
        :swipThreshold="swipThreshold"
        :duration="duration"
        :pullRatio="pullRatio"
        :isLoop="isLoop"
        :index="index"
        :isShowLoading="isShowLoading"
        :autoPlayTimeout="autoPlayTimeout">
    </pi-carousel>
</template>

<style lang="scss">
    .pi-card {
        $scale: 0.68;

        transform: scale3d($scale, $scale, 1);

        /*样式覆盖*/
        &.pi-card {
            overflow: visible;
        }

        /*动画状态,非左右切换动画*/
        &.pi-animating:not([data-direction="0"]) {
            .pi-item {
                transition: all ease 0.4s;

                /*动画中的当前元素缩小小*/
                &:nth-of-type(2) {
                    transform: scale3d($scale, $scale, 1);
                }
            }
        }

        .pi-item {
            /*非当前元素*/
            &:nth-of-type(1), &:nth-of-type(3) {
                /*非临时当前元素缩小*/
                &:not(.temp-current) {
                    transform: scale3d($scale, $scale, 1);
                }
            }
        }
    }
</style>

<script>
  import PiCarousel from './PiCarousel.vue';

  export default {
    components: {
      PiCarousel
    },
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
        default: false
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
    }
  };
</script>
