<template>
    <div class="pi-select"
        :class="_class"
        :style="_style">
        <div class="pi-option">
            <slot :self="this">
                <p v-for="item in dataList" :data-value="item">{{item}}</p>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
    .pi-select {

    }
</style>

<script>
  export default {
    props: {
      // 宽度
      width: {
        default: '160px'
      },
      height: {
        default: '1.5em'
      },
      dataList: {
        default: []
      }
    },
    data() {
      return {
        showOption: false
      };
    },
    computed: {
      _style() {
        const { width, height } = this;
        return {
          width,
          height
        };
      },
      _class() {
        return {
          'showOption': this.showOption
        };
      }
    },
    created() {
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
