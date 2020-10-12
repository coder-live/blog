const mongoose = require('mongoose');

//articleInfo 用于渲染博客页面数据, 
// 若是遍历所有article中的数据 ,性能差,不必要
let articleInfo = mongoose.model('articleInfo', new mongoose.Schema({
  tags: [String],
  articleNum: Number
}));

// articleInfo.create({
//   tags: ['全部文章', 'HTML5&CSS3', 'Javascript', 'vue&node', '服务器配置', '个人笔记', '其它'],
//   articleNum: 0
// })

module.exports = articleInfo;