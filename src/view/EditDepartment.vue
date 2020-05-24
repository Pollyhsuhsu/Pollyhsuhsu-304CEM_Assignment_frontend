<template>
    <el-row>
    <br>
        <el-card>
            <el-form ref="form" label-position="top" :model="form">
            <el-form-item label="Department Name">
                <el-input v-model="form.dept_name"></el-input>
            </el-form-item>
            <el-form-item label="Department Head">
                <el-select v-model="form.dept_head_id" filterable placeholder="Please select" @change="onSelectedDrug($event, teachers)">
                    <el-option
                    v-for="teacher in teachers"
                    :key="teacher.last_name + ' ' + teacher.first_name"
                    :label="teacher.last_name + ' ' + teacher.first_name"
                    :value="teacher._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="roles === 'Admin'">
                <el-button type="primary" @click="UpdateDept()">Save</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </el-card>
<br>
        <el-card>
            <el-form ref="form" label-position="left" :model="head_info">
            Department Head Info<br><br>
            <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item label="Last Name" >
                    <el-input v-model="head_info.l_name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="First Name">
                    <el-input v-model="head_info.f_name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Phone Number">
                <el-input v-model="head_info.phone" :disabled="true"></el-input>
            </el-form-item>
                <el-input v-model="head_info.id" type="hidden"></el-input>
            </el-form>
        </el-card>
    </el-row>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
    data () {
        return {
            form:{
                dept_name: '',
                dept_head_id: '',
                dept_head_name: ''
            },
            head_info:{
                id: '',
                l_name: '',
                f_name: '',
                phone: ''
            },
            teachers:[],
            users:[],
            curr_dept: []
        }
    },
    mounted () {
      this.loadAll()
      this.handleEdit()
      this.roles = localStorage.getItem('role');
    },
    methods: {
        loadAll () {
            axios.get('users/all').then(res => { 
                this.users = res.data
                this.teachers = this.users.filter(user => user.type === "teacher")  
            })
        },
        handleEdit () {
            console.log(this.$route.query.deptID);
            axios.post('departments/queryDeptbyID/'+ this.$route.query.deptID)
            .then((response) => {
                console.log(response.data)
                this.curr_dept = response.data
                
                this.form.dept_name = this.curr_dept.dept_name
                this.form.dept_head_id = this.curr_dept.dept_head_id
                 console.log(this.curr_dept.dept_head_id )
                this.form.dept_head_name = this.getDepartmentHead(this.curr_dept.dept_head_id)
            })
        },
        onSelectedDrug(event,item) {
            this.getDepartmentHead(this.form.dept_head_id)
        },
        UpdateDept () {
            let deptInfo = {
                dept_name: this.form.dept_name,
                dept_head_id: this.form.dept_head_id,
                dept_head_name: this.head_info.l_name + ' ' + this.head_info.f_name 
            }
            console.log(deptInfo);
            this.$confirm('Do you confirm the submission?', 'Save', {}).then(() => {
                this.editLoading = true
                axios.put('departments/UpdateDept/'+ this.$route.query.deptID, deptInfo)
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
        getDepartmentHead(id){
            axios.post('users/queryUser', {
                userID: id
            }).then((response) => {
                this.head_info.l_name = response.data.last_name
                this.head_info.f_name = response.data.first_name
                this.head_info.phone = response.data.phone_no
            })
        }

    }
    
}
</script>