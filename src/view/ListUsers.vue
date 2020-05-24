<template>
  <section>
	  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" >
         <el-form-item>
          <el-select v-model="filters.role" placeholder="Role">
            <el-option label="ALL" value=""></el-option>
            <el-option label="Teacher" value="Teacher"></el-option>
            <el-option label="Student" value="Student"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
					<el-input v-model="filters.name" placeholder="Name"></el-input>
				</el-form-item>
				
			</el-form>
		</el-col>

    <!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
      <el-table-column prop="HKID" label="HKID" width="135" sortable>
			</el-table-column>
			<el-table-column prop="first_name" label="F_Name" width="100" sortable>
			</el-table-column>
			<el-table-column prop="last_name" label="L_Name" width="100" sortable>
			</el-table-column>
			<el-table-column prop="email" label="Email" width="180"  sortable>
			</el-table-column>
			<el-table-column prop="type" label="Role" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="gender" label="Gender" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="Action" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button v-if="roles === 'Admin'" type="danger" size="small"  @click="handleDel(scope.$index, scope.row)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>

  </section>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
  data () {
    return {
       filters:{
         name:'',
         role:''
       },
       users: [],
       listLoading: false,
       roles:''
    }
  },
  mounted () {
    this.getUsers()
    this.roles = localStorage.getItem('role');
  },
  methods: {
    handleEdit: function (index,row) {
      this.$router.push({ name: "View User", query: { userID: row._id}})
    },
    getUsers() {
      let role = localStorage.getItem('role');
      let para = {
        name: this.filters.name,
        role: this.filters.role
      }
      this.listLoading = true
    
      axios.get('users/all').then(res => {   
           //this.users = res.data
        if(role === 'teacher'){
           this.users = (res.data).filter(onlyStudent => onlyStudent.type === "student")
        }else{
          this.users = res.data
        }  
        this.listLoading = false  
      })
 
    },
    handleDel (index,row) {
    this.$confirm('Are you sure to delete', '提示', {
        type: 'warning'
      }).then(() => {
        axios.delete('users/delUserbyID/' + row._id).then(res => {  
          this.$message({
            message: 'Successfully deleted',
            type: 'success'
          });
          this.getUsers();
          });
        }).catch(() => {
          
        })
    }
  },
  computed: { 
    filteredResources () {
      if (this.filters.role || this.filters.name) {
        console.log(this.filters.role);
        if(this.filters.role) {
          return this.users.filter((item) => {
            console.log(item);
            return item.type.includes(this.filters.role)
          })
        }
      } else {
        return this.getUsers()
        console.log(item);
      }
    }
  }
}
</script>
<style scoped>

</style>
