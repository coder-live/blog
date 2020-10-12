const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//留言板块
const friends = mongoose.model('friends', new Schema({
  
  title: {type: String, required: true},
  des: {type: String, required: true},
  icon: {type: String, required: true},
  href: {type: String, required: true}
  
}));

// friends.create({
//   title: '燕十三',
//   des: '燕十三·一个人的江湖',
//   icon: 'https://www.yanshisan.cn/logo.png',
//   href: 'https://www.yanshisan.cn'
// })

module.exports = friends ;