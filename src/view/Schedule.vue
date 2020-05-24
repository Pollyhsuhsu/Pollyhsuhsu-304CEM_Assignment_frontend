<template>
<el-calendar v-model="value" id="calendar">
      <template
       slot="dateCell"
       slot-scope="{date, data}">
          <div>
             <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                <div v-for="item in calendarData">
               
                   <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                     <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                          <el-tooltip class="item" effect="dark" :content="item.things" placement="right">
                               <el-tag type="success" size="mini"><div width="20%" class="is-selected">{{item.code}}</div></el-tag>
                          </el-tooltip>
                       </div>
                    <div v-else></div>
                   </div>
               <div v-else></div>
             </div>
          </div>
      </template>
</el-calendar>
 </template>
<script>
import axios from 'axios'
    export default {
        name: "calendar",
        data(){
            return {
                calendarData: [
                    // { year:['2019'],months: ['09', '11'],days: ['15'],things: '看电影' },
                    // { year:['2019'],months: ['10', '11'], days: ['02'],things: '去公园野炊' },
                    // { year:['2019'],months: ['11'], days: ['02'],things: '看星星' },
                    // { year:['2019'],months: ['01'], days: ['02'],things: '看月亮' }   
                ],
                value: new Date(),
                course:[],
                months:[],
                date:[]
            }
        },
        mounted () {
            this.handleEdit()
        },
        methods:{
            handleEdit () {      
                axios.post('classes/queryClassbyID/'+ this.$route.query.class_id)
                    .then((response) => {
                        //this.students = response.data.student
                        this.course = response.data.class_TimeDetails
                        console.log(this.course)
                    for(let i = 0; i< this.course.length; i++){
                        for(let x = 0; x< this.course[i].timeList.length;x++){
                            var date = this.course[i].timeList[x]
                            var splits1 = date.split("-");
                            var month = splits1[1] < 10 ? '0'+splits1[1] : splits1[1]
                            var day = splits1[2]< 10 ? '0'+ splits1[2] : splits1[2]
                               // this.months.push(splits1[1] < 10 ? '0'+splits1[1] : splits1[1])
                                //this.date.push(splits1[2]< 10 ? '0'+ splits1[2] : splits1[2])

                            this.calendarData.push({
                                months: [month],
                                days: [day],
                                code:this.course[i].course_code,
                                things: this.course[i].course_code+"-"+this.course[i].course_name+"("+ this.course[i].startTime+"-"+this.course[i].endTime+")"
                            })
                        }
                        console.log(this.calendarData)
                        //  this.calendarData.push({
                        //         months: this.months,
                        //         days: this.date,
                        //         code:this.course[i].course_code,
                        //         things: this.course[i].course_code+"-"+this.course[i].course_name+"("+ this.course[i].startTime+"-"+this.course[i].endTime+")"
                        //     })
                    }
                
                    })
                },
        }
    }
</script>
<style>
    .calendar-day{
        text-align: center;
        color: #202535;
        line-height: 30px;
        font-size: 12px;
    }
    .is-selected{
        color: #F8A535;
        font-size: 10px;
        margin-top: 5px;
    }
    #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        content: '當月';
    }
</style>