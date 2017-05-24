<template>
    <div class="wrapper">
        <pi-flip :isHorizontal="true"
            :autoPlayTimeout="0"
            :index="1"
            :isShowPager="true">
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/1.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/2.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/3.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/4.jpg)"></div>
            <div class="img" style="background-image: url(https://soneway.github.io/jq/example/dist/img/5.jpg)"></div>
        </pi-flip>
    </div>
</template>

<style lang="scss">
    @import "../lib/css/base";

    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .img {
            background: center center no-repeat;
            background-size: contain;
        }
    }
</style>

<script>
  import PiFlip from '../component/PiFlip.vue';

  export default {
    components: {
      PiFlip
    },
    mounted() {
    },
    methods: {}
  };
</script>
