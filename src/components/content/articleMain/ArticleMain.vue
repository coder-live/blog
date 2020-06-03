<template>
  <div class= 'article-main'>
    <div class="content">
      <section v-for= '(item, index) in articleData'>
        <h4>
          <span class="type">【{{item.type}}】</span>
          <router-link :to=" '/detail/' + item._id">{{item.title}}</router-link>
        </h4>
        <div class="time">
          <p class="date">{{item.date | getDate}}</p>
          <p class="my"><span class="month">{{item.date | getMonth}} 月</span>
            <span class="year">{{item.date | getYear}}</span>
          </p>
        </div>
        <div class="content-text">
          <router-link :to=" '/detail/' + item._id"><i></i><img :src="item.surface" alt=""></router-link>
          {{item.content}}
        </div>
        <div class="read-more">
          <router-link :to=" '/detail/' + item._id">继续阅读</router-link>
        </div>
        <div class="foot">
          <div class="tag">
            <span class="el-icon-s-promotion"></span>
            <a>{{item.tag}}</a>
          </div>
          <div class="right">
            <span class="visit">
              <i class="el-icon-view"></i>
              <i class="num">{{item.pv}}</i>
            </span>
            <span class="comment">
              <i class="el-icon-chat-dot-round"></i>
              <i class="num">{{item.comment}}</i>
            </span>
          </div>
        </div>
      </section>
    </div>
    <div class="loading" v-if= 'iscol.loading'>加载中
      <span>.</span> <span>.</span> <span>.</span>
    </div>
    <div class="foot" v-if= 'iscol.noData'>没有更多了!</div>
  </div>

</template>

<script>
export default {
  name: 'ArticleMain',
  props: {
    articleData: {
      type: Array,
      default() {
        return []
      }
    },
    iscol: {
      type: Object,
      default() {
        return {}
      }
    }
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
}
</script>

<style scoped lang= 'less'>
  .article-main {
    float: left;
    width: calc(100% - 300px - 20px);
    >.content {
      width: 100%;
      margin-top: 20px;
      @keyframes scal {
        from{opacity: .5; transform: scale(.5)}
        to{opacity: 1; transform: scale(1)}
      }
      >section {
        overflow: hidden;
        position: relative;
        width: 100%;
        padding: 5px 0;
        margin: 20px 0 10px;
        background-color: #fff;
        animation: scal .3s ease-in-out;
        animation-fill-mode: forwards;
        &:nth-child(1)::after {
          content: '置顶';
          position: absolute;
          top: 10px;
          left: -29px;
          width: 94px;
          height: 20px;
          transform: rotate(-45deg);
          background-color: #ff5722;
          text-align: center;
          font-size: 16px;
          color: #fff;
        }
        >h4 {
          border-bottom: 1px solid #e8e9e7;
          margin: 15px 20px;
          padding: 5px;
          font-weight: normal;
          font-size: 18px;
          .type {
            line-height: 30px;
            font-weight: 400;
            color: #2ea7e0;
            position: relative;
          }
          a {
            color: #212220;
            &:hover {
              color: #6bc30d;
            }
          }
        }
        >.time {
          position: absolute;
          top: 0;
          right: 0;
          width: 121px;
          height: 70px;
          background-color: #fff;
          .date {
            display: block;
            text-align: center;
            font-weight: 700;
            font-size: 40px;
            color: #6bc30d;
            position: relative;
            top: 2px;
          }
          .my {
            font-size: 18px;
            margin-left: 10px;
            .month {
              color: #989997;
            }
            .year {
              margin-left: 10px;
              color: #989997;
            }
          }
        }
        >.content-text {
          margin: 10px 20px;
          padding: 5px;
          font-size: 14px;
          letter-spacing: 1px;
          word-spacing: 1px;
          color: #555;
          line-height: 28px;
          position: relative;
          overflow: hidden;
          min-height: 200px;
          z-index: 2;
          >a {
            position: relative;
            overflow: hidden;
            display: block;
            width: 300px;
            height: 180px;
            border: 1px solid #e8e9e7;
            overflow: hidden;
            float: left;
            margin-right: 20px;
            i {
              position: absolute;
              top: 0;
              left: -60px;
              height: 100%;
              box-shadow: 0 0 15px 11px rgba(255,255,255,.6);
              transform: skewX(-25deg);
            }
            &:hover i {
              left: 440px;
              transition: left .2s .5s ease-in-out;
            }
            img {
              display: block;
              width: 100%;
              height: 100%;
            }

          }
        }
        >.read-more {
          margin: 10px 20px;
          padding: 5px;
          height: 40px;
          line-height: 40px;
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            top: 20px;
            left: 100px;
            right: 0;
            height: 1px;
            background-color: #d0d0d0;
          }
          >a {
            font-weight: bold;
            color: #383937;
            &:hover {
            color: #6bc30d;
          }
          }
        }
        >.foot {
          height: 26px;
          line-height: 26px;
          margin: 10px 20px 20px 20px;
          padding: 5px;
          color: #787977;
          overflow: hidden;
          zoom: 1;
          clear: both;
          >.tag {
            font-size: 14px;
            line-height: 1.1;
            padding: 2px;
            float: left;
            >a {
              margin-left: 5px;
              background-color: rgba(0,0,0,.03);
              &:hover {
              color: #fff; 
              background-color: #6bc30d;
              }
            }
          }
          .right {
            >.visit, .comment {
              margin: 0 25px;
              i {
                font-size: 14px;
                margin: 0 2px;
              }
            }
          }
            
        }
      }
    }
    >.loading, .foot {
      width: 100%;
      height: 40px;
      line-height: 17px;
      margin: 20px 0;
      background-color: #fff;
      font-size: 18px;
      text-align: center;
    }
    >.loading span {
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
</style>