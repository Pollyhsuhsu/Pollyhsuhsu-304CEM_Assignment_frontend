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
        <div style='float:right'>
            <el-button type="primary" @click="addCourse()">Create</el-button>
            <el-button>Cancel</el-button>
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
    },
    methods: {
        loadDept () {
            axios.get('departments/all').then(res => { 
                this.depts = res.data
            })
        },
        handleChange(value) {
            this.form.credits = value
        },
        onSelectedDrug(event,item){
            axios.post('departments/queryDeptbyID/'+ this.form.dept_id )
            .then((response) => {
                console.log(response.data)
                this.curr_dept = response.data
                this.form.dept_name = this.curr_dept.dept_name                 
            })
        },
        addCourse () {
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
                axios.post('courses/createCourse', (para)).then(res => {
                    console.log(res.data)
                //router.push({ name: "ViewUser", query: { userID: res.data.userID}})
                }).catch(err => {
                    console.log(err)
                })
            })
        }
    }
}
</script>