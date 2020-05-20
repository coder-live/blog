<template>
  <div>
    <HeadNav ref='nav'/>
    我是首页
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'

export default {
  name: 'Home',
  components: {
    HeadNav
  },
  mounted() {
    this.$refs.nav.currentIndex = 0;
    this.$refs.nav.hoverIndex = 0;
  }
}
</script>

<style scoped>
  
</style>