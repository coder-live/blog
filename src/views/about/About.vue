<template>
  <div class= 'about'>
    <HeadNav ref='nav'/>
    <div class="contain">
      <div class="svg"></div>
      <div class="about-me">
        <ul>
          <li class= 'about-item'>
            <div class="about-sth">
              <h4>关于我</h4>
              <p class= 'has-bottom'>毕业后在古都西安某个工厂装盒子，很迷茫。2015年离开西安到成都转行做开发，然沉迷撸码，日渐消瘦。</p>
              <p>可以通过以下方式联系到我：</p>
              <p>邮 箱 ：930054439@qq.com</p>
              <p>码 云 ：https://gitee.com/yssgit/events</p>
            </div>
          </li>
          
          
        </ul>
      </div>
    </div>
    <Footer/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'
import Footer from '@/components/content/footer/Footer'

export default {
  name: 'About',
  components: {
    HeadNav,
    Footer
  },
  mounted() {
    this.$refs.nav.currentIndex = 5;
  }
}
</script>

<style scoped lang= 'less'>
  .about {
    width: 100%;
    overflow: hidden;
    padding-bottom: 30px;
    .contain {
      width: 100%;
      margin-top: 50px;
      .svg {
        width: 100%;
        height: 250px;
        background: url('../../assets/image/2.jpg') no-repeat center center;
        background-size: 100%
      }
      .about-me {
        width: 90%;
        margin: 30px auto;
        background-color: #fff;
        ul .about-item {
          padding: 30px;
          h4 {
            position: relative;
            font-size: 20px;
            font-weight: 600;
            color: #333;
            margin-bottom: 20px;
            &::after {
              content: '';
              position: absolute;
              top: 0;
              left: -11px;
              width: 2px;
              height: 19px;
              background-color: #29b6f6;
            }
          }
          p {
            display: block;
            line-height: 1.5;
            font-size: 14px;
            font-weight: 200;
            &.has-bottom {
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>