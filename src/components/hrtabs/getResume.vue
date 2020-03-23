<template>
  <div class="getResumeWrap">
    <div v-if="!this.receiveRecord" class="noFound">
      <img
        src="static/img/notFound.png">
      <p>暂时没有记录哦</p>
    </div>
    <el-row v-if="receiveRecord">
      <el-col :span="4"><div class="grid-content ">岗位</div></el-col>
      <el-col :span="3"><div class="grid-content ">姓名</div></el-col>
      <el-col :span="5"><div class="grid-content ">学校</div></el-col>
      <el-col :span="3"><div class="grid-content ">专业</div></el-col>
      <el-col :span="2"><div class="grid-content ">学历</div></el-col>
      <el-col :span="5"><div class="grid-content ">日期</div></el-col>
      <el-col :span="2"><div class="grid-content ">简历</div></el-col>
    </el-row>
    <div v-for="item in receiveRecord" v-bind:key="item.id" v-if="receiveRecord">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">{{item.jobName}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.applicantInfoName}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{item.applicantInfoSchool}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.applicantInfoMajor}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{item.applicantInfoEducation}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light">{{item.deliveryDatetime}}</div></el-col>
        <el-col :span="2"><div class="checkResume bg-purple-light" @click="openResume(item.applicantInfoResume)">查看</div></el-col>
      </el-row>
    </div>
  </div>
</template>
<style>
  .getResumeWrap {
    height: 1000px;
    overflow: scroll;
  }

  .getResumeWrap::-webkit-scrollbar {
    display: none;
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

  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    height: 36px;
    margin: 2px;
    padding: 10px 0 10px 0;
  }

  .checkResume {
    height: 36px;
    margin: 2px;
    padding: 10px 0 10px 0;
    background-color: #337ff8;
    color: #f3f4f5;
    cursor:pointer;
  }

</style>

<script>

export default {
  props: ['receiveRecord'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    openResume (resume) {
      console.log('查看简历' + resume)
      window.open(resume)
    },
    getList () {
      /*      fetch.receiveResume().then(res => {
        this.list = res.data.data.receiveList
        if (this.list.length === 0) {
          this.show = true
        }
      }).catch(e => {
        console.log(e)
      }) */
    },
    getTableList (id) {
      /*      this.getResumev = true
      fetch
        .getResume(id)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              if (res.data.data !== null) {
                this.getResumeList = res.data.data
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        }) */
    }
  }
}
</script>
