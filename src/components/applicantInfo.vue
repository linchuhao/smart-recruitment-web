<template>
  <div>
    <table v-if="!isEdit">
      <th> 个人信息</th>
      <tr>
        <td>姓名：</td>
        <td>{{list.userInfoNickname}}</td>
      </tr>
      <tr>
        <td>职位：</td>
        <td>{{list.userInfoPosition}}</td>
      </tr>
      <tr>
        <td>手机号码：</td>
        <td>{{list.userInfoPhone}}</td>
      </tr>
      <tr>
        <td>邮箱：</td>
        <td>{{list.userInfoEmail}}</td>
      </tr>
      <tr>
        <td>性别：</td>
        <td>{{list.userInfoSex}}</td>
      </tr>
      <tr>
        <td>我的简介：</td>
        <td>{{list.userInfoIntroduction}}</td>
      </tr>
      <tr>
        <td>学历：</td>
        <td>{{list.userInfoEducation}}</td>
      </tr>
      <tr>
        <td>学校：</td>
        <td>{{list.userInfoSchool}}</td>
      </tr>
      <tr>
        <td>专业：</td>
        <td>{{list.userInfoMajor}}</td>
      </tr>
      <el-button class="edit" @click="changeEdit">编辑</el-button>
    </table>
    <el-form  :model="list" status-icon :rules="rules2" ref="list" label-width="100px" class="formWrap"
             v-if="isEdit">
       <el-form-item label="姓名" prop="userInfoNickname">
         <el-input v-model="list.userInfoNickname" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="职位" prop="userInfoPosition">
        <el-input v-model="list.userInfoPosition" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="userInfoPhone">
        <el-input v-model="list.userInfoPhone" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="userInfoEmail">
        <el-input v-model="list.userInfoEmail" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="性别" prop="userInfoSex">
        <el-select v-model="list.userInfoSex" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="男"/>
          <el-option label="女" value="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="我的简介" prop="userInfoIntroduction">
        <el-input v-model="list.userInfoIntroduction"/>
      </el-form-item>
      <el-form-item label="学历" prop="userInfoEducation">
        <el-select v-model="list.userInfoEducation" placeholder="请选择学历" style="width: 100%">
          <el-option label="大专" value="大专"/>
          <el-option label="本科" value="本科"/>
          <el-option label="硕士" value="硕士"/>
          <el-option label="博士" value="博士"/>
        </el-select>
      </el-form-item>
      <el-form-item label="学校" prop="userInfoSchool">
        <el-input v-model="list.userInfoSchool"/>
      </el-form-item>
      <el-form-item label="专业" prop="userInfoMajor">
        <el-input v-model="list.userInfoMajor" auto-complete="off"/>
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
      var checkPosition = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('职位不能为空'))
        } else {
          callback()
        }
      }
      var checkMajor = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('专业不能为空'))
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
          userInfoName: [{validator: checkName, trigger: 'blur'}],
          userInfoMajor: [{validator: checkMajor, trigger: 'blur'}],
          userInfoPhone: [{validator: checkPhone, trigger: 'blur'}],
          userInfoEmail: [{validator: checkEmail, trigger: 'blur'}],
          userInfoPosition: [{validator: checkPosition, trigger: 'blur'}],
          userInfoSex: [{validator: checkSex, trigger: 'blur'}],
          userInfoIntroduction: [{validator: checkIntroduction, trigger: 'blur'}],
          userInfoEducation: [{validator: checkEducation, trigger: 'blur'}],
          userInfoSchool: [{validator: checkSchool, trigger: 'blur'}]
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
              .updateUserInfo(this.list)
              .then(res => {
                console.log('list', this.list)
                console.log(res)
                if (res.data.success) {
                  this.$message.success(res.data.data)
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
    }
  }
</script>
