<template>
  <div class= 'register-box'>
    <el-form :model= 'registerData' 
    label-width="100px" 
    :rules= 'registerRule'
    class= 'register-form'
    ref= 'registerBox'>
      <el-form-item label= '用户名' prop= 'user'>
        <el-input v-model= 'registerData.user' placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label= '密码' prop= 'pwd'>
        <el-input v-model= 'registerData.pwd' show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label= '确认密码' prop= 'pwds'>
        <el-input v-model= 'registerData.pwds' show-password placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item label= '验证码' class= 'code' prop= 'code'>
        <el-input v-model= 'registerData.code'></el-input>
        <div class='svg' v-html= 'svgCode'></div>
        <el-link type="primary" 
        :disabled= 'refresh.disable' 
        class='refresh' @click= 'getCode'
        v-html= 'refresh.text'></el-link>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class= 'submit'>立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import {requestCode} from '@/network/request'
export default {
  name: 'RegisterBox',
  data() {
    let password = (rule, value, callback) => {
      if(value) {
        if(/^[\w<>,.!|?;:'"{}@#$%()\/\-\]\[\\]{8,20}$/.test(value)) {
          callback();
        }else {
          callback(new Error('8至20位,不允许出现奇怪的字符'));
        }
      }else {
        callback(new Error('请输入密码'));
      }
      this.registerData.pwds && this.$refs.registerBox.validateField('pwds');
    }
    let checkPwd = (rule, value, callback) => {
      if(value) {
        if (value !== this.registerData.pwd) {
          // console.log(value,this.registerData.pwd)
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }else {
        callback(new Error('请再次确认密码'));
      }
    };
    return {
      registerData: {
        user: '',
        pwd: '',
        pwds: '',
        code: '',
      },
      registerRule: {
        user: [
          //{ type: 'string', pattarn: /[]{2,8}/ }
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '2至8位', trigger: 'blur'}
        ],
        pwd: [
          {required: true, type: 'string', validator: password, trigger: ['blur', 'change']},
        ],
        pwds: [
          {required: true, validator: checkPwd, trigger: ['blur', 'change']}
        ],
        code: [{
          validator: (rule, value, cb) => {
            console.log(value)
            if(!value) {
              cb(new Error('请输入验证码'));
            }else{
              //请求验证 验证码
              requestCode({
                method: 'post',
                url: '/register/checkCode',
                data: {code: value}
              }).then( res => {
                console.log(res)
                if(res.data.code === 0) {
                  cb();
                }else {
                  cb(new Error('验证码错误'))
                }
              } ).catch( () => {cb(new Error('未知错误'))} )
            }
          },
          required: true, 
          trigger: ['blur', 'change']
        }]
      },
      svgCode: 'loading ...',
      refresh: {
        disable: false,
        time: null,
        text: '刷新'
      }
    }
  },
  methods: {
    //请求svg 验证码
    getCode() {
      requestCode({
        method: 'post',
        url: '/register/getCode'
      }).then( res => {

        //设置倒计时的初始时间
        let t = 0;
        //无论如何,先给验证码的svg图片
        this.svgCode = res.data.data;

        //设置定时器 ,倒计时
        this.refresh.time = setInterval(() => {
          t += 1000;
          if( res.data.time < t ) {
            clearTimeout(this.refresh.time);
            this.refresh.disable = false;
            this.refresh.text = '刷新'
          }else {
            this.refresh.disable = true;
            this.refresh.text = ((res.data.time - t)/1000 |0)  + 's后可以刷新'
          }
        }, 1000);
        console.log(res.data.data);
        
      }).catch(err=>console.log(err))
    }
  },
  mounted() {
    this.getCode();
  },
  destroyed() {
    clearTimeout(this.refresh.time);
  }

}
</script>

<style scoped lang= 'less'>
  .register-box {
    >.register-form {
      padding-right: 20px;
      >.code {
        position: relative;
        width: 180px;
        height: 40px;
        /deep/.svg {
          position: absolute;
          top: 0;
          right: -100px;
          width: 80px;
          height: 40px;
          /deep/svg {
            width: 100%;
            height: 100%;
          }
        }
        /deep/.refresh {
          position: absolute;
          top: 60px;
          right: -160px;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          cursor: pointer;
          z-index: 2;
          
          &:hover {
            opacity: .8;
          }
        }
      }
      >.submit {
        width: 114px;
      }
    }
  }
</style>