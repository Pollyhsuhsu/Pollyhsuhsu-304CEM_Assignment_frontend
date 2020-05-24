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
		<el-table :data="setAttendance" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="180">
			</el-table-column>
            <el-table-column prop="class_time" label="Class Time" min-width="200"  sortable>
			</el-table-column>
			<el-table-column label="操作" width="200" >
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">Edit</el-button>
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
       setdata: [],
       setAttendance:[],
       listLoading: false,
       result: ''
    }
  },
  mounted () {
      this.getClass()
  },
  methods: {
      getClass () {
          //class_id
           let data = JSON.parse(this.$route.query.setAttendance)
           this.setdata = Object.assign({}, data)
           console.log(this.setdata);
           for(let i = 0; i < this.setdata.timeList.length; i ++){
            this.setAttendance.push({
                class_id: this.$route.query.class_id,
                class_time: this.setdata.timeList[i],
                class_TimeDetails_id: this.$route.query.class_TimeDetails_id,
                student:[],
            })
           }

           axios.post('classes/queryClassbyID/'+ this.$route.query.class_id)
            .then((response) => {
                console.log(response.data.student)
                for(let i = 0; i < this.setdata.timeList.length; i ++){
                    this.setAttendance[i].student = response.data.student
                }

            })
            
           console.log(this.setAttendance);
           //console.log(this.setAttendance.timeList)
      },
      handleEdit: function (index,row) {
          console.log(row)
          let data = JSON.stringify(row) 
          this.$router.push({ name: "Set Attendance3", query: { setAttendance: data , class_id: this.$route.query.class_id ,course_id:this.$route.query.course_id, class_TimeDetails_id: this.$route.query.class_TimeDetails_id , class_time: row.class_time}})
    },
    }
}
</script>
<style scoped>

</style>
