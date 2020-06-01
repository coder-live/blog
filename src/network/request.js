import axios from 'axios';

import {Loading,Message} from 'element-ui';

axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded';

let loading;
//封装loading 开始
function startLoading() {
  loading= Loading.service({
    lock: true,
    text: '正在拼命加载中!!!'
  });
};
//loading结束
function endLoading() {
  loading.close();
};

//总的请求
export function request( config ) {
  const instance = axios.create({
    baseURL: 'http://localhost:5002',
    withCredentials: true
  });
  // //请求拦截
  // instance.interceptors.request.use(
  //   config => {
  //     //console.log("拦截请求成功",config);
  //     startLoading();
  //     let token = window.localStorage.getItem('token');
  //     if( token ) {
  //       config.headers.Authorization= token
  //     }
  //     return config;
  //   },err => Promise.reject(err)
  // );

  // //响应拦截
  // instance.interceptors.response.use(
  //   res => {
  //     //console.log("拦截响应成功");
  //     endLoading();
  //     return res;
  //   },err => {
  //     endLoading();
  //     let status = err.response.status
  //     if( status === 401 ) {
  //       Message.error('token失效');
  //       window.localStorage.removeItem( 'token' );
  //       // window.location.href = '/login'
  //       // this.$router.replace('/login');
  //       this.$message({
  //         type: 'info',
  //         message: '你的登录已过期, 请重新登录 !'
  //       })
  //     }
  //     Message.error(err.response.data)
  //     return Promise.reject(err);
  //   }
  // )
  return instance(config);
}

//文章的主要请求 (涉及到下拉加载)
export function requestArticle() {
  const instance = axios.create({
    baseURL: 'http://localhost:5002',
    withCredentials: true
  });
  // return instance(config);
  let skip = 0;
  let limit = 5;
  return function( index= 0, ifFresh= true ) {
    // console.log(index)
    let tag= ['', '个人日记', 'HTML5&CSS3', 'Javascript', '其它'][index]
    skip= ifFresh ? skip + limit : 0;
    let data= {skip, limit, tag}
    // if(ifFresh) {
    //   skip += limit;
    // }else{
    //   skip= 0;
    // }
    return instance({
      url: '/article/allTags',
      method: 'post',
      data
    })
  }
}

//加载留言评论
export function requestMessage(lmt) {
  // console.log(lmt)
  const instance = axios.create({
    baseURL: 'http://localhost:5002',
    withCredentials: true
  });
  // return instance(config);
  let skip = 0;
  let limit = lmt || 5;
  return function() {
    skip += limit;
    return instance({
      url: '/message',
      method: 'post',
      data: {
        skip,
        limit
      }
    })
  }
  
}