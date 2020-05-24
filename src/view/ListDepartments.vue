<template>
  <section>
	  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
         <el-form-item>
          <el-input
            v-model="filters.search"
            size="mini"
            placeholder="Search by Department name"/>
        </el-form-item>				
			</el-form>
		</el-col>

    <!--列表-->
		<el-table :data="departments.filter(data => !filters.search || data.dept_name.toLowerCase().includes(filters.search.toLowerCase()))" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="dept_name" label="Department Name" min-width="100"  sortable>
			</el-table-column>
			<el-table-column prop="dept_head_name" label="Department Head" min-width="120"  sortable>
			</el-table-column>
			<el-table-column label="Action" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button type="danger" size="small" v-if="roles === 'Admin'" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
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
        search:''
      },
      departments: [],
      listLoading: false,
      result: '',
  }
},
mounted () {
  this.getDepartments()
  this.roles = localStorage.getItem('role');
},
methods: {
  handleEdit: function (index,row) {
    this.$router.push({ name: "Edit Department", query: { deptID: row._id}})
  },
  getDepartments() {
    let para = {
      name: this.filters.name,
      role: this.filters.role
    }
    this.listLoading = true
  
    axios.get('departments/all').then(res => {   
        this.departments = res.data
        this.listLoading = false
    })
  },
  handleDel (index,row) {
    this.$confirm('Are you sure to delete', 'Prompt', {
        type: 'warning'
      }).then(() => {
        axios.delete('departments/delDeptbyID/' + row._id).then(res => {  
          this.$message({
            message: 'Successfully deleted',
            type: 'success'
          });
          this.getDepartments();
          });
        }).catch(() => {
          
        })
    }
  }
}
</script>
<style scoped>

</style>
