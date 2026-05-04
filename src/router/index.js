import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/views/Dashboard.vue'
import Mapa from '@/views/Mapa.vue'
import Dodaj from '@/views/Dodaj.vue'
import Lista from '@/views/Lista.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: DashBoard },
    { path: '/map', component: Mapa },
    { path: '/new', component: Dodaj },
    { path: '/rides', component: Lista },
  ],
})

export default router
