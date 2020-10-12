const express = require('express');
const router = express.Router();

const Article = require('../../model/article/article');
const ArticleInfo = require('../../model/articleInfo/articleInfo');



// router.get( '/getInfo', ( req,res ) => {
//   res.send('这是测试路由');
// } );

//请求 当前 tags 信息
router.post( '/pageInfo', ( req, res ) => {
  ArticleInfo.findOne( {}, {_id: 0, __v: 0} )
    .then((data) => {
      res.json({
        code: 0,
        msg: '请求成功',
        data
      })
    })
    .catch( (err) => {
      res.json({
        code: 4,
        msg: '服务器错误',
        data: null
      })
    } )
} );

//请求特定的文章内容 置于detail中
router.post('/definiteArticle', (req, res) => {
  let {id} = req.body;
  Article.findById(id)
  .then(data => {
    Article.findOneAndUpdate({_id: id}, {$inc: {pv: 1}})
    .then(()=>{}).catch(()=>{});
    res.json({
      code: 0,
      msg: '请求成功',
      data
    })
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误,请稍后再试~',
      data: []
    })
  })
})

//请求所有文章标题
router.post( '/title', (req, res) => {
  // console.log(req.body)
  let limit = req.body.limit || 8;
  Article.find({}, {__v: 0}, {skip: 0, limit})
  .sort( {pv: -1} )
  .then((data) => {
    res.json({
      code: 0,
      msg: '请求成功',
      data
    });
  })
  .catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误',
      data: null
    })
  });
} );

//查找 => 搜索
router.post('/search', (req, res) => {
  let {key} = req.body;
  if(!key) {
    res.json({
      code: 1,
      msg: '请输入搜索内容'
    });
    return
  }
  let reg = new RegExp(key.trim(), 'i');
  Article.find({
    $or: [
      {title: reg}, 
      {tag: reg}
    ]
  }, {title: 1, _id: 1}, {limit: 5})
  .sort({pv: -1})
  .then((data) => {
    // console.log(data)
    if(data.length) {
      res.json({
        code: 0,
        msg: '请求成功',
        data
      })
    }else {
      res.json({
        code: 1,
        msg: '数据不存在',
        data
      })
    }
  }).catch(() => {
    res.json({
      code: 4,
      msg: '服务器错误',
      data: []
    })
  })
})

//请求 页面不同tags 下的文章
router.post( '/allTags', (req, res) => {
  // console.log(req.body)
  let {skip, limit, tag} = req.body;
  let option = tag ? {tag} : {};
  // console.log(skip, limit, tag, option)
  Article.find( option, {__v: 0}, {skip,limit} )
  .sort( {pv: -1} )
  .then(( data ) => {
    // console.log(data)
    res.json({
      code: 0,
      msg: '请求成功',
      data
    });
  })
  .catch(err => {
    res.json({
      code: 4,
      msg: '服务器错误',
      data: null
    })
  })
} )

module.exports = router