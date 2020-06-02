<template>
  <div class='upload-img'>
    <el-dialog 
      title="上传头像 :"
      :visible.sync="UploadShow"
      width="23%"
      :modal-append-to-body= 'false'
      :before-close="handleClose">
      
      <el-upload
        class="avatar-uploader"
        action="http://localhost:5002/upload/avatar"
        :show-file-list="false"
        :with-credentials ="true"
        :data= "getId"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>


    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'UploadImg',
  data() {
    return {
      imageUrl: '',
    }
  },
  props: {
    UploadShow: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    getId() {
      return {
        _id: this.$store.state.userInfo.id
      }
    }
  },
  methods: {
    //右上角关闭事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cancel();
        })
        .catch(_ => {});
    },
    cancel() {//向父组件发送事件, 改变外界传入的值, 从而改变props值
      this.$emit('uploadFinsh');
    },
    handleAvatarSuccess(res, file) {//file为 头像上传成功返回的数据
      console.log(file.response);
      let imgUrl = file.response.data;
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(imgUrl)
      //更改 vuex中的用户头像
      this.$store.dispatch('upAvater', imgUrl);
      setTimeout(() => {
        console.log(1)
        this.cancel();
      }, 50)
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      //检测 图片类型 是否为jpeg\png\gif 
      const isJPG = /^(image\/jpeg|image\/png|image\/gif)$/i.test(file.type);
      const isLt50K = file.size / 1024 < 50;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG, PNG, GIF 格式!');
      }
      if (!isLt50K) {
        this.$message.error('上传头像图片大小不能超过 50K!');
      }
      return isJPG && isLt50K;
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>