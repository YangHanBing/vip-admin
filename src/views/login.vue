<template>
<div class="login">
    <div class="box">
        <h2>星空会员管理系统</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import router from "@/router";
import store from "@/store";
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const response = await this.$store.dispatch("handleLogin",this.ruleForm)
          if(!response) return
          // const userInfo = await this.$store.dispatch("setUserInfo")
          // if(!userInfo) return
          this.$message.success("登录成功")
          this.$router.push("/")
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.login {
  background-image: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    box-sizing: border-box;
    padding: 20px 0;
    width: 400px;
    height: 300px;
    border-radius: 30px;
    background-color: #cecfd7;
    text-align: center;
  }
  .el-form {
    margin-top: 20px;
    width: 350px;
  }
}
</style>
