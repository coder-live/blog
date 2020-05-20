<template>
  <div>
    <HeadNav ref='nav'/>
    
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'

export default {
  name: 'About',
  components: {
    HeadNav
  },
  mounted() {
    this.$refs.nav.currentIndex = 4;
  }
}
</script>

<style scoped>
  
</style>