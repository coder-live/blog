const express = require('express');
const router = express.Router();

const Message = require('../../model/message/message');
const User = require('../../model/user/user');
// 测试接口
// router.get('/get', (req, res) => {
//   res.send('你好')
// })
// 请求留言信息
router.post( '/', (req, res) => {
  let {skip, limit} = req.body;
  // console.log(1){skip, limit: 50, sort: {date: -1}}
  Message.find({}, {}, {skip, limit} ).sort({"date": -1})
  .populate('user',{_id: 1, user: 1, photo: 1})
  .populate('children.user', {_id: 1, user: 1, photo: 1})
    .then(data => {
      if(data) {
        res.json({
          code: 0,
          msg: '请求成功',
          data
        })
      }else {
        res.json({
          code: 1,
          msg: '无评论',
          data
        })
      }
    })
    .catch(() => {
      res.json({
        code: 4,
        msg: '服务器出错~请稍后再试',
        data: []
      })
    })
} )
//提交留言
router.post( '/commit', (req, res) => {
  User.findOne({_id: req.body._id}, {disabled: 1}).then(data => {
    // console.log(data);
    if(data.disabled) {
      res.json({
        code: 1,
        msg: '你已被禁言,请与管理员联系'
      });
      return
    }else {
      let {_id, content} = req.body;
      // console.log(222)
      if(!_id || !content.trim()) {
        res.json({
          code:1,
          msg: '格式错误'
        })
        return
      }
      Message.create({
        user: _id,
        content
      }).then( _ => {
        res.json({
          code: 0,
          msg: '留言成功'
        });
      } ).catch(()=>{});

    }
  }).catch( _ => {
    res.json({
      code: 4,
      msg: '服务器错误,稍后再试'
    });

  } )
  // let disabled = req.session.userInfo ? (req.session.userInfo.disabled === true) : '';
  // if(disabled) {
  //   res.json({
  //     code: 1,
  //     msg: '你已被禁言,请与管理员联系'
  //   });
  //   return
  // }
  // console.log(2222222)
  
} )

router.post('/resCommit', (req, res) => {//resName /回应的名字,不是评论的user name
  let { comId, userId, resName, content} = req.body;

  if( !comId || !userId || !resName || !content ) {
    res.json({
      code: 1,
      msg: '格式错误'
    });
    return
  }
  Message.findById(comId).then(data => {
    if(!data) {
      res.json({
        code: 2,
        msg: '评论已删除'
      })
    }else {
      Message.updateOne({_id: comId}, {$push: {'children': {user: userId, content, resName}}})
      .then(() => {
        res.json({
          code: 0,
          msg: '回复成功'
        })
      })
    }
  }).catch(err => {
    console.log(err)
    res.json({
      code: 4,
      msg: '服务器错误'
    })
  })


})

module.exports = router