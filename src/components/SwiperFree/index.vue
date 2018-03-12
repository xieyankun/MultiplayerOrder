<template>
  <div class="k-swiper-free">
    <swiper :options="swiperOption">
      <swiper-slide v-for="slide in swiperSlides" :key="new Date()">
        <router-link :to="{name: 'GoodDetail', params: { goodId: slide.good_id}}">
          <img :src="slide.img" alt="">
          <p class="g-info">{{slide.good_name}}</p>
          <p class="g-price">¥{{slide.good_price / 100 }}</p>
        </router-link>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    swiperSlides: {
      type: Array
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30,
        freeMode: true
      }
    }
  },
  mounted () {
    // setInterval(() => {
    //   console.log('simulate async data')
    //   let swiperSlides = this.swiperSlides
    //   if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
    // }, 3000)
    console.log(this.swiperSlides)
  }
}
</script>

<style lang="scss">
  .k-swiper-free{
    .g-info{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .g-price{
      font-size: 0.426667rem;
      font-weight: bold;
      color: red;
    }
    .swiper-slide{
      img{
        width: 90%;
      }
    }
  }
</style>
