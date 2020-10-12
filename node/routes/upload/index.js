const express = require('express');
const path = require('path');
const router = express.Router();

const User = require('../../model/user/user');

let multer  = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/upload/avatar'))
  },
  //用于更改 文件格式
  filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + /\.(jpg|png|jpeg|gif)$/i.exec(file.originalname)[0])
  }
});

let upload = multer({ storage }).single('file');

router.post('/avatar', (req, res) => {
  upload(req, res, function (err) {
    
    if (err instanceof multer.MulterError) {
      res.sendStatus(500);
      return
      //  上传时发生Multer错误。
    } else if (err) {
      // 上传时发生未知错误。
      res.sendStatus(500);
      return
    }
    // Everything went fine.

    // console.log(req.file);
    let {_id} = req.body
    // console.log(_id)
    // 更改用户的头像
    User.updateOne({_id}, {photo : 'http://localhost:5002/upload/avatar/' + req.file.filename})
    .then(user => {
      res.sendStatus(200);
    }).catch(() => {
      res.sendStatus(500);
      return
    })
    
    res.status(200).json({
      code: 1,
      msg: '成功',
      data: 'http://localhost:5002/upload/avatar/' + req.file.filename
    });
  })
});

module.exports = router