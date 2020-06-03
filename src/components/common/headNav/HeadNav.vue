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
      <div class="btn" v-if= '!userLoginState'>
        <div class="register">
          <el-button type="primary" @click= 'registerTap'>注册</el-button>
        </div>
        <div class="login">
          <el-button type="primary" @click= 'loginTap'>登录</el-button>
        </div>
      </div>
      <div class="logining" v-else= 'userLoginState'>
       
        <div class="btn">
          <el-dropdown trigger="hover" @command= 'hoverCommand'>
            <div class="el-dropdown-link">
              <div class="img">
                <img :src="userInfo.photo" alt=""/>
              </div>
              <div class="user-name">{{userInfo.user}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="user">修改头像</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </div>

    <RegisterBox v-if= 'registerBoxRealVisible' 
    :isShow= 'registerBoxVisible' 
    @finish= 'cancelRegister' @toLogin= 'handleLogin'/>

    <LoginBox v-if= 'loginBoxRealVisible'
    :isLoginShow= 'loginBoxVisible'
    @loginFinsh= 'cancelLogin'/>

    <UploadImg
    v-if= 'UploadRealVisible'
    :UploadShow= 'UploadVisible'
    @uploadFinsh= 'cancelUpload'
    />
  </div>
  
</template>

<script>
import LoginBox from '@/components/content/loginBox/LoginBox';
import RegisterBox from '@/components/content/registerBox/RegisterBox';
import UploadImg from '@/components/content/uploadImg/UploadImg';
export default {
  name: 'HeadNav',
  data() {
    return {
      //是否渲染
      registerBoxRealVisible: false,
      loginBoxRealVisible: false,
      UploadRealVisible: false,
      // 是否弹出弹窗
      registerBoxVisible: false,
      loginBoxVisible: false,
      UploadVisible: false,
      //是否注册
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
          name: '日记',
          path: '/diary'
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
    RegisterBox,
    UploadImg
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    userLoginState() {
      return this.$store.state.isLogin;
    },
    router() {
      return this.$route.path;
    }
  },
  // watch: {
  //   userInfo() {
  //     console.log(333)
  //   }
  // },
  methods: {
    // 头像事件
    hoverCommand( msg ) {
      if( msg === 'user' ) {
        //弹窗 上传图片
        // console.log(111)
        this.UploadVisible = true;
        this.UploadRealVisible = true;
      }else{
        window.localStorage.removeItem('token');
        this.$store.dispatch( 'clearMsg' );
        //console.log(2)
        this.$router.replace('/home');
      }
    },
    // 打开 注册事件
    registerTap() {
      this.registerBoxRealVisible = true;
      this.registerBoxVisible = true;
    },
    // 打开登录
    loginTap() {
      this.loginBoxRealVisible = true;
      this.loginBoxVisible = true;
    },
    // 注册成功跳转登录框
    handleLogin() {
      this.loginBoxRealVisible = true;
      this.loginBoxVisible = true;
    },
    //退出弹窗 注册成功
    cancelRegister() {
      this.registerBoxRealVisible = false;
      this.registerBoxVisible = false;
    },
    //登录 成功
    cancelLogin() {
      this.loginBoxRealVisible = false;
      this.loginBoxVisible = false;
      this.$router.replace(router);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000)
    },
    // 上传 图片成功
    cancelUpload() {
      this.UploadRealVisible = false;
      this.UploadVisible = false;
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
  },
  created() {
    // console.log(this.$route)
    // this.ifLogin = this.userLoginState;
    // console.log(this.ifLogin,typeof())
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
        padding-left: 15px;
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
      >.btn {
        position: absolute;
        top: 0;
        right: 0;
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
      >.logining {
        padding-right: 35px;
        position: absolute;
        top: 4px;
        right: 0;
        text-align: center;
        .el-dropdown {
          &:focus {
            outline: none;
          }
        }
        .img {
          width: 40px;
          height: 37px;
          overflow: hidden;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            transform: scale(1.35);
          }
        }
        .user-name {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #222;

        }    
      }
      
    }
  }
</style>