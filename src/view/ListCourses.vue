<template>
  <section>
	  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		<el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.search"
            size="mini"
            placeholder="Search by Course name"/>
        </el-form-item>				
		</el-form>
	 </el-col>

    <!--列表-->
		<el-table :data="courses.filter(data => !filters.search || data.dept_name.toLowerCase().includes(filters.search.toLowerCase()))" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
            <el-table-column prop="course_code" label="Course code" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="course_name" label="Course name" width="380"  sortable>
			</el-table-column>
            <el-table-column prop="dept_name" label="Department" min-width="80" sortable>
			</el-table-column>
			<el-table-column label="Action" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button v-if="roles === 'Admin'" type="danger" size="small" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
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
       courses: [],
       listLoading: false,
       result: ''
    }
  },
  mounted () {
    this.getCourse()
    this.roles = localStorage.getItem('role');
  },
  methods: {
      getCourse () {
          this.listLoading = true
          axios.get('courses/all').then(res => {   
            this.courses = res.data
            console.log(res.data)
            this.listLoading = false
          })
      },
      handleEdit: function (index,row) {
      this.$router.push({ name: "Edit Course", query: { courseID: row._id}})
    },
     handleDel (index,row) {
      this.$confirm('Are you sure to delete', 'Prompt', {
          type: 'warning'
        }).then(() => {
          axios.delete('courses/delcoursebyID/' + row._id).then(res => {  
            this.$message({
              message: 'Successfully deleted',
              type: 'success'
            });
            this.getCourse();
            });
          }).catch(() => {
            
          })
      }
  }
}
</script>
<style scoped>

</style>
