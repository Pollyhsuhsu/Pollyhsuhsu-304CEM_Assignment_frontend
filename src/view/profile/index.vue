<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab" @tab-click="handleClick">
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="Change Password" name="password">
                <password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      <el-dialog title="Enter Password" :visible.sync="dialogFormVisible" @close='closeDialog' :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCencel">Cancel</el-button>
          <el-button type="primary" @click="dialogConfim">Confirm</el-button>
        </span>
      </el-dialog>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import jwtDecode from 'jwt-decode'
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Password from './components/ChangePassword'
export default {
  name: 'Profile',
  components: { UserCard, Timeline, Account, Password },
  data() {
    return {
      user: {},
      activeTab: 'account',
      dialogFormVisible: false,
      form: {
          name: '',
          password: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        password:'',
        confirm_password: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    dialogConfim() {
      const token = localStorage.usertoken
      const decoded = jwtDecode(token)
      if (decoded) {
         const loginParams = { email: decoded.email, password: this.form.password };
          axios.post('users/login',loginParams).then(res =>{
            this.logining = false;
            if (res.data.error) {
              this.$message({
                message: res.data.error,
                type: 'error'
              })
              this.activeTab = "account"
            } else {
              this.dialogFormVisible = false
              this.activeTab = "password"
            }
          })      
      }
    },
    closeDialog(){
      this.form.password = '';//清空数据
    },
    dialogCencel() {
      this.dialogFormVisible = false
      this.activeTab = "account"
    },
    getUser() {
      const token = localStorage.usertoken
      const decoded = jwtDecode(token)
      if (decoded) {
      console.log(decoded);
        this.user = {
            email: decoded.email,
            role: decoded.type,
            name: decoded.last_name + ' ' + decoded.first_name,
            HKID: decoded.HKID,
            gender: decoded.gender,
            phoneNo: decoded.phone_no,
            date: decoded.date,
            address: decoded.address,
            avatar: this.getURL(decoded.photo)
        }
      }
    },
    getURL(img) {
      if(img == null){
        img = "unknow.png"
      }
			return require('../../assets/' + img)
    },
    handleClick(tab, event){
      console.log(tab.name, event);
      if(tab.name == 'password'){
        this.dialogFormVisible = true
      }
	  }
  }
}
</script>