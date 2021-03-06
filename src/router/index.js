import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
// import Welcome from '@/components/Welcome'
import Users from '@/components/Users'

Vue.use(VueRouter)

const Welcome = () => import('@/components/Welcome')
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/Users',
        component: Users
      }
    ],
    redirect: '/welcome'
  }
]

const router = new VueRouter({
  routes
})

// 路由前置导航守卫，如果用户未登陆则跳转至登陆页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})

export default router
