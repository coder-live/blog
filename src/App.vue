<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
