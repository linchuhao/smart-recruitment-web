<template>
  <div>
    <div class="wrapper">
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
            <img v-else class="img" :src="list.applicantInfoImg">
          </el-upload>
          <span class="username">
            {{list ? list.applicantInfoName : ''}}
          </span>
        </div>
      </el-card>
      <el-tabs type="border-card" tabPosition="left" style="width:1000px;height: 100vh;margin: 14px auto auto auto;position: sticky">
        <el-tab-pane>
          <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
          <applicantInfo :list="list"/>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">我的简历<i class="el-icon-arrow-right"></i></span>
          <my-resume :applicantInfoResume="list.applicantInfoResume"
                     @dataChange="dataChange"/>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">投递记录<i class="el-icon-arrow-right"></i></span>
          <delivery :resumeDeliveryRecord="resumeDeliveryRecord"></delivery>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">设置<i class="el-icon-arrow-right"></i></span>
          <setting></setting>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style>
  html * {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
  .box-card {
    width: 1000px;
    margin: 14px auto auto auto;
  }
  .img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
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
</style>

<script>/* eslint-disable indent */

  import api from '../api/index'
  import applicantInfo from '../components/applicantInfo'
  import Resume from '../components/resume'
  import Delivery from '../components/delivery'
  import Setting from '../components/setting'

  export default {
    data () {
      return {
        userId: sessionStorage.getItem('userId'),
        list: {
          'applicantInfoAddress': '',
          'applicantInfoEducation': '',
          'applicantInfoMajor': '',
          'applicantInfoEmail': '',
          'applicantInfoId': sessionStorage.getItem('userId'),
          'applicantInfoImg': '',
          'applicantInfoIntroduction': '',
          'applicantInfoName': '',
          'applicantInfoPhone': '',
          'applicantInfoProperty': '',
          'applicantInfoResume': '',
          'applicantInfoSalary': '',
          'applicantInfoSchool': '',
          'applicantInfoSex': ''
        },
        imageUrl: '',
        resumeDeliveryRecord: []
      }
    },
    computed: {
    },
    created () {
      this.getUserInfo()
      this.getResumeDeliveryRecord()
    },
    watch: {
      refresh () {
        location.reload()
      }
    },
    components: {
      applicantInfo: applicantInfo,
      myResume: Resume,
      delivery: Delivery,
      setting: Setting
    },
    methods: {
      getUserInfo () {
        api.getApplicantInfo(this.userId).then(res => {
          if (res.status === 200) {
            this.list = res.data
            console.log(this.list)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      getResumeDeliveryRecord () {
        api.getResumeDeliveryRecord(this.userId).then(res => {
          if (res.status === 200) {
            this.resumeDeliveryRecord = res.data.data
            console.log('11')
            console.log(this.resumeDeliveryRecord)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      uploadAvatar (file) {
        let formData = new FormData()
        formData.append('avatar', file.file)
        api.uploadApplicantInfoAvatar(formData, this.userId).then(res => {
          if (res.status === 200) {
            this.$message.success('上传成功')
            this.list.applicantInfoImg = URL.createObjectURL(file.file)
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
      /**
       * 父组件处理子组件发送的数据更改
       * @param params
       */
      dataChange (params) {
        console.log(params)
        this.list.applicantInfoResume = params
      }
    }
  }
</script>
