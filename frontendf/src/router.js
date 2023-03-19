import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './App.vue'
import NewPage from './pages/login-page.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login-page',
    component: NewPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router