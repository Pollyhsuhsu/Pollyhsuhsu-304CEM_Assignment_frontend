<template>
  <el-form>
    <el-form-item label="HKID">
			<el-col :span="11">
			</el-col>
			<el-col class="line" :span="5"></el-col>
			  <el-col :span="6">
				<el-input v-model="user.HKID" disabled="true"></el-input>
			</el-col>
		</el-form-item>

   <el-form-item label="Email">
			<el-input v-model="user.email" disabled="true"></el-input>
		</el-form-item>
    
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
		<el-form-item label="Gender">
			<el-radio-group v-model="user.gender">
				<el-radio label="Female"></el-radio>
				<el-radio label="Male"></el-radio>
			</el-radio-group>
		</el-form-item>
       
		<el-form-item label="Date">			
				<el-date-picker type="date" placeholder="select date" v-model="user.date" style="width: 100%;"></el-date-picker>
		</el-form-item>

     

    <el-form-item label="Phone No.">
			<el-input v-model="user.phoneNo"></el-input>
		</el-form-item>

        <el-form-item label="Address">
			<el-input type="textarea" v-model="user.address"></el-input>
		</el-form-item>


   

    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          HKID: '',
          gender: '',
          phoneNo: '',
          date:''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>