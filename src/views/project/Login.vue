<template>
<div>
  <div class="logindiv">
    <div class="header">工程质量管理平台</div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
  <Footer></Footer>
</div>
</template>

<script>
import Footer from "components/Footer.vue";
import { requestLogin } from "api/api";
import SHA1 from "js-sha1";
//import NProgress from 'nprogress'

import { LoginUsers } from "../../mock/data/users";

export default {
  components: {
    Footer
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length > 12) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length > 12) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, trigger: "blur", validator: validatePassword }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  created: function() {
    let account = localStorage.getItem("account");
    if (account) {
      this.ruleForm2 = JSON.parse(account);
    }
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      //记住密码
      if (this.checked == true) {
        localStorage.setItem("account", JSON.stringify(this.ruleForm2));
      } else {
        localStorage.removeItem("account");
      }

      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;

          var username = this.ruleForm2.account;
          var password = this.ruleForm2.checkPass;
          var params = new URLSearchParams();
          params.append("username", username);
          params.append("password", password);
          console.log(this.$store.state.baseURL)
        this.$http({
            baseURL: this.$store.state.baseURL,
            url: "/login",
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: params
          })
            .then(res => {
              let token = res.data.access_token;
              this.$cookies.set("token", token);
              this.$cookies.set("userName", username);
              this.$http.defaults.headers["Authorization"] = token;
              this.$store.dispatch("UpdateMenu").then(() => {
                this.$router.addRoutes(this.$store.getters.getRouter);
                this.$router.options.routes.push(...this.$store.getters.getRouter)
                this.$router.push({ path: "/" });
              });
            })
            .catch(error => {
              this.logining = false;
              let msg = error.response.data.message;
              this.$message({
                message: msg,
                type: "error"
              });
            });

          // this.loading = true
          // this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/desk' })
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  background-clip: padding-box;
  margin: 10px auto 180px;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.header {
  text-align: center;
  margin: 100px auto 20px;
  font-size: 50px;
}
.logindiv {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  background-image: url("../../../static/image/background.png");
}
</style>