<template>
    <div class="wrapper">
        <div class="carouselWrap">
            <pi-carousel ref="carousel"
                :isShowPager="false"
                :isLoop="false"
                height="100%"></pi-carousel>
        </div>
        <div class="thumbWrap">
            <div class="thumb" v-for="(itemData, index) in dataList"
                :class="[{selected: index === thumbIndex}]"
                :style="{backgroundImage: `url(${itemData.img})`}"
                @click="thumbClick(index)"></div>
        </div>
    </div>
</template>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        -webkit-overflow-scrolling: touch;
        font-family: sans-serif;
    }

    .wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        // 复写loading的top位置
        .pi-carousel.loading .pi-item:before {
            top: 100px;
        }
    }

    .carouselWrap {
        overflow: hidden;
        flex: 1;
    }

    .imgWrap {
        $padding: 15px;
        width: 100%;
        height: 100%;
        overflow: auto;
        font-size: 15px;
        color: #999;
        line-height: 150%;
        background-image: linear-gradient(to bottom, rgba(#000, 0.05) 61%, #fff 0%);

        .img {
            display: block;
            max-width: 100%;
            max-height: 60%;
            min-height: 200px;
            margin: 0 auto;
        }

        .imgInfo {
            padding: $padding;
            background: #fff;
            min-height: 40%;
        }

        /*页码指示*/
        .indicator {
            font-weight: 100;

            span {
                font-size: 30px;
                color: #333;
            }
        }

        /*标题*/
        .title {
            font-size: 20px;
            padding: $padding 0;
            color: #333;
        }

        /*来源和日期*/
        .subTitle {
            $color: #bbb;
            color: $color;
            font-size: 14px;
            line-height: 100%;

            & > span {
                display: inline-block;

                &:not(:first-of-type) {
                    border-left: 1px solid $color;
                    margin-left: 12px;
                    padding: 0 12px;
                }
            }
        }

        /*描述信息*/
        .desc {
            padding-top: $padding;
            text-indent: 2em;
        }
    }

    .thumbWrap {
        height: 50px;
        white-space: nowrap;
        overflow: auto;
    }

    .thumb {
        width: 70px;
        height: 100%;
        background: center center;
        background-size: cover;
        display: inline-block;

        &.selected {
            border: 1px solid #00f;
        }
    }
</style>

<script>
  import PiCarousel from '../component/PiCarousel.vue';

  export default {
    components: {
      PiCarousel
    },
    data: {
      thumbIndex: 0
    },
    mounted() {
      const { dataList, titleInfo } = this;
      const carousel = this.$refs.carousel;
      carousel.contentFormate = (itemData, index) => {
        return itemData && `<div class="imgWrap">
                <img class="img" src="${itemData.img}"/>
                <div class="imgInfo">
                    <p class="indicator"><span>${index + 1}</span>/${dataList.length}</p>
                    <p class="title">${titleInfo.title}</p>
                    <p class="subTitle"><span class="source">${titleInfo.source}</span><span class="time">${titleInfo.time}</span></p>
                    <p class="desc">${itemData.desc}</p>
                </div>
            </div>`;
      };
      carousel.dataList = dataList;
      carousel.$on('slide', (index) => {
        this.thumbClick(index);
      });
    },
    methods: {
      thumbClick(index) {
        this.thumbIndex = index;
        this.$refs.carousel.slideToIndex(index);
        this.center(index);
      },
      center(index) {
        const thumbWrap = document.querySelector('.thumbWrap');
        const thumbEl = document.querySelector(`.thumb:nth-of-type(${index + 1})`);
        debugger;
      }
    }
  };
</script>
