import { createWebHistory, createRouter } from 'vue-router'

import Overview from '../components/pages/Overview.vue'
import Bananen from '../components/pages/VKMSearch.vue'
import Login from '../components/pages/Login.vue'
import Register from '../components/pages/Register.vue'
import NotFound from '../components/pages/NotFound.vue'
const routes = [
    { path: '/', component: Overview, meta: { hideLayout: false } },
    { path: '/modules', component: Bananen, meta: { hideLayout: false, requiresAuth: true } },
    { path: '/login', component: Login, meta: { hideLayout: true } },
    { path: '/register', component: Register, meta: { hideLayout: true } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { hideLayout: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router