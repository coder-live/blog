const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//留言板块
const message = mongoose.model('message', new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  children: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
      content: {type: String, required: true},
      resName: {type: String, required: true},
      date: {type: Date, default: Date.now},
    }
  ],
}));

// for (let i = 0; i < 10; i++) {
//   message.create({
//     user: '5ed3a49d80a45821205692ce',
//     content: '<p>假假按揭哈哈哈乐乐乐</p><p>电脑版啦啦</p>',
//   })
  
// }

module.exports = message ;