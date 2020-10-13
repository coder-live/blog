<template>
  <div class= 'detail'>
    <HeadNav ref='nav'/>
    <div class="container">
      <div class="head">
        <div class="title">
          {{articData.title}}<div class="mp3"></div>
        </div>
        <div class="tit-des">
          <div class="author"> 作者: <span>萧逸</span> </div>
          <div class="visit-num">浏览量: {{articData.pv}}</div>
          <div class="time">{{articData.date | getWholeTime}}</div>
        </div>
      </div>
      <div class="content">
        <div class="text" v-html="mdHtml"></div>
        <div class="des">
          <p>欢迎大家互相讨教, 有事留言 ~.</p>
          <p>互相学习 !</p>
          <p>博客网址：<a href="http://www.little-thinker.xyz">http://www.little-thinker.xyz</a></p>
        </div>
      </div>
      <div class="more">
        <div class="read">更多文章</div>
        <ul>
          <li v-for= 'item in moreTit' :key= 'item.title'>
            <span class="el-icon-link"></span>
            <router-link :to= "'/detail/' + item._id">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="share">分享 : <span>暂未开发</span></div>
      <div class="comment">
        <div class="com-t"><p>发表评论</p></div>
        <LayEdit @sub='handleSubmit'/>
        <div class="com-list">
          <ul>
            <li v-for= '(item, pIndex) in commentList' :key= 'pIndex'>
              <div class="photo"><img :src="item.user.photo" alt=""></div>
              <div class="name">{{item.user.user}}</div>
              <div class="content" v-html='item.content'></div>
              <div class="box">
                <div class="btn" @click='handleResClick(pIndex)'>回复</div>
                <span>{{item.date | getWholeTime}}</span>
              </div>
              <ul class="child-res">
                <li v-for='(childItem, Cindex) in item.children' :key= 'Cindex'>
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
          <div class="no-more" v-if= 'isCollection.noData'>没有更多数据了 ---</div>
        </div>
      </div>
    </div>
    <Footer/>
    <Up/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'; 
import Up from '@/components/common/up/Up';

import LayEdit from '@/components/common/layEdit/LayEdit';
import Footer from '@/components/content/footer/Footer';

import {request} from '@/network/request';
import {requestMessage} from '@/network/request';

import {getTime} from '@/assets/js'; 

import marked                                       from 'marked'
import hljs                                         from 'highlight.js'

marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    },
    sanitize: true
})

const renderer = new marked.Renderer()
// renderer.heading = function (text, level) {
//     return '<a href="#' + text + '" class="hashTitle" data-scroll><h' + level +
//             ' id="' + text + '">' + text + '</h' + level + '></a>'
// }


const requestMsg = requestMessage(5);

