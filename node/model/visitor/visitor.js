const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitor = mongoose.model('visitor', new Schema({
  // content: {type: String, required: true},
  user: {//此时已经绑定了表, => populate 关联的名字 为user属性
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'user'
  },
  date: {type: Date, default: Date.now}
}));


module.exports = visitor ;