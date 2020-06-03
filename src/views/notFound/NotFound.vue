<template>
  <div class='not-found'>
    <img src="http://localhost:5002/img/noFound.gif" alt="">
    <div class="text">
      您搜索的内容不在此星球 
    </div>
    <el-button type="primary" round
    @click= 'handleClick'>回到主页</el-button>
  </div>

</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    handleClick() {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
  .not-found {
    width: 100%;
    height: 100vh;
    
  }
  img {
    width: 100%;
    height: 100%;
  }
  .text {
    position: absolute;
    bottom: 50px;
    left: 40%;
    width: 250px;
    letter-spacing: 2px;
    font-size: 20px;
    color: #61d5b2;
  }
  .el-button {
    position: absolute;
    bottom: 40px;
    left: 70%;
    color: #FFF;
    background-color: #61d5b2;
    border-color: #61d5b2;
  }
</style>