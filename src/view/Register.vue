<template>
<div class="bg">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">Register</h3>

    <el-form-item prop="Email">
      <el-input type="text" v-model="ruleForm2.email" auto-complete="off" placeholder="Email"></el-input>
    </el-form-item>

    <el-form-item prop="Role">
        <el-col :span="11">
            <el-select v-model="ruleForm2.role" placeholder="select">
            <el-option label="Student" value="student"></el-option>
            <el-option label="Teacher" value="teacher"></el-option>
            </el-select>
        </el-col>
        <el-col class="line" :span="2">&nbsp</el-col>
        <el-col :span="6">
            <el-input v-model="ruleForm2.HKID" placeholder="HKID"></el-input>
        </el-col>
    </el-form-item>

    <el-form-item prop="Name">
        <el-col :span="11">
            <el-input v-model="ruleForm2.last_name" placeholder="Last Name"></el-input>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
            <el-input v-model="ruleForm2.first_name" placeholder="First Name"></el-input>
        </el-col>
    </el-form-item>

    <el-form-item prop="Gender">
        <el-radio-group v-model="ruleForm2.gender">
            <el-radio label="Female"></el-radio>
            <el-radio label="Male"></el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item prop="Phone No.">
        <el-input v-model="ruleForm2.phoneNo" placeholder="Phone No." ></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">Register</el-button>
    </el-form-item>

    <el-form-item>
       <div style="float:right;cursor: pointer;" @click ="login"><u>Already have an Account? Login</u></div>
      </el-form-item>
  </el-form>
</div>
</template>

<script>
  // import { requestLogin } from '../api/api';
  import axios from 'axios'
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          email: '',
          role:'',
          HKID:'',
          last_name:'',
          first_name:'',
          phoneNo:'',
        },
        rules2: {
          email: [
            { required: true, message: 'Please enter email', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          HKID: [
            { required: true, message: 'Please enter email', trigger: 'blur' },
            //{ validator: validaePass }
          ],
        },
        checked: true
      };
    },
    methods: {
    randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },
      register () {
            let para = {
                first_name: this.ruleForm2.first_name,
                last_name: this.ruleForm2.last_name,
                email: this.ruleForm2.email,
                HKID: this.ruleForm2.HKID,
                type: this.ruleForm2.role,
                password: this.randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                phone_no: this.ruleForm2.phoneNo,
                gender: this.ruleForm2.gender,
            }
            axios.post('users/register', (para)).then(res => {
              //this.$router.push({ name: "View User", query: { userID: res.data.userID}})
              axios.post('email/sendemail',(para)).then(res => {
                if(res.status == 200){
                  this.$message({
                    message: res.data.response,
                    type: 'success',
                    duration: 5 * 1000
                  });
                  localStorage.removeItem('usertoken')
                  this.$router.push({ path: '/login' })
                }
              })
            }).catch(err => {
                console.log(err)
            })
        },

      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
              this.register();
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      login(){
        localStorage.removeItem('usertoken')
        this.$router.push({ path: '/login' })
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
  margin: 180px auto;
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