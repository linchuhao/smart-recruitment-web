<template>
  <div>
    <el-card class="noFound" v-if="!msgShow">
      <img src="static/img/notFound.png"/>
      <p>暂时没有消息哦</p>
    </el-card>
  <el-card class="infocard" v-for="(item, key) in messageList" :key="key" v-show="msgShow">
    <i class="el-icon-message myMsg"/>
    <div class="infoTitle" @click="msgDetail(item.userMsgId,item.userMsgStatus,item.userMsgTitle, item.userMsgContent)">
      <p>{{item.userMsgTitle}}</p>
    </div>
   <p class="time">{{item.sender}} | {{item.userMsgSendDatetime}}</p>
     <el-tag v-if="item.userMsgStatus" class="haveRead">已读</el-tag>
      <el-tag v-else type="warning" class="haveRead" >未读</el-tag>
  </el-card>
  <el-dialog  :title= this.title :visible.sync="dialogVisible" width="50%" >
  <span>{{content}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmClick()">确定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import api from '../api/index'
import ElCard from '../../node_modules/element-ui/packages/card/src/main.vue'
export default {
  data () {
    return {
      num: 0,
      messageList: '',
      title: '',
      dialogVisible: false,
      content: '',
      userId: sessionStorage.getItem('userId'),
      msgShow: false
    }
  },
  components: {
    ElCard
  },
  created () {
    this.getUserMessage()
  },
  methods: {
    confirmClick () {
      this.dialogVisible = false
    },
    getUserMessage () {
      console.log('getMessage')
      api.getUserMsg(this.userId)
        .then(res => {
          if (res.status === 200) {
            if (res.data.success === true) {
              this.messageList = res.data.data
              console.log(this.messageList)
              if (this.messageList.length !== 0) {
                this.msgShow = true
              }
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    msgDetail (msgId, msgStatus, title, msg) {
      this.dialogVisible = true
      this.content = msg
      this.title = title
      /*      let info = {
        id: num,
        userId: sessionStorage.getItem('userId')
      }
      fetch.readMessage(info).then(res => {
        console.log('已读', res)
      }).catch(e => {
        console.log(e)
      }) */
    }
  }
}
</script>

<style>
  .noFound p {
    font-size: 28px;
    color: #909399;
    margin-right: 50px;
    text-align: center;
  }

  .noFound img {
    width: 350px;
    height: 300px;
  }
.infocard {
  width: 1000px;
  margin: 20px auto auto auto;
}
.infoTitle {
  text-align: center;
  line-height: 90px;
  height: 90px;
  margin: auto auto auto 70px;
}
.infoTitle p {
  float: left;
  margin-top: 8px;
}
.time {
  float: right;
  margin-top: -28px;
}
.myMsg {
  margin-top: 14px;
  font-size: 65px;
  float: left;
  color: #5E9FA3
}
.haveRead {
  float: right;
  margin-top: -70px;
}
</style>
