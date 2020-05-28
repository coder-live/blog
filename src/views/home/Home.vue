<template>
  <div class= 'home'>
    <div class= 'bg' :style= "{height: homeHeight + 'px'}">
      <div class="content" :style= "{marginTop: changeHeight + 'px'}">
        <h1>燕 十 三</h1>
        <p>剑气纵横三万里,一剑光寒十九洲</p>
        <el-button type="primary">
          <router-link to='/article/0'>Enter Blog</router-link>
        </el-button>
      </div>
      <div class="downBtn" @click= 'slideDown'></div>
    </div>
    <div class= 'hot-article'>
      <div class="title">热门文章</div>
      <div class="description">
        <p>很想给你写封信,告诉你这里的天气.</p>
        <p>昨夜的那场电影,还有我的心情.</p>
      </div>
      <ul class= 'container'>
        <li v-for= 'item in article'>
          <div class="img"><a href="#"><img :src="'http://localhost:5002'+item.surface" alt=""/></a></div>
          <div class="content">
            <div class="cont-title"><a href="#">{{item.title}}</a></div>
            <div class="cont-time">
              {{item.data | getYear}}年
              {{item.data | getMonth}}月
              {{item.data | getDate}}日
            </div>
            <div class="cont-des">{{item.content}}</div>
            <a href="#">阅读更多</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import {request} from '@/network/request';

export default {
  name: 'Home',
  data() {
    return {
      homeHeight: 0,
      article: {}
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
    //根据页面高度显示具体高度
    getPageHeight() {
      this.homeHeight = window.innerHeight;
    },
    slideDown() {
      window.scrollTo(this.homeHeight);
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
        console.log(data.data);
      })
      .catch((err) => console.log(err));
    }
    
  },
  computed: {
    changeHeight() {
      return this.homeHeight / 3;
    }
  },
  created() {
    this.requestHotArticles();
  },
  mounted() {
    this.getPageHeight();
    //类似定时器, 只要绑定了就能根据页面变化---> 触发事件
    window.addEventListener('resize', this.getPageHeight);
  },
  destroyed() {
    window.removeEventListener('resize', this.getPageHeight);
  }
}
</script>

<style scoped lang= 'less'>
  .home {
    .bg {
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
        vertical-align: middle;
        text-align: center;
        z-index: 1;
        color: #fff;
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
        width: 50px;
        height: 50px;
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
          width: 28px;
          height: 28px;
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
    .hot-article {
      background-color: #fff;
      padding-top: 80px;
      text-align: center;
      
      .title {
        font-size: 30px;
        font-weight: 400;
      }
      .description {
        margin: 25px 0;
      }
      .container {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        li {
          flex: 1;
          margin: 10px 5px;
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
            background-color: rgb(250, 249, 249);
            padding: 30px 15px;
            .cont-title {
              margin-bottom: 10px;
              a {
                text-decoration: none;
                border: none;
              }
            }
            .cont-time {
              color: #bbb;
              font-size: 12px;
              margin-bottom: 15px;
            }
            .cont-des {
              color: #999;
              height: 55px;
              overflow: hidden;
            }
            a {
              display: inline-block;
              margin-top: 15px;
              padding: 0;
              background: 0 0;
              border: none;
              color: #29b6f6;
            }
          }
        }
      }
    }
  }
</style>