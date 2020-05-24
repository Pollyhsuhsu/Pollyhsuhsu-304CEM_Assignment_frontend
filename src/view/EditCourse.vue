<template>

<el-row>
    <br>
    <el-card>
    <el-form ref="form" :model="form" label-position="top">

        <el-form-item label="Department">
            <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item label="Department" >
                    <el-select v-model="form.dept_id" filterable placeholder="Please select" @change="onSelectedDrug($event, depts)">
                        <el-option
                        v-for="dept in depts"
                        :key="dept._id"
                        :label="dept.dept_name"
                        :value="dept._id">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Credits">
                    <el-input-number v-model="form.credits" :min="1" :max="50" @change="handleChange" label="Credits"></el-input-number>
                    </el-form-item>
                    <el-input v-model="form.dept_name" type="hidden"></el-input>
                </el-col>
            </el-row>
        </el-form-item>

        <el-form-item label="Course Name">
            <el-input v-model="form.course_name" placeholder="Course Name"></el-input>
        </el-form-item>

        <el-form-item label="Course Code">
            <el-input v-model="form.course_code" placeholder="Course Code"></el-input>
        </el-form-item>

        <el-form-item label="Description">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>

    </el-form>
    </el-card>
    <br><br>
        <div style='float:right' v-if="roles === 'Admin'">
            <el-button type="primary" @click="updateCourse()">Save</el-button>
            <el-button>取消</el-button>
        </div>
    </el-row>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
    data () {
        return {
            depts:[],
            form: {
                course_name: '',
                course_code: '',
                description: '',
                dept_id: '',
                dept_name: '',
                credits: ''
            },
		}
    },
    mounted () {
      this.loadDept()
      this.handleEdit()
      this.roles = localStorage.getItem('role');
    },
    methods: {
        loadDept () {
            axios.get('departments/all').then(res => { 
                this.depts = res.data
            })
        },
        handleEdit(){
            
        axios.post('courses/queryCoursebyID/'+ this.$route.query.courseID)
            .then((response) => {
                this.curr_course = response.data
                
                this.form.course_name= this.curr_course.course_name
                this.form.credits= this.curr_course.credits
                this.form.course_code = this.curr_course.course_code
                this.form.description= this.curr_course.description
                this.form.dept_name= this.curr_course.dept_name
                this.form.dept_id = this.curr_course.dept_id
            })
        },
        onSelectedDrug(event,item){
            axios.post('departments/queryDeptbyID/'+ this.form.dept_id )
            .then((response) => {
                this.curr_dept = response.data
                this.form.dept_name = this.curr_dept.dept_name     
            })
        },
        handleChange(value) {
            this.form.credits = value
        },
        updateCourse () {
            let para = {
                course_name: this.form.course_name,
                course_code: this.form.course_code,
                dept_id: this.form.dept_id,
                dept_name: this.form.dept_name,
                credits: this.form.credits,
                description: this.form.description
            }
            console.log(para)
            this.$confirm('Do you confirm the submission?', 'Save', {}).then(() => {
                axios.put('courses/UpdateCourse/'+ this.$route.query.courseID, para)
                .then((response) => {
                    this.editLoading = false
                    this.$message({
                        message: 'Submitted successfully',
                        type: 'success'
                    });
                    console.log(response.data)
                })
            })
        }
    }
}
</script>