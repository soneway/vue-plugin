<template>
    <div class="wrapper">
        <pi-carousel ref="carousel" :isShowPager="true" :isLoop="true" :autoPlayTimeout="4000" height="100%"></pi-carousel>
    </div>
</template>

<style lang="scss">
    @import "../lib/var";

    .wrapper {
        background: $color;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    * {
        margin: 0;
        padding: 0;
    }
</style>

<script>
  import PiCarousel from '../component/PiCarousel.vue';
  import request from '../lib/request';

  export default {
    components: {
      PiCarousel
    },
    async mounted() {
      const carousel = this.$refs.carousel;
      const rs = await request.get('/iflow/api/v1/channel/100?method=new');
      console.log(rs);
    }
  };
</script>
