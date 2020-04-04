<template>
  <div class="wrapper">
    <div v-if="!jobReleaseRecord" class="noFound">
      <img src="static/img/notFound.png">
      <p>暂时没有发布的职位哦，快去发布吧</p>
    </div>
    <el-row v-if="jobReleaseRecord">
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
    <div v-for="item in jobReleaseRecord" v-bind:key="item.id" v-if="jobReleaseRecord">
      <el-row>
        <el-col :span="4"><div class="jobName">{{item.jobName}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobType}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{item.jobEducation}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobExperience}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{transformSalary(item.jobMinSalary)}} - {{transformSalary(item.jobMaxSalary)}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.jobCity}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">{{item.jobDatetime}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light">{{item.deliveryCount}}</div></el-col>
        <el-col :span="2"><div class="editJob" @click="editJob(item)">编辑</div></el-col>
      </el-row>
    </div>
    <el-dialog title="编辑职位信息" :visible.sync="updateJobVisible" width="45%">
      <el-form :model="jobDetail" status-icon :rules="JobInfoRule" ref="jobInfo">
        <el-form-item label="职位名称" :label-width="formLabelWidth" prop="jobName">
          <el-row>
            <el-col :span="14">
              <el-input v-model="jobDetail.jobName" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="职位类型" :label-width="formLabelWidth" prop="jobType">
          <el-row>
            <el-col :span="14">
              <el-input v-model="jobDetail.jobType" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="薪酬区间" :label-width="formLabelWidth" prop="jobMinSalary">
          <el-row>
            <el-col :span="6"><el-input v-model="jobDetail.jobMinSalary"/></el-col>
            <el-col :span="2">——</el-col>
            <el-col :span="6"><el-input v-model="jobDetail.jobMaxSalary"/></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="学历要求" :label-width="formLabelWidth" prop="jobEducation">
          <el-row>
            <el-col :span="14">
              <el-select v-model="jobDetail.jobEducation" placeholder="请选择学历" style="width: 100%">
                <el-option label="大专" value="大专"/>
                <el-option label="本科" value="本科"/>
                <el-option label="硕士" value="硕士"/>
                <el-option label="博士" value="博士"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="工作经验" :label-width="formLabelWidth" prop="jobExperience">
          <el-row>
            <el-col :span="14">
              <el-select v-model="jobDetail.jobExperience" placeholder="请选择工作经验" style="width: 100%">
                <el-option label="不限" value="不限"/>
                <el-option label="1年以上" value="1年以上"/>
                <el-option label="2年以上" value="2年以上"/>
                <el-option label="3-5年" value="3-5年"/>
                <el-option label="5年以上" value="5年以上"/>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="职位城市" :label-width="formLabelWidth" prop="jobCity">
          <el-row>
            <el-col :span="14">
              <el-input v-model="jobDetail.jobCity" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="职位地址" :label-width="formLabelWidth" prop="jobAddress">
          <el-row>
            <el-col :span="14">
              <el-input v-model="jobDetail.jobAddress" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="工作职责" :label-width="formLabelWidth" prop="jobResponsibility">
          <el-row>
            <el-col :span="20">
              <el-input type="textarea" rows="5" v-model="jobDetail.jobResponsibility" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="职位要求" :label-width="formLabelWidth" prop="jobRequirement">
          <el-row>
            <el-col :span="20">
              <el-input type="textarea" rows="5" v-model="jobDetail.jobRequirement" autocomplete="off"/>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="updateJobVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateJobInfo('jobInfo')">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '../../api'

export default {
  props: ['jobReleaseRecord'],
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
    var checkJobExperience = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工作经验不能为空'))
      } else {
        callback()
      }
    }
    var checkJobEducation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('学历要求不能为空'))
      } else {
        callback()
      }
    }
    var checkJobType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('职位类型不能为空'))
      } else {
        callback()
      }
    }
    var checkJobResponsibility = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工作职责不能为空'))
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
      JobInfoRule: {
        jobName: [{validator: checkJobName, trigger: 'blur'}],
        jobAddress: [{validator: checkJobAddress, trigger: 'blur'}],
        jobMinSalary: [{validator: checkJobSalary, trigger: 'blur'}],
        jobExperience: [{validator: checkJobExperience, trigger: 'blur'}],
        jobEducation: [{validator: checkJobEducation, trigger: 'blur'}],
        jobCity: [{validator: checkJobCity, trigger: 'blur'}],
        jobType: [{validator: checkJobType, trigger: 'blur'}],
        jobResponsibility: [{validator: checkJobResponsibility, trigger: 'blur'}],
        jobRequirement: [{validator: checkJobRequirement, trigger: 'blur'}]
      },
      formLabelWidth: '80px',
      updateJobVisible: false,
      jobDetail: {}
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
    transformTag2LineBreak () {
      this.jobDetail.jobResponsibility = this.jobDetail.jobResponsibility.replace('<br/>', '\n')
      this.jobDetail.jobRequirement = this.jobDetail.jobRequirement.replace(/<br[\s]?\/>/g, '\n')
    },
    transformLineBreak2Tag () {
      this.jobDetail.jobRequirement = (this.jobDetail.jobRequirement + '').replace(/\n/g, '<br/>')
      this.jobDetail.jobResponsibility = (this.jobDetail.jobResponsibility + '').replace(/\n/g, '<br/>')
    },
    editJob (jobDetail) {
      this.updateJobVisible = true
      this.jobDetail = jobDetail
      this.transformTag2LineBreak()
    },
    updateJobInfo (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.transformLineBreak2Tag()
          api
            .updateJobInfo(this.jobDetail)
            .then(res => {
              if (res.data.success) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.updateJobVisible = false
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
  .jobName{
    background: #d3dce6;
    height: 36px;
    margin: 2px;
    padding: 10px 0 10px 0;
    overflow:hidden;
    white-space:nowrap;
  }
</style>
