<template>
  <div class= 'friend-link'>
    <HeadNav ref='nav'/>
    <div class="contain">
      <div class="svg"></div>
      <div class="link">
        <div class="link-intro">
          <h3>链接申请说明</h3>
          <div class="des">
            <p class="care"><i>经常宕机</i>  <i>不合法规</i><i>经常宕机</i><i>插边球站</i><i>原创优先</i><i>技术优先</i></p>
            <p>交换友链可在留言板留言.本站链接如下：</p>
            <p>名称：燕十三</p>
            <p>网址：https://www.yanshisan.cn</p>
            <p>图标：https://www.yanshisan.cn/logo.png</p>
            <p>描述：燕十三·一个人的江湖</p>
            <p class="tip">申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
          </div>
        </div>
        
      </div>
      <div class="link-items">
        <ul>
          <li><a href="">
            <div class="main">
              <div class="img"><img src="../../assets/image/3.png" alt=""/></div>
              <span class="title">网址标题</span>
            </div>
            <div class="des">燕十三燕十三·一个人的江湖燕十三·一个人的江湖·一个人的江湖</div>
          </a></li>
         
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
  name: 'FriendLink',
  components: {
    HeadNav,
    Footer
  },
  mounted() {
    this.$refs.nav.currentIndex = 4;
  }
}
</script>

<style scoped lang= 'less'>
  .friend-link {
    width: 100%;
    overflow: hidden;
    padding-bottom: 30px;
    .contain {
      margin-top: 50px;
      width: 100%;
      .svg {
        width: 100%;
        height: 250px;
        background: url('../../assets/image/2.jpg') no-repeat center center;
        background-size: 100%
      }
      .link {
        width: 90%;
        margin: 30px auto;
        padding: 30px;
        background-color: #fff;
        h3 {
          font-weight: 600;
          margin-bottom: 20px;
        }
        .des {
          line-height: 1.5;
          font-size: 14px;
          font-weight: 400;
          .care, .tip {
            margin: 20px 0;
          }
        }
      }
      .link-items {
        width: 90%;
        margin: 30px auto;
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content : space-between;
          li {
            width: 48%; 
            height: 174px;
            background-color: #fff;
            transition: .3s;
            &:hover {
              box-shadow: 1px 1px 5px #eee;
              -webkit-transform: translate3d(0,-3px,0);
              transform: translate3d(0,-2px,0);
            }
            a {
              display: block;
              width: 100%;
              height: 100%;
              line-height: 1.5;
              padding: 10px 30px;
              .main {
                position: relative;
                height: 70px;
                line-height: 70px;
                .img {
                  display: inline-block;
                  vertical-align: middle;
                  top: 0;
                  left: 0;
                  width: 40px;
                  height: 40px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .title {
                  font-size: 18px;
                  font-weight: 500;
                  margin-left: 50px;
                }
              }
              .des {
                margin-top: 15px;
                font-size: 14px;
                color: #555;
                font-weight: 350;
                line-height: 1.5;
              }
            }
          }
        }
      }
    }
  }
  
</style>