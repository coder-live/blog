<template>
  <div class= 'message'>
    <HeadNav ref='nav'/>
    <div class="message-box">
      <div class="msg-block">
        <h1>留言板</h1>
        <p>沟通交流，拉近你我！</p>
      </div>
      <LayEdit @sub='handleSubmit'/>
      <div class="message-list">
        <ul>
          <li v-for= '(item, pIndex) in messageList'>
            <div class="photo"><img :src="item.user.photo" alt=""></div>
            <div class="name">{{item.user.user}}</div>
            <div class="content" v-html='item.content'></div>
            <div class="box">
              <div class="btn" @click='handleResClick(pIndex)'>回复</div>
              <span>{{item.date | getWholeTime}}</span>
            </div>
            <ul class="child-res">
              <li v-for='(childItem, Cindex) in item.children'>
                <div class="photo"><img :src="childItem.user.photo" alt=""></div>
                <div class="name">{{childItem.user.user}}</div>
                <div class="answer">回复:<span>{{childItem.resName}}</span></div>
                <div class="content" v-html='childItem.content'></div>
                <div class="box">
                  <div class="btn" @click='handleResClick(pIndex, Cindex)'>回复</div>
                  <span>{{childItem.date | getWholeTime}}</span>
                </div>
              </li>
            </ul>
            <div class="text" v-show='resShow && currentIdex === pIndex'>
              <textarea name="response" v-model= 'reply.content'
              :placeholder="'回复:' + reply.resName" 
              rows= '3' cols= '20'
              class="response"></textarea>
              <button @click='handleMsgCommit'>提交回复</button>
            </div>
          </li>
        </ul>
        <div class="loading" v-if= 'isCollection.loading'>加载中
          <span>.</span> <span>.</span> <span>.</span>
        </div>
        <div class="no-more" v-if= 'isCollection.noData'>没有更多数据了 ...</div>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>

import {getTime} from '@/assets/js';

import HeadNav from '@/components/common/headNav/HeadNav'
import LayEdit from '@/components/common/layEdit/LayEdit'
import Footer from '@/components/content/footer/Footer'

import {requestMessage} from '@/network/request'
import {request} from '@/network/request'

const requestMsg = requestMessage(5);
// console.log(requestMsg)
export default {
  name: 'Message',
  data() {
    return {
      userState: false,
      messageList: [],
      //上传回复时使用
      reply: {
        //该条评论的id
        comId: '',
        //评论回复的对象
        userId: 0,
        resName: '',
        //评论内容
        content: '',
      },
      //用于页面功能
      resShow: false,
      indexArr: [],
      //当前点击的 父评论序号 => 显示当前 评论回复框
      currentIdex: -1,
      //评论加载 节流
      isCollection: {
        loading: false,
        noData: false,
      }
    }
  },
  filters: {
    getWholeTime(t) {
      // return getTime(t, true);
      return getTime(t, true);
    } 
  },
  // computed: {
  //   userState() {
  //     return this.$store.state.isLogin;
  //   }
  // },
  methods: {
    //调用 刷新页面函数
    reload() {
      window.location.reload();
    },
    //处理是否登录
    isLogin() {
      if(!this.userState) {
        this.$message({
          type: 'info',
          message: '请先登录~'
        });
        return false
      }else {
        return true
      }
    },
    //处理回复事件
    handleResClick( pIndex, cIndex ) {
      //将 回复的对象储存起来 
      //存该条评论的id(因为是在该评论下的,所以 是对 => 父级而言)
      this.reply.comId = this.messageList[pIndex]._id;
      if(cIndex !== undefined) { //回复子集
        // console.log(1)
        this.reply.resName = this.messageList[pIndex].children[cIndex].user.user;
      }else {  //只回复父级评论
        // console.log(2)
        this.reply.resName = this.messageList[pIndex].user.user;
      }
      //记录当前回复框
      // console.log(this.messageList[pIndex].children[indexArr[1]].response)
      this.currentIdex = pIndex;
      // console.log(pIndex, cIndex,this.currentIdex);
      //cIndex 为 undefined,则表示 => 回复父评论 , 即
      if(!this.indexArr) {//第一次没有序列号, 添加数组,且打开显示栏
        this.indexArr.push(pIndex, cIndex);
        this.resShow = true;
      }else {
        //表示前后两次点击 为同一个回复
        let isTheSame = this.indexArr[0] === pIndex && this.indexArr[1] === cIndex;
        if( isTheSame ) {
          this.resShow = false;
          this.indexArr.length = 0;
        }else {
          this.resShow = true;
          //更新上一次点击回复 的序列组
          this.indexArr.splice(0,1,pIndex);
          this.indexArr.splice(1,1,cIndex);
        }
      }
    },

    //评论加载 需操作dom
    freshScroll() {
      let viewH = document.documentElement.clientHeight;
      let scrollH = document.documentElement.scrollTop;
      let wholeH = document.documentElement.scrollHeight;
      
      //节流
      if(this.isCollection.loading || this.isCollection.noData ) {
        return
      }else {
      // console.log(viewH + scrollH, wholeH);

        if( viewH + scrollH > wholeH - 200 ) {
          // console.log("loading")
          this.isCollection.loading= true;
          requestMsg()
          .then(res => {
            //console.log(res.data.data)
            this.isCollection.loading= false;

            if(res.data.data.length) {
              this.messageList.push(...res.data.data);
            }else {
              this.isCollection.noData= true;
            }
          })
          .catch(err=> {
            console.log(err);
            return
          })
        }
      }
    },
    


    // ---------------发起请求------------------------------

    //提交 评论的回复信息-----------请求
    handleMsgCommit() {
      // console.log(222) //bug => 不能打印 console了 ,why
      this.isLogin();
      if(!this.reply.content) {
        this.$message({
          type: 'info',
          message: '请输入内容~'
        });
        return
      }
      // console.log(this.reply)
      request({
        method: 'post',
        url: '/message/resCommit',
        data: this.reply
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: '回复成功'
        });
        this.reload();
        //回复成功后将 一切功能相关的值 初始化
        this.reply.content = '';
        this.resShow = false;
        this.indexArr = [];
        this.currentIdex= -1;
      }).catch((err) => {
        // console.log(err)
        this.$message({
          type: 'error',
          message: '服务器错误,请稍后再会'
        })
      })
    },
    //提交留言 请求
    handleSubmit(val) {
      if(this.isLogin()) {
        // console.log(11111);
        // alert(1111)
        //开始提交留言  
        //  this.reply.userId为当前登录用户的id  
        let content = val.trim();
        if(!content) {
          this.$message({
            type: 'info',
            message: '请输入内容~'
          });
          return
        }
        request({
          method: 'post',
          url: '/message/commit',
          data: {
            _id: this.reply.userId,
            content
          }
        }).then(res => {
          // console.log(res);
          // if(res.data.code === 1) {
          //   this.$message({
          //     type: 'info',
          //     message: res.data.msg
          //   });
          //   return
          // }
          if(res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            this.reload();
          }else {
            this.$message({
              type: "error",
              message: res.data.msg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '服务器错误,稍后再试~'
          })
        })
      }
      

    },
    // 留言请求
    requestMessage() {
      requestMsg().then(res => {
        // console.log(res.data.data);
        this.messageList = res.data.data;
        
      }).catch(err => {
        console.log(err);
        return
      })
    }
  },
  components: {
    HeadNav,
    LayEdit,
    Footer
  },
  created() {
    this.requestMessage();
    //创建组件 赋予 当前登录用户的id
    this.reply.userId = this.$store.state.userInfo.id;
    this.userState = this.$store.state.isLogin;
  },
  mounted() {
    this.$refs.nav.currentIndex = 2;
    //监听滚轮,加载评论
    window.addEventListener( 'scroll', this.freshScroll );
  },
  destroyed() {
    //移除滚轮事件
    window.removeEventListener( 'scroll', this.freshScroll );
  }
}
</script>

