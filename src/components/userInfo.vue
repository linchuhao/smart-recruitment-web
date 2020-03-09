<template>
  <div>
    <table v-if="!isEdit">
      <th> 个人信息</th>
      <tr>
        <td>姓名：</td>
        <td>{{list.applicantInfoName}}</td>
      </tr>
      <tr>
        <td>职位：</td>
        <td>{{list.applicantInfoProperty}}</td>
      </tr>
      <tr>
        <td>手机号码：</td>
        <td>{{list.applicantInfoPhone}}</td>
      </tr>
      <tr>
        <td>邮箱：</td>
        <td>{{list.applicantInfoEmail}}</td>
      </tr>
      <tr>
        <td>性别：</td>
        <td>{{list.applicantInfoSex}}</td>
      </tr>
      <tr>
        <td>地址：</td>
        <td>{{list.applicantInfoAddress}}</td>
      </tr>
      <tr>
        <td>我的简介：</td>
        <td>{{list.applicantInfoIntroduction}}</td>
      </tr>
      <tr>
        <td>学历：</td>
        <td>{{list.applicantInfoEducation}}</td>
      </tr>
      <tr>
        <td>学校：</td>
        <td>{{list.applicantInfoSchool}}</td>
      </tr>
      <el-button class="edit" @click="changeEdit">编辑</el-button>
    </table>
    <el-form  :model="list" status-icon :rules="rules2" ref="list" label-width="100px" class="formWrap"
             v-if="isEdit">
       <el-form-item label="姓名" prop="applicantInfoName">
        <el-input v-model="list.applicantInfoName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="applicantInfoProperty">
        <el-input v-model="list.applicantInfoProperty" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="applicantInfoPhone">
        <el-input v-model="list.applicantInfoPhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="applicantInfoEmail">
        <el-input v-model="list.applicantInfoEmail" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="applicantInfoSex">
        <el-select v-model="list.applicantInfoSex" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="applicantInfoAddress">
        <el-input v-model="list.applicantInfoAddress"></el-input>
      </el-form-item>
      <el-form-item label="我的简介" prop="applicantInfoIntroduction">
        <el-input v-model="list.applicantInfoIntroduction"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="applicantInfoEducation">
        <el-input v-model="list.applicantInfoEducation"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="applicantInfoSchool">
        <el-input v-model="list.applicantInfoSchool"></el-input>
      </el-form-item>
<!--      <el-form-item label="感兴趣的工作" prop="intentionJob">
        <el-select v-model="intentionJob" multiple placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in jobOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
       </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button class='editor' @click="changeEdit">返回</el-button>
        <el-button  @click="submitInfo('list')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  table {
   width: 600px;
   font-size: 16px
  }

  table tr td {
    padding: 11.2px;
    text-align: left;
  }

  .formWrap {
    width: 500px;
    font-size: 18px;
  }

  .edit {
    margin:10px auto auto 40px;
  }
</style>

<script>/* eslint-disable indent */

  import api from '../api/index'

  export default {
    props: ['list'],
    data () {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        } else {
          callback()
        }
      }
      var checkProperty = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('职位不能为空'))
        } else {
          callback()
        }
      }
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机不能为空'))
        } else {
          callback()
        }
      }
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        } else {
          callback()
        }
      }
      var checkSex = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('性别不能为空'))
        } else {
          callback()
        }
      }
      var checkIntroduction = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('简介不能为空'))
        } else {
          callback()
        }
      }
      var checkSchool = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学校不能为空'))
        } else {
          callback()
        }
      }
      var checkAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('地址不能为空'))
        } else {
          callback()
        }
      }
      var checkEducation = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学历不能为空'))
        } else {
          callback()
        }
      }
      return {
        isEdit: false,
        rules2: {
          applicantInfoName: [{validator: checkName, trigger: 'blur'}],
          applicantInfoPhone: [{validator: checkPhone, trigger: 'blur'}],
          applicantInfoEmail: [{validator: checkEmail, trigger: 'blur'}],
          applicantInfoProperty: [{validator: checkProperty, trigger: 'blur'}],
          applicantInfoSex: [{validator: checkSex, trigger: 'blur'}],
          applicantInfoAddress: [{validator: checkAddress, trigger: 'blur'}],
          applicantInfoIntroduction: [{validator: checkIntroduction, trigger: 'blur'}],
          applicantInfoEducation: [{validator: checkEducation, trigger: 'blur'}],
          applicantInfoSchool: [{validator: checkSchool, trigger: 'blur'}]
        }
      }
    },
    mounted () {
/*      this.getCompanyName()
      this.getJobName() */
    },
    methods: {
      changeEdit () {
        this.isEdit = !this.isEdit
      },
      submitInfo (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            api
              .updateApplicantInfo(this.list)
              .then(res => {
                console.log('list', this.list)
                console.log(res)
                if (res.data.success) {
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  })
                  this.isEdit = !this.isEdit
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
      // 获取公司名称
      getCompanyName () {
        fetch.getComName().then(res => {
          if (res.status === 200) {
            const companyList = res.data.data
            for (let i = 0; i < companyList.length; i++) {
              const object = {}
              object.value = companyList[i].name
              object.label = companyList[i].name
              this.companyOptions.push(object)
            }
          }
        }).catch(e => {
          console.log('err', e)
        })
      },
      // 获取职位名称
      getJobName () {
        fetch.getRecommandJob().then(res => {
          if (res.status === 200) {
            const nameList = res.data.data
            for (let i = 0; i < nameList.length; i++) {
              const object = {}
              object.value = nameList[i]
              object.label = nameList[i]
              this.jobOptions.push(object)
            }
          }
        })
      }
    }
  }
</script>
