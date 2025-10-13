import { createWebHistory, createRouter } from 'vue-router'

import Overview from '../components/Overview.vue'
import Bananen from '../components/Bananen.vue'
import Beans from '../components/Beans.vue'
import Slak from '../components/Slak.vue'

const routes = [
    { path: '/', component: Overview },
    { path: '/bananen', component: Bananen },
    { path: '/beans', component: Beans },
    { path: '/slak', component: Slak}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router