<template>
  <div class= 'article'>
    <HeadNav ref='nav'/>
    <Contain/>
    <Footer/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav';
import Footer from '@/components/content/footer/Footer';
import Contain from '@/components/content/contain/Contain';
export default {
  name: 'Article',
  components: {
    HeadNav,
    Footer,
    Contain
  },
  mounted() {
    this.$refs.nav.currentIndex = 1;
    this.$refs.nav.hoverIndex = 1;
  }
}
</script>

<style lang= 'less' scoped>
  .article {
    position: relative;
    width: 100%;
    padding-bottom: 30px;
    overflow: hidden;
  }
</style>