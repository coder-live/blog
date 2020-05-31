<template>
  <div class='lay-edit'>
    <textarea id="demo" style="display: none;"></textarea>
    <button class="layui-btn" @click='handleclick'>提交留言</button>
  </div>

</template>

<script>
export default {
  name: 'LayEdit',
  data() {
    return {
      layedit: '',
      layIndex: 0
    }
  },
  methods: {
    handleclick() {
      let val = this.layedit.getContent(this.layIndex);
      // console.log(val)
      this.$emit('sub', val);
    }
  },
  mounted() {
    layui.use('layedit', () => {
      // console.log(this.layediter)
      this.layedit = layui.layedit;
      this.layIndex = this.layedit.build('demo',{
        tool: ['face'],
        height: 150
      }); //建立编辑器
    });
  }
}
</script>

<style scoped>
  .lay-edit {
    padding: 20px 15px;
    background-color: #fff;
  }
  .layui-btn {
    margin-top: 20px;
  }
  
</style>