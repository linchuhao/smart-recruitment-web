import Vue from 'vue'
import Router from 'vue-router'
import CommonPage from '../components/common/commonPage.vue'
import index from '../views/index.vue'

Vue.use(Router)
const infoCenter = resolve => require(['../views/infoCenter.vue'], resolve)
const register = resolve => require(['../views/register.vue'], resolve)
const login = resolve => require(['../views/login.vue'], resolve)
const userInfo = resolve => require(['../views/userInfo.vue'], resolve)
const hrUserInfo = resolve => require(['../views/hrViews/userInfo.vue'], resolve)
const search = resolve => require(['../views/searchRes.vue'], resolve)
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
      path: '/userInfo',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'userInfo',
          component: userInfo
        }
      ]
    },
    {
      path: '/hrView',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'hrView',
          component: hrUserInfo
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
      path: '/infoCenter',
      component: CommonPage,
      children: [
        {
          path: '/',
          name: 'infoCenter',
          component: infoCenter
        }
      ]
    },
    {
      path: '/search',
      component: CommonPage,
      children: [
        {
          path: '',
          name: 'search',
          component: search
        }
      ]
    }
  ]
})
