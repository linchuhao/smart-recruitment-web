<template>
  <header>
    <div class="contain">
      <div>
        <span @click="redirect(1)" class="tab">首页</span>
        <span v-if="isHr" @click="changeStatus" class="tab">发布职位</span>
        <span v-if="isHr && isLogin" @click="redirect(6)" class="tab">个人中心</span>
        <span v-if="!isHr && isLogin" @click="redirect(2)" class="tab">个人中心</span>
        <span class="tab" v-if="!isHr"><el-input placeholder="搜索心仪的职位" style="width:18rem" v-model="content"
                                                 @change="getJob(content)"><i slot="prefix"
                                                                              class="el-input__icon el-icon-search"></i></el-input></span>
      </div>
      <div>
        <span @click="redirect(3)" class="tab" v-show="isLogin">
          <i class="el-icon-message" style="margin-right:0.3rem" @click="redirect(5)">
            </i>消息中心<span class="icon" v-show="count > 0" ref="icon">{{ count }}</span>
          </span>
        <span v-if="!isLogin">
          <span class="tab" @click="redirect(4)">登录</span>
          <span class="tab"  @click="toRegister">注册</span>
        </span>
        <el-dialog title="发布职位" :visible.sync="publishVisible" width="45%">
          <el-form :model="jobInfo" status-icon :rules="publishRule" ref="jobInfo">
            <el-form-item label="职位名称" :label-width="formLabelWidth" prop="jobName">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="jobInfo.jobName" autocomplete="off"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="职位类型" :label-width="formLabelWidth" prop="jobProperty">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="jobInfo.jobProperty" autocomplete="off"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="薪酬区间" :label-width="formLabelWidth" prop="jobMinSalary">
              <el-row>
                <el-col :span="6"><el-input v-model="jobInfo.jobMinSalary"/></el-col>
                <el-col :span="2">——</el-col>
                <el-col :span="6"><el-input v-model="jobInfo.jobMaxSalary"/></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="职位城市" :label-width="formLabelWidth" prop="jobCity">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="jobInfo.jobCity" autocomplete="off"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="职位地址" :label-width="formLabelWidth" prop="jobAddress">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="jobInfo.jobAddress" autocomplete="off"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="职位要求" :label-width="formLabelWidth" prop="jobRequirement">
              <el-input type="textarea" rows="8" v-model="jobInfo.jobRequirement" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="publishVisible = false">取 消</el-button>
            <el-button type="primary" @click="deliveryJobInfo('jobInfo')">确 定</el-button>
          </span>
        </el-dialog>
        <span v-if="isLogin" class="tab" @click="logout()" >退出登录</span>
      </div>
    </div>
  </header>
</template>
<style>
  html * {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  header {
    width: 100%;
    height: 60px;
    background: rgba(0, 95, 246, 0.8);
  }
  .contain {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: auto;
    line-height: 60px;
    font-weight: 500;
  }
  .contain .tab{
    cursor:pointer;
    color: white;
    font-size: 16px;
    margin: 10px;
    padding: 6px;
    border-radius: 4px;
  }

</style>
<script>/* eslint-disable standard/object-curly-even-spacing */

import api from '../../api/index'
export default {
  data () {
    var checkJobName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位名称不能为空'))
      } else {
        callback()
      }
    }
    var checkJobSalary = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('薪酬范围不能为空'))
      } else {
        callback()
      }
    }
    var checkJobAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位地址不能为空'))
      } else {
        callback()
      }
    }
    var checkJobCity = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位城市不能为空'))
      } else {
        callback()
      }
    }
    var checkJobProperty = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位类型不能为空'))
      } else {
        callback()
      }
    }
    var checkJobRequirement = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位要求不能为空'))
      } else {
        callback()
      }
    }
    return {
      publishRule: {
        jobName: [{validator: checkJobName, trigger: 'blur'}],
        jobAddress: [{validator: checkJobAddress, trigger: 'blur'}],
        jobMinSalary: [{validator: checkJobSalary, trigger: 'blur'}],
        jobCity: [{validator: checkJobCity, trigger: 'blur'}],
        jobProperty: [{validator: checkJobProperty, trigger: 'blur'}],
        jobRequirement: [{validator: checkJobRequirement, trigger: 'blur'}]
      },
      index: 0,
      count: 0,
      amount: 0,
      websocket: null,
      publishInfo: {
        hrId: '',
        title: '',
        content: '',
        companyId: '',
        skillList: [
          {
            name: '',
            weight: 0
          }
        ]
      },
      jobInfo: {
        'jobFrom': '',
        'jobName': '',
        'jobMinSalary': '',
        'jobMaxSalary': '',
        'jobAddress': '',
        'jobCity': '',
        'jobProperty': '',
        'jobRequirement': ''
      },
      formLabelWidth: '80px',
      publishVisible: false,
      isHr: false,
      content: '',
      companyList: [],
      msg: '',
      isLogin: false
    }
  },
  created () {
    /*    this.initWs() */
  },
  watch: {
    amount () {
      location.reload()
    }
  },
  mounted () {
    if (sessionStorage.getItem('userId')) {
      this.isLogin = true
    }
    // role===2 为HR
    if (sessionStorage.getItem('role') === '2') {
      this.isHr = true
    }
  },
  methods: {
    deliveryJobInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.jobInfo.jobFrom = sessionStorage.getItem('userId')
          api
            .deliveryJobInfo(this.jobInfo)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.publishVisible = false
              }
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
        }
      })
    },
    /*    initWs () {
      if (sessionStorage.getItem('userId') !== null) {
        if ('WebSocket' in window) {
          this.websocket = new WebSocket('ws://pf.stalary.com/push/ws/' + `${sessionStorage.getItem('userId')}`, [])
        } else {
          alert('浏览器不支持WebSocket')
        }
        this.websocket.onopen = this.openWS
        this.websocket.onmessage = this.receiveWSMessage
        this.websocket.onclose = this.closeWS
      }
    },
    openWS (e) {
      console.log('建立连接')
    },
    receiveWSMessage (e) {
      console.log('接收消息' + e.data)
      this.count = parseInt(e.data)
    },
    closeWS (e) {
      console.log('关闭连接')
    }, */
    redirect (num) {
      if (num === 1) {
        this.$router.push({name: 'index'})
      } else if (num === 2) {
        this.$router.push({name: 'userInfo'})
      } else if (num === 3) {
        this.$router.push({name: 'infoCenter'})
      } else if (num === 4) {
        this.$router.push({name: 'login'})
      } else if (num === 5) {
        this.$router.push({name: 'infoCenter'})
      } else if (num === 6) {
        this.$router.push({name: 'hrView'})
      }
    },
    toRegister () {
      this.$router.push({name: 'register'})
    },
    logout () {
      /*      fetch
        .logout()
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            sessionStorage.removeItem('userId')
            localStorage.removeItem('role')
            localStorage.removeItem('token')
            localStorage.removeItem('count')
            this.websocket.close()
            this.$router.push({name: 'login'})
          }
        })
        .catch(e => {
          console.log(e)
        }) */
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('role')
      location.reload()
    },
    changeStatus () {
      this.jobInfo = {}
      this.publishVisible = true
    }
  }
}
</script>
