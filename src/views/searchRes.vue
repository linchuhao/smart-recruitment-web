<template>
  <div>
    <div v-if="!this.jobInfo" class="noFound">
      <img
        src="static/img/notFound.png">
      <p>暂时没有该岗位信息</p>
    </div>
    <el-card v-if="jobInfo" v-for="(item, key) in jobInfo" :key="key" class="jobcard">
      <div  @click="findDetail(item.id)">
       <img class="jobavatar" :src="item.enterpriseLogo"/>
       <div class="introduce">
         <p>{{item.jobName}}</p>
         <p>
           <span class="salary">{{transformSalary(item.jobMinSalary)}} - {{transformSalary(item.jobMaxSalary)}}</span>
           <span class="dividingLine">|</span>
           <span>{{item.jobEducation}}</span>
           <span class="dividingLine">|</span>
         <span>{{item.jobCity}}</span>
         </p>
         <div style="width: 100%">
           <span style="float: left">工作经验：{{item.jobExperience}}</span>
           <span style="float: right; margin-right: 5%">{{item.jobDatetime}}</span>
         </div>
       </div>
      </div>
    </el-card>
  </div>
</template>
<style>
  .noFound p {
    font-size: 28px;
    color: #909399;
    text-align: center;
  }

  .noFound img {
    width: 350px;
    height: 300px;
  }
  .jobcard .jobavatar:hover {
    transform: scale(1.05);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }
  .jobcard :hover {
    transform: scale(1.015);
    transition: 3ms;
  }
  .salary {
    color: red;
    font-weight: bolder
  }
  .dividingLine {
    margin:  0 15px 0 15px
  }
  .jobcard {
    width: 1000px;
    margin: 20px auto auto auto;
    cursor: pointer;
  }
  .jobavatar {
    float: left;
    width: 126px;
    height: 110px;
    margin: auto 14px 20px auto;
  }
  .introduce {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .introduce p {
    font-size: 18px;
    margin-bottom: 14px;
  }
</style>
<script>
import api from '../api/index'
export default {
  data () {
    return {
      content: localStorage.getItem('content'),
      jobInfo: []
    }
  },
  mounted () {
    this.getSearchJobInfo()
  },
  methods: {
    transformSalary (salary) {
      return salary / 1000 + 'K'
    },
    findDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    getSearchJobInfo () {
      api.searchJobInfo(this.content).then(res => {
        if (res.status === 200) {
          this.jobInfo = res.data.data
          console.log('getReceiveRecord')
          console.log(this.jobInfo)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
