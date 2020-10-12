const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//留言板块
const comment = mongoose.model('comment', new Schema({
  
  article: {type: String, required: true},
  articleTitle: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  children: [
    {
      user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
      content: {type: String, required: true},
      resName: {type: String, required: true},
      date: {type: Date, default: Date.now}
    }
  ]
}));

module.exports = comment ;