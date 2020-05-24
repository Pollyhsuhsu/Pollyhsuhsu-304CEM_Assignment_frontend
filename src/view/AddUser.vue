<template>
<div>
    <el-form ref="form" :model="form" label-width="200px" @submit.prevent="onSubmit" style="margin:50px;width:30%;min-width:600px;">
        <el-form-item label="Icon">
        <el-col :span="30">
            <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData">
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

    <el-form-item label="Password" hidden>
        <el-input v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item label="Address">
        <el-input type="textarea" v-model="form.address"></el-input>
    </el-form-item>

    <hr>
    <el-form-item label="Emergency Contact Person">
        <el-col :span="11">
            <el-input v-model="form.e_c_person" placeholder="ECP Name"></el-input>
        </el-col>
        <el-col class="line" :span="2">&nbsp&nbsp</el-col>
        <el-col :span="11">
            <el-input v-model="form.e_c_person_no" placeholder="ECP Phone No."></el-input>
        </el-col>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="register()">Create</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>
</div>
</template>
<script>
import util from '../js/util'
import axios from 'axios'
import router from '../router'
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
                password: ''
            },
            imageData: '../assets/download.png' ,
            inputImg: ''
		}
    },
    methods: {
        onSubmit: function (event){
            
        },
        register () {
            let para = {
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                email: this.form.email,
                HKID: this.form.HKID,
                type: this.form.role,
                password: '123123',
                phone_no: this.form.phoneNo,
                address: this.form.address,
                e_c_person: this.form.e_c_person,
                e_c_person_no: this.form.e_c_person_no,
                bith_data: this.form.date,
                gender: this.form.gender,
                photo: this.inputImg
            }
            para.bith_data = (!this.form.date || this.form.date == '') ? '' : util.formatDate.format(new Date(this.form.date), 'yyyy-MM-dd');
            this.$confirm('Do you confirm the submission?', 'Create', {}).then(() => {
                axios.post('users/register', (para)).then(res => {
                    this.$router.push({ name: "View User", query: { userID: res.data.userID}})
                }).catch(err => {
                    console.log(err)
                })
            })
            
            //router.push({path: `/projectdetails/${id}`, query: {'success': true, 'type': type}})
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
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);     
            }
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
.input {

}
</style>