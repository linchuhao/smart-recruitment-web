import Vue from 'vue'
import Router from 'vue-router'
import CommonPage from '../components/common/commonPage.vue'
import index from '../views/index.vue'

Vue.use(Router)
const register = resolve => require(['../views/register.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const testttt = resolve => require(['../views/testttt.vue'], resolve)
export default new Router({
  routes: [
    {
      path: '/',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'index',
          component: index
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/testttt',
      name: 'testttt',
      component: testttt
    }
  ]
})
