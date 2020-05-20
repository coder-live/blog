import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载路由
const Home = () => import('../views/home/Home');
const Article = () => import('../views/article/Article');
const Message = () => import('../views/message/Message');
const FriendLink = () => import('../views/friendLink/FriendLink');
const About = () => import('../views/about/About');

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
    path: '/message',
    name: 'Message',
    component: Message
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
