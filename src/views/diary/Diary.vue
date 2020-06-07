<template>
  <div class= 'diary'>
    <HeadNav ref='nav'/>
    <div class="session">
      <div class="block">
        <el-timeline>

          <el-timeline-item 
          v-for= 'item in diaryMsg'
          :key="item.date"
          class= 'item'
          type= 'primary'
          :timestamp="item.date | getOrTime" 
          placement="top">
          
            <el-card class= 'item-content'>
              <h4>{{item.content}}</h4>
              <div class="img">
                <img :src="item.img" alt=""/>
              </div>
              <p>提交于 {{item.date | getWholeTime}} </p>
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
import {getTime} from '@/assets/js'
// console.log(getTime)
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
  methods: {
    getDairy() {
      request({
        url: '/other/dairy',
        method: 'get'
      }).then(res => {
        // console.log(res);
        if(res.data.code === 0) {
          this.diaryMsg = res.data.data.length ? res.data.data : [];
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
  filters: {
    getWholeTime(t) {
      // return getTime(t, true);
      return getTime(t, true);
    }, 
    getOrTime(t) {
      // return getTime(t, true);
      return getTime(t);
    } 
  },
  created() {
    this.getDairy();
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
            font-size: 14px;
            font-weight: 200;
            opacity: .9;
            line-height: 1.5;
            letter-spacing: 1px;
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