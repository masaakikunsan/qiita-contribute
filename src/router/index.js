import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/pages/Top'
import Signin from '@/components/pages/Signin'
import Mypage from '@/components/pages/Mypage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    }
  ]
})
