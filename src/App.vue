<template>
  <div id="app">
    <keep-alive include='Home'><router-view/></keep-alive>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode';

  export default {
    name: 'App',
    created() {
      const token = window.localStorage.token;
      const newPhoto = window.localStorage.newPhoto;
      if( token ) {
        const hasToken = token ? true : false;
        //解密token
        const decode = jwtDecode(token);
        //异步改变vuex状态
        //console.log(hasToken,decode);
        this.$store.dispatch( 'saveLoginState', hasToken );
        this.$store.dispatch( 'saveToken', decode );
        this.$store.dispatch('upAvater', newPhoto);
      }
    }
  }
</script>

<style>
  @import './assets/css/base.css';
  @import './assets/css/font.css';
  #app {
    position: relative;
    width: 100%;
    background: url('./assets/image/cover/bgc.jpg') center top fixed;
    background-size: cover;
  }
</style>
