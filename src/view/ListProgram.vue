<template>
  <section>
	  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		<el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input
            v-model="filters.search"
            size="mini"
            placeholder="Search by Program name"/>
        </el-form-item>				
		</el-form>
	 </el-col>

    <!--列表-->
		<el-table :data="programs.filter(data => !filters.search || data.pgrm_name.toLowerCase().includes(filters.search.toLowerCase()))" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
            <el-table-column prop="pgrm_code" label="Program code" width="160"  sortable>
			</el-table-column>
			<el-table-column prop="pgrm_name" label="Program name" width="380"  sortable>
			</el-table-column>
            <el-table-column prop="dept_name" label="Department" min-width="80" sortable>
			</el-table-column>
			<el-table-column label="Action" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-button type="danger" size="small" >Delete</el-button>
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
       programs: [],
       listLoading: false,
       result: ''
    }
  },
  mounted () {
      this.getPgrm()
  },
  methods: {
      getPgrm () {
          this.listLoading = true
          axios.get('programs/all').then(res => {   
            this.programs = res.data
            console.log(res.data)
            this.listLoading = false
          })
      },
      handleEdit: function (index,row) {
      this.$router.push({ name: "Edit Program", query: { prgm_id: row._id}})
    },
    }
}
</script>
<style scoped>

</style>
