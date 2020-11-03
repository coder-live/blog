<template>
  <div class='wrap'>
    <HeadNav ref='nav' />
    <div class="contain">
      <ul class="list">
        <li 
          v-for= '(item,index) in practiceList'
          :key="item.name+index"
          :class="{stay:mark===index}"
          @click="handleClick(item, index)"
        >
          <a :href="'http://121.199.3.135:80/games/' + item.src + '/index.html'" target="game">{{item.name}}</a>
        </li>
        <!-- <li><a href="http://121.199.3.135:80/games/Sokoban/index.html" target="game">推箱子</a></li>
        <li><a href="http://121.199.3.135:80/games/canvasGame/index.html" target="game">flappyBird</a></li>
        <li><a href="http://121.199.3.135:80/games/snake/index.html" target="game">贪吃蛇</a></li>
        <li><a href="http://121.199.3.135:80/games/3d/index.html" target="game">3d布局</a></li> -->
      </ul>
      <iframe 
        name="game"
        :src="'http://121.199.3.135:80/games/'+ getId +'/index.html'" frameborder="1"
      ></iframe>
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'

export default {
  name: 'Practice',
  data(){
    return {
      practiceList: [
        {src: 'Sokoban', name: '推箱子'},
        {src: 'flappyBird', name: 'flappyBird'},
        {src: 'planeWars', name: '飞机大战'},
        {src: 'greedySnake', name: '贪吃蛇'},
        {src: '3d', name: '3d布局'}
      ],
      mark: 0
    }
  },
  components:{
    HeadNav,
  },
  mounted() {
    this.$refs.nav.currentIndex = 6;
  },
  computed: {
    getId() {
      //真正改变 路由id 再改变值
      return this.$route.params.id;
    }
  },
  methods: {
    handleClick(item, index) {
      if(this.mark != index) {
        this.mark = index;
        this.$router.push('/practice/'+ item.src)
      }
    }
  }
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    color: #888;
  }
  .contain {
    display: flex;
    width: 90%;
    margin: 80px auto 0;
    background-color: #fff;
  }
  .list {
    list-style-type: none;
    border: 2px solid #999;
  }
  .list > li {
    height: 50px;
    line-height: 50px;
    border-bottom: 1.5px solid rgb(134, 132, 132);
    text-align: center;
  }
  li.stay {
    color: blue;
  }
  iframe {
    flex: 1;
    width: 70%;
    height: 600px;
  }
  a {
    display: block;
    text-decoration: none;
  }
  a:hover {
    color: blue;
  }
</style>