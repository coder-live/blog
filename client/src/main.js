import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' 

// import 'highlight.js/styles/vs.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
router.afterEach(() => {
  NProgress.done();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
