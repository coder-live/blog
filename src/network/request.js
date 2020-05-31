import axios from 'axios';

axios.defaults.headers.post['Content-Type']= 'application/x-www-form-urlencoded';

//总得请求
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
    let tag= ['', 'HTML', 'CSS3&HTML5', '个人日记', 'Javascript', '其它'][index]
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