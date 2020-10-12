const express = require('express');
const router = express.Router();

const Comment = require('../../model/comment/comment');
const Article = require('../../model/article/article');
const User = require('../../model/user/user');
// 测试接口
// router.get('/get', (req, res) => {
//   res.send('你好')
// })
// 请求评论信息
router.post( '/', (req, res) => {
  let {artId, skip, limit} = req.body;
  // console.log(req.body)
  // console.log(1){skip, limit: 50, sort: {date: -1}}
  //先找到 => 根据该文章的id 找到 这些评论
  Comment.find({article : artId}, {}, {skip, limit} )
  .sort({"date": -1})
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
//提交评论
router.post( '/commit', (req, res) => {
  User.findOne({_id: req.body._id}, {disabled: 1})
  .then(data => {
    if(data.disabled) {
      res.json({
        code: 1,
        msg: '你已被禁言,请与管理员联系'
      });
      return
      
    }else {
      //提交 评论, 先传入 当前文章的id, 用户id
      let {artId, artTit, _id, content} = req.body;
      // console.log(222)
      if(!artId || !_id || !artTit || !content.trim()) {
        res.json({
          code:1,
          msg: '格式错误'
        })
        return
      }
      Comment.find({article: artId}).then(() => {
        Comment.create({
          article: artId,
          articleTitle: artTit,
          user: _id,
          content
        }).then( data => {
          // console.log(data)
          // Article.findOneAndUpdate({_id: artId}, {comment: data._id})
          // .then(()=>{}).catch(()=>{});
          Article.findOneAndUpdate({_id: artId}, {$inc: {comment: 1}})
          .then(()=>{}).catch(()=>{});
          res.json({
            code: 0,
            msg: '留言成功'
          });
        } )
      }).catch(()=>{})

    };

  }).catch( _ => {
    res.json({
      code: 4,
      msg: '服务器错误,稍后再试'
    })
  } );
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

//提交 回复评论信息, 会自动跟随评论的_id ,不用 文章的id
router.post('/resCommit', (req, res) => {//resName /回应的名字,不是评论的user name
  let { comId, userId, resName, content} = req.body;

  if( !comId || !userId || !resName || !content ) {
    res.json({
      code: 1,
      msg: '格式错误'
    });
    return
  }
  Comment.findById(comId).then(data => {
    if(!data) {
      res.json({
        code: 2,
        msg: '评论已删除'
      })
    }else {
      Comment.updateOne({_id: comId}, {$push: {'children': {user: userId, content, resName}}})
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