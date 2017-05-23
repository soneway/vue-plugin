<template>
    <div class="pi-alert"
        :class="_class">
        <div class="pi-box"
            :style="_boxStyle">
            <h3 class="pi-title" v-html="title"></h3>
            <p class="pi-msg" v-html="msg"></p>
            <div class="pi-btn-wrap">
                <a class="pi-btn-ok"
                    @click="__btnOkClick">{{btnOkText}}</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .pi-alert {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        /*垂直居中*/
        align-items: center;
        /*水平居中*/
        justify-content: center;
        background: rgba(#000, 0.3);
        /*动画*/
        transition: all 0.3s ease;
        z-index: -1;
        opacity: 0;

        /*显示*/
        &.visible {
            z-index: 999;
            opacity: 1;

            .pi-box {
                transform: none;
            }
        }

        .pi-box {
            background: rgba(#fff, 0.9);
            text-align: center;
            border-radius: 0.8em;
            overflow: hidden;
            /*动画*/
            transition: transform 0.3s ease;
            transform: scale3d(1.2, 1.2, 1);
        }

        .pi-title {
            line-height: 250%;
            background: rgba(#000, 0.05);
            font-size: 1.2em;
        }

        .pi-msg {
            padding: 1.5em 3em;
            line-height: 120%;
        }

        .pi-btn-wrap {
            line-height: 280%;
            box-shadow: 0 0 1px rgba(#000, 0.2);
            color: #08f;
            font-size: 1.15em;
        }

        .pi-btn-ok {
            display: block;

            &:hover {
                background: #eee;
            }
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
      title: {
        default: '提示'
      },
      btnOkText: {
        default: '确定'
      }
    },
    data() {
      return {
        msg: '',
        title: this.title,
        btnOkText: this.btnOkText,
        btnOkClick: null,
        visible: false
      };
    },
    computed: {
      _class() {
        return [
          { visible: this.visible }
        ];
      },
      _boxStyle() {
        return {
          width: this.width
        };
      }
    },
    mounted() {
    },
    methods: {
      show(opts) {
        // 配置项
        typeof opts === 'string' && (opts = { msg: opts });
        const { msg, title, btnOkClick } = opts;

        this.msg = msg;
        title && (this.title = title);
        this.btnOkClick = btnOkClick;
        // 显示
        this.visible = true;
      },
      __btnOkClick() {
        this.visible = false;
        const { btnOkClick } = this;
        typeof btnOkClick === 'function' && btnOkClick();
      }
    }
  };
</script>
