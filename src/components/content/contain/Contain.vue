<template>
  <div class="container">
    <ArticleMain 
    v-show= 'show'
    :articleData= 'allContent' 
    :iscol= 'isCollection'/>
    <div class="aside">
      <div :class="['inner', {searchFix: isFixed}]">
        <div class="input">
          <div class="input-box">
            <input type="text" 
            name="search" id="search"
            v-model= 'keyWords'
            placeholder= '请输入搜索内容'>
          </div>
          <span class="el-icon-search" @click= 'handleInput'></span>
        </div>
        <div class="search-list" v-show= 'searchListShow'>
          <ul class='search-ul'>
            <li v-for= 'item in searchList' :key="item.title">
              <router-link :to="'/detail/'+item._id">{{item.title}}</router-link>
            </li>
            <li @click= 'searchListShow = false'>退出</li>
            
          </ul>
        </div>
        <div class="title">
          <ul>
            <li v-for= "(item,index) in wholeTags"
            :class= "{stay: stayIndex == index}"
            @mouseenter= "titleEnter(index)"
            @mouseleave= "titleLeave"
            @click= 'tagClick(index)'
            :key= 'index'
            ><router-link :to= '"/article/" + index'>{{item}}</router-link></li>
          </ul>
          <div class="cover" :style= '{top: stayIndex * 40 + "px"}' v-if= 'tags'></div>
        </div>
      </div>
      <div class="hot-article">
        <h4>热门文章</h4>
        <ul>
          <li v-for= '(item, index) in title' :key="index">
            <span class="idx">{{index + 1}}</span>
            <router-link :to=" '/detail/' + item._id"><span>{{item.title}}</span></router-link>
          </li>
        </ul>
      </div>
      <div class="recommend">
        <h4>置顶推荐</h4>
        <ul v-if= 'recommendTitle'>
          <li v-for= '(item, index) in recommendTitle' :key="index">
            <span class="idx">{{index + 1}}</span>
            <router-link :to=" '/detail/' + item._id">
              <span>{{item.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="visitor">
        <h4>最近访客</h4>
        <ul>
          <li v-for= 'item in visitors' :key="item.user.user">
            <a  :style= "{'background': 'url('+ item.user.photo +') center center/cover no-repeat'}"
            ><span>{{item.user.user}}</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import ArticleMain from '../articleMain/ArticleMain'
import {request} from '@/network/request';
//请求文章 通过limit,skip, 滚轮加载
import {requestArticle} from '@/network/request';

//将函数用一个变量保存起来,可以下次引用内部的变量
const requestArticleMore = requestArticle();

export default {
  //博客页面的主架构
  name: 'Contain',
  data() {
    return {
      //判断 搜索盒子 是否为fixed 制作停留事件
      isFixed: false,
      //搜素内容得显示
      searchListShow: false,
      searchList: [],
      tags: [],
      show: true,
      //搜索 值绑定
      keyWords: '',
      title: [],
      //初始序号为0 => 用于显示停留样式的
      stayIndex: 0,
      //组件创造出来时之后,初始值为 tags所停留的那个分类上 且滑块样式
      coverIndex: this.$route.params.id,
      //所有文章内容
      allContent: [],
      //页面加载内容 节流变量
      isCollection: {
        loading: false,
        noData: false,
      },
      visitors: []
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
    //用于监听 传入params参数的变化 /二级路由
    getId() {
      //真正改变 路由id 再改变值
      return this.$route.params.id;
    }
  },
  methods: {
    //关于tags 的样式
    titleLeave() {
      //鼠标移走 让所有样式 序号停留在当前 params id 的页面
      this.stayIndex = this.$route.params.id;
      //滑块样式
      // this.coverIndex = this.$route.params.id;
      // this.coverTop = 0;
      // console.log(this.coverIndex);
    },
    titleEnter(index) {
      // this.coverIndex = index;
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
    // ---------------网络请求-----------------------

    //监听滚轮事件,底部刷新---> 滚轮触发----> 请求文章的继续加载
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
    },
    //在id变化是请求数据时的 加载变化
    requestArticleFresh() {
      this.isCollection.loading = this.isCollection.noData = false;
      requestArticleMore(this.getId, false).then( res => {
        this.isCollection.noData = !res.data.data.length ? true : false;
        // console.log(res.data.data)
        this.allContent = res.data.data;
      } );
    },
    // 发送 搜素请求
    handleInput() {
      // console.log(666)
      this.searchListShow = true
      if(!this.keyWords.trim()) {
        this.$message({
          type: 'info',
          message: '请输入搜索内容!'
        });
        return
      }
      request({
        url: '/article/search',
        method: 'post',
        data: {
          key: this.keyWords
        }
      }).then((res) => {
        console.log(res);
        if(res.data.data.length) {
          this.searchList = res.data.data;
        }else {
          this.searchList = [{title:'没有查询数据'}];
          console.log(this.searchList)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    //请求页面文章tags
    requestTags() {
      request({
        url: '/article/pageInfo',
        method: 'post'
      }).then( ({data}) => {
        this.tags= data.data.tags || [];
        //console.log(this.tags);
      } )
      .catch( (err) => console.log(err) );
    },
    //请求热门文章标题
    requestArticleTitle() {
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
    //请求访客
    requestVisitor() {
      request({
        url: '/visitor',
        method: 'post',
      }).then(res => {
        // console.log(res)
        this.visitors = res.data.data;
        // console.log(this.visitors)

      }).catch((err) => {
        console.log(err);
      })
    }
  },
  //监听 二级路由的变化
  watch: {
    getId() {
      this.requestArticleFresh();
      this.show = false;
      setTimeout(() => {
        this.show = true;
      },50)
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    this.requestTags();
    this.requestArticleTitle();
    this.requestVisitor();
  },
  mounted() {
    // 固定栏的滚轮监听 -> 监听tags 栏的固定高度显示
    window.addEventListener( 'scroll', this.searchScorll );

    //监听滚轮刷新 -> 加载文章的滚轮事件
    window.addEventListener( 'scroll', this.freshScroll );

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
          .input-box {
            position: relative;
            z-index: 10;
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
          }
          >span {
            z-index: 10;
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
        .search-list {
          position: absolute;
          top: 57px;
          padding: 0px 20px;
          width: 100%;
          z-index: 1;
          ul.search-ul {
            padding: 25px;
            background-color: #fff;
            li {
              cursor: pointer;
              width: 100%;
              height: 40px;
              line-height: 40px;
              a {
                display: block;
                font-size: 14px;
                color: #999;;
                &:hover {
                  color: #000;
                }
              }
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
                width: 100%;
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