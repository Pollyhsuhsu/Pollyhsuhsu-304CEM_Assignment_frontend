<template>

<el-row gutter="24">
  <el-card>
      <el-col :span="6">
       <el-input v-model="form.pgrm_code" disabled><template slot="prepend">Program Code</template></el-input>
      </el-col>
     
      <el-col :span="10">
        <el-input v-model="form.pgrm_name" disabled><template slot="prepend">Program Name</template></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="form.dept_name" disabled><template slot="prepend">Department</template></el-input>
      </el-col>
      <br><br>
  </el-card>
<br>
<el-row gutter="20">
    <el-col span="12">
      <el-card>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        
        
        <el-col :span="11">
				<el-form-item label="Year">
        <el-input-number v-model="form.year" @change="handleChange" :min="1" :max="2"></el-input-number>
        </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
        <el-col :span="11">
        <el-form-item label="Class" prop="class_name">
        <el-input v-model="form.class_name" style="width:60%"></el-input>
        </el-form-item>
        </el-col>

      </el-form>
      </el-card>
    </el-col>
    
    <el-col span="12">
      <el-card>
        <el-form ref="form" label-position="top" :model="form">
          <el-switch
            v-model="form.active"
            :active-value="true"
            :inactive-value="false"
            active-text="Active"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form>
      </el-card>
    </el-col>
  </el-row>  
  <br>
  <el-card>
    <div>Course</div><br>
      <el-collapse accordion @change="handleChange">
      <div v-for="(course,index) in coursesTime">
      <el-collapse-item  :title="course.course_code +  ' - '  +course.course_name" :name="index" >
        <el-row :gutter="24">

        <el-col :span="7">
        <div class="block">
        <span class="demonstration">Date</span>
          <el-date-picker
            v-model="course.date"
            type="daterange"
            range-separator="-"
            start-placeholder="Start"
            end-placeholder="End"
            style="width:100%">
          </el-date-picker>
        </div>
        </el-col>

        <el-col :span="4">
          <span class="demonstration">Time</span>
          <div class="block">
             <el-time-select
              placeholder="Start Time"
              style="width:100%"
              v-model="course.startTime"
              :picker-options="{
                start: '08:00',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
          </div>
        </el-col>

        <el-col :span="4">
        <div class="block">
        <br>
          <el-time-select
              placeholder="End Time"
              style="width:100%"
              v-model="course.endTime"
              :picker-options="{
               start: '08:00',
                step: '00:15',
                end: '18:30',
                minTime: startTime
              }">
            </el-time-select>
        </div>
        </el-col>

        <el-col :span="4" >
          <div class="block">
          <span class="demonstration">Weekday</span>
          <el-select style="width:100%" v-model="course.weekday" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="course.course_id" type="hidden"></el-input>
        <el-input v-model="course.course_name" type="hidden"></el-input>
        </div>
        </el-col>

        <el-col :span="4">
        <span class="demonstration">Tutor</span>
        <div class="block">
        <el-select v-model="course.teacher_id" filterable placeholder="Please select" @change="onSelectedDrug($event, teachers)">
          <el-option
            v-for="teacher in teachers"
            :key="teacher.last_name + ' ' + teacher.first_name"
            :label="teacher.last_name + ' ' + teacher.first_name"
            :value="teacher._id">
            </el-option>
           </el-select>
          </div>
        </el-col>

        </el-row>
      </el-collapse-item>
      </div>
      </el-collapse>
      <br><br>
  </el-card>
  <br><br>
       <el-card>
        <el-table @selection-change="selsChange" v-loading="listLoading"
          ref="multipleTable"
          :data="addStudents"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
		  </el-table-column>
          <el-table-column
            prop="last_name" 
            label="Last Name"
            width="120">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column
            prop="first_name"
            label="First Name"
            width="120">
          </el-table-column>
          <el-table-column
      align="right">
      <template slot="header" slot-scope="scope" v-if="roles === 'Admin'">
          <el-button type="primary" size="small" @click="AddStudent()">Add Student</el-button>
      </template>
      <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Delete</el-button>
    </el-table-column>
  </el-table>
      </el-card>
  <br><br><br>
    <div style='float:right' v-if="roles === 'Admin'">
      <el-button type="primary" @click="activePrgm()">Save</el-button>
      <el-button>取消</el-button>
    </div>
</el-row>

</template>
<script>
import util from '../js/util'
import axios from 'axios'
import router from '../router'

