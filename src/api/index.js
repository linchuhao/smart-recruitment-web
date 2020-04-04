import axios from 'axios'
let headers = {
  'Content-Type': 'application/json'
}
export default {
  // 用户注册
  userRegister (userInfo) {
    return axios.post('/api/user/register', JSON.stringify(userInfo), {headers: headers})
  },
  // 用户登录
  userLogin (userInfo) {
    return axios.post('/api/user/login', JSON.stringify(userInfo), {headers: headers})
  },
  // 获取用户信息
  getUserInfo (userId) {
    return axios.get('/api/userInfo/getUserInfo', {params: {userId: userId}}, {headers: headers})
  },
  // 上传用户头像
  uploadUserInfoAvatar (file, userId) {
    return axios.post('/api/userInfo/uploadUserInfoAvatar', file, {headers: headers, params: {userId: userId}})
  },
  // 上传应聘者简历
  uploadApplicantInfoResume (file, userId) {
    return axios.post('/api/userInfo/uploadApplicantInfoResume', file, {headers: headers, params: {userId: userId}})
  },
  // 获取简历投递记录
  getResumeDeliveryRecord (userId) {
    return axios.get('/api/userInfo/getResumeDeliveryRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 更改用户信息
  updateUserInfo (userInfo) {
    return axios.post('/api/userInfo/updateUserInfo', JSON.stringify(userInfo), {headers: headers})
  },
  // 进行投递简历
  deliverResume (deliveryRecord) {
    return axios.post('/api/userInfo/deliverResume', JSON.stringify(deliveryRecord), {headers: headers})
  },
  // 获取职位发布记录
  getJobReleaseRecord (userId) {
    return axios.get('/api/job/getJobReleaseRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 获取简历接收记录
  getResumeReceiveRecord (userId) {
    return axios.get('/api/userInfo/getResumeReceiveRecord', {params: {userId: userId}}, {headers: headers})
  },
  // 更改职位信息
  updateJobInfo (jobInfo) {
    return axios.post('/api/job/updateJobInfo', JSON.stringify(jobInfo), {headers: headers})
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
  }
}
