<template>
  <div class= 'friend-link'>
    <HeadNav ref='nav'/>
    <div class="contain">
      <div class="svg"></div>
      <div class="link">
        <div class="link-intro">
          <h3>链接申请说明</h3>
          <div class="des">
            <p class="care">新人出没, 正经即行</p>
            <p>交换友链可在留言板留言.本站链接如下：</p>
            <p>名称：萧逸</p>
            <p>网址：http://http://www.little-thinker.xyz</p>
            <p>图标：http://http://www.little-thinker.xyz/logo.png</p>
            <p>描述：萧逸. 只想安静的做个普通人</p>
            <p class="tip">申请一般都会通过, 新人 望多多关照!</p>
          </div>
        </div>
        
      </div>
      <div class="link-items">
        <ul>
          <li v-for='item in friendList' :key="item.title"><a target='_blank' :href="item.href">
            <div class="main">
              <div class="img"><img :src="item.icon" alt=""/></div>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="des">{{item.des}}</div>
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
import {request} from '@/network/request';

export default {
  name: 'FriendLink',
  data() {
    return {
      friendList: []
    }
  },
  components: {
    HeadNav,
    Footer
  },
  methods: {
    getFriends() {
      request({
        url: '/other/friends'
      }).then(res => {
        // console.log(res);
        if(res.data.code === 0) {
          this.friendList = res.data.data.length ? res.data.data : [];
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getFriends();
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
        background: url('../../assets/image/1.gif') no-repeat center center;
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
                  font-size: 16px;
                  font-weight: 500;
                  margin-left: 50px;
                  color: #444;
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