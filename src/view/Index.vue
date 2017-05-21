<template>
    <div class="wrapper">
        <div class="linkWrap">
            <a @click="__linckClick" data-url="carousel"></a>
            <a @click="__linckClick" data-url="uc-gallery"></a>
            <a @click="__linckClick" data-url="slider"></a>
        </div>
        <iframe :src="`${url}.html`"></iframe>
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
        display: flex;
        flex-direction: column;
    }

    .linkWrap {
        line-height: 40px;
        box-shadow: 0 1px 3px rgba(#000, 0.3);
        z-index: 1;

        & > a {
            padding: 0 10px;

            &:before {
                content: attr(data-url);
            }
        }
    }

    iframe {
        flex: 1;
        border: none;
    }
</style>

<script>
  export default {
    data: {
      url: 'carousel'
    },
    methods: {
      __linckClick(evt) {
        this.url = evt.target.getAttribute('data-url');
      }
    }
  };
</script>
