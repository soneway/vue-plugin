<template>
    <div class="wrapper">
        <pi-carousel ref="carousel"
            :dataList="dataList">
        </pi-carousel>
    </div>
</template>

<style lang="scss">
    @import "../lib/common";

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
    data() {
      return {
        dataList: []
      };
    },
    mounted() {
      this.initImgs();
      this.initEvent();
    },
    methods: {
      async initImgs() {
        const imgs = await request.getImgs();
        if (!imgs) {
          return console.log('网络请求失败');
        }
        this.dataList = imgs;
      },
      initEvent() {
        this.$refs.carousel.$on('slide', async (index, direction) => {
          if (index === this.dataList.length - 1 && direction === -1) {
            const imgs = await request.getImgs();
            imgs && this.dataList.push(...imgs);
          }
        });
      }
    }
  };
</script>
