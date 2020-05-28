<template>
  <div class="container">
    <ArticleMain :articleData= 'allContent' :iscol= 'isCollection'/>
    <div class="aside">
      <div :class="['inner', {searchFix: isFixed}]">
        <div class="input">
          <input type="text" name="search" id="search"
          placeholder= '请输入搜索内容'>
          <span class="el-icon-search"></span>
        </div>
        <div class="title">
          <ul>
            <li v-for= "(item,index) in tags"
            :class= "{stay: stayIndex == index}"
            @mouseenter= "titleEnter(index)"
            @mouseleave= "titleLeave"
            @click= 'tagClick(index)'
            ><router-link :to= '"/article/" + index'>{{item}}</router-link></li>
          </ul>
          <div class="cover" :style= '{top: coverIndex * 40 + "px"}' v-if= 'tags'></div>
        </div>
      </div>
      <div class="hot-article">
        <h4>热门文章</h4>
        <ul>
          <li v-for= '(item, index) in title'>
            <span class="idx">{{index + 1}}</span>
            <a :href="item._id">
            <span>{{item.title}}</span>
          </a></li>
        </ul>
      </div>
      <div class="recommend">
        <h4>置顶推荐</h4>
        <ul v-if= 'recommendTitle'>
          <li v-for= '(item, index) in recommendTitle'>
            <span class="idx">{{index + 1}}</span>
            <a :href="item._id">
            <span>{{item.title}}</span>
          </a></li>
        </ul>
      </div>
      <div class="visitor">
        <h4>最近访客</h4>
        <ul>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
          <li><a href=""><span>是都不是吧</span></a></li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import ArticleMain from '../articleMain/ArticleMain'
import {request} from '@/network/request';
import {requestArticle} from '@/network/request';

const requestArticleMore = requestArticle();

