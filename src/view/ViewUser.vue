<template>
  <el-row gutter="20">
    <el-col span="12">
      <el-card>
        <div class="mb-3">User Info</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Icon">
            <el-col :span="30">
                <div class="image-preview" v-if="imageData.length > 0">
                <img class="preview" :src='imageData'>
                </div>	
            </el-col>
            <el-col :span="1">
              <input type="file" class="input" @change="previewImage" accept="image/*" style="width:75px; height:50px; position:absolute; bottom:46px; left:50%; margin-left:-155px">
            </el-col>
          </el-form-item>

      <el-form-item label="Role">
			<el-col :span="11">
				<el-select v-model="form.role" placeholder="select">
				<el-option label="Student" value="student"></el-option>
				<el-option label="Teacher" value="teacher"></el-option>
			  </el-select>
			</el-col>
			<el-col class="line" :span="5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp#HKID</el-col>
			  <el-col :span="6">
				<el-input v-model="form.HKID"></el-input>
			</el-col>
		</el-form-item>

        <el-form-item label="Name">
			<el-col :span="11">
				<el-input v-model="form.last_name" placeholder="Last Name"></el-input>
			</el-col>
			<el-col class="line" :span="2"></el-col>
			<el-col :span="11">
				<el-input v-model="form.first_name" placeholder="First Name"></el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="Gender">
			<el-radio-group v-model="form.gender">
				<el-radio label="Female"></el-radio>
				<el-radio label="Male"></el-radio>
			</el-radio-group>
		</el-form-item>
       
		<el-form-item label="Date">			
				<el-date-picker type="date" placeholder="select date" v-model="form.date" style="width: 100%;"></el-date-picker>
		</el-form-item>

        <el-form-item label="Email">
			<el-input v-model="form.email"></el-input>
		</el-form-item>

        <el-form-item label="Phone No.">
			<el-input v-model="form.phoneNo"></el-input>
		</el-form-item>

        <el-form-item label="Address">
			<el-input type="textarea" v-model="form.address"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit()">Save</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col span="12">

      <el-card >
        <div class="mb-3">Emergency Contact Person</div>
        <br>
        <el-form ref="form2" :model="form2">
        <el-form-item label="Class">
            <el-input v-model="form.e_c_person" placeholder="ECP Name"></el-input>
          </el-form-item>
          <el-form-item label="Department">
            <el-input v-model="form.e_c_person_no" placeholder="ECP Phone No."></el-input>
          </el-form-item>
        </el-form>
      </el-card>
<br><br>
      <el-card v-if="curr_user.typ === teacher">
        <div class="mb-3">Class Info</div>
        <br>
        <el-form ref="form2" :model="form2">
        <div v-for="(course,index) in teacherClass">
           <el-form-item label="course">{{index}}
            <el-tag size="medium"><span>{{course.course_code}}-{{course.course_name}}</span></el-tag>
          </el-form-item>
        </div>
        <el-form-item label="Remark">
           	<el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>

      </el-card>
      <el-card v-if="curr_user.type === student">
        <div class="mb-3">Class Info</div>
        <br>
        <el-form ref="form3" :model="form3">
        <el-form-item label="Class">
            <el-tag size="medium"><span>{{studentClass.class_name}}</span></el-tag>
          </el-form-item>
          <el-form-item label="Department">
            <el-tag size="medium"><span>{{studentClass.class_dept}}</span></el-tag>
          </el-form-item>
          <el-form-item label="Year">
             <el-tag size="medium"><span>{{studentClass.class_year}}</span></el-tag>
          </el-form-item>
          <el-form-item label="Remark">
           	<el-input type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
import util from '../js/util'
export default {
data () {
return {
    curr_user: [],
    form: {
        role: '',
        last_name: '',
        first_name: '',
        HKID: '',
        gender: '',
        date: '',        
        email: '',   
        phoneNo: '',
        address: '',
        e_c_person: '',
        e_c_person_no: '',
    },
    form2: {
        role: '',
        last_name: '',
        first_name: '',
        HKID: '',
        gender: '',
        date: '',        
        email: '',   
        phoneNo: '',
        address: '',
        e_c_person: '',
        e_c_person_no: '',
    },
    imageData: '',
    inputImg: '',
    editLoading: false,
    imageUrl:'',
    studentClass:[],
    teacherClass:[]
}
},
mounted () {
  axios.post('users/queryUser', {
      userID: this.$route.query.userID
  }).then((response) => {
      this.curr_user = response.data

      this.form.first_name = this.curr_user.first_name
      this.form.last_name = this.curr_user.last_name
      this.form.role = this.curr_user.type
      this.form.HKID = this.curr_user.HKID
      this.form.email = this.curr_user.email
      this.form.gender = this.curr_user.gender
      this.form.date = this.curr_user.bith_data
      this.form.phoneNo = this.curr_user.phone_no
      this.form.address = this.curr_user.address
      this.form.e_c_person = this.curr_user.e_c_person
      this.form.e_c_person_no = this.curr_user.e_c_person_no
      this.imageData = this.getURL()   

      if(this.curr_user.type == 'student'){
        axios.get('classes/all').then(res => {   
          let classes = res.data
          for(let i = 0; i < classes.length;i++){
            let student = classes[i].student
            let data = student.filter(classesstd => classesstd.student_id === this.$route.query.userID)
            if(data.length >= 0){
              this.studentClass = classes[i]
              console.log(this.studentClass)
            }
          }
        })
      }else if(this.curr_user.type == 'teacher'){
        axios.get('classes/all').then(res => {   
          let classes = res.data
          for(let i = 0; i < classes.length;i++){
            let class_TimeDetails = classes[i].class_TimeDetails
                let data = class_TimeDetails.filter(classesstd => classesstd.teacher_id === this.$route.query.userID)
                this.teacherClass = data
          }
        })
      }
  })
  
},
methods: {
  onSubmit() {
      console.log('submit!');
      let user = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email,
          HKID: this.form.HKID,
          type: this.form.role,
          phone_no: this.form.phoneNo,
          address: this.form.address,
          e_c_person: this.form.e_c_person,
          e_c_person_no: this.form.e_c_person_no,
          bith_data: this.form.date,
          gender: this.form.gender,
          photo: ''
      }
      user.photo = (!this.inputImg || this.inputImg == undefined) ? this.curr_user.photo : this.inputImg;
      user.bith_data = (!this.form.date || this.form.date == '') ? '' : util.formatDate.format(new Date(this.form.date), 'yyyy-MM-dd');
      this.$confirm('Do you confirm the submission?', 'Save', {}).then(() => {
          this.editLoading = true
          axios.put('users/updateUser/'+ this.$route.query.userID ,user)
          .then((response) => {
              this.editLoading = false
              this.$message({
                  message: 'Submitted successfully',
                  type: 'success'
              });
              console.log(response.data)
          })
      })
      

      
  },
  previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              this.imageData = e.target.result;
              this.inputImg = input.files[0].name;
              console.log(this.inputImg)
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);     
      }
  },
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  getURL(){
      return require('../assets/'+ this.curr_user.photo)
      console.log();
  }
}
}
</script>
<style scoped>
.file-upload-form, .image-preview {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 0px;
}
img.preview {
   position:relative;
    width:160px;
    height:150px;
    overflow:hidden;
    border-radius:50%;
}
</style>