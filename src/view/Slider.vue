<template>
    <div class="wrapper">
        <pi-slider ref="slider">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
        </pi-slider>
    </div>
</template>

<style lang="scss">

    .wrapper {
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
  import PiSlider from '../component/PiSlider.vue';
  import request from '../lib/request';

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
