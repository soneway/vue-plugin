<template>
    <div class="wrapper">
        <img src="../asset/img/title.png" />
        <carousel></carousel>
    </div>
</template>

<style scoped lang="scss">
</style>

<script>
  import Carousel from '../component/carousel.vue';

  const { a, b, c } = window;

  export default {
    components: {
      Carousel
    }
  };
</script>
