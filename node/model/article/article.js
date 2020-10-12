const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleInfo = require('../articleInfo/articleInfo')

let articleSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: String, required: true },
  
  surface: { type: String, default: 'http://localhost:5002/image/defaultImg.jpg' },
  pv: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  //嫌麻烦改了,就直接用累计
  comment: { type: Number, default: 0}
});

// articleSchema.pre('save', function(next){
//   console,log('11');
//   // next();
// });

let article = mongoose.model('article', articleSchema);


// for (let i = 0; i < 100; i++) {
//   article.create({
//     type: ['原创', '转载'][ (Math.random() * 2) |0 ],
//     title: `第${i}篇文章`,
//     content: ('' +i + '文章内容就啥都好说').repeat(10),
//     tag: ['个人日记', 'HTML5&CSS3', 'Javascript', '其它'][ (Math.random() * 3) |0 ],
//     pv: (Math.random() * 100) |0 ,
//     // comment: 0
//   })
// }

module.exports = article;