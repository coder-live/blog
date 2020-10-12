//passport  验证 token的信息
// 总得是做来认证身份的所以只有 user需要登录之后才能进行的操作指令
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//引入mongoose 的model
const mongoose = require('mongoose');
//找到user的那个模块
const User = mongoose.model("user");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

//导出箭头函数 ,passport作为形参  由执行函数传参
module.exports = passport =>{
  //console.log(123)
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //console.log(456)
    //console.log(jwt_payload);
    User.findById(jwt_payload.id).then(user=>{
      if (user){
        return done(null, user);
      }
      return done(null, false);
    }).catch(err=>{
      console.log(err);
    });
      // User.findOne({id: jwt_payload.sub}, function(err, user) {
      //     if (err) {
      //         return done(err, false);
      //     }
      //     if (user) {
      //         return done(null, user);
      //     } else {
      //         return done(null, false);
      //         // or you could create a new account
      //     }
      // });
  }));

}