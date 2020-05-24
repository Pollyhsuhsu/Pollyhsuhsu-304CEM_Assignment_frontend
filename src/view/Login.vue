<template>
  <div class="bg">
    <h3 class="login-container1 ">School Attendance System</h3>
    <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">{{ $t("message.Login") }}</h3>
      <el-form-item prop="account">
        <el-input 
        type="text" 
        v-model="loginForm.account" 
        auto-complete="off" 
        prefix-icon="el-icon-s-custom"
        :placeholder="$t('message.Email')"></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input
          v-model="loginForm.checkPass"
          :placeholder="$t('message.Password')"
          prefix-icon="el-icon-lock"
          show-password
          clearable
        ></el-input>
        <!-- <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="Password"></el-input> -->
      </el-form-item>
      <el-form-item>
       <div style="float:right;cursor: pointer;" @click ="register"><u>{{ $t("message.newUser") }}</u></div>
      </el-form-item>
      
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{ $t("message.Login") }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
//import router from '../router'
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      logining: false,
      loginForm: {
        account: '',
        checkPass: '',
        users:''
      },
      rules2: {
        account: [
          { required: true, message: this.$t('message.message1'), trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: this.$t('message.message2'), trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  mounted () {
    this.checkUserDB()
  },
  methods: {
    setLang: function(lang){
      this.$store.dispatch('setLang', lang)
    },
    handleReset2() {
      this.$refs.loginForm.resetFields()
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          /*_this.$router.replace('/table');*/
          this.logining = true;
          //NProgress.start();
          const loginParams = { email: this.loginForm.account, password: this.loginForm.checkPass };
          axios.post('users/login',loginParams).then(res =>{
            this.logining = false;
            if (res.data.error) {
              this.$message({
                message: res.data.error,
                type: 'error'
              })
            } else {
              localStorage.setItem('usertoken', res.data)
              this.$router.push({ path: '/main' })
            }
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    checkUserDB (){
      axios.get('users/all').then(res => {   
        this.users = res.data
        console.log(this.users)
      })

      if(!this.users){
        let para = {
          first_name: "Admin",
          last_name: "IT",
          email: "Admin",
          password: '123123',
          phone_no: "23122209",
          type: "Admin",
          address: "Admin address",
          photo: "admin.jpg"
        }
        axios.post('users/register', (para)).then(res => {
          console.log(res.data.userID)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    register(){
      localStorage.setItem('usertoken', 'register')
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
    /* The image used */
    background-image: url("https://www.eschoolnews.com/files/2018/07/attendance.jpg");

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  // margin: 180px auto;
  margin-right: 180px;
  margin-left: 180px;
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
}

.login-container1 {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  margin-top: 180px;
  margin-right: 180px;
  margin-left: 180px;
  width: 350px;
  padding: 35px 35px 15px 35px;
}
</style>