<template>
  <div class= 'home'>
    <div class= 'bg' :style= "{height: homeHeight + 'px'}">
      <div class="content loading">
        <h1>萧 逸</h1>
        <p>世间行乐亦如此, 古来万事东流水。</p>
        <router-link to='/article/0'>
          <el-button type="primary">Enter Blog</el-button>
        </router-link>
      </div>
      <div class="downBtn" @click= 'slideDown'></div>
    </div>
    <div class="nav-side">
      <div @click= 'handleNavClick'
      :class="['nav-list', {hover : navHover}]"> <p></p> <p></p> <p></p> </div>
    </div>
    <div :class="['mask', {maskActive: navHover}]">
      <div class="visible" v-show= 'navHover'>
        <ul>
          <li><a href= '/home'>首页</a></li>
          <li><router-link to= '/article/0'>博客</router-link></li>
          <li><router-link to= '/message'>留言</router-link></li>
        </ul>
        <div class="log">Mr.Xy</div>
      </div>
    </div>
    <div class= 'hot-article'>
      <div class="text loading">
        <div class="title">热门文章</div>
        <div class="description">
          <p>当我放下的那一刻时, 一切都不曾发生变化.</p>
          <p>除了昨夜的那次留言, 还有我的心情.</p>
        </div>
      </div>
      <div class="page-loading" v-if= 'pageLoad'>
        加载中
        <span>.</span> <span>.</span> <span>.</span>
      </div>
      <ul :class= "['container', {loading: !articleAppear}]" v-else= '!pageLoad'>
        <li v-for= 'item in article'>
          <div class="img"><a href="#"><img :src="item.surface" alt=""/></a></div>
          <div class="content">
            <div class="cont-title"><a href="#">{{item.title}}</a></div>
            <div class="cont-time">
              {{item.date | getYear}}年
              {{item.date | getMonth}}月
              {{item.date | getDate}}日
            </div>
            <div class="cont-des">{{item.content}}</div>
            <a class= 'more' href="#">阅读更多</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="session">
      <div class="session-mid loading">
        <div class="about"><router-link to= '/about'>关于</router-link></div>
        <div class="friend-link"><router-link to= '/friendLink'>+友情链接</router-link></div>
      </div>
    </div>
    <div class="intro">
      <div class="des loading">
        <h1>静之隐者</h1>
        <p>喜爱平凡, 无忧, 安静。 可是一旦沉迷某事, 尤其玄之又玄亦或, 逻辑有趣之事, 就会忘却时间, 废寝忘食</p>
      </div>
    </div>
    <footer>
      <div class="foot-top loading">
        <div class="left">
          <h4>萧 逸</h4>
          <p>世间行乐亦如此, 古来万事东流水。</p>
          <router-link to= '/about'><el-button type="primary">About Me</el-button></router-link>
        </div>
        <div class="center">
          <div class="link">相关链接</div>
          <div class="link-item">
            <ul>
              <li><router-link to= '/artice/0'><i class= 'el-icon-document'></i>博文</router-link></li>
              <li><router-link to= '/message'><i class= 'el-icon-message'></i>留言</router-link></li>
              <li><router-link to= '/diary'><i class= 'el-icon-time'></i>日记</router-link></li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="call-me">联系我</div>
          <div class="mine"><i class= 'el-icon-map-location'></i>地址: 浙江杭州...</div>
          <div class="mine"><i class= 'el-icon-phone'></i>QQ: 1696698061</div>
          <div class="mine"><i class= 'el-icon-connection'></i>邮箱: 1696698061@qq.com</div>
        </div>
      </div>
      <div class="foot-bottom"><p class="blog">2020 littleThinker Blog by 萧逸 Template source from 燕十三 备案号:
        <span class="num">浙ICP备20002521号-1.</span>
      </p></div>
    </footer>
  </div>

</template>

<script>

import {request} from '@/network/request';

