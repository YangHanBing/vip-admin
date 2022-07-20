<template>
<div class="navbar">
    <el-menu
      :default-active="$route.path.slice(1)"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item v-for="item in tabList" :key="item.id" :index="item.tabPath">
        <i :class="item.tabIcon"></i>
        <span slot="title">{{item.tabName}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      tabList:[
        {
          id:1,
          tabName:"首页",
          tabIcon:"el-icon-s-home",
          tabPath:"home"
        },
        {
          id:2,
          tabName:"会员管理",
          tabIcon:"el-icon-user-solid",
          tabPath:"member"
        },
        {
          id:3,
          tabName:"供应商管理",
          tabIcon:"el-icon-s-cooperation",
          tabPath:"supplier"
        },
        {
          id:4,
          tabName:"商品管理",
          tabIcon:"el-icon-s-goods",
          tabPath:"goods"
        },
        {
          id:5,
          tabName:"员工管理",
          tabIcon:"el-icon-user",
          tabPath:"staff"
        }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang='scss'>
  .navbar{
    width: 200px;
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    overflow: auto;
    background-color: #545c64;
    border-right: none;
  }
</style>
