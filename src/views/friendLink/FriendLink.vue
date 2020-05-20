<template>
  <div>
    <HeadNav ref='nav'/>

    
  </div>

</template>

<script>
import HeadNav from '@/components/common/headNav/HeadNav'

export default {
  name: 'FriendLink',
  components: {
    HeadNav
  },
  mounted() {
    this.$refs.nav.currentIndex = 3;
  }
}
</script>

<style scoped>
  
</style>