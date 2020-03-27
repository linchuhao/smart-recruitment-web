import axios from 'axios'
const host = 'http://localhost:8888'
let headers = {
  'Content-Type': 'application/json'
}
export default {
  getCompany () {
    return host + '/company'
  },
  // 用户注册
  userRegister (userInfo) {
    return axios.post('/api/user/register', JSON.stringify(userInfo), {headers: headers})
  },
  // 用户登录
  userLogin (userInfo) {
    return axios.post('/api/user/login', JSON.stringify(userInfo), {headers: headers})
  },
  // 上传应聘者头像
  uploadApplicantInfoAvatar (file, userId) {
    return axios.post('/api/applicant/uploadApplicantInfoAvatar', file, {headers: headers, params: {userId: userId}})
  },
  // 上传应聘者简历
  uploadApplicantInfoResume (file, userId) {
    return axios.post('/api/applicant/uploadApplicantInfoResume', file, {headers: headers, params: {userId: userId}})
  },
  // 获取应聘者信息
  getApplicantInfo (userId) {
    return axios.get('/api/applicant/getApplicantInfo', {params: {userId: userId}}, {headers: headers})
  },
  // 获取简历投递记录
  getResumeDeliveryRecord (userId) {
    return axios.get('/api/applicant/getResumeDeliveryRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 更改应聘者信息
  updateApplicantInfo (applicantInfo) {
    return axios.post('/api/applicant/updateApplicantInfo', JSON.stringify(applicantInfo), {headers: headers})
  },
  // 获取HR信息
  getHrInfo (userId) {
    return axios.get('/api/hr/getHrInfo', {params: {userId: userId}}, {headers: headers})
  },
  // 获取职位发布记录
  getJobReleaseRecord (userId) {
    return axios.get('/api/hr/getJobReleaseRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 获取简历接收记录
  getResumeReceiveRecord (userId) {
    return axios.get('/api/hr/getResumeReceiveRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 更改HR信息
  updateHrInfo (hrInfo) {
    return axios.post('/api/hr/updateHrInfo', JSON.stringify(hrInfo), {headers: headers})
  },
  // 上传HR头像
  uploadHrInfoAvatar (file, userId) {
    return axios.post('/api/hr/uploadHrInfoAvatar', file, {headers: headers, params: {userId: userId}})
  },
  // 发布职位信息
  releaseJobInfo (jobInfo) {
    return axios.post('/api/job/releaseJobInfo', JSON.stringify(jobInfo), {headers: headers})
  },
  // 搜索职位信息
  searchJobInfo (jobName) {
    return axios.get('/api/job/searchJobInfo', {params: {jobName: jobName}}, {headers: headers})
  },
  // 获取热门企业信息
  getHotEnterprise () {
    return axios.get('/api/enterprise/getHotEnterprise', {headers: headers})
  },
  // 获取热门职位信息
  getHotJob () {
    return axios.get('/api/job/getHotJob', {headers: headers})
  },
  getComName () {
    return host + '/company/noPage'
  },
  getUserInfo () {
    return host + '/user'
  },
  sendCode () {
    return host + '/outside/code'
  },
  logout () {
    return host + '/user/logout'
  },
  // 提交简历信息
  sendResume () {
    return host + '/resume'
  },
  // 获取投递列表
  deliveryList () {
    return host + '/user/send'
  },
  // 提交用户信息
  putUserInfo () {
    return host + '/user/info'
  },
  // 修改用户手机号码
  changePhone () {
    return host + '/user/phone'
  },
  // 修改用户密码
  changePass () {
    return host + '/user/password'
  },
  // 修改用户邮箱
  changeEmail () {
    return host + '/user/email'
  },
  // 获取公司详情
  getCompanyDetail (id) {
    return host + `/company/${id}`
  },
  // 获取简历信息
  getResume () {
    return host + '/resume'
  },
  // 获取岗位详细信息
  getJobDetail (id) {
    return host + `/recruit/${id}`
  },
  // 投递简历
  deliveryReusme () {
    return host + '/recruit/resume'
  },
  // 获取站内信
  getMessage () {
    return host + '/message/user/get'
  },
  // 搜索职位信息
  findJob () {
    return host + '/recruit'
  },
  // 已读
  readMessage () {
    return host + '/message/read'
  },
  // hr resumelist
  receiveResume () {
    return host + '/user/receive'
  },
  // hr发布职位信息
  publishJob () {
    return host + '/recruit'
  },
  // 查看hr发布的职位信息
  checkJob () {
    return host + '/recruit/hr'
  },
  deletejob () {
    return host + '/recruit'
  },
  hrRegister () {
    return host + '/user/hr'
  },
  // 推荐候选人
  recommendCandidate () {
    return host + '/recruit/recommend/candidate'
  },
  // 推荐职位
  recommendJob () {
    return host + '/recruit/recommend/job'
  },
  // 获取感兴趣的工作
  getRecommandJob () {
    return host + '/recruit/name'
  }
}