export default {
  name: 'Detail',
  data() {
    return {
      articData: {},
      moreTit: [],
      commentList: [],
      userState: false,
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
  components: {
    HeadNav,
    LayEdit,
    Footer,
    Up
  },
  computed: {
    artId() {
      return this.$route.params.id;
    },
    mdHtml () {
            return marked(this.articData.content || '', { renderer: renderer })
        }
  },
  filters: {
    getWholeTime(t) {
      // return getTime(t, true);
      return getTime(t, true);
    } 
  },
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
      this.reply.comId = this.commentList[pIndex]._id;
      if(cIndex !== undefined) { //回复子集
        // console.log(1)
        this.reply.resName = this.commentList[pIndex].children[cIndex].user.user;
      }else {  //只回复父级评论
        // console.log(2)
        this.reply.resName = this.commentList[pIndex].user.user;
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
          requestMsg(this.artId, '/comment')
          .then(res => {
            //console.log(res.data.data)
            this.isCollection.loading= false;

            if(res.data.data.length) {
              this.commentList.push(...res.data.data);
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
    
    //请求文章信息
    requestArticle() {
      request({
        url: '/article/definiteArticle',
        method: 'post',
        data: { id: this.artId }
      }).then(res => {
        console.log(res.data.data);
        this.articData = res.data.data;
      }).catch( (err) =>{
        console.log(err);
        return
      })
    },
    //两条热门文章 标题  -->  延伸文章
    requestMoreTit() {
      request({
        url: '/article/title',
        method: 'post',
        data: {
          limit: 2
        }
      }).then(res => {
        // console.log(res.data.data);
        this.moreTit = res.data.data;
      }).catch(err => console.log(err))
    },


    //提交 评论的回复信息----- 评论 ------请求
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
        url: '/comment/resCommit',
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
    //提交评论 请求 ===> 子组件发送的事件
    handleSubmit(val) {
      if(this.isLogin()) {
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
          url: '/comment/commit',
          data: {
            artId: this.artId,
            artTit: this.articData.title,
            _id: this.reply.userId,
            content
          }
        }).then(res => {
          // console.log(res)
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
    // 组件创建时   =>  留言请求
    handleRequestMessage() {
      requestMsg(this.artId, '/comment').then(res => {
        // console.log(res);
        this.commentList = res.data.data;
        
      }).catch(err => {
        console.log(err);
        return
      })
    }
  },
  watch: {
    artId() {
      window.location.reload();
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    this.handleRequestMessage();
    //创建组件 赋予 当前登录用户的id
    this.reply.userId = this.$store.state.userInfo.id;
    this.userState = this.$store.state.isLogin;

    this.requestArticle();
    this.requestMoreTit();
    //创建时 => 回到顶部
    document.documentElement.scrollTop = 0;
  },
  mounted() {
    this.$refs.nav.currentIndex = 1;
    this.$refs.nav.hoverIndex = 1;
    //监听滚轮,加载评论
    window.addEventListener( 'scroll', this.freshScroll );
  },
  destroyed() {
    //移除滚轮事件
    window.removeEventListener( 'scroll', this.freshScroll );
  }
}
</script>

<style scoped lang= 'less'>
  .detail {
    overflow: hidden;
    padding-bottom: 80px;
    width: 100%;
    .container {
      width: 90%;
      margin: 80px auto;
      background-color: #fff;
      .head {
        padding: 30px 30px 0px;
        color: #555;
        .title {
          font-size: 18px;
          line-height: 18px;
        }
        .tit-des {
          display: flex;
          font-size: 13px;
          height: 30px;
          margin: 5px 0;
          line-height: 30px;
          .author {
            margin-right: 10px;
            span {
              color: skyblue;
              
            }
          }
          .visit-num, .time {
            margin: 0 5px;
          }
        }
        
      }
      .content {
        padding: 0 30px 10px;
        .text {
          font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            display: block;
            /* height: 26.875rem; */
            color: #000;
            font-size: 1rem;
            overflow-y: auto;
            padding: 10px 25px 30px;
            /* white-space: pre-wrap;
            word-wrap: break-word; */
            outline: none;
            /* border: .5px solid #eee; */
            background-color: #eee;
            border-radius: 10px;
        }
        .des {
          margin-top: 30px;
          padding: 30px;
          line-height: 1.8;
          background-color: #eee;
          color: #222;
          border-radius: 10px;
          span.col, a {
            color: skyblue;
            &:hover {
              color: #409EFF;
            }
          }
        }
      }
      .more {
        padding: 0 30px;
        .read {
          margin: 20px 0;
          border-left: 3px solid #6bc30d;
          min-height: 26px;
          line-height: 26px;
          padding: 5px 20px;
          background-color: #f8f9f7;
          font-size: 16px;
          font-weight: 400;
          color: #585957;
          text-shadow: 0 1px 0 rgba(255,255,255,.5);
        }
        ul {
          border-bottom: 1px solid #666;
          li {
            margin: 10px;
            a {
              margin-left: 15px;
              color: skyblue;
              padding-bottom: 15px;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                color: #409EFF;
              }
            }
          }
        }
        
      }
      .share {
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        span {
          font-size: 12px;
          font-weight: 200;
          color: #888;
        }
      }
      .comment {
        position: relative;
        width: 100%;
        background-color: #fff;
        padding: 15px;
        .com-t {
          padding: 0 15px;
          p {
            margin: 20px 0;
            border-left: 3px solid #6bc30d;
            min-height: 26px;
            line-height: 26px;
            padding: 5px 20px;
            background-color: #f8f9f7;
            font-size: 16px;
            font-weight: 400;
            color: #585957;
            text-shadow: 0 1px 0 rgba(255,255,255,.5);
          }
        }
        .com-list {
          border-top: 1px solid #666;
          margin: 0 15px;
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
                  font-size: 14px;
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
            padding: 10px 0;
            text-align: center;
            background-color: #fff;
            font-size: 16px;
          }
          .loading {
            width: 100%;
            height: 40px;
            line-height: 40px;
            margin: 20px 0;
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
          
        }
      }
    }
  }
</style>