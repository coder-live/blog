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
        <div class="text">{{articData.content}}</div>
        <div class="des">
          <p>非特殊说明，本文版权归 燕十三 所有，转载请注明出处.</p>
          <p>本文标题: <span class="col">燕十三</span> </p>
          <p>本文网址：<a href="https://www.yanshisan.cn/Blog/Read/12">https://www.yanshisan.cn/Blog/Read/12</a></p>
        </div>
      </div>
      <div class="more">
        <div class="read">更多文章</div>
        <ul>
          <li v-for= 'item in moreTit' :key= 'item.title'>
            <span class="el-icon-link"></span>
            <router-link :to= "'/detail' + item._id">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="share">分享</div>
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
          <div class="no-more" v-if= 'isCollection.noData'>没有更多数据了 ...</div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'; 
import LayEdit from '@/components/common/layEdit/LayEdit';
import Footer from '@/components/content/footer/Footer';

import {request} from '@/network/request';

import {getTime} from '@/assets/js'; 

export default {
  name: 'Detail',
  data() {
    return {
      articData: [],
      moreTit: [],
      commentList: [],
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
    Footer
  },
  computed: {
    artId() {
      return this.$route.params.id;
    }
  },
  filters: {
    getWholeTime(t) {
      // return getTime(t, true);
      return getTime(t, true);
    } 
  },
  methods: {
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
    //两天热门文章 标题
    requestMoreTit() {
      request({
        url: '/article/title',
        method: 'post',
        data: {
          limit: 2
        }
      }).then(res => {
        console.log(res.data.data);
        this.moreTit = res.data.data;
      }).catch(err => console.log(err))
    },
    //评论内容 val
    handleSubmit(val) {

    }
  },
  created() {
    this.requestArticle();
    this.requestMoreTit();
  },
  mounted() {
    this.$refs.nav.currentIndex = 1;
    this.$refs.nav.hoverIndex = 1;
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
          font-size: 12px;
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
          font-szie: 14px;
          color: #666;
          padding: 30px 0;
          line-height: 2;
          letter-spacing: .8px;
          border-top: 1px solid #666;
        }
        .des {
          padding: 30px;
          line-height: 1.8;
          background-color: #eee;
          color: #222;
          span.col, a {
            color: skyblue;
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
        ul li {
          margin: 10px;
          a {
            margin-left: 15px;
            color: skyblue;
            padding-bottom: 15px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
      .share {
        height: 40px;
        background-color: #eee;
        padding: 0 30px;
      }
      .comment {
        position: relative;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #666;
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
          
        }
      }
    }
  }
</style>