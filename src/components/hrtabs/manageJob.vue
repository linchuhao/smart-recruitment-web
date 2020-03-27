<template>
  <div class="wrapper">
    <div v-if="!jobDeliveryRecord" class="noFound">
      <img src="static/img/notFound.png">
      <p>暂时没有发布的职位哦，快去发布吧</p>
    </div>
    <el-row v-if="jobDeliveryRecord">
      <el-col :span="4"><div class="grid-content ">职位名称</div></el-col>
      <el-col :span="2"><div class="grid-content ">职位类型</div></el-col>
      <el-col :span="2"><div class="grid-content ">学历</div></el-col>
      <el-col :span="2"><div class="grid-content ">工作经验</div></el-col>
      <el-col :span="3"><div class="grid-content ">薪酬区间</div></el-col>
      <el-col :span="2"><div class="grid-content ">城市</div></el-col>
      <el-col :span="5"><div class="grid-content ">发布时间</div></el-col>
      <el-col :span="2"><div class="grid-content ">投递人数</div></el-col>
      <el-col :span="2"><div class="grid-content ">编辑</div></el-col>
    </el-row>
    <div v-for="item in jobDeliveryRecord" v-bind:key="item.id" v-if="jobDeliveryRecord">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">{{item.jobName}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobProperty}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{item.jobEducation}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobExperience}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{transformSalary(item.jobMinSalary)}} - {{transformSalary(item.jobMaxSalary)}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobCity}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{item.jobDatetime}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.deliveryCount}}</div></el-col>
        <el-col :span="2"><div class="editJob" @click="updateJob(item.jobName)">编辑</div></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ['jobDeliveryRecord'],
  data () {
    return {
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    transformSalary (salary) {
      return salary / 1000 + 'K'
    },
    checkDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    checkJob () {
      /*      fetch.checkJob().then(res => {
        if (res.status === 200) {
          this.joblist = res.data.data
          if (this.joblist.length === 0) {
            this.show = true
          }
        }
      }).catch(e => {
        console.log(e)
      }) */
    },
    updateJob () {
      console.log('// to do updateJob')
    }
  }
}
</script>

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
  .editJob {
    height: 36px;
    margin: 2px;
    padding: 10px 0 10px 0;
    background-color: #337ff8;
    color: #f3f4f5;
    cursor:pointer;
  }
</style>
