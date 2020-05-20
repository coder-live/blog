<template>
  <div class= 'article'>
    <HeadNav ref='nav'/>
    <Contain/>
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav';
import Contain from '@/components/content/contain/Contain';
export default {
  name: 'Article',
  components: {
    HeadNav,
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
    overflow: hidden;
  }
</style>