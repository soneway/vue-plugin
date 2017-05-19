<template>
    <div class="wrapper">
        <pi-slider ref="slider">
            <div>1ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>2ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>3ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>4ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>5ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>6ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
            <div>7ksfdk dfads fa dfkalp fdaf d;afd afep gjieofp ajie fdka fdk;f a; fdfadf</div>
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
