<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="uploadAvatar"
          name="avatar"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl"  class="avatar">
          <img v-else class="img" :src="list.hrInfoImg">
        </el-upload>
        <span class="username">
            {{list ? list.hrInfoName : ''}}
          </span>
      </div>
    </el-card>
    <el-tabs type="border-card" tabPosition="left" style="width:1000px;height: 1000px;" class="hr">
      <el-tab-pane>
        <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
        <hrInfo :list="list"/>
      </el-tab-pane>
      <el-tab-pane>
      <span slot="label">职位管理<i class="el-icon-arrow-right"></i></span>
        <manage-job :jobReleaseRecord="jobReleaseRecord"/>
    </el-tab-pane>
     <el-tab-pane>
      <span slot="label">投递记录<i class="el-icon-arrow-right"></i></span>
       <receive :receiveRecord="receiveRecord"/>
    </el-tab-pane>
     <el-tab-pane >
      <span slot="label">设置<i class="el-icon-arrow-right"></i></span>
     <setting></setting>
    </el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
import hrInfo from '../../components/hrtabs/hrInfo'
import receive from '../../components/hrtabs/getResume'
import setting from '../../components/setting'
import manageJob from '../../components/hrtabs/manageJob'
import api from '../../api'
export default {
  data () {
    return {
      hrRefresh: 0,
      imageUrl: '',
      userId: sessionStorage.getItem('userId'),
      list: {
        'hrInfoEnterpriseName': '',
        'hrInfoEducation': '',
        'hrInfoEmail': '',
        'hrInfoId': sessionStorage.getItem('userId'),
        'hrInfoImg': '',
        'hrInfoIntroduction': '',
        'hrInfoName': '',
        'hrInfoPhone': '',
        'hrInfoProperty': '',
        'hrInfoSchool': '',
        'hrInfoSex': ''
      },
      jobReleaseRecord: [],
      receiveRecord: []
    }
  },
  components: {
    hrInfo,
    receive,
    setting,
    manageJob
  },
  mounted () {
  },
  created () {
    this.getHrInfo()
    this.getJobReleaseRecord()
    this.getResumeReceiveRecord()
  },
  watch: {
    hrRefresh () {
      location.reload()
    }
  },
  methods: {
    getHrInfo () {
      api.getHrInfo(this.userId).then(res => {
        if (res.status === 200) {
          this.list = res.data
          console.log(this.list)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getResumeReceiveRecord () {
      api.getResumeReceiveRecord(this.userId).then(res => {
        if (res.status === 200) {
          this.receiveRecord = res.data.data
          console.log('getReceiveRecord')
          console.log(this.receiveRecord)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getJobReleaseRecord () {
      api.getJobReleaseRecord(this.userId).then(res => {
        if (res.status === 200) {
          this.jobReleaseRecord = res.data.data
          console.log('getJobDeliveryRecord')
          console.log(this.jobReleaseRecord)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    uploadAvatar (file) {
      let formData = new FormData()
      formData.append('avatar', file.file)
      api.uploadHrInfoAvatar(formData, this.userId).then(res => {
        if (res.status === 200) {
          this.$message.success('上传成功')
          this.list.hrInfoImg = URL.createObjectURL(file.file)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>
.hr {
   margin: 20px auto auto auto;
}
.box-card {
  width: 1000px;
  margin: 14px auto auto auto;
}
.el-card .username {
  float: left;
  margin-left: 14px;
  font-size: 21px;
}
.avatar-uploader {
  float: left;
}
.avatar-uploader .el-upload {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-bottom: 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
.img {
  border-radius: 50%;
  width: 70px;
  height: 70px;
}
</style>
