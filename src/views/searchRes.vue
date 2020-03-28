<template>
  <div>
    <div v-if="!this.jobInfo" class="noFound">
      <img
        src="static/img/notFound.png">
      <p>暂时没有该岗位信息</p>
    </div>
    <el-card v-if="jobInfo" v-for="(item, key) in jobInfo" :key="key" class="jobcard">
      <div  @click="findDetail(item)">
       <img class="enterpriseLogo" :src="item.enterpriseLogo"/>
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
    <el-dialog title="职位详情" :visible.sync="jobDetailVisible" width="45%">
      <el-card class="jobDetail">
        <p>
          {{jobDetail.jobName}}
          <span class="dividingLine">|</span>
          {{jobDetail.enterpriseName}}
          <span class="dividingLine">|</span>
          {{jobDetail.jobCity}}
        </p>
        <p>
          <span>薪酬范围：</span>
          <span class="salary">{{transformSalary(jobDetail.jobMinSalary)}} - {{transformSalary(jobDetail.jobMaxSalary)}}</span>
        </p>
        <p>
          <span>学历要求：</span>
          <span>{{jobDetail.jobEducation}}</span>
        </p>
        <p>
          <span>工作经验：</span>
          <span>{{jobDetail.jobExperience}}</span>
        </p>
        <p>任职要求：</p>
        <p  v-html="jobDetail.jobRequirement">{{jobDetail.jobRequirement}}</p>
        <p>详细地址：{{jobDetail.jobAddress}}</p>
        <div>
            <span style="float: left; margin: 4px 0 4px 0">发布人: {{jobDetail.jobFrom}}</span>
            <span style="float: right;  margin: 4px 0 4px 0">{{jobDetail.jobDatetime}}</span>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
            <el-button @click="jobDetailVisible = false">取 消</el-button>
            <el-button type="primary" @click="jobDetailVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<style>
  .jobDetail p {
    margin: 4px 0 4px 0;
    text-align: left;
  }
  .noFound p {
    font-size: 28px;
    color: #909399;
    text-align: center;
  }

  .noFound img {
    width: 350px;
    height: 300px;
  }
  .jobcard .enterpriseLogo:hover {
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
  .enterpriseLogo {
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
      jobInfo: [],
      jobDetailVisible: false,
      jobDetail: {}
    }
  },
  mounted () {
    this.getSearchJobInfo()
  },
  methods: {
    transformSalary (salary) {
      return salary / 1000 + 'K'
    },
    findDetail (jobDetail) {
      /*      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'}) */
      console.log(12345)
      this.jobDetailVisible = true
      this.jobDetail = jobDetail
      console.log(this.jobDetail)
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