const getHeight = function(node) {
  return node.offsetTop;
}
export default {
  name: 'Home',
  data() {
    return {
      homeHeight: 0,
      article: {},
      //点击事件 --> 控制遮罩图层以及
      navHover: false,
      //页面是否将被摧毁
      destroy: false,
      //页面到达底部
      reachBottom: false,
      //监听数据是否请求到, 显示与否的事件
      pageLoad: true,
      articleAppear: false
    }
  },
  components: {
  },
  filters: {
    getDate(val) {
      // console.log(val);
      let reg= /^(\d{4})-(\d{1,2})-(\d{1,2})/;
      return val.match(reg)[3];
    },
    getMonth(val) {
      let reg= /^(\d{4})-(\d{1,2})-(\d{1,2})/;
      return val.match(reg)[2];
    },
    getYear(val) {
      let reg= /^(\d{4})-(\d{1,2})-(\d{1,2})/;
      return val.match(reg)[1];
    },
  },
  methods: {
    handleNavClick() {
      this.navHover = !this.navHover;
    },
    // resize  根据页面高度显示具体高度 
    getPageHeight() {
      this.homeHeight = window.innerHeight;
    },
    //scroll
    handleScroll() {
      // 监听到达底部后就不监听滚动事件了;
      if(!this.reachBottom) {
        let loadDom = document.querySelectorAll('.loading');
        let scroll = document.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        [].forEach.call(loadDom, function(item) {
          // console.log(item,getHeight(item));
          if(scroll + windowHeight >= getHeight(item) + 90) {
            // console.log(scroll + windowHeight)
            // console.log(getHeight(item))
            // console.log('到达')
            item.classList.remove('loading');
          }
        })
        if(scroll + windowHeight > scrollHeight -80) {
          console.log('到底了');
          this.reachBottom = true;
        }
      }
    },
    //点击页面滚动
    slideDown() {
      let scrollTop = 0;
      let height = window.innerHeight;
      (function re() {
        if(scrollTop < height) {
          scrollTop += 38;
          console.log(1)
          document.documentElement.scrollTop = scrollTop;
          window.requestAnimationFrame(re);
        }
      })();
    },
    //请求 热门文章内容
    requestHotArticles() {
      request({
        url: '/article/title',
        method: 'post',
        data: {
          limit: 3
        }
      })
      .then(({data}) => {
        this.article = data.data;
        this.pageLoad = false;
        this.articleAppear = true;
        // console.log(data.data);
      })
      .catch((err) => console.log(err));
    }
    
  },
  computed: {
    // changeHeight() {
    //   return this.homeHeight / 2;
    // }
  },
  created() {
    this.requestHotArticles();
  },
  mounted() {
    //先进行一次页面监听事件,用于 --> 弹出首页
    this.handleScroll(),
    this.getPageHeight();
    //类似定时器, 只要绑定了就能根据页面变化---> 触发事件
    window.addEventListener('resize', this.getPageHeight);
    //监听滚轮, 删除loading class属性
    window.addEventListener('scroll', this.handleScroll)
  },
  activated() {
    //页面活跃 回顶
    document.documentElement.scrollTop = 0;
    this.navHover = false;
    this.reachBottom = false;
    // console.log(1)
  },
  disactivated() {
    if(!this.destroy) {
      window.removeEventListener('resize', this.getPageHeight);
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    //如果页面销毁
    this.destroy = true;
  },
  destroyed() {
    window.removeEventListener('resize', this.getPageHeight);
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped lang= 'less'>
  .home {
    position: relative;
    width: 100%;
    .bg {
      width: 100%;
      overflow: hidden;
      position: relative;
      width: 100%;
      background: url('../../assets/image/home_bg.png') center center/cover no-repeat;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
      }
      .content {
        position: relative;
        width: 100%;
        height: 100%;
        margin-top: 18%;
        font-size: 18px;
        vertical-align: middle;
        text-align: center;
        z-index: 1;
        color: #fff;
        opacity: 1;
        transition: .3s;
        &.loading {
          margin-top: 18%;
          transform: scale(.6);
          opacity: .5;
        }
        h1 {
          font-weight: 400;
        }
        p {
          letter-spacing: 10px;
          margin: 25px 0;
        }
        .el-button {
          border-radius: 3px;
        }
      }
      .downBtn {
        overflow: hidden;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        bottom: 30px;
        left: 50%;
        margin-left: -25px!important;
        z-index: 1;
        transition: all .5s ease-out;
        cursor: pointer;
        &::after {
          content: "";
          display: table;
          width: 20px;
          height: 20px;
          margin: 5px auto;
          border-bottom: 4px solid #fff;
          border-right: 4px solid #fff;
          transform: rotate(45deg);
        }
        &:hover {
          background-color: #6bc30d;
        }
      }
    }
    .nav-side {
      z-index: 100;
      position: fixed;
      right: 30px;
      top: 30px;
      .nav-list {
        width: 44px;
        height: 43px;
        border-radius: 50%;
        cursor: pointer;
        background-color: #999;
        &:hover {
          background-color: #29b6f6;
        }
        p {
          position: relative;
          top: 10px;
          left: 10px;
          width: 25px;
          height: 2px;
          background-color: #fff;
          margin-top: 8px;
          transition: all .2s;
        }
        
      }
      .hover {
        background-color: #888;
        p {
          &:nth-child(1) {
            transform: rotate(45deg) translate(7px, 8px)
          }
          &:nth-child(2) {
            transform: rotate(-45deg);
          }
          &:nth-child(3) {
            display: none;
          }
        }
      }
      
    }
    .mask {
      position: fixed;
      z-index: 10;
      top: 0;
      right: 0;

      color: #000;
      &::before {
        content: '';
        position: fixed;
        top: 0;
        right: -1650px;
        width: 100%;
        height: 1000px;
        z-index: 10;
        transform: skewX(-12deg);
        transition: all .1s;
      }
      ul {
        position: absolute;
        top: 170px;
        right: 50px;
        z-index: 11;
        li {
          position: relative;
          margin: 50px 0;
          font-size: 20px;
          color: #444;
          letter-spacing: 2px;
          font-weight: 520;
          cursor: pointer;
          &::after {
            content: '';
            position: absolute;
            top: 10px;
            left: -19px;
            width: 0px;
            height: 1px;
            background-color: #6bc30d;
          }
          &:hover {
            color: #6bc30d;
            &::after{
              width: 82px;
            }
          }
        }
      }
      .log {
        position: absolute;
        bottom: 30px;
        right: 30px;
        height: 60px;
        line-height: 60px;
        font-family: BarbaraHand;
        font-size: 65px;
        font-weight: 400;
        z-index: 11;
      }
    }
    .maskActive {
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      &::before {
        right: -66%;
        background-color: #eee;
      }
    }
    .hot-article {
      width: 100%;
      background-color: #fff;
      padding: 50px 0 120px 0;
      text-align: center;
      color: #000;
      
      .text {
        &.loading  {
          .title, .description {
            top: -80px;
            opacity: .5;
          }
        }
        z-index: 3;
        .title {
          position: relative;
          top: 0;
          margin-bottom: 45px;
          font-size: 30px;
          font-weight: 400;
          opacity: 1;
          transition: .3s .05s;
          &::after {
            content: '';
            position: absolute;
            top: 60px;
            right: 47.5%;
            width: 50px;
            height: 2px;
            background-color: #00c2ff;
          }
        }
        .description {
          position: relative;
          top: 0;
          margin: 25px 0;
          font-size: 14px;
          line-height: 1.5;
          opacity: 1;
          transition: .3s .15s;
        }
      }
      .container {
        display: flex;
        width: 100%;
        height: 450px;
        padding: 0 10px;
        margin-top: 10px;
        justify-content: space-between;
        &.loading li {
          top: 100px;
        }
        li {
          position: relative;
          top: 0;
          flex: 1;
          height: 420px;
          margin: 10px 15px;
          &:nth-child(1) {
            transition: top .3s .05s;
          }
          &:nth-child(2) {
            transition: top .3s .25s;
          }
          &:nth-child(3) {
            transition: top .3s .35s;
          }
          .img {
            width: 100%;
            a {
              width: 100%;
              img {
                width: 100%;
              }
            }
          }
          .content {
            position: relative;
            background-color: rgb(250, 249, 249);
            padding: 30px 15px;
            margin-bottom: 10px;
            .cont-title {
              margin-bottom: 10px;
              a {
                display: inline-block;
                color: #000;
                text-decoration: none;
                border: none;
                &:hover {
                  opacity: .8;
                }
              }
            }
            .cont-time {
              color: #bbb;
              font-size: 12px;
              margin-bottom: 15px;
            }
            .cont-des {
              overflow: hidden;
              display: -webkit-box;
              max-width: 100%;
              height: 45px;
              line-height: 1.5;
              margin: 0 auto;
              font-size: 16px;
              color: #888;

              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
            }
            a.more {
              display: block;
              text-align: left;
              margin-top: 15px;
              padding: 0;
              background: 0 0;
              border: none;
              color: #29b6f6;
              font-size: 14px;
              &:hover {
                color: #888;
                font-weight: 500;
              }
            }
          }
        }
      }
      .page-loading {
        width: 100%;
        height: 100px;
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
    .session {
      overflow: hidden;
      width: 100%;
      background-color: #fff;
      height: 250px; 
      background-image: url('../../assets/image/home_item1.png');
      background-position: center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      .session-mid {
        position: relative;
        display: flex;
        width: 400px;
        margin: 100px auto;
        justify-content: space-between;
        z-index: 2;
        transition: width .5s;
        &.loading {
          width: 700px;
        }
        .about, .friend-link {
          position: relative;
          flex: 0 0 180px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-weight: 200;
          border: 1px solid #fff;
          color: #fff;
          cursor: pointer;
          z-index: 3;
          a {
            display: block;
          }
          &::after {
            content: '';
            position: absolute;
            width: 0%;
            height: 100%;
            top: 0;
            left: 0;
            color: #000;
            z-index: -1;
            transition: all .8s;
          }
          &:hover::after {
            width: 100%;
            background-color: #1c51ba;
          }
        }
      }
    }
    .intro {
      left: 0;
      width: 100%;
      padding: 100px 0;
      background-color: #fff;
      color: #000;
      .des {
        position: relative;
        width: 400px;
        margin: 0 auto;
        line-height: 1.4;
        transition: left .3s;
        &.loading {
          left: -444px;
        }
        text-align: center;
        h1 {
          font-size: 30px;
          font-weight: 400;
        }
        p {
          font-size: 14px;
        }
      }
    }
    footer {
      overflow: hidden;
      width: 100%;
      color: #fff;
      height: 255px;
      background-color: #232328;
      .foot-top {
        position: relative;
        display: flex;
        width: 100%;
        margin-top: 50px;
        justify-content: space-between;
        text-align: center;
        &.loading {
          .left, .center, .right {
            top: -50px;
          }
        }
        .left, .center, .right {
          position: relative;
          top: 0;
        }
        .left {
          flex: 1;
          transition: top .3s .05s;
          h4 {
            color: #fff;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 30px;
            text-transform: uppercase;
          }
          p {
            margin: 5px 0;
            font-size: 14px;
            font-weight: 200;
          }
          .el-button {
            margin-top: 20px;
          }
        }
        .center {
          flex: 1;
          transition: top .3s .15s;
          .link {
            margin-bottom: 10px;
            font-size: 20px;
          }
          .link-item {
            color: #fff;
            margin-bottom: 30px;
            /*--text-transform: uppercase;--*/ 
            ul {
              display: flex;
              flex-wrap: wrap;
              li {
                width: 50%;
                margin: 5px 0;
                a {
                  line-height: 1.5;
                  font-size: 14px;
                  font-weight: 200;
                  &:hover{
                    color: #29b6f6;
                  }
                  i {
                    margin: 0 5px;
                  }
                }
              }
            }
          }
        }
        .right {
          flex: 1;
          transition: top .3s .25s;
          .call-me {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 25px;
          }
          .mine {
            margin: 10px 20px;
            font-size: 14px;
            text-align: left;
            font-weight: 200;
            letter-spacing: 1px;
            i {
              margin: 0 5px;
            }
          }
        }
      }
      .foot-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
        background-color: #222;
        p.blog {
          text-align: center;
          font-size: 14px;
          font-weight: 200;
          color: #999;
          span {
            color: #fff;
            font-size: 14px;
            margin-left: 3px;
            font-weight: 300;
          }
        }
        
      }
    }
  }
</style>