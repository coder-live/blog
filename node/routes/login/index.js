const express = require('express');
const router = express.Router();

const User = require('../../model/user/user');
const Visitor = require('../../model/visitor/visitor');

const jwt = require('jsonwebtoken');
const privateKey = require('../../config/db').secret

router.post('/', (req, res) => {
  const {user, pwd} = req.body;
  // console.log('服务器响应')
  if( !user || !pwd ) {
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
  User.findOne({user}).then( _user => {
    if(!_user) {
      res.json({
        code: 1,
        msg: '用户名不存在'
      }); 
      return
    }else {
      if( _user.pwd !== pwd ) {
        res.json({
          code: 2,
          msg: '密码错误'
        }); 
        return
      };
      
      //将登录用户信息存至 访客信息中
      Visitor.deleteMany({user: _user._id})
      .then(() => {
        Visitor.create({
          user: _user._id
        }).then(data => {
          res.sendStatus(200);
        }).catch(()=>{});
      })
      .catch(() => {
        res.sendStatus(500);
      });
      //密码正确 将这些信息存至 token中
      let rule = {
        id: _user._id,
        user: _user.user,
        photo: _user.photo,
        disabled: _user.disabled,
        admin: _user.admin
      };

      // //将用户存至session中
      // req.session.userInfo = rule;

      jwt.sign(rule, privateKey, { expiresIn: 60 * 60 }, function(err, token) {
        if(err) throw err
        res.json({
          code: 0,
          success: true,
          token: "Bearer " + token
        })
      });
    }
  } ).catch(err=> {
    res.json({
      code: 4,
      msg: '服务器错误'
    })
  });
  
})

module.exports = router