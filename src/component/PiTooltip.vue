<template>
    <div class="pi-tooltip"
        :class="_class"
        :style="_style"
        v-html="msg">
    </div>
</template>

<style lang="scss">
    .pi-tooltip {
        position: fixed;
        top: 80%;
        left: 50%;
        box-sizing: border-box;
        background: rgba(#000, 0.5);
        color: #fff;
        line-height: 120%;
        padding: 0.6em 1em;
        text-align: center;
        border-radius: 4px;
        /*动画*/
        transition: all 0.3s ease;
        z-index: -1;
        opacity: 0;

        /*显示*/
        &.visible {
            z-index: 999;
            opacity: 1;
        }
    }
</style>

<script>
  export default {
    props: {
      // 宽度
      width: {
        default: '280px'
      },
      timeout: {
        default: 2000
      }
    },
    data() {
      return {
        msg: '',
        isShow: false
      };
    },
    computed: {
      _style() {
        const { width } = this;
        return {
          width,
          marginLeft: `${-parseInt(width, 10) / 2}px`
        };
      },
      _class() {
        return [
          { visible: this.isShow }
        ];
      }
    },
    methods: {
      show(msg, timeout) {
        this.msg = msg;
        this.isShow = true;

        // 延迟消失
        setTimeout(() => {
          this.isShow = false;
        }, timeout || this.timeout);
      }
    }
  };
</script>
