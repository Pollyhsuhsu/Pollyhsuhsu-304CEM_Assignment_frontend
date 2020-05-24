<template>
  <el-form :rules="rules2">
    <el-form-item label="New password" prop="checkPass">
        <el-input
          v-model="new_password"
          maxlength="16"
          placeholder="password"
          prefix-icon="el-icon-lock"
          show-password
          clearable
        ></el-input>
      </el-form-item>
    <el-form-item label="Confirm Password" prop="checkConPass">
        <el-input
          v-model="confirm_password"
          maxlength="16"
          placeholder="Confirm password"
          prefix-icon="el-icon-lock"
          show-password
          clearable
        ></el-input>
      </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
export default {
  data() {
     let missionPass = (rule, value, callback) => { //就是我们的回调函数，需要大家注意的是，这个没有在return的对象中，在data中
      console.log(value)
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      new_password:'',
      confirm_password: '',
      rules2: {
        checkPass: [
          { required: true, message: 'Please input Password', trigger: 'blur' },
          //{ validator: missionPass }
        ],
        checkConPass: [
          { required: true, message: 'Please input Password', trigger: 'blur'},
          //{ validator: validaePass2 }
        ]
      },
    }
  },
  methods: {
    submit() {
      var user = localStorage.getItem('usertoken');
      const token = localStorage.usertoken
      const decoded = jwtDecode(token)
      if (decoded) {
         const loginParams = { email: decoded.email, password: this.confirm_password };
          axios.put('users/updatePassword',loginParams).then(res =>{
            console.log(res);
            if(res.status == 200){
              this.$message({
                message: 'Password has been updated successfully',
                type: 'success',
                duration: 5 * 1000
              })
            }
          })      
      }      
    }
  }
}
</script>