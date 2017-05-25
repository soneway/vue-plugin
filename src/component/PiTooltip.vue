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
      // 显示时长
      timeout: {
        default: 2000
      },
      // 是否添加到全局变量
      isGlobal: {
        default: false
      }
    },
    data() {
      return {
        msg: '',
        visible: false,
        inter: null
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
          { visible: this.visible }
        ];
      }
    },
    mounted() {
      this.isGlobal && (window.tooltip = this.show);
    },
    methods: {
      show(msg, timeout) {
        this.msg = msg;
        this.visible = true;

        // 延迟消失
        clearTimeout(this.inter);
        this.inter = setTimeout(() => {
          this.visible = false;
        }, timeout || this.timeout);
      }
    }
  };
</script>
