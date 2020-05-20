<template>
  <div>
    <HeadNav ref='nav'/>
    
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'

export default {
  name: 'Message',
  components: {
    HeadNav
  },
  mounted() {
    this.$refs.nav.currentIndex = 2;
  }
}
</script>

<style scoped>
  
</style>