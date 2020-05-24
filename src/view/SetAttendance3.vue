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
			<el-table-column type="index" width="60">
			</el-table-column>
            <el-table-column prop="student_last_name" label="Program code" width="160"  sortable>
			</el-table-column>
            <el-table-column prop="student_first_name" label="Program code" width="160"  sortable>
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
            <el-radio-group v-model="scope.row.state" >
            <el-radio-button :label="1" :key="1">Present</el-radio-button>
            <el-radio-button :label="0" :key="0">Absent</el-radio-button>
            </el-radio-group>
				</template>
			</el-table-column>
		</el-table>
    <br>
    <div style='float:right'>
      <el-button type="primary" @click="setAttend()">Set</el-button>
      <el-button>取消</el-button>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
  data () {

    return {
       data:false,
       state:'',
       filters:{
         search:''
       },
       setdata: [],
       setAttendance:[],
       listLoading: false,
       result: '',
       options: [{
          value: '0',
          label: 'Present'
        }, {
          value: '1',
          label: 'Absent'
        }],
    }
  },
  mounted () {
      //this.getClass()
      this.getAttendanceRecord()
  },
  methods: {
    getAttendanceRecord () {
       this.listLoading = true
       axios.get('attendances/all').then(res => {   
          let data_filter = res.data.filter( set => set.class_id === this.$route.query.class_id && set.class_TimeDetails_id === this.$route.query.class_TimeDetails_id && set.class_time === this.$route.query.class_time)
          if(data_filter.length != 0){
            for(let i = 0; i < data_filter.length; i++){
              this.setAttendance.push({
              _id: data_filter[i]._id,
              course_id: this.$route.query.course_id,
              class_id: this.$route.query.class_id,
              class_TimeDetails_id: data_filter[i].class_TimeDetails_id,
              class_time: data_filter[i].class_time,
              student_id:data_filter[i].student_id,
              student_last_name:data_filter[i].student_last_name,
              student_first_name :data_filter[i].student_first_name,
              state:data_filter[i].state, 
              })
            }
            this.listLoading = false
            this.data = true
          }else{
            this.listLoading = true
            this.getClass ()
            this.data = false
            this.listLoading = false
          }
          
        })
        
    },
    getClass () {
          let data = JSON.parse(this.$route.query.setAttendance)
          this.setdata = Object.assign({}, data)
          console.log(this.setdata.student);
          for(let i = 0; i < this.setdata.student.length; i ++){
          this.setAttendance.push({
              class_id: this.$route.query.class_id,
              course_id: this.$route.query.course_id,
              class_TimeDetails_id:this.setdata.class_TimeDetails_id,
              class_time: this.setdata.class_time,
              student_id:this.setdata.student[i].student_id,
              student_last_name:this.setdata.student[i].last_name,
              student_first_name :this.setdata.student[i].first_name,
              state:'', 
          })
          }            
    },
    setAttend () {
      console.log(this.setAttendance);
      if(!this.data){
        this.$confirm('Do you confirm to set the attendance?', 'Create', {}).then(() => {
          for(let i = 0 ;i < this.setAttendance.length; i++){
            axios.post('attendances/setAttedance', (this.setAttendance[i])).then(res => {
                console.log(res.data)
                //this.$router.push({ name: "Edit Program", query: { prgm_id: res.data.prgm_id}})
            })
            .catch(err => {
                console.log(err)
            })
            this.$message({
              message: 'Submitted successfully',
              type: 'success'
              });
          }
        })
      }else{
        this.$confirm('Do you confirm to set the attendance?', 'Set', {}).then(() => {
          for(let i = 0 ;i < this.setAttendance.length; i++){
            axios.put('attendances/UpdateAttd/'+ this.setAttendance[i]._id, (this.setAttendance[i]))
             .then((response) => {
                    console.log(response.data)
                })

                this.$message({
                  message: 'Submitted successfully',
                  type: 'success'
                 });
          }
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
