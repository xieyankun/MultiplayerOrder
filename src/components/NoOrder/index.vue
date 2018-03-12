<template>
  <div class="no-order">
    <img src="../../assets/icon_empty.png" alt="">
    <p>你还没有任何订单</p>
    <router-link :to="{name: 'Classify'}" class="go-buy">
      去下单
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .no-order{
    margin-top: 3rem;
    .go-buy{
      display: block;
      width: 4rem;
      background-color: #c9121e;
      margin: 0 auto;
      padding: 0.32rem;
      color: #FFF;
      border-radius: 8px;
    }
    p{
      margin-bottom: 0.32rem;
    }
  }
  
</style>
