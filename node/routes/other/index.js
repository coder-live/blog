const express = require('express');
const router = express.Router();

const Diary = require('../../model/diary/diary');
const Friends = require('../../model/friend/friend');

// router.get('/', () => {
//   res.send('测试')
// })

router.get('/diary', (req, res) => {
  Diary.find({}, {_id: 0, __v: 0}).sort({date: -1})
  .then(data => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    })
  }).catch(()=> {
    res.json({
      code: 4,
      msg: '服务器错误,稍后再试',
      data: []
    })
  })
})
router.get('/friends', (req, res) => {
  Friends.find({}, {_id: 0, __v: 0}).then(data => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    })
  }).catch(()=> {
    res.json({
      code: 4,
      msg: '服务器错误,稍后再试',
      data: []
    })
  })
})



module.exports = router