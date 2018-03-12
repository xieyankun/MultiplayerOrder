<template>
  <div class="k-swipe">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in swipeImg" :key="new Date().toISOString()">
        <a :href="item.href">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: {
    swipeImg: {
      type: Array
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .k-swipe{
    height: 5rem;
    img{
      height:  100%;
    }
  }
</style>
