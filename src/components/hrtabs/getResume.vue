<template>
  <div class="getResumeWrap">
    <div v-if="!this.receiveRecord" class="nofond">
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
      <el-col :span="2"><div class="grid-content ">简历</div></el-col>
      <el-col :span="5"><div class="grid-content ">日期</div></el-col>
    </el-row>
    <div v-for="item in receiveRecord" v-bind:key="item.id" v-if="receiveRecord">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">{{item.jobName}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.applicantInfoName}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{item.applicantInfoSchool}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple-light">{{item.applicantInfoMajor}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{item.applicantInfoEducation}}</div></el-col>
        <el-col :span="2"><div class="checkResume bg-purple-light" @click="openResume(item.applicantInfoResume)">查看</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light">{{item.deliveryDatetime}}</div></el-col>
      </el-row>
    </div>
  </div>
<!--    <div v-for="(item, index) in receiveRecord" :key="index" v-if="this.receiveRecord">
      <el-card shadow="hover" class="receiveBox">
        <div class="flex">
          <el-progress :width="80" type="circle" :percentage="item.rate" color="#A6F6AF" class="circle"></el-progress>
          <span class="pipei">简历匹配度</span>
          <p class="receiveInfo">收到{{item.applicantInfoName}}的{{item.jobName}}求职信息</p>
          <el-button @click="getTableList(item.applicantInfoName)" class="clickbtn">查看</el-button>
        </div>
        <p class="receive">{{item.deliveryDatetime}}</p>
      </el-card>
      <el-dialog :title="getResumeList.name+'的简历'" :visible.sync="getResumev">
        <table border="1" cellspacing="0" style="border-color:#ededed" class="mytable">
          <tr>
            <td>姓名：</td>
            <td>{{getResumeList.name}}</td>
          </tr>
          <tr>
            <td>年龄：</td>
            <td>{{getResumeList.age}}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{getResumeList.sex}}</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td>{{getResumeList.phone}}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{getResumeList.email}}</td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>{{getResumeList.address}}</td>
          </tr>
          <tr>
            <td>学校：</td>
            <td>{{getResumeList.school}}</td>
          </tr>
          <tr>
            <td>毕业时间：</td>
            <td>{{getResumeList.endTime}}</td>
          </tr>
          <tr>
            <td>技术栈：</td>
            <td>
          <tr v-for="(item, key) in getResumeList.skills" :key="key">
            <td class="progress2">{{item.name}}</td>
            <td class="progress2">熟悉程度：
              <el-progress :text-inside="true" :stroke-width="15" :percentage="item.level*25"></el-progress>
            </td>
          </tr>
          </td>
          </tr>
          <tr>
            <td>实习（工作）经历：</td>
            <td>{{getResumeList.experience}}</td>
          </tr>
          <tr>
            <td>自我介绍：</td>
            <td>{{getResumeList.introduce}}</td>
          </tr>
          <tr>
            <td>获奖经历：</td>
            <td>{{getResumeList.awards}}</td>
          </tr>
        </table>
      </el-dialog>
    </div>
  </div>-->
</template>
<style>
  .getResumeWrap {
    height: 1000px;
    overflow: scroll;
  }

  .getResumeWrap::-webkit-scrollbar {
    display: none;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .clickbtn {
    height: 35px;
    margin-top: 14px;
  }

  .pipei {
    position: relative;
    top: 82px;
    left: -76px;
  }

  .flex {
    display: flex;
    justify-content: flex-start;
  }

  .receiveInfo {
    margin: 28px auto auto 14px;
  }

  .receive {
    position: relative;
    left: 330px;
  }

  .receiveBox {
    margin-bottom: 14px;
    width: 100%;
  }

  .nofond p {
    font-size: 28px;
    color: #909399;
    text-align: center;
  }

  .nofond img {
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
    cursor:pointer;
  }

</style>

<script>

export default {
  props: ['receiveRecord'],
  data () {
    return {
      getResumeList: {
        name: '',
        sex: '',
        age: '',
        skills: [{
          id: 1,
          name: '',
          level: '',
          resumeId: 1
        }],
        school: '',
        address: '',
        endTime: 2019,
        phone: '',
        email: '',
        introduce: '',
        experience: '',
        awards: '',
        avatar: ''
      },
      list: [],
      show: true,
      getResumev: false
    }
  },
  mounted () {
    this.getList()
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
