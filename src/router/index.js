import Vue from 'vue'
import VueRouter from 'vue-router'


//懒加载路由
const Home = () => import('../views/home/Home');
const Article = () => import('../views/article/Article');
const Detail = () => import('../views/detail/Detail');
const Message = () => import('../views/message/Message');
const Diary = () => import('../views/diary/Diary');
const FriendLink = () => import('../views/friendLink/FriendLink');
const About = () => import('../views/about/About');
const NotFound = () => import('../views/notFound/NotFound');

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: ['萧逸-首页']
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article,
    meta: ['萧逸-博客']
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: ['萧逸-详情']
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: ['萧逸-留言']
  },
  {
    path: '/diary',
    name: 'Diary',
    component: Diary,
    meta: ['萧逸-日记']
  },
  {
    path: '/friendLink',
    name: 'FriendLink',
    component: FriendLink,
    meta: ['萧逸-友链']
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: ['萧逸-关于']
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: ['萧逸-未找到']
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  // console.log(to);
  //在子组件中meta属性在matched数组中
  document.title = to.meta[0] || to.query.name
  // console.log(to)
  //必要命令 next()
  next()
});
export default router
