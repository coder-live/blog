const express = require('express');
const app = new express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');
const port = process.env.PORT || 5002;

//mogoose连接
mongoose.connect( `mongodb://localhost:27017/blog`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => { console.log('连接成功') } )
  .catch( err => { console.log('连接失败') } );

//配置bodyParser 用于post请求
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
//配置静态资源
app.use(express.static('public'));

//配置cookie
app.use(cookieParser());

//配置session
app.use(session({
  secret: 'xiaoyi',
  cookie: {maxAge:10*60*1000},
  rolling: true,
  resave: false,
  saveUninitialized: false,
  //将session储存到数据库中
  store: new MongoStore({
    url: 'mongodb://localhost:27017/blog'
  })
}))

//后端配置可跨域
app.use((req,res,next) => {
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    'Content-Type': 'application/json; charset= utf-8'
  });
  //请求方法为option 时,需要传个200,才能执行下一步
  if(req.method === 'OPTIONS') {
    res.sendStatus(200);
  }else{
    next();
  }
})

app.get( '/', (req, res) => {
  res.send('首页')
} )

app.use( '/', routes )

app.listen( port, () => { console.log(port, process.env.PORT) } );