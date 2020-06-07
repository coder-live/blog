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
    component: Home
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/diary',
    name: 'Diary',
    component: Diary
  },
  {
    path: '/friendLink',
    name: 'FriendLink',
    component: FriendLink
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]



const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
