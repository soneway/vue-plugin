<template>
    <div class="wrapper">
        <a @click="__alertClick">alert</a>
        <a @click="__confirmClick">confirm</a>
        <a @click="__tooltipClick">tooltip</a>
        <pi-tooltip ref="tooltip"></pi-tooltip>
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
  import PiAlert from '../component/PiAlert.vue';
  import PiTooltip from '../component/PiTooltip.vue';
  import PiConfirm from '../component/PiConfirm.vue';

  export default {
    components: {
      PiAlert,
      PiConfirm,
      PiTooltip
    },
    mounted() {

    },
    methods: {
      __alertClick() {},
      __confirmClick() {},
      __tooltipClick() {
        this.$refs.tooltip.show('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
      }
    }
  };
</script>
