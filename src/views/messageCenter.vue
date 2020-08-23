<template>
  <div>
    <el-card class="noFound" v-if="!msgShow">
      <img src="static/img/notFound.png"/>
      <p>暂时没有消息哦</p>
    </el-card>
  <el-card class="messageCard" v-for="(item, key) in messageList" :key="key" v-show="msgShow">
    <i class="el-icon-message myMsg"/>
    <div class="messageTitle" @click="msgDetail(item)">
      <p>{{item.userMsgTitle}}</p>
    </div>
   <p class="time">{{item.sender}} | {{item.userMsgCreateDatetime}}</p>
     <el-tag v-if="item.userMsgStatus" class="haveRead">已读</el-tag>
      <el-tag v-else type="warning" class="haveRead" >未读</el-tag>
  </el-card>
  <el-dialog  :title= this.title :visible.sync="dialogVisible" width="50%" >
    <p style="text-align: left">{{content}}</p>
    <div class="annex" @click="openAnnex(userMsgAnnex)">
      <p v-if="this.userMsgAnnex"><img src="static/img/annex.png" class="annexIcon"/>{{this.userMsgAnnex.replace('static/resume/','')}}</p>
    </div>
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
      userMsgAnnex: '',
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
    msgDetail (item) {
      this.dialogVisible = true
      this.content = item.userMsgContent
      this.title = item.userMsgTitle
      if (item.userMsgAnnex) {
        this.userMsgAnnex = item.userMsgAnnex
      }
      /*      let info = {
        id: num,
        userId: sessionStorage.getItem('userId')
      }
      fetch.readMessage(info).then(res => {
        console.log('已读', res)
      }).catch(e => {
        console.log(e)
      }) */
    },
    openAnnex (annex) {
      console.log('查看简历' + annex)
      window.open(annex)
    }
  }
}
</script>

<style>
  .annex {
    cursor: pointer;
    text-align: left;
    font-weight: bold;
  }
  .annex :hover {
    color: red;
    transform: scale(1.015);
    transition: 3ms;
  }
  .annexIcon {
    width: 5%;
    height: 5%;
  }
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
.messageCard {
  width: 1000px;
  margin: 20px auto auto auto;
  cursor: pointer;
}
  .messageCard :hover {
    transform: scale(1.015);
    transition: 3ms;
  }
.messageTitle {
  text-align: center;
  line-height: 90px;
  height: 90px;
  margin: auto auto auto 70px;
}
.messageTitle p {
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
