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

        /*动画状态,且左右切换*/
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
    props: Object.assign({}, PiCarousel.props)
  };
</script>
