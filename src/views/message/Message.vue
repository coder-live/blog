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
              <span>{{getWholeTime(item.date)}}</span>
            </div>
            <ul class="child-res">
              <li v-for='(childItem, Cindex) in item.children'>
                <div class="photo"><img :src="childItem.user.avatar" alt=""></div>
                <div class="name">{{childItem.user.name}}</div>
                <div class="content" v-html='childItem.content'></div>
                <div class="btn" @click='handleResClick(pIndex, Cindex)'>回复</div>
              </li>
            </ul>
            <div class="text" v-show='resShow && currentIdex === pIndex'>
              <textarea name="response"
              :placeholder="'回复:' + reply.resName" 
              rows= '3' cols= '20'
              class="response"></textarea>
              <button @click='handleMsgCommit'>提交回复</button>
            </div>
          </li>
        </ul>
        <div class="no-more">没有更多数据了 ...</div>
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

let requestMsg = requestMessage(5);
// console.log(requestMsg)
export default {
  name: 'Message',
  data() {
    return {
      messageList: [],
      //上传回复时使用
      reply: {
        _id: '',
        resName: '',
        content: '',
      },
      //用于页面功能
      resShow: false,
      indexArr: [],
      //当前点击的 父评论序号 => 显示当前 评论回复框
      currentIdex: -1
    }
  },
  computed: {
    getWholeTime(t) {
      return getTime(t, true)
    } 
  },
  methods: {
    //提交 评论信息
    handleMsgCommit() {

    },
    //提交留言
    handleSubmit(val) {
     //开始提交留言      
    },
    //回复事件
    handleResClick( pIndex, cIndex ) {
      //将 回复的对象储存起来, 如果cIndex 不存在,则 只回复父级评论
      if(cIndex !== undefined) {
        // console.log(1)
        this.reply.resName = this.messageList[pIndex].children[cIndex].user.name;
      }else {
        // console.log(2)
        this.reply.resName = this.messageList[pIndex].user.name;
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
    //网络请求 => 留言请求
    requestMessage() {
      requestMsg().then(res => {
        console.log(res.data.data);
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
  },
  mounted() {
    this.$refs.nav.currentIndex = 2;
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
      height: 1050px;
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
        display: border-box;
        width: 100%;
        height: 130px;
        margin-top: 20px;
        ul {
          li {
            padding: 20px 70px;
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
              margin-left: 10px;
            }
            .child-res li {
              margin-top: 20px;
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
              .btn {
                width: 30px;
                margin-top: 15px;
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
        .no-more {
          margin-top: 20px;
          line-height: 2;
          text-align: center;
          background-color: #fff;
          font-size: 16px;
        }
      }
    }
  }
</style>