<style scoped lang='less'>
  .message {
    width: 100%;
    overflow: hidden;
    .message-box {
      width: 90%;
      margin: 80px auto 120px;
      .msg-block {
        display: border-box;
        width: 100%;
        padding: 15px;
        background-color: #fff;
        h1 {
          font-weight: 600;
        }
        h1, p {
          width: 250px;
          margin: 20px auto;
          line-height: 1.5;
          text-align: center;
          color: #666;
        }
      }
      .message-list {
        width: 100%;
        margin-top: 20px;
        ul {
          li {
            padding: 15px 70px 10px;
            position: relative;
            line-height: 1.5;
            background-color: #fff;
            border-top: 1px dotted #888;
            &:nth-child(1) {
              border: 0;
            }
            .photo {
              position: absolute;
              top: 33;
              left: 15px;
              width: 40px;
              height: 40px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .name {
              color: #01aaed;
            }
            .content {
              margin-top: 2px;
              font-weight: 500;
            }
            .btn {
              display: inline-block;
              width: 30px;
              margin-top: 15px;
              color: blue;
              cursor: pointer;
              &:hover {
                color: skyblue;
              }
            }
            span {
              color: #555;
              font-size: 12px;
              margin-left: 10px;
            }
            .child-res li {
              margin-top: 10px;
              border-top: 1px dotted #888; 
              .photo {
                position: absolute;
                top: 33;
                left: 15px;
                width: 40px;
                height: 40px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .name {
                color: #01aaed;
              }
              .answer {
                margin-top: 5px;
                color: #888;
                font-size: 12px;
                span {
                  color: #60d;
                }
              }
              .content {
                position: absolute;
                font-weight: 500;
                top: 33px;
                left: 179px;
              }
              .btn {
                width: 30px;
                margin-top: 5px;
                color: blue;
                cursor: pointer;
                &:hover {
                  color: skyblue;
                }
              }
            }
            .text {
              width: 100%;
              .response {
                margin-bottom: 10px;
                padding: 5px 10px;
                width: 100%;
                resize: none;
                font-size: 14px;
              }
              button {
                padding: 5px;
                cursor: pointer;
                font-szie: 14px;
                &:hover {
                  background-color: #eee;
                }
              }
            }
          }
        }
        .loading {
          width: 100%;
          height: 40px;
          line-height: 5px;
          margin: 20px 0;
          padding: 10px 0;
          background-color: #fff;
          font-size: 18px;
          text-align: center;
          span {
            font-size: 50px;
            @keyframes appeare {
              from {opacity: 0}
              to {opacity: 1}
            }
            &:nth-child(1) {
              animation: appeare .7s infinite;
              animation-delay:.3s;
            }
            &:nth-child(2) {
              animation: appeare .7s infinite;
              animation-delay:.5s;
            }
            &:nth-child(3) {
              animation: appeare .7s infinite;
              animation-delay:.8s;
            }
          }
        }
        .no-more {
          margin-top: 20px;
          line-height: 2;
          padding: 10px 0;
          text-align: center;
          background-color: #fff;
          font-size: 16px;
        }
      }
    }
    
  }
</style>