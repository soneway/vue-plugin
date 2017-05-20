<template>
    <div class="wrapper">
        <pi-slider ref="slider" :isHorizontal="true" :autoPlayTimeout="0" :currentIndex="0">
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/1.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/2.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/3.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/4.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/5.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/1.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/2.jpg)"></div>
        </pi-slider>
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

        .img {
            background: center center no-repeat;
            background-size: cover;
        }
    }
</style>

<script>
  import PiSlider from '../component/PiSlider.vue';

  export default {
    components: {
      PiSlider
    },
    mounted() {
      this.initEvent();
    },
    methods: {
      initEvent() {
        const slider = this.$refs.slider;
      }
    }
  };
</script>
