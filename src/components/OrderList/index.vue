<template>
  <div class="order">
    <div class="wp-title">
      <span>订单号：{{ currentOrder.order_id }}</span>
      <span class="wp-confirm">{{ currentOrder.status_display }}</span>
    </div>
    <div class="wp-imgwarp" @click="goOrderDetail">
      <div class="imgitem" v-for="(good, index) in currentOrder.product_info_snapshot" :key="good.id" v-if="index < 4">
        <img :src="good.img" alt="">
      </div>
      <i data-v-441c290a="" class="icon udmps ki-arrow-right"></i>
      <div class="clear"></div> 
    </div>
    <div class="wp-ad">
      收货地址：
      {{ currentOrder.address_snapshot.province || '' }}
      {{ currentOrder.address_snapshot.city || '' }}
      {{ currentOrder.address_snapshot.district || '' }}
      {{ currentOrder.address_snapshot.address || '' }}
      {{ currentOrder.address_snapshot.recipient || '' }}
    </div>
    <div class="wp-payinfo">
      <div>金额：¥ {{ currentOrder.amount / 100 }}</div>
      <div class="wp-btn" v-if="currentOrder.status == 1">
        <button class="btn-cancel" @click="exportOrder(currentOrder.order_id)">导出</button>
        <button class="btn-cancel" @click="cancelOrder(currentOrder)">取消订单</button>
        <button class="btn-pay" @click="goPay">去支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchAPI } from '@/utils/ajaxUtil'
import { payOrder } from '@/utils/utils'
export default {
  props: ['order'],
  data () {
    return {
      currentOrder: this.order
    }
  },
  methods: {
    goOrderDetail () {
      console.log('go to detail:', this.order.order_id)
      this.$router.push({name: 'OrderDetail', params: {id: this.order.order_id}})
    },
    async cancelOrder (order) {
      this.currentOrder = await fetchAPI('DELETE', `/api/orders/${order.order_id}/`)
    },
    exportOrder (oid) {
      console.log(oid)
      fetchAPI('GET', '/api/cart/').then((data) => {
        console.log(data)
        window.location.href = 'http://admin.udmps.com/api/export_order/?customer_id=' + this.$route.meta.user.id + "&order_id=" + oid
      })
    },
    async goPay () {
      const orderId = this.order.order_id
      await payOrder(orderId)
      this.$store.commit('clearCart')
      this.$router.push({name: 'OrderDetail', params: {id: orderId}})
    }
  }
}
</script>

<style lang="scss">
  .order{
    font-size: 0.426667rem;
    margin-bottom: 0.32rem;
    .wp-title{
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding: 0.16rem 0.32rem;
      .wp-confirm{
        color: #e21020;
      }
    }
    .wp-imgwarp{
      justify-content: space-between;
      padding-left: 14px;
      .ki-arrow-right{
        line-height: 2.4rem;
        margin: 0 12px;
        float: right;
      }
      .imgitem{
        padding: 0.32rem 0.16rem;
        float: left;
      }
      .clear{ 
        clear:both
      } 
      img{
        width: 1.76rem;
        height: 1.76rem;
        border: 2px solid #999;
        border-radius: 8px;
      }
      .imgicon{
        line-height: 2.16rem;
        width: 1rem;
        height: 1.28rem;
        font-size: 0.48rem;
      }
    }
    .wp-ad{
      text-align: left;
      background-color: #fff;
      padding: 0.16rem 0.32rem;
      border-bottom: 1px solid #999;
    }
    .wp-payinfo{
      display: flex;
      justify-content: space-between;
      font-size: 0.48rem;
      line-height: 70px;
      padding: 0.16rem 0.24rem;
      background-color: #fff;
      button{
        font-size: 0.48rem;
        padding: 8px 16px;
        background: transparent;
        border: none;
        color: #fff;
        border-radius: 8px;
      }
      .btn-cancel{
        border: 1px solid #c9121e;
        color: #c9121e;
        margin-right: 4px;
      }
      .btn-pay{
        background-color: #c9121e;
      }
    }
  }
</style>
