<template>
    <div class="wrapper">
        <div class="linkWrap">
            <a v-for="item in urls"
                @click="__linckClick(item)"
                :class="{selected: item === url}">{{item}}</a>
        </div>
        <iframe :src="`${url}.html`"></iframe>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .linkWrap {
        line-height: 40px;
        height: 40px;
        overflow-y: hidden;
        overflow-x: auto;
        box-shadow: 0 1px 3px rgba(#000, 0.3);
        z-index: 1;
        white-space: nowrap;

        & > a {
            display: inline-block;
            padding: 0 10px;

            &.selected {
                box-shadow: 0 2px 0 0 #09f inset;
            }
        }
    }

    iframe {
        flex: 1;
        border: none;
    }
</style>

<script>
  const urls = ['carousel', 'uc-gallery', 'slider', 'msgbox'];

  export default {
    data: {
      url: urls[0],
      urls
    },
    methods: {
      __linckClick(url) {
        this.url = url;
      }
    }
  };
</script>
