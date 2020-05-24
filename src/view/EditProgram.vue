<template>

<el-row>
<br>
    <el-card>
        <el-form ref="form" label-position="top" :model="form">

        <el-form-item label="Department">
        <el-select v-model="form.dept_id" filterable placeholder="Please select" @change="onSelectedDrug($event, depts)">
            <el-option
            v-for="dept in depts"
            :key="dept._id"
            :label="dept.dept_name"
            :value="dept._id">
            </el-option>
        </el-select>
        </el-form-item>
        <el-input v-model="form.dept_name" type="hidden"></el-input>

        <el-form-item label="Program Code">
            <el-input v-model="form.prgm_code"></el-input>
        </el-form-item>

        <el-form-item label="Program Name">
            <el-input v-model="form.prgm_name"></el-input>
        </el-form-item>
        
        <el-form-item label="Description">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        

        </el-form>
    </el-card>
、 <br>
    <el-card>
       <el-form ref="form" label-position="left">
        Course<br><br>
        <el-button type="info" @click="addNewCourse" icon="el-icon-plus"></el-button>
        <br><br>
        <div v-for="(course,index) in newCourses">
        <el-row :gutter="1">

        <el-col :span="8">
        <div class="grid-content bg-purple">
            <el-autocomplete
                class="inline-input"
                v-model="course.course_code"
                :fetch-suggestions="querySearchbyCourseCode"
                placeholder="Coures Code"
                :trigger-on-focus="false"
                @select="handleSelectbyCourseCode(index)"
                ><template slot="prepend">Course Code</template>
                </el-autocomplete>
        </div>
        </el-col>

        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-input v-model="course.course_name" disabled><template slot="prepend">Course Name</template></el-input>
            </div>
        </el-col>

        <el-col :span="1" >
                <el-input v-model="course.course_id" type="hidden"></el-input>
        </el-col>
    
        <el-button type="danger" icon="el-icon-delete-solid" @click="removeNewCourse(index)"></el-button>
        </el-row>
        <br>
        </div>
        </el-form>
        </el-card>
    <br>
    <el-card>
        <el-form ref="form">
        <el-form-item>
            <el-button type="primary" @click="updateProgram()">Save</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
        </el-form>
    </el-card>
</el-row>
</template>
<script>
import axios from 'axios'
import router from '../router'
import { conditionalExpression } from 'babel-types'
export default {
    data () {
        return {
            depts:[],
            form:{
                prgm_name: '',
                description: '',
                dept_id:'',
                dept_name:'',
                prgm_code:''
            },
            newCourses:[{
                course_id:'',
                course_name: '',
                course_code: ''
            },],
            courses:[],          
        }
    },
    mounted () {
      this.loadDept()
      this.handleEdit()
    },
    methods: {
        loadDept () {
            axios.get('departments/all').then(res => { 
                this.depts = res.data
            })
        },
        onSelectedDrug(event,item){
            axios.post('departments/queryDeptbyID/'+ this.form.dept_id )
            .then((response) => {
                console.log(response.data)
                this.curr_dept = response.data
                this.form.prgm_name = this.curr_dept.dept_name                 
            })
        },
        handleEdit(){
           
        axios.post('programs/queryPrgmbyID/'+ this.$route.query.prgm_id)
            .then((response) => {
                 console.log(response.data)
                this.curr_prgm= response.data
                this.form.prgm_name = this.curr_prgm.pgrm_name
                this.form.prgm_code = this.curr_prgm.pgrm_code
                this.form.dept_name= this.curr_prgm.dept_name
                this.form.dept_id = this.curr_prgm.dept_id
                this.form.description = this.curr_prgm.description
                this.newCourses = this.curr_prgm.courses
            })
        },
        addNewCourse() {
            
            this.newCourses.push({
                course_id:'',
                course_name: '',
                course_code: ''
                });
        },
        removeNewCourse(index) {
            this.newCourses.splice(index, 1);
        },
        handleSelectbyCourseCode(index) {
            axios.get('courses/all').then(res => { 
                var results = (res.data).filter(course => course.course_code === this.newCourses[index].course_code)
                this.newCourses[index].course_name = results[0].course_name
                this.newCourses[index].course_id = results[0]._id

            }).catch((error) => { console.log(error) })             
        },
        querySearchbyCourseName(queryString, cb) {
            var list = [{}]

            axios.get('courses/all').then(res => { 
                for(let i of res.data){                  
                    i.value = i.course_name
                }
                list = res.data
                var results = queryString ? list.filter(this.createStateFilter(queryString)) : lists
                clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                cb(results)
                }, 100 * Math.random())
            }).catch((error) => { console.log(error) })    
        },
        createStateFilter(queryString) {
            return (state) => {
            return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearchbyCourseCode(queryString, cb) {
            var list = [{}]
            axios.get('courses/all').then(res => { 
                for(let i of res.data){                  
                    i.value = i.course_code
                }
                list = res.data
                var results = queryString ? list.filter(this.createStateFilter(queryString)) : lists
                cb(results)
            }).catch((error) => { console.log(error) })  
        },
        updateProgram () {
            let para = {
                pgrm_name: this.form.prgm_name,
                prgm_code: this.form.prgm_code,
                courses: this.newCourses,
                dept_id: this.form.dept_id,
                dept_name: this.form.dept_name,
                description: this.form.description,   
            }
            console.log(para)
            this.$confirm('Do you confirm the submission?', 'Save', {}).then(() => {
                axios.put('programs/UpdatePrgm/'+ this.$route.query.prgm_id, para)
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