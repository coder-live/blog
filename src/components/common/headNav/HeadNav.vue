<template>
  <div class= 'head-nav'>
    <div class="fix-nav">
      <span class="log">Mr.Xy</span>
      <ul class="nav-list">
        <li v-for= '(item,index) in navList' 
        :class= '[{active: currentIndex == index},{active: hoverIndex == index}]'
        @mouseenter= 'navHover(index)'
        @mouseleave= 'navLeave(index)'>
          <router-link :to= 'item.path'> {{item.name}} </router-link>
        </li>
      </ul>
      <div class="register">
        <el-button type="primary" @click= 'registerTap'>注册</el-button>
      </div>
      <div class="login">
        <el-button type="primary" @click= 'loginTap'>登录</el-button>
      </div>
    </div>
    <RegisterBox :isShow= 'RegisterBoxVisible' 
    @finish= 'cancel' 
    v-if= 'RegisterBoxRealVisible'/>
  </div>
  
</template>

<script>
import LoginBox from '@/components/content/loginBox/LoginBox';
import RegisterBox from '@/components/content/registerBox/RegisterBox';
export default {
  name: 'HeadNav',
  data() {
    return {
      RegisterBoxRealVisible: true,
      // 注册弹窗
      RegisterBoxVisible: false,
      //弹窗的key值
      key: 0,
      navList: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '博客',
          path: '/article/0'
        },
        {
          name: '留言',
          path: '/message'
        },
        {
          name: '友链',
          path: '/friendLink'
        },
        {
          name: '关于',
          path: '/about'
        },
      ],
      currentIndex: -1,
      hoverIndex: -1,
    }
  },
  components: {
    LoginBox,
    RegisterBox
  },
  methods: {
    //登录注册事件
    registerTap() {
      this.RegisterBoxRealVisible = true;
      this.RegisterBoxVisible = true;
    },
    loginTap() {
      
    },
    //退出弹窗
    cancel() {
      this.RegisterBoxRealVisible = false;
      this.RegisterBoxVisible = false;
    },
    // navClick( index ) {
    //   this.currentIndex = index;
    //   //console.log( )
    // }
    navHover(index) {
      this.hoverIndex = index;
    },
    navLeave() {
      this.hoverIndex = this.currentIndex;
    }
  }
}
</script>

<style lang= 'less' scoped>
  .head-nav {
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 999;
    color: #222;
    background-color: #fff;
    >.fix-nav {
      position: relative;
      overflow: hidden;
      max-width: 1074px;
      height: 60px;
      margin: 0 auto;
      padding-right: 30px;
      >.log {
        margin-left: 20px;
        height: 60px;
        line-height: 60px;
        font-family: BarbaraHand;
        font-size: 35px;
      }
      >.nav-list {
        position: absolute;
        top: 0;
        right: 18%;
        width: 384px;
        display: flex;
        >.active > a {
          color: #6bc30d;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            height: 2px;
            width: 90%;
            background-color: red;
            transform: translateX(-47%);
          }
        }
        >li {
          flex: 1;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #222;
          >a {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            cursor: pointer;
            transition: .6s;
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              height: 2px;
              width: 0;
              background-color: red;
              transform: translateX(-47%);
              transition: all .6s;
            }
            &:hover::after {
              width: 90%;
            }
          }
        }
      }
      >.login, .register {
        float: right;
        width: 50px;
        height: 60px;
        margin: 0 7px;
        line-height: 60px;
        text-align: center;
        >.el-button  {
          padding: 12px;
        }
      }
    }
  }
</style>