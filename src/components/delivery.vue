<template>
  <div class="deliveryWrap">
    <div v-if="!resumeDeliveryRecord" class="noFound">
      <img src="static/img/notFound.png">
      <p>暂时没有投递的记录哦，快去投递吧</p>
    </div>
    <el-row v-if="resumeDeliveryRecord">
      <el-col :span="4"><div class="grid-content ">公司名称</div></el-col>
      <el-col :span="5"><div class="grid-content ">职位名称</div></el-col>
      <el-col :span="2"><div class="grid-content ">职位类型</div></el-col>
      <el-col :span="5"><div class="grid-content ">薪酬区间</div></el-col>
      <el-col :span="3"><div class="grid-content ">城市</div></el-col>
      <el-col :span="5"><div class="grid-content ">投递时间</div></el-col>
    </el-row>
    <div v-for="item in resumeDeliveryRecord" v-bind:key="item.id" v-if="resumeDeliveryRecord">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">{{item.enterpriseName}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light">{{item.jobName}}</div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">{{item.jobType}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light">{{item.jobMinSalary}} - {{item.jobMaxSalary}}</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{item.jobCity}}</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple-light">{{item.deliveryDatetime}}</div></el-col>
      </el-row>
    </div>
<!--    <div v-if="!show" class="nofind">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524746733938&di=9ae24b5205e97c2876b48d3ff26f1c23&imgtype=0&src=http%3A%2F%2Fwww.snlfjx.com%2Fforum%2FSkin%2Fimgs%2Fno-data.png" style="margin: 0 auto">
      <p>暂时没有记录哦</p>
    </div>
    <div v-for="(item, index) in list" :key="index" v-if="show" @click="checkDetail(item.recruitId)">
      <el-card shadow="hover" class="deliverycard">
        <div class="resumeBox">
          <p>{{item.title}}</p>
          <p>投递时间{{item.time}}</p>
        </div>
      </el-card>
    </div>-->
  </div>
</template>
<style>
  .deliveryWrap {
    height: 1000px;
    overflow: scroll;
  }

  .deliveryWrap::-webkit-scrollbar {
    display: none;
  }

  .resumeBox {
    display: flex;
    justify-content: space-between;
  }

  .deliverycard {
    margin-bottom: 14px;
    width: 100%;
    height: 100px;
    border-left: 5px solid #888;
  }

  .nofond p {
    font-size: 28px;
    color: #909399;
    text-align: center;
  }

  .nofond img {
    width: 350px;
    height: 300px;
  }

  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    height: 36px;
    margin: 2px;
    padding: 10px 0 10px 0;
  }

  .noFound p {
    font-size: 28px;
    color: #909399;
    text-align: center;
  }

  .noFound img {
    width: 350px;
    height: 300px;
  }
</style>

<script>

export default {
  props: ['resumeDeliveryRecord'],
  data () {
    return {
      list: [],
      show: true
    }
  },
  mounted () {
    /*    this.getList() */
  },
  methods: {
    checkDetail (id) {
      localStorage.setItem('jobId', id)
      this.$router.push({name: 'jobInfo'})
    },
    getList () {
      /*      fetch
        .deliveryList()
        .then(res => {
          if (res.status === 200) {
            if (res.data.data === null) {
              this.show = false
            } else {
              this.list = res.data.data.sendList ? res.data.data.sendList : []
            }
          }
        })
        .catch(e => {
          console.log(e)
        }) */
    }
  }
}
</script>
