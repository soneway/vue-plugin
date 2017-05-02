<template>
    <div class="wrapper">
        <pi-carousel ref="carousel"
            :isShowPager="false"
            :isLoop="false"
            height="100%"></pi-carousel>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        -webkit-overflow-scrolling: touch;
    }

    .wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        // 复写loading的top位置
        .pi-carousel.loading .pi-item:before {
            top: 100px;
        }
    }

    .imgWrap {
        width: 100%;
        height: 100%;
        overflow: auto;
        font-size: 14px;

        .img {
            display: block;
            max-width: 100%;
            max-height: 50%;
            margin: 0 auto;
        }
    }
</style>

<script>
  import PiCarousel from '../component/PiCarousel.vue';

  export default {
    components: {
      PiCarousel
    },
    mounted() {
      const { dataList, titleInfo } = this;
      const carousel = this.$refs.carousel;
      carousel.contentFormate = (itemData, index) => {
        return itemData && `<div class="imgWrap">
                <img class="img" src="${itemData.img}"/>
                <div class="imgInfo">
                    <p class="indicator"><b>${index + 1}</b>/${dataList.length}</p>
                    <h3 class="title">${titleInfo.title}</h3>
                    <p><span class="source">${titleInfo.source}</span><span class="time">${titleInfo.time}</span></p>
                    <p>${itemData.desc}</p>
                </div>
            </div>`;
      };
      carousel.dataList = dataList;
    }
  };
</script>
