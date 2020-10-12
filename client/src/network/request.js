import axios from 'axios';

// import {Loading,Message} from 'element-ui';

axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded';

// let loading;
// //封装loading 开始
// function startLoading() {
//   loading= Loading.service({
//     lock: true,
//     text: '正在拼命加载中!!!'
//   });
// };
// //loading结束
// function endLoading() {
//   loading.close();
// };

//总的请求
export function request( config ) {
  const instance = axios.create({
    baseURL: 'http://localhost:5002',
    withCredentials: true
  });

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
    let tag= ['', 'HTML5&CSS3', 'Javascript', 'vue&node', '服务器配置', '个人笔记', '其它'][index]
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
  let skip = -5;
  let limit = lmt || 5;
  // console.log(999)
  // console.log(skip)
  return function( id, postUrl ) {
    // console.log(id, postUrl);
    let artId = id ? id : 0,
        url= postUrl ? postUrl : '/message';
        skip += limit;
        // console.log(skip)
        // console.log(333)
    return instance({
      url,
      method: 'post',
      data: {
        artId,
        skip,
        limit
      }
    })
  }
  
}