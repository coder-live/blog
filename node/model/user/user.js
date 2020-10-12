const mongoose = require('mongoose');

const user = mongoose.model('user', new mongoose.Schema({
  // content: {type: String, required: true},
  user: {type: String, required: true},
  pwd: {type: String, required: true},
  //默认头像
  photo: {type: String, default: 'http://localhost:5002/image/defaultPhoto.png'},
  date: {type: Date, default: Date.now},
  //设置权限禁用
  disabled: {type: Boolean, default: false},
  //管理员设置
  admin: {type: Boolean, default: false}
}));

module.exports = user ;