export default {
data () {
    return {
        depts:[],
        pgrms:{},
        data:[],
        students: [],
        addStudents:[],
        active: true,
        listLoading: false,
        selected: [],
        search:'',
        form:{
            prgm_name: '',
            dept_id:'',
            dept_name:'',
            prgm_code:'',
            class_name:'',
        },
        rules: {
          class_name: [
            // { type: 'String', required: true, message: 'Only String', trigger: 'blur' },
              { min: 1, max: 1, message: 'Pleace input A-Z for class', trigger: 'blur' }
          ],
        },
        coursesTime:[],
        options: [{
          value: '1',
          label: 'Monday'
        }, {
          value: '2',
          label: 'Tuesday'
        }, {
          value: '3',
          label: 'Wednesday'
        }, {
          value: '4',
          label: 'Thursday'
        }, {
          value: '5',
          label: 'Friday'
        }, {
          value: '6',
          label: 'Saturday'
        }
        , {
          value: '0',
          label: 'Sunday'
        }],
        courses:[{
            course_id:'',
            course_name: '',
            course_code: ''
        },],
        //data: generateData(),           
    }
},
mounted () {
  this.loadDept()
  this.getTeacher()

//   this.getStudent()
  this.handleEdit ()
},
methods: {
    handleEdit (){
        let pgrm = []
        
        axios.post('classes/queryClassbyID/'+ this.$route.query.class_id)
            .then((response) => {
                console.log(response.data)
                this.curr_class = response.data
                this.form.active = this.curr_class.active,
                this.form.year = this.curr_class.class_year,
                this.form.pgrm_code = this.curr_class.class_pgrmCode,
                this.loadPgrm(this.curr_class.class_pgrmCode)
                this.form.class_name = (this.curr_class.class_name).slice((this.curr_class.class_name).length - 1)
                this.coursesTime = this.curr_class.class_TimeDetails,
                this.addStudents = this.curr_class.student
                console.log(this.addStudents)
            })
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    getTeacher(){
      axios.get('users/all').then(res => { 
        this.users = res.data
        this.teachers = this.users.filter(user => user.type === "teacher")  
      })
    },
    getStudent (){
      this.listLoading = true
       axios.get('users/all').then(res => {   
        this.students = (res.data).filter(student => student.type === 'student')
      })
      this.listLoading = false
    },
    loadDept () {
        axios.get('departments/all').then(res => { 
          this.depts = res.data
        })
    },
    loadPgrm (pgrmCode) {
        axios.get('programs/all').then(res => { 
          this.pgrms = (res.data).filter(pgrm => pgrm.pgrm_code === pgrmCode) 
          this.form.pgrm_name = this.pgrms[0].pgrm_name
          this.form.dept_name = this.pgrms[0].dept_name
        })
    },
    onSelectedPgrm(event,item){
        axios.post('programs/queryPrgmbyID/'+ this.form.pgrm_id)
        .then((response) => {
            console.log(response.data)
            this.curr_prgm = response.data
            this.form.pgrm_name = this.curr_prgm.pgrm_name   
            this.form.dept_id = this.curr_prgm.dept_id
            this.form.dept_name = this.curr_prgm.dept_name
            this.form.pgrm_code = this.curr_prgm.pgrm_code
            for(let i = 0; i< this.curr_prgm.courses.length;i++){
              this.coursesTime.push({
                course_id: this.curr_prgm.courses[i].course_id,
                course_code: this.curr_prgm.courses[i].course_code,
                course_name: this.curr_prgm.courses[i].course_name,
                startTime:'',
                endTime:'',
                teacher_id:'',
                weekday:[],
                timeList:[]
               })
            }
        })
        
    },
      handleChange(index) {
      console.log(index);
    },
    daysBetween(DateOne,DateTwo){
      let OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-')); 
	    let OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1); 
	    let OneYear = DateOne.substring(0,DateOne.indexOf ('-')); 
	    let TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-')); 
	    let TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1); 
	    let TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-')); 
	    let cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);    
	    return Math.abs(cha);
    },
    getMyDay(date){
    let week;
      if(date.getDay()==0) week="0"
      if(date.getDay()==1) week="1"
      if(date.getDay()==2) week="2"
      if(date.getDay()==3) week="3"
      if(date.getDay()==4) week="4"
      if(date.getDay()==5) week="5"
      if(date.getDay()==6) week="6"
      return week;
    },
    GetDateStr(AddDayCount,time){
      let dd = new Date(time);
	      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	    let y = dd.getFullYear();
	    let m = dd.getMonth()+1;//获取当前月份的日期
	    let d = dd.getDate();
	    return y+"-"+m+"-"+d;
    },
    setTimeList(index,weekday){ 
      let start = util.formatDate.format(new Date(this.coursesTime[index].date[0]), 'yyyy-MM-dd')
      let end = util.formatDate.format(new Date(this.coursesTime[index].date[1]), 'yyyy-MM-dd')
      let d_length = this.daysBetween(start,end)
      let save_stime = start;
      //let all_time = [];
      for (var i = 0; i < d_length; i++){
        for(var x = 0; x < weekday.length; x++){
          if(this.getMyDay(new Date(save_stime)) == weekday[x]){
            this.coursesTime[index].timeList.push(save_stime)
          }
        }
          save_stime = this.GetDateStr(1,save_stime)
      }
    },
    activePrgm(){
    //  for(let i = 0; i < this.coursesTime.length;i++){
    //    this.setTimeList(i,this.coursesTime[i].weekday)
    //  }
    //  for(let i = 0; i < this.sels.length;i++){
    //    this.addStudents.push({
    //      first_name: this.sels[i].first_name,
    //      last_name: this.sels[i].last_name,
    //      student_id: this.sels[i]._id
    //    })
     //}
     let para= {
       class_name: this.form.pgrm_code+'/'+this.form.year+(this.form.class_name).toUpperCase(),
       active: this.form.active,
       class_year: this.form.year,
       class_pgrmCode: this.form.pgrm_code,
       class_TimeDetails: this.coursesTime,
       class_students:  this.addStudents
     }
     console.log(para);
     this.$confirm('Do you confirm to create a new program?', 'Create', {}).then(() => {
    //    axios.post('classes/createClass', (para)).then(res => {
    //       console.log(res.data)
    //       this.$router.push({ name: "Edit Class", query: { class_id: res.data.class_id}})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
        this.$message({
            message: 'Submitted successfully',
            type: 'success'
        });
     })
    }
},  
}
</script>