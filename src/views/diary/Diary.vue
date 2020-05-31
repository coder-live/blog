<template>
  <div class= 'diary'>
    <HeadNav ref='nav'/>
    <div class="session">
      <div class="block">
        <el-timeline>

          <el-timeline-item 
          class= 'item'
          type= 'primary'
          timestamp="2018/4/12" 
          placement="top">
          
            <el-card class= 'item-content'>
              <h4>更新 Github 模板</h4>
              <div class="img">
                <img src="../../assets/image/1.jpg" alt=""/>
              </div>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>

        </el-timeline>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>
//后台请求数据  标题\ 内容\ 提交时间\ 图片地址\ 
import HeadNav from '@/components/common/headNav/HeadNav';
import Footer from '@/components/content/footer/Footer';
import {request} from '@/network/request';
export default {
  name: 'Diary',
  data() {
    return {
      diaryMsg: []
    }
  },
  components: {
    HeadNav,
    Footer
  },
  mounted() {
    this.$refs.nav.currentIndex = 3;
  }
}
</script>

<style scoped lang= 'less'>
  .diary {
    overflow: hidden;
    width: 100%;
  }
  .session {
    width: 90%;
    margin: 80px auto;
    padding: 30px 100px 30px 150px;
    background-color: #fff;
    height: 1000px;
    .block {
      /deep/.item {
        padding-bottom: 50px;
        .el-timeline-item__timestamp {
          position: relative;
          left: -140px;
          font-size: 16px;
          letter-spacing: 1.5px;
        }
        .item-content {
          margin-top: 30px;
          background-color: #444;
          color: #fff;
          h4 {
            font-size: 18px;
            font-weight: 500;
            margin: 10px 0;
          }
          .img {
            width: 100%;
            margin: 10px 0;
            img {
              width: 100%;
            }
          }
          p {
            padding: 10px 0;
            font-size: 14px;
            font-weight: 300;
          }
        }
      }
      
    }
  }
</style>