<template>
  <div class="index">
    <!-- <img src="../../assets/home_bg.png" alt="" class="bg"> -->
    <router-link to="/feedback" class="feedback">投诉建议</router-link>
    <div class="slogen">
      <h1>欢迎光临</h1>
      <p>Welcome to our shop</p>
    </div>

    <div class="logo">
      <img src="../../assets/logo.jpg" alt="">
    </div>

    <div class="btn-wrap">
      <router-link to="/home" class="btn" @click="startMeal">
        开始点餐
      </router-link><a class="btn call" @click="callWaiter">呼叫前台</a>
    </div>

    <p class="order-tip" v-if="hasPayOrder">您有待支付订单，去支付 ></p>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      hasPayOrder: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    startMeal() {

    },
    callWaiter() {

    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  background: url(../../assets/home_bg.png) no-repeat;
  background-size: 100% auto;
  height: 100%;
  text-align: center;
  color: #FFF;
  .bg{
    width: 100%;
  }
  .slogen{
    position: absolute;
    top: 42px;
    width: 100%;
    h1{
      font-size: 22px;
      font-weight: 400;
    }
  }
  .logo{
    width: 128px;
    height: 128px;
    border: 1px solid #FFF;
    border-radius: 50%;
    position: absolute;
    top: 128px;
    left: 50%;
    transform: translate(-50%, 0);
    overflow: hidden;

    img{
      width: 94px;
      height: 94px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .btn-wrap{
    width: 310px;
    height: 60px;
    overflow: hidden;
    border-radius: 4px;
    margin: 0px auto;
    background: #E62C38;
    box-shadow: 0 2px 10px #e4dcdc;
    position: absolute;
    top: 360px;
    left: 50%;
    transform: translate(-50%, 0);
    .btn{
      display: inline-block;
      overflow: hidden;
      width: 50%;
      height: 100%;
      line-height: 60px;
    }
    .call{
      background-color: #FFF;
      color: #E62C38;
    }
  }
  .feedback{
    position: absolute;
    font-size: 14px;
    top: 12px;
    right: 12px;
  }
  .order-tip{
    color: #0da5f0;
    font-size: 12px;
    position: absolute;
    top: 442px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

</style>
