const express = require('express');
const router = express.Router();

const svgCaptcha = require('svg-captcha');
const User = require('../../model/user/user');


//生成新的 验证码
router.post( '/getCode', (req, res) => {

  // console.log(req.session.registerCodeTime)
  if(req.session.registerCodeTime) {
    let time_ = new Date() - new Date(req.session.registerCodeTime);
    if( time_ < 60000) {
      res.json({
        code: 2,
        msg: '操作过于频繁,请稍后再试',
        data: req.session.registerSvg,
        time: 60000 - time_
      });
      return
    }
  }

  let captcha = svgCaptcha.create();
  //console.log(captcha);

  //答案储存于session中(数据库中)
  req.session.registerCode = captcha.text;
  req.session.registerSvg = captcha.data;
  req.session.registerCodeTime = new Date();

  res.json({
    code: 0,
    msg: '请求成功',
    data: captcha.data,
    time: 60000
  })
} )

//验证 验证码接口
router.post( '/checkCode', (req, res) => {
  //传入 前端输入的验证码 进行对比
  let code = req.body.code;
  // console.log(code)
  //进行验证码 对比的英文大小 不区分大小写,  并返回 正确/错误
  if( code.toLocaleLowerCase() === req.session.registerCode.toLocaleLowerCase() ) {
    res.json({
      code: 0,
      msg: '验证成功',
    })
  }else {
    res.json({
      code: 4,
      msg: '验证失败',
    })
  }
} );

//注册接口
router.post( '/', (req, res) => {
  // console.log(req.body)
  let {user, pwd, pwds, code} = req.body;

  //后台重新验证  前端数据 ----- 
  if( !user || !pwd || !code ) {
    return res.json({
      code: 3,
      msg: '请输入完整信息'
    });
  }
  if(!( /^[\w<>,.!|?;:'"{}@#$%()\/\-\]\[\\]{6,20}$/.test(pwd) )) {
    return res.json({
      code: 3,
      msg: '密码格式不符合规则'
    });
  }
  if( pwd !== pwds ) {
    return res.json({
      code: 3,
      msg: '两次密码不一致'
    });
  }
  if( code.toLocaleLowerCase() !== req.session.registerCode.toLocaleLowerCase() ) {
    return res.json({
      code: 3,
      msg: '验证码错误'
    });
  };
  
  //验证 用户名字是否重复
  User.findOne({user}).then((data) => {
    if(data) {
      res.json({
        code: 1,
        msg: '用户名重复'
      })
    }else{
      User.create({user, pwd}).then(() => {
        res.json({
          code: 0,
          msg: '注册成功'
        })
      }).catch(() => {
        res.json({
          code: 4,
          msg: '注册失败'
        })
      })
    }
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误',
    })
  })


  
} )

module.exports = router