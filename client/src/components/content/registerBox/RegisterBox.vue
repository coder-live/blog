<template>
  <div class= 'register-box'>
  
    <el-dialog 
      title="注册 :"
      :visible.sync="isShow"
      width="50%"
      :modal-append-to-body= 'false'
      :before-close="handleClose">
      <el-form :model="registerData" 
      status-icon :rules= "registerRule" ref="registerForm" 
      label-width="100px" class="register-form">
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
        <el-form-item class= 'btn'>
          <el-button @click="cancel()">取消</el-button>
          <el-button type="success" 
          @click= 'submitMsg("registerForm")'
          :disabled= 'registerBtnShow'>立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>
<script>

import {request} from '@/network/request'

export default {
  name: 'RegisterBox',
  data() {
    // 密码规则,结合validator
    let password = (rule, value, callback) => {
      if(value) {
        if(/^[\w<>,.!|?;:'"{}@#$%()\/\-\]\[\\]{6,20}$/.test(value)) {
          callback();
        }else {
          callback(new Error('6至20位,不允许出现奇怪的字符'));
        }
      }else {
        callback(new Error('请输入密码'));
      }
      //当第二次输入密码时 , 调用 验证方法(参数) => 第二次密码绑定的值
      this.registerData.pwds && this.$refs.registerForm.validateField('pwds');
    };
    // 验证密码规则
    let checkPwd = (rule, value, callback) => {
      if(value) {
        if (value !== this.registerData.pwd) {
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
      //设置 注册按钮的隐藏 ,防止多次数据请求
      registerBtnShow: false,
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
            if(!value) {
              cb(new Error('请输入验证码'));
            }else{
              //请求验证 验证码
              request({
                method: 'post',
                url: '/register/checkCode',
                data: {code: value}
              }).then( res => {
                if(res.data.code === 0) {
                  console.log('验证码正确')
                  cb();
                }else {
                  cb(new Error('验证码错误'))
                }
              } ).catch( () => {cb(new Error('未知错误'))} )
            }
          },
          required: true, 
          trigger: ['blur']
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
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    },
  },

  methods: {
    //弹窗右上角事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.cancel()
        })
        .catch(_ => {});
    },
    //取消事件
    cancel() {
      this.$emit('finish');
    },
    //请求svg 验证码
    getCode() {
      request({
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
        
      }).catch(err=>console.log(err))
    },
    //提交信息 注册
    submitMsg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerBtnShow = true;
          request({
            method: 'post',
            url: '/register',
            data: this.registerData
          }).then(res => {
            this.registerBtnShow = false;
            this.$emit('toLogin')
            switch (res.data.code) {
              case 0:
                this.$message({
                  message: '注册成功,请前往登录 !',
                  type: 'success'
                })
                this.cancel();
                break;
              case 1:
                this.$message('用户名重复');
                break;
              case 3:
                this.$message('请完善注册信息!');
                break;
              case 4:
                this.$message.error('服务器错误,请稍后再试');
                break;
            };
          }).catch(err => {
            this.registerBtnShow = false;
            return this.$message.error('服务器错误,请稍后再试');
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    
  },
  mounted() {
    //组件绑定后,执行 验证码请求
    this.getCode();
  },
  destroyed() {
    //组件销毁后,定时器关闭
    clearTimeout(this.refresh.time);
    // console.log('组件销毁')
  }

}
</script>

<style scoped lang= 'less'>
  .register-box {
    .el-dialog__body {
      >.register-form {
        padding-right: 20px;
        /deep/ .code {
          position: relative;
          width: 180px;
          height: 40px;
          /deep/ .svg {
            position: absolute;
            top: -5px;
            right: -120px;
            width: 80px;
            height: 40px;
            /deep/ svg {
              width: 100%;
              height: 100%;
            }
          }
          /deep/.refresh {
            position: absolute;
            top: 0px;
            right: -282px;
            height: 40px;
            line-height: 40px;
            letter-spacing: 2px;
            padding: 0 10px;
            cursor: pointer;
            z-index: 2;
            
            &:hover {
              opacity: .8;
            }
          }
        }
        >.btn > .el-button--success {
          margin-left: 50px;
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    .register-box {
      /deep/.el-dialog__wrapper {
        .el-dialog {
          width: 92%!important;
        }
      }
    }
  }
</style>