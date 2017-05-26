<template>
    <div class="wrapper">

        <!--焦点图容器-->
        <div class="carouselWrap">
            <pi-carousel ref="carousel"
                :isShowPager="false"
                :isLoop="false">
                <template scope="props">
                    <div class="imgWrap">
                        <img class="img" :src="props.itemData.img" />
                        <div class="imgInfo">
                            <p class="indicator">
                                <span>{{props.index + 1}}</span>/{{dataList.length}}
                            </p>
                            <p class="title">{{titleInfo.title}}</p>
                            <p class="subTitle">
                                <span class="source">{{titleInfo.source}}</span><span class="time">{{titleInfo.time}}</span>
                            </p>
                            <p class="desc">{{props.itemData.desc}}</p>
                        </div>
                    </div>
                </template>
            </pi-carousel>
        </div>
        <!--焦点图容器 end-->

        <!--缩略图-->
        <div class="thumbWrap" ref="thumbWrap">
            <div class="thumb" v-for="(item, index) in dataList"
                :class="{selected: index === thumbIndex}"
                :style="{backgroundImage: `url(${item.img})`}"
                @click="thumbClick(index)">
            </div>
        </div>
        <!--缩略图 end-->
    </div>
</template>

<style lang="scss">
    @import "../lib/css/common";

    /*缩略图高度*/
    $thumbHeight: 42px;

    /*焦点图*/
    .carouselWrap {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: $thumbHeight;

        // 复写loading的top位置
        .pi-carousel.pi-loading .pi-item:before {
            top: 100px;
        }
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

    /*缩略图*/
    .thumbWrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: $thumbHeight;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: auto;
    }

    .thumb {
        width: 60px;
        height: 100%;
        background: center center;
        background-size: cover;
        display: inline-block;
        &:not(:last-of-type) {
            border-left: 1px solid #fff;
        }
        &.selected {
            border: 2px solid #06f;

            & + .thumb {
                border: none;
            }
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
      const carousel = this.$refs.carousel;
      carousel.dataList = this.dataList;
      carousel.$on('slide', (index) => {
        this.thumbSlide(index);
      });
    },
    methods: {
      thumbSlide(index) {
        if (index === this.thumbIndex) {
          return;
        }
        this.thumbIndex = index;
        this.$refs.carousel.slideToIndex(index);
        this.center(index);
      },
      thumbClick(index) {
        this.thumbSlide(index);
      },
      center(index) {
        const { thumbWrap } = this.$refs;
        const thumbEl = document.querySelector(`.thumb:nth-of-type(${index + 1})`);
        thumbWrap.scrollLeft = thumbEl.offsetLeft - (thumbWrap.offsetWidth - thumbEl.offsetWidth) / 2;
      }
    }
  };
</script>
