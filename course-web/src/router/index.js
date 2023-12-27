import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:resolve => require(['@/views/login/login'],resolve)
    },
    {
      path: '/home',    
      component: resolve => require(['@/components/home'],resolve),
      children: [  //这里就是二级路由的配置
        {
          path: '/course/list',
          component: resolve => require(['@/views/course/list'], resolve),
        },
        {
          path: '/course/detail',
          component: resolve => require(['@/views/course/detail'], resolve),
        },
        {
          path: '/degree/list', 
          component: resolve => require(['@/views/degree/list'], resolve),
        },
        {
          path: '/degree/detail',
          component: resolve => require(['@/views/degree/detail'], resolve),
        },
        {
          path: '/user/list',
          component: resolve => require(['@/views/user/list'], resolve),
        },
        {
          path: '/user/detail',
          component: resolve => require(['@/views/user/detail'], resolve),
        }
      ]
    },
    {
      path:'/login',
      component:resolve => require(['@/views/login/login'],resolve)
    }
  ]
})