export default {
  name: 'Contain',
  data() {
    return {
      //判断 搜索盒子 是否为fixed
      isFixed: false,
      tags: [],
      title: [],
      stayIndex: 0,
      //初始值为 tags所停留的那个分类上
      coverIndex: this.$route.params.id,
      allContent: [],
      //节流变量
      isCollection: {
        loading: false,
        noData: false,
      }
    }
  },
  components: {
    ArticleMain
  },

  computed: {
    //定义 完整tag是
    wholeTags() {
      return ['全部文章', ...this.tags];
    },
    //返回前三条热门文章
    recommendTitle() {
      return this.title.filter((item,index) => index < 3);
    },
    getId() {
      return this.$route.params.id;
    }
  },
  methods: {
    //在id变化是请求数据时的 加载变化
    requestArticleFresh() {
      this.loading = this.noData = false;
      requestArticleMore(this.getId, false).then( res => {
        this.allContent = res.data.data;
      } );
    },
    //关于tags 的样式
    titleLeave() {
      this.stayIndex = this.$route.params.id;
      this.coverIndex = this.$route.params.id;
      // this.coverTop = 0;
      // console.log(this.coverIndex);
    },
    titleEnter(index) {
      this.coverIndex = index;
      this.stayIndex = index;
    },
    //tags的点击分类
    tagClick(index) {
      this.coverIndex = index;
    },
    //监听滚轮 ,tags 的定位抖动
    searchScorll() {
      let scrollTop = document.documentElement.scrollTop;
      // console.log(scrollTop);
      this.isFixed = scrollTop > 900;
    },
    //监听滚轮事件,底部刷新
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
          requestArticleMore( this.getId, true )
          .then(res => {
            //console.log(res.data.data)
            this.isCollection.loading= false;

            if(res.data.data.length) {
              this.allContent.push(...res.data.data);
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

      

    }
  },

  watch: {
    getId() {
      this.requestArticleFresh();
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    //请求页面文章tags
    request({
      url: '/article/pageInfo',
      method: 'post'
    }).then( ({data}) => {
      this.tags= data.data.tags;
      //console.log(this.tags);
    } )
    .catch( (err) => console.log(err) );

    //请求热门文章标题
    request({
      url: '/article/title',
      method: 'post'
    })
    .then(({data}) => {
      this.title = data.data;
      //console.log(data);
    })
    .catch((err) => console.log(err));
  },
  mounted() {
    // 固定栏的滚轮监听
    window.addEventListener( 'scroll', this.searchScorll );

    //监听滚轮刷新
    window.addEventListener( 'scroll', this.freshScroll )


    // console.log(this.allContent= requestArticle()());
    //组件挂载完成 通过id 分别请求tags 的数据
    this.requestArticleFresh();
  },
  destroyed() {
    window.removeEventListener( 'scroll', this.searchScorll );
    window.removeEventListener( 'scroll', this.freshScroll );
    // console.log(1)
  }

}
</script>

<style lang= 'less' scoped>
  .container {
    width: 90%;
    margin: 60px auto;
    >.aside {
      position: relative;
      width: 300px;
      float: right;
      >.searchFix {
        position: fixed;
        top: 80px!important;
        width: 300px;
        animation: searchMove .8s ease-in-out;
        animation-fill-mode: forwards;
        @keyframes searchMove {
          from {
            top: -500px;
          }
          40% {
            top: 60px;
          }
          65% {
            top: 30px;
          }
          to {
            top: 60px;
          }
        }
      }
      >.inner {
        margin-top: 20px;
        z-index: 3;
        background-color: #fff;
        >.input {
          position: relative;
          padding: 20px;
          background-color: grey;
          position: relative;
          >input {
            outline: none;
            border: 0;
            width: 100%;
            height: 40px;
            font-size: 16px;
            padding-left: 15px;
            color: #515250;
            line-height: 40px;
            border-radius: 20px;
            background-color: #fff;
          }
          >span {
            position: absolute;
            right: 30px;
            top: 38%;
            cursor: pointer;
            font-size: inherit;
            font-weight: bolder;
            color: #787977;
            &:hover {
              color: skyblue;
            }
          }
        }
        >.title {
          padding-bottom: 20px;
          position: relative;
          >ul {
            position: relative;
            width: 100%;
            margin: 20px 0;
            >.stay {
              background-color: #eee;
              transition: all .6s;
            }
            >li {
              z-index: 11;
              width: 100%;
              height: 40px;
              >a {
                display: block;
                width: 100%;
                height: 100%;
                line-height: 40px;
                padding: 0 40px;
                border-bottom: 1px solid #f8f9f7;
                transition: none;
                text-decoration: none;
                color: #787977;
              }
            }
          }
          .cover {
            position: absolute;
            top: 20px;
            right: 0;
            width: 6px;
            height: 39px;
            background-color: #444;
            transition: top .6s;
          }
        }
      }
      >.hot-article,.recommend {
        width: 100%;
        padding: 5px 0;
        margin-top: 20px;
        background-color: #fff;
        >h4 {
          font-weight: normal;
          margin: 10px 20px;
          padding: 5px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        >ul {
          padding: 5px 20px;
          >li {
            &:nth-child(1) > .idx {
              background-color: #e24d46;
              color: #fff;
            }
            &:nth-child(2) > .idx {
              color: #fff;
              background-color: #2ea7e0;
            }
            &:nth-child(3) > .idx {
              color: #fff;
              background-color: #6bc30d;
            }
            >.idx {
              display: inline-block;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              line-height: 22px;
              text-align: center;
              font-size: 12px;
            }
            >a {
              display: inline-block;
              height: 32px;
              line-height: 32px;
              >span {
                margin-left: 10px;
                font-size: 14px;
                color: #777;
                &:hover {
                  color: blue;
                  border-bottom: 1px solid blue;
                }
              }
            }
          }
        }
      }
      .visitor {
        width: 100%;
        height: 266px;
        padding: 5px 0;
        margin-top: 20px;
        background-color: #fff;
        >h4 {
          font-weight: normal;
          margin: 10px 20px;
          padding: 5px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        >ul {
          padding: 5px 20px;
          >li {
            >a {
              position: relative;
              display: block;
              float: left;
              width: 23%;
              height: 55px;
              border: 1px solid blue;
              margin: 2px 3px 2px 2px;
              &::after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                clear: both;
              }
              >span {
                overflow: hidden;
                position: absolute;
                left: 0;
                bottom: 0;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                background-color: rgba(0, 0, 0, .2);
                text-align: center;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>