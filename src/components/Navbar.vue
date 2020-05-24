<template>
<div class="header">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
          <ul class="navbar-nav">
              <li class="nav-item">
                  <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li v-if="auth==''" class="nav-item">
                  <router-link class="nav-link" to="/login">Login</router-link>
              </li>
                <li v-if="auth==''" class="nav-item">
                  <router-link class="nav-link" to="/loginTest">LoginTest</router-link>
              </li>
              <li v-if="auth==''" class="nav-item">
                  <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li v-if="auth=='loggedin'" class="nav-item">
                  <router-link class="nav-link" to="/profile">Profile</router-link>
              </li>

              <li v-if="auth=='loggedin'" class="nav-item">
                  <router-link class="nav-link" to="/listStudentInfo">Studuent Infomation</router-link>
              </li>

              <li v-if="auth=='loggedin'" class="nav-item">
                  <a class="nav-link" href="" v-on:click="loginout">Logout</a>
              </li>

			<div v-if="auth=='loggedin'" class="user-info">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						<img class="user-logo" :src='userIcon'>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="profile">Profile</el-dropdown-item>
						<el-dropdown-item> <a class="nav-link" href="" v-on:click="loginout">Logout</a></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        	</div>

          </ul>
      </div>
  </nav>
</div>
</template>

<script>
import EventBus from './EventBus'
import jwtDecode from 'jwt-decode'

EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  data () {
    return {
      auth: '',
      user: '',
      userIcon: ''
    }
  },
  methods: {
    loginout (){
      localStorage.removeItem('usertoken')
    },
	  handleCommand(command) {
      if (command == 'profile') {
        this.$router.push('/profile');
		  }
    },
    getURL(img) {
      return require('../assets/' + img)
    }
  },
    mounted () {
      EventBus.$on('logged-in', status => {
        this.auth = status
      })

      var user = localStorage.usertoken;
			if (user) {
        const decoded = jwtDecode(user)
        console.log(decoded);
				this.userIcon = this.getURL(decoded.photo);
			}
    }
  }
</script>
<style>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	font-size: 18px;
	line-height: 20px;
	color: #fff;
}
.nav-link{
	float: left;
    width:250px;
	padding: 20px 30px;
    text-align: center;
}

nav a{
    display:inline-block;
    padding: 18px 30px;
    color:#fff !important;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    text-transform: uppercase;
}
nav a:hover {
  background: blue;
}
.user-info {
	float: right;
	padding-right: 0px;
	font-size: 10px;
	color: #fff;
    }

.user-info .el-dropdown-link{
	position: relative;
	display: inline-block;
	padding-left: 60px;
	color: #fff;
	cursor: pointer;
	vertical-align: middle;
}
.user-info .user-logo{
	position: absolute;
	left:0;
	width:40px;
	height:40px;
	border-radius: 50%;
}
.el-dropdown-menu__item{
	text-align: center;
}
</style>