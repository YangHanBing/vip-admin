<template>
<div class="header">
    <div class="left">
      <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="">
      <p>星空会员管理系统</p>
    </div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: '',
  components: {
   
  },
  data () {
    return {
    }
  },
  computed: {
    //获取vuex中的userInfo
    username(){
      return this.$store.state.userInfo?this.$store.state.userInfo.username:""
    }
  },
  created () { },
  mounted () { },
  methods: {
     //下拉点击事件
    handleCommand(command){
      switch(command){
        case "changePassword":
          this.handleChangePassword()
          break;
        case "logOut":
          this.handleLogOut()
          break;
      }
    },
    handleChangePassword(){
      alert("修改密码")
    },
    //退出登录事件
    async handleLogOut(){
      const logout=await this.$store.dispatch("handleClearLocal")
      if(!logout) return
      this.$router.push("/login")
      this.$message.success(logout)

    },
  }
}
</script>
<style scoped lang='scss'>
 .header{
    height: 50px;
    background-color: #2d3a4b;
    color: #fff;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      img{
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
    }
    .el-dropdown{
      color: #fff;
    }
  }
</style>
