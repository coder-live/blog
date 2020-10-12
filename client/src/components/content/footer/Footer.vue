<template>
  <div class= 'footer'>
    <div class="foot-bottom">
      <p class="blog">2020 littleThinker Blog by 萧逸 Template source from 燕十三 备案号:
        <span class="num">浙ICP备20002521号-1.</span>
      </p>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang= 'less'>
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    width: 100%;
    margin-top: 30px;
    color: #999;
    background-color: #232328;
    .foot-bottom {
      width: 100%;
      padding: 10px 0;
      background-color: #222;
      p.blog {
        text-align: center;
        font-size: 13px;
        font-weight: 200;
        padding: 5px 20px;
        span.num {
          color: #fff;
          font-size: 14px;
          margin-left: 3px;
          font-weight: 300;
        }
      }
      
    }
  }
</style>