<template>
  <div class= 'login-box'>
    <el-dialog 
      title="登录 :"
      :visible.sync="isLoginShow"
      width="50%"
      :modal-append-to-body= 'false'
      :before-close="handleClose">
      <el-form :model="loginData" 
      status-icon :rules= "loginRule" ref="loginForm" 
      label-width="100px" class="login-form">
        <el-form-item label= '用户名' prop= 'user'>
          <el-input v-model= 'loginData.user' placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label= '密码' prop= 'pwd'>
          <el-input v-model= 'loginData.pwd' show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class= 'btn'>
          <el-button @click="cancel()">取消</el-button>
          <el-button type="success" 
          @click= 'loginMsg("loginForm")'
          :disabled= 'loginBtnShow'>立即登录</el-button>
        </el-form-item>
       
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import jwtDecode from 'jwt-decode';

import {request} from '@/network/request';
export default {
  name: 'LoginBox',
  data() {
    let pwdRule= (rule, value, callback) => {
      if(value) {
        if(/^[\w<>,.!|?;:'"{}@#$%()\/\-\]\[\\]{8,20}$/.test(value)) {
          callback();
        }else {
          callback(new Error('8至20位,不允许出现奇怪的字符'));
        }
      }else {
        callback(new Error('请输入密码'));
      }
    }

    return {
      loginData: {
        user: '',
        pwd: '',
      },
      loginBtnShow: false,
      loginRule: {
        user: [
          //{ type: 'string', pattarn: /[]{2,8}/ }
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '2至8位', trigger: 'blur'}
        ],
        pwd: [
          {required: true, type: 'string', validator: pwdRule, trigger: ['blur', 'change']},
        ]
      }
    }
  },
  props: {
    isLoginShow: {
      type: Boolean,
      default() {
        return false
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
    //取消事件
    cancel() {//向父组件发送事件, 改变外界传入的值, 从而改变props值
      this.$emit('loginFinsh');
    },
    //登录操作
    loginMsg(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if(valid) {
          this.loginBtnShow = true;
          // console.log('登录ing');
          request({
            url: '/login',
            method: 'post',
            data: this.loginData
          }).then(res => {
            this.loginBtnShow = false;
            let code = res.data.code
            // console.log(res, code);
            switch(code) {
              case 0: 
                // console.log(1)
                this.$message({
                  type: 'success',
                  message: '登录成功'
                });
                const { token } = res.data;
                const hasToken = token ? true : false;
                //解密token
                const decode = jwtDecode(token);
                //异步改变vuex状态
                // //console.log(hasToken,decode);

                this.$store.dispatch( 'saveLoginState', hasToken );
                this.$store.dispatch( 'saveToken', decode );

                window.localStorage.setItem( 'token', token );
                // console.log( decode)
                this.cancel();
                break;
                
              case 1: 
                this.$message('用户名不存在, 请前往注册 !');
                this.cancel();
                break;
              case 2: 
                this.$message('密码错误, 请重新输入 !')
                break;
              case 3: 
                this.$message('请完善登录信息 !')
                break;
              case 4: 
                this.$message.error('服务器错误,请稍后再试');
                break;
            }
          }).catch(err => {
            this.loginBtnShow = false;
            console.log(err)
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

  },
  destroyed() {

  }
}
</script>

<style scoped lang= 'less'>
  .login-box {
    .el-dialog__body {
      >.login-form {
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
</style>