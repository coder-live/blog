const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//留言板块
const diary = mongoose.model('diary', new Schema({
  
  content: {type: String, required: true},
  img: {type: String},
  date: {type: Date, default: Date.now},


}));

// diary.create({
//   content: '正午,终于拿到"新的电脑",装了固态后发现以前真的是苦了自己啊,我又回来了,my blog.',
//   img: 'http://localhost:5002/image/files/2.JPG'
//   // 2020:6:7 12:33
// })

module.exports = diary ;