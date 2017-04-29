<template>
    <div class="wrapper">
        <pi-carousel ref="carousel" :isShowPager="true" :isLoop="true"></pi-carousel>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
</style>

<script>
  import PiCarousel from '../component/PiCarousel.vue';

  export default {
    components: {
      PiCarousel
    },
    mounted() {
      const carousel = this.$refs.carousel;
      carousel.dataList = [
        'http://img.gd.sohu.com/public/images/2014-07-05/75/53b79a22aa37f.jpg',
        'http://img.gd.sohu.com/public/images/2014-07-05/78/53b7cf18a9dae.png',
        'http://img.gd.sohu.com/public/images/2014-07-05/13/53b7aed8da8f7.jpg',
        'http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f58e12fb9.jpg'
      ];
      carousel.$on('slide', function(i) {
        // console.log(this, i);
      }).$on('click', function(i) {
        console.log(this, i);
      });
    }
  };
</script>
