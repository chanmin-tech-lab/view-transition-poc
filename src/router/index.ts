import DetailView from '@/pages/DetailView.vue'
import ListView from '@/pages/ListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListView
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailView
    }
  ]
})

export default router
