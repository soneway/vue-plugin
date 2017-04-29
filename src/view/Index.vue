<template>
    <div class="wrapper">
        <pi-carousel ref="carousel" :isShowPager="false"></pi-carousel>
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
      carousel.dataList = ['http://img.gd.sohu.com/public/images/2014-07-05/75/53b79a22aa37f.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/78/53b7cf18a9dae.png', 'http://img.gd.sohu.com/public/images/2014-07-05/13/53b7aed8da8f7.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f58e12fb9.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/97/53b7f46f5488f.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/76/53b7f446e7fee.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/37/53b7f269dd1ff.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/58/53b7f62dc97ac.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/89/53b7f5f0398d2.jpg', 'http://img.gd.sohu.com/public/images/2014-07-05/98/53b7f5e7df185.jpg'];
      carousel.$on('slide', function(i) {
        // console.log(this, i);
      }).$watch('click', function(evt) {
        console.log(this, evt);
      });
    }
  };
</script>
