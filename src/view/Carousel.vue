<template>
    <div class="wrapper">
        <pi-carousel ref="carousel"
            :isShowPager="true"
            :isLoop="true"
            :autoPlayTimeout="0"
            :duration="400">
        </pi-carousel>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
</style>

<script>
  import PiCarousel from '../component/PiCarousel.vue';
  import request from '../lib/request';

  export default {
    components: {
      PiCarousel
    },
    mounted() {
      this.initImgs();
      this.initEvent();
    },
    methods: {
      async initImgs() {
        const carousel = this.$refs.carousel;
        const imgs = await request.getImgs();
        if (!imgs) {
          return console.log('网络请求失败');
        }
        carousel.dataList = imgs;
      },
      initEvent() {
        const carousel = this.$refs.carousel;
        carousel.$on('slide', async (index, direction) => {
          if (index === carousel.dataList.length - 1 && direction === -1) {
            const imgs = await request.getImgs();
            imgs.length && carousel.dataList.push(...imgs);
          }
        });
      }
    }
  };
</script>
