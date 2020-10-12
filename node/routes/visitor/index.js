const express = require('express');
const router = express.Router();

const Visitor = require('../../model/visitor/visitor');

//访客 请求
router.post('/', (req, res) => {
  Visitor.find({}, {}, {skip: 0, limit: 12})
  .sort({'date': -1})
  .populate('user', {_id: 1, user: 1, photo: 1})
  .then( data => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误',
      data: []
    })
  })
})




module.exports = router