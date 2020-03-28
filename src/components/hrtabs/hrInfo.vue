<template>
  <div>
    <table v-if="!isEdit">
      <th> 个人信息</th>
      <tr>
        <td>姓名：</td>
        <td>{{list.hrInfoName}}</td>
      </tr>
      <tr>
        <td>职位：</td>
        <td>{{list.hrInfoProperty}}</td>
      </tr>
      <tr>
        <td>公司：</td>
        <td>{{list.hrInfoEnterpriseName}}</td>
      </tr>
      <tr>
        <td>手机号码：</td>
        <td>{{list.hrInfoPhone}}</td>
      </tr>
      <tr>
        <td>邮箱：</td>
        <td>{{list.hrInfoEmail}}</td>
      </tr>
      <tr>
        <td>性别：</td>
        <td>{{list.hrInfoSex}}</td>
      </tr>
      <tr>
        <td>我的简介：</td>
        <td>{{list.hrInfoIntroduction}}</td>
      </tr>
      <tr>
        <td>学历：</td>
        <td>{{list.hrInfoEducation}}</td>
      </tr>
      <tr>
        <td>学校：</td>
        <td>{{list.hrInfoSchool}}</td>
      </tr>
      <el-button class="edit" @click="changeEdit">编辑</el-button>
    </table>
    <el-form  :model="list" status-icon :rules="rules2" ref="list" label-width="100px" class="formWrap"
              v-if="isEdit">
      <el-form-item label="姓名" prop="hrInfoName">
        <el-input v-model="list.hrInfoName" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="职位" prop="hrInfoProperty">
        <el-input v-model="list.hrInfoProperty" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="公司" prop="hrInfoEnterpriseName">
        <el-input v-model="list.hrInfoEnterpriseName" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="hrInfoPhone">
        <el-input v-model="list.hrInfoPhone" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="hrInfoEmail">
        <el-input v-model="list.hrInfoEmail" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="性别" prop="hrInfoSex">
        <el-select v-model="list.hrInfoSex" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="我的简介" prop="hrInfoIntroduction">
        <el-input v-model="list.hrInfoIntroduction"/>
      </el-form-item>
      <el-form-item label="学历" prop="hrInfoEducation">
        <el-select v-model="list.hrInfoEducation" placeholder="请选择性别" style="width: 100%">
          <el-option label="大专" value="大专"/>
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学校" prop="hrInfoSchool">
        <el-input v-model="list.hrInfoSchool"/>
      </el-form-item>
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

import api from '../../api/index'

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
    var checkEnterprise = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司不能为空'))
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
        hrInfoName: [{validator: checkName, trigger: 'blur'}],
        hrInfoEnterpriseName: [{validator: checkEnterprise, trigger: 'blur'}],
        hrInfoPhone: [{validator: checkPhone, trigger: 'blur'}],
        hrInfoEmail: [{validator: checkEmail, trigger: 'blur'}],
        hrInfoProperty: [{validator: checkProperty, trigger: 'blur'}],
        hrInfoSex: [{validator: checkSex, trigger: 'blur'}],
        hrInfoIntroduction: [{validator: checkIntroduction, trigger: 'blur'}],
        hrInfoEducation: [{validator: checkEducation, trigger: 'blur'}],
        hrInfoSchool: [{validator: checkSchool, trigger: 'blur'}]
      }
    }
  },
  mounted () {
  },
  methods: {
    changeEdit () {
      this.isEdit = !this.isEdit
    },
    submitInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .updateHrInfo(this.list)
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
    }
    // 获取公司名称
/*    getCompanyName () {
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
    }, */
    // 获取职位名称
/*    getJobName () {
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
    } */
  }
}
</script>
