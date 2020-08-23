<template>
  <div>
    <div class="resumeHead">
      <span>创建简历让更多的人发现你</span>
    </div>
    <el-card class="resumeCard">
      <div v-if="!applicantInfoResume">
        <el-col :span=20>
          <span>你还没有简历，请先上传！</span>
        </el-col>
        <el-col :span=4>
          <el-upload
            action=""
            :http-request="uploadResume"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <el-button>简历上传</el-button>
          </el-upload>
        </el-col>
      </div>
      <div v-if="applicantInfoResume">
        <el-col :span=4>
          <el-button @click="openResume()">查看简历</el-button>
        </el-col>
        <el-col :span=4>
          <el-upload
            action=""
            :http-request="uploadResume"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <el-button>重新上传</el-button>
          </el-upload>
        </el-col>
      </div>
    </el-card>
    <div v-if="!applicantInfoResume" class="nofond">
      <img
        src="static/img/notFound.png">
    </div>
  </div>
</template>
<style>

  .resumeCard {
    text-align: left;
    height: 100px;
    border-left: 5px solid #888;
  }

  .resumeHead {
    width: 100%;
    border: 1px solid #ededed;
    background: #f4f4f4;
    padding: 21px;
  }
  .nofond img {
    width: 350px;
    height: 300px;
  }

</style>

<script>/* eslint-disable indent */

import api from '../api/index'
export default {
  props: ['applicantInfoResume'],
  data () {
    return {
      userId: sessionStorage.getItem('userId')
    }
  },
  mounted () {
  },
  methods: {
    beforeAvatarUpload (file) {
      const isPDF = file.type === 'application/pdf'
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!isPDF) {
        this.$message.error('上传简历文件只能是 PDF 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传简历文件大小不能超过 4MB!')
      }
      return isPDF && isLt4M
    },
    openResume () {
      console.log('查看简历' + this.applicantInfoResume)
      window.open(this.applicantInfoResume)
    },
    uploadResume (file) {
      console.log('uploadResume')
      let formData = new FormData()
      formData.append('resume', file.file)
      api.uploadApplicantInfoResume(formData, this.userId).then(res => {
        if (res.status === 200) {
          console.log('upload success!')
          this.$message.success('上传成功')
          this.$emit('dataChange', URL.createObjectURL(file.file))
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
