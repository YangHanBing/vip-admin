import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  },
  //访问不存在页面跳到404页面
  {
    path: '*',
    redirect: "/404"
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/user/Home.vue'),
        
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/member/member.vue'),
        meta:{
          title:"会员管理"
        }
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../views/staff/staff.vue'),
        meta:{
          title:"员工管理"
        }
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods/goods.vue'),
        meta:{
          title:"商品管理"
        }
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/supplier/supplier.vue'),
        meta:{
          title:"供应商管理"
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
