import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/Graph.vue')
  },
  {
    path: '/terminal',
    name: 'Terminal',
    component: () => import('../views/Terminal.vue')
  },
  {
    path: '/email',
    name: 'Email',
    component: () => import('../views/Email.vue')
  },
  {
    path: '/web',
    name: 'Web',
    component: () => import('../views/Web.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/CreationForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
