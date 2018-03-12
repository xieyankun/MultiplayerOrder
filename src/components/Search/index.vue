<template>
  <div class="k-search">
    <p class="k-type" v-show="select" @click="selectRole()">{{roleName}} <img src="./down.png" alt=""></p>
    <p class="k-input" @click="goSearch()">
      <i class="icon udmps ki-search"></i> 找商品、找品牌
    </p>
    <div class="select-wrap" v-show="isrole">
      <div class="select-role">
        <div class="slt-title">
          选择用户类别
        </div>
        <div class="slt-role">
          <p @click="selectCompay()">企业</p>
          <p @click="selectPersonal()">个人</p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { fetchAPI } from '@/utils/ajaxUtil'

export default {
  props: {
    select: {
      type: Boolean
    }
  },
  data () {
    return {
      roleName: '企业',
      isrole: false,
      user: this.$route.meta.user
    }
  },
  created () {
    if (!this.user.customer_type) {
      this.isrole = true
    }
    this.roleName = this.user.customer_type == 1 ? "个人" : "企业"
  },
  methods: {
    goSearch () {
      this.$router.push({name: 'Search'})
    },
    selectRole () {
      this.isrole = true
    },
    async selectCompay () {
      const data = {
        customer_type: 2
      }
      const user = await fetchAPI('PATCH', `/api/customers/${this.user.id}/`, { data })
      sessionStorage.setItem('authUserJsonStr', JSON.stringify(user))
      this.roleName = '企业'
      this.isrole = false
    },
    async selectPersonal () {
      const data = {
        customer_type: 1
      }
      const user = await fetchAPI('PATCH', `/api/customers/${this.user.id}/`, { data })
      sessionStorage.setItem('authUserJsonStr', JSON.stringify(user))
      this.roleName = '个人'
      this.isrole = false
    }
  }
}
</script>

<style lang="scss">
.k-search{
  border-bottom: 1px solid #eee;
  padding: 0 0.32rem;
  height: 1.28rem;
  background-color: #c9121e;
  display: flex;
  align-items: center;

  img{
    width: 0.48rem;
    vertical-align: middle;
  }
  .k-type{
    color: #FFF;
    padding-right: 0.22rem;
  }
  .k-input{
    flex: 1;
    padding: 16px;
    text-align: left;
    background-color: #f4d0d2;
    border-radius: 0.16rem;
    font-size: 0.373333rem;
    cursor: pointer;
    color: #735353;
    i{
      vertical-align: middle;
    }
  }
  .select-wrap{
    // display: none;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  }
  .select-role{
    width: 80%;
    background-color: #FFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    .slt-title{
      background-color: #ebebeb;
      font-size: 0.48rem;
      color: #666;
      text-align: left;
      padding: 0.16rem 0.48rem;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
    .slt-role{
      font-size: 0.48rem;
      display: flex;
      p{
        flex: 1;
        margin: 0.32rem;
        border: 1px solid #b7b7b7;
        padding: 12px 24px;
        border-radius: 8px;
      }
    }
  }
}
</style>
