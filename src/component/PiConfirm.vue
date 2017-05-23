<template>
    <div>

        <div class="pi-alert">
            <div class="pi-box"
                :style="boxStyle">
                <h3 class="pi-title" v-html="alertTitle"></h3>
                <p class="pi-msg" v-html="alertMsg"></p>
                <div class="pi-btns">
                    <a class="btn-ok">{{alertOkText}}</a>
                </div>
            </div>
        </div>

        <div class="pi-confirm"></div>

        <div class="pi-tooltip"></div>

    </div>
</template>

<style lang="scss">
    .pi-alert {

    }
</style>

<script>
  export default {
    props: {
      // 宽度
      width: {
        default: '280px'
      },
      alertTitle: {
        default: '提示'
      },
      alertOkText: {
        default: '确定'
      }
    },
    data() {
      return {
        alertMsg: ''
      };
    },
    computed: {
      boxStyle() {
        return {
          width: this.width
        };
      }
    },
    mounted() {

    },
    methods: {

    }
  };
</script>
