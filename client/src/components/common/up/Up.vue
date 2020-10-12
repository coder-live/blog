<template>
  <div class='toTop'>
    <el-backtop>
      <div class="img"></div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: 'ToTop',
}
</script>

<style lang='less' scoped>
  .toTop {
    .el-backtop {
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
        background: url('../../../assets/image/arrow.png') no-repeat;
        background-position: 2px 0px;
        background-size: 165px;
      }
      
    }
  }
  
</style>