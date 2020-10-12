<template>
  <div class= 'article'>
    <HeadNav ref='nav'/>
    <Contain/>
    <Footer/>
    <Up/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav';
import Up from '@/components/common/up/Up';

import Footer from '@/components/content/footer/Footer';
import Contain from '@/components/content/contain/Contain';
export default {
  name: 'Article',
  components: {
    HeadNav,
    Footer,
    Contain,
    Up
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
    padding-bottom: 60px;
    overflow: hidden;
  }
</style>