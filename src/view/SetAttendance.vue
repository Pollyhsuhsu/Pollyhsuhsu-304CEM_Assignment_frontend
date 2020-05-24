<template>
  <el-table
    :data="selectClass"
    style="width: 100%"
    @expand-change="showDetail">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          
            <el-table
              :data="attendance"
              style="width: 100%"
              v-loading="listLoading">
              <el-table-column
                prop="name"
                label="Student"
                width="180">
              </el-table-column>

              <el-table-column
                prop="total"
                label="Total(Lesson)">
              </el-table-column>

              <el-table-column
                prop="present"
                label="%(Attendance)"
                width="180">
              </el-table-column>

              <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                  <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
                  Export Excel
                </el-button>
                </template>
              </el-table-column>
            </el-table>
       
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="Course Name"
      prop="course_name">
    </el-table-column>
    <el-table-column
      label=""
      prop="">
    </el-table-column>
    <el-table-column
      label=""
      prop="">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">view</el-button>
      </template>
    </el-table-column>

     <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="schedule()">
          Schedule
        </el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  data() {
    return {
      getRowKeys(row) {
          return row.id;
      },
      expands: [],
      selectClass:[],
      students:[],
      timeList:[],
      tableData:[],
      attendance:[],
    }
  },
  mounted () {
    this.handleEdit ()
  },
  methods: {
    handleEdit () {      
      axios.post('classes/queryClassbyID/'+ this.$route.query.class_id)
        .then((response) => {
            this.students = response.data.student
            this.selectClass = response.data.class_TimeDetails
        })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Studnet', 'Total(Lession)', '%(Attendance)']
        const filterVal = ['name', 'total', 'present']
        const list = this.attendance
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
     formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    schedule(){
      this.$router.push({ name: "Schedule", query: { class_id: this.$route.query.class_id }})
    },
    showDetail(data,expandedRows) {
      this.listLoading = true

      if(expandedRows.length>1){
          expandedRows.shift()
      }
      
      this.attendance = []
      var name = ''
      console.log(data);
      axios.get('attendances/all').then(res => { 
        let data_filter = res.data.filter( set => set.class_id === this.$route.query.class_id && set.course_id === data.course_id)
        var timeLength = data.timeList.length
        
        var groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        let groubedByStudnentID = groupBy(data_filter, 'student_id')
        console.log(groubedByStudnentID)
        Object.keys(groubedByStudnentID).forEach(key => {        
          var l = groubedByStudnentID[key].filter(function (x) {
              return x.state == '0';
          }).length;
          console.log(l)
          axios.post('users/queryUser', {
            userID: key
          }).then((response) => {
            name = response.data.last_name +" "+ response.data.first_name
            this.attendance.push({
              student_id: key,
              name: name,
              present: ((1-(l/timeLength))*100)+"%",
              total: timeLength
            })
          })
        })
        this.listLoading = false
      })
    },
    handleClick(row) {
      let data = JSON.stringify(row) 
      console.log(row.course_id);
      this.$router.push({ name: "Set Attendance2", query: { setAttendance: data , class_id: this.$route.query.class_id ,course_id:row.course_id, class_TimeDetails_id: row._id}})
    },
    handleDelete(index, row) {
      //console.log(index, row);
    }
  }
}
</script>