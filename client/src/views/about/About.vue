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
              <p class= 'has-bottom'>毕业于2020年, 自己选择了前端这条路, 那就要走下去</p>
              <p>知晓我的途径：</p>
              <p>邮 箱 ：1696698061@qq.com</p>
              <p>Github ：<a href='https://github.com/coder-live'>点击此处</a></p>
            </div>
          </li>
          <li class= 'about-item'>
            <div class="about-sth">
              <h4>关于本博客</h4>
              <p class= 'has-bottom'>目前初步完结于2020年6月5日。</p>
              <p>博客内容及结构：</p>
              <!-- <p>博客的完成归于 燕十三(模板来源) 及 阿飞老师。</p> -->
              <p>前 端: vue框架, 结合element-ui 和 lay-ui(富文本编辑器)。</p>
              <p>后 端: express框架 结合 mongoose数据库管理</p>
              <p>本站储存: 阿里云提供的服务器ESC。</p>
            </div>
          </li>
          <li class= 'about-item'>
            <div class="about-sth">
              <h4>关于其他说明</h4>
              <p class= 'has-bottom'>初次搭建博客, 有问题, 请私信。</p>
              <!-- <p>博客主要还是写着玩的, 博主目前还只是位前端小萌新, 请各位多多关照啦 !</p> -->
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
    color: #666;
    .contain {
      width: 100%;
      margin-top: 50px;
      .svg {
        width: 100%;
        height: 250px;
        background: url('../../assets/image/1.gif') no-repeat center center;
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
            margin-top: 10px;